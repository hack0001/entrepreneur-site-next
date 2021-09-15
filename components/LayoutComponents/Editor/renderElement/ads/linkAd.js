import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import router from "next/router";
import NextLink from "./nextLink";
import prodGetRequest from "@components/apiRequest/prodGetRequest";
import styles from "../styles/ads/linkAdStyles.module.sass";

const NextArticleAd = ({ children }) => {
	const [nextInfo, setNextInfo] = useState({
		showNext: false,
		url: "",
		image: "",
		imageAlt: "",
		imagePath: "",
		headline: "",
		brief: "",
		category: "",
	});
	useEffect(() => {
		const { id } = router.router.query;
		getData(id);
	}, []);

	const getData = async postId => {
		try {
			const { data } = await prodGetRequest(`/list/next_indiv_article`);
			const selectedArticle = data.listProductionArticles.items.filter(
				x => x.id !== postId,
			);

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
			} = selectedArticle[0];
			setNextInfo({
				showNext: true,
				url: `/${category}/${urlDescription}/article/${id}`,
				refPath: `/[category]/[url]/article/[id]`,
				image: headlineImage,
				imageAlt: headlineImageAlt,
				imagePath: headlineImagePath,
				imageCrop: headlineImageCrop,
				imageCropInfo: headlineImageCropInfo,
				headline: headline,
				brief: kicker,
				category: category,
			});
		} catch (err) {
			console.log("Error with request", err);
		}
	};
	return (
		<div className={styles.siteAd}>
			{nextInfo.showNext && (
				<NextLink
					data={nextInfo}
					type={"article"}
					// url={nextInfo.url}
					// refPath={nextInfo.refPath}
					// image={nextInfo.image}
					// headline={nextInfo.headline}
					// brief={nextInfo.brief}
					// imageAlt={nextInfo.imageAlt}
				/>
			)}
			{children}
		</div>
	);
};

NextArticleAd.propTypes = {
	children: PropTypes.func,
	attributes: PropTypes.object,
};
export default NextArticleAd;
