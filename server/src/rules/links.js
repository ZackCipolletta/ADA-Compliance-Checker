function checkForGenericLinkText(dom) {

  // select all elements in the doc
  const linkElements = dom.window.document.getElementsByTagName('a');
  const genericLinks = [];

  // Convert HTMLCollection to array for easier manipulation
  Array.from(linkElements).forEach((link, index) => {
    const linkText = link.textContent;

    const problemLink = {
      issue: `Meaningful Link Text`,
      element: `<a>`,
      details: `The link at position${index + 1} is has generic link text: ${linkText}. 
      Link text must not be generic (e.g., "click here").`,
      rule: 'LINK_GENERIC_TEXT',
    };
    genericLinks.push(problemLink);
  });
  return genericLinks;
}

export default checkForGenericLinkText;