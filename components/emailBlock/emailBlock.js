import { useState } from "react";
import emailStyles from "./styles/emailBlock.module.sass";
import {
	editorEmailSignUp,
	EDITOR_EMAIL_INITIAL_STATE,
	EDITOR_EMAIL_ERROR_STATE,
} from "@data/emailSignupData";
import manualRequest from "@components/apiRequest/prodRequest";
import Cookie from "js-cookie";
import validate from "@components/FormValidation/Validation";
import CustomLink from "@components/Link/customLink";
import RippleButton from "@components/Button/Button";
import baseTheme from "../../theme/baseTheme.json";
import { EMAIL_SIGN_UP } from "@graphql/emailSignUp";

const EmailBlock = ({ node, category, headline, url }) => {
	const [formData, setFormData] = useState(EDITOR_EMAIL_INITIAL_STATE);
	const [errors, setErrors] = useState(EDITOR_EMAIL_ERROR_STATE);
	const [successMsg, setSuccessMsg] = useState(false);
	const [loadingButton, setLoadingButton] = useState(false);
	const [buttonText, setButtonText] = useState("JOIN NOW");

	const handleSubmit = async e => {
		e.preventDefault();
		setErrors({
			...errors,
			badRequest: false,
		});
		setLoadingButton(true);
		setButtonText("Sending");
		setSuccessMsg(false);
		const submitForm = {
			...formData,
			id: formData.email,
			emailSignupSiteId: process.env.REACT_APP_SITE_ID,
			site: "wealthmack",
			popUp: false,
			source: "midArticleEmailBlock",
			contentType: "Article",
			contentHeadline: headline,
			contentCategory: category,
			contentUrl: url,
		};

		// Track the Email Signup in Tag Manager Manually
		if (typeof window !== "undefined") {
			if (window.dataLayer) {
				window.dataLayer.push({
					event: "track_email_signup",
					email: formData.email,
					signupType: "midArticleEmailBlock",
				});
			}
		}

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
			setFormData(EDITOR_EMAIL_INITIAL_STATE);

			setErrors(EDITOR_EMAIL_ERROR_STATE);
			setTimeout(() => {
				setLoadingButton(false);
				setButtonText("Success!🥳");
				setSuccessMsg(true);
			}, 2500);
			setTimeout(() => {
				setButtonText("Join");
				setSuccessMsg(false);
			}, 10000);
		} catch (err) {
			console.log("Error with request", err);
			setFormData(EDITOR_EMAIL_INITIAL_STATE);

			setErrors({
				...errors,
				badRequest: true,
			});
			setButtonText("Whoops");
			setLoadingButton(false);
		}
	};

	const validateForm = e => {
		if (successMsg) {
			setSuccessMsg(false);
		} else {
			validate(formData, e.target.name, setErrors, errors);
		}
	};

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className={emailStyles.emailWrapper}>
			<div className={emailStyles.emailBlock}>
				<div className={emailStyles.emailOffer}>
					<div className={emailStyles.titleWrapper}>
						<h3>How to Start a Blog</h3>
						<h3>FREE Email Course</h3>
					</div>
					<div>
						<p>
							In this free course, we show you how to create a blog easily, from
							the technical side (don't worry - it's easy!) all the way to
							earning your first income and building an audience. Join now!
						</p>
						<p>
							Subscribe to our newsletter to receive regular updates and get
							access to the free course.
						</p>
					</div>
				</div>
				<div className={emailStyles.middleMarker}></div>
				<div className={emailStyles.emailDetails}>
					<div>
						<form className={emailStyles.contactForm} onSubmit={handleSubmit}>
							{editorEmailSignUp.map((input, index) => {
								return (
									<div className={emailStyles.formGroup} key={index}>
										<label className={emailStyles.formLabel}>
											{input.label}
										</label>
										<input
											name={input.name}
											required={input.required}
											value={formData[input.name]}
											className={
												errors[input.name]
													? emailStyles.error
													: emailStyles[input.className]
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
							<RippleButton
								label={buttonText}
								color={baseTheme.primary}
								handler={null}
								type="submit"
								loading={loadingButton}
							/>
							{successMsg && (
								<div className={emailStyles.emailDetailsMessage}>
									<p>
										🎉🎉🎉 Congratulations! You have been successfully added to
										our Newsletter. Keep an eye out in your inbox for our latest
										content.
									</p>
								</div>
							)}
							{errors.badRequest && (
								<div div className={emailStyles.emailDetailsMessage}>
									<p>
										Uh Oh! Something went wrong - Please try again or Contact
										support {""}
										<CustomLink pathname="/contact">
											<a className={emailStyles.link}>here.</a>
										</CustomLink>
									</p>
								</div>
							)}
							<p className={emailStyles.emailDetailsMessage}>
								*By signing up, you are subscribing to recieve newsletter from
								Derivative Media Ltd. Your data will be processed in accordance
								with our{" "}
								<CustomLink pathname="/privacy">
									<a className={emailStyles.emailLink} target="_blank">
										Privacy & Cookies Policy
									</a>
								</CustomLink>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmailBlock;
