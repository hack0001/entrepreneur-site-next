import Link from "next/link";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import styles from "./styles/subContentStyles.module.sass";
const SubScrollingContent = ({
	category,
	headline,
	headlineImage,
	headlineImageAlt,
	index,
	srcset,
	contentLink,
}) => {
	return (
		<article className={styles.sideContent} key={index}>
			<Link href={contentLink}>
				<a className={styles.sideHeadlineAnchor}>
					<div className={styles.sideImageWrapper}>
						<LazyLoad once={true}>
							<img
								className={styles.sideImageMain}
								src={headlineImage}
								alt={headlineImageAlt}
								srcSet={srcset ? srcset : []}
								sizes="330px"
							/>
						</LazyLoad>
					</div>
				</a>
			</Link>
			<div className={styles.sideTitleInfo}>
				<div className={styles.sideTitle}>
					<Link href={contentLink}>
						<a className={styles.infoLink}>{headline}</a>
					</Link>
					<div className={styles.sideTitle}>
						<Link href={contentLink}>
							<a className={styles.categoryLink}>{category}</a>
						</Link>
					</div>
				</div>
			</div>
		</article>
	);
};
SubScrollingContent.propTypes = {
	category: PropTypes.String,
	headline: PropTypes.String,
	headlineImage: PropTypes.String,
	headlineImageAlt: PropTypes.String,
	index: PropTypes.int,
	srcset: PropTypes.array,
};
export default SubScrollingContent;
