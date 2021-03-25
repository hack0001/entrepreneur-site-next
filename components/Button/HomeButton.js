import { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./styles/homeButtonStyles.module.sass";
import StaticImage from "@Image/staticImage";
import CustomLink from "@components/Link/customLink";
import Context from "@utils/Context";
import { objectCheck } from "@utils/queryHandler";

const SlideLinkButton = ({ label, href }) => {
	const { query } = useContext(Context);
	const queryLinkCheck = objectCheck(query);
	return (
		<div className={styles.linkSection}>
			<div className={styles.linkButton}>
				<CustomLink pathname={href} queryLink={queryLinkCheck} query={query}>
					<a className={styles.quickViewLink}>
						<div className={styles.label}>
							<div className={styles.linkLabel}>{label}</div>
						</div>
						<div className={styles.arrowWrapper}>
							<StaticImage
								styleClass={styles.arrow}
								src={"/static/newFatArrowRightWhitex128.png"}
								alt="right-arrow"
								height="58px"
								width="58px"
							/>
						</div>
					</a>
				</CustomLink>
			</div>
		</div>
	);
};

SlideLinkButton.defaultProps = {
	href: "/",
};
SlideLinkButton.propTypes = {
	href: PropTypes.String,
	label: PropTypes.String,
	imgSrc: PropTypes.String,
};

export default SlideLinkButton;
