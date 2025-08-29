import { useState } from 'react';
import './App.css';

function App() {
  const [textInput, setTextInput] = useState('');

  const userInput = document.getElementById('userInput');
  const userInputValue = userInput ? userInput.value : '';

  const checkForUserInput = () => {
    if (userInput) {
      console.log(userInput.value);
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
