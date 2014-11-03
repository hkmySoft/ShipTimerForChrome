/**
 * build.js
 * 建造用処理
 */
var ShipTimer = ShipTimer || {};
(function(){
	"use strict";
	var Build = ShipTimer.Build = function(){
		this.Apns = new ShipTimer.Apns();
	};


	Build.prototype.forStartMessage = function(message){
		var deck_1 = "";
		var deck_2 = "";
		var deck_3 = "";
		var deck_4 = "";
		var start_1 = "";
		var start_2 = "";
		var start_3 = "";
		var start_4 = "";
		var end_1 = "";
		var end_2 = "";
		var end_3 = "";
		var end_4 = "";
		var dKey1 = "";
		var dKey2 = "";
		var dKey3 = "";
		var dKey4 = "";
		var sKey1 = "";
		var sKey2 = "";
		var sKey3 = "";
		var sKey4 = "";
		var eKey1 = "";
		var eKey2 = "";
		var eKey3 = "";
		var eKey4 = "";
		
		// パラメタからドックを取得する
		var deckId = message.event.params.key;
		if (typeof deckId == "undefined") {
			console.log("Undefined Error !!");
			return;
		}
		// パラメタから開始時刻を取得する
		var startTime = message.timestamp;
		if (typeof startTime == "undefined") {
			console.log("Undefined Error !!");
			return;
		}
		// パラメタから終了時刻を取得する
		var endTime = message.event.finish;
		if (typeof endTime == "undefined") {
			console.log("Undefined Error !!");
			return;
		}
		

		console.log("DeckId : %s", deckId);
		console.log("startTime : %d", startTime);
		console.log("endTime : %d", endTime);
		
		// ドックIDから取得先を決定
		switch (deckId) {
			case 1:
				dKey1 = Constants.SBL.D1;
				sKey1 = Constants.SBL.S1;
				eKey1 = Constants.SBL.E1;
				dKey2 = Constants.SBL.D2;
				sKey2 = Constants.SBL.S2;
				eKey2 = Constants.SBL.E2;
				dKey3 = Constants.SBL.D3;
				sKey3 = Constants.SBL.S3;
				eKey3 = Constants.SBL.E3;
				dKey4 = Constants.SBL.D4;
				sKey4 = Constants.SBL.S4;
				eKey4 = Constants.SBL.E4;
				break;
			case 2:
				dKey1 = Constants.SBL.D2;
				sKey1 = Constants.SBL.S2;
				eKey1 = Constants.SBL.E2;
				dKey2 = Constants.SBL.D1;
				sKey2 = Constants.SBL.S1;
				eKey2 = Constants.SBL.E1;
				dKey3 = Constants.SBL.D3;
				sKey3 = Constants.SBL.S3;
				eKey3 = Constants.SBL.E3;
				dKey4 = Constants.SBL.D4;
				sKey4 = Constants.SBL.S4;
				eKey4 = Constants.SBL.E4;
				break;
			case 3:
				dKey1 = Constants.SBL.D3;
				sKey1 = Constants.SBL.S3;
				eKey1 = Constants.SBL.E3;
				dKey2 = Constants.SBL.D1;
				sKey2 = Constants.SBL.S1;
				eKey2 = Constants.SBL.E1;
				dKey3 = Constants.SBL.D2;
				sKey3 = Constants.SBL.S2;
				eKey3 = Constants.SBL.E2;
				dKey4 = Constants.SBL.D4;
				sKey4 = Constants.SBL.S4;
				eKey4 = Constants.SBL.E4;
				break;
			case 4:
				dKey1 = Constants.SBL.D4;
				sKey1 = Constants.SBL.S4;
				eKey1 = Constants.SBL.E4;
				dKey2 = Constants.SBL.D1;
				sKey2 = Constants.SBL.S1;
				eKey2 = Constants.SBL.E1;
				dKey3 = Constants.SBL.D2;
				sKey3 = Constants.SBL.S2;
				eKey3 = Constants.SBL.E2;
				dKey4 = Constants.SBL.D3;
				sKey4 = Constants.SBL.S3;
				eKey4 = Constants.SBL.E3;
				break;
			default:
				break;
		}
		// 現在時刻を取得する(ミリ秒)
		var startDate = Date.now();

		// 取得した値をストレージに保存
		localStorage[dKey1] = deckId;
		localStorage[sKey1] = startTime;
		localStorage[eKey1] = endTime;
		
		// 取得した値をセット
		deck_1 = deckId;
		start_1 = startTime;
		end_1 = endTime;
		
		// 時間を取得して判定
		var jTime1 = localStorage[sKey2];
		if (typeof jTime1 != "undefined") {
			// 登録から30秒以内の場合
			if(startDate - Number(jTime1) <= Constants.SBL.INTARVAL) {
				deck_2 = localStorage[dKey2];
				start_2 = jTime1;
				end_2 = localStorage[eKey2];
			}
		}
		
		var jTime2 = localStorage[sKey3];
		if (typeof jTime2 != "undefined") {
			// 登録から30秒以内の場合
			if(startDate - Number(jTime2) <= Constants.SBL.INTARVAL) {
				deck_3 = localStorage[dKey3];
				start_3 = jTime2;
				end_3 = localStorage[eKey3];
			}
		}

		var jTime3 = localStorage[sKey4];
		if (typeof jTime3 != "undefined") {
			// 登録から30秒以内の場合
			if(startDate - Number(jTime3) <= Constants.SBL.INTARVAL) {
				deck_4 = localStorage[dKey4];
				start_4 = jTime3;
				end_4 = localStorage[eKey4];
			}
		}
		
		// ウィジェット用のメッセージ作成
		this.Apns.createSendMessage(
									Constants.SBL.SAVE_MESSAGE,
									Constants.Apns.T_BUILD,
									deck_1,
									"",
									"",
									start_1,
									end_1,
									deck_2,
									"",
									"",
									start_2,
									end_2,
									deck_3,
									"",
									"",
									start_3,
									end_3,
									deck_4,
									"",
									"",
									start_4,
									end_4
								);
		
		
		// 送付登録時間を取得
		var sendTime = localStorage[Constants.SBL.SEND_TIME];
		if (typeof sendTime != "undefined") {
			// 登録から30秒以内の場合
			if(startDate - Number(sendTime) <= Constants.SBL.INTARVAL) {
				// 実行を待つ
				console.log("wait exec");
				return;
			}
		}
		// 現在時刻を送付登録時間とする
		localStorage[Constants.SBL.SEND_TIME] = startDate;
		// 一定時間後に実行
		setTimeout(function(){
				this.Apns.forMessageStart(Constants.SBL.SAVE_MESSAGE)
			}.bind(this), Constants.SBL.INTARVAL);
		
	};
})();