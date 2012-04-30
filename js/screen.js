(function(namespace) {
	
	var doc = document,
		dayTimer;
	
	namespace.Screen = Screen;
	
	function Screen() {
		var that = this;
		
		this.win = doc.getElementById('screen');
		this.IS = this.win.querySelector('h1');
		this.MD = this.win.querySelector('h2');
		this.initPoint = 0;
		
		this.init();
		this.setInfo();
	}
	
	Screen.prototype.init = function() {
		this.dayPool = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
		
		this.win.addEventListener('mousedown', this, true);
		this.win.addEventListener('mouseup', this, true);
	};
	
	Screen.prototype.setInfo = function() {
		var that = this,
			d = new Date();
		
		this.IS.textContent = [d.getHours(), (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes()].join(':');
		this.MD.textContent = [d.getMonth() + 1, '月', d.getDate(), '日 ', this.dayPool[d.getDay()]].join('');
		
		dayTimer = setTimeout(function() {
			that.setInfo();
		}, 60000);
	};
	
	Screen.prototype.handleEvent = function(ev) {
		var y = ev.clientY;
		
		switch (ev.type) {
			case 'mousedown':
				this.initPoint = y;
				doc.addEventListener('mousemove', this, false);
				break;
			case 'mousemove':
				this.win.style.top = (y - this.initPoint) + 'px';
				break;
			case 'mouseup':
				doc.removeEventListener('mousemove', this);
				if ( this.initPoint - y > 2 ) {
					this.hideWindow();
				} else {
					this.animateReset();
				}
				break;
		}
	};
	
	Screen.prototype.animateReset = function(down) {
		var that = this,
			element = this.win,
			begin = new Date | 0,
			duration = 500,
			init = down ? parseInt(element.style.top, 10) : 0,
			timer;
		
		function move() {
			var now = new Date | 0,
				time = now - begin;
				
			if ( time < duration ) {
				element.style.top = (easeOutQuad(time, init, down ? 30 : -30, duration) | 0) + 'px';
			} else {
				clearInterval(timer);
				if ( ! down ) {
					setTimeout(function() {
						that.animateReset(true);
					}, 50);
				}
			}
		}
		
		function easeOutQuad(t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		}
		
		timer = setInterval(move, 1000 / 60);
	};
	
	Screen.prototype.hideWindow = function() {
		var that = this,
			element = this.win,
			begin = new Date | 0,
			duration = 500,
			init = parseInt(element.style.top, 10),
			timer;
			
		function move() {
			var now = new Date | 0,
				time = now - begin;
				
			if ( time < duration ) {
				element.style.top = (easeOutCubic(time, init, -(init + element.offsetHeight + 100), duration) | 0) + 'px';
			} else {
				clearInterval(timer);
				//clearInterval(dayTimer);
				element.style.display = 'none';
				element.style.top = '0px';
				element.removeEventListener('mousedown', this);
				element.removeEventListener('mouseup', this);
				new namespace.Login();
			}
		}
		
		function easeOutCubic(t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		}
		
		timer = setInterval(move, 1000 / 60);
	}
	
})(this.Metro || (this.Metro = {}));

