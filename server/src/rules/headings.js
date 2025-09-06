function checkHeadings(dom) {

  // select all ,h1 elements in the doc
  const headers = `h1, h2, h3, h4, h5, h6`;
  const headerElements = Array.from(dom.window.document.querySelectorAll(headers));
  const foundHeaders = [];

  if (headerElements) {
    headerElements.forEach(el => {
      foundHeaders.push(el.tagName.toLowerCase());
    });
  }

  const isH1 = (val) => {
    if (val === 'h1') {
      return val;
    }
  };

  if (foundHeaders.filter(isH1).length > 1) {
    return {
      issue: `Single <h1>`,
      element: `<h1>`,
      details: `There must be only one <h1> per page. Number of <h1> tags found: ${foundHeaders.filter(isH1).length}`,
      rule: 'HEADING_MULTIPLE_H1:',
    };;
  }
}

export default checkHeadings;