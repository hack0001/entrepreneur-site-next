import styles from "./styles/progressBar.module.sass";

const ProgressBar = ({ total, position }) => {
	const currentPercentage = Math.round(
		(Number(position) / Number(total)) * 100,
	);
	return (
		<div className={styles.progress}>
			<div className={`${styles.bar} bar-width`}>{currentPercentage}%</div>
			<style jsx>{`
				.bar-width {
					width: ${currentPercentage}%;
				}
			`}</style>
		</div>
	);
};

export default ProgressBar;
