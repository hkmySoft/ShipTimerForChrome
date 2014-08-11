/**
 * dispatcher.js
 */
var ShipTimer = ShipTimer || {};
(function(){
	"use strict";
	var Dispatcher = ShipTimer.Dispatcher = function(){
		this.keyword = null;
		this.params  = null;
		this.rawData = null;
	};
	Dispatcher.prototype.eat = function(data){
		this.rawData = data;
		if(data.url.match(/\/kcsapi\//)){
			this.keyword = data.url.match(/\/kcsapi\/(.*)/)[1];
			if(data.method === 'POST'){
				this.params = data.requestBody.formData;
			}
		}
		return this;
	};
	Dispatcher.prototype.eat_m = function(message){
		if(typeof message != 'undefined'){
			switch(message.event.target){
				case Constants.Apns.T_ENSEI:
					// TODO 遠征IDがないため一旦コメント
					// this.action.forMissionStartMessage(message);
					break;
				case Constants.Apns.T_NYUKYO:
					this.action.forHospitalStartMessage(message);
					break;
				case Constants.Apns.T_BUILD:
					this.action.forBuildStartMessage(message);
					break;
				default:
					console.log(message);
			}
		}
		
		
	};
	Dispatcher.prototype.bind = function(_action){
		this.action = _action;
		return this;
	};
	Dispatcher.prototype.execute = function(){
		switch(this.keyword){
			case 'api_req_mission/start':
				this.action.forMissionStart(this.params);
				break;
			default:
				//console.log(this.keyword);
				//console.log(this.params);
		}
		return this._refresh();
	};
	/**
	 * インスタンスのkeywordをリセットする
	 * @returns {*}
	 * @private
	*/
	Dispatcher.prototype._refresh = function(){
		this.keyword = null;
		return this;
	};
})();
