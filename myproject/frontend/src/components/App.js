import React from "react";
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
const AppDiv = document.getElementById("app");
render(<App />, AppDiv);
