import { useState } from "react";
import Ripples from "../Button/Ripples";
import EmailIcon from "./emailIcon";
import { EMAIL_SIGN_UP } from "../../graphql/emailSignUp";
import {
	quickEmailSignUp,
	QUICK_INITIAL_STATE,
	QUICK_ERROR_STATE,
} from "../../data/emailSignupData";
import validate from "../../components/FormValidation/Validation";
import Reaptcha from "reaptcha";
import Cookie from "js-cookie";
import manualRequest from "../apiRequest/prodRequest";
import styles from "./styles/quickEmailSignupStyles.module.sass";
import baseTheme from "../../theme/baseTheme.json";
import CustomLink from "@components/Link/customLink";

//Set Cookie Expiration if not signed up (in minutes)
const SignUpModal = ({ queryLinkCheck, query }) => {
	const [formData, setFormData] = useState(QUICK_INITIAL_STATE);
	const [errors, setErrors] = useState(QUICK_ERROR_STATE);
	const [success, setSuccess] = useState(false);
	const [verified, setVerified] = useState(false);
	let recaptchaRef = null;

	const validateForm = e => {
		if (success) {
			setSuccess(false);
		}
		validate(formData, e.target.name, setErrors, errors);
	};

	const focusForm = () => {
		if (success) {
			setSuccess(false);
		}
	};

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const verifyCallback = () => {
		setVerified(true);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (errors.request) {
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
			popUp: false,
		};

		//Track the Email Signup in Tag Manager Manually
		if (window) {
			window.dataLayer.push({
				event: "track_email_signup",
				email: formData.email,
				signupType: "quickEmail",
			});
		}
		try {
			const mutationData = {
				query: EMAIL_SIGN_UP,
				operationName: "CreateEmail",
				variables: { input: submitForm },
			};
			await manualRequest(mutationData);

			setSuccess(true);
			const expiryDate = process.env.COOKIE_ACCEPT_EXPIRY; //Days

			Cookie.set("wealth-cookie-email-signup", JSON.stringify(false), {
				expires: Number(expiryDate),
			});
			setFormData(QUICK_INITIAL_STATE);
			setErrors({
				QUICK_ERROR_STATE,
			});
		} catch (err) {
			console.log("Error with request", err);
			setFormData(QUICK_INITIAL_STATE);
			setErrors({
				...errors,
				badRequest: true,
			});
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<div className={styles.iconHeader}>
					<div className={styles.headerWrapper}>
						<div className={styles.iconWrapLeft}>
							<EmailIcon />
						</div>
						<h1 className={styles.headerPrimary}>WealthMack Newsletters</h1>
						<div className={styles.iconWrapRight}>
							<EmailIcon />
						</div>
					</div>
				</div>

				{!errors.badRequest && (
					<h2 className={styles.headerSecondary}>
						Subscribe for the most inspirational Business and Personal
						Development content on the internet.
					</h2>
				)}
				{errors.badRequest && (
					<>
						<h2 className={styles.headerSecondary}>
							Uh Oh! Something went wrong - Please try again or Contact support{" "}
							<CustomLink
								pathname={"/contact"}
								queryLink={queryLinkCheck}
								query={query}
							>
								<a className={styles.link} target="_blank">
									here.
								</a>
							</CustomLink>
						</h2>
					</>
				)}
			</div>
			<form className={styles.formContainer} onSubmit={handleSubmit}>
				{quickEmailSignUp.map((input, index) => {
					return (
						<div className={styles.formGroup} key={index}>
							<label className={styles.formLabel}>{input.label}</label>
							<input
								autoComplete="off"
								name={input.name}
								required={input.required}
								value={formData[input.name]}
								className={
									errors[input.name] ? styles.error : styles[input.className]
								}
								type={input.type}
								placeholder={
									errors[input.name] ? errors[input.name] : input.placeholder
								}
								rows={input.rows}
								onChange={handleChange}
								onBlur={validateForm}
								onFocus={focusForm}
							/>
						</div>
					);
				})}
				<div className={styles.subscribeWrapper}>
					<Ripples
						color={baseTheme.rippleColor}
						styling={{ height: "100%", margin: 0, padding: 0 }}
					>
						<button
							className={styles.subscribe}
							disabled={!verified}
							type="submit"
						>
							Subscribe
						</button>
					</Ripples>
				</div>
			</form>
			<div className={styles.recaptchaWrapper}>
				<Reaptcha
					sitekey={process.env.NEXT_APP_RECAPTCHA_INVISIBLE_SITEKEY}
					ref={e => (recaptchaRef = e)}
					onVerify={verifyCallback}
					theme="dark"
				/>
			</div>
			{success && (
				<div className={styles.headerContainer}>
					<p className={styles.content}>
						Congratulations! You have successfully been added to our email list.
						Keep an eye out for our latest content in your inbox.
					</p>
				</div>
			)}
			{!verified && (
				<div className={styles.headerContainer}>
					<p className={styles.content}>
						Please check the checkbox above to confirm you are not a robot
					</p>
				</div>
			)}
			{!success && (
				<div className={styles.headerContainer}>
					<p className={styles.content}>
						By clicking Submit, you are subscribing to receive newsletters from
						Derivative Media Ltd. Your data will be processed in accordance with
						our{" "}
						<CustomLink
							pathname={"/cookies"}
							queryLink={queryLinkCheck}
							query={query}
						>
							<a className={styles.link} target="_blank">
								Privacy and Cookie Policy.
							</a>
						</CustomLink>
					</p>
				</div>
			)}
			)
		</div>
	);
};
export default SignUpModal;
