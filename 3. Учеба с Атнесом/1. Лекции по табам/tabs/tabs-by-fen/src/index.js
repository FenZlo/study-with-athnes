/* import React from "react";
import ReactDOM from "react-dom/client"; */
import "./index.css";
/* import App from "./App";
import reportWebVitals from "./reportWebVitals"; */

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
    enabledTabNode.setAttribute('aria-selected', 'false')
  }

  node.classList.add("tabs__item_enabled");
  node.setAttribute('aria-selected', 'true')

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

function handleTabsKeydownEvent(e) {
  let shift = 0;
  switch (e.key) {
    case "ArrowLeft":
      shift = -1;
      break;
    case "ArrowRight":
      shift = 1;
      break;
    default:
      return;
  }

  const root = e.currentTarget;
  const focusedTab = root.querySelector(".tabs__item:focus");
  if (!focusedTab) return;
  const tabs = Array.from(root.querySelectorAll(".tabs__item"));
  const tabsIds = tabs.map((tabMNode) => tabMNode.dataset.id);
  const focusedTabId = focusedTab.dataset.id;
  const index = tabsIds.indexOf(focusedTabId);

  const newId = tabsIds[(index + shift + tabsIds.length) % tabsIds.length];

  const nodeToFocus = root.querySelector(`.tabs__item[data-id="${newId}"]`);

  tabs.forEach((tab) => {
    tab.setAttribute("tabindex", -1);
  });

  nodeToFocus.setAttribute("tabindex", 0);
  nodeToFocus.focus();
}

function handleTabsHeaderFocusoutEvent(e) {
  const relatedTarget = e.relatedTarget;
  const headerNode = e.currentTarget;

  if (relatedTarget && relatedTarget.classList.contains(".tabs__item")) return;

  const tabs = Array.from(headerNode.querySelectorAll(".tabs__item"));

  tabs.forEach((tab) => {
    tab.setAttribute(
      "tabindex",
      tab.classList.contains("tabs__item_enabled") ? 0 : -1
    );
  });
}

function registerTabsController(rootNode) {
  const headerNode = rootNode.querySelector(".tabs__header");

  rootNode.addEventListener("click", handleTabsClickEvent);
  rootNode.addEventListener("keydown", handleTabsKeydownEvent);
  headerNode.addEventListener("focusout", handleTabsHeaderFocusoutEvent);
}

document
  .querySelectorAll(".tabs")
  .forEach((node) => registerTabsController(node));
