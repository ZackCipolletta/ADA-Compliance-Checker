import { useState } from 'react';
import './App.css';

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
      return displayMessage(trimText);
    } else {
      return displayMessage("userInput has no value"); // if textArea is only blank space, return error
    }
  };

  const displayMessage = async (message) => {
    document.getElementById('userInputText').innerHTML = sanitize(message);
    const result = await testEndpoint(textInput);

    const issuesDiv = document.getElementById('identifiedIssues');

    result.forEach((el) => {
      const newDiv = document.createElement('div');

      if (el !== null) {
        if (el?.error) {
          // Format response as a list
          newDiv.innerHTML = `<div>Error: ${sanitize(el.error)}</div>`;
        } else if (el.element && el.details && el.rule) {
          newDiv.innerHTML = `
      <div>
      ${sanitize(el.issue)}
        <ul>
          <li>Element: ${sanitize(el.element)}</li>
          <li>Details: ${sanitize(el.details)}</li>
          <li>Rule: ${sanitize(el.rule)}</li>
        </ul>
      </div>
      `;
        }
      }
      issuesDiv.appendChild(newDiv);
    });
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
    try {
      const response = await fetch('http://localhost:3000/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: params })
      });

      // Error handling if the server does not respond with ok status
      if (!response.ok) {
        console.error(`Server responded with status: ${response.status}`);
        return [{ error: `Server error: ${response.status}` }];
      }

      const result = await response.json();
      console.log(`Raw result: `, result);
      console.log('Stringified Result:', JSON.stringify(result, null, 2));

      if (result) {
        console.log(`Result as JSON:  `, JSON.stringify(result));
      } else {
        console.log('No result returned from server');
        return [{ error: `No result returned from server` }];
      }

      return result;
    } catch (error) {
      console.error('Fetch error: ', error);
      // since we are expecting an array response from the server, we return an array with 
      // error for consistency in case of issue 
      return [{ error: `Fetch error: ${error.message}` }];
    }
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
      <div style={{ fontSize: '2em' }}>Hello there children!</div>
    </>
  );
}

export default App;