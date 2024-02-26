import { useEffect, useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "@/entrypoints/popup/App.css";
import { browser } from "wxt/browser";

function Menu() {
  function formatMsg(title: string = "", url: string = "") {
    return `[${title}](${url})`;
  }
  const [msg, setMsg] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message); // "ping"
    return true;
  });
  useEffect(() => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      setTitle(tabs[0]?.title || "");
      setUrl(tabs[0]?.url || "");
      setMsg(formatMsg(title, url));
      console.log("currentMsg",msg);
    });
  }, []);
  let handleCopy = () => {
    navigator.clipboard.writeText(msg).then((res) => {
      console.log("clipboard res", res);
    });
  };
  return (
    <>
      <div className="link">
        <p>
          <span>[{title}]</span>
          <span>({url})</span>
        </p>
      </div>
      <div className="btn-area">
        <button onClick={handleCopy}>Copy Markdown Link</button>
      </div>
    </>
  );
}
export default Menu;
