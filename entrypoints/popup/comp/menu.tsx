import { useEffect, useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "@/entrypoints/popup/App.css";
import { browser } from "wxt/browser";

function Example() {
  const [count, setCount] = useState(0);
  let title = document.head.querySelector("title")?.innerText;
  let link = window.location.href;
  let getMDStr = () => {
    let template = `[${title}](${link})`;
    return template;
  };
  console.log(getMDStr());
  return (
    <>
      <div>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p>
    </>
  );
}
function Menu() {
  const getCurrentTabInfo = async () => {
    const tab = await browser.tabs.getCurrent().then((e) => {
      console.log("promise,", e);
      return e;
    });
    console.log("id", browser.runtime.id);
    console.log("id", browser.tabs.connect(tab.id);
    console.log(tab);
    return tab;
    // console.log(browser.tabs.getCurrent());
  };

  const [count, setCount] = useState(0);
  let title = document.head.querySelector("title")?.innerText;
  let link = window.location.href;
  let getMDStr = () => {
    let template = `[${title}](${link})`;
    return template;
  };
  useEffect(() => {
    console.log("start:");
    const tab = getCurrentTabInfo();
    console.log("tab", tab);
    navigator.clipboard.addEventListener("clipboard", (e: any) => {
      console.log(e);
    });
  }, []);
  let handleCopy = () => {
    navigator.clipboard.writeText(getMDStr());
  };
  console.log(getMDStr());
  return (
    <>
      <div>
        <p>{getMDStr()}</p>
      </div>

      <button onClick={handleCopy}>Copy Markdown Link</button>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p>
    </>
  );
}
export default Menu;
