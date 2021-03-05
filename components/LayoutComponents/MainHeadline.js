import PropTypes from "prop-types";
import SectionBar from "./SectionBar";
import CustomLink from "@components/Link/customLink";
import styles from "./styles/mainHeadlineStyles.module.sass";
import CloudImage from "../Image/cloudImage";
import { getImagePath } from "../helper/imageUrlHelper";

const MainHeadline = ({ data, queryLinkCheck, query }) => {
	const headlineData = data[0];
	const subHeadlineData = data.filter((x, index) => index !== 0);
	const {
		id,
		headlineImage,
		headlineImageAlt,
		headlineImagePath,
		headlineImageCrop,
		headlineImageCropInfo,
		headline,
		category,
		urlDescription,
	} = headlineData;
	return (
		<section className={styles.headerSection}>
			<div className={styles.sectionHead}>
				<SectionBar title="Featured" titleColor="#fefefe" titleSize="1.25rem" />
			</div>
			<div className={styles.headlineContainer}>
				<article className={styles.headlineImageContainer}>
					<div className={styles.headlineWrapper}>
						<CustomLink
							pathname={`/[category]/[url]/article/[id]`}
							alias={`/${category}/${urlDescription}/article/${id}`}
							queryLink={queryLinkCheck}
							query={query}
						>
							<a className={styles.headlineImageMainWrapper}>
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
									wrapperClass={"mainWrapper"}
								/>
							</a>
						</CustomLink>
						<CustomLink
							pathname={`/[category]/[url]/article/[id]`}
							alias={`/${category}/${urlDescription}/article/${id}`}
							queryLink={queryLinkCheck}
							query={query}
						>
							<a className={styles.info}>
								<h1 className={styles.infoTitle}>
									<span className={styles.infoLink}>{headline}</span>
								</h1>
							</a>
						</CustomLink>
					</div>
				</article>
				<div className={styles.subHeadlineContainer}>
					{subHeadlineData.map((head, index) => {
						const {
							id,
							headlineImage,
							headlineImageAlt,
							headline,
							headlineImagePath,
							headlineImageCrop,
							headlineImageCropInfo,
							category,
							kicker,
							urlDescription,
						} = head;

						return (
							<article
								className={
									index === 1 ? styles.midSubArticle : styles.subArticle
								}
								key={index}
							>
								<div className={styles.subArticleWrapper}>
									<CustomLink
										pathname={`/[category]/[url]/article/[id]`}
										alias={`/${category}/${urlDescription}/article/${id}`}
										queryLink={queryLinkCheck}
										query={query}
									>
										<a className={styles.subHeadlineAnchor}>
											<div className={styles.subHeadlineImageWrap}>
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
													wrapperClass={"mainSideWrapper"}
												/>
											</div>
											<div className={styles.subTitleContainer}>
												<div className={styles.subTitleWrap}>
													<h3 className={styles.subTitle}>{headline}</h3>
												</div>
												<div className={styles.subCategoryWrapper}>
													<div className={styles.subCategory}>{category}</div>
												</div>
											</div>
										</a>
									</CustomLink>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
};
export default MainHeadline;

MainHeadline.propTypes = {
	data: PropTypes.array,
	loading: PropTypes.Boolean,
};
