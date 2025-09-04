import { useState } from 'react';
import './App.css';
import languageTags from 'language-tags';

function App() {
  const [textInput, setTextInput] = useState('');

  const clearAndCheck = () => {
    clearIssuesDiv();
    checkForUserInput();
  };

  const clearIssuesDiv = () => {
    const issuesDiv = document.getElementById('identifiedIssues');
    issuesDiv.innerHTML = '';
  };

  const checkForUserInput = () => {
    const trimText = textInput.trim(); // trim leading and trailing blank spaces from the textArea
    if (trimText) { // if the textArea isn't only blank space then call the next function
      return displayContrast(trimText);
    } else {
      return displayContrast("userInput has no value"); // if textArea is only blank space, return error
    }
  };

  // const displayMessage = async (message) => {
  //   document.getElementById('userInputText').innerHTML = sanitize(message);
  //   const result = await testEndpoint();

  //   const issuesDiv = document.getElementById('identifiedIssues');

  //   result.forEach((el) => {
  //     const newDiv = document.createElement('div');

  //     if (el !== null) {
  //       if (el?.error) {
  //         // Format response as a list
  //         newDiv.innerHTML = `<div>Error: ${sanitize(el.error)}</div>`;
  //       } else if (el.element && el.details && el.rule) {
  //         newDiv.innerHTML = `
  //     <div>
  //     ${sanitize(el.issue)}
  //       <ul>
  //         <li>Element: ${sanitize(el.element)}</li>
  //         <li>Details: ${sanitize(el.details)}</li>
  //         <li>Rule: ${sanitize(el.rule)}</li>
  //       </ul>
  //     </div>
  //     `;
  //       }
  //     }
  //     issuesDiv.appendChild(newDiv);
  //   });
  // };


  const displayContrast = async (message) => {
    // document.getElementById('userInputText').innerHTML = sanitize(message);
    const result = await testEndpoint();

    console.log('API Result:', result); // Log the raw result
    console.log('Stringified Result:', JSON.stringify(result, null, 2));

    // const issuesDiv = document.getElementById('identifiedIssues');

    // issuesDiv.innerHTML = (JSON.stringify(result));
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
    const result = await response.json();
    if (result !== null) {
      console.log(`this is the result: ` + (result));
      console.log(`this is the contrast: ` + JSON.stringify(result));
    } else {
      console.log('Everything looks good!');
    }

    return result;
  }

  const page = document.documentElement;


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
        <button onClick={() => clearAndCheck()}>
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
      <div id='identifiedIssues' ></div>
    </>
  );
}

export default App;