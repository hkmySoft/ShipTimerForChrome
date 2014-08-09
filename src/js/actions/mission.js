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
		
		console.log("DeckId : %s", deckId);
		console.log("MissonID : %s", missionId);
		console.log("NowDate : %d", nowDate);
	
		this.Apns.createMessage(Constants.Apns.T_ENSEI, deckId, missionId, "", nowDate, "");
		this.Apns.forStart();
		
	};
})();
