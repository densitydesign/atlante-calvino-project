import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
} from "react"
import { Trans, useTranslation } from "react-i18next"
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
import Footer from "../../headers/Footer/Footer"
import { Modal } from "react-bootstrap"
import { faWindowRestore } from "@fortawesome/free-regular-svg-icons"
import Curves from "./Curves.js"

const ItemIndex = ({
  icon,
  iconHover,
  title,
  className,
  link,
  onClose,
  linkApprofondimento,
  tappa,
  tappaHover,
  titleApprofondimento,
  itinerarioHover,
  itinerario,
}) => {
  const iconEl = useRef()
  const groupEl = useRef()
  const [yAlign, setYAlign] = useState(0)

  const alignItem = () => {
    const group_bbox = groupEl.current.getBoundingClientRect()
    const icon_bbox = iconEl.current.getBoundingClientRect()
    setYAlign((group_bbox.height - icon_bbox.height) / 3)
    // console.log("group", group_bbox.height)
    // console.log("height", icon_bbox.height)
    // console.log(group_bbox.height - icon_bbox.height)
  }

  useEffect(() => {
    alignItem()
    const cb = alignItem
    window.addEventListener("resize", cb)
    return () => void window.removeEventListener("resize", cb)
  }, [])

  return (
    <div
      ref={groupEl}
      className={
        (tappa && tappaHover && tappa === tappaHover) ||
        (itinerario && itinerarioHover === itinerario)
          ? styles[className]
          : styles[className] + " " + styles["hoverable-icon"]
      }
    >
      {(tappa && tappaHover && tappa === tappaHover) ||
      (itinerario && itinerarioHover === itinerario) ? (
        <Link onClick={onClose} to={link} ref={iconEl}>
          {iconHover}
        </Link>
      ) : (
        <Link onClick={onClose} to={link} ref={iconEl}>
          {icon}
          {iconHover}
        </Link>
      )}
      <span
        className={`${styles["title-viz"]} text-capitalize`}
        style={{
          transform: `translate(0, ${title !== "Territorio" ? yAlign : 0}px)`,
        }}
      >
        {title}
      </span>
      {link !== '/archipelago' && (
        <Link
          className={`d-flex mt-2 ${styles["icon-approfondimento"]} ${styles["small-approfondimento"]}`}
          to={linkApprofondimento}
          style={{
            transform: `translate(0, ${title !== "Territorio" ? yAlign : 0}px)`,
          }}
        >
          <IconApprofondimento className='mr-2'
          />
          <span className={styles['text-approfondimento']}>
            {titleApprofondimento}
          </span>
        </Link>
      )}
    </div>
  )
}

export default function IndexMenu({ onClose }) {
  const [showGuida, setShowGuida] = useState(false)
  const [tappaHover, setTappaHover] = useState(null)
  const [dev, setDev] = useState(false)
  const [itinerarioHover, setItinerario] = useState(null)

  const handleCloseGuida = () => setShowGuida(false)
  const handleShowGuida = () => {
    setShowGuida(true)
  }

  const { t } = useTranslation("translation")

  const orbiteRef = useRef()

  function getD(cx, cy, rx, ry) {
    var kappa = 0.5522847498
    var ox = rx * kappa // x offset for the control point
    var oy = ry * kappa // y offset for the control point
    let d = `M${cx - rx},${cy} `;
    d += `C${cx - rx} ${cy - oy}, ${cx - ox} ${cy - ry}, ${cx} ${cy - ry} `;
    d += `C${cx + ox} ${cy - ry}, ${cx + rx} ${cy - oy}, ${cx + rx} ${cy} `;
    d += `C${cx + rx} ${cy + oy}, ${cx + ox} ${cy + ry}, ${cx} ${cy + ry} `;
    d += `C${cx - ox} ${cy + ry}, ${cx - rx} ${cy + oy}, ${cx - rx} ${cy} `;
    d += `z`;
    return d;
  }

  const tappeLayout = useCallback(() => {
    const el = orbiteRef.current
    const bbox = el.getBoundingClientRect()
    const g = el.querySelector("g")
    g.querySelectorAll("ellipse").forEach((o, i) => {

      // transforming the ellipse into a path (in order to use 'getPointAtLength()')
      const cx = (parseInt(o.getAttribute("cx")) / 100) * bbox.width,
            cy = (parseInt(o.getAttribute("cy")) / 100) * bbox.height,
            rx = (parseInt(o.getAttribute("rx")) / 100) * bbox.width,
            ry = (parseInt(o.getAttribute("ry")) / 100) * bbox.height;

      const d = getD(cx, cy, rx, ry)
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      )
      path.setAttribute("d", d)
      path.setAttribute("fill", "none")
      path.setAttribute("stroke", "red")
      // g.appendChild(path); // uncomment to show the path

      // positioning the circles
      const length = path.getTotalLength()
      const percentages = [0.34, 0.34, 0.34] // adjust these to fix positioning
      const position = length * percentages[i] // position depends on the totalLength
      const point = path.getPointAtLength(position)
      console.log(point)
      const cl = "tappa" + (i + 1)
      const el2 = document.querySelector("." + styles[cl])
      el2.style.top = point.y - 10 + "px"
      el2.style.left = point.x - 10 + "px"

      // positioning the label "tappe"
      if (i === 1) {
        const el3 = document.querySelector(`.${styles["tappe"]}`)
        const el3bbox = el3.getBoundingClientRect()
        el3.style.top = point.y - 25 + "px"
        el3.style.left = point.x + "px"
        el3.style.transform = "translate(-50%, -50%)"
      }
    })
  }, [])

  useLayoutEffect(() => {
    tappeLayout()
  }, [tappeLayout])

  useEffect(() => {
    const cb = tappeLayout
    window.addEventListener("resize", cb)
    return () => void window.removeEventListener("resize", cb)
  }, [tappeLayout])

  return (
    <div className={[dev ? styles.development : ""].join(" ")}>
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
          <video width="100%" height="90%" controls autoplay="autoplay">
            <source
              src={process.env.PUBLIC_URL + "/introcalvino.mp4"}
              type="video/mp4"
            />
          </video>
        </Modal.Body>
      </Modal>
      <IndexMenuHeader
        menuAction={onClose ? "closeIndex" : "homeLink"}
        onClose={onClose}
      />

      <div
        className={styles["OrbiteContainer"]}
        style={{ top: 58, left: 0, right: 0, bottom: 18 }}
      >
        <Orbite ref={orbiteRef} />
      </div>
      <Curves
        dev={dev}
        itinerarioHover={itinerarioHover}
        setItinerario={setItinerario}
        onClose={onClose}
      />
      <div className={styles["IndexMenu"]}>
        <div className={styles["tappe"]}>{t("tappa")}</div>
        <HashLink onClick={onClose} to="/phases#phenomena">
          <div className={styles["tappa1"]}>
            <div
              onMouseEnter={() => setTappaHover(1)}
              onMouseLeave={() => setTappaHover(null)}
              className={"number-tappa"}
            >
              1
            </div>
          </div>
        </HashLink>
        <HashLink onClick={onClose} to="/phases#process">
          <div className={styles["tappa2"]}>
            <div
              onMouseEnter={() => setTappaHover(2)}
              onMouseLeave={() => setTappaHover(null)}
              className={"number-tappa"}
            >
              2
            </div>
          </div>
        </HashLink>
        <HashLink onClick={onClose} to="/phases#problem">
          <div className={styles["tappa3"]}>
            <div
              onMouseEnter={() => setTappaHover(3)}
              onMouseLeave={() => setTappaHover(null)}
              className={"number-tappa"}
            >
              3
            </div>
          </div>
        </HashLink>
        <ItemIndex
          title={t("territorio")}
          onClose={onClose}
          link="/archipelago"
          className={"territorio"}
          tappaHover={tappaHover}
          itinerarioHover={itinerarioHover}
          tappa={1}
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
          title={t("dubitare")}
          onClose={onClose}
          tappaHover={tappaHover}
          itinerarioHover={itinerarioHover}
          itinerario={"Dubbio"}
          titleApprofondimento={
            <Trans
              i18nKey="il_romanzo_saggio_che_dubita"
              t={t}
              ns="translation"
            >
              Il romanzo-saggio
              <br />
              che dubita
            </Trans>
          }
          tappa={2}
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
          title={t("nebbia")}
          tappaHover={tappaHover}
          itinerarioHover={itinerarioHover}
          titleApprofondimento={t("L’effetto-nebbia")}
          tappa={1}
          itinerario={"Dubbio"}
          onClose={onClose}
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
              style={{ transition: "ease-in 0.5s" }}
              className={`${styles["hover-icon"]} ${styles["icon-width"]}`}
            />
          }
        />
        <ItemIndex
          title={t("cancellazione")}
          onClose={onClose}
          tappaHover={tappaHover}
          itinerarioHover={itinerarioHover}
          itinerario={"Dubbio"}
          tappa={3}
          titleApprofondimento={
            <Trans
              i18nKey="il_dubbio_e_la_cancellazione"
              t={t}
              ns="translation"
            >
              Il dubbio e<br />
              la cancellazione
            </Trans>
          }
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
          title={t("trasformare")}
          onClose={onClose}
          itinerario={"Spazio"}
          titleApprofondimento={
            <Trans
              i18nKey="cartografia_dei_luoghi_terrestri"
              t={t}
              ns="translation"
            >
              Cartografia dei
              <br />
              luoghi terrestri
            </Trans>
          }
          linkApprofondimento="/space/phase2/focus"
          className={"trasformare"}
          tappaHover={tappaHover}
          itinerarioHover={itinerarioHover}
          tappa={2}
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
          title={t("luoghi")}
          tappaHover={tappaHover}
          itinerarioHover={itinerarioHover}
          tappa={1}
          itinerario={"Spazio"}
          titleApprofondimento={
            <Trans
              i18nKey="la_forma_della_geografia_inventata"
              t={t}
              ns="translation"
            >
              La forma della
              <br />
              geografia inventata
            </Trans>
          }
          onClose={onClose}
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
          title={t("realismo")}
          onClose={onClose}
          linkApprofondimento="/space/phase3/focus"
          className={"realismo"}
          itinerario={"Spazio"}
          titleApprofondimento={
            <Trans i18nKey="metamorfosi_della_realta" t={t} ns="translation">
              Metamorfosi della realtà:
              <br />
              sulle tracce della paura
            </Trans>
          }
          link="/space/phase3"
          tappaHover={tappaHover}
          itinerarioHover={itinerarioHover}
          tappa={3}
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
          title={t("elenchi")}
          linkApprofondimento="/form/phase1/focus"
          link="/form/phase1"
          itinerario={"Forma"}
          tappaHover={tappaHover}
          itinerarioHover={itinerarioHover}
          titleApprofondimento={
            <Trans i18nKey="per_un_estetica_elencatoria" t={t} ns="translation">
              Per un'estetica
              <br />
              elencatoria
            </Trans>
          }
          tappa={1}
          onClose={onClose}
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
          title={t("combinare")}
          onClose={onClose}
          itinerario={"Forma"}
          link="/form/phase2"
          tappaHover={tappaHover}
          itinerarioHover={itinerarioHover}
          titleApprofondimento={t("Costruire la varietà")}
          tappa={2}
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
          title={t("trama")}
          onClose={onClose}
          link="/form/phase3"
          itinerario={"Forma"}
          tappaHover={tappaHover}
          itinerarioHover={itinerarioHover}
          titleApprofondimento={t("Leggere fra le trame")}
          tappa={3}
          linkApprofondimento="/form/phase3/focus"
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
        <Link target="_blank" to="/compass">
          <Bussola width="70" />
        </Link>
      </div>
      <div
        className={`position-absolute cursor-pointer ${styles["guarda-la-guida"]}`}
        onClick={handleShowGuida}
      >
        {t("index_menu.video_guida")}
      </div>
      <Footer />
    </div>
  )
}