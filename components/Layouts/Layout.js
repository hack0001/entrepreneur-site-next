import { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Menu from "../Header/Menu/Menu";
import CookieBanner from "../cookies/cookieBanner";
import DefaultHeader from "../Header/Head";
import PropTypes from "prop-types";
import styles from "./styles/layoutStyles.module.sass";
import baseTheme from "../../theme/baseTheme.json";

const Layout = props => {
	const { background, children } = props;
	const [menuOpen, setMenuOpen] = useState(false);

	const clickMenu = e => {
		setMenuOpen(!menuOpen);
	};

	return (
		<div
			className={styles.topLayout}
			style={{ backgroundColor: background ? "#111" : "white" }}
		>
			<DefaultHeader />
			<Header menuOpen={menuOpen} onClick={e => clickMenu()} />
			{menuOpen && <Menu onClick={e => clickMenu()} />}
			<div className={styles.pageLayout}>{children}</div>
			<CookieBanner />
			<Footer />
			<style jsx>{`
				:global(body) {
					margin: 0px;
					font-family: ${baseTheme.font};
				}
			`}</style>
		</div>
	);
};

Layout.propTypes = {
	background: PropTypes.Object,
	children: PropTypes.Object,
};

export default Layout;
