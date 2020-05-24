import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

export default class TestDev {
  /**
   * Generates a JSON snapshot for the specified React component
   * @param {React.Component} component
   * @returns {JSON}
   */
  static createSnapshot(component) {
    return renderer.create(component).toJSON();
  }

  /**
   * Generates a JSON snapshot for the specified React component
   * Mounts the component first before retrieving the HTML content for that component
   * @param {React.Component} component
   * @returns {JSON}
   */
  static mountHtmlSnapshot(component) {
    const html = this.mountHtml(component);
    return renderer.create(html).toJSON();
  }
  
  /**
   * Mounts the specified React component using enzyme
   * @param {React.Component} component
   * @returns {ReactWrapper}
   */
  static mount(component) {
    return mount(component);
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
    return shallow(component);
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
