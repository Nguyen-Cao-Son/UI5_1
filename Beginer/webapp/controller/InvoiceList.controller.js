sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.InvocieList", {
      /**
       * @override
       */
      onInit: function () {
        const oViewModel = new JSONModel({
          currency: "EUR"
        });
        this.getView().setModel(oViewModel, "view");
      },

      onFilterInvoices(oEvent) {
        // build filter array
        const aFilter = [];

        const sQuery = oEvent.getParameter("query");
        console.log('sQuery', sQuery);
        if (sQuery) {
          aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
        }
        console.log('FilterOperator', FilerOperator);
        console.log('aFilter', aFilter);
        // filter binding
        const oList = this.byId("invoiceList");
        const oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
      } , 

    // press invoice item 
      onPress(oEvent) {
        const oItem = oEvent.getSource();
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detail", {
          invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice1").getPath().substr(1))
        });
      }
    }
    );
  }
);