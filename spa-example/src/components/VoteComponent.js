import React from "react";

const VoteComponent = ({ text, percentage, votes, style }) => {
  const valueAsNumber = parseInt(percentage, 10);

  return (
    <div className="votes">
      <input
        className="appearance-none"
        type="radio"
        name="vote"
        value={text}
        id={text}
      />
      <label
        htmlFor={text}
        className="bg-white block rounded-4 border-transparent cursor-pointer shadow-lg p-6"
      >
        <p className="text-2xl font-bold flex items-center justify-between">
          {text} <span>{percentage}</span>
        </p>
        <progress
          className="w-full mt-4 rounded-lg [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg"
          value={valueAsNumber}
          max="100"
        >
          {valueAsNumber} %
        </progress>
        <small className="text-slate-500">{votes} votes</small>
      </label>
    </div>
  );
};

export default VoteComponent;
