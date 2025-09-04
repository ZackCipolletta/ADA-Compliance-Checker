function colorContrast(dom) {

  const calculateContrastRatio = (color1, color2) => {
    const RED = 0.2126;
    const GREEN = 0.7152;
    const BLUE = 0.0722;

    const GAMMA = 2.4;

    function luminance(r, g, b) {
      var a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928
          ? v / 12.92
          : Math.pow((v + 0.055) / 1.055, GAMMA);
      });
      return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
    }

    function contrast(rgb1, rgb2) {
      var lum1 = luminance(...rgb1);
      var lum2 = luminance(...rgb2);

      var brightest = Math.max(lum1, lum2);
      var darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    }
    return contrast(color1, color2);
  };


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

      const rgbStringToArray = (rgbString) => {
        return rgbString.match(/\d+/g).map(Number);
      };

      const contrast = calculateContrastRatio(rgbStringToArray(elBackgroundColor), rgbStringToArray(elColor));

      const elData = {
        element: elTagName,
        text: el.textContent.trim(),
        color: elColor,
        backgroundColor: elBackgroundColor,
        elementParent: elParent,
        contrastRatio: contrast
      };
      textContainingElements.push(elData);
    }

  });
  return textContainingElements;
}

export default colorContrast;