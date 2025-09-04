function colorContrast(dom) {

  // select all elements in the doc
  const allElements = dom.window.document.querySelectorAll('*');
  let textContainingElements = [];

  allElements.forEach(el => {
    // Check if the element contains text and not just whitespace
    if (el.textContent && el.textContent.trim().length > 0) {
      const elTagName = el.tagName;
      const elParent = el.parentNode.tagName;
      const computedStyle = dom.window.getComputedStyle(el);

      let elColor = computedStyle.color || 'rgb(0, 0, 0)';
      let elBackgroundColor = computedStyle.backgroundColor || 'rgb(255, 255, 255)';

      if (elColor === 'canvastext') {
        elColor = 'rgb(0, 0, 0)';
      }

      if (elBackgroundColor === 'rgba(0, 0, 0, 0)') {
        elBackgroundColor = 'rgb(255, 255, 255)';
      }

      const elData = {
        element: elTagName,
        text: el.textContent.trim(),
        color: elColor,
        backgroundColor: elBackgroundColor,
        elementParent: elParent
      };
      textContainingElements.push(elData);
    }

  });
  return textContainingElements;
}

export default colorContrast;