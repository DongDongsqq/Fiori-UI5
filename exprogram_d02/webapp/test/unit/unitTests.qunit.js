/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"cl4/exprogram_d02/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
