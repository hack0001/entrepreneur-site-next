import { useContext } from "react";
import PropTypes from "prop-types";
import CustomLink from "@components/Link/customLink";
import { mobileLinks } from "@data/data";
import { objectCheck } from "@utils/queryHandler";
import Context from "@utils/Context";
import MenuItem from "./MenuItem";
import styles from "../styles/menuStyles.module.sass";

const Menu = ({ onClick }) => {
	const { query } = useContext(Context);
	const queryLinkCheck = objectCheck(query);
	const menuItems = mobileLinks.map((val, index) => {
		return (
			<div key={index}>
				<CustomLink
					queryLink={queryLinkCheck}
					pathname={val.href}
					query={query}
					index={index}
				>
					<a className={styles.mobileAnchor}>
						<MenuItem delay={`${index * 0.1}s`} onClick={onClick}>
							{val.label}
						</MenuItem>
					</a>
				</CustomLink>
			</div>
		);
	});

	return (
		<div className={styles.topMenu}>
			<div className={styles.itemWrap}>{menuItems}</div>
		</div>
	);
};
Menu.propTypes = {
	onClick: PropTypes.func,
};
export default Menu;
