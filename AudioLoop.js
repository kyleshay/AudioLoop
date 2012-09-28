function AudioLoop() {
	this.load = function(name, file, start, length) {
		this.name = name;
		this.length = length;
		this.audio = new Audio();
		this.audio.setAttribute("src", file);
		this.audio.load();
		this.start = start;
		
		var t = this;
		this.audio.addEventListener('timeupdate', function() {			
			if(this.currentTime < t.start) {
				this.currentTime = t.start;
			}
			if(this.currentTime >= t.length + t.start) {
				this.currentTime = t.start;
				if(t.safeStop) {
					t.stopped = true;
				}
			}
		});
		
		this.reset();
	}
	this.play = function() {
		this.playing = true;
		var t = this;
		this.audio.play();
	}
	this.stop = function() {
		this.playing = false;
		clearInterval(this.interval);
		this.audio.load();
	}
	this.reset = function() {
		this.safeStop = false;
		this.stopped = false;
	}	
}