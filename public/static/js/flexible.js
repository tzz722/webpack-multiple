;(function(window, document) {
	var docEl = document.documentElement
	var viewEl = document.querySelector('meta[name=viewport]')
	var dpr = window.devicePixelRatio || 1
	var scale = 1 / dpr
	function layout() {
		var rem = (docEl.clientWidth * 100) / 750
		docEl.style.fontSize = rem + 'px'
	}
	viewEl.setAttribute(
		'content',
		'width=device-width,initial-scale=' +
			scale +
			',maximum-scale=' +
			scale +
			',minimum-scale=' +
			scale +
			',user-scalable=no'
	)
	layout()
	window.addEventListener('resize', layout)
	window.addEventListener('pageshow', function(e) {
		if (e.presisted) {
			layout()
		}
	})
})(window, document)
