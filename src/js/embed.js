/**
 * embed.js
 * ゲーム画面部分抽出処理を行う
 */
var targetFlashes = [
	'#externalswf',
	'#maintenanceswf',
	'#entranceswf'
];

$(function(){
	'use strict';

	/**
	 * embed要素取得
	 */
	var getFlash = (function() {
		var count = 0;
		return function() {
			var $embedElement = null;

			try {
				// 必要なembed要素が来たら次の処理へ
				targetFlashes.forEach(function(elem) {
					$embedElement = $(elem);
					if($embedElement.length > 0) {
						throw true;
					}
				});
			} catch (e) {
				if(e === true) {
					// 初期化処理へ移動
					setupSTWindow($embedElement);
					return;
				}
				// 存在するまで繰り返し
				throw e;
			}
			// 最後まで到達
			// 限界数超えて実行
			count = count + 1;
			if(count >= Constants.Hanyou.MAX_REPEAT) {
				alert('エラー。再実行してみてください。');
				window.close();
				return;
			}
			// 繰り返し
			window.setTimeout(getFlash, 1000);
		};
	})();
	
	/**
	 * 初期化処理
	 */
	var setupSTWindow = function($embedElement) {
		// divタグ置き換え
		$('#flashWrap').replaceWith($embedElement);

		// divを削除
		$('div').remove();

		// 背景:黒
		$('body').css('background-color', 'black');

		// リサイズ
		$embedElement.css('position', 'absolute');
		$embedElement.css('top', '50%');
		$embedElement.css('left', '50%');

		/**
		 * リサイズ時処理
		 */
		var onResize = function() {
			// アスペクト比算出
			var width = window.innerWidth;
			var height = window.innerHeight;
			var aspect = height / width;
			if( aspect > 0.6 ){
				height = width * 0.6;
			} else if( aspect < 0.6 ){
				width = height / 0.6;
			}
			// Flash要素への適用
			$embedElement.attr('height', height);
			$embedElement.attr('width', width);
			$embedElement.css('margin-top', -height/2);
			$embedElement.css('margin-left', -width/2);
		};
		// 初回実行
		onResize();
		// リサイズ時への登録
		$(window).resize(onResize);
	};
	
	// favicon設定
	$('<link/>').attr({
		rel : 'shortcut icon',
		href: 'https://raw.github.com/hkmySoft/ShipTimerForChrome/master/src/img/dmm.ico'
	}).appendTo('head');

	// embed要素取得処理初回起動
	setTimeout(getFlash, 1000);

});
