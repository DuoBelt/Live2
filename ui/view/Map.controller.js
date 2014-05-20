sap.ui.controller("view.Map", {

	onInit: function() {
		this.getView().byId("mapCanvas").addStyleClass("gMap");  
	},

	onNavButtonTap: function() {
		app.ref.AppView.splitApp.backMaster();
	},

	onAfterRendering: function() {
		if (!this.initialized) {  
			this.initialized = true;  
			this.geocoder = new google.maps.Geocoder();  
			this.markersArray = [];
			var mapOptions = {  
				center: new google.maps.LatLng(51.5,0), // Greenwich :-)  
				zoom: 2,
				mapTypeId: google.maps.MapTypeId.ROADMAP  
			};
			this.map = new google.maps.Map(this.getView().byId("mapCanvas").getDomRef(), mapOptions);  
		}
	},

	doMap: function() {

		if (localStorage["Live2.memberId"] === undefined) {
			app.ref.AppView.getController().doReset();
			return;
		}
		var view = this.getView();
		var map = this.map;
		for (var i = 0; i < this.markersArray.length; i++ ) {
			this.markersArray[i].setMap(null);
		}
		this.markersArray = [];
		$.ajax({
			url: localStorage["Live2.path"] + "services.xsodata/Members(" + localStorage["Live2.memberId"] + ")/?$format=json&$select=firstName,lastName,lat,lon",
			type: 'get',
			error: function (dataMember) { console.log(dataMember);}, 
			success: function (dataMember) { 
				var pos = new google.maps.LatLng(dataMember.d.lat,dataMember.d.lon);
				map.setCenter(pos);
				map.setZoom(2);
				var marker = new google.maps.Marker({ 
					position: pos, 
					map: map, 
					icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', 
					title: dataMember.d.firstName + " " + dataMember.d.lastName
				});
				app.ref.MapView.getController().markersArray.push(marker);
				$.ajax({
					url: localStorage["Live2.path"] + "services.xsodata/Suggestions/?$format=json&$filter=memberIdFrom eq " + localStorage["Live2.memberId"] + "&$expand=Members",
					type: 'get',
					error: function (dataSuggestions) { console.log(dataSuggestions);}, 
					success: function (dataSuggestions) { 
						for (var i=0; i < dataSuggestions.d.results.length; i++){
							var pos = new google.maps.LatLng(dataSuggestions.d.results[i].Members.results[0].lat,dataSuggestions.d.results[i].Members.results[0].lon);
							var marker = new google.maps.Marker({
								position: pos,
								map: map,
								icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', 
								title: dataSuggestions.d.results[i].Members.results[0].firstName + " " + dataSuggestions.d.results[i].Members.results[0].lastName
							});
							app.ref.MapView.getController().markersArray.push(marker);
						}
						app.ref.AppView.splitApp.toDetail("map");
					}
				});
			}
		});

	},

});
