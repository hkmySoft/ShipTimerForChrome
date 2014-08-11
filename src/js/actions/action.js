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
		this.awsFlg = (localStorage[Constants.Strage.AWS_SNS_COMP_KEY] == "OK") ? true: false;

	};
	Action.prototype.forMissionStart = function(params){
		if(!this.awsFlg) return;
		var mntrFlg = (localStorage[Constants.Strage.MONITOR_FLG] == "ON") ? true : false;
		if(!mntrFlg) return;
		// TODO ↓遠征IDがないため一旦この処理を作成↓
		var useFlg =  (localStorage[Constants.WgdtSet.B_USE] == "ON") ? true : false;
		var chkFlg =  (localStorage[Constants.WgdtSet.B_ENSEI] == "ON") ? true : false;
		if ((useFlg && chkFlg) || !useFlg){
			// ウィジェット使用するかつ遠征ONまたはウィジェット使用しない
			this.mission.forStart(params);
		}
		// TODO ↑遠征IDがないため一旦この処理を作成↑
	};
	Action.prototype.forMissionStartMessage = function(params){
		if(!this.awsFlg) return;
		var mntrFlg = (localStorage[Constants.Strage.MONITOR_FLG] == "ON") ? true : false;
		if(!mntrFlg) return;
		var useFlg =  (localStorage[Constants.WgdtSet.B_USE] == "ON") ? true : false;
		if(!useFlg) return;
		var chkFlg =  (localStorage[Constants.WgdtSet.B_ENSEI] == "ON") ? true : false;
		if(!chkFlg) return;
		this.mission.forStartMessage(params);
	};
	Action.prototype.forHospitalStartMessage = function(params){
		console.log("HOSPITAL IN");
		if(!this.awsFlg) return;
		var mntrFlg = (localStorage[Constants.Strage.MONITOR_FLG] == "ON") ? true : false;
		if(!mntrFlg) return;
		var useFlg =  (localStorage[Constants.WgdtSet.B_USE] == "ON") ? true : false;
		if(!useFlg) return;
		var chkFlg =  (localStorage[Constants.WgdtSet.B_NYUKYO] == "ON") ? true : false;
		if(!chkFlg) return;
		this.hospital.forStartMessage(params);
	};
	Action.prototype.forBuildStartMessage = function(params){
		if(!this.awsFlg) return;
		var mntrFlg = (localStorage[Constants.Strage.MONITOR_FLG] == "ON") ? true : false;
		if(!mntrFlg) return;
		var useFlg =  (localStorage[Constants.WgdtSet.B_USE] == "ON") ? true : false;
		if(!useFlg) return;
		var chkFlg =  (localStorage[Constants.WgdtSet.B_BUILD] == "ON") ? true : false;
		if(!chkFlg) return;
		this.build.forStartMessage(params);
	};
})();
