/**
 * util.js
 * 諸処理を行う
 */
var Util = Util || {};
(function() {
	'use strict';

	/**
	* バッジ関連
	*/
	Util.badge = {
		OAuth_Error : function(){
			Util.badge._text('X');
			Util.badge._color('#F00');
			Util.badge._title(Constants.Hanyou.OAUTH_ERR_TOOL_TIP);
		},
		Device_Error : function(){
			Util.badge._text('X');
			Util.badge._color('#ffd700');
			Util.badge._title(Constants.Hanyou.DEVICE_ERR_TOOL_TIP);
		},
		clear : function(){
			Util.badge._text('');
			Util.badge._title('');
		},
		_text : function(text) {
			if(text == null) { text = ''; }
				chrome.browserAction.setBadgeText({text:text});
		},
		_title : function(text) {
			if(text == null) { text = Constants.Hanyou.DEFAULT_TOOL_TIP; }
			if(text == '') { text = Constants.Hanyou.DEFAULT_TOOL_TIP; }
				chrome.browserAction.setTitle({title:text});
		},
		_color : function(color){
			chrome.browserAction.setBadgeBackgroundColor({color:color});
		}
	};
	/**
	 * 艦これゲーム画面表示
	 */
	Util.openSTWindow = function(){
		chrome.windows.create({
			url: Constants.StWin.KANCOLLE + Constants.StWin.SUFFIX,
			width:  Constants.StWin.WIDTH,
			height: Constants.StWin.HEIGHT,
			left: Constants.StWin.LEFT,
			top: Constants.StWin.TOP,
			type: Constants.StWin.TYPE
		},function(window){});
	};
})();
