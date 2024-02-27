import { useEffect, useState } from "react";
import "./style.css";
import { browser } from "wxt/browser";

function Menu() {
  function formatMsg(_title: string = "", _url: string = "") {
    return `[${_title}](${_url})`;
  }
  const [msg, setMsg] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      let _title = tabs[0]?.title || "";
      let _url = tabs[0]?.url || "";
      setTitle(_title);
      setUrl(_url);
      setMsg(formatMsg(_title, _url));
    });
  }, []);
  const [btnText, setBtnText] = useState("Copy Markdown Link");
  let switchBtnText = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setValue("Done");
    setTimeout(() => {
      setValue(value);
    }, 1000);
  };
  let handleCopy = (_msg: string) => {
    navigator.clipboard
      .writeText(_msg)
      .then(function () {
        switchBtnText(btnText, setBtnText);
      })
      .catch(function (error) {
        console.error("failed:", error);
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
        <button onClick={() => handleCopy(msg)}>{btnText}</button>
      </div>
    </>
  );
}
export default Menu;
