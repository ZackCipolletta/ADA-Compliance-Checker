import languageTags from 'language-tags';

function checkLanguage(dom) {
  const htmlElement = dom.window.document.documentElement;
  // check if input html has a 'lang' attribute and the attribute is not an empty string
  if (htmlElement.hasAttribute('lang') && htmlElement.getAttribute('lang').trim() !== '') {
    const langAttribute = htmlElement.getAttribute('lang').trim();

    // check if the lang attribute is a valid language tag
    const checkValidity = languageTags(langAttribute).valid();
    // if valid tag return without issue
    if (checkValidity) {
      return null;
    } else {
      return {
        issue: `Invalid 'lang' Attribute`,
        element: `<html>`,
        details: `The <html> element must have a valid lang attribute. Found: "${langAttribute}"`,
        rule: 'DOC_LANG_INVALID',
      };
    }
    // if 'lang' attribute does not exist or is an empty string
  } else {
    return {
      issue: `Missing 'lang' Attribute`,
      element: `<html>`,
      details: `The <html> element must have a valid lang attribute.`,
      rule: 'DOC_LANG_MISSING',
    };
  }
}

export default checkLanguage;