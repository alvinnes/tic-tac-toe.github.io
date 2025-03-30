import { ArrowCircleDownRight, Repeat } from "@phosphor-icons/react";
import { useState } from "react";
import Board from "./components/Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextMove = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextMove);
    setCurrentMove(nextMove.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((_, move) => {
    let description;
    if (move > 0) {
      description = `Go To Step ${move} `;
    } else {
      description = "Return to the start";
    }
    return (
      <li
        key={move}
        className="w-full bg-[#162b44] p-3 flex items-center gap-3 rounded-md sm:text-base text-sm cursor-pointer mb-2 shadow-xl hover:bg-slate-800 transition-all duration-300"
        onClick={() => jumpTo(move)}
      >
        {description == "Return to the start" ? (
          <Repeat size={30} />
        ) : (
          <ArrowCircleDownRight size={30} />
        )}
        {description}
      </li>
    );
  });

  return (
    <section className="w-full h-full bg-[#0b192c] flex md:flex-col  lg:flex-row flex-col  justify-center items-center gap-10">
      <Board
        xIsNext={xIsNext}
        onPlay={handlePlay}
        squares={currentSquares}
        setHistory={setHistory}
        setCurrentMove={setCurrentMove}
      />
      <div className="w-sm md:w-lg lg:w-md text-white flex flex-col mb-4  items-center">
        <h3 className="text-2xl font-semibold mt-4">Timeline Game</h3>
        <ol className="w-full md:w-full sm:w-10/12 mt-8">{moves}</ol>
      </div>
    </section>
  );
};

export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
