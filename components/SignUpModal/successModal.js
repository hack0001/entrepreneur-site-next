import { useRef } from "react";
import Ripples from "../Button/Ripples";
import CrossIcon from "../Icons/crossIcon";
import PropTypes from "prop-types";
import styles from "./styles/successModalStyles.module.sass";
import baseTheme from "../../theme/baseTheme.json";
import StaticImage from "@Image/staticImage";

//Set Cookie Expiration if not signed up (in minutes)
const SuccessModal = ({ successModal, setSuccessModal }) => {
	const clickAway = useRef(null);

	const awayClick = e => {
		if (e.target.className === clickAway.current.className) {
			setSuccessModal(false);
		}
	};

	return (
		<>
			{successModal && (
				<div
					className={styles.modalBackground}
					ref={clickAway}
					onClick={awayClick}
				>
					<div className={styles.modalBox}>
						<div className={styles.modalContentWrapper}>
							<div className={styles.modalTitle}>
								<div className={styles.modalExit}>
									<div className={styles.icon}>
										<CrossIcon onClick={() => setSuccessModal(false)} />
									</div>
								</div>
								<div className={styles.logoWrapper}>
									<StaticImage
										src="/static/business_motivation.svg"
										styleClass={styles.modalLogo}
										alt="wealthmack_logo"
										width="133px"
										height="75px"
									/>
								</div>
								<div className={styles.headerContainer}>
									<h2 className={`${styles.header} ${styles.headerPrimary}`}>
										Congratulations!
									</h2>
									<h2 className={`${styles.header} ${styles.headerSecondary}`}>
										You have been successfully added to our Newsletter.
									</h2>
									<h2 className={`${styles.header} ${styles.headerSecondary}`}>
										Keep an eye out in your inbox for our latest content.
									</h2>
								</div>

								<div className={styles.cookieWrapper}>
									<Ripples color={baseTheme.rippleColor}>
										<button
											className={styles.subscribe}
											onClick={() => setSuccessModal(false)}
										>
											Continue
										</button>
									</Ripples>
									<h3 className={`${styles.header} ${styles.headerTertiary}`}>
										If you don't see anything from us, please check your
										Promotions or Spam folder.
									</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

SuccessModal.propTypes = {
	successModal: PropTypes.Boolean,
	setSuccessModal: PropTypes.Func,
};
export default SuccessModal;
