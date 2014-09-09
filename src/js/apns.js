/**
 * apns.js
 * Amazon Web Service SNS用 メッセージ処理
 */
var ShipTimer = ShipTimer || {};
(function(){
	"use strict";
	var Apns = ShipTimer.Apns = function(){
		this.deviceToken = localStorage[Constants.Strage.LOCAL_DEVICE_ID];
		this.endPointParams = {
			PlatformApplicationArn:Constants.AwsConst.PLAT_APP,
			Token:this.deviceToken,
		};
		this.message = null;
		this.sns = null;
		this.endpoint = localStorage[Constants.Strage.LOCAL_ENDPOINT];
	};
	
	/**
	 * 端末のエンドポイントを作成する
	 * @param {Object} callback
	 * @returns {*}
	 * @private
	*/
	Apns.prototype._createEndPoint = function (callback) {
		var callback = callback || function(){};
		this.deviceToken = localStorage[Constants.Strage.LOCAL_DEVICE_ID];
		this.endPointParams = {
			PlatformApplicationArn:Constants.AwsConst.PLAT_APP,
			Token:this.deviceToken,
		};
		this.sns.createPlatformEndpoint(this.endPointParams, function(err, data) {
			if (err) {
				console.log(err);
				callback();
			} else {
				// エンドポイントの生成に成功した場合
				// ローカルに保存
				localStorage[Constants.Strage.LOCAL_ENDPOINT] = data.EndpointArn;
				// メッセージを送信する
				this._publishMessage(data.EndpointArn, callback);
			}
		}.bind(this));
	}
	
	/**
	 * 端末のエンドポイントを削除する
	 * @returns {*}
	 * @private
	*/
	Apns.prototype._deleteEndPoint = function (endpointArn, callback) {
		var callback = callback || function(){};
		var params = {
			EndpointArn: endpointArn,
		};
		this.sns.deleteEndpoint(params, function(err, data){ 
			// ローカルからエンドポイントを削除
			localStorage.removeItem(Constants.Strage.LOCAL_ENDPOINT);
			callback();
		}.bind(this));
	}
	
	
	/**
	 * メッセージを送信する
	 * @param {Object} endpointArn
	 * @param {Object} callback
	 * @returns {*}
	 * @private
	*/
	Apns.prototype._publishMessage = function (endpointArn, callback) {
		var callback = callback || function(){};
		var params = {
		  MessageStructure:'json',
		  Message: this.message,
		  TargetArn: endpointArn
		};
		this.sns.publish(params, function(err, data) {
			if (err) {
				// メッセージ送信失敗
				// メッセージの送信失敗時はエンドポイントの削除を行う
				this._deleteEndPoint(params.TargetArn, callback);
			} else {
				callback();
			}
		}.bind(this));
	}
	
	/**
	 * (共通)メッセージの生成
	 * @returns {*}
	 * @private
	*/
	Apns.prototype._createMessage = function (message) {
		var messageJSON = JSON.stringify(message);
		// JSON形式にフォーマットしたメッセージを設定
		this.message = messageJSON;
	}
	
	/**
	 * (認証)メッセージの生成
	 * @returns {*}
	 * @public
	*/
	Apns.prototype.createSettingMessage = function () {
		var message = {};
		message[Constants.AwsConst.APS_NAME] = "{\"aps\":{\"alert\":\"iPhoneが正常に認証されました！\",\"sound\": \"default\",\"content-available\": 2}}";
		// 共通メッセージ処理を実行
		this._createMessage(message);
	}
	
	/**
	 * (遠征)メッセージの生成
	 * @param {Object} typeId
	 * @param {Object} deckId
	 * @param {Object} key
	 * @param {Object} startTime
	 * @returns {*}
	 * @public
	*/
	Apns.prototype.createMessage = function (typeId, deckId, key, startTime, deckId1, key1, startTime1, deckId2, key2, startTime2) {
		var message = {};
		message[Constants.AwsConst.APS_NAME] = "{\"aps\":{\"content-available\":1,\"sound\":\"\"},\"type\":\"" + typeId +"\",\"deckId\":\"" + deckId +"\",\"key\":\"" + key +"\",\"startTime\":\"" + startTime +"\",\"add1\":\"1\", \"deckId1\":\"" + deckId1 +"\",\"key1\":\"" + key1 +"\",\"startTime1\":\"" + startTime1 +"\",\"add2\":\"1\", \"deckId2\":\"" + deckId2 +"\",\"key2\":\"" + key2 +"\",\"startTime2\":\"" + startTime2 +"\"}";
		// 共通メッセージ処理を実行
		console.log(message);
		this._createMessage(message);
		// メッセージを保存
		localStorage[Constants.SMI.SAVE_MESSAGE] = this.message;
	}
	/**
	 * メッセージ処理の開始
	 * @returns {*}
	 * @param {Object} callback
	 * @public
	*/
	Apns.prototype.forStart = function (callback) {
		// メッセージのチェック
		if(this.message == null) {
			return;
		}
		
		// 認証用設定値
		var config = {
			client_id: Constants.OAuthConst.CLIENT_ID,
			client_secret: Constants.OAuthConst.CLIENT_SECRET,
			api_scope: Constants.OAuthConst.API_SCOPE
		}
		
		// OAuth認証生成
		var google = new OAuth2('google', config);
		
		// AWS認証生成
		google.authorize(function() {
			var access_token = google.getAccessToken();

			AWS.config.credentials = new AWS.WebIdentityCredentials({
				RoleArn: Constants.AwsConst.IAM_ROLE,
				WebIdentityToken: access_token
			});
			AWS.config.region = Constants.AwsConst.CONFIG_REGION;
			
			// AWS_SNSを起動
			this.sns = new AWS.SNS();
			
			// エンドポイントを作成した後メッセージを送信
			this._createEndPoint(callback);
		}.bind(this), false);
	}
	/**
	 * 遠征メッセージ処理の開始
	 * @returns {*}
	 * @param {Object} callback
	 * @public
	*/
	Apns.prototype.forSendMissionMessage = function (callback) {
		console.log("exec!");
		// メッセージを取得
		this.message = localStorage[Constants.SMI.SAVE_MESSAGE];
		
		// メッセージのチェック
		if (typeof this.message == "undefined") {
			return;
		}
		
		// 認証用設定値
		var config = {
			client_id: Constants.OAuthConst.CLIENT_ID,
			client_secret: Constants.OAuthConst.CLIENT_SECRET,
			api_scope: Constants.OAuthConst.API_SCOPE
		}
		
		// OAuth認証生成
		var google = new OAuth2('google', config);
		
		// AWS認証生成
		google.authorize(function() {
			var access_token = google.getAccessToken();

			AWS.config.credentials = new AWS.WebIdentityCredentials({
				RoleArn: Constants.AwsConst.IAM_ROLE,
				WebIdentityToken: access_token
			});
			AWS.config.region = Constants.AwsConst.CONFIG_REGION;
			
			// AWS_SNSを起動
			this.sns = new AWS.SNS();
			
			// エンドポイントを作成した後メッセージを送信
			this._createEndPoint(callback);
		}.bind(this), false);
	}
	/**
	 * デバイス解除処理の開始
	 * @returns {*}
	 * @param {Object} callback
	 * @public
	*/
	Apns.prototype.forDeleteStart = function (callback) {
		// エンドポイントのチェック
		if(typeof this.endpoint == 'undefined') {
			return;
		}
		if(this.endpoint == null) {
			return;
		}
		if(this.endpoint.length == 0) {
			return;
		}
		
		// 認証用設定値
		var config = {
			client_id: Constants.OAuthConst.CLIENT_ID,
			client_secret: Constants.OAuthConst.CLIENT_SECRET,
			api_scope: Constants.OAuthConst.API_SCOPE
		}
		
		// OAuth認証生成
		var google = new OAuth2('google', config);
		
		// AWS認証生成
		google.authorize(function() {
			var access_token = google.getAccessToken();

			AWS.config.credentials = new AWS.WebIdentityCredentials({
				RoleArn: Constants.AwsConst.IAM_ROLE,
				WebIdentityToken: access_token
			});
			AWS.config.region = Constants.AwsConst.CONFIG_REGION;
			
			// AWS_SNSを起動
			this.sns = new AWS.SNS();
			
			// エンドポイントを削除
			this._deleteEndPoint(this.endpoint, callback);
		}.bind(this), false);
	}
	
	
})();
