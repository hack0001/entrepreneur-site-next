import { useContext } from "react";
import StaticImage from "@Image/staticImage";
import { PropTypes } from "prop-types";
import MenuButton from "./Menu/MenuButton";
import CustomLink from "@components/Link/customLink";
import { links, socialLinks } from "@data/data";
import Context from "@utils/Context";
import { objectCheck } from "@utils/queryHandler";
import styles from "./styles/headerStyles.module.sass";

const Header = ({ menuOpen, onClick }) => {
	const { query } = useContext(Context);
	const queryLinkCheck = objectCheck(query);
	return (
		<header className="Header">
			<nav className={styles.navigation}>
				<div className={styles.logo}>
					<CustomLink queryLink={queryLinkCheck} pathname="/" query={query}>
						<a>
							<StaticImage
								src="/static/business_motivation.svg"
								width="87px"
								height="50px"
								styleClass={styles.headerIcon}
								alt="wealthmack_logo"
								priority={true}
							/>
						</a>
					</CustomLink>
				</div>
				<div className={styles.headLinks}>
					<div className={styles.linkWrapper}>
						{links.map(({ href, label }, index) => (
							<div key={index}>
								<CustomLink
									queryLink={queryLinkCheck}
									pathname={href}
									index={index}
									query={query}
								>
									<a className={styles.navMenuItem}>
										<span className={styles.navMenuLink}>{label}</span>
									</a>
								</CustomLink>
							</div>
						))}
					</div>
				</div>
				<div className={styles.headSocialLinks}>
					<div className={styles.socialWrapper}>
						{socialLinks.map(({ href, icon, altName }, index) => (
							<div className={styles.socialNavMenuItem} key={index}>
								<a href={href} target="_blank" rel="noopener noreferrer">
									<StaticImage
										src={icon}
										width="22px"
										styleClass={styles.socialStyles}
										alt={altName}
										height="22px"
										priority={true}
									/>
								</a>
							</div>
						))}
					</div>
				</div>
				<div className={styles.burger}>
					<MenuButton open={menuOpen} onClick={onClick} />
				</div>
			</nav>
			<style jsx>
				{`
					.Header {
						position: fixed;
						top: 0; /* Stick it to the top */
						max-height: 70px;
						width: 100vw;

						display: grid;

						/* Cosmetics */
						background-color: #101010;
						z-index: 1000;
						height: 3.45rem;
						align-items: center;
						justify-items: center;
					}
				`}
			</style>
		</header>
	);
};

Header.propTypes = {
	onClick: PropTypes.func.isRequired,
	menuOpen: PropTypes.Boolean,
};

export default Header;
