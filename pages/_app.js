import { useEffect, useState } from "react";
import UserContext from "../utils/Context";
import TagManager from "react-gtm-module";
import dynamic from "next/dynamic";

const SignUp = dynamic(() => import("../components/SignUpModal/signUpModal"), {
	ssr: false,
});
const tagManagerArgs = {
	gtmId: `${process.env.REACT_APP_GOOGLE_TAG_ID}`,
};

const App = ({ Component, pageProps }) => {
	const [appState, setAppState] = useState({
		sessionSlideIds: [],
		sessionQuizIds: [],
		sessionArticleIds: [],
		query: {},
		currentUrlPath: "/",
	});

	const handleState = value => {
		setAppState({
			...appState,
			...value,
		});
	};

	useEffect(() => {
		TagManager.initialize(tagManagerArgs);
	}, []);

	return (
		<UserContext.Provider
			value={{
				handleState: handleState,
				sessionSlideIds: appState.sessionSlideIds,
				sessionQuizIds: appState.sessionQuizIds,
				sessionArticleIds: appState.sessionArticleIds,
				query: appState.query,
				currentUrlPath: appState.currentUrlPath,
			}}
		>
			<SignUp />
			<Component {...pageProps} />
		</UserContext.Provider>
	);
};

export default App;
