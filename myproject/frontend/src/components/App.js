import React from "react";
import ReactDOM from "react-dom/client";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Home from "./Home";
import "flowbite";

export default function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route
              path="/home/:leetcode_id/:codechef_id/:codeforces_id/"
              element={<Main />}
            />
            <Route path="" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
