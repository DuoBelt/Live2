sap.ui.jsview("view.Settings", {

	getControllerName : function() {
		return "view.Settings";
	},

    createContent : function(oController) {

		this.oLPRB1 = new sap.m.RadioButton({  
			text: "Common Neighbors",  
			selected: true,  
			groupName:"LPMethodGroup", 
		}).addStyleClass('margin');
		this.oLPRB2 = new sap.m.RadioButton({  
			text: "Jaccard's Coefficient",  
			selected: false,  
			groupName:"LPMethodGroup", 
		}).addStyleClass('margin');
		this.oLPRB3 = new sap.m.RadioButton({  
			text: "Adamic/Adar",  
			selected: false,  
			groupName:"LPMethodGroup", 
		}).addStyleClass('margin');
		this.oLPRB4 = new sap.m.RadioButton({  
			text: "Katz",  
			selected: false,  
			groupName:"LPMethodGroup", 
		}).addStyleClass('margin');
		
		var oLPVBox = new sap.m.VBox("LPVBox", {
			alignItems: sap.m.FlexAlignItems.Left,
			items:[
				this.oLPRB1,
				this.oLPRB2,
				this.oLPRB3,
				this.oLPRB4
			]
		});

		this.oPath = new sap.m.Input({type: 'Text', width: '300px'}).addStyleClass('margin');
		var oPathVBox = new sap.m.VBox("pathVBox", {
			alignItems: sap.m.FlexAlignItems.Left,
			items:[
				new sap.m.Label({text: "", design: sap.m.LabelDesign.Bold}).addStyleClass('margin'),
				new sap.m.Label({text: "Path", design: sap.m.LabelDesign.Bold}).addStyleClass('margin'),
				this.oPath
			]
		});

		return new sap.m.Page( {
			title: "{i18n>settings}",
			showNavButton: true,
			navButtonTap: [oController.onNavButtonTap],
			content: [
				new sap.m.Label({
					text: "Method", 
					design: sap.m.LabelDesign.Bold
				}).addStyleClass('margin'),
				oLPVBox,
				new sap.m.Button({
					text: "{i18n>ok}", 
					type: sap.m.ButtonType.Emphasized,						
					press: function() {oController.submitLPForm()}
				}).addStyleClass('margin') /*,
				oPathVBox,
				new sap.m.Button({
						text: "{i18n>ok}", 
						type: sap.m.ButtonType.Emphasized,						
						press: function () {oController.submitPathForm();}
						}).addStyleClass('margin'),
				new sap.m.Button({
						text: "Reset to Default", 
						type: sap.m.ButtonType.Emphasized,						
						press: function () {oController.doDefaultPath();}
						}).addStyleClass('margin') */
			]
		});
    }

});
