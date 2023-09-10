import * as React from "react";
import { Provider } from "react-redux";
import { App } from "./src/components/App/App";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor } from "redux-persist/es/types";
import { ConfigProvider } from "antd";
import locale from "antd/es/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import updateLocale from "dayjs/plugin/updateLocale";

export interface IRootProps {
  store: any;
  persistor: Persistor;
}

dayjs.extend(updateLocale);
dayjs.updateLocale("ru", {
  weekStart: 1,
});

export function Root({ store, persistor }: IRootProps) {
  return (
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={locale}>
          <Provider store={store}>
            <App />
          </Provider>
        </ConfigProvider>
      </PersistGate>
    </React.StrictMode>
  );
}
