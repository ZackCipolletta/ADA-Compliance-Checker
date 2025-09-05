function imageAltText(dom) {


  // select all elements in the doc
  const imgElements = dom.window.document.getElementsByTagName('img');
  const imgIssues = [];


  imgElements.forEach(el => {
    if (!el.alt) {
      const issue = {
        issue: `Missing 'alt' Text`,
        element: `<img>`,
        details: `Informative images must have a descriptive 'alt' attribute. Current text: ${el.alt}`,
        rule: 'IMG_ALT_MISSING',
      };
      imgIssues.push(issue);
      return {

      };
    } else if (el.alt) {
      const issue = {
        issue: `Missing 'alt' Text`,
        element: `<img>`,
        details: `Informative images must have a descriptive 'alt' attribute. Current text: ${el.alt}`,
        rule: 'IMG_ALT_MISSING',
      };
      imgIssues.push(issue);
    }
  });

  return imgIssues;
}

export default imageAltText;