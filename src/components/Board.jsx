import { Circle, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { calculateWinner } from "../GameBoard";
import ModalWinner from "./ModalWinner";

const Board = (props) => {
  const { xIsNext, squares, onPlay, setHistory, setCurrentMove } = props;
  const [winner, setWinner] = useState(null);
  const [modal, setModal] = useState(false);

  const handleClick = (index) => {
    if (winner || squares[index]) return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  };

  const statSteps = calculateWinner(squares);
  let status;
  if (!statSteps) {
    status = `Next Turn Is ${xIsNext ? "X" : "O"}`;
  }

  useEffect(() => {
    const result = calculateWinner(squares);
    if (result) {
      setWinner(result);
      setModal(true);
    } else if (squares.every((square) => square !== null)) {
      setWinner("Draw");
      setModal(true);
    }
  }, [squares]);

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-white">Tic-Tac-Toe</h1>
      <div className="flex gap-4 items-center mt-4">
        <h2
          className={`text-sm sm:text-lg text-white hover:bg-slate-700 transition-all duration-300 rounded-md shadow-xl bg-[#162b44] py-3 px-8 ${
            winner != null && "hidden"
          }`}
        >
          {status}
        </h2>
        <button
          className="border-0 outline-0 sm:py-3 py-2 px-4 bg-indigo-500 shadow-md rounded-md font-semibold mt-4 cursor-pointer my-4 text-white hover:bg-indigo-600 transition-all duration-300"
          onClick={() => {
            setHistory([Array(9).fill(null)]);
            setCurrentMove(0);
            setWinner(null);
          }}
        >
          Play Again
        </button>
      </div>
      <div className="flex gap-10">
        <div className=" w-xs lg:w-lg sm:w-2xl grid grid-cols-3 mt-10">
          {squares.map((square, id) => (
            <div
              key={id}
              className={`h-30 sm:h-50 lg:h-40 border-solid border-slate-500 text-white cursor-pointer hover:bg-[#162b44] text-6xl sm:text-8xl flex justify-center items-center ${
                [0, 1, 3, 4, 6, 7].includes(id) ? "border-r-4" : ""
              } ${id <= 5 ? "border-b-4" : ""}`}
              onClick={() => handleClick(id)}
            >
              {square == "X" ? <X /> : square == "O" ? <Circle /> : null}
            </div>
          ))}
        </div>
      </div>
      <ModalWinner winner={winner} modal={modal} setModal={setModal} />
    </div>
  );
};

export default Board;
