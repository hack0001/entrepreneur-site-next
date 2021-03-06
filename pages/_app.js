import App from "next/app";
import UserContext from "../utils/Context";
import TagManager from "react-gtm-module";
import dynamic from "next/dynamic";
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
				<SignUp />
				<Component {...pageProps} />
			</UserContext.Provider>
		);
	}
}

export default OverviewApp;
