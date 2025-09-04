

function colorContrast(dom) {

  // select all elements in the doc
  const allElements = dom.window.document.querySelectorAll('*');
  let textContainingElements = [];

  allElements.forEach(el => {
    // Check if the element contains text and not just whitespace
    if (el.textContent && el.textContent.trim().length > 0) {
      const elementData = {
        tagName: el.tagName.toLowerCase(),
        textContent: el.textContent.trim(),
        id: el.id || '',
        className: el.className || '',
        color: getComputedStyle(el).color || '',
        backgroundColor: getComputedStyle(el).backgroundColor || ''
      };
      textContainingElements.push(elementData);
    }
  });

  return textContainingElements;
}

export default colorContrast;