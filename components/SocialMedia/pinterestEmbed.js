import styles from "./styles/pinterestEmbed.module.sass";

const PinterestEmbed = ({ pinterestEmbedCode, pinterestPinLink }) => {
	return (
		<>
			{pinterestEmbedCode && pinterestPinLink && (
				<div
					className={styles.pinterestEmbedWrapper}
					dangerouslySetInnerHTML={{ __html: pinterestEmbedCode }}
				/>
			)}
		</>
	);
};
export default PinterestEmbed;
