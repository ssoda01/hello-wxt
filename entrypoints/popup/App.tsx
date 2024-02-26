import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
// import "./App.css";
import { browser } from "wxt/browser";
import Menu from "./comp/menu";
function App() {
  return (
    <>
      <div className="card">
        <Menu />
      </div>
    </>
  );
}

export default App;
