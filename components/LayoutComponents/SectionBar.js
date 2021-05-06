import PropTypes from "prop-types";
import styles from "./styles/sectionBarStyles.module.sass";
const SectionBar = ({ title, titleColor, titleSize, custom }) => {
	return (
		<div>
			<div
				className={
					custom ? styles.customFeaturedContent : styles.featuredContent
				}
			>
				<div
					className={`${
						custom ? styles.customSectionTitle : styles.sectionTitle
					} section-title`}
				>
					<span>{title}</span>
				</div>
			</div>

			<style jsx>
				{`
					.section-title {
						color: ${titleColor};
						font-size: ${titleSize};
					}
				`}
			</style>
		</div>
	);
};
export default SectionBar;

SectionBar.defaultProps = {
	custom: false,
};
SectionBar.propTypes = {
	title: PropTypes.String,
	titleColor: PropTypes.String,
	titleSize: PropTypes.String,
};
