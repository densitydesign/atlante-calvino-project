import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./capta.module.css";

const spazioMovimento = {
  name: "Spazio: luoghi interni, esterni e movimento",
  type: "data",
  license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  licenseAltAttr: "Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
  open: false,
  files: [
    {
      label: "[Atlante Calvino] spazio - spazio realista.csv",
      file: null,
    },
  ],
  jsx: (
    <>
      <p>
        Il dataset rappresenta la presenza o l’assenza di movimento all’interno
        del racconto <i>Paura sul sentiero</i>, pubblicato nel 1946 sulla
        rivista «Darsena nuova» e in seguito nei volumi Ultimo viene il corvo
        (1949) e I racconti (1958).
        <br />
        Le occorrenze sono le parole che appartengano a una sequenza di testo
        dove ci sia la presenza o l’assenza di movimento, essendo identificate
        nel dataset da un numero in caratteri che ne indica la posizione,
        dandogli un ID. Per ogni occorrenza viene individuato il luogo di
        ambientazione (esempio: Colla Bracca, Tumena, foresta). A seconda dei
        casi, le parole sono classificate in base alla loro vicinanza alla
        realtà, o riflessione-contesto, immaginazione (e nel caso di
        quest'ultima, se corrisponde a una visione o a un desiderio), se
        apparteneva a una metafora, o se era un sostantivo concreto o astratto.
      </p>
    </>
  ),
};

export default spazioMovimento;
