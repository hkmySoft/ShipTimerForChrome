/**
 * mission.js
 * 遠征用処理
 */
var ShipTimer = ShipTimer || {};
(function(){
	"use strict";
	var Mission = ShipTimer.Mission = function(){
		this.Apns = new ShipTimer.Apns();
	};


	Mission.prototype.forStart = function(params){
		var deckId = "";
		var missionId = "";
		var startDate = "";
		var deckId1 = "";
		var missionId1 = "";
		var startDate1 = "";
		var deckId2 = "";
		var missionId2 = "";
		var startDate2 = "";
		var sdKey = "";
		var skKey = "";
		var stKey = "";
		var slKey = "";
		var seKey = "";
		var dKey1 = "";
		var kKey1 = "";
		var tKey1 = "";
		var dKey2 = "";
		var kKey2 = "";
		var tKey2 = "";

		// パラメタから艦隊を取得する
		deckId = params.api_deck_id[0];
		if (typeof deckId == "undefined") {
			console.log("Undefined Error !!");
			return;
		}
		// パラメタからミッションIDを取得する
		missionId = params.api_mission_id[0];
		if (typeof missionId == "undefined") {
			console.log("Undefined Error !!");
			return;
		}
		// 現在時刻を取得する(ミリ秒)
		startDate = Date.now();
		console.log("DeckId : %s", deckId);
		console.log("missionId : %s", missionId);
		console.log("startDate : %d", startDate);
		
		
		// 艦隊IDから取得先を決定
		switch (deckId) {
			case "2":
				sdKey = Constants.SMI.D2;
				skKey = Constants.SMI.K2;
				stKey = Constants.SMI.T2;
				slKey = Constants.SMI.L2;
				seKey = Constants.SMI.E2;
				dKey1 = Constants.SMI.D3;
				kKey1 = Constants.SMI.K3;
				tKey1 = Constants.SMI.T3;
				dKey2 = Constants.SMI.D4;
				kKey2 = Constants.SMI.K4;
				tKey2 = Constants.SMI.T4;
				break;
			case "3":
				sdKey = Constants.SMI.D3;
				skKey = Constants.SMI.K3;
				stKey = Constants.SMI.T3;
				slKey = Constants.SMI.L3;
				seKey = Constants.SMI.E3;
				dKey1 = Constants.SMI.D2;
				kKey1 = Constants.SMI.K2;
				tKey1 = Constants.SMI.T2;
				dKey2 = Constants.SMI.D4;
				kKey2 = Constants.SMI.K4;
				tKey2 = Constants.SMI.T4;
				break;
			case "4":
				sdKey = Constants.SMI.D4;
				skKey = Constants.SMI.K4;
				stKey = Constants.SMI.T4;
				slKey = Constants.SMI.L4;
				seKey = Constants.SMI.E4;
				dKey1 = Constants.SMI.D2;
				kKey1 = Constants.SMI.K2;
				tKey1 = Constants.SMI.T2;
				dKey2 = Constants.SMI.D3;
				kKey2 = Constants.SMI.K3;
				tKey2 = Constants.SMI.T3;
				break;
			default:
				break;
		}
		// 取得した値をストレージに保存
		localStorage[sdKey] = deckId;
		localStorage[skKey] = missionId;
		localStorage[stKey] = startDate;
		localStorage[slKey] = "";
		localStorage[seKey] = "";
		
		
		// 時間を取得して判定
		var jTime1 = localStorage[tKey1];
		if (typeof jTime1 != "undefined") {
			// 登録から30秒以内の場合
			if(startDate - Number(jTime1) <= Constants.SMI.INTARVAL) {
				deckId1 = localStorage[dKey1];
				missionId1 = localStorage[kKey1];
				startDate1 = jTime1;
			}
		}
		
		var jTime2 = localStorage[tKey2];
		if (typeof jTime2 != "undefined") {
			// 登録から30秒以内の場合
			if(startDate - Number(jTime2) <= Constants.SMI.INTARVAL) {
				deckId2 = localStorage[dKey2];
				missionId2 = localStorage[kKey2];
				startDate2 = jTime2;
			}
		}

		this.Apns.createMessage(Constants.Apns.T_ENSEI, deckId, missionId, startDate, deckId1, missionId1, startDate1, deckId2, missionId2, startDate2);
		
		// 送付登録時間を取得
		var sendTime = localStorage[Constants.SMI.SEND_TIME];
		if (typeof sendTime != "undefined") {
			// 登録から30秒以内の場合
			if(startDate - Number(sendTime) <= Constants.SMI.INTARVAL) {
				// 実行を待つ
				console.log("wait exec");
				return;
			}
		}
		// 現在時刻を送付登録時間とする
		localStorage[Constants.SMI.SEND_TIME] = startDate;
		// 一定時間後に実行
		setTimeout(function(){
				this.Apns.forMessageStart(Constants.SMI.SAVE_MESSAGE)
			}.bind(this), Constants.SMI.INTARVAL);
		
	};
	Mission.prototype.forStartMessage = function(message){
		var deck_1 = "";
		var deck_2 = "";
		var deck_3 = "";
		var key_1 = "";
		var key_2 = "";
		var key_3 = "";
		var label_1 = "";
		var label_2 = "";
		var label_3 = "";
		var start_1 = "";
		var start_2 = "";
		var start_3 = "";
		var end_1 = "";
		var end_2 = "";
		var end_3 = "";
		var dKey1 = "";
		var dKey2 = "";
		var dKey3 = "";
		var kKey1 = "";
		var kKey2 = "";
		var kKey3 = "";
		var lKey1 = "";
		var lKey2 = "";
		var lKey3 = "";
		var sKey1 = "";
		var sKey2 = "";
		var sKey3 = "";
		var eKey1 = "";
		var eKey2 = "";
		var eKey3 = "";
		
		// パラメタから艦隊を取得する
		var deckId = message.event.params.key;
		if (typeof deckId == "undefined") {
			console.log("Undefined Error !!");
			return;
		}
		// パラメタからミッションIDを取得する
		var missionId = message.event.params.optional.missionId;
		if (typeof missionId == "undefined") {
			console.log("Undefined Error !!");
			return;
		}
		// パラメタからミッション名称を取得する
		var missionLabel = message.event.params.optional.title;
		if (typeof missionId == "undefined") {
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
		console.log("missionId : %s", missionId);
		console.log("missionLabel : %s", missionLabel);
		console.log("startTime : %d", startTime);
		console.log("endTime : %d", endTime);
		
		// 艦隊IDから取得先を決定
		switch (deckId) {
			case 2:
				dKey1 = Constants.SMI.D2;
				kKey1 = Constants.SMI.K2;
				lKey1 = Constants.SMI.L2;
				sKey1 = Constants.SMI.T2;
				eKey1 = Constants.SMI.E2;
				dKey2 = Constants.SMI.D3;
				kKey2 = Constants.SMI.K3;
				lKey2 = Constants.SMI.L3;
				sKey2 = Constants.SMI.T3;
				eKey2 = Constants.SMI.E3;
				dKey3 = Constants.SMI.D4;
				kKey3 = Constants.SMI.K4;
				lKey3 = Constants.SMI.L4;
				sKey3 = Constants.SMI.T4;
				eKey3 = Constants.SMI.E4;
				break;
			case 3:
				dKey1 = Constants.SMI.D3;
				kKey1 = Constants.SMI.K3;
				lKey1 = Constants.SMI.L3;
				sKey1 = Constants.SMI.T3;
				eKey1 = Constants.SMI.E3;
				dKey2 = Constants.SMI.D2;
				kKey2 = Constants.SMI.K2;
				lKey2 = Constants.SMI.L2;
				sKey2 = Constants.SMI.T2;
				eKey2 = Constants.SMI.E2;
				dKey3 = Constants.SMI.D4;
				kKey3 = Constants.SMI.K4;
				lKey3 = Constants.SMI.L4;
				sKey3 = Constants.SMI.T4;
				eKey3 = Constants.SMI.E4;
				break;
			case 4:
				dKey1 = Constants.SMI.D4;
				kKey1 = Constants.SMI.K4;
				lKey1 = Constants.SMI.L4;
				sKey1 = Constants.SMI.T4;
				eKey1 = Constants.SMI.E4;
				dKey2 = Constants.SMI.D2;
				kKey2 = Constants.SMI.K2;
				lKey2 = Constants.SMI.L2;
				sKey2 = Constants.SMI.T2;
				eKey2 = Constants.SMI.E2;
				dKey3 = Constants.SMI.D3;
				kKey3 = Constants.SMI.K3;
				lKey3 = Constants.SMI.L3;
				sKey3 = Constants.SMI.T3;
				eKey3 = Constants.SMI.E3;
				break;
			default:
				break;
		}
		// 現在時刻を取得する(ミリ秒)
		var startDate = Date.now();

		// 取得した値をストレージに保存
		localStorage[dKey1] = deckId;
		localStorage[kKey1] = missionId;
		localStorage[lKey1] = missionLabel;
		localStorage[sKey1] = startTime;
		localStorage[eKey1] = endTime;
		
		// 取得した値をセット
		deck_1 = deckId;
		key_1 = missionId;
		label_1 = missionLabel;
		start_1 = startTime;
		end_1 = endTime;
		
		// 時間を取得して判定
		var jTime1 = localStorage[sKey2];
		if (typeof jTime1 != "undefined") {
			// 登録から30秒以内の場合
			if(startDate - Number(jTime1) <= Constants.SMI.INTARVAL) {
				deck_2 = localStorage[dKey2];
				key_2 = localStorage[kKey2];
				label_2 = localStorage[lKey2];
				start_2 = jTime1;
				end_2 = localStorage[eKey2];
			}
		}
		
		var jTime2 = localStorage[sKey3];
		if (typeof jTime2 != "undefined") {
			// 登録から30秒以内の場合
			if(startDate - Number(jTime2) <= Constants.SMI.INTARVAL) {
				deck_3 = localStorage[dKey3];
				key_3 = localStorage[kKey3];
				label_3 = localStorage[lKey3];
				start_3 = jTime2;
				end_3 = localStorage[eKey3];
			}
		}
		
		// ウィジェット用のメッセージ作成
		this.Apns.createSendMessage(
									Constants.SMI.SAVE_MESSAGE,
									Constants.Apns.T_ENSEI,
									deck_1,
									key_1,
									label_1,
									start_1,
									end_1,
									deck_2,
									key_2,
									label_2,
									start_2,
									end_2,
									deck_3,
									key_3,
									label_3,
									start_3,
									end_3
								);
		
		
		// 送付登録時間を取得
		var sendTime = localStorage[Constants.SMI.SEND_TIME];
		if (typeof sendTime != "undefined") {
			// 登録から30秒以内の場合
			if(startDate - Number(sendTime) <= Constants.SMI.INTARVAL) {
				// 実行を待つ
				console.log("wait exec");
				return;
			}
		}
		// 現在時刻を送付登録時間とする
		localStorage[Constants.SMI.SEND_TIME] = startDate;
		// 一定時間後に実行
		setTimeout(function(){
				this.Apns.forMessageStart(Constants.SMI.SAVE_MESSAGE)
			}.bind(this), Constants.SMI.INTARVAL);
		
	};
})();
