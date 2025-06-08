import "@/lib/styles/global.css";
import { MathJaxContext } from "better-react-mathjax";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./lib/redux/store";
import Router from "./lib/router/router";

const config = {
  "fast-preview": {
    disabled: true,
  },
  tex: {
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
  messageStyle: "none",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MathJaxContext config={config}>
      <Router />
    </MathJaxContext>
  </Provider>
);
