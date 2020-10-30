import React, { useState } from "react"
import IndexMenuHeader from "../../headers/IndexMenuHeader"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import styles from "./IndexMenu.module.css"
import { ReactComponent as TerritorioIconHover } from "./icons/territorio_color.svg"
import { ReactComponent as TerritorioIcon } from "./icons/territorio_blue.svg"
import { ReactComponent as DubbioIconHover } from "./icons/dubitare_color.svg"
import { ReactComponent as DubbioIcon } from "./icons/dubitare_blue.svg"
import { ReactComponent as NebbiaIconHover } from "./icons/nebbia_color.svg"
import { ReactComponent as NebbiaIcon } from "./icons/nebbia_blue.svg"
import { ReactComponent as CancellazioneIconHover } from "./icons/cancellazione_color.svg"
import { ReactComponent as CancellazioneIcon } from "./icons/cancellazione_blue.svg"
import { ReactComponent as TrasformareIconHover } from "./icons/trasformare_color.svg"
import { ReactComponent as TrasformareIcon } from "./icons/trasformare_blue.svg"
import { ReactComponent as LuoghiIconHover } from "./icons/luoghi_color.svg"
import { ReactComponent as LuoghiIcon } from "./icons/luoghi_blue.svg"
import { ReactComponent as RealismoIconHover } from "./icons/realismo_color.svg"
import { ReactComponent as RealismoIcon } from "./icons/realismo_blue.svg"
import { ReactComponent as ElenchiIconHover } from "./icons/elenchi_color.svg"
import { ReactComponent as ElenchiIcon } from "./icons/elenchi_blue.svg"
import { ReactComponent as CombinareIconHover } from "./icons/combinare_color.svg"
import { ReactComponent as CombinareIcon } from "./icons/combinare_blue.svg"
import { ReactComponent as TramaIconHover } from "./icons/trama_color.svg"
import { ReactComponent as TramaIcon } from "./icons/trama_blue.svg"
import { ReactComponent as IconApprofondimento } from "./icons/icon_approfondimento.svg"
import { ReactComponent as Orbite } from "./icons/orbite.svg"
import { ReactComponent as Bussola } from "./icons/bussola.svg"
import { ReactComponent as IconCloseGuida } from "../../headers/IndexMenuHeader/icons/icon-close.svg"
import { ReactComponent as Tappa1 } from "./icons/tappa_1.svg"
import { ReactComponent as Tappa2 } from "./icons/tappa_2.svg"
import { ReactComponent as Tappa3 } from "./icons/tappa_3.svg"
import { ReactComponent as Curve1 } from "./icons/curva-dubbio-1.svg"
import { ReactComponent as Curve2 } from "./icons/curva-dubbio-2.svg"
import { ReactComponent as Curve3 } from "./icons/curva-spazio-1.svg"
import { ReactComponent as Curve4 } from "./icons/curva-spazio-2.svg"
import { ReactComponent as Curve5 } from "./icons/curva-forma-1.svg"
import { ReactComponent as Curve6 } from "./icons/curva-forma-2.svg"
import Footer from "../../headers/Footer/Footer"
import { Modal } from "react-bootstrap"

const ItemIndex = ({
  icon,
  iconHover,
  title,
  className,
  link,
  linkApprofondimento,
}) => {
  return (
    <div className={`${styles[className]} ${styles["hoverable-icon"]}`}>
      <Link to={link}>
        {icon}
        {iconHover}
      </Link>
      <span className={`${styles["title-viz"]} text-capitalize`}>{title}</span>
      {title !== "territorio" && (
        <Link to={linkApprofondimento}>
          <IconApprofondimento className="mt-2" />
        </Link>
      )}
    </div>
  )
}

export default function IndexMenu({ onClose }) {
  const [showGuida, setShowGuida] = useState(false)

  const handleCloseGuida = () => setShowGuida(false)
  const handleShowGuida = () => {
    setShowGuida(true)
  }

  return (
    <div>
      <IndexMenuHeader
        menuAction={onClose ? "closeIndex" : "homeLink"}
        onClose={onClose}
      />
      <div
        className={styles["OrbiteContainer"]}
        style={{ top: 58, left: 0, right: 0, bottom: 18 }}
      >
        <Orbite />
      </div>
      <div className={styles["IndexMenu"]}>
        <div className={styles["tappe"]}>Tappa</div>
        <HashLink to="/phases#phenomena">
          <div className={styles["tappa1"]}>
            <Tappa1 width="20" />
          </div>
        </HashLink>
        <HashLink to="/phases#process">
          <div className={styles["tappa2"]}>
            <Tappa2 width="20" />
          </div>
        </HashLink>
        <HashLink to="/phases#problem">
          <div className={styles["tappa3"]}>
            <Tappa3 width="20" />
          </div>
        </HashLink>
        <ItemIndex
          title="territorio"
          link="/archipelago"
          className={"territorio"}
          icon={
            <TerritorioIcon
              className={`${styles["basic-icon"]} ${styles["icon-width"]}`}
            />
          }
          iconHover={
            <TerritorioIconHover
              className={`${styles["hover-icon"]} ${styles["icon-width"]}`}
            />
          }
        />
        <ItemIndex
          title="dubitare"
          link="/doubt/phase2"
          linkApprofondimento="/doubt/phase2/focus"
          className={"dubitare"}
          icon={
            <DubbioIcon
              className={`${styles["basic-icon"]} ${styles["icon-width"]}`}
            />
          }
          iconHover={
            <DubbioIconHover
              className={`${styles["hover-icon"]} ${styles["icon-width"]}`}
            />
          }
        />
        <ItemIndex
          title="nebbia"
          linkApprofondimento="/doubt/phase1/focus"
          link="/doubt/phase1"
          className={"nebbia"}
          icon={
            <NebbiaIcon
              className={`${styles["basic-icon"]} ${styles["icon-width"]}`}
            />
          }
          iconHover={
            <NebbiaIconHover
              className={`${styles["hover-icon"]} ${styles["icon-width"]}`}
            />
          }
        />
        <ItemIndex
          title="cancellazione"
          linkApprofondimento="/doubt/phase3/focus"
          link="/doubt/phase3"
          className={"cancellazione"}
          icon={
            <CancellazioneIcon
              className={`${styles["basic-icon"]} ${styles["icon-width"]}`}
            />
          }
          iconHover={
            <CancellazioneIconHover
              className={`${styles["hover-icon"]} ${styles["icon-width"]}`}
            />
          }
        />
        <ItemIndex
          title="trasformare"
          linkApprofondimento="/space/phase2/focus"
          className={"trasformare"}
          link="/space/phase2"
          icon={
            <TrasformareIcon
              className={`${styles["basic-icon"]} ${styles["icon-width"]}`}
            />
          }
          iconHover={
            <TrasformareIconHover
              className={`${styles["hover-icon"]} ${styles["icon-width"]}`}
            />
          }
        />
        <ItemIndex
          title="luoghi"
          linkApprofondimento="/space/phase1/focus"
          link="/space/phase1"
          className={"luoghi"}
          icon={
            <LuoghiIcon
              className={`${styles["basic-icon"]} ${styles["icon-width"]}`}
            />
          }
          iconHover={
            <LuoghiIconHover
              className={`${styles["hover-icon"]} ${styles["icon-width"]}`}
            />
          }
        />
        <ItemIndex
          title="realismo"
          linkApprofondimento="/space/phase3/focus"
          className={"realismo"}
          link="/space/phase3"
          icon={
            <RealismoIcon
              className={`${styles["basic-icon"]} ${styles["icon-width"]}`}
            />
          }
          iconHover={
            <RealismoIconHover
              className={`${styles["hover-icon"]} ${styles["icon-width"]}`}
            />
          }
        />
        <ItemIndex
          title="elenchi"
          linkApprofondimento="/form/phase1/focus"
          link="/form/phase1"
          className={"elenchi"}
          icon={
            <ElenchiIcon
              className={`${styles["basic-icon"]} ${styles["icon-width"]}`}
            />
          }
          iconHover={
            <ElenchiIconHover
              className={`${styles["hover-icon"]} ${styles["icon-width"]}`}
            />
          }
        />
        <ItemIndex
          title="combinare"
          link="/form/phase2"
          linkApprofondimento="/form/phase2/focus"
          className={"combinare"}
          icon={
            <CombinareIcon
              className={`${styles["basic-icon"]} ${styles["icon-width"]}`}
            />
          }
          iconHover={
            <CombinareIconHover
              className={`${styles["hover-icon"]} ${styles["icon-width"]}`}
            />
          }
        />
        <ItemIndex
          title="trama"
          link="/form/phase3"
          className={"trama"}
          icon={
            <TramaIcon
              className={`${styles["basic-icon"]} ${styles["icon-width"]}`}
            />
          }
          iconHover={
            <TramaIconHover
              className={`${styles["hover-icon"]} ${styles["icon-width"]}`}
            />
          }
        />
      </div>
      <div className="position-absolute" style={{ top: 70, left: 100 }}>
        <Link to="/compass">
          <Bussola width="70" />
        </Link>
      </div>
      <div
        className={`position-absolute cursor-pointer ${styles["guarda-la-guida"]}`}
        onClick={handleShowGuida}
      >
        Guarda la guida
      </div>

      <div className={`position-absolute ${styles["curve-dubbio-1"]}`}>
        <HashLink to="/itineraries#doubt">
          <Curve1 width="60" />
        </HashLink>
      </div>

      <div className={`position-absolute ${styles["curve-dubbio-2"]}`}>
        <HashLink to="/itineraries#doubt">
          <Curve2 width="60" />
        </HashLink>
      </div>
      <div className={`position-absolute ${styles["curve-spazio-1"]}`}>
        <HashLink to="/itineraries#space">
          <Curve3 width="60" />
        </HashLink>
      </div>
      <div className={`position-absolute ${styles["curve-spazio-2"]}`}>
        <HashLink to="/itineraries#space">
          <Curve4 width="60" />
        </HashLink>
      </div>
      <div className={`position-absolute ${styles["curve-forma-1"]}`}>
        <HashLink to="/itineraries#form">
          <Curve5 width="60" />
        </HashLink>
      </div>
      <div className={`position-absolute ${styles["curve-forma-2"]}`}>
        <HashLink to="/itineraries#form">
          <Curve6 width="60" />
        </HashLink>
      </div>
      <Footer />
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showGuida}
        onHide={handleCloseGuida}
      >
        <Modal.Body style={{ height: 500 }}>
          <div onClick={handleCloseGuida} className="text-right cursor-pointer">
            <IconCloseGuida />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
