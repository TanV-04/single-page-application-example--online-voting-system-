import React, { useState } from "react";
import "../index.css";
import Vote from "./VoteComponent.js";
import { COLLECTION_ID, databases, DB_ID } from "../lib/appwrite.js";

const QuestionComponent = ({ data }) => {
  const [selected, setSelected] = useState(null); // State to track selected vote
  const [message, setMessage] = useState("");

  const handleVoteSelect = (vote) => {
    setSelected(vote); // Update the selected vote
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selected) {
      alert("pelase select an option before submitting your vote");
      return;
    }

    const updateData = {};
    if (selected === data.answer_1) {
      updateData.votes_1 = data.votes_1 + 1;
    } else if (selected === data.answer_2) {
      updateData.votes_2 = data.votes_2 + 2;
    } else if (selected === data.answer_3) {
      updateData.votes_3 = data.votes_3 + 3;
    }

    databases
      .updateDocument(DB_ID, COLLECTION_ID, data.$id, updateData)
      .then(() => {
        setMessage("Vote submitted successfully");
        setSelected(null);
      })
      .catch((error) => {
        console.error("error updating document: ", error);
        setMessage("failed to submit");
      });

    const formData = new FormData(e.target);
  };

  const totalVotes = data.votes_1 + data.votes_2 + data.votes_3;

  const votes = [
    { text: data.answer_1, votes: data.votes_1 },
    { text: data.answer_2, votes: data.votes_2 },
    { text: data.answer_3, votes: data.votes_3 },
  ];

  return (
    <div>
      <h2>{data.text}</h2>

      <form onSubmit={handleSubmit}>
        {votes.map((voteData, index) => {
          let mainColor =
            selected === voteData.text
              ? { backgroundColor: "rgba(0, 123, 255, 0.1)" } // Light blue for selected
              : {};

          return (
            <div key={index} onClick={() => handleVoteSelect(voteData.text)}>
              <Vote
                className={`p-4 border rounded-lg shadow-md transition duration-200 ${
                  selected
                    ? "bg-blue-180 border-blue-500"
                    : "bg-white border-gray-300"
                }`}
                text={voteData.text}
                percentage={
                  totalVotes
                    ? `${Math.floor((voteData.votes / totalVotes) * 100)} %`
                    : "0%"
                }
                votes={voteData.votes}
              />
            </div>
          );
        })}

        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-200 w-42 mx-auto"
          type="submit"
        >
          Submit your vote
        </button>
      </form>
      {message && <p className="mt-2 text-green-500">{message}</p>}
    </div>
  );
};

export default QuestionComponent;
