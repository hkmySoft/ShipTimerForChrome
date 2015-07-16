/**
 * transfer.js
 * iframeの抽出・リダイレクト処理を行う
 */
 (function(){
	'use strict';
	setTimeout(function(){
		var iframeUrl = document.getElementById("game_frame").getAttribute('src');
		location.replace(iframeUrl);
	}, 300);
})();
