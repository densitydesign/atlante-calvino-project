import React from "react"
import IndexMenuHeader from "../../headers/IndexMenuHeader"
import { Link } from "react-router-dom"
import "./IndexMenu.css"
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
    <div className={className + " hoverable-icon"}>
      <Link to={link}>
        {icon}
        {iconHover}
      </Link>
      <span className="title-viz text-capitalize">{title}</span>
      {title !== "territorio" && (
        <Link to={linkApprofondimento}>
          <IconApprofondimento className="mt-1" />
        </Link>
      )}
    </div>
  )
}

export default function IndexMenu() {
  return (
    <div>
      <IndexMenuHeader />
      <div className="position-absolute" style={{ top: 70, left: 100 }}>
        <Bussola />
      </div>
      <div
        className="position-absolute"
        style={{ top: 58, left: 0, right: 0, bottom: 58 }}
      >
        <Orbite />
      </div>
      <div className="IndexMenu position-relative">
        <ItemIndex
          title="territorio"
          link='Phenomena/territory'
          className="territorio"
          icon={<TerritorioIcon className="basic-icon icon-width" />}
          iconHover={<TerritorioIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="dubitare"
          link="Process/doubting"
          linkApprofondimento="Process/doubting/Hesitation/informationSheet"
          className="dubitare"
          icon={<DubbioIcon className="basic-icon icon-width" />}
          iconHover={<DubbioIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="nebbia"
          linkApprofondimento='Phenomena/territory/doubtAnalysis/informationSheet'
          link="Phenomena/territory/doubtAnalysis"
          className="nebbia"
          icon={<NebbiaIcon className="basic-icon icon-width" />}
          iconHover={<NebbiaIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="cancellazione"
          linkApprofondimento='cancellation-sheet'
          link="Problem/cancellation"
          className="cancellazione"
          icon={<CancellazioneIcon className="basic-icon icon-width" />}
          iconHover={
            <CancellazioneIconHover className="hover-icon icon-width" />
          }
        />
        <ItemIndex
          title="trasformare"
          linkApprofondimento="Process/transforming/Transform/informationSheet"
          className="trasformare"
          link="Process/transforming"
          icon={<TrasformareIcon className="basic-icon icon-width" />}
          iconHover={<TrasformareIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="luoghi"
          linkApprofondimento="Phenomena/territory/spaceAnalysis/informationSheet"
          link="Phenomena/territory/spaceAnalysis"
          className="luoghi"
          icon={<LuoghiIcon className="basic-icon icon-width" />}
          iconHover={<LuoghiIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="realismo"
          linkApprofondimento="Process/combining/Combine/informationSheet"
          className="realismo"
          link="Problem/realism"
          icon={<RealismoIcon className="basic-icon icon-width" />}
          iconHover={<RealismoIconHover className="hover-icon icon-width" />}
        />
        <ItemIndex
          title="elenchi"
          linkApprofondimento="Phenomena/territory/shapeAnalysis/informationSheet"
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
