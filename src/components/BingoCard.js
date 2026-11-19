"use client";

import { Check } from "lucide-react";

export default function BingoCard({ squares, markedSquares, onToggle }) {
  return (
    <div className="bingo-grid">
      {squares.map((trope, index) => {
        const isMarked = markedSquares.includes(index);
        const isFree = index === 12;

        return (
          <button
            key={index}
            onClick={() => !isFree && onToggle(index)}
            className={`bingo-square ${
              isMarked ? "marked" : ""
            } ${isFree ? "free-square" : ""}`}
          >
            {isMarked && <Check className="square-check" size={18} />}

            {isFree ? (
              <span className="free-content">
                <span>🎁</span>
                FREE
              </span>
            ) : (
              <span>{trope}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
