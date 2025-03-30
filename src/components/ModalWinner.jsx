import { X } from "@phosphor-icons/react";

const ModalWinner = ({ winner, modal, setModal }) => {
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div
      className={`w-xs h-70 shadow-md rounded-md  fixed top-1/2 left-1/2  -translate-1/2 bg-[#162b44] text-white flex justify-center items-center flex-col ${
        modal ? "visible opacity-100 mt-0" : "invisible opacity-0 -mt-4"
      } transition-all duration-400`}
    >
      <span
        className="size-8 text-white rounded-full absolute -top-1 -right-1 bg-slate-400 shadow-md flex justify-center items-center cursor-pointer hover:rotate-180 transition-all duration-300"
        onClick={closeModal}
      >
        <X size={25} weight="bold" />
      </span>
      <h3 className="text-3xl font-bold mb-1">
        {winner == "Draw" ? "Draw" : "Congratulation!"}
      </h3>
      <h3>{winner == "Draw" ? "" : `The Winner Is ${winner}`}</h3>
    </div>
  );
};

export default ModalWinner;
