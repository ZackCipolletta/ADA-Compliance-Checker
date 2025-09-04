

function colorContrast(dom) {

  // select all elements in the doc
  const allElements = dom.window.document.querySelectorAll('*');
  let textContainingElements = [];

  allElements.forEach(el => {
    // Check if the element contains text and not just whitespace
    if (el.textContent && el.textContent.trim().length > 0) {
      textContainingElements.push(el);
    }
  });

  // textContainingElements.forEach(el => {
  //   console.log(`this should be all the text on the page: ${el.textContent}`);
  // });

  return textContainingElements;
}

export default colorContrast;