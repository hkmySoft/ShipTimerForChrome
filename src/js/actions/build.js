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
		
		this.Apns.createMessage(Constants.Apns.T_BUILD, deckId, "", "", startTime, endTime);
		this.Apns.forStart();
		
	};
})();