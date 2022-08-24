import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import axios from "axios";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  console.log("app is running");
  return (
    <SWRConfig
      value={{ fetcher: async (url: string) => (await axios.get(url)).data }}
    >
      <div className="w-full max-w-lg mx-auto">
        <Component {...pageProps} />
      </div>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={() => {
          // window.fbAsyncInit = function () {
          //   FB.init({
          //     appId: "your-app-id",
          //     autoLogAppEvents: true,
          //     xfbml: true,
          //     version: "v13.0",
          //   });
          // };
        }}
      />
    </SWRConfig>
  );
}

export default MyApp;
