sap.ui.define(
  ["sap/ui/model/resource/ResourceModel"],
  function (ResourceModel) {
    "use strict";

    // Create a resource model for i18n
    var oResourceModel = new ResourceModel({
      bundleName: "syncd02.i18n.i18n",
    });

    return {
      statusStock(stext) {},
      formatPriceWithCurrency: function (price, currency) {
        return price + " " + currency;
      },

      formatDiscount: function (discount) {
        if (discount == 1) {
          return "할인중";
        } else {
          return "정가";
        }
      },

      formatStockUnit: function (stock, unit) {
        var sTranslatedUnit;
        if (unit === "box") {
          sTranslatedUnit = "상자";
        } else if (unit === "piece") {
          sTranslatedUnit = "개";
        } else if (unit === "set") {
          sTranslatedUnit = "세트";
        } else {
          sTranslatedUnit = "대";
        }

        return stock + " " + sTranslatedUnit;
      },
    };
  }
);
