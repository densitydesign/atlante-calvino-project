import { style } from "d3";
import React from "react";
import Footer from "../../headers/Footer/Footer";
import styles from "./LoadingWrapper.module.css";

const LoadingWrapper = ({...props}) => {
  return (
		<div className={styles.main}>
			<div className={styles.bgAnimated} />
			<div className={styles.header}>
				<div/>
			</div>
			<span className={styles.loadingMessage}>Loading...</span>
			<Footer/>
		</div>
	);
};

export default LoadingWrapper;