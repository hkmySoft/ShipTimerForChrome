/**
 * popup.js
 * 吹き出し用
*/
$(function() {

// 初期化処理
(function () {
	// Google認証状態取得
	var ouathFlg = (localStorage[Constants.Strage.OAUTH_COMP_KEY] == "OK") ? true : false;
	// AWS認証状態取得
	var awsSnsFlg = (localStorage[Constants.Strage.AWS_SNS_COMP_KEY] == "OK") ? true : false;

	// 認証の完了チェック
	if(ouathFlg && awsSnsFlg){
		// ローカルストレージを取得
		var deviceId = localStorage[Constants.Strage.LOCAL_DEVICE_ID];
		// 値の存在チェック
		if (typeof deviceId != 'undefined') {

			// == 登録ボタン ==
			var saveBtn = $('#deviceRegistBtn');
			// "登録"ボタンを非表示にする
			saveBtn.addClass('hide');

			// == 起動中&待機中ボタン ==
			// 状態フラグを取得
			var mFlg = (localStorage[Constants.Strage.MONITOR_FLG] == "ON") ? true : false;
			if(mFlg){
				var tmpBtn = $('#monitorBtn');
				// 起動中ボタンを表示する
				tmpBtn.removeClass('hide');
			} else {
				var tmpBtn = $('#waitMonitorBtn');
				// 待機中ボタンを表示する
				tmpBtn.removeClass('hide');
			}

			// 解除ボタンを表示する
			$('#deviceReleaseBtn').removeClass('hide');

		}
	} else {
		// == 認証関連 ==
		chrome.identity.getAuthToken({'interactive': true}, function(token) {
			if(chrome.runtime.lastError) {
				console.log(chrome.runtime.lastError.message);
			} else {
				// == 認証完了後のコールバック関数 ==
				// ローカルストレージにOKを格納
				localStorage[Constants.Strage.OAUTH_COMP_KEY] = "OK";
				// デバイスエラー
				Util.badge.Device_Error();
			}

		});
	}

	// 設定値によるボタン初期化
	// 使用フラグを取得
	var useFlg = false;
	useFlg = (localStorage[Constants.WdgtSet.B_USE] == "ON") ? true : false;
	if(useFlg){

		$('#widgetUse').addClass('btn-success');
		$('#widgetUse').removeClass('btn-default');
		$('#widgetUse').text("使用する　");

		// 遠征列のボタンを活性化
		$('#missionBtn').removeAttr('disabled');

		// 入渠列をフェードイン
		$('#trNyukyo').addClass('in');

		// 建造列をフェードイン
		$('#trBuild').addClass('in');

		// 起動ボタンに注釈設定
		$('#shipTimerNotWindow').removeClass('hide');
		$('#shipTimerWindow').addClass('hide');
		$('#shipTimerNotWindow').tooltip();

	} else {

		$('#widgetUse').removeClass('btn-success');
		$('#widgetUse').addClass('btn-default');
		$('#widgetUse').text("使用しない");

		// 遠征列のボタンを非活性化
		$('#missionBtn').attr('disabled','disabled');
		$('#missionBtn').addClass('btn-primary');
		$('#missionBtn').removeClass('btn-default');
		$('#missionBtn').text("ON");

		// 入渠列をフェードアウト
		$('#trNyukyo').removeClass('in');

		// 建造列をフェードアウト
		$('#trBuild').removeClass('in');

		// 起動ボタンの注釈削除
		$('#shipTimerWindow').removeClass('hide');
		$('#shipTimerNotWindow').addClass('hide');

	}

	// 使用しないの時は表示ON固定
	if (useFlg) {
		// 遠征使用フラグを取得
		var chkFlg = (localStorage[Constants.WdgtSet.B_ENSEI] == "ON") ? true : false;
		if(chkFlg){
			$('#missionBtn').addClass('btn-primary');
			$('#missionBtn').removeClass('btn-default');
			$('#missionBtn').text("ON");
		} else {
			$('#missionBtn').removeClass('btn-primary');
			$('#missionBtn').addClass('btn-default');
			$('#missionBtn').text("OFF");
		}
	}
	// 入渠使用フラグを取得
	chkFlg = (localStorage[Constants.WdgtSet.B_NYUKYO] == "ON") ? true : false;
	if(chkFlg){
		$('#nyukyoBtn').addClass('btn-primary');
		$('#nyukyoBtn').removeClass('btn-default');
		$('#nyukyoBtn').text("ON");
	} else {
		$('#nyukyoBtn').removeClass('btn-primary');
		$('#nyukyoBtn').addClass('btn-default');
		$('#nyukyoBtn').text("OFF");
	}

	// 建造使用フラグを取得
	chkFlg = (localStorage[Constants.WdgtSet.B_BUILD] == "ON") ? true : false;
	if(chkFlg){
		$('#buildBtn').addClass('btn-primary');
		$('#buildBtn').removeClass('btn-default');
		$('#buildBtn').text("ON");
	} else {
		$('#buildBtn').removeClass('btn-primary');
		$('#buildBtn').addClass('btn-default');
		$('#buildBtn').text("OFF");
	}

	// ウィジェットをDLするボタンを初期化
	$('#wgtDLbtn').tooltip();
	$('#widgetSetting').tooltip();


	// YOUTUBE表示機能を初期化
	$("#YTLink").attr('data-video-id',Constants.Hanyou.YT_URL);
	$(".video-link").jqueryVideoLightning({
		autoplay: 1,
		color: "white"
	});

})();


// 登録ボタン押下処理
$('#deviceRegistBtn').click(function() {
	// ボタンを"認証中"に変更
	var btn = $(this);
	btn.button('loading');
	btn.removeClass('btn-danger');
	btn.addClass('btn-success');
	var ErArea = $('#ErrorMessage');
	ErArea.html("");
	ErArea.addClass('hide');

	// == 認証関連 ==
	// 認証状態取得(Google認証画面の表示必要有無) 認証済(認証画面を非表示):false 未認証(認証画面を表示):true
	var popOuathFlg = (localStorage[Constants.Strage.OAUTH_COMP_KEY] == "OK") ? false : true;

	chrome.identity.getAuthToken({'interactive': true}, function(token) {
		if(chrome.runtime.lastError) {
			console.log(chrome.runtime.lastError.message);
		} else {
			// 認証が元から既にOKだった場合は下記は実行しない
			if (popOuathFlg == true) {
				// ローカルストレージにOKを格納
				localStorage[Constants.Strage.OAUTH_COMP_KEY] = "OK";
			}

			// 端末のデバイスIDを取得し、登録処理を行う
			var dynm = new ShipTimer.Dynm(token);
			dynm.getDeviceId(settingDevice.bind(this, btn));
		}
	});
});

// 起動中ボタン押下処理
$('#monitorBtn').click(function() {
	// 起動中ボタンを非表示にする
	$('#monitorBtn').addClass('hide');
	// 待機中ボタンを表示にする
	$('#waitMonitorBtn').removeClass('hide');
	// 起動中フラグをOFFにする
	localStorage[Constants.Strage.MONITOR_FLG] = "OFF";
});

// 待機中ボタン押下処理
$('#waitMonitorBtn').click(function() {
	// 起動中ボタンを表示にする
	$('#monitorBtn').removeClass('hide');
	// 待機中ボタンを非表示にする
	$('#waitMonitorBtn').addClass('hide');
	// 起動中フラグをONにする
	localStorage[Constants.Strage.MONITOR_FLG] = "ON";
});

// ウィンドウ起動ボタン押下処理
$('#shipTimerWindow').click(function() {
	Util.openSTWindow();
});

// 解除ボタン押下処理
$('#deviceReleaseBtn').click(function() {
	// ボタンを"解除中"に変更
	var btn = $(this);
	btn.button('loading');

	// AWS認証状態取得
	var awsSnsFlg = (localStorage[Constants.Strage.AWS_SNS_COMP_KEY] == "OK") ? true : false;
	// 認証の完了チェック
	if(awsSnsFlg){
		// ローカルストレージを取得
		var deviceId = localStorage[Constants.Strage.LOCAL_DEVICE_ID];
		// 値の存在チェック
		if (typeof deviceId != 'undefined') {

			// デバイス解除処理を実施
			var apns = new ShipTimer.Apns();
			apns.forDeleteStart(afterReleaseButton.bind(this, btn));
		}
	}
});

// 艦これウィジェット使用ボタン
$('#widgetUse').click(function() {
	// 自分自身を取得する
	var btn = $(this);
	var ErArea = $('#ErrorMessage');
	ErArea.html("");
	ErArea.addClass('hide');
	btn.button('reset');
	btn.removeClass('btn-danger');

	// 使用フラグを取得
	var chkFlg = (localStorage[Constants.WdgtSet.B_USE] == "ON") ? true : false;
	if (chkFlg) {
		// 表示を切り替える
		wghtUseBtnChange();
	} else {
		// メッセージを送信して認証する
		chrome.runtime.sendMessage(Constants.WdgtSet.WDGT_ID, {path:"/api/subscribe"}, function(response) {
			if(typeof response == 'undefined') {
				// "登録"ボタンを"エラー"にする
				btn.button('error');
				// 赤色に変更
				btn.removeClass('btn-default');
				btn.addClass('btn-danger');
				// エラーメッセージ
				ErArea.html(Constants.Hanyou.WDGT_NOTHING_ERR_MESSAGE);
				ErArea.removeClass('hide');
			} else {
				switch(response.status){
					case 201:		// 正常
					case 304:		// 登録済み
						// 表示を切り替える
						wghtUseBtnChange();
						break;
					case 403:		// 不許可
						// "登録"ボタンを"エラー"にする
						btn.button('error');
						// 赤色に変更
						btn.removeClass('btn-default');
						btn.addClass('btn-danger');
						// エラーメッセージ
						ErArea.html(Constants.Hanyou.WDGT_CANCEL_ERR_MESSAGE);
						ErArea.removeClass('hide');
						break;
					default:
						// "登録"ボタンを"エラー"にする
						btn.button('error');
						// 赤色に変更
						btn.removeClass('btn-default');
						btn.addClass('btn-danger');
						// エラーメッセージ
						ErArea.html(Constants.Hanyou.WDGT_SOME_ERR_MESSAGE);
						ErArea.removeClass('hide');
						break;
				}
			}
		}.bind(this));
	}



});

// 艦これウィジェット使用切り替え
function wghtUseBtnChange() {

	// 使用フラグを取得
	var chkFlg = (localStorage[Constants.WdgtSet.B_USE] == "ON") ? true : false;
	if(!chkFlg){
		// 「使用する」に変更する
		$('#widgetUse').addClass('btn-success');
		$('#widgetUse').removeClass('btn-default');
		$('#widgetUse').text("使用する　");

		// 遠征列のボタンを活性化
		$('#missionBtn').removeAttr('disabled');
		// 使用フラグを取得
		var enseiFlg = (localStorage[Constants.WdgtSet.B_ENSEI] == "ON") ? true : false;
		if(enseiFlg){
			// ONの場合
			$('#missionBtn').addClass('btn-primary');
			$('#missionBtn').removeClass('btn-default');
			$('#missionBtn').text("ON");

		} else {
			// OFFの場合
			$('#missionBtn').removeClass('btn-primary');
			$('#missionBtn').addClass('btn-default');
			$('#missionBtn').text("OFF");

		}

		// 入渠列をフェードイン
		$('#trNyukyo').addClass('in');

		// 建造列をフェードイン
		$('#trBuild').addClass('in');

		// 起動ボタンに注釈設定
		$('#shipTimerNotWindow').removeClass('hide');
		$('#shipTimerWindow').addClass('hide');
		$('#shipTimerNotWindow').tooltip();

		// 使用フラグをONにする
		localStorage[Constants.WdgtSet.B_USE] = "ON";
	} else {
		// 「使用しない」に変更する
		$('#widgetUse').removeClass('btn-success');
		$('#widgetUse').addClass('btn-default');
		$('#widgetUse').text("使用しない");

		// 遠征列のボタンを非活性化
		$('#missionBtn').attr('disabled','disabled');
		// "ON"表示にする
		$('#missionBtn').addClass('btn-primary');
		$('#missionBtn').removeClass('btn-default');
		$('#missionBtn').text("ON");


		// 入渠列をフェードアウト
		$('#trNyukyo').removeClass('in');

		// 建造列をフェードアウト
		$('#trBuild').removeClass('in');

		// 起動ボタンの注釈削除
		$('#shipTimerWindow').removeClass('hide');
		$('#shipTimerNotWindow').addClass('hide');

		// 使用フラグをOFFにする
		localStorage[Constants.WdgtSet.B_USE] = "OFF";
	}

}

// 艦これウィジェット遠征ボタン
$('#missionBtn').click(function() {
	// 自分自身を取得する
	var btn = $(this);

	// 使用フラグを取得
	var chkFlg = (localStorage[Constants.WdgtSet.B_ENSEI] == "ON") ? true : false;
	if(!chkFlg){

		btn.addClass('btn-primary');
		btn.removeClass('btn-default');
		btn.text("ON");

		// 使用フラグをONにする
		localStorage[Constants.WdgtSet.B_ENSEI] = "ON";
	} else {

		btn.removeClass('btn-primary');
		btn.addClass('btn-default');
		btn.text("OFF");

		// 使用フラグをONにする
		localStorage[Constants.WdgtSet.B_ENSEI] = "OFF";
	}

});
// 艦これウィジェット入渠ボタン
$('#nyukyoBtn').click(function() {
	// 自分自身を取得する
	var btn = $(this);

	// 使用フラグを取得
	var chkFlg = (localStorage[Constants.WdgtSet.B_NYUKYO] == "ON") ? true : false;
	if(!chkFlg){

		btn.addClass('btn-primary');
		btn.removeClass('btn-default');
		btn.text("ON");

		// 使用フラグをONにする
		localStorage[Constants.WdgtSet.B_NYUKYO] = "ON";
	} else {

		btn.removeClass('btn-primary');
		btn.addClass('btn-default');
		btn.text("OFF");

		// 使用フラグをONにする
		localStorage[Constants.WdgtSet.B_NYUKYO] = "OFF";
	}
});
// 艦これウィジェット建造ボタン
$('#buildBtn').click(function() {
	// 自分自身を取得する
	var btn = $(this);

	// 使用フラグを取得
	var chkFlg = (localStorage[Constants.WdgtSet.B_BUILD] == "ON") ? true : false;
	if(!chkFlg){

		btn.addClass('btn-primary');
		btn.removeClass('btn-default');
		btn.text("ON");

		// 使用フラグをONにする
		localStorage[Constants.WdgtSet.B_BUILD] = "ON";
	} else {

		btn.removeClass('btn-primary');
		btn.addClass('btn-default');
		btn.text("OFF");

		// 使用フラグをONにする
		localStorage[Constants.WdgtSet.B_BUILD] = "OFF";
	}
});

// 艦これウィジェットDLボタン
$('#wgtDLbtn').click(function() {
	chrome.tabs.create({url:Constants.WdgtSet.DL_URL}, function(){});
});


// デバイス登録処理
function settingDevice(arg1) {
	var btn = arg1;

	// エンドポイント作成&登録メッセージ送信処理を実施
	var apns = new ShipTimer.Apns();
	apns.createSettingMessage();
	apns.forSettingStart(afterRegistButton.bind(this, btn));

}

// 登録ボタン押下後コールバック
function afterRegistButton(arg1) {
	var btn = arg1;

	// エンドポイントの状態を取得する
	var localEndPoint = localStorage[Constants.Strage.LOCAL_ENDPOINT]
	if (typeof localEndPoint == 'undefined' || localEndPoint == null || localEndPoint.length == 0 ) {
			// "登録"ボタンを"エラー"にする
			btn.button('error');
			// 赤色に変更
			btn.removeClass('btn-success');
			btn.addClass('btn-danger');

			// デバイスエラー
			Util.badge.Device_Error();
			$('#ErrorMessage').html(Constants.Hanyou.DEVICE_ERR_MESSAGE);
			$('#ErrorMessage').removeClass('hide');
	} else {
			// "登録"ボタンを非表示にする
			btn.addClass('hide');

			// 起動中ボタンを表示する
			$('#monitorBtn').removeClass('hide');
			// 起動中フラグをONにする
			localStorage[Constants.Strage.MONITOR_FLG] = "ON";

			// 解除ボタンを表示する
			$('#deviceReleaseBtn').removeClass('hide');
			$('#deviceReleaseBtn').button('reset');

			// AWSの認証をOKとする
			localStorage[Constants.Strage.AWS_SNS_COMP_KEY] = "OK";


			// バッジを消す
			Util.badge.clear();
	}
}

// 解除ボタン押下後コールバック
function afterReleaseButton(arg1) {
	var btn = arg1;
	// "登録"ボタンを表示する
	$('#deviceRegistBtn').removeClass('hide');
	$('#deviceRegistBtn').button('reset');

	// 起動中ボタンを非表示にする
	$('#monitorBtn').addClass('hide');
	// 待機中ボタンを非表示にする
	$('#waitMonitorBtn').addClass('hide');
	// 起動中フラグをOFFにする
	localStorage[Constants.Strage.MONITOR_FLG] = "OFF";

	// 解除ボタンを非表示にする
	btn.addClass('hide');

	// AWSの認証を削除する
	localStorage.removeItem(Constants.Strage.AWS_SNS_COMP_KEY);
	localStorage.removeItem(Constants.Strage.LOCAL_DEVICE_ID);


	// デバイスエラー
	Util.badge.Device_Error();


}

});
