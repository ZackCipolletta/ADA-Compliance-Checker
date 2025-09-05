function colorContrast(dom) {

  // function to calculate contrast ratio
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

      var brightest = parseFloat(Math.max(lum1, lum2).toFixed(2));
      var darkest = parseFloat(Math.min(lum1, lum2).toFixed(2));
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
      const fontSize = computedStyle.fontSize || '16px'; // Default to 16px
      const parentElementName = el.parentNode.tagName;

      // assign default value to parentFontSize in case the parent does not have a font size value
      // retrieve parent font size in order to calculate 'em' size.
      let parentFontSize = 'N/A';
      const parentNode = el.parentNode;
      if (parentNode && parentNode !== dom.window.document) {
        const parentStyle = dom.window.getComputedStyle(parentNode);
        parentFontSize = parentStyle.fontSize || '16px';
      }

      // assign default values for color if no color assigned
      let elColor = computedStyle.color || 'rgb(0, 0, 0)';
      let elBackgroundColor = computedStyle.backgroundColor || 'rgb(255, 255, 255)';

      // since JSDOM has limitations when retrieving color props, assign default value
      if (elColor === 'canvastext') {
        elColor = 'rgb(0, 0, 0)';
      }

      // JSDOM may incorrectly assign bg color value of black or transparent
      if (elBackgroundColor === 'rgba(0, 0, 0, 0)') {
        elBackgroundColor = 'rgb(255, 255, 255)';
      }

      const rgbStringToArray = (rgbString) => {
        return rgbString.match(/\d+/g).map(Number);
      };

      // use text and bg color to calculate contrast ratio
      const contrast = calculateContrastRatio(rgbStringToArray(elBackgroundColor), rgbStringToArray(elColor));

      // convert font sizes to pixels for accurate size evaluation
      const getFontSizeInPixels = (fontSize) => {
        if (fontSize.includes('px')) {
          return parseFloat(fontSize);
        } else if (fontSize.includes('em')) {
          return parseFloat(fontSize) * parseFloat(parentFontSize);
        } else {
          return parseFloat(fontSize);
        }
      };

      const fontSizePx = getFontSizeInPixels(fontSize);
      const parentFontSizePx = getFontSizeInPixels(parentFontSize);

      const contrastChecker = (con, sizePx) => {
        // if contrast is above 4.5:1 there are no issues
        if (con >= 4.5) {
          return null;
          // if contrast is below 4.5:1 and above 3.0:1 the text must be large
        } else if (con < 4.5 && con >= 3 && sizePx < 24) {
          return {
            issue: `Color Contrast`,
            element: `${el}`,
            details: `Text must have a contrast ratio of at least 4.5:1 for normal text and 
              3.0:1 for large text.`,
            rule: 'COLOR_CONTRAST',
          };
          // if contrast is below 3.0:1 the contrast must be higher
        } else if (con < 3) {
          return {
            issue: `Color Contrast`,
            element: `${el}`,
            details: `Text must have a contrast ratio of at least 4.5:1 for normal text and 
              3.0:1 for large text.`,
            rule: 'COLOR_CONTRAST',
          };
        } else {
          return null;
        }
      };

      const contrastChecked = contrastChecker(contrast, fontSizePx);

      const elData = {
        element: elTagName,
        text: el.textContent.trim(),
        color: elColor,
        backgroundColor: elBackgroundColor,
        parent: parentElementName,
        size: fontSizePx,
        parentFontSize: parentFontSizePx,
        issue: contrastChecked,
        contrastRatio: contrast,
      };
      textContainingElements.push(elData);
    }

  });
  return textContainingElements;
}

export default colorContrast;