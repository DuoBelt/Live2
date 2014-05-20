sap.ui.jsview("view.App", {

	getControllerName: function() {
		return "view.App";
	},

	createContent: function(oController) {

		jQuery.sap.declare("app.ref.AppView"); 
		app.ref.AppView = this;

		this.splitApp = new sap.m.SplitApp();

		var menu = sap.m.Page( {
			title: "{i18n>appTitle}",
			icon: "{img>/icon/sap}",
			content: [
				new sap.m.List({
					items : [
						new sap.m.StandardListItem({
							title: "{i18n>overview}", 
							type: "Navigation", 
							icon: "{img>/icon/overview}", 
							tap: function() {oController.onListItemTap("overview")}
						}),
						new sap.m.StandardListItem({
							title: "{i18n>login}", 
							type: "Navigation", 
							icon: "{img>/icon/login}",
							tap: function() {oController.onListItemTap("login")}
						}),
						new sap.m.StandardListItem({
							title: "{i18n>suggestions}", 
							type: "Navigation", 
							icon: "{img>/icon/suggestions}",
							tap: function() {oController.onListItemTap("suggestions")}
						}),
						new sap.m.StandardListItem({
							title: "{i18n>map}", 
							type: "Navigation", 
							icon: "{img>/icon/map}",
							tap: function() {oController.onListItemTap("map")}
						}),
						new sap.m.StandardListItem({
							title: "{i18n>settings}", 
							type: "Navigation", 
							icon: "{img>/icon/settings}",
							tap: function() {oController.onListItemTap("settings")}
						}),
						new sap.m.StandardListItem({
							title: "{i18n>about}", 
							type: "Navigation", 
							icon: "{img>/icon/about}",
							tap: function() {oController.onListItemTap("about")}
						})
					]
				}) 
			],
			footer: new sap.m.Bar({
				contentLeft: new sap.m.Image({
					src: "{img>/icon/academy}",
					height: "34px",
					width: "34px",									
					press: function() {window.open("http://academy.saphana.com")}
				}).addStyleClass('margin'),
				contentMiddle: new sap.m.Label({
					text: "{i18n>academy}", 
					design: sap.m.LabelDesign.Bold
				}),
				contentRight: new sap.m.Image({
					src: "{img>/icon/reset}", 
					height: "24px",
					width: "24px",									
					press: function() {oController.doReset();}
				}).addStyleClass('margin')
			})
		});
		this.splitApp.addMasterPage(menu);

		this.splitApp.addDetailPage(sap.ui.jsview("overview", "view.Overview"));
		this.splitApp.addDetailPage(sap.ui.jsview("login", "view.Login"));
		this.splitApp.addDetailPage(sap.ui.jsview("suggestions", "view.Suggestions"));
		this.splitApp.addDetailPage(sap.ui.jsview("map", "view.Map"));
		this.splitApp.addDetailPage(sap.ui.jsview("settings", "view.Settings"));
		this.splitApp.addDetailPage(sap.ui.jsview("about", "view.About"));

		var memberId = jQuery.sap.getUriParameters().get("memberId");
		if (memberId !== null) {
			app.ref.LoginView.getController().doLogin(memberId);
		}
		else if (localStorage["Live2.memberId"] === undefined) {
			this.splitApp.setInitialDetail("login");
		}
		else {
			app.ref.SuggestionsView.getController().doSuggestions();
		}

		return this.splitApp;

	}

});
