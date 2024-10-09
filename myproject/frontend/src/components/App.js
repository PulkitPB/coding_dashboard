import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
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
          </Routes>
        </Router>
      </div>
    </>
  );
}
const AppDiv = document.getElementById("app");
render(<App />, AppDiv);
