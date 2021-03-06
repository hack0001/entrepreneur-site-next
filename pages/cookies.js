import { useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../components/Layouts/Layout";
import Vanilla from "../components/Layouts/vanillaLayout";
import Context from "../utils/Context";
import { queryHandler, getParams } from "../utils/queryHandler";
import styles from "../styles/cookieStyles.module.sass";

const Cookies = () => {
	const router = useRouter();
	const { handleState } = useContext(Context);

	useEffect(() => {
		const { urlPath, queryParams } = getParams(
			router.asPath ? router.asPath : "",
		);

		const queryUpdate = queryHandler(queryParams);
		handleState({
			query: queryUpdate,
			currentUrlPath: urlPath,
		});
	}, []);

	return (
		<Layout>
			<Head>
				<title>Cookies</title>
				<link rel="canonical" href={`${process.env.SITE_ADDRESS}/cookies`} />
			</Head>
			<Vanilla>
				<main className={styles.content}>
					<article className={styles.article}>
						<h1 className={styles.mainTitle}>Cookies</h1>
						<div className={styles.mainContent}>
							<p>
								<strong>Derivative Media Ltd</strong> ("us","we",or "our") uses
								cookies on our websites (the "Service"). By using the Service,
								you consent to use of cookies.
							</p>
							<p>
								Our Cookies Policy explains what cookies are, how we use
								cookies, how third-parties we may partner with may use cookies
								on the Service, your choices regarding cookies and further
								information about cookies.
							</p>
							<h2>What are cookies&#63;</h2>
							<p>
								Cookies are small pieces of text sent by your web browser by a
								website you visit. A cookie file is stored in your web browser
								and allows the Service or a third-party to recognize you and
								make your next visit easier and the Service more useful to you.
							</p>
							<p>Cookies can be "persistent" or "session" cookies.</p>
							<h2>
								How <strong>Derivative Media Ltd</strong> uses cookies
							</h2>
							<p>
								When you use and access the Service, we may place a number of
								cookies files in your web browser.
							</p>
							<p>
								We use cookies for the following purposes: to enable certain
								functions of the Service, to provide analytics, to store your
								preferences, to enable advertisements delivery, including
								behavioral advertising.
							</p>
							<p>
								We use both session and persistent cookies on the Service and we
								use different types of cookies to run the Service:
							</p>
							<p>
								- Essential cookies. We may use essential cookies to
								authenticate users and prevent fraudulent use of user accounts.
							</p>
							<h2>Third-party cookies</h2>
							<p>
								In addition to our own cookies, we may also use various
								third-parties cookies to report usage statistics of the Service,
								deliver advertisements on and through the Service, and so on.
							</p>
							<h2>What are your choices regarding cookies&#63;</h2>
							<p>
								If you'd like to delete cookies or instruct your web browser to
								delete or refuse cookies, please visit the help pages of your
								web browser.
							</p>
							<p>
								Please note, however, that if you delete cookies or refuse to
								accept them, you might not be able to use all of the features we
								offer, you may not be able to store your preferences, and some
								of our pages might not display properly.
							</p>
							<h2>Where can your find more information about cookies&#63;</h2>
							<p>
								You can learn more about cookies and the following third-party
								websites:
							</p>
							<ul>
								<li>
									AllAboutCookies:&nbsp;
									<br />
									<strong>
										<a
											href="http://www.allaboutcookies.org/"
											target="_blank"
											rel="noopener noreferrer"
											className={styles.cookieLink}
										>
											http://www.allaboutcookies.org/
										</a>
									</strong>
								</li>
								<br />
								<li>
									Network Advertising Initiative:&nbsp;
									<br />
									<strong>
										<a
											href="https://www.networkadvertising.org/"
											target="_blank"
											rel="noopener noreferrer"
											className={styles.cookieLink}
										>
											https://www.networkadvertising.org/
										</a>
									</strong>
								</li>
							</ul>
						</div>
					</article>
				</main>
			</Vanilla>
		</Layout>
	);
};

export default Cookies;
