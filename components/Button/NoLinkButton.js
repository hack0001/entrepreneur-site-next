import PropTypes from "prop-types";
import styles from "./styles/quickViewButtonStyles.module.sass";

const QuickViewButton = ({ label, handler, optionalTitle }) => {
	return (
		<div className={styles.linkSection}>
			<button className={styles.noLinkButton} onClick={handler}>
				<div className={styles.noLinkButton}>
					<div className={styles.labelWrapper}>
						<div className={styles.label}>
							<div className={styles.linkLabel}>{label}</div>
						</div>
						{optionalTitle && (
							<div className={styles.label}>
								<div className={styles.optionTitle}>{optionalTitle}</div>
							</div>
						)}
					</div>
				</div>
			</button>
		</div>
	);
};

QuickViewButton.defaultProps = {
	handler: () => {},
	optionalTitle: false,
};
QuickViewButton.propTypes = {
	href: PropTypes.String,
	label: PropTypes.String,
	imgSrc: PropTypes.String,
	imageAlt: PropTypes.String,
	handler: PropTypes.Func,
	imagePath: PropTypes.Array,
};

export default QuickViewButton;
