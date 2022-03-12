import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

const Browser = () => {
  const { t } = useTranslation()

  // useEffect(() => {
  //   let script = document.createElement('script');
  //   script.src = "https://unpkg.com/@ungap/custom-elements-builtin";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   script = document.createElement('script');
  //   script.src = "https://unpkg.com/x-frame-bypass";
  //   script.async = true;
  //   script.type = "module"
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   }
  // }, []);
  console.log(window)
  console.log(navigator)
  return (
    <>
      <webview
        title="anchor"
        // is="x-frame-bypass"
        src="https://app.anchorprotocol.com"
        style={{ display: "inline-flex", width: "100%", height: "100%" }}
        // nodeintegration = {true}
        // useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        // nodeintegrationinsubframes
        // sandbox='allow-same-origin  allow-scripts'
        // width='100%'
        // height='100%'
      />
    </>
  )
}

export default Browser
