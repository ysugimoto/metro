/**
 * @author sugimoto
 */
(function(namespace) {
	
	var doc = document;
	
	namespace.Loading = Loading;
	
	// alias
	var loop = window.setInterval,
		sqrt = Math.sqrt,
		rad = Math.PI / 180,
		cos = Math.cos,
		sin = Math.sin;

	function Loading(div) {
		var circle = doc.createElement('div');
		
		div.className = 'loading';
		div.appendChild(circle);
		//this.ctx = this.init();
		//this.draw();
	}
	
	Loading.prototype.init = function() {
		var canvas = doc.createElement('canvas');
		
		canvas.id = 'loading';
		canvas.width = 100;
		canvas.height = 100;
		doc.body.appendChild(canvas);
		
		return canvas.getContext('2d');
	};
	
	Loading.prototype.draw = function() {
		var ctx = this.ctx,
			i = 0;
			
		
		ctx.fillStyle = '#FFFFFF';
		for ( ; i < 8; ++i ) {
			new this.circle(ctx);
		}
	};
	
	Loading.prototype.circle = function(num, ctx) {
		this.ctx = ctx;
		this.num = num;
		this.draw();
	};
	
	Loading.prototype.circle.prototype.draw = function() {
		var that = this,
			ctx = this.ctx,
			angle,
			timer,
			duration = 2000,
			begin = new Date | 0;
		
		function draw() {
			var now = new Date | 0,
				time = now - begin;
			
			if ( time < duration ) {
				angle = easeInOutCirc(time, 90 + this.num, 360, duration);
				console.log(angle);
				ctx.save();
				ctx.clearRect(0, 0, 100, 100);
				ctx.beginPath();
				ctx.arc(40 + 40 * cos(angle * rad), 40 + 40 * sin(angle * rad), 2, 0, 2 * rad, true);
				ctx.fill();
				ctx.restore();
			} else {
				ctx.clearRect(0, 0, 100, 100);
				clearInterval(timer);
				setTimeout(function() {
					that.draw();
				}, 500);
			}
		}
		
		function easeInOutCirc(t, b, c, d) {
			if((t/=d/2) < 1) return -c/2 *(Math.sqrt(1 - t*t) - 1) + b;
			return c/2 *(Math.sqrt(1 -(t-=2)*t) + 1) + b;
		}
		
		timer = setInterval(draw, 1000 / 60);
	};
	
})(this.Metro || (this.Metro = {}));