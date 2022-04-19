import { useContext } from "react";
import StaticImage from "@Image/staticImage";
import CustomLink from "@components/Link/customLink";
import Context from "@utils/Context";
import { footerLinks, socialLinks } from "@data/data";
import { objectCheck } from "@utils/queryHandler";
import styles from "./styles/footerStyles.module.sass";

const Footer = () => {
	const { query } = useContext(Context);
	const queryLinkCheck = objectCheck(query);

	return (
		<footer className={styles.footer}>
			<div className={styles.footerNav}>
				<nav>
					<ul className={styles.footerNavList}>
						{footerLinks.map((item, index) => {
							return (
								<li key={index} className={styles.listWrap}>
									<CustomLink
										queryLink={queryLinkCheck}
										pathname={item.href}
										query={query}
									>
										<a className={styles.footerItem}>{item.label}</a>
									</CustomLink>
								</li>
							);
						})}
					</ul>
					<ul className={styles.footerNavList}>
						{socialLinks.map(({ href, icon, altName }, index) => {
							return (
								<li key={index} className={styles.linkWrapper}>
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.footerItemSocial}
									>
										<div className={styles.socialImage}>
											<StaticImage
												src={icon}
												alt={altName}
												height="35px"
												width="35px"
											/>
										</div>
									</a>
								</li>
							);
						})}
					</ul>
				</nav>
				<strong className={styles.footerBrand}>
					<span className={styles.footerBrandStyle}>WealthMack</span>
				</strong>
				<div className={styles.footerIcon}>
					<StaticImage
						src="/static/business_motivation.svg"
						styleClass={styles.footerBrandImage}
						alt="wealthmack_logo"
						width="166px"
						height="95px"
					/>
				</div>
			</div>
			<div className={styles.footerCopy}>Copyright © 2022 wealthmack.com</div>
		</footer>
	);
};

export default Footer;
