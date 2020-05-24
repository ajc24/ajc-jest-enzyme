import React from 'react';
import { TestDev } from '../../../src';

describe('Test Development Helper Class', () => {
  const customHtmlTemplateTitle = 'Test Title';
  const defaultHtmlTemplateTitle = 'Mounted HTML Template';
  const SimpleComponent = () => {
    return <div><p>Hello World</p></div>;
  };
  const simpleComponentAsHtml = '<div><p>Hello World</p></div>';
  const simpleComponentAsJson = {
    type: 'div',
    props: {},
    children: [
      {
        type: 'p',
        props: {},
        children: [
          'Hello World'
        ]
      }
    ]
  };
  const simpleComponentAsMountHtmlJson = '<div><p>Hello World</p></div>';
  const simpleComponentInHtmlTemplateDefaultTitle = `<!DOCTYPE html><html lang="en"><head><title>${defaultHtmlTemplateTitle}</title></head><body>${simpleComponentAsHtml}</body></html>`;
  const simpleComponentInHtmlTemplate = `<!DOCTYPE html><html lang="en"><head><title>${customHtmlTemplateTitle}</title></head><body>${simpleComponentAsHtml}</body></html>`;
  
  describe('createSnapshot() method behaviour', () => {
    let jsonSnapshot;

    beforeAll(() => {
      jsonSnapshot = TestDev.createSnapshot(<SimpleComponent />);
    });

    it('verifies that json is generated from the React component as expected', () => {
      expect(typeof jsonSnapshot).toBe(typeof simpleComponentAsJson);
    });

    it('verifies that the json generated from the React component matches the expected json', () => {
      expect(jsonSnapshot).toStrictEqual(simpleComponentAsJson);
    });
  });

  describe('mountHtmlSnapshot() method behaviour', () => {
    let jsonSnapshot;

    beforeAll(() => {
      jsonSnapshot = TestDev.mountHtmlSnapshot(<SimpleComponent />);
    });

    it('verifies that json is generated from the React component as expected', () => {
      expect(typeof jsonSnapshot).toBe(typeof simpleComponentAsMountHtmlJson);
    });

    it('verifies that the json generated from the React component matches the expected json', () => {
      expect(jsonSnapshot).toStrictEqual(simpleComponentAsMountHtmlJson);
    });
  });

  describe('mount() method behaviour', () => {
    let component;

    beforeAll(() => {
      component = TestDev.mount(<SimpleComponent />);
    });

    it('verifies that the root element is rendered correctly', () => {
      expect(component.exists('div')).toBeTruthy();
    });

    it('verifies that the children elements are rendered correctly', () => {
      expect(component.exists('div p')).toBeTruthy();
    });

    it('verifies that the children text content is rendered correctly', () => {
      expect(component.find('div p').text()).toBe('Hello World');
    });
  });

  describe('mountHtml() method behaviour', () => {
    let html;

    beforeAll(() => {
      html = TestDev.mountHtml(<SimpleComponent />);
    });

    it('verifies that the html string value is generated as expected', () => {
      expect(typeof html).toBe('string');
    });

    it('verifies that the html generated from the React component matches the expected html', () => {
      expect(html).toBe(simpleComponentAsHtml);
    });
  });

  describe('mountHtmlTemplate() method behaviour - Default HTML template title', () => {
    let htmlTemplate;

    beforeAll(() => {
      htmlTemplate = TestDev.mountHtmlTemplate(<SimpleComponent />);
    });

    it('verifies that the html template string value is generated as expected', () => {
      expect(typeof htmlTemplate).toBe('string');
    });

    it('verifies that the html template generated from the React component matches the expected html template', () => {
      expect(htmlTemplate).toBe(simpleComponentInHtmlTemplateDefaultTitle);
    });
  });

  describe('mountHtmlTemplate() method behaviour - Custom HTML template title', () => {
    let htmlTemplate;

    beforeAll(() => {
      htmlTemplate = TestDev.mountHtmlTemplate(<SimpleComponent />, customHtmlTemplateTitle);
    });

    it('verifies that the html template string value is generated as expected', () => {
      expect(typeof htmlTemplate).toBe('string');
    });

    it('verifies that the html template generated from the React component matches the expected html template', () => {
      expect(htmlTemplate).toBe(simpleComponentInHtmlTemplate);
    });
  });

  describe('shallow() method behaviour', () => {
    let component;

    beforeAll(() => {
      component = TestDev.shallow(<SimpleComponent />);
    });

    it('verifies that the root element is rendered correctly', () => {
      expect(component.exists('div')).toBeTruthy();
    });

    it('verifies that the children elements are rendered correctly', () => {
      expect(component.exists('div p')).toBeTruthy();
    });

    it('verifies that the children text content is rendered correctly', () => {
      expect(component.find('div p').text()).toBe('Hello World');
    });
  });

  describe('shallowHtml() method behaviour', () => {
    let html;

    beforeAll(() => {
      html = TestDev.shallowHtml(<SimpleComponent />);
    });

    it('verifies that the html string value is generated as expected', () => {
      expect(typeof html).toBe('string');
    });

    it('verifies that the html generated from the React component matches the expected html', () => {
      expect(html).toBe(simpleComponentAsHtml);
    });
  });
});
