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
		setTimeout(this.Apns.forSendMissionMessage.bind(this.Apns), Constants.SMI.INTARVAL);
		
	};
	Mission.prototype.forStartMessage = function(message){
		// パラメタから艦隊を取得する
		var deckId = message.event.params.id;
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
	
		this.Apns.createMessage(Constants.Apns.T_ENSEI, deckId, missionId, missionLabel, startTime, endTime);
		this.Apns.forStart();
		
	};
})();
