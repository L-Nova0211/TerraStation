import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  useWallet,
  useConnectedWallet,
  ConnectType,
} from "@terra-money/wallet-provider"

const Browser = () => {
  const { t } = useTranslation()

  useEffect(() => {
    let script = document.createElement("script")
    script.src = "https://unpkg.com/@ungap/custom-elements-builtin"
    script.async = true
    document.body.appendChild(script)

    script = document.createElement("script")
    script.src = "https://unpkg.com/x-frame-bypass"
    script.async = true
    script.type = "module"
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  let wallet = useWallet()

  const connect = () => {
    console.log(wallet)
    console.log(navigator.userAgent)

    for (var i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      if (key != null) {
        console.log(key)
        console.log(localStorage.getItem(key))
      }
    }
    console.log("Session")
    for (var i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i)
      if (key != null) {
        console.log(key)
        console.log(sessionStorage.getItem(key))
      }
    }

    wallet.connect(ConnectType.EXTENSION)
  }
  return (
    <>
      <button onClick={connect}>Connect</button>
      <webview
        title="anchor"
        // is="x-frame-bypass"
        src="https://app.anchorprotocol.com"
        style={{ display: "inline-flex", width: "100%", height: "100%" }}
        // nodeintegration = {true}
        useragent="5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"

        // nodeintegrationinsubframes
        // sandbox='allow-same-origin  allow-scripts'
        // width='100%'
        // height='100%'
      />
    </>
  )
}

export default Browser
