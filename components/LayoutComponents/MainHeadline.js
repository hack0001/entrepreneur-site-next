import PropTypes from "prop-types";
import Link from "next/link";
import SectionBar from "./SectionBar";
import styles from "./styles/mainHeadlineStyles.module.sass";
import LazyLoad from "react-lazyload";
import CloudImage from "../Image/cloudImage";
import { getImagePath } from "../helper/imageUrlHelper";
const MainHeadline = ({ data }) => {
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
						<Link
							href={`/[category]/[url]/article/[id]`}
							as={`/${category}/${urlDescription}/article/${id}`}
						>
							<a className={styles.headlineImageMainWrapper}>
								<LazyLoad once={true}>
									<div className={styles.headlineImageMain}>
										<CloudImage
											imagePath={
												headlineImagePath
													? headlineImagePath
													: getImagePath(headlineImage)
											}
											imageAlt={headlineImageAlt}
											layout="headline"
											imageCrop={headlineImageCrop}
											imageCropInfo={headlineImageCropInfo}
										/>
									</div>
								</LazyLoad>
							</a>
						</Link>
						<Link
							href={`/[category]/[url]/article/[id]`}
							as={`/${category}/${urlDescription}/article/${id}`}
						>
							<a className={styles.info}>
								<h1 className={styles.infoTitle}>
									<span className={styles.infoLink}>{headline}</span>
								</h1>
							</a>
						</Link>
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
									<Link
										href={`/[category]/[url]/article/[id]`}
										as={`/${category}/${urlDescription}/article/${id}`}
									>
										<a className={styles.subHeadlineAnchor}>
											<div className={styles.subHeadlineImageWrap}>
												<LazyLoad once={true}>
													<div className={styles.subHeadlineImage}>
														<CloudImage
															imagePath={
																headlineImagePath
																	? headlineImagePath
																	: getImagePath(headlineImage)
															}
															imageAlt={headlineImageAlt}
															layout={"subHeadline"}
															imageCrop={headlineImageCrop}
															imageCropInfo={headlineImageCropInfo}
														/>
													</div>
												</LazyLoad>
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
									</Link>
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
