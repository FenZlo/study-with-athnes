import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/* reportWebVitals(); */

function handleTabsClickEvent(e) {
  const node = e.target;
  const root = e.currentTarget;

  if (!node.classList.contains("tabs__item")) return;

  const enabledTabNode = root.querySelector(".tabs__item_enabled");

  if (enabledTabNode) {
    enabledTabNode.classList.remove("tabs__item_enabled");
  }

  node.classList.add("tabs__item_enabled");

  const id = node.dataset.id;

  const contentNode = root.querySelector(
    `.tabs__content-item[data-id="${id}"]`
  );

  const enabledContentNode = root.querySelector(".tabs__content-item_enabled");

  if (enabledContentNode) {
    enabledContentNode.classList.remove("tabs__content-item_enabled");
  }

  contentNode.classList.add("tabs__content-item_enabled");
}

function registerTabsController(rootNode) {
  rootNode.addEventListener("click", handleTabsClickEvent);
}

document
  .querySelectorAll(".tabs")
  .forEach((node) => registerTabsController(node));
