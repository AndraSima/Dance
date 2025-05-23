import React, { useState } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import './App.css';

function App() {
  const [result, setResult] = useState(null);

  const restartQuiz = () => {
    setResult(null); 
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="App-header">
        <h1>🎵 Dance Style Quiz 💃</h1>
      </header>
      <main className="max-w-3xl mx-auto px-4">
        {result ? (
          <Result style={result} onRestart={restartQuiz} />
        ) : (
          <Quiz onResult={setResult} />
        )}
      </main>
    </div>
  );
}

export default App;
