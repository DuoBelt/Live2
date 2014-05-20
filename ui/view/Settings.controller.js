sap.ui.controller("view.Settings", {

	onAfterRendering: function() {
		var view = this.getView();
		view.oPath.setValue(localStorage["Live2.path"]);
	},

	onNavButtonTap: function() {
		app.ref.AppView.splitApp.backMaster();

	},

	doDefaultPath: function() {
		var view = this.getView();
		view.oPath.setValue(localStorage["Live2.path.default"]);
		sap.m.MessageBox.show("Path reset to default.",sap.m.MessageBox.Icon.INFORMATION,"{i18n>information}",sap.m.MessageBox.Action.CLOSE);
	},

	submitPathForm: function() {
		var view = this.getView();
		localStorage["Live2.path"] = view.oPath.getValue();
		sap.m.MessageBox.show("Path saved.",sap.m.MessageBox.Icon.INFORMATION,"{i18n>information}",sap.m.MessageBox.Action.CLOSE);
	},
	
	submitLPForm: function() {
		var view = this.getView();
		var LPMethod = 1;
		if (view.oLPRB2.getSelected()) {
			LPMethod = 2;
		} else if (view.oLPRB3.getSelected()) {
			LPMethod = 3;
		} else if (view.oLPRB4.getSelected()) {
			LPMethod = 4;
		}
		$.ajax({
			url: localStorage["Live2.path"] + "lp.xsjs?method=" + LPMethod,
			type: 'get',
			async: false,
			error: function (data) {
				console.log(data);
				sap.m.MessageBox.show("An issue was encountered - see console log.",sap.m.MessageBox.Icon.INFORMATION,"{i18n>information}",sap.m.MessageBox.Action.CLOSE);
			}, 
			success: function (data) {
				sap.m.MessageBox.show(data.msg,sap.m.MessageBox.Icon.INFORMATION,"{i18n>information}",sap.m.MessageBox.Action.CLOSE);
			}
		});
	}

});
