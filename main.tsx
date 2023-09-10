// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { AppContainer } from "react-hot-loader";

// import "./index.css";
import { Root } from "./root";
import { store, persistor } from "./src/store/appStore";

// const render = (Component: (props: IRootProps) => React.ReactElement) => {
//   ReactDOM.render(
//     <AppContainer>
//       <Component store={store} persistor={persistor} />
//     </AppContainer>,
//     document.getElementById("root"),
//   );
// };
// render(Root);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Root store={store} persistor={persistor} />
  </BrowserRouter>,
);

// reportWebVitals();
