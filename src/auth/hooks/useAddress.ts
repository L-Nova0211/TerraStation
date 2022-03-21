import { useConnectedWallet } from "@terra-money/wallet-provider"
import useAuth from "./useAuth"

/* auth | walle-provider */
const useAddress = () => {
  const connected = useConnectedWallet()
  // console.log(connected)
  const { wallet } = useAuth()
  // console.log(wallet)
  return wallet?.address ?? connected?.terraAddress
}

export default useAddress
