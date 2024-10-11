import React, { useEffect, useState } from "react"; // Import useState
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import About from "./AboutComponent";
import Home from "./HomeComponent";
import Question from "./QuestionComponent"; // Import Question component
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate for redirection
import { COLLECTION_ID, DB_ID, client, databases } from "../lib/appwrite";

const MainComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestionsFromDB();

    const unsubscribe = client.subscribe(
      `databases.${DB_ID}.collections.${COLLECTION_ID}.documents`,
      (res) => {
        console.log(res);

        if (
          res.events.includes("databases.*.collections.*.documents.*.update")
        ) {
          setQuestions((prevQuestions) => {
            return prevQuestions.map((question) => {
              if (question.$id !== res.payload.$id) {
                return question;
              }
              return res.payload;
            });
          });
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  async function getQuestionsFromDB() {
    try {
      const questions = await databases.listDocuments(DB_ID, COLLECTION_ID);
      setQuestions(questions.documents);
    } catch (error) {
      console.log("Error in fetching questions: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* renders a list of Question components based on the questions state. each Question component receives data from the question object and is given a unique key based on the question.id */}
        <Route
          path="/questions"
          element={
            loading ? (
              <div>Loading questions...</div> // conditional rendering
            ) : (
              questions.map((question) => (
                <Question key={question.id} data={question} />
              ))
            )
          }
        />

        {/* redirects to any undefined route */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default MainComponent;
