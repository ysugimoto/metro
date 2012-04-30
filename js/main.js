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

