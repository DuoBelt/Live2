sap.ui.controller("view.Suggestions", {

	onNavButtonTap: function() {
		app.ref.AppView.splitApp.backMaster();
	},

	doSuggestions: function() {
		if (localStorage["Live2.memberId"] === undefined) {
			app.ref.AppView.getController().doReset();
			return;
		}
		var view = this.getView();
		$.ajax({
			url: localStorage["Live2.path"] + "services.xsodata/Members(" + localStorage["Live2.memberId"] + ")/?$format=json&$select=firstName,lastName",
			type: 'get',
			error: function (dataMember) { console.log(dataMember);}, 
			success: function (dataMember) { 
				$.ajax({
					url: localStorage["Live2.path"] + "services.xsodata/Suggestions/?$format=json&$filter=memberIdFrom eq " + localStorage["Live2.memberId"] + "&$expand=Members",
					type: 'get',
					error: function (dataSuggestions) { console.log(dataSuggestions);}, 
					success: function (dataSuggestions) { 
						var str = "<p>Hello <b>" + dataMember.d.firstName + " " + dataMember.d.lastName + "!</b><br><br>You have " + dataSuggestions.d.results.length + " suggested new contacts:</p>";
						view.oSuggestionsHeader.setContent(str);
						view.oSuggestionsList.removeAllItems();							
						for (var i=0; i < dataSuggestions.d.results.length; i++){
							view.oSuggestionsList.insertItem(							
								new sap.m.StandardListItem({
									title: dataSuggestions.d.results[i].Members.results[0].firstName + " " + dataSuggestions.d.results[i].Members.results[0].lastName,
									icon: "img/" + dataSuggestions.d.results[i].Members.results[0].avatar,
									activeIcon: "img/" + dataSuggestions.d.results[i].Members.results[0].avatar,
									iconDensityAware: false,
									iconInset: false,
									info: "# " + dataSuggestions.d.results[i].Members.results[0].memberId
									})
							,i);							
						}
						view.oSuggestionsFooter.setContent("<p>Member # " + localStorage["Live2.memberId"] + "</p>");
						view.oSuggestionsPullToRefresh.hide();
						app.ref.AppView.splitApp.toDetail("suggestions");
					}
				});
			}
		});
	}	

});
