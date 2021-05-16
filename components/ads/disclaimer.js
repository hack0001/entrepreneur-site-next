import styles from "./styles/disclaimerStyles.module.sass";
import CustomLink from "@components/Link/customLink";

const Disclaimer = ({ queryLinkCheck, query }) => {
	return (
		<div className={styles.disclaimer} data-nosnippet>
			***Disclosure: This post may contain affiliate links, meaning we recieve a
			commission if you decide to make a purchase via one of our links, at no
			extra cost to you. Please read our full disclosure&nbsp;
			<CustomLink
				queryLink={queryLinkCheck}
				pathname="/disclaimer"
				query={query}
			>
				<a className={styles.link}>here</a>
			</CustomLink>{" "}
			for more info.
		</div>
	);
};

export default Disclaimer;
