sap.ui.define(["sap/ui/core/format/DateFormat"], function (DateFormat) {
  "use strict";

  return {
    statusText(sStatus) {
      var iDate = new Date(sStatus);

      // 현재 날짜와 비교
      var currentDate = new Date();
      var currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
      var statusMonth = iDate.getMonth() + 1;

      return statusMonth <= currentMonth
        ? sap.m.ObjectMarkerType.Flagged
        : sap.m.ObjectMarkerType.Favorite;
    },

    formatDate(sBirthdate) {
      var oDateFormat = DateFormat.getDateInstance({
        pattern: "yyyy/MM/dd",
      });
      var oDate = new Date(sBirthdate);
      return oDateFormat.format(oDate);
    },
  };
});
