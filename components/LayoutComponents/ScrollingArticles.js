import PropTypes from "prop-types";
import CustomLink from "@components/Link/customLink";
import CloudImage from "../Image/cloudImage";
import { getImagePath } from "../helper/imageUrlHelper";
import styles from "./styles/scrollingArticleStyles.module.sass";
const ScrollingArticles = ({ data, queryLinkCheck, query }) => {
	return data.map((article, index) => {
		const {
			id,
			headlineImage,
			headlineImageAlt,
			headlineImagePath,
			headlineImageCrop,
			headlineImageCropInfo,
			headline,
			category,
			kicker,
			urlDescription,
		} = article;

		return (
			<article className={styles.headerSection} key={index}>
				<CustomLink
					pathname={`/[category]/[url]/article/[id]`}
					alias={`/${category}/${urlDescription}/article/${id}`}
					queryLink={queryLinkCheck}
					query={query}
				>
					<a className={styles.scrollImageAnchor}>
						<div className={styles.scrollImageWrapper}>
							<div className={styles.scrollImageMain}>
								<CloudImage
									imagePath={
										headlineImagePath
											? headlineImagePath
											: getImagePath(headlineImage)
									}
									imageAlt={headlineImageAlt}
									imageCrop={headlineImageCrop}
									imageCropInfo={headlineImageCropInfo}
									unsized={true}
									wrapperClass={"cloudWrapper"}
									fixedHeight={441}
									fixedWidth={750}
								/>
							</div>
							<div className={styles.scrollTitleContainer}>
								<div className={styles.scrollTitlePad}>
									<div className={styles.scrollCategoryWrapper}>
										<div className={styles.scrollCategory}>{category}</div>
									</div>
									<div className={styles.scrollTitleWrap}>
										<h3 className={styles.scrollTitle}>{headline}</h3>
									</div>
									<div className={styles.scrollKickerWrapper}>
										<p className={styles.scrollKicker}>{kicker}</p>
									</div>
								</div>
							</div>
						</div>
					</a>
				</CustomLink>
			</article>
		);
	});
};
export default ScrollingArticles;

ScrollingArticles.propTypes = {
	data: PropTypes.array,
	loading: PropTypes.Boolean,
};
