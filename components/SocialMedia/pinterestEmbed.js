import styles from "./styles/pinterestEmbed.module.sass";

const PinterestEmbed = ({ pinterestEmbedCode, pinterestPinLink }) => {
	return (
		<div>
			{pinterestEmbedCode && pinterestPinLink && (
				<div>
					<div
						className={styles.pinterestEmbedWrapper}
						dangerouslySetInnerHTML={{ __html: pinterestEmbedCode }}
					/>
				</div>
			)}
		</div>
	);
};
export default PinterestEmbed;
