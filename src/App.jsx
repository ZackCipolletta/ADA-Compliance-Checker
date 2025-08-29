import { useState } from 'react';
import './App.css';

function App() {
  const [textInput, setTextInput] = useState('');

  // const userInputValue = userInput ? userInput.value : '';

  const checkForUserInput = () => {
    if (textInput.trim()) {
      console.log(userInput.value.trim());
    } else {
      console.log("userInput has no value");
    }
  };

  const logInputText = () => {
    console.log(userInput);
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
          count is
        </button>
      </div>
    </>
  );
}

export default App;
