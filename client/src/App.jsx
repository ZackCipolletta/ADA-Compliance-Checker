import { useState } from 'react';
import './App.css';


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
      body: JSON.stringify({ name: 'Zack' })
    });
    const result = await response.text();
    console.log(result);
  }


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
      </div>
      <div id='userInputText' ></div>
    </>
  );
}

export default App;