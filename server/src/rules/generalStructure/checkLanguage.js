import languageTags, { check } from 'language-tags';

function checkLanguage(dom) {
  const htmlElement = dom.window.document.documentElement;
  // check if input html has a 'lang' attribute and the attribute is not an empty string
  if (htmlElement.hasAttribute('lang') && htmlElement.getAttribute('lang').trim() !== '') {
    const langAttribute = htmlElement.getAttribute('lang').trim();

    // check if the lang attribute is a valid language tag
    const checkValidity = languageTags(langAttribute).valid();
    if (checkValidity) {
      return null;
    } else {
      return {
        Element: `<html>`,
        Details: `(DOC_LANG_INVALID): The <html> element must have a valid lang attribute. Found: "${langAttribute}"`,
        Rule: '(DOC_LANG_INVALID)',
      };
    }
  } else {
    return {
      Element: `<html>`,
      Details: `(DOC_LANG_MISSING): The <html> element must have a valid lang attribute.`,
      Rule: '(DOC_LANG_MISSING)',
    };
  }
}

export default checkLanguage;