var switcher
var strings = ['Experienced IT Consulting', 'Affordable IT Services', 'Dedicated Web Development', 'Reliable Voice-Over-IP']
var duration = 3000
var count = 0

var main_interval

document.addEventListener('DOMContentLoaded', function() {
	switcher = document.querySelector('#text-switcher > #text')
	main_interval = setInterval(text_type, 4000)
})

window.addEventListener('focus', function(){
	console.log('focus')
	main_interval = setInterval(text_type, 4000)
})

window.addEventListener('blur', function(){
	console.log('blur')
	clearInterval(main_interval)
})

function next_string() {
	return strings[(count++)%4]
}

// String will be instantly swapped
function text_switch(){
	switcher.text(next_string())
}

// Current string will be deleted one letter at a time, then re-added into the next string
// Optional cursor animation
function text_type() {
	
	function dw(callback) {
		int = setInterval(function() {
			// switcher.text(function(i,s) { return s.slice(0, -1) })
			switcher.innerText = switcher.innerText.slice(0,-1)
			if (!switcher.innerText) {
				clearInterval(int)
				callback()
			}
		},40)
	}

	function aw() {
		target = next_string()
		i = 0
		int = setInterval(function() {
			switcher.innerText += target[i++]
			// switcher.append(function(i,s) { return target[s.length] })
			if (switcher.innerText.length == target.length) clearInterval(int)
		},40)
		// console.log(target, count, int)
	}

	dw(aw)
}

// function text_wave() {
// 	switcher.empty()
// 	target = next_string()
// 	for (var i = 0; i < target.length; i++) {
// 		switcher.append('<span>'+target[i]+'</span')
// 	}

// 	var anim_slide = anime({
// 		targets: document.querySelectorAll('#text-switcher span'),
// 		translateY: [
// 			{value: -30, easing: 'easeOutQuad'},
// 			{value: 0, easing: 'easeInQuad'}
// 		],
// 		scale: [0.5, 1],
// 		opacity: [0, 1],
// 		delay: anime.stagger(15),
// 		easing: 'linear',
// 		duration: 500,
// 	})
// }