import Layout from "../components/Layouts/Layout";
import Head from "next/head";
import {
	emailSignUp,
	INITIAL_STATE,
	ERROR_STATE,
} from "../data/emailSignupData";
import { useState } from "react";
import validate from "../components/FormValidation/Validation";
import Vanilla from "../components/Layouts/vanillaLayout";
import RippleButton from "../components/Button/Button";
import { EMAIL_SIGN_UP } from "../graphql/emailSignUp";
import Cookie from "js-cookie";
import Link from "next/link";
import manualRequest from "../components/apiRequest/prodRequest";
import styles from "../styles/newsletterStyles.module.sass";
import baseTheme from "../theme/baseTheme.json";
import Image from "next/image";
const Newsletter = ({ url }) => {
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [successMsg, setSuccessMsg] = useState(false);
	const [errors, setErrors] = useState(ERROR_STATE);

	const handleSubmit = async e => {
		e.preventDefault();
		setErrors({
			...errors,
			badRequest: false,
		});
		const submitForm = {
			...formData,
			id: formData.email,
			emailSignupSiteId: process.env.REACT_APP_SITE_ID,
			site: "wealthmack",
			popUp: false,
		};

		try {
			const mutationData = {
				query: EMAIL_SIGN_UP,
				operationName: "CreateEmail",
				variables: { input: submitForm },
			};

			await manualRequest(mutationData);
			const expiryDate = new Date(new Date().getTime() + 1 * 60 * 1000);
			Cookie.set("wealth-cookie-email-signup", JSON.stringify(false), {
				expires: expiryDate,
			});
			setFormData(INITIAL_STATE);
			setSuccessMsg(true);
		} catch (err) {
			console.log("Error with request", err);
			setFormData(INITIAL_STATE);

			setErrors({
				...errors,
				badRequest: true,
			});
		}
	};

	const validateForm = e => {
		validate(formData, e.target.name, setErrors, errors);
	};

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	return (
		<Layout background>
			<Head>
				<title>Newsletter</title>
				<link rel="canonical" href={`${process.env.SITE_ADDRESS}/newsletter`} />
			</Head>
			<Vanilla>
				<main className={styles.content}>
					<article className={styles.article}>
						<h1 className={styles.mainTitle}>Newsletter</h1>
					</article>

					<Image
						src={"/static/business_cover_photox1024.jpg"}
						width="1040px"
						height="585px"
						priority={true}
						alt={process.env.SITE_NAME}
					/>
					<form className={styles.contactForm} onSubmit={handleSubmit}>
						<h3>
							Be the first to get our latest content - straight to your inbox
						</h3>
						<p>
							The best wealth and personal development content on the internet.
							Get the latest content that you care about the most as soon as it
							comes avaialable.
						</p>
						{emailSignUp.map((input, index) => {
							return (
								<div className={styles.formGroup} key={index}>
									<label className={styles.formLabel}>{input.label}</label>
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
						<RippleButton
							label={"Subscribe"}
							color={baseTheme.primary}
							handler={null}
							type="submit"
						/>
						{successMsg && (
							<>
								<p>
									Congratulations! You have been successfully added to our
									Newsletter. Keep an eye out in your inbox for our latest
									content.
								</p>
								<p>
									If you don't see anything from us, please check your
									Promotions or Spam folder.
								</p>
							</>
						)}
						{errors.badRequest && (
							<>
								<p>
									Uh Oh! Something went wrong - Please try again or Contact
									support
									<Link href="/contact">
										<a className={styles.link} target="_blank">
											here.
										</a>
									</Link>
								</p>
							</>
						)}
						<strong>
							*By signing up, you are subscribing to recieve newsletter from
							Derivative Media Ltd. You data will be processed in accordance
							with our Privacy & Cookies Policy
						</strong>
					</form>
				</main>
			</Vanilla>
		</Layout>
	);
};

export default Newsletter;
