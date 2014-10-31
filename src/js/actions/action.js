/**
 * action.js
 * 拡張用、色々なJSファイルで定義してある処理を統合する
 */
var ShipTimer = ShipTimer || {};
(function(){
	"use strict";
	var Action = ShipTimer.Action = function(){
		this.mission = new ShipTimer.Mission();
		this.hospital = new ShipTimer.Hospital();
		this.build = new ShipTimer.Build();
	};
	Action.prototype.forMissionStart = function(params){
		var awsFlg = (localStorage[Constants.Strage.AWS_SNS_COMP_KEY] == "OK") ? true: false;
		if(!awsFlg) return;
		var mntrFlg = (localStorage[Constants.Strage.MONITOR_FLG] == "ON") ? true : false;
		if(!mntrFlg) return;
		var useFlg =  (localStorage[Constants.WdgtSet.B_USE] == "ON") ? true : false;
		if(useFlg) return;
		this.mission.forStart(params);
	};
	Action.prototype.forMissionStartMessage = function(params){
		var awsFlg = (localStorage[Constants.Strage.AWS_SNS_COMP_KEY] == "OK") ? true: false;
		if(!awsFlg) return;
		var mntrFlg = (localStorage[Constants.Strage.MONITOR_FLG] == "ON") ? true : false;
		if(!mntrFlg) return;
		var useFlg =  (localStorage[Constants.WdgtSet.B_USE] == "ON") ? true : false;
		if(!useFlg) return;
		var chkFlg =  (localStorage[Constants.WdgtSet.B_ENSEI] == "ON") ? true : false;
		if(!chkFlg) return;
		this.mission.forStartMessage(params);
	};
	Action.prototype.forHospitalStartMessage = function(params){
		var awsFlg = (localStorage[Constants.Strage.AWS_SNS_COMP_KEY] == "OK") ? true: false;
		if(!awsFlg) return;
		var mntrFlg = (localStorage[Constants.Strage.MONITOR_FLG] == "ON") ? true : false;
		if(!mntrFlg) return;
		var useFlg =  (localStorage[Constants.WdgtSet.B_USE] == "ON") ? true : false;
		if(!useFlg) return;
		var chkFlg =  (localStorage[Constants.WdgtSet.B_NYUKYO] == "ON") ? true : false;
		if(!chkFlg) return;
		this.hospital.forStartMessage(params);
	};
	Action.prototype.forBuildStartMessage = function(params){
		var awsFlg = (localStorage[Constants.Strage.AWS_SNS_COMP_KEY] == "OK") ? true: false;
		if(!awsFlg) return;
		var mntrFlg = (localStorage[Constants.Strage.MONITOR_FLG] == "ON") ? true : false;
		if(!mntrFlg) return;
		var useFlg =  (localStorage[Constants.WdgtSet.B_USE] == "ON") ? true : false;
		if(!useFlg) return;
		var chkFlg =  (localStorage[Constants.WdgtSet.B_BUILD] == "ON") ? true : false;
		if(!chkFlg) return;
		this.build.forStartMessage(params);
	};
})();
