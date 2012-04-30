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
