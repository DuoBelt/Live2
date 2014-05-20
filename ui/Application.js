jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application"); 

sap.ui.app.Application.extend("Application", {

    init: function() {
		jQuery.sap.require("sap.m.MessageBox");
		jQuery.sap.require("jquery.sap.resources");
		
		localStorage["Live2.path.default"] = "";
		if (localStorage["Live2.path"] === undefined) {
			localStorage["Live2.path"] = localStorage["Live2.path.default"];
		}

		var imgModel = new sap.ui.model.json.JSONModel("img/model.json");
		sap.ui.getCore().setModel(imgModel, "img");

		var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
		var resModel = new sap.ui.model.resource.ResourceModel({bundleUrl: "res/i18n.properties", bundleLocale: sLocale});
		sap.ui.getCore().setModel(resModel, "i18n");

		window.document.title = resModel.getProperty("appTitle");
	
    },
    
    main: function() {
        var root = this.getRoot();
        sap.ui.jsview("app", "view.App").placeAt(root);
		
    }

});
