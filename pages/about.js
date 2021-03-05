import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../components/Layouts/Layout";
import Vanilla from "../components/Layouts/vanillaLayout";
import CustomLink from "../components/Link/customLink";
import Context from "../utils/Context";
import { queryHandler, getParams } from "../utils/queryHandler";
import styles from "../styles/aboutStyles.module.sass";

const About = () => {
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
				<title>About Us</title>
				<link rel="canonical" href={`${process.env.SITE_ADDRESS}/about`} />
			</Head>
			<Vanilla>
				<main className={styles.content}>
					<article className={styles.article}>
						<h1 className={styles.mainTitle}>About Us</h1>
						<div className={styles.mainContent}>
							<p>
								The idea of wealth can vary from person to person with the most
								common being centered around the acquisition of material items -
								the luxury apartment, the expensive sports car and the
								'influencer' lifestyle.
							</p>
							<p>
								While this can be incidental it is not a result of&nbsp;
								<strong>REAL</strong> wealth.
							</p>
							<p>
								Google broadly defines wealth as "a plentiful supply of a
								particular desirable thing" but this can encompass a number of
								different objectives such as time, good health and the ability
								to make a difference in other people's lives.
							</p>
							<p>
								We believe <strong>REAL</strong> wealth and success to be a
								lifelong endeavour where you continually set new goals and
								targets to improve your life and those around you. It is the
								process of building a legacy that provides a sense of
								accomplishment that can never be taken away from you.
							</p>
							<p>
								It is something that has to be built from humble beginnings and
								has the potential to change other people's lives as well as
								yours.
							</p>
							<p>This quote from Bob Dylan has always resonated with us...</p>

							<div className={styles.quoteContainer}>
								<blockquote className={styles.block}>
									<p>
										A man is a success if he gets up in the morning and gets to
										bed at night, and in between he does what he wants to do.”
									</p>
								</blockquote>
								<cite>
									<span>Bob Dylan</span>
								</cite>
							</div>
							<p>
								Whether it is for our family and friends or for an international
								audience, building a legacy is something we all want to achieve
								in our lifetime.
							</p>
							<p>That's where we come in...</p>
							<p>
								Our mission with this site is to inform, inspire and motivate
								our audience into building a lasting legacy.
							</p>
							<p>
								If you’re just joining us, then follow us on social media to
								keep up to date as we make big changes on a regular basis!
							</p>
							<p>
								We would love to hear from you any suggestions or general
								feedback to improve your experience.
							</p>
							<p>
								To contact us please fill out the form&nbsp;
								<CustomLink
									queryLink={queryCheck}
									pathname="/contact"
									query={query}
								>
									<a className={styles.link}>here.</a>
								</CustomLink>
							</p>
						</div>
					</article>
				</main>
			</Vanilla>
		</Layout>
	);
};
export default About;
