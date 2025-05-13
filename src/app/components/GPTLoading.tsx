"use client";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import mascotAnimation from "../assests/lottie/mascot.json"; // place your Lottie JSON here

const loadingMessages = [
  "Brewing smart tea... 🧠🍵",
  "Summoning the knowledge gods... 📚⚡",
  "GPT is chalking up the board... 👨‍🏫",
];

const funFacts = [
  "Hey Buddy ! Whats UP?",
  "Enjoying YOur DAy!!😘",
  "KEEp Smiling!!😂",
];

const Numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const getRandomWord = () => Numbers[Math.floor(Math.random() * Numbers.length)];

const GPTLoading = () => {
  const [message, setMessage] = useState("");
  const [fact, setFact] = useState("");
  const [guess, setGuess] = useState("");
  const [word, setWord] = useState(getRandomWord());
  const [attempts, setAttempts] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setMessage(
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
    );
    setFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
  }, []);

  const handleGuess = () => {
    if (!guess) return;
    setAttempts([...attempts, guess]);
    if (guess.toLowerCase() === word) setGameOver(true);
    else if (attempts.length >= 2) setGameOver(true);
    setGuess("");
  };

  return (
    <div className="w-[200px] md:w-[250px] lg:w-[300px] mx-auto">
      <Lottie animationData={mascotAnimation} loop />

      <p className="text-xl text-yellow-400 animate-pulse">{message}</p>

      <div className="w-12 h-12 mx-auto border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />

      <div className="p-4 mx-auto bg-gray-800 text-white rounded-lg text-sm max-w-md">
        {fact}
      </div>

      {/* Mini Game */}
      <div className="bg-gray-900 text-white rounded-lg p-4 max-w-sm mx-auto mt-6">
        <p className="text-sm font-semibold mb-2">
          🎮 Guess the Number From (1 to 10) (3 tries)
        </p>
        {!gameOver ? (
          <>
            <input
              type="text"
              placeholder="Your guess..."
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="p-2 w-full rounded bg-gray-700 text-white"
            />
            <button
              onClick={handleGuess}
              className="mt-2 bg-green-600 hover:bg-green-700 w-full py-2 rounded"
            >
              Guess
            </button>
            <p className="mt-2 text-xs text-gray-400">
              Attempts: {attempts.join(", ")}
            </p>
          </>
        ) : (
          <p className="mt-2 text-pink-400">
            {attempts[attempts.length - 1] === word
              ? `🎉 Correct! It was "${word}".`
              : `❌ Out of tries! The word was "${word}".`}
          </p>
        )}
      </div>
    </div>
  );
};

export default GPTLoading;
