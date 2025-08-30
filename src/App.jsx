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
    document.getElementById('outputMessage').innerHTML = message;
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
      <div id='outputMessage' ></div>
      <div className="card">
        <button onClick={() => checkForUserInput()}>
          count is
        </button>
      </div>
    </>
  );
}

export default App;
