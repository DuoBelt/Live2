sap.ui.jsview("view.Suggestions", {

      getControllerName : function() {
         return "view.Suggestions";
      },

      createContent : function(oController) {

			jQuery.sap.declare("app.ref.SuggestionsView"); 
			app.ref.SuggestionsView = this;

			this.oSuggestionsPullToRefresh = new sap.m.PullToRefresh({ refresh: function() {oController.doSuggestions()}});
			this.oSuggestionsHeader = new sap.ui.core.HTML({});
			this.oSuggestionsList = new sap.m.List({showSeparators: sap.m.ListSeparators.Inner}); 
			this.oSuggestionsFooter = new sap.ui.core.HTML({});

			this.page = new sap.m.Page( {
							title: "{i18n>suggestions}",
							showNavButton: true,
							navButtonTap: [oController.onNavButtonTap],
							content: [
								this.oSuggestionsPullToRefresh,
								this.oSuggestionsHeader,
								this.oSuggestionsList,
								this.oSuggestionsFooter
							]

			});

			return this.page;	    	  

      }

});