import React, { useEffect, useState } from 'react';
import alanBtn from "@alan-ai/alan-sdk-web";
import axios from 'axios';

function App() {
  const [response, setResponse] = useState(null);

  function sendToBackend(userInput) {
    return axios.post('http://localhost:3000/api/command', { userInput })
      .then(response => response.data)
      .catch(error => {
        console.error(error);
        return 'An error occurred while processing the request';
      });
  }

  function handleUserInput(input, alanBtnInstance) {
    const userInput = input;

    sendToBackend(userInput)
      .then(response => {
        setResponse(response);
        alanBtnInstance.play({ command: 'receivedResponse', value: response });
      });
  }

  useEffect(() => {
    const alanBtnInstance = alanBtn({
      key: 'fd69f586c7905f4c0c31eab7e16dd8522e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'feedback') {
          handleUserInput(commandData.value, alanBtnInstance);
        }
      }
    });
  }, []);

  return (
    <div className="App">
      {response && <p>{response}</p>}
    </div>
  );
}

export default App;
