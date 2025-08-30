import { useState } from 'react';
import './App.css';

function App() {
  const [textInput, setTextInput] = useState('');
  const [noTextInputMessage, setNoTextInputMessage] = useState('');

  const checkForUserInput = () => {
    const trimText = textInput.trim();
    if (trimText) {
      return displayMessage(trimText);
    } else {
      return displayMessage("userInput has no value");
    }
  };

  const displayMessage = (message) => {
    const sanitizedMessage = sanitize(message);
      document.getElementById('outputMessage').innerHTML = sanitizedMessage;
  };

  function sanitize(string) {
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
      <div id='outputMessage' ></div>
      <div className="card">
        <button onClick={() => checkForUserInput()}>
          Submit
        </button>
      </div>
    </>
  );
}

export default App;
