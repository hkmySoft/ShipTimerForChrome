/**
 * action.js
 * 拡張用、色々なJSファイルで定義してある処理を統合する
 */
var ShipTimer = ShipTimer || {};
(function(){
	"use strict";
	var Action = ShipTimer.Action = function(){
		this.mission = new ShipTimer.Mission();
		this.awsFlg = (localStorage[Constants.Strage.AWS_SNS_COMP_KEY] == "OK") ? true: false;
		this.mntrFlg = (localStorage[Constants.Strage.MONITOR_FLG] == "ON") ? true : false;

	};
	Action.prototype.forMissionStart = function(params){
		if(!this.awsFlg) return;
		if(!this.mntrFlg) return;
		this.mission.forStart(params);
	};
})();
