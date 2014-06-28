/**
 * apns.js
 * Amazon Web Service DynamoDB用
 */
var ShipTimer = ShipTimer || {};
(function(){
	"use strict";
	var Dynm = ShipTimer.Dynm = function(token){
		this.user_id = null;
		this.device_id = null;
		this.id_token = token;
		this.DB = null;
		this.xmlHttpUrl = Constants.OAuthConst.XML_URL + '?id_token=' + encodeURIComponent(this.id_token);
	};
	
	/**
	 * 端末のデバイスIDを取得する
	 * @param {Object} callback
	 * @returns {*}
	 * @private
	*/
	Dynm.prototype.getDeviceId = function (callback) {
		var callback = callback || function(){};
		var xhr = new XMLHttpRequest();
		// 非同期通信を利用してユーザーIDを取得
		xhr.open('GET', this.xmlHttpUrl );
		xhr.onload = function(){
			// 正常に結果が返されたか
			if (xhr.status == 200) {
				// ユーザーIDを取得
				var user_info = JSON.parse(xhr.response);
				this.user_id = user_info.user_id;
				
				// AWSの設定
				AWS.config.credentials = new AWS.WebIdentityCredentials({
					RoleArn: Constants.AwsConst.IAM_ROLE,
					WebIdentityToken: this.id_token
				});
				AWS.config.region = Constants.AwsConst.CONFIG_REGION;
				
				// AWS_DynamoDBを起動
				this.DB = new AWS.DynamoDB();
				// 値を取り出す
				this.DB.getItem({
						TableName : Constants.AwsConst.DB_TABLE,
						Key : {user_Id : {S:this.user_id}}
					},
					function(response,data){
						if(typeof missionId != "undefined"){
							this.device_id = data.Item.device_id.S;
							// デバイスIDをローカルに保存
							localStorage[Constants.Strage.LOCAL_DEVICE_ID] = this.device_id;
						}
						callback();
					}
				);			
				
			} else {
				console.log(xhr.status);
			}	
		}.bind(this);
		xhr.send();
	}
	
	
	
})();