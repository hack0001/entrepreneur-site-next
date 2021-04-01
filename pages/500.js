import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "@components/Layouts/Layout";
import CustomLink from "@components/Link/customLink";
import Context from "@utils/Context";
import { queryHandler, getParams } from "@utils/queryHandler";
import styles from "../styles/404Styles.module.sass";

const DefaultError = () => {
	const router = useRouter();
	const { handleState, query } = useContext(Context);
	const [queryCheck, setQueryCheck] = useState(false);

	useEffect(() => {
		const { urlPath, queryParams } = getParams(
			router.asPath ? router.asPath : "",
		);
		const queryUpdate = queryHandler(queryParams);
		handleState({
			query: queryUpdate,
			currentUrlPath: urlPath,
		});
		if (Object.keys(queryParams).length > 0) {
			setQueryCheck(true);
		}
	}, []);

	return (
		<Layout>
			<Head>
				<title>500 Error</title>
			</Head>
			<main className={styles.content}>
				<section className={styles.errorSection}>
					<h1 className={styles.mainTitle}>500 Error</h1>
					<h3 className={styles.mainContent}> Internal Server Error</h3>
					<div className={styles.mainContent}>
						<p>There is a problem with the server at this moment.</p>
						<p>
							Please bear with us as we are trying to fix it as soon as
							possible.
						</p>
						<p>
							Click&nbsp;
							<CustomLink queryLink={queryCheck} pathname="/" query={query}>
								<a className={styles.link}>here</a>
							</CustomLink>
							&nbsp;to try again or please come back later.
						</p>
					</div>
				</section>
			</main>
		</Layout>
	);
};

export default DefaultError;
