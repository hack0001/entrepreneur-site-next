import Layout from "../Layouts/Layout";
import { ARTICLE } from "../../graphql/indivArticle";
import { HEADLINES, QUIZ } from "../../graphql/headline";
import ArticleLoading from "../Loading/Layouts/ArticleLoadingLayout";
import PropTypes from "prop-types";
import { theme } from "../../theme/baseCss";
import {
	SideBarContent,
	SideBarSmallContent,
	SectionBar,
	ArticleHead as ArticleContent,
} from "../LayoutComponents";
import FacebookPage from "../SocialMedia/FacebookPage";
import LazyLoad from "react-lazyload";
import styles from "./styles/contentLayout.module.css";

const Article = ({ id, individual, quiz, slide, url }) => {
	return (
		<Layout>
			<main className={styles.articleContainer}>
				<article className={styles.articleSection}>
					<ArticleContent overview={individual} id={id} />
				</article>
				<aside className={styles.sideArticleSection}>
					<div className={styles.sectionPadding}>
						<SectionBar title="Popular" titleColor="#111" titleSize="1.7rem" />
					</div>
					<SideBarContent data={slide.items} type="slideshow" />
					<LazyLoad once={true}>
						<FacebookPage />
					</LazyLoad>
					<div className={styles.sectionPadding}>
						<SectionBar title="Quiz" titleColor="#111" titleSize="1.7rem" />
					</div>
					<SideBarSmallContent data={quiz.items} type="quiz" />
				</aside>
			</main>
		</Layout>
	);
};
Article.propTypes = {
	id: PropTypes.String,
};

export default Article;
