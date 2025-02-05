import { useState, useEffect } from "react";

export default function PlayGame() {
  const words = ["REACT", "JAVASCRIPT", "PROGRAMMING", "DEVELOPER", "DEBUG"];
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const maxMistakes = 6;

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  useEffect(() => {
    if (word && word.split('').every(letter => guessedLetters.includes(letter))) {
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({ word, mistakes });
      localStorage.setItem("highScores", JSON.stringify(highScores));
    }
  }, [guessedLetters]);

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setMistakes(mistakes + 1);
      }
    }
  };

  const restartGame = () => {
    setGuessedLetters([]);
    setMistakes(0);
    setWord(words[Math.floor(Math.random() * words.length)]);
  };

  const isWinner = word && word.split('').every(letter => guessedLetters.includes(letter));
  const isLoser = mistakes >= maxMistakes;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold">Guess the Word</h2>
      <p>{word ? word.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ') : "Loading..."}</p>
      <div>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map(letter => (
          <button key={letter} onClick={() => handleGuess(letter)} className="m-1 p-2 border rounded" disabled={isWinner || isLoser}>
            {letter}
          </button>
        ))}
      </div>
      <p>Mistakes: {mistakes} / {maxMistakes}</p>
      {isWinner && <p className="text-green-500 font-bold">You Win!</p>}
      {isLoser && <p className="text-red-500 font-bold">Game Over! The word was {word}.</p>}
      {(isWinner || isLoser) && <button onClick={restartGame} className="mt-4 p-2 border rounded">Restart</button>}
    </div>
  );
}
