"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _enzyme = require("enzyme");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TestDev {
  /**
   * Generates a JSON snapshot for the specified React component
   * @param {React.Component} component
   * @returns {JSON}
   */
  static createSnapshot(component) {
    return _reactTestRenderer.default.create(component).toJSON();
  }
  /**
   * Mounts the specified React component using enzyme
   * @param {React.Component} component
   * @returns {ReactWrapper}
   */


  static mount(component) {
    return (0, _enzyme.mount)(component);
  }
  /**
   * Mounts the specified React component using enzyme
   * and produces the HTML result from that component
   * @param {React.Component} component
   * @returns {string}
   */


  static mountHtml(component) {
    const wrapper = this.mount(component);
    return wrapper.html();
  }
  /**
   * Mounts the specified React component inside a HTML template
   * and produces the entire HTML template including the component
   * @param {React.component} component
   * @param {string} htmlTitle
   * @returns {string}
   */


  static mountHtmlTemplate(component, htmlTitle = 'Mounted HTML Template') {
    return `<!DOCTYPE html><html lang="en"><head><title>${htmlTitle}</title></head><body>${this.mountHtml(component)}</body></html>`;
  }
  /**
   * Shallow renders the specified React component using enzyme
   * @param {React.Component} component
   * @returns {ReactWrapper}
   */


  static shallow(component) {
    return (0, _enzyme.shallow)(component);
  }
  /**
   * Shallow renders the specified React component using enzyme
   * and produces the HTML result from that component
   * @param {React.Component} component
   * @returns {string}
   */


  static shallowHtml(component) {
    const wrapper = this.shallow(component);
    return wrapper.html();
  }

}

exports.default = TestDev;