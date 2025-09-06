function imageAltText(dom) {

  // select all '<img>' elements in the doc
  const imgElements = dom.window.document.getElementsByTagName('img');
  const imgIssues = [];

  // Convert HTMLCollection to array for easier manipulation and loop through each element in the array
  Array.from(imgElements).forEach((img, index) => {
    // check the alt attribute for each element in the array
    const alt = img.getAttribute('alt');
    // check for missing alt text
    if (!alt && alt !== '') {
      const issue = {
        issue: `Missing 'alt' Text`,
        element: `<img>`,
        details: `The image at position ${index + 1} is missing an 'alt' attribute. Informative images must have a descriptive 'alt' attribute. Current text: ${img.alt}`,
        rule: 'IMG_ALT_MISSING',
      };
      imgIssues.push(issue);
      // check for an empty all attribute
    } else if (alt === '') {
      const issue = {
        issue: `Empty 'alt' Text`,
        element: `<img>`,
        details: `The image at position ${index + 1} is missing an EMPTY 'alt' attribute. Informative images must have a descriptive 'alt' attribute. Current text: ${img.alt}`,
        rule: 'IMG_ALT_EMPTY',
      };
      imgIssues.push(issue);
      // verify that the length of the alt attribute is less than 120 characters
    } else if (alt.length > 120) {
      const issue = {
        issue: `Img 'alt' Length`,
        element: `<img>`,
        details: `The image at position ${index + 1} contains alt text ${alt.length} characters in length. The alt attribute text should not exceed 120 characters to remain concise.`,
        rule: 'IMG_ALT_LENGTH',
      };
      imgIssues.push(issue);
    }
  });

  return imgIssues;
}

export default imageAltText;