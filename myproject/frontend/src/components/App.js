import React from "react";
import { render } from "react-dom";

import Main from "./Main";
import "flowbite";

export default function App() {
  return (
    <>
      {/* <Areachart /> */}
      <Main />
    </>
  );
}
const AppDiv = document.getElementById("app");
render(<App />, AppDiv);
