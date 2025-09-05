function imageAltText(dom) {


  // select all '<img>' elements in the doc
  const imgElements = dom.window.document.getElementsByTagName('img');
  const imgIssues = [];

  // Convert HTMLCollection to array for easier manipulation
  Array.from(imgElements).forEach((img, index) => {
    const alt = img.getAttribute('alt');
    if (!alt && alt !== '') {
      const issue = {
        issue: `Missing 'alt' Text`,
        element: `<img>`,
        details: `The image at position ${index + 1} is missing an 'alt' attribute. Informative images must have a descriptive 'alt' attribute. Current text: ${img.alt}`,
        rule: 'IMG_ALT_MISSING',
      };
      imgIssues.push(issue);
      return {

      };
    } else if (alt === '') {
      const issue = {
        issue: `Empty 'alt' Text`,
        element: `<img>`,
        details: `The image at position ${index + 1} is missing an EMPTY 'alt' attribute. Informative images must have a descriptive 'alt' attribute. Current text: ${img.alt}`,
        rule: 'IMG_ALT_EMPTY',
      };
      imgIssues.push(issue);
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