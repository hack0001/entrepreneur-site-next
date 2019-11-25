import App from "next/app";
import UserContext from "../utils/Context";
import Cookie from "js-cookie";
import SignUp from "../components/SignUpModal/signUpModal";
import Router from "next/router";
import { pageview } from "../gtag/lib";
Router.events.on("routeChangeComplete", url => pageview(url));

class OverviewApp extends App {
	state = {
		cookie: false,
		emailCookie: true,
	};

	componentDidMount() {
		const cookieMarker = Cookie.get("cookie-accept")
			? JSON.parse(Cookie.get("cookie-accept"))
			: true;
		const cookieEmailMarker = Cookie.get("wealth-cookie-email-signup")
			? JSON.parse(Cookie.get("wealth-cookie-email-signup"))
			: true;
		this.setState({ cookie: cookieMarker, emailCookie: cookieEmailMarker });
	}

	handleState = value => {
		this.setState({
			...this.state,
			...value,
		});
	};

	render() {
		const { Component, pageProps, initialCookieValue } = this.props;
		return (
			<UserContext.Provider
				value={{
					cookie: this.state.cookie,
					handleState: this.handleState,
					emailCookie: this.state.emailCookie,
				}}
			>
				<SignUp />
				<Component {...pageProps} />
			</UserContext.Provider>
		);
	}
}

export default OverviewApp;
