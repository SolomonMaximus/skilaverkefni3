import { useState } from "react";
import "./App.css";

const questions = [
  {
    id: 0,
    question: "Hvað heitir stærsta land í heimi?",
    options: ["Kína", "Kanada", "Rússland", "Bandaríkin"],
    correct: 2,
  },

  {
    id: 1,
    question: "Hver er höfuðborg Kólumbíu?",
    options: ["Medellín", "Bogotá", "Cali", "Barranquilla"],
    correct: 1,
  },

  {
    id: 2,
    question: "Hver er forseti Kína?",
    options: ["Li Qiang", "Wen Jiabao", "Hu Jintao", "Xi Jinping"],
    correct: 3,
  },
];

function App() {
  const [currentNumber, setCurrentNumber] = useState(0);

  const [answers, setAnswers] = useState<number[]>;
  [];
  const currentQuestion = questions[currentNumber];

  function handleSelectOption(selected: number) {
    const newAnswers = [...answers];
    newAnswers[currentNumber] = selected;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (currentNumber + 1 < questions.length) {
      setCurrentNumber(currentNumber + 1);
    }
  }

  function handlePrevious() {
    if (currentNumber - 1 >= 0) {
      setCurrentNumber(currentNumber - 1);
    }
  }

  return (
    <div className="App">
      <h1>React Quiz App</h1>
      <p>Velkomin í quizið mitt!</p>

      <h2>{currentQuestion.question}</h2>

      <ul>
        {currentQuestion.options.map((option, number) => (
          <li key={number}>{option}</li>
        ))}
      </ul>

      <button onClick={handleNext}>Næsta Spurning</button>
      <button onClick={handlePrevious}>Fara til baka</button>
    </div>
  );
}

export default App;
