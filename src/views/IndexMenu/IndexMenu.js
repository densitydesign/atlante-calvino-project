import React, { useState } from "react"
import IndexMenuHeader from "../../headers/IndexMenuHeader"
import { Link } from "react-router-dom"
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
    console.log("video")
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
        <div className={styles['tappe']}>
          TAPPE
        </div>
        <Link to='/Phenomena/intro'>
          <div className={styles["tappa1"]}>
            <Tappa1 width="20" />
          </div>
        </Link>
        <Link to='/Process/intro'>
          <div className={styles["tappa2"]}>
            <Tappa2 width="20" />
          </div>
        </Link>
        <Link to='/Problem/intro'>
          <div className={styles["tappa3"]}>
            <Tappa3 width="20" />
          </div>
        </Link>
        <ItemIndex
          title="territorio"
          link="/Phenomena/territory"
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
          link="/Process/doubting"
          linkApprofondimento="/Process/doubting/Hesitation/informationSheet"
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
          linkApprofondimento="/Phenomena/territory/doubtAnalysis/informationSheet"
          link="/Phenomena/territory/doubtAnalysis"
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
          linkApprofondimento="/cancellation-sheet"
          link="/Problem/cancellation"
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
          linkApprofondimento="/Process/transforming/Transform/informationSheet"
          className={"trasformare"}
          link="/Process/transforming"
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
          linkApprofondimento="/Phenomena/territory/spaceAnalysis/informationSheet"
          link="/Phenomena/territory/spaceAnalysis"
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
          linkApprofondimento="/Process/combining/Combine/informationSheet"
          className={"realismo"}
          link="/Problem/realism"
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
          linkApprofondimento="/Phenomena/territory/shapeAnalysis/informationSheet"
          link="/Phenomena/territory/shapeAnalysis"
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
          link="/Process/combining"
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
          link="/Problem/plot"
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
        <div className={styles.spazio}>
          <div className={styles["big-name"]}>Spazio</div>
        </div>
        <div className={styles.forma}>
          <div className={styles["big-name"]}>Forma</div>
        </div>
        <div className={styles.dubbio}>
          <div className={styles["big-name"]}>Dubbio</div>
        </div>
      </div>
      <div className="position-absolute" style={{ top: 70, left: 100 }}>
        <Link to="/Compass">
          <Bussola width="70" />
        </Link>
      </div>
      <div
        className={`position-absolute cursor-pointer ${styles["guarda-la-guida"]}`}
        onClick={handleShowGuida}
      >
        Guarda la guida
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
