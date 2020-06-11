import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";

//data management
import keyBy from "lodash/keyBy";
import sortBy from "lodash/sortBy";

//data helpers
import { MOTIVO_LINE_HEIGHT } from "./utils";

//local components
import LineeTrama from "./LineeTrama";
import BoxPlot from "./BoxPlot";
import TramaDetail from "./TramaDetail";
import SideBar from "./SideBar";

// main component
export default function Trama2Content({
  scalaMotivoY,
  tipologie,
  tipologieByTipologia,
  colors,
  racconti,
  byRacconto,
  selected,
  toggleSelect,
  setSelected,
}) {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const toggleSidePanel = useCallback(() => {
    setSidePanelOpen(!sidePanelOpen);
  }, [sidePanelOpen]);

  //lines selection
  // const [selected, setSelected] = useState({})
  // const toggleSelect = useCallback((titolo) => {
  //   setSelected((selected) => ({ ...selected, [titolo]: !!!selected[titolo] }))
  // }, [])

  //bounds selection
  const [bounds, setBounds] = useState([]);
  const addBound = useCallback(
    (item) => () => {
      if (bounds.length === 1 && bounds[0] === item) {
        setBounds([]);
        return;
      }
      if (bounds.length < 2) {
        setBounds(bounds.concat([item]));
      } else {
        setBounds([item]);
      }
    },
    [bounds]
  );

  //actual dataset
  // const raccontiFiltered = useMemo(() => {
  //   if (bounds.length === 2) {
  //     const orderedBounds = sortBy(
  //       bounds,
  //       (bound) => tipologieByTipologia[bound]["ordine tipologia"]
  //     );
  //     return racconti.filter(
  //       (racconto) =>
  //         racconto.minDatum.motivo_type === orderedBounds[0] &&
  //         racconto.maxDatum.motivo_type === orderedBounds[1]
  //     );
  //   }

  //   return racconti;
  // }, [bounds, racconti, tipologieByTipologia]);

  useEffect(() => {
    if (bounds.length === 2) {
      const orderedBounds = sortBy(
        bounds,
        (bound) => tipologieByTipologia[bound]["ordine tipologia"]
      );

      const indexes = racconti
        .map((racconto, index) => [
          racconto.titolo,
          racconto.minDatum.motivo_type,
          racconto.maxDatum.motivo_type,
        ])
        .filter((x) => x[1] === orderedBounds[0] && x[2] === orderedBounds[1])
        .map((x) => x[0]);

      const sel = keyBy(indexes);
      setSelected(sel, true);
    }
  }, [bounds, racconti, setSelected, tipologieByTipologia]);

  useEffect(() => {
    if (Object.keys(selected).some(key => selected[key].fromBounds === false)) {
      setBounds([])
    }
  }, [selected])

  const listRef = useRef();
  const [currentView, setCurrentView] = useState("list");
  const [currentTramaDetail, setCurrentTramaDetail] = useState(null);

  const handleClickRacconto = useCallback((data) => {
    setCurrentTramaDetail(data);
    setCurrentView("detail");
  }, []);

  const [years, setYears] = useState([
    racconti[0].anno,
    racconti[racconti.length - 1].anno,
  ]);

  const detailHeight = 14 * tipologie.length + 80;

  return (
    <div className="trama2-container">
      <div className={`trama2-side-panel ${sidePanelOpen ? "open" : "closed"}`}>
        <div className="trama2-side-panel-content">
          <SideBar
            tipologie={tipologie}
            bounds={bounds}
            addBound={addBound}
            setBounds={setBounds}
          ></SideBar>
        </div>

        <div
          className="trama2-side-panel-toggle "
          onClick={toggleSidePanel}
        ></div>

        {currentView !== "detail" && (
          <div
            className="trama2-side-panel-rotate"
            onClick={() => {
              if (currentView === "list") {
                listRef.current.rotateView(() => {
                  setCurrentView("boxplot");
                });
              } else {
                setCurrentView("list");
              }
            }}
          >
          Routa la vista
          </div>
        )}
      </div>
      <div className="trama2-content-wrapper">
        {currentView === "list" && (
          <>
            <div
              style={{
                position: "absolute",
                top: 80 + MOTIVO_LINE_HEIGHT,
                borderTop: "solid #bbb 1px",
              }}
            >
              {years[0]}
            </div>
            <div
              style={{
                position: "absolute",
                bottom: MOTIVO_LINE_HEIGHT,
                borderBottom: "solid #bbb 1px",
              }}
            >
              {years[1]}
            </div>
          </>
        )}

        <div
          className="trama2-content"
          style={{ display: currentView !== "list" ? "none" : undefined }}
        >
          <LineeTrama
            onRaccontoClick={handleClickRacconto}
            ref={listRef}
            selected={selected}
            toggleSelect={toggleSelect}
            racconti={racconti}
            tipologie={tipologie}
            tipologieByTipologia={tipologieByTipologia}
            data={byRacconto}
            height={MOTIVO_LINE_HEIGHT}
            scalaMotivoY={scalaMotivoY}
            colors={colors}
            setYears={setYears}
          ></LineeTrama>
        </div>

        {currentView === "boxplot" && (
          <div className="trama2-content">
            <BoxPlot
              onRaccontoClick={handleClickRacconto}
              ref={listRef}
              selected={selected}
              toggleSelect={toggleSelect}
              racconti={racconti}
              tipologie={tipologie}
              tipologieByTipologia={tipologieByTipologia}
              data={byRacconto}
              height={MOTIVO_LINE_HEIGHT}
              scalaMotivoY={scalaMotivoY}
              colors={colors}
            ></BoxPlot>
          </div>
        )}
        {currentView === "detail" && (
          <TramaDetail
            tipologieByTipologia={tipologieByTipologia}
            detailHeight={detailHeight}
            data={currentTramaDetail}
            onBack={() => {
              setCurrentTramaDetail(null);
              setCurrentView("list");
            }}
          />
        )}
      </div>
    </div>
  );
}
