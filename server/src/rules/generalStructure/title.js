

function checkTitle(dom) {
  const titleElement = dom.window.document.title;
  // check if input html has a 'title' attribute and the attribute is not an empty string
  if (titleElement && titleElement.trim() !== '') {
    return null;
  } else {
    return {
      issue: `Missing Title`,
      element: `<title>`,
      details: `Every page must have a non-empty <title> tag.`,
      rule: '(DOC_TITLE_MISSING)',
    };
  }
}

export default checkTitle;