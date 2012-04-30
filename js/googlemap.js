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

