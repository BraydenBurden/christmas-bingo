"use client";

import { useEffect, useState } from "react";
import { RefreshCw, Snowflake, Trophy, Gift, Sparkles } from "lucide-react";

import BingoCard from "@/components/BingoCard";
import tropes from "@/components/data/tropes";

function generateCard() {
  const shuffled = [...tropes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 25).map((trope, index) => {
    return index === 12 ? "FREE" : trope;
  });
}

function checkBingo(marked) {
  const lines = [
    // Rows
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],

    // Columns
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],

    // Diagonals
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];

  return lines.some((line) => line.every((index) => marked.includes(index)));
}

export default function Home() {
  const [squares, setSquares] = useState([]);
  const [markedSquares, setMarkedSquares] = useState([12]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedCard = localStorage.getItem("christmas-bingo-card");
    const savedMarks = localStorage.getItem("christmas-bingo-marks");

    if (savedCard) {
      setSquares(JSON.parse(savedCard));
      setMarkedSquares(savedMarks ? JSON.parse(savedMarks) : [12]);
    } else {
      const newCard = generateCard();
      setSquares(newCard);
      localStorage.setItem("christmas-bingo-card", JSON.stringify(newCard));
    }

    setReady(true);
  }, []);

  function toggleSquare(index) {
    const updated = markedSquares.includes(index)
      ? markedSquares.filter((item) => item !== index)
      : [...markedSquares, index];

    setMarkedSquares(updated);
    localStorage.setItem("christmas-bingo-marks", JSON.stringify(updated));
  }

  function newCard() {
    const newSquares = generateCard();

    setSquares(newSquares);
    setMarkedSquares([12]);

    localStorage.setItem("christmas-bingo-card", JSON.stringify(newSquares));

    localStorage.setItem("christmas-bingo-marks", JSON.stringify([12]));
  }

  const hasBingo = checkBingo(markedSquares);

  if (!ready) return null;

  return (
    <main className="app-container">
      <section className="hero">
        <h1>
          Christmas Movie
          <span>Trope Bingo</span>
        </h1>
      </section>

      <section className="game-section">
        <div className="card-heading">
          <div>
            <p className="eyebrow">YOUR BINGO CARD</p>
            <h2>Let the games begin!</h2>
          </div>

          <div className="card-counter">
            {markedSquares.length - 1} / 24
            <span>SPOTTED</span>
          </div>
        </div>

        <BingoCard
          squares={squares}
          markedSquares={markedSquares}
          onToggle={toggleSquare}
        />

        {hasBingo && (
          <div className="bingo-message">
            <Trophy size={25} />
            <div>
              <strong>BINGO!</strong>
            </div>
            <Sparkles size={22} />
          </div>
        )}

        <button className="new-card-button" onClick={newCard}>
          <RefreshCw size={18} />
          Generate New Card
        </button>
      </section>
    </main>
  );
}
