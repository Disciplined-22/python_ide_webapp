import type { AppProps } from "next/app";
import "../globals.css"; // Adjust the path if necessary

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
