(function(namespace) {
	
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

