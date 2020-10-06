import { useState, useEffect } from "react";
import Link from "next/link";
import Ripples from "../Button/Ripples";
import Context from "../../utils/Context";
import CrossIcon from "../Icons/crossIcon";
import { EMAIL_SIGN_UP } from "../../graphql/emailSignUp";
import {
	emailSignUp,
	INITIAL_STATE,
	ERROR_STATE,
} from "../../data/emailSignupData";
import validate from "../../components/FormValidation/Validation";
import SuccessModal from "./successModal";
import Cookie from "js-cookie";
import manualRequest from "../apiRequest/prodRequest";
import styles from "./styles/signUpModalStyles.module.sass";
import baseTheme from "../../theme/baseTheme.json";
//Set Cookie Expiration if not signed up (in minutes)
const cookieTime = 60;

const SignUpModal = () => {
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [errors, setErrors] = useState(ERROR_STATE);
	const [showModal, setShowModal] = useState(false);
	const [widthModal, setWidthModal] = useState(true);
	const [successModal, setSuccessModal] = useState(false);
	const [emailCookie, setEmailCookie] = useState(false);
	const [count, setCount] = useState(0);
	const handleScroll = () => {
		const top = window.pageYOffset || document.documentElement.scrollTop;

		if (top > 200 && count < 1) {
			setCount(count + 1);
			setShowModal(top > 200);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();

		const cookieEmailMarker = Cookie.get("wealth-cookie-email-signup")
			? JSON.parse(Cookie.get("wealth-cookie-email-signup"))
			: true;

		setEmailCookie(cookieEmailMarker);

		if (window.innerWidth < 1000) {
			setWidthModal(false);
		}
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const changeEmailCookie = value => {
		//if clicked away and not signed up push cookie expiry to a couple of hours
		const expiryDate = new Date(new Date().getTime() + cookieTime * 60 * 1000);
		Cookie.set("wealth-cookie-email-signup", JSON.stringify(false), {
			expires: expiryDate,
		});
		setEmailCookie(value);
	};

	const validateForm = e => {
		validate(formData, e.target.name, setErrors, errors);
	};

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (errors.badRequest) {
			setErrors({
				...errors,
				badRequest: false,
			});
		}

		const submitForm = {
			...formData,
			id: formData.email,
			emailSignupSiteId: process.env.REACT_APP_SITE_ID,
			site: "wealthmack",
			popUp: true,
		};

		try {
			const mutationData = {
				query: EMAIL_SIGN_UP,
				operationName: "CreateEmail",
				variables: { input: submitForm },
			};
			await manualRequest(mutationData);

			const expiryDate = process.env.COOKIE_ACCEPT_EXPIRY; //Days

			Cookie.set("wealth-cookie-email-signup", JSON.stringify(false), {
				expires: Number(expiryDate),
			});
			setFormData(INITIAL_STATE);
			setSuccessModal(true);
			setEmailCookie(false);
			setErrors({
				ERROR_STATE,
			});
		} catch (err) {
			console.log("Error with request", err);
			setFormData(INITIAL_STATE);
			setErrors({
				...errors,
				badRequest: true,
			});
		}
	};

	return (
		<>
			{emailCookie && showModal && widthModal && (
				<div className={styles.modalBackground}>
					<div className={styles.modalBox}>
						<div className={styles.modalContentWrapper}>
							<div className={styles.modalTitle}>
								<div className={styles.modalExit}>
									<div className={styles.icon}>
										<CrossIcon onClick={() => changeEmailCookie(false)} />
									</div>
								</div>
								<div className={styles.headerContainer}>
									<div className={styles.logoWrapper}>
										<img
											src="/static/business_motivation.svg"
											className={styles.modalLogo}
											alt="wealthmack_logo"
										/>
									</div>
									<h1 className={`${styles.header} ${styles.headerPrimary}`}>
										Keep Me Updated
									</h1>

									{!errors.badRequest && (
										<h2
											className={`${styles.header} ${styles.headerSecondary}`}
										>
											Stay up to date with the most inspirational Business and
											Personal Development content on the internet.
										</h2>
									)}
									{errors.badRequest && (
										<>
											<h2
												className={`${styles.header} ${styles.headerSecondary}`}
											>
												Uh Oh! Something went wrong - Please try again or
												Contact support{" "}
												<Link href="/contact">
													<a className={styles.link} target="_blank">
														here.
													</a>
												</Link>
											</h2>
										</>
									)}
								</div>
								<form className={styles.formContainer} onSubmit={handleSubmit}>
									{emailSignUp.map((input, index) => {
										return (
											<div className={styles.formGroup} key={index}>
												<label className={styles.formLabel}>
													{input.label}
												</label>
												<input
													name={input.name}
													required={input.required}
													value={formData[input.name]}
													className={
														errors[input.name]
															? styles.error
															: styles[input.className]
													}
													type={input.type}
													placeholder={
														errors[input.name]
															? errors[input.name]
															: input.placeholder
													}
													rows={input.rows}
													onChange={handleChange}
													onBlur={validateForm}
												/>
											</div>
										);
									})}
									<div className={styles.cookieWrapper}>
										<Ripples color={baseTheme.rippleColor}>
											<button
												className={styles.subscribe}
												onClick={changeEmailCookie}
											>
												Subscribe
											</button>
										</Ripples>
										<Ripples
											color={baseTheme.rippleColor}
											styling={{
												marginBottom: "0px",
												marginTop: "0px",
											}}
										>
											<button
												className={styles.nonSubscribe}
												onClick={() => changeEmailCookie(false)}
											>
												No Thanks I don't want expert knowledge of how to build
												wealth
											</button>
										</Ripples>
									</div>
								</form>
								<div className={styles.headerContainer}>
									<p className={styles.modalContent}>
										By clicking Submit, you are subscribing to receive
										newsletters from Derivative Media Ltd. Your data will be
										processed in accordance with our{" "}
										<Link href="/cookies">
											<a className={styles.link} target="_blank">
												Privacy and Cookie Policy.
											</a>
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<SuccessModal
				successModal={successModal}
				setSuccessModal={setSuccessModal}
			/>
		</>
	);
};
export default SignUpModal;
