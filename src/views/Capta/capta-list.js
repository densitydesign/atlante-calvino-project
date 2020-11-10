import React from "react";

const corpus = {
    name: "Corpus",
    type: "data",
    license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
    licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    open:true,
    file:"",
    jsx: (
        <h2>Corpus</h2>
    )
}

const saggi = {
    name: "Saggi: L’arcipelago dei nomi",
    type: "data",
    license: "https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png",
    licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    open:false,
    file:"",
    jsx: (
        <h2>Saggi: L’arcipelago dei nomi</h2>
    )
}

const dubbioNebbia = {
    name: "Dubbio: la nebbia, la cancellazione",
    open:false,
    file:"",
    jsx: (
        <h2>Dubbio: la nebbia, la cancellazione</h2>
    )
}

const dubbioProcesso = {
    name: "Dubbio: il processo dubitativo",
    open:false,
    file:"",
    jsx: (
        <h2>Dubbio: il processo dubitativo</h2>
    )
}

const spazioLuoghi = {
    name: "Spazio: i luoghi dell’opera",
    open:false,
    file:"",
    jsx: (
        <h2>Spazio: i luoghi dell’opera</h2>
    )
}

const spazioRealismo = {
    name: "Spazio: spazio realista nell’opera",
    open:false,
    file:"",
    jsx: (
        <h2>Spazio: spazio realista nell’opera</h2>
    )
}

const spazioMovimento = {
    name: "Spazio: luoghi interno ed esterni",
    open:false,
    file:"",
    jsx: (
        <h2>Spazio: luoghi interno ed esterni</h2>
    )
}

const formaElenchi = {
    name: "Forma: Presenza e tipologia di elenchi",
    open:false,
    file:"",
    jsx: (
        <h2>Forma: Presenza e tipologia di elenchi</h2>
    )
}

const formaCategorizzazioneElenchi = {
    name: "Forma: Categorizzazione degli elenchi",
    open:false,
    file:"",
    jsx: (
        <h2>Forma: Categorizzazione degli elenchi</h2>
    )
}

const explorer = {
    name: "Explorer",
    type: "tool",
    open:true,
    file:"",
    jsx: (
        <h2>Explorer</h2>
    )
}

const wanderer = {
    name: "Wanderer",
    type: "tool",
    open:true,
    file:"",
    jsx: (
        <h2>Wanderer</h2>
    )
}

const capta = [ corpus, saggi, dubbioNebbia, dubbioProcesso, spazioLuoghi, spazioRealismo, spazioMovimento, formaElenchi, formaCategorizzazioneElenchi, explorer, wanderer ]
export default capta