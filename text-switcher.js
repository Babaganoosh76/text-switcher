var GlobalTextSwitcherArray = []

function TextSwitcher (target, strings, duration=4000) {
	
	this.target = document.querySelector(target)
	this.strings = strings
	this.duration = duration
	this.count = 0
	GlobalTextSwitcherArray.push(this)

	this.play = function() {
		var self = this
		this.interval = setInterval(function() { self.type() }, this.duration)
	}

	this.pause = function () {
		clearInterval(this.interval)
	}

	this.next_string = function () {
		return this.strings[(this.count++)%4]
	}

	this.type = function () {
		var self = this

		function remove(next) {
			var int = setInterval(function() {
				self.target.innerText = self.target.innerText.slice(0,-1)
				if (!self.target.innerText) {
					clearInterval(int)
					if (next) next()
				}
			},40)
		}

		function add(next) {
			var string = self.next_string()
			var i = 0
			var int = setInterval(function() {
				self.target.innerText += string[i++]
				if (self.target.innerText.length >= string.length) {
					clearInterval(int)
					if (next) next()
				}
			},40)
		}
		
		remove(add)
	}
	
	this.play()
}

window.addEventListener('focus', function(){
	GlobalTextSwitcherArray.forEach(function(obj){ obj.play() })
})

window.addEventListener('blur', function(){
	GlobalTextSwitcherArray.forEach(function(obj){ obj.pause() })
})
