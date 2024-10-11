import "./App.css";
import Main from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { client, databases, DB_ID, COLLECTION_ID } from "./lib/appwrite";

function App() {
  // the return statement specifies the JSX will be rendered
  return (
    <div className="App">
      {/* wraps the Main component, enabling routing functionality throughout the application. manages browser history and URL synchronization, allowing you to navigate without reloading the page */}
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
