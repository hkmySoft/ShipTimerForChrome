/**
 * popup.js
 * 吹き出し用
*/
$(function() {

// 認証処理設定値
var config = {
	client_id: Constants.OAuthConst.CLIENT_ID,
	client_secret: Constants.OAuthConst.CLIENT_SECRET,
	api_scope: Constants.OAuthConst.API_SCOPE
};


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
			
			// == ID入力エリア ==
			var inpuutArea = $('#inputDeviceId');
			// 値を設定する
			inpuutArea.val(deviceId);
			
			// == 登録ボタン ==
			var saveBtn = $('#deviceRegistBtn');
			// "登録"ボタンを非表示にする
			saveBtn.addClass('hide');

			// == 登録済ボタン ==
			var sumiBtn = $('#disableBtn');
			// 登録済みボタンを表示する
			sumiBtn.removeClass('hide');
			
			// フィールドを非活性化する
			$('#inputDeviceIdField').attr('disabled', 'disabled');
			
			// 解除ボタンを表示する
			$('#deviceReleaseBtn').removeClass('hide');

		}
	} else {
		// == 認証関連 ==
		// 認証処理インスタンス生成
		var google = new OAuth2('google', config);

		// 認証処理開始
		google.authorize(function() {
			// == 認証完了後のコールバック関数 ==
			// ローカルストレージにOKを格納
			localStorage[Constants.Strage.OAUTH_COMP_KEY] = "OK";
			// デバイスエラー
			Util.badge.Device_Error();
			
		}, true);

	}
})();


// 登録ボタン押下処理
$('#deviceRegistBtn').click(function() {
	// ボタンを"登録中"に変更
	var btn = $(this);
	btn.button('loading');
	
	// 入力されたデバイスIDを取得する
	var device = $('#inputDeviceId').val();
	// 入力値のチェック
	// エンドポイントのチェック
	if(typeof device == 'undefined' || device == null || device.length == 0) {
		alert("IDを入力してください。");
		btn.button('reset');
		return;
	}
	if(device.match(/\W+/)) {
		alert("半角英数字で入力してください。");
		btn.button('reset');
		return;
	}
	// デバイスIDをローカルに保存
	localStorage[Constants.Strage.LOCAL_DEVICE_ID] = device;
	

	// == 認証関連 ==
	// 認証状態取得(Google認証画面の表示必要有無) 認証済(認証画面を非表示):false 未認証(認証画面を表示):true
	var popOuathFlg = (localStorage[Constants.Strage.OAUTH_COMP_KEY] == "OK") ? false : true;
	// 認証処理インスタンス生成
	var google = new OAuth2('google', config);
	
	// 認証処理開始
	google.authorize(function() {
		// == 認証完了後のコールバック関数 ==
		
		// 認証が元から既にOKだった場合は下記は実行しない
		if (popOuathFlg == true) {
			// ローカルストレージにOKを格納
			localStorage[Constants.Strage.OAUTH_COMP_KEY] = "OK";
		}
		
		// デバイス登録処理を実施
		var apns = new ShipTimer.Apns();
		apns.createSettingMessage();
		apns.forStart(afterRegistButton.bind(this, btn));		
		
		
	}.bind(this), popOuathFlg);	

});

// 解除ボタン押下処理
$('#deviceReleaseBtn').click(function() {
	// ボタンを"解除中"に変更
	var btn = $(this);
	btn.button('loading');
	
	// == 認証関連 ==
	// 認証状態取得(Google認証画面の表示必要有無) 認証済(認証画面を非表示):false 未認証(認証画面を表示):true
	var popOuathFlg = (localStorage[Constants.Strage.OAUTH_COMP_KEY] == "OK") ? false : true;
	// 認証処理インスタンス生成
	var google = new OAuth2('google', config);
	
	// 認証処理開始
	google.authorize(function() {
		// == 認証完了後のコールバック関数 ==
		
		// 認証が元から既にOKだった場合は下記は実行しない
		if (popOuathFlg == true) {
			// ローカルストレージにOKを格納
			localStorage[Constants.Strage.OAUTH_COMP_KEY] = "OK";
		}
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
	}.bind(this), popOuathFlg);	



});


// 登録ボタン押下後コールバック
function afterRegistButton(arg1) {
	var btn = arg1;
	
	// エンドポイントの状態を取得する
	var localEndPoint = localStorage[Constants.Strage.LOCAL_ENDPOINT]
	if (typeof localEndPoint == 'undefined' || localEndPoint == null || localEndPoint.length == 0 ) {
			// "登録"ボタンを"エラー"にする
			btn.button('error');
			// 赤色に変更
			btn.removeClass('btn-primary');
			btn.addClass('btn-danger');
			
			// デバイスエラー
			Util.badge.Device_Error();
			alert("入力されたIDが間違っている可能性があります。");
	} else {
			// "登録"ボタンを非表示にする
			btn.addClass('hide');
			
			// 登録済みボタンを表示する
			$('#disableBtn').removeClass('hide');
			
			// 解除ボタンを表示する
			$('#deviceReleaseBtn').removeClass('hide');
			$('#deviceReleaseBtn').button('reset');
			
			// AWSの認証をOKとする
			localStorage[Constants.Strage.AWS_SNS_COMP_KEY] = "OK";

			// フィールドを非活性化する
			$('#inputDeviceIdField').attr('disabled', 'disabled');
			
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
	
	// 登録済みボタンを非表示にする
	$('#disableBtn').addClass('hide');
	
	// 解除ボタンを非表示にする
	btn.addClass('hide');
	
	// AWSの認証を削除する
	localStorage.removeItem(Constants.Strage.AWS_SNS_COMP_KEY);
	localStorage.removeItem(Constants.Strage.LOCAL_DEVICE_ID);

	// フィールドを活性化する
	$('#inputDeviceIdField').removeAttr('disabled');
	
	// デバイスエラー
	Util.badge.Device_Error();
	
	
}

});

