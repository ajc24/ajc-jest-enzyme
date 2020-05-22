"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "configureSnapshotTests", {
  enumerable: true,
  get: function () {
    return _config.configureSnapshotTests;
  }
});
Object.defineProperty(exports, "configureUnitTests", {
  enumerable: true,
  get: function () {
    return _config.configureUnitTests;
  }
});
Object.defineProperty(exports, "TestDev", {
  enumerable: true,
  get: function () {
    return _TestDev.default;
  }
});

var _config = require("./config/config");

var _TestDev = _interopRequireDefault(require("./test-development/TestDev"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }