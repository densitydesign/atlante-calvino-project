import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from './PagesNavigation.module.css';

const links = [
  {
    address: "/equipe",
    label: {
      it: "Équipe",
      en: "Équipe",
    },
  },
  {
    address: "/project",
    label: {
      it: "Progetto",
      en: "Project",
    },
  },
  {
    address: "/instructions",
    label: {
      it: "Istruzioni per l'uso",
      en: "Use instructions",
    },
  },
  {
    address: "/",
    label: {
      it: "Capta",
      en: "Capta",
    },
  },
  {
    address: "/publications",
    label: {
      it: "Pubblicazioni",
      en: "Publications",
    },
  }
];

const PagesNavigation = ({style}) => {
  const lang = "it";
  return (
    <div className={['d-flex','justify-content-center'].join(' ')} style={style}>
      {links.map((d) => {
        return <Link key={d.address} className={styles['nav-link']} to={d.address}>{d.label[lang]}</Link>;
      })}
    </div>
  );
};

export default PagesNavigation;
