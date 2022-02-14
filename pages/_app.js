import App from "next/app";
import UserContext from "../utils/Context";
import TagManager from "react-gtm-module";
import dynamic from "next/dynamic";
import Script from "next/script";

const SignUp = dynamic(() => import("../components/SignUpModal/signUpModal"), {
	ssr: false,
});
const tagManagerArgs = {
	gtmId: `${process.env.REACT_APP_GOOGLE_TAG_ID}`,
};
class OverviewApp extends App {
	state = {
		sessionSlideIds: [],
		sessionQuizIds: [],
		sessionArticleIds: [],
		query: {},
		currentUrlPath: "/",
	};

	componentDidMount() {
		TagManager.initialize(tagManagerArgs);
	}

	handleState = value => {
		this.setState({
			...this.state,
			...value,
		});
	};

	render() {
		const { Component, pageProps } = this.props;
		return (
			<UserContext.Provider
				value={{
					handleState: this.handleState,
					sessionSlideIds: this.state.sessionSlideIds,
					sessionQuizIds: this.state.sessionQuizIds,
					sessionArticleIds: this.state.sessionArticleIds,
					query: this.state.query,
					currentUrlPath: this.state.currentUrlPath,
				}}
			>
				<Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
				<Script id="google-adsense-script">
					{`
						(window.adsbygoogle = window.adsbygoogle || []).push({
						google_ad_client: ${process.env.GOOGLE_CODE_ID},
						enable_page_level_ads: true
						});
	 				`}
				</Script>
				<SignUp />
				<Component {...pageProps} />
			</UserContext.Provider>
		);
	}
}

export default OverviewApp;
