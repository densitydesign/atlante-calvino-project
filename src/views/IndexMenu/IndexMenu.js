import React from "react"
import IndexMenuHeader from "../../headers/IndexMenuHeader"
import { Link } from "react-router-dom"
import "./IndexMenu.css"
import { ReactComponent as TerritorioIcon } from "./icons/territorio_color.svg"
import { ReactComponent as TerritorioIconHover } from "./icons/territorio_blue.svg"
import { ReactComponent as DubbioIcon } from "./icons/dubitare_color.svg"
import { ReactComponent as DubbioIconHover } from "./icons/dubitare_blue.svg"
import { ReactComponent as NebbiaIcon } from "./icons/nebbia_color.svg"
import { ReactComponent as NebbiaIconHover } from "./icons/nebbia_blue.svg"
import { ReactComponent as CancellazioneIcon } from "./icons/cancellazione_color.svg"
import { ReactComponent as CancellazioneIconHover } from "./icons/cancellazione_blue.svg"
import { ReactComponent as TrasformareIcon } from "./icons/trasformare_color.svg"
import { ReactComponent as TrasformareIconHover } from "./icons/trasformare_blue.svg"
import { ReactComponent as LuoghiIcon } from "./icons/luoghi_color.svg"
import { ReactComponent as LuoghiIconHover } from "./icons/luoghi_blue.svg"
import { ReactComponent as RealismoIcon } from "./icons/realismo_color.svg"
import { ReactComponent as RealismoIconHover } from "./icons/realismo_blue.svg"
import { ReactComponent as ElenchiIcon } from "./icons/elenchi_color.svg"
import { ReactComponent as ElenchiIconHover } from "./icons/elenchi_blue.svg"
import { ReactComponent as CombinareIcon } from "./icons/combinare_color.svg"
import { ReactComponent as CombinareIconHover } from "./icons/combinare_blue.svg"
import { ReactComponent as TramaIcon } from "./icons/trama_color.svg"
import { ReactComponent as TramaIconHover } from "./icons/trama_blue.svg"
import { ReactComponent as IconApprofondimento } from "./icons/icon_approfondimento.svg"
import Footer from "../../headers/Footer/Footer"

const ItemIndex = ({
  icon,
  iconHover,
  title,
  className,
  link,
  linkApprofondimento,
}) => {
  return (
    <Link to={link}>
      <div className={className + " hoverable-icon"}>
        {icon}
        {iconHover}
        <span className="title-viz text-capitalize">{title}</span>
        {linkApprofondimento && (
          <Link to={linkApprofondimento}>
            <IconApprofondimento className="mt-1" />
          </Link>
        )}
      </div>
    </Link>
  )
}

export default function IndexMenu() {
  return (
    <div>
      <IndexMenuHeader />
      <div
        className="position-absolute"
        style={{ top: 58, left: 0, right: 0, bottom: 58 }}
      >
        <svg style={{ overflow: "visible", width: "100vw", height: "100%" }}>
          <g id="Orbite">
            <ellipse
              cx="50%"
              cy="55%"
              rx="70%"
              ry="45%"
              fill="none"
              stroke="#666"
              strokeMiterlimit="10"
              strokeDasharray="3.997405529022217,5.996108531951904"
            />
            <ellipse
              cx="50%"
              cy="42%"
              rx="45%"
              ry="30%"
              fill="none"
              stroke="#666"
              strokeMiterlimit="10"
              strokeDasharray="3.997405529022217,5.996108531951904"
            />
            <ellipse
              cx="50%"
              cy="30%"
              rx="25%"
              ry="17%"
              fill="none"
              stroke="#666"
              strokeMiterlimit="10"
              strokeDasharray="3.997405529022217,5.996108531951904"
            />
          </g>
        </svg>
      </div>
      <div className="IndexMenu position-relative">
        <ItemIndex
          title="territorio"
          className="territorio"
          icon={<TerritorioIcon className="basic-icon icon-width" />}
          iconHover={<TerritorioIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="dubitare"
          link="Process/doubting"
          className="dubitare"
          icon={<DubbioIcon className="basic-icon icon-width" />}
          iconHover={<DubbioIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="nebbia"
          link="Phenomena/territory/doubtAnalysis"
          className="nebbia"
          icon={<NebbiaIcon className="basic-icon icon-width" />}
          iconHover={<NebbiaIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="cancellazione"
          link="Problem/cancellation"
          className="cancellazione"
          icon={<CancellazioneIcon className="basic-icon icon-width" />}
          iconHover={
            <CancellazioneIconHover className="hover-icon icon-width" />
          }
        />
        <ItemIndex
          title="trasformare"
          className="trasformare"
          link="Process/transforming"
          icon={<TrasformareIcon className="basic-icon icon-width" />}
          iconHover={<TrasformareIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="luoghi"
          link="Phenomena/territory/spaceAnalysis"
          className="luoghi"
          icon={<LuoghiIcon className="basic-icon icon-width" />}
          iconHover={<LuoghiIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="realismo"
          className="realismo"
          link="Problem/realism"
          icon={<RealismoIcon className="basic-icon icon-width" />}
          iconHover={<RealismoIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="elenchi"
          link="Phenomena/territory/shapeAnalysis"
          className="elenchi"
          icon={<ElenchiIcon className="basic-icon icon-width" />}
          iconHover={<ElenchiIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="combinare"
          link="Process/combining"
          className="combinare"
          icon={<CombinareIcon className="basic-icon icon-width" />}
          iconHover={<CombinareIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="trama"
          link="Problem/plot"
          className="trama"
          icon={<TramaIcon className="basic-icon icon-width" />}
          iconHover={<TramaIconHover className="hover-icon icon-width" />}
        />
        <div className="spazio">
          <div className="big-name">Spazio</div>
        </div>
        <div className="forma">
          <div className="big-name">Forma</div>
        </div>
        <div className="dubbio">
          <div className="big-name">Dubbio</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
