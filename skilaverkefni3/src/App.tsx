import { useState, useEffect } from "react";
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

  {
    id: 3,
    question: "Í hvaða landi voru peningaseðlar fyrst notaðir?",
    options: ["Grikkland", "Tyrkland", "Kína", "Brasilía"],
    correct: 2,
  },

  {
    id: 4,
    question: "Í hvaða landi eru flest eldfjöll?",
    options: ["Indónesía", "Bandaríkin", "Rússland", "Ísland"],
    correct: 1,
  },

  {
    id: 5,
    question: "Hvað eru margir litir í regnboga?",
    options: ["6", "7", "8", "9"],
    correct: 1,
  },

  {
    id: 6,
    question: "Hver er þjóðar íþrótt Bhútan?",
    options: ["Bogfimi", "Blak", "Lacrosse", "Fótbolti"],
    correct: 0,
  },

  {
    id: 7,
    question: "Hvaða ár kom fyrsti Apple Ipodinn út?",
    options: ["2009", "2006", "2004", "2001"],
    correct: 3,
  },

  {
    id: 8,
    question: "Hvar voru Lord of the rings myndirnar teknar upp?",
    options: ["Ástralía", "Nýja Sjáland", "Grænland", "Rúmenía"],
    correct: 2,
  },

  {
    id: 9,
    question:
      "Dansandi mörgæs sem hét Mumble varð heimsfræg eftir að hafa komið fram í mynd frá 2006, Hvað hét sú mynd?",
    options: ["Happy feet", "Wall-e", "Happy Penguin", "The Reef"],
    correct: 0,
  },

  {
    id: 10,
    question: "Hvaða ár hóf NTV skólinn starfsemi sína?",
    options: ["1996", "1998", "2000", "2003"],
    correct: 0,
  },
];

function App() {
  const [currentNumber, setCurrentNumber] = useState(0);

  const [answers, setAnswers] = useState<(number | null)[]>([]);
  [];
  const [showResults, setShowResults] = useState(false);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (showResults) return;

    const timer = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [showResults]);

  const currentQuestion = questions[currentNumber];

  const totalQuestions = questions.length;
  const currentNumberDisplay = currentNumber + 1;

  function handleSelectOption(selected: number) {
    const newAnswers = [...answers];
    newAnswers[currentNumber] = selected;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentNumber + 1 < questions.length) {
        setCurrentNumber(currentNumber + 1);
      } else {
        setShowResults(true);
      }
    }, 1000);
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
    setSeconds(0);
  }

  if (showResults) {
    const correctCount = answers.filter(
      (ans, i) => ans === questions[i].correct
    ).length;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
      <div className="App">
        <h1>Þitt score</h1>
        <p>
          Þú fékkst <strong>{correctCount}</strong> af {""}
          {questions.length} rétt! ✅
        </p>

        <p>
          Tími:{" "}
          <strong>
            {minutes} mín {remainingSeconds} sek
          </strong>
        </p>

        <button onClick={handleRestart}>Reyna aftur</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>React Quiz App</h1>

      <p className="progress-text">
        Spurning {currentNumberDisplay} af {totalQuestions}
      </p>

      <h2>{currentQuestion.question}</h2>

      <ul>
        {currentQuestion.options.map((option, number) => (
          <li
            key={number}
            onClick={() => handleSelectOption(number)}
            className={
              answers[currentNumber] === number
                ? answers[currentNumber] === currentQuestion.correct
                  ? "correct"
                  : "wrong"
                : ""
            }
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
