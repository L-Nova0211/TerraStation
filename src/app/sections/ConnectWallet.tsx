import { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import UsbIcon from "@mui/icons-material/Usb"
import { ConnectType, useWallet } from "@terra-money/wallet-provider"
import { STATION } from "config/constants"
import { useAddress } from "data/wallet"
import { Button, ExternalLink } from "components/general"
import { Grid } from "components/layout"
import { List } from "components/display"
import { ModalButton } from "components/feedback"
import { FormHelp } from "components/form"
import { useAuth } from "auth"
import SwitchWallet from "auth/modules/select/SwitchWallet"
import Connected from "./Connected"

// import electron from "../../app/electron"

interface Props {
  renderButton?: (open: () => void) => ReactNode
}

const ConnectWallet = ({ renderButton }: Props) => {
  const { t } = useTranslation()

  const { connect, install, availableConnections, availableInstallTypes } =
    useWallet()

  const { available } = useAuth()

  const address = useAddress()
  if (address) return <Connected />

  const defaultRenderButton: Props["renderButton"] = (open) => (
    <Button onClick={open} size="small" outline>
      {t("Connect")}
    </Button>
  )

  const sendToElectron = (
    type: ConnectType,
    identifier: string | undefined
  ) => {
    connect(type, identifier)

    let electron
    if (window.electron) {
      electron = window.electron
    } else {
      const { ipcRenderer } = window.require("electron")
      electron = ipcRenderer
    }
    let res = electron.sendSync("connectWallet")
    console.log("after")
    console.log("res")
  }

  const self_list = []
  for (let i = 0; i < availableConnections.length; i++) {
    if (availableConnections[i].type.toLocaleLowerCase() == "extension") {
      self_list.push({
        src: availableConnections[i].icon,
        children: availableConnections[i].name,
        onClick: () =>
          sendToElectron(
            availableConnections[i].type,
            availableConnections[i].identifier
          ),
      })
    } else {
      self_list.push({
        src: availableConnections[i].icon,
        children: availableConnections[i].name,
        onClick: () =>
          connect(
            availableConnections[i].type,
            availableConnections[i].identifier
          ),
      })
    }
  }

  const list = [
    ...self_list,
    {
      icon: <UsbIcon />,
      to: "/auth/ledger",
      children: t("Access with ledger"),
    },
    ...availableInstallTypes
      .filter((type) => type === ConnectType.EXTENSION)
      .map((type) => ({
        children: t("Install extension"),
        onClick: () => install(type),
      })),
  ]

  return (
    <ModalButton
      title={t("Connect wallet")}
      renderButton={renderButton ?? defaultRenderButton}
      maxHeight
    >
      <Grid gap={20}>
        <SwitchWallet />
        <List list={available.length ? available : list} />
        {!!available.length && (
          <FormHelp>
            Use <ExternalLink href={STATION}>Terra Station</ExternalLink> on the
            browser to access with Ledger device
          </FormHelp>
        )}
      </Grid>
    </ModalButton>
  )
}

export default ConnectWallet
