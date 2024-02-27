import { useEffect, useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "@/entrypoints/popup/App.css";
import { browser } from "wxt/browser";

function Menu() {
  function formatMsg(_title: string = "", _url: string = "") {
    return `[${_title}](${_url})`;
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
      let _title = tabs[0]?.title || "";
      let _url = tabs[0]?.url || "";
      setTitle(_title);
      setUrl(_url);
      setMsg(formatMsg(_title, _url));
      console.log("currentMsg", msg);
    });
  }, []);
  let handleCopy = (_msg: string) => {
    navigator.clipboard
      .writeText(_msg)
      .then(function () {
        // 复制成功时的回调
        console.log("内容已复制：", _msg);
      })
      .catch(function (error) {
        // 复制失败时的回调
        console.error("复制失败:", error);
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
        <button onClick={() => handleCopy(msg)}>Copy Markdown Link</button>
      </div>
    </>
  );
}
export default Menu;
