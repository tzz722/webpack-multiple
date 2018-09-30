//  首屏加载
;(() => {
	let wrap = document.createElement('DIV')
	let body = document.querySelector('body')
	wrap.classList = 'welcome-wrap'
	let random = Math.random() >= 0.5
	wrap.innerHTML = `<div class="loader"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`
	wrap.style.backgroundColor = 'white'
	body.appendChild(wrap)
	let interval = window.setInterval(() => {
		if (document.querySelector('.app-Warp')) {
			// wrap.classList.add("welcome-wrap-out");
			window.clearInterval(interval)
			// setTimeout(() => {
			body.removeChild(wrap)
			// }, 1000);
		}
	}, 200)
})()
