sap.ui.define([], function () {
  "use strict";

  return {
    statusIcon: function (sGender) {
      switch (sGender) {
        case "남":
          return "sap-icon://male";
        case "여":
          return "sap-icon://female";
        default:
          return "";
      }
    },
  };
});
