import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import reducer from "./Components/BotConfiguration/AddNewIntent/IntentExample/reducer"; // Import the reducer
import kareducer from './Components/KaConfiguration/KaReducer';
import "bootstrap/dist/css/bootstrap.min.css";

// const rootRe
const store = createStore(combineReducers({
  reducer,
  KnowlegdeAgent: kareducer
}));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
