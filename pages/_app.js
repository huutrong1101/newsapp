import "../sass/main.scss";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import Layout from "../components/Layout";
import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress
        color="#eef0f5"
        height={2}
        startPosition={0.3}
        stopDelayMs={200}
        showOnShallow={true}
      />
      <ThemeProvider
        enableSystem={true}
        disableTransitionOnChange
        attribute="class"
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
