// Css
import "./App.css";

// React
import { useCallback, useEffect, useState } from "react";

// Data
import { wordsList } from "./data/words";

// Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  // Função para escolha de palavra e categoria
  const pickedWordAndCategory = useCallback(() => {
    // Escolhendo categoria aleatória
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Escolhendo uma palavra aleatória
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    // retornando palavra e catogoria
    return { word, category };
  }, [words]);

  // Iniciando o jogo
  const startGame = useCallback(() => {
    // clear all letters
    clearLetterStates();

    // Escolhendo palavra e categoria
    const { word, category } = pickedWordAndCategory();

    // Criando array com as letras da palavra
    let wordLatters = word.split("");
    wordLatters = wordLatters.map((l) => l.toLowerCase());

    // Preenchendo states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLatters);

    // Selecionando stage
    setGameStage(stages[1].name);
  }, [pickedWordAndCategory]);

  // Processando input
  const verifyLatter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // Verificando se a letra já foi usada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // Inclue a letra adivinhada ou remove um palpite
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //Check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    // wuin condition
    if (guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => (actualScore += 100));

      // restart game
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  // Reiniciando jogo
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLatter={verifyLatter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
