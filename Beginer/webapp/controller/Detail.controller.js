sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History" , 
	"sap/m/MessageToast"
], (Controller) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.Detail", {
		onInit() {
          
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
		},

		onObjectMatched(oEvent) { 
			this.byId("rating").reset();
            console.log( 'this' ,  this.getView( ) );
            console.log( oEvent.getParameter("arguments") );
            console.log( 'InvoicePath' ,  window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath) );
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "invoice1"
			});
		},

		
		onNavBack() {
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {} );
			}
		},

		onRatingChange(oEvent) {
			const fValue = oEvent.getParameter("value");
			const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		}
	});
});