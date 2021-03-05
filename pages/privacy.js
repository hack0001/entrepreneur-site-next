import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../components/Layouts/Layout";
import Vanilla from "../components/Layouts/vanillaLayout";
import CustomLink from "../components/Link/customLink";
import Context from "../utils/Context";
import { queryHandler, getParams } from "../utils/queryHandler";
import styles from "../styles/privacyStyles.module.sass";

const Privacy = () => {
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
				<title>Privacy Policy</title>
				<link rel="canonical" href={`${process.env.SITE_ADDRESS}/privacy`} />
			</Head>
			<Vanilla>
				<main className={styles.content}>
					<article className={styles.article}>
						<h1 className={styles.mainTitle}>Privacy Policy</h1>
						<div className={styles.mainContent}>
							<p>
								The below is a Privacy Policy we have put together for our
								users. Please read all the information below carefully and
								contact us if you have any questions.
							</p>
							<p>
								At <strong>Derivative Media Ltd</strong> ("us", "we", or "our")
								the privacy of our visitors is extremely important. This Privacy
								Policy outlines the types of personal information that is
								received and collected and how it is used. This Privacy Policy
								is reviewed and revised from time to time. You will want to
								revisit it regularly. Your use of this site, in any and all
								forms, constitutes an acceptance of this Privacy Policy.
							</p>
							<ol className={styles.listStyle}>
								<h2 className={styles.header}>
									1. Information Collection And Use
								</h2>
								While using our Site, we may ask you to provide us with certain
								personally identifiable information that can be used to contact
								or identify you. Personally identifiable information may
								include, but is not limited to your name ("Personal
								Information").
							</ol>
							<ol className={styles.listStyle}>
								<h2 className={styles.header}>2. Log Data</h2>
								<p>
									Like many site operators, we collect information that your
									browser sends whenever you visit our Site ("Log Data"). The
									information in the log data files include:
								</p>
								<ul>
									<li>* Internet Protocol addresses (IP)</li>
									<li>* Types of browser</li>
									<li>* Browser version</li>
									<li>* Internet Service Provider (ISP)</li>
									<li>* Date and time stamp</li>
									<li>* Referring and exit pages</li>
									<li>
										* Number of clicks, time spent on pages and other statistics
									</li>
								</ul>
								<p>
									All of this information is not linked to anything that is
									personally identifiable.
								</p>
								<p>
									In addition, we may use third party services such as Google
									Analytics that collect, monitor and analyze this type of
									information in order to increase our Service’s functionality.
									These third party service providers have their own privacy
									policies addressing how they use such information.
								</p>
							</ol>
							<ol className={styles.listStyle}>
								<h2 className={styles.header}>3. Cookies</h2>
								<p>
									Cookies are files with small amount of data, which may include
									an anonymous unique identifier. Cookies are sent to your
									browser from a web site and stored on your computer's hard
									drive.
								</p>
								<p>
									We use cookies to store information about visitor preferences
									and to record user-specific information on visits and pages
									the user views so as to provide a custom experience. In regard
									to third-party advertisers,&nbsp;
									<strong>Derivative Media Ltd</strong> has no access or control
									over these cookies. You should review the respective privacy
									policies on any and all third-party ad servers for more
									information regarding their practices and how to opt-out.
								</p>
								<p>We use the following type of cookies:</p>
								<ul>
									<li>
										Essential cookies: these cookies are essential to the
										provision of our Website.
									</li>
									<li>
										Functionality cookies: these cookies help us remember
										choices you have made while on our website, remember your
										preferences, and personalize your Website experience.
									</li>
									<li>
										Analytics and performance cookies: these cookies help us
										collect statistical and analytical usage to help up analyze
										website usage.
									</li>
									<li>
										Social media cookies: These cookies allow you to interact
										with content on certain social media platforms, such a
										“liking” our articles. Depending on your social media
										setting, the social media network will have record of this
										and may display your name or identifier in relation to this
										action.
									</li>
									<li>
										Advertising and targeted advertising cookies: these cookies
										track your browsing habits and location to provide you with
										advertising in line with your interests. Please see our
										“advertisers” section below for details.
									</li>
								</ul>
								<p>
									If you wish to disable cookies you may do so through your web
									browser options. Instructions for doing so and for other
									cookie-related management can be found on the specific web
									browsers’ websites.
								</p>
							</ol>
							<ol className={styles.listStyle}>
								<h2 className={styles.header}>4. Third Party Tracking Tools</h2>
								<p>
									We also use third party tracking tools to improve the
									performance and features of our Website. These third party
									tracking tools are designed to collect only Non-Personal
									Information about your use of our Website. However, you
									understand that such tools are created and managed by parties
									outside our control. As such, we are not responsible for what
									information is actually captured by such third parties or how
									such third parties use and protect that information.
								</p>
								<p>
									We use Remarketing with Google Analytics to advertise on third
									party sites to you after you visited our Site. We and our
									third party vendors, like Google, use first party cookies
									(such as the Google Analytics cookie) and third party cookies
									(such as the DoubleClick cookie) to inform, optimize and serve
									ads based on your past visits to our Site.
								</p>
								<p>
									You can opt-out of Google Analytics for Display Advertising
									and customize the Google Display Network ads by visiting the
									Google Ads Settings page. Google also recommends installing
									the Google Analytics Opt-out Browser Add-on for your browser.
									Google Analytics Opt-out Browser Add-on provides visitors with
									the ability to prevent their data from being collected and
									used by Google Analytics.
								</p>
							</ol>
							<ol className={styles.listStyle}>
								<h2 className={styles.header}>5. Security</h2>
								The security of your Personal Information is extremely important
								to us, but remember that no method of transmission over the
								Internet, or method of electronic storage, is 100% secure. While
								we strive to use commercially acceptable means to protect your
								Personal Information, we cannot guarantee its absolute security.
							</ol>
							<ol className={styles.listStyle}>
								<h2 className={styles.header}>6. Links To Other Sites</h2>
								Our Service may contain links to other sites that are not
								operated by us. If you click on a third party link, you will be
								directed to that third party’s site. We strongly advise you to
								review the Privacy Policy of every site you visit. We have no
								control over, and assume no responsibility for the content,
								privacy policies or practices of any third party sites or
								services.
							</ol>
							<ol className={styles.listStyle}>
								<h2 className={styles.header}>7. Links to Other Websites</h2>
								<p>
									Our Website may contain links to other websites that are not
									under our direct control. These websites may have their own
									policies regarding privacy. We have no control of or
									responsibility for linked websites and provide these links
									solely for the convenience and information of our visitors.
									You access such linked Websites at your own risk. These
									websites are not subject to this Privacy Policy. You should
									check the privacy policies, if any, of those individual
									websites to see how the operators of those third-party
									websites will utilize your personal information. In addition,
									these websites may contain a link to Websites of our
									affiliates. The websites of our affiliates are not subject to
									this Privacy Policy, and you should check their individual
									privacy policies to see how the operators of such websites
									will utilize your personal information.
								</p>
								<p>
									We do not support Do Not Track ("DNT"). Do Not Track is a
									preference you can set in your web browser to inform websites
									that you do not want to be tracked. You can enable or disable
									Do Not Track by visiting the Preferences or Settings page of
									your web browser.
								</p>
							</ol>

							<ol className={styles.listStyle}>
								<h2 className={styles.header}>8. Automatic Information</h2>
								<p>
									We automatically receive information from your web browser or
									mobile device. This information includes the name of the
									website from which you entered our Website, if any, as well as
									the name of the website to which you're headed when you leave
									our website. This information also includes the IP address of
									your computer/proxy server that you use to access the
									Internet, your Internet Website provider name, web browser
									type, type of mobile device, and computer operating system. We
									use all of this information to analyze trends among our Users
									to help improve our Website.
								</p>
							</ol>
							<ol className={styles.listStyle}>
								<h2 className={styles.header}>9. Newsletters</h2>
								<p>
									On the Website, you may subscribe to our newsletter, which may
									be used for advertising purposes. All newsletters sent may
									contain tracking pixels. The pixel is embedded in emails and
									allows an analysis of the success of online marketing
									campaigns. Because of these tracking pixels, we may see if and
									when you open an email and which links within the email you
									click. Also, this allows the Website to adapt the content of
									future newsletters to the interests of the user. This behavior
									will not be passed on to third parties.
								</p>
							</ol>
							<ol className={styles.listStyle}>
								<h2 className={styles.header}>10. Children's Information</h2>
								<p>
									The Website does not knowingly collect any personally
									identifiable information from children under the age of 16. If
									a parent or guardian believes that the Website has personally
									identifiable information of a child under the age of 16 in its
									database, please contact us immediately&nbsp;
									<CustomLink
										queryLink={queryCheck}
										pathname="/contact"
										query={query}
									>
										<a className={styles.link}>here</a>
									</CustomLink>{" "}
									and we will use our best efforts to promptly remove such
									information from our records.
								</p>
							</ol>

							<ol className={styles.listStyle}>
								<h2 className={styles.header}>
									11. Changes to this Privacy Policy
								</h2>
								<p>
									This Privacy Policy is effective as of 1st September 2019 and
									will remain in effect except with respect to any changes in
									its provisions in the future, which will be in effect
									immediately after being posted on this page.
								</p>
								<p>
									We reserve the right to update or change our Privacy Policy at
									any time and you should check this Privacy Policy
									periodically. Your continued use of the Service after we post
									any modifications to the Privacy Policy on this page will
									constitute your acknowledgment of the modifications and your
									consent to abide and be bound by the modified Privacy Policy.
								</p>
								<p>
									Though we make every effort to preserve user privacy, we may
									need to disclose personal information when required by law
									wherein we have a good-faith belief that such action is
									necessary to comply with a current judicial proceeding, a
									court order or legal process served on any of our sites.
								</p>
								<p>
									If we make any material changes to this Privacy Policy, we
									will notify you either through the email address you have
									provided us, or by placing a prominent notice on our website.
								</p>
							</ol>
							<ol className={styles.listStyle}>
								<h2 className={styles.header}>12. Contact Us</h2>
								If you have any questions about this Privacy Policy, please
								contact us&nbsp;
								<CustomLink
									queryLink={queryCheck}
									pathname="/contact"
									query={query}
								>
									<a className={styles.link}>here.</a>
								</CustomLink>
							</ol>

							<h4>This policy is in effect as of 1st September 2019</h4>
						</div>
					</article>
				</main>
			</Vanilla>
		</Layout>
	);
};

export default Privacy;
