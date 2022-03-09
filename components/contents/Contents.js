import styles from "./styles/contentStyles.module.sass";
import { cleanSpaceUnderscore } from "../helper/cleanContentTitle";
const Contents = ({ value }) => {
	const renderHtml = node => {
		if (typeof node.text === "string") {
			let marks = node.text;

			return marks;
		}

		const children = node.children.map(n => renderHtml(n));
		if (node.type) {
			switch (node.type) {
				case "heading-one":
					return (
						<li className={styles.headOne}>
							<a
								className={styles.link}
								href={`#${cleanSpaceUnderscore(children[0])}`}
							>
								{children}
							</a>
						</li>
					);
				case "heading-two":
					return (
						<li className={styles.headTwo}>
							<a
								className={styles.link}
								href={`#${cleanSpaceUnderscore(children[0])}`}
							>
								{children}
							</a>
						</li>
					);
				case "heading-three":
					return (
						<li className={styles.headThree}>
							<a
								className={styles.link}
								href={`#${cleanSpaceUnderscore(children[0])}`}
							>
								{children}
							</a>
						</li>
					);
				case "heading-four":
					return (
						<li className={styles.headFour}>
							<a
								className={styles.link}
								href={`#${cleanSpaceUnderscore(children[0])}`}
							>
								{children}
							</a>
						</li>
					);
				case "heading-five":
					return (
						<li className={styles.headFive}>
							<a
								className={styles.link}
								href={`#${cleanSpaceUnderscore(children[0])}`}
							>
								{children}
							</a>
						</li>
					);
			}
		}
	};

	const children = value.map(n => {
		return renderHtml(n);
	});
	return (
		<div className={styles.contentWrapper}>
			<p className={styles.contentsTitle}>Table of Contents</p>
			<ul className={styles.list}>{children}</ul>
		</div>
	);
};
export default Contents;
