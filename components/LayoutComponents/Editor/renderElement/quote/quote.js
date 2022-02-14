import React, { useEffect, useState } from "react";
import ClassicQuote from "./classic/classicQuote";
import BlockQuote from "./block/blockQuote";
import ElegantQuote from "./elegant/elegantQuote";

const Quote = ({ node }) => {
	const { data } = node;
	const [quote, setQuote] = useState({
		quote: "",
		additionalQuote: "",
		author: "",
		quoteImage: "",
		styleQuote: "classic",
	});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		handleEmbed();
	}, []);

	const handleEmbed = () => {
		setQuote({
			quote: data.quote,
			additionalQuote: data.additionalQuote,
			author: data.author,
			quoteImage: data.image,
			styleQuote: data.quoteStyle ? data.quoteStyle : "classic",
		});
	};
	switch (quote.styleQuote) {
		case "classic":
			return <ClassicQuote quote={quote} />;
		case "block":
			return <BlockQuote quote={quote} />;
		case "elegant":
			return <ElegantQuote quote={quote} />;
		default:
			return <BlockQuote quote={quote} />;
	}
};

export default Quote;
