import { useState } from 'react';
import './App.css';
import languageTags from 'language-tags';

function App() {
  const [textInput, setTextInput] = useState('');

  const checkForUserInput = () => {
    const trimText = textInput.trim(); // trim leading and trailing blank spaces from the textArea
    if (trimText) { // if the textArea isn't only blank space then call the next function
      return displayMessage(trimText);
    } else {
      return displayMessage("userInput has no value"); // if textArea is only blank space, return error
    }
  };

  const displayMessage = (message) => {
    const sanitizedMessage = sanitize(message); // sanitize the string before calling the next function
    document.getElementById('userInputText').innerHTML = sanitizedMessage;
  };

  function sanitize(string) { // sanitize the string of user data
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => (map[match]));
  }

  async function testEndpoint(params) {
    const response = await fetch('http://localhost:3000/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html: textInput })
    });
    const result = await response.text();
    console.log(result);
  }

  const page = document.documentElement;


  const checkAttributes = () => {
    const langAttribute = page.getAttribute('lang');
    if (langAttribute) {
      console.log('page includes lang attribute: ' + langAttribute);
      if (!languageTags(langAttribute).valid()) {
        console.log(`Invalid or unregistered BCP 47 language tag: ${langAttribute}`);
      } else {
        console.log('everything looks good');
        console.log(languageTags('en').valid());
      }
    } else {
      console.log(`The document's primary language is not declared.`);
    } 
  };


  return (
    <>
      <div>
        <textarea
          id='userInput'
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        >
        </textarea>
      </div>
      <div className="card">
        <button onClick={() => checkForUserInput()}>
          Submit
        </button>
        <button onClick={() => testEndpoint()}>
          Test Endpoint
        </button>
        <button onClick={() => checkAttributes()}>
          test attributes
        </button>
      </div>
      <div id='userInputText' ></div>
    </>
  );
}

export default App;