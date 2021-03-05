import Layout from "../components/Layouts/Layout";
import Head from "next/head";
import PropTypes from "prop-types";
import { useRouter, withRouter } from "next/router";
import {
	contactForm,
	INITIAL_STATE,
	ERROR_STATE,
} from "../data/contactFormData";
import { useState, useContext, useEffect } from "react";
import validate from "../components/FormValidation/Validation";
import Reaptcha from "reaptcha";
import Vanilla from "../components/Layouts/vanillaLayout";
import RippleButton from "../components/Button/Button";
import styles from "../styles/contactStyles.module.sass";
import prodRequest from "../components/apiRequest/prodRequest";
import { createContactForm } from "../graphql/emailSignUp";
import baseTheme from "../theme/baseTheme.json";
import Context from "../utils/Context";
import { queryHandler, getParams } from "../utils/queryHandler";

const Contact = () => {
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [recaptcha, setRecaptcha] = useState(false);
	const [errors, setErrors] = useState(ERROR_STATE);
	const [recaptchaError, setRecaptchaError] = useState("");
	const [receivedMsg, setReceivedMsg] = useState("");
	const router = useRouter();
	const { handleState } = useContext(Context);

	useEffect(() => {
		const { urlPath, queryParams } = getParams(
			router.asPath ? router.asPath : "",
		);
		const queryUpdate = queryHandler(queryParams);
		handleState({
			query: queryUpdate,
			currentUrlPath: urlPath,
		});
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		if (recaptcha) {
			const { push } = router;
			try {
				await prodRequest({
					query: createContactForm,
					variables: {
						input: {
							...formData,
							site: "entrepreneur",
						},
					},
					operationName: "CreateContactForm",
				});
				setFormData(INITIAL_STATE);
				setErrors({
					ERROR_STATE,
				});
				setReceivedMsg(
					"Congratulations! Your Message Has Been Sent Successfully",
				);
				push("/");
			} catch (err) {
				console.log("Error occurred", err);
			}
		} else {
			setRecaptchaError(true);
		}
	};

	const validateForm = e => {
		validate(formData, e.target.name, setErrors, errors);
	};

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const verify = resp => {
		if (resp) {
			setRecaptcha(true);
			setRecaptchaError("");
		}
	};

	return (
		<Layout>
			<Head>
				<title>Contact Us</title>
				<link rel="canonical" href={`${process.env.SITE_ADDRESS}/contact`} />
			</Head>
			<Vanilla>
				<main className={styles.content}>
					<article className={styles.article}>
						<h1 className={styles.mainTitle}>Contact Us</h1>
					</article>
					<form className={styles.contactForm} onSubmit={handleSubmit}>
						<p>
							<strong className={styles.formBlurb}>
								We value your feedback as we continually try to improve our
								content and its delivery for a better user experience.
							</strong>
						</p>
						<p>
							<strong className={styles.formBlurb}>
								If you have any questions or comments about us please contact
								admin@derivative-media.com or enter your information below and
								we will get back to you as soon as possible
							</strong>
						</p>
						{contactForm.map((input, index) => {
							switch (input.textarea) {
								case true:
									return (
										<div className={styles.formGroup} key={index}>
											<label className={styles.formLabel}>{input.label}</label>
											<textarea
												name={input.name}
												className={styles[input.className]}
												type={input.type}
												placeholder={input.placeholder}
												rows={input.rows}
												onChange={handleChange}
											/>
										</div>
									);
								case false:
									return (
										<div className={styles.formGroup} key={index}>
											<label className={styles.formLabel}>{input.label}</label>
											<input
												name={input.name}
												required={input.required}
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
							}
						})}
						<div className={styles.recaptcha}>
							<Reaptcha
								sitekey={process.env.NEXT_APP_RECAPTCHA_SITEKEY}
								// render="explicit"
								onVerify={verify}
							/>
						</div>
						<div>
							{recaptchaError ? (
								<div className={styles.recaptchaError}>
									Please confirm that you are not a bot by checking the checkbox
								</div>
							) : null}
						</div>
						<div>
							{receivedMsg ? (
								<div className={styles.recaptchaError}>{receivedMsg}</div>
							) : null}
						</div>
						<RippleButton
							label={"Submit"}
							color={baseTheme.secondary}
							handler={null}
							type="submit"
						/>
					</form>
				</main>
			</Vanilla>
		</Layout>
	);
};

Contact.propTypes = {
	router: PropTypes.object,
};

export default withRouter(Contact);
