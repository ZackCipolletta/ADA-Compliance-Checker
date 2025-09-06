function checkHeadings(dom) {

  // select all ,h1 elements in the doc
  const headers = `h1, h2, h3, h4, h5, h6`;
  const headerElements = Array.from(dom.window.document.querySelectorAll(headers));
  const foundHeaders = [];
  const headerIssues = [];
  let previousLevel = 0;

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
    const multipleH1 = {
      issue: `Single <h1>`,
      element: `<h1>`,
      details: `There must be only one <h1> per page. Number of <h1> tags found: ${foundHeaders.filter(isH1).length}`,
      rule: 'HEADING_MULTIPLE_H1',
    };
    headerIssues.push(multipleH1);
  }

  for (const el of foundHeaders) {
    // Extract the number from the heading tag
    const currentLevel = parseInt(el.slice(1));

    // Check for skipped levels or incorrect order
    if (currentLevel > previousLevel && previousLevel !== 0 || previousLevel + 1 && previousLevel !== 0) {
      headerIssues.push({
        issue: `Hierarchical order`,
        element: `<h${currentLevel}>`,
        details: `Heading levels must not be skipped: ${previousLevel} to ${currentLevel}`,
        rule: 'HEADING_ORDER',
      });
    }

    // Update previousLevel for next iteration
    previousLevel = currentLevel;
  }
  return headerIssues;
}

export default checkHeadings;