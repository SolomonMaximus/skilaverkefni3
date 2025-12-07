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

  const [answers, setAnswers] = useState<(number | null)[]>([]);
  [];
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentNumber];

  function handleSelectOption(selected: number) {
    const newAnswers = [...answers];
    newAnswers[currentNumber] = selected;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (currentNumber + 1 < questions.length) {
      setCurrentNumber(currentNumber + 1);
    } else {
      setShowResults(true);
    }
  }

  function handlePrevious() {
    if (currentNumber - 1 >= 0) {
      setCurrentNumber(currentNumber - 1);
    }
  }

  function handleRestart() {
    setCurrentNumber(0);
    setAnswers(questions.map(() => null));
    setShowResults(false);
  }

  if (showResults) {
    const correctCount = answers.filter(
      (ans, i) => ans === questions[i].correct
    ).length;

    return (
      <div className="App">
        <h1>Þitt score</h1>
        <p>
          Þú fékkst <strong>{correctCount}</strong> af {""}
          {questions.length} rétt!
        </p>
        <button onClick={handleRestart}>Reyna aftur</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>React Quiz App</h1>

      <h2>{currentQuestion.question}</h2>

      <ul>
        {currentQuestion.options.map((option, number) => (
          <li
            key={number}
            onClick={() => handleSelectOption(number)}
            className={answers[currentNumber] === number ? "selected" : ""}
          >
            {option}
          </li>
        ))}
      </ul>

      <button onClick={handleNext}>
        {" "}
        {currentNumber + 1 === questions.length
          ? "Sýna niðurstöður"
          : "Næsta Spurning"}
      </button>
      <button onClick={handlePrevious} disabled={currentNumber === 0}>
        Fara til baka
      </button>
    </div>
  );
}

export default App;
