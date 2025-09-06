function checkTitle(dom) {
  try {
    // get the title element
    const titleElement = dom.window.document.title;
    // check if input html has a 'title' attribute and the attribute is not an empty string
    if (titleElement && titleElement.trim() !== '') {
      // if the title exists and is not an empty string return without issue
      return null;
      // title is either missing completely or is an empty string
    } else {
      return {
        issue: `Missing Title`,
        element: `<title>`,
        details: `Every page must have a non-empty <title> tag.`,
        rule: '(DOC_TITLE_MISSING)',
      };
    }
    // basic error handling
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