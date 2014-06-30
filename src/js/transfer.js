/**
 * transfer.js
 * iframeの抽出・リダイレクト処理を行う
 */
 (function(){
	'use strict';
	setTimeout(function(){
		var iframeUrl = document.getElementsByTagName('iframe').item(0).getAttribute('src');
		location.replace(iframeUrl);
	}, 300);
})();
