

function checkTitle(dom) {
  try {
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
  } catch (error) {
    console.error('Error in checkTitle ', error);
    return {
      issue: 'Error processing title',
      element: `<title>`,
      details: `Failed to parse HTML or access the title: ${error.message}`,
      rule: '(DOC_TITLE_ERROR)'
    }
  }
}

export default checkTitle;