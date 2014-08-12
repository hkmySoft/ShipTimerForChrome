/**
 * hospital.js
 * 入渠用処理
 */
var ShipTimer = ShipTimer || {};
(function(){
	"use strict";
	var Hospital = ShipTimer.Hospital = function(){
		this.Apns = new ShipTimer.Apns();
	};


	Hospital.prototype.forStartMessage = function(message){
		// パラメタからドックを取得する
		var deckId = message.event.params.id;
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
		
		this.Apns.createMessage(Constants.Apns.T_NYUKYO, deckId, "", "", startTime, endTime);
		this.Apns.forStart();
		this.Apns.forStart();
		
	};
})();