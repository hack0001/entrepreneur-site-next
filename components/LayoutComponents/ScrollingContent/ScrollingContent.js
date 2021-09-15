import { useEffect, useState, useContext } from "react";
import ScrollingArticlesLoading from "../../Loading/ScrollingArticlesLoading";
import PropTypes from "prop-types";
import SubScrollingContent from "./SubContent";
import SectionBar from "../SectionBar";
import sideHelper from "../../helper/sideBarHelper";
import querySelect from "./utils/querySelect";
import prodGetRequest from "@components/apiRequest/prodGetRequest";
import { filterUnique } from "@utils/handler";
import Context from "@utils/Context";
import styles from "./styles/scrollingContentStyles.module.sass";

const ScrollingContent = ({ id, title, type, limitSize = 100 }) => {
	const [endpoint, queryString] = querySelect(type);

	const [content, setContent] = useState([]);
	const [nextToken, setNextToken] = useState("");
	const { query } = useContext(Context);
	let throttle = null;

	useEffect(() => {
		getContent();
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleInfiniteScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleInfiniteScroll);
		};
	}, [nextToken]);

	const getQueryData = async endpoint => {
		if (limitSize > content.length) {
			try {
				const { data } = await prodGetRequest(endpoint);
				const uniqueContent = filterUnique(data[queryString].items, content);
				const scrollingContent = content.concat(uniqueContent);
				setContent(scrollingContent);
				setNextToken(data[queryString].nextToken);
			} catch (err) {
				console.log("Error with requests", err);
				setNextToken(false);
			}
		}
	};

	const getContent = () => {
		getQueryData(endpoint);
	};

	const handleInfiniteScroll = () => {
		if (throttle === null) {
			throttle = setTimeout(() => {
				const rootNode = document.documentElement;
				const body = document.body;
				const top = "scrollTop";
				const height = "scrollHeight";
				const percentage =
					((rootNode[top] || body[top]) /
						((rootNode[height] || body[height]) - rootNode.clientHeight)) *
					100;

				if (percentage > 85) {
					if (nextToken) {
						getQueryData(`${endpoint}/${nextToken}`);
					}
				}

				throttle = null;
			}, 500);
		}
	};

	if (!content || content.length < 1)
		return <ScrollingArticlesLoading height="200px" />;
	return (
		<div className={styles.scrollingWrapper}>
			<div className={styles.sectionWrapper}>
				<SectionBar title={title} titleColor="#111" titleSize="1rem" />
			</div>

			{content.map((content, index) => {
				if (content.id === id) return null;
				const {
					headlineImage,
					headlineImageAlt,
					headline,
					category,
					refPath,
					contentLink,
					headlineImagePath,
					headlineImageCrop,
					headlineImageCropInfo,
					kicker,
				} = sideHelper(content, type);

				// if (index % 4 === 0) {
				// 	return (
				// 		<MainScrollingContent
				// 			category={category}
				// 			headline={headline}
				// 			headlineImage={headlineImage}
				// 			headlineImagePath={headlineImagePath}
				// 			headlineImageAlt={headlineImageAlt}
				// 			headlineImageCrop={headlineImageCrop}
				// 			headlineImageCropInfo={headlineImageCropInfo}
				// 			index={index}
				// 			key={index}
				// 			contentLink={contentLink}
				// 			refPath={refPath}
				// 			queryLinkCheck={queryLinkCheck}
				// 			query={query}
				// 		/>
				// 	);
				// }
				return (
					<SubScrollingContent
						category={category}
						headline={headline}
						headlineImage={headlineImage}
						headlineImageAlt={headlineImageAlt}
						headlineImagePath={headlineImagePath}
						headlineImageCrop={headlineImageCrop}
						headlineImageCropInfo={headlineImageCropInfo}
						index={index}
						key={index}
						contentLink={contentLink}
						refPath={refPath}
						kicker={kicker}
						queryLinkCheck={true}
						query={{ ...query, utm_medium: `scrollingcontent-${type}` }}
					/>
				);
			})}
		</div>
	);
};

ScrollingContent.propTypes = {
	QUERY: PropTypes.String,
	filter: PropTypes.Object,
	limit: PropTypes.Int,
	title: PropTypes.String,
	id: PropTypes.String,
	type: PropTypes.String,
};

ScrollingContent.defaultProps = {
	title: "Latest",
	type: "article",
};
export default ScrollingContent;
