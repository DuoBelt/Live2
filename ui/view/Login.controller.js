sap.ui.controller("view.Login", {

	onNavButtonTap: function() {
		app.ref.AppView.splitApp.backMaster();

	},

	submitLoginForm: function() {
		var view = this.getView();
		if (this.validateLoginFields()) {
			this.doLogin(view.oMemberId.getValue()); 
		}
		else {
			sap.m.MessageBox.show('Please enter your member #.',sap.m.MessageBox.Icon.INFORMATION,"{i18n>information}",sap.m.MessageBox.Action.CLOSE);
		}
	},
	
	validateLoginFields: function() {
		var view = this.getView();
		if (view.oMemberId.getValue() === "")
			return false;
		return true; 
	},
	
	doLogin: function(memberId) {
		$.ajax({
			url: localStorage["Live2.path"] + "services.xsodata/Members(" + escape(memberId) + ")?$format=json",
			type: 'get',
			error: function (data) {
				sap.m.MessageBox.show('Not found - please try again.',sap.m.MessageBox.Icon.INFORMATION,"{i18n>information}",sap.m.MessageBox.Action.CLOSE);
			}, 
			success: function (data) { 
				localStorage["Live2.memberId"] = data.d.memberId;
				app.ref.SuggestionsView.getController().doSuggestions();
			}
		});
	}

});
