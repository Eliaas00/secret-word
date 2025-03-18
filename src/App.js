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

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  // Função para escolha de palavra e categoria
  const pickedWordAndCategory = () => {
    // Escolhendo categoria aleatória
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Escolhendo uma palavra aleatória
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    // retornando palavra e catogoria
    return { word, category };
  };

  // Iniciando o jogo
  const startGame = () => {
    // Escolhendo palavra e categoria
    const { word, category } = pickedWordAndCategory();
    console.log(word, category);

    // Criando array com as letras da palavra
    let wordLatters = word.split("");
    wordLatters = wordLatters.map((l) => l.toLowerCase());
    console.log(wordLatters);

    // Preenchendo states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(letters);

    // Selecionando stage
    setGameStage(stages[1].name);
  };

  // Processando input
  const verifyLatter = () => {
    setGameStage(stages[2].name);
  };

  // Reiniciando jogo
  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLatter={verifyLatter} />}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
