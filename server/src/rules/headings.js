function checkForGenericLinkText(dom) {

  // select all ,h1 elements in the doc
  const headers = `h1, h2, h3, h4, h5, h6`
  const headerElements = Array.from(dom.window.document.getElementsByTagName(headers));
  
  if (headerElements) {
    
  }
  // Convert HTMLCollection to array for easier manipulation
  headerElements.forEach((header, index) => {
    // Normalize text: remove newlines, tabs, multiple spaces, and trim

    if (genericLinkText.includes(linkText)) {
      const problemLink = {
        issue: `Meaningful Link Text`,
        element: `<a>`,
        details: `The link at position ${index + 1} is has generic link text: '${linkText}'. 
      Link text must not be generic (e.g., "click here").`,
        rule: 'LINK_GENERIC_TEXT',
      };
      genericLinks.push(problemLink);
    }
  });
  return genericLinks;
}

export default checkForGenericLinkText;