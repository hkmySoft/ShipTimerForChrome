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
		// パラメタから艦隊を取得する
		var deckId = params.api_deck_id[0];
		if (typeof deckId == "undefined") {
			console.log("Undefined Error !!");
			return;
		}
		// パラメタからミッションIDを取得する
		var missionId = params.api_mission_id[0];
		if (typeof missionId == "undefined") {
			console.log("Undefined Error !!");
			return;
		}
		// 現在時刻を取得する(ミリ秒)
		var nowDate = Date.now();

		this.Apns.createMessage(Constants.Apns.T_ENSEI, deckId, missionId, "", nowDate, "");
		this.Apns.forStart();
		
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
