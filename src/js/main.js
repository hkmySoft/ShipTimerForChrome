/**
 * main.js
 */
var ShipTimer = ShipTimer || {};

(function(){
	"use strict";
	var dispatcher = new ShipTimer.Dispatcher();
	var action = new ShipTimer.Action();
	dispatcher.bind(action);

	// == WebRequest監視リスナー登録 ==
	// HTTPRequestが送信される時
	chrome.webRequest.onBeforeRequest.addListener(function(data){
		dispatcher.eat(data).execute();
	},{'urls':[]},['requestBody']);

	// == 外部Message監視リスナー登録 ==
	// メッセージを受信した時
	chrome.runtime.onMessageExternal.addListener(function(message, sender) {
		if (sender.id == Constants.WdgtSet.WDGT_ID) {
			dispatcher.eat_m(message)
		}
		// 開発版V2
		if (sender.id == Constants.WdgtSet.WDGT_DEV_ID) {
			dispatcher.eat_m(message)
		}
	});

	// == 内部Message監視リスナー登録 ==
	// メッセージを受信した時
	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		if (message.type == Constants.WdgtSet.B_USE) {
			chrome.runtime.sendMessage(message.wdgt_id, {path:"/api/subscribe"}, function(response) {
				if(typeof response == 'undefined') {
					// 存在しない場合
					localStorage[Constants.WdgtSet.B_USE] = "OFF";
					sendResponse({response});
				} else {
					switch(response.status){
						case 201:		// 正常
						case 304:		// 登録済み
							// 表示を切り替える
							localStorage[Constants.WdgtSet.B_USE] = "ON";
							break;
						case 403:		// 不許可
						default:
							// 表示を切り替える
							localStorage[Constants.WdgtSet.B_USE] = "OFF";
						break;
					}
					sendResponse({status:response.status});
				}
			}.bind(this));
		}
	});

	// == 認証確認 ==
	var chkStorageOAuth = localStorage[Constants.Strage.OAUTH_COMP_KEY];
	var chkStorageAws = localStorage[Constants.Strage.AWS_SNS_COMP_KEY];
	// Google認証
	if((typeof chkStorageOAuth != 'undefined') && (chkStorageOAuth == "OK")) {
		// AWSデバイス登録
		if((typeof chkStorageAws != 'undefined') && (chkStorageAws == "OK")) {
			// バッジを初期化
			Util.badge.clear();
		} else {
			// デバイス登録していない場合
			Util.badge.Device_Error();
		}
	} else {
		// 認証していない場合
		Util.badge.OAuth_Error();
	}

})();
