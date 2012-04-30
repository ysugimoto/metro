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

