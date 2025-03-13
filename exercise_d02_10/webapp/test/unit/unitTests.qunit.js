/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"exercise_d02_10/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});