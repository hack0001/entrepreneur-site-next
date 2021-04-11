import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import router from "next/router";
import { ADVERT_ARTICLE } from "../../../../../graphql/indivArticle";
import { midSocialButtons } from "../../../../SocialMedia/data";
import ShareButtonHoriz from "../../../../SocialMedia/ShareButtonsHoriz";
import prodRequest from "../../../../apiRequest/prodRequest";
import SectionBar from "../../../SectionBar";
import styles from "../styles/ads/linkAdStyles.module.sass";

const SiteAd = ({ children }) => {
	const [shareInfo, setShareInfo] = useState({
		url: "",
		image: "",
		headline: "",
		brief: "",
		pinterestLink: "",
	});
	useEffect(() => {
		const { id } = router.router.query;
		getData(id);
	}, []);

	const getData = async postId => {
		try {
			const queryData = {
				query: ADVERT_ARTICLE,
				variables: { id: postId },
			};
			const { data } = await prodRequest(queryData);
			const overview = JSON.parse(data.getProductionArticle.overview);
			const {
				brief,
				headlineImage,
				headline,
				urlDescription,
				category,
				pinterestLink,
			} = overview[0];
			const { id } = data.getProductionArticle;

			setShareInfo({
				url: `${process.env.SITE_ADDRESS}/${category}/${urlDescription}/article/${id}`,
				image: headlineImage,
				headline: headline,
				brief: brief,
				pinterestLink,
			});
		} catch (err) {
			console.log("Error with request", err);
		}
	};
	return (
		<div className={styles.siteAd}>
			<SectionBar title={"Share"} titleColor="#111" titleSize="1rem" />
			<ShareButtonHoriz
				data={midSocialButtons}
				url={shareInfo.url}
				image={shareInfo.image}
				headline={shareInfo.headline}
				brief={shareInfo.brief}
				position={"middle_sitead_share_horiz"}
				pinterestLink={shareInfo.pinterestLink}
				numberButtons={3}
			/>
			{children}
		</div>
	);
};

SiteAd.propTypes = {
	children: PropTypes.func,
	attributes: PropTypes.object,
};
export default SiteAd;
