import { useState, useEffect, useContext } from "react";
import Ripples from "../Button/Ripples";
import Cookie from "js-cookie";
import styles from "./styles/cookieBannerStyles.module.sass";
import baseTheme from "../../theme/baseTheme.json";
import Context from "@utils/Context";
import { objectCheck } from "@utils/queryHandler";
import CustomLink from "@components/Link/customLink";
const cookieTime = 60;

const CookieBanner = () => {
	const [cookie, setCookie] = useState(true);
	const { query } = useContext(Context);
	const queryLinkCheck = objectCheck(query);

	useEffect(() => {
		const cookieMarker = Cookie.get("cookie-accept")
			? JSON.parse(Cookie.get("cookie-accept"))
			: true;
		setCookie(cookieMarker);
	}, []);

	const changeCookie = () => {
		//set expiry to 10 minutes:- new Date(new Date().getTime() + 10 * 60 * 1000)
		const expiryDate = new Date(new Date().getTime() + cookieTime * 60 * 1000);

		Cookie.set("cookie-accept", JSON.stringify(false), {
			expires: expiryDate,
		});
		setCookie(false);
	};

	return (
		<>
			{cookie && (
				<div className={styles.alertBox}>
					<div className={styles.alertBoxWrapper}>
						<p className={styles.bannerContent}>
							We use cookies to ensure you get the best experience possible.
							Carry on browsing if you're okay with this, or find out how to
							manage cookies in our Cookie Settings. In addition, by navigating
							on this website you acknowledge that Cookies may be used to serve
							you personalized ads throughout your online experience. To learn
							more or disable this service please consult our{" "}
							<CustomLink
								pathname={"/cookies"}
								queryLink={queryLinkCheck}
								query={query}
							>
								<a className={styles.link} target="_blank">
									Cookie Policy.
								</a>
							</CustomLink>
						</p>
						<div className={styles.cookieWrapper}>
							<Ripples color={baseTheme.rippleColor}>
								<button className={styles.cookieButton} onClick={changeCookie}>
									Accept
								</button>
							</Ripples>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default CookieBanner;
