sap.ui.jsview("view.Login", {

	getControllerName: function() {
		return "view.Login";
	},

	createContent: function(oController) {

		jQuery.sap.declare("app.ref.LoginView"); 
		app.ref.LoginView = this;

		this.oMemberId = new sap.m.Input({
			type: 'Number', 
			width: '60px', 
			change: function() {oController.submitLoginForm()}
			}).addStyleClass('margin');

		var oMemberHBox = new sap.m.HBox("memberHBox1", {
			alignItems: sap.m.FlexAlignItems.Center,
			items:[
				new sap.m.Label({
					text: "{i18n>memberNr}", 
					required: true, 
					design: sap.m.LabelDesign.Bold
					}).addStyleClass('margin'),
				this.oMemberId,
				new sap.m.Button({
					text: "{i18n>ok}", 
					type: sap.m.ButtonType.Emphasized,						
					press: function() {oController.submitLoginForm()}
					}).addStyleClass('margin') 
			]
		});

		return new sap.m.Page({
			title: "{i18n>login}",
			showNavButton: true,
			navButtonTap: [oController.onNavButtonTap],
			content: [
				new sap.ui.core.HTML({content:
					'<p>Please login:</p>'
				}),
				oMemberHBox
			]
		});

	}

});
