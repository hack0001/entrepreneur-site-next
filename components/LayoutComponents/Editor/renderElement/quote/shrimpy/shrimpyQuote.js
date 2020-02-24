import {
	quoteIconFirst,
	quoteIconSecond,
	quoteWordStyle,
	quoteIconFooter,
} from "./shrimpyQuoteStyle";
const ShrimpyQuote = ({ quote, attributes, children }) => {
	return (
		<div {...attributes} style={{ padding: 15 }}>
			<div style={quoteWordStyle}>
				<p>{quote.quote}</p>
				<p>{quote.additionalQuote}</p>
			</div>
			{children}
			<footer style={quoteIconFooter}>
				{quote.author ? <span>- {quote.author}</span> : ""}
			</footer>
		</div>
	);
};
export default ShrimpyQuote;