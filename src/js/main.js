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

	// == Message監視リスナー登録 ==
	// メッセージを受信した時
	chrome.runtime.onMessageExternal.addListener(function(message, sender) {
		if (sender.id == Constants.WgdtSet.WGDT_ID) {
			dispatcher.eat_m(message)
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

