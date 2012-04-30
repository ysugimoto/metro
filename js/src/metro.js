(function(namespace) {
	
	var doc = document;
	
	namespace.GoogleMap = GoogleMap;
	
	function GoogleMap(div) {
		var mapCanvas = doc.createElement('div'),
			map,
			latlng = new google.maps.LatLng(35.171222, 136.929165);
		
		mapCanvas.style.width = '100%';
		mapCanvas.style.height = '100%';
		
		div.appendChild(mapCanvas);
		
		map = new google.maps.Map(mapCanvas, {
			zoom : 8,
			center : latlng,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		});
	}
	
})(this.Metro || (this.Metro = {}));

(function(namespace) {
	
	var doc = document;
	
	namespace.InternetExplorer = InternetExplorer;
	
	function InternetExplorer(win) {
		var div = doc.createElement('div'),
			iframe = doc.createElement('iframe');
		
		iframe.style.width = '100%';
		iframe.style.height = '100%';
		iframe.style.background = '#FFFFFF';
		iframe.frameBorder = 0;
		iframe.src = 'http://bing.com?cc=jp';
		
		win.appendChild(div);
		div.appendChild(iframe);
	}
})(this.Metro || (this.Metro = {}));

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
	
})(this.Metro || (this.Metro = {}));(function(namespace) {
	
	var doc = document,
		loginPassword = '111111';
	
	namespace.Login = Login;
	
	function Login() {
		this.win   = doc.getElementById('login');
		this.login = doc.querySelector('#login_box form');
		this.welcome = doc.querySelector('#login_box #welcome');
		this.incorrect = doc.querySelector('#login_box #incorrect');
		
		this.login.addEventListener('submit', this, false);
		this.login.querySelector('input[type=password]').focus();
		this.incorrect.querySelector('#back_btn').addEventListener('click', this, false);
	}
	
	Login.prototype.handleEvent = function(evt) {
		evt.preventDefault();
		var val,
			box,
			that = this;
		
		switch ( evt.type ) {
			case 'submit':	
				this.login.querySelector('fieldset').style.opacity = 0;
				this.login.querySelector('input[type=password]').blur();
				setTimeout(function() {
					that.welcome.style.opacity = 1;
					that.welcome.style.display = 'block';
				}, 500);	
				val = evt.target.querySelector('#passwd');
				box = doc.querySelector('#login_box');
				
				if ( val.value === loginPassword ) {
					setTimeout(function() {
						box.className = 'correct';
						setTimeout(function() {
							that.win.style.display = 'none';
							new namespace.Main();
						}, 500);
					}, 3000);
					
				} else {
					setTimeout(function() {
						that.welcome.style.opacity = 0;
						that.welcome.addEventListener('webkitAnimationEnd', function() { alert('OK');}, false);
						setTimeout(function() {
							that.incorrect.style.display = 'block';
							that.incorrect.style.opacity = 1;
						}, 500);
					}, 2000);
				}
				break;
			case 'click':
				this.incorrect.style.opacity = 0;
				setTimeout(function() {
					that.login.querySelector('fieldset').style.opacity = 1;
					that.incorrect.style.display = 'none';
					that.welcome.style.display = 'none';
					this.login.querySelector('input[type=password]').focus();
				}, 500);
				break;
		}
	}
	
})(this.Metro || (this.Metro = {}));

(function(namespace) {
	
	var doc = window.document,
		global = window,
		prefix = ['WebkitT', 'MozT', 'MsT', 'OT', 't'],
		option,
		animationTimer,
		queue = [],
		defaultOption = {
			metroID    : 'metro',
			gridWidth  : 100,
			gridHeight : 100,
			gridSpace  : 10
		},
		features = {
			transform : '',
			transValue : ['translate(', 0, 'px,', 0, 'px)']
		},
		currentApp = null;
		
	namespace.Main = Main;
	
	function Main() {
		this.accountName = doc.querySelector('#account_name');
		this.accountName.className = 'active';
		this.accountName.addEventListener('mousedown', function() {
			this.setAttribute('data-pressed', 1);
		});
		this.accountName.addEventListener('mouseup', function() {
			this.removeAttribute('data-pressed');
		})
		
		new Metro({
			gridWidth : 140,
			gridHeight : 140,
			gridSpace : 8
		});
	}

	function mix(base, ext) {
		for ( var i in ext ) {
			if ( ext.hasOwnProperty(i) ) {
				base[i] = ext[i];
			}
		}
		return base;
	}
	
	function FeatureDetection(prop) {
		var i,
			len = prefix.length,
			property = '';
			
		for ( i = 0; i < len; ++i ) {
			if ( (prefix[i] + prop) in doc.body.style ) {
				property = prefix[i] + prop;
				break;
			}
		}
		return property;
	}
	
	function Metro(opt) {
		option = mix(defaultOption, opt || {});
		this.grid = null;
		this.wrap = doc.getElementById(option.metroID);
		this.app  = doc.getElementById('application_boot');
		this.closeApp = doc.getElementById('app_close');
		this.currentRow = 0;
		this.delayTimer = null;
		this.__construct();
	}
	
	Metro.prototype = {
		constructor : Metro,
		__construct : function() {
			features.transform = FeatureDetection('ransform');
			
			this.initGrid();
			// resize event
			global.addEventListener('resize', this, false);
			// rotation event ( smartphone )
			if ( 'orientation' in global ) {
				global.addEventListener('orientationchange', this, false);
			}
			
			this.app.addEventListener('click', function() {
				this.style.display = 'none';
			}, false);
			
			this.closeApp.addEventListener('click', this, false);
		},
		handleEvent :function(ev) {
			var that = this;
			
			switch ( ev.type ) {
			case 'resize':
			case 'orientationchange':
				try {
					clearTimeout(this.delayTimer);
				} catch (e) {
					
				} finally {
					this.delayTimer = setTimeout(function() {
						that.initGrid();
					}, 100);
				}
				break;
			case 'click':
				this.app.style.display = 'none';
				doc.body.style.overflowX = 'auto';
				break;
			}
		},
		initGrid : function() {
			var maxRow = this.wrap.offsetHeight / option.gridWidth | 0;
			
			if ( this.maxRow > 0 && maxRow === this.maxRow ) {
				return;
			}
			this.maxRow = maxRow;
			this.setElement();
			this.wrap.className = 'active';
			//this.execAnimate();
		},
		setElement : function() {
			var items = this.wrap.children || this.wrap.childNodes,
				len = items.length,
				i = 0,
				j = -1,
				metro,
				row = 0,
				x = 0,
				y = 0,
				halfUnit = option.gridWidth + option.gridSpace,
				unit = halfUnit * 2,
				halfPoint = [],
				half;
		
			queue = [];
			for ( ; i < len; ++i ) {
				if ( items[i].nodeType === 1 ) {
					metro = new MetroItem(items[i]);
					if ( metro.sizeX > 1 ) {
						metro.css(x, y);
						row++;
						y += halfUnit;
					} else {
						if ( halfPoint.length > 0 ) {
							half = halfPoint.pop();
							metro.css(half[0], half[1]);
						} else {
							metro.css(x, y);
							halfPoint.push([x + halfUnit, y]);
							row++;
							y += halfUnit;
						}
						
					}
					if ( row === this.maxRow ) {
						x += unit;
						row = 0;
						y = 0;
					}
				}
			}
			this.wrap.style.width = x + 'px';
		},
		execAnimate : function() {
			if ( features.transform ) {
				return;
			}
			
			var begin   = +new Date,
				duration = 300;
			
			animationTimer = setInterval(animate, 1000 / 60);
			
			function animate() {
				var q    = queue,
					i     = -1,
					now   = +new Date,
					time  = now - begin,
					isEnd = !(time < duration),
					pointTop,
					pointLeft;
				
				while ( q[++i] ) {
					pointTop  = ( isEnd ) ? q[i].dest.top  + q[i].defs.top
					                      : easeInOutCubic(time, q[i].defs.top,  q[i].dest.top,  duration);
					pointLeft = ( isEnd ) ? q[i].dest.left + q[i].defs.left
					                      : easeInOutCubic(time, q[i].defs.left, q[i].dest.left, duration);
					q[i].element.style.top  = (pointTop  | 0) + 'px';
					q[i].element.style.left = (pointLeft | 0) + 'px';
				}
				
				isEnd && clearInterval(animationTimer);
			}
			
			function easeInOutCubic(t, b, c, d) {
				return ( (t /= d / 2 ) < 1 )
			       ? c / 2 * t * t * t + b
			       : c / 2 * ((t -= 2) * t * t + 2) + b;
			}
		}
	};
	
	function MetroGrid(maxCol) {
		this.grid = [];
		this.row = 0;
		this.col = 0;
		this.maxCol = maxCol;
	}
	
	MetroGrid.prototype = {
		constructor : MetroGrid,
		createNewLine : function(row) {
			var i = 0;
			
			this.grid[row] = [];
			for ( ; i < this.maxCol ; ++i ) {
				this.grid[row][i] = 0;
			}
			this.grid[row][i] = 1;
		},
		put : function(item, x, y) {
			var ay = item.matrix.length,
				ax = item.matrix[0].length,
				i = 0,
				j = 0,
				flag = true;
			
			for ( ; i < ay; i++ ) {
				if ( ! this.grid[i + y] ) {
					this.createNewLine(i + y);
				}
				for ( j = 0; j < ax; j++ ) {
					if ( this.grid[i + y][j + x] != 0 ) {
						flag = false;
					}
				}
			}
			
			if ( flag === false ) {
				if ( x === this.maxCol ) {
					x = 0;
					++y;
				} else {
					++x;
				}
				this.put(item, x, y);
			} else {
				item.setGrid(this.grid, x, y);
			}
		}
	};
	
	function MetroItem(elem) {
		this.element = elem;
		this.matrix  = [];
		this.sizeX   = 1;
		this.sizeY   = 1;
		this.__construct();
	}
	
	MetroItem.prototype = {
		constructor : MetroItem,
		__construct : function() {
			var x = this.element.getAttribute('data-gridx') | 0 || 1,
				y = this.element.getAttribute('data-gridy') | 0 || 1,
				i = 0,
				j;
			
			for ( ; i < y; ++i ) {
				this.matrix[i] = [];
				for ( j = 0; j < x; ++j ) {
					this.matrix[i][j] = 1;
				}
			}
			this.sizeX = x;
			this.sizeY = y;
			this.element.style.width  = x * option.gridWidth  + (x - 1) * option.gridSpace + 'px';
			this.element.style.height = y * option.gridHeight + (y - 1) * option.gridSpace + 'px';
			this.element.addEventListener('click', this, false);
		},
		setGrid : function(grid, x, y) {
			var i = 0,
				j = 0;
			
			for ( ; i < this.matrix.length; ++i ) {
				for ( j = 0; j < this.matrix[i].length; ++j ) {
					grid[i + y][j + x] = this.element;
				}
			}
			
			this.css(
				x * (option.gridWidth  + option.gridSpace),
				y * (option.gridHeight + option.gridSpace)
			);
		},
		css : function(x, y) {
			var css = features.transform,
				value = features.transValue,
				left,
				top;
			
			// if ( css ) {
				// value[1] = x;
				// value[3] = y;
				// this.element.style[css] = value.join('');
			// } else {
				// stack queue
				//if ( this.element.style.left === (x + 'px') &&
				 //    this.element.style.top  === (y + 'px') ) {
				//}
				left = parseInt(this.element.style.left, 10) || 0;
				top  = parseInt(this.element.style.top,  10) || 0;
				this.element.style.left = x + 'px';
				this.element.style.top  = y + 'px';
				queue.push({
					element : this.element,
					defs : {
						left : left,
						top  : top
					},
					dest : {
						left : x - left,
						top  : y - top
					}
				});
			//}
		},
		handleEvent : function(evt) {
			var app = doc.getElementById('application_boot'),
				pos = evt.target.getBoundingClientRect(),
				element = evt.target,
				appName = element.getAttribute('data-app'),
				old;
			
			if ( !(appName in namespace) ) {
				return;// alert('このアプリケーションは実装してません＞＜');
			}
			if ( appName !== currentApp ) {
				if ( app.firstChild !== null ) {
					old = app.removeChild(app.firstChild);
					old = null;
				}
			}
			doc.body.style.overflowX = 'hidden';
			app.setAttribute('data-bg', evt.target.getAttribute('data-bg'));
			app.setAttribute('data-iconname', evt.target.getAttribute('data-iconname'));
			app.style.display = 'block';
			app.style.top = pos.top + 'px';
			app.style.left = pos.left + 'px';
			app.className = 'active';
			app.addEventListener('webkitAnimationEnd', function(){
				app.style.top = '0px';
				app.style.left = '0px';
				app.className = '';
				if ( appName !== currentApp ) {
					currentApp = appName;
					setTimeout(function() {
						if ( app.firstChild !== null ) {
							old = app.removeChild(app.firstChild);
							old = null;
						}
						new namespace[currentApp](app);
					}, 2000);
					
				}
			}, false);
			
			
		}
	};
	
	//namespace.Metro = Metro;
	
	
})(this.Metro || (this.Metro = {}));

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

(function(namespace) {
	
	var doc = document;
	
	// shortcuts
	namespace.Startup = Startup;
	
	function Startup() {
		this.win = doc.getElementById('startup');
		this.ctx = this.init();
		this.draw();
		
		this.killTimer();
	}
	
	Startup.prototype.killTimer = function() {
		var win = this.win;
		
		setTimeout(function() {
			doc.body.removeChild(win);
			new namespace.Screen();
		}, 10000);
	};
	
	Startup.prototype.init = function() {
		var canvas = doc.createElement('canvas');
		
		canvas.id = 'fishlogo';
		canvas.width = 400;
		canvas.height = 300;
		this.win.appendChild(canvas);
		
		return canvas.getContext('2d');
	};
	
	Startup.prototype.draw = function() {
		var ctx = this.ctx,
			grad;
		
		ctx.strokeStyle = '#ffffff';
		// 胴体
		ctx.fillStyle = '#69c8f1';
		ctx.beginPath();
		ctx.moveTo(150, 150);
		ctx.lineTo(175, 130);
		ctx.lineTo(210, 138);
		ctx.lineTo(300, 170);
		ctx.lineTo(280, 220);
		ctx.lineTo(160, 220);
		ctx.lineTo(130, 180);
		ctx.closePath();
		ctx.fill();
		
		// 尾びれ
		grad = ctx.createLinearGradient(150, 150, 20, 280);
		grad.addColorStop(0, '#b83f35');
		grad.addColorStop(1, '#d05430');
		ctx.fillStyle = grad;
		ctx.beginPath();
		ctx.moveTo(150, 150);
		ctx.lineTo(80, 175);
		ctx.lineTo(20, 280);
		ctx.lineTo(60, 280);
		ctx.lineTo(110, 240);
		ctx.closePath();
		ctx.fill();
		
		// 	背びれ2
		ctx.fillStyle = "#d23b34";
		ctx.beginPath();
		ctx.moveTo(175, 110);
		ctx.lineTo(145, 110);
		ctx.lineTo(130, 118);
		ctx.lineTo(130, 135);
		ctx.lineTo(145, 135);
		ctx.closePath();
		ctx.fill();
		
		// 背びれ
		ctx.fillStyle = '#A61F2C';
		ctx.beginPath();
		ctx.moveTo(150, 150);
		ctx.lineTo(175, 142);
		ctx.lineTo(210, 138);
		ctx.lineTo(175, 110);
		ctx.lineTo(150, 120);
		ctx.lineTo(145, 135);
		ctx.closePath();
		ctx.fill();
		
		// 頭
		ctx.fillStyle = '#55bace';
		ctx.beginPath();
		ctx.moveTo(280, 163);
		ctx.lineTo(290, 162);
		ctx.lineTo(336, 190);
		ctx.lineTo(330, 205);
		ctx.lineTo(305, 218);
		ctx.lineTo(260, 220);
		ctx.closePath();
		ctx.fill();
		
		// 胸びれ
		ctx.fillStyle = '#A61F2C';
		ctx.beginPath();
		ctx.moveTo(260, 230);
		ctx.lineTo(180, 260);
		ctx.lineTo(143, 230);
		ctx.lineTo(155, 200);
		ctx.lineTo(246, 215);
		ctx.closePath();
		ctx.fill();
		
		// エラ
		ctx.fillStyle = "#d23b34";
		ctx.beginPath();
		ctx.moveTo(285, 195);
		ctx.lineTo(280, 235);
		ctx.lineTo(260, 230);
		ctx.lineTo(240, 210);
		ctx.lineTo(230, 185);
		ctx.closePath();
		ctx.fill();
		
		// 目玉
		ctx.fillStyle = '#c7e7e8';
		ctx.beginPath();
		ctx.arc(308, 190, 9, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.fillStyle = '#050607';
		ctx.beginPath();
		ctx.arc(308, 190, 5, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.fillStyle = '#ffffff';
		ctx.beginPath();
		ctx.arc(305, 187, 2, 0, Math.PI * 2, true);
		ctx.fill();
		
		// 泡
		ctx.strokeStyle = '#ffffff';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(365, 130, 14, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(373, 95, 21, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.beginPath();
		//ctx.lineWidth = 1;
		ctx.arc(330, 16, 14, 0, Math.PI * 2, true);
		ctx.stroke();
	};
	
})(this.Metro || (this.Metro = {}));
