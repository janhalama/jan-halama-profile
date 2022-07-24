import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.css';
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
fontAwesomeConfig.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
