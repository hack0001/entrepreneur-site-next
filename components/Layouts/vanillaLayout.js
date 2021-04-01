import PropTypes from "prop-types";
import styles from "./styles/contentLayout.module.sass";
const Vanilla = props => {
	const { children } = props;

	return (
		<>
			<div className={styles.pageLayout}>{children}</div>
		</>
	);
};

Vanilla.propTypes = {
	children: PropTypes.Func,
};

export default Vanilla;
