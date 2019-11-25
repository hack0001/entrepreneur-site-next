const emailSignUp = [
	{
		name: "firstName",
		placeholder: "First Name",
		type: "text",
		required: true,
		className: "form-input",
		rows: 1,
		textarea: false,
	},
	{
		name: "lastName",
		placeholder: "Last Name",
		type: "text",
		required: true,
		className: "form-input",
		rows: 1,
		textarea: false,
	},
	{
		name: "email",
		placeholder: "Email Address",
		type: "email",
		required: true,
		className: "form-input",
		rows: 1,
		textarea: false,
	},
];
const INITIAL_STATE = {
	firstName: "",
	lastName: "",
	email: "",
};

const ERROR_STATE = {
	firstName: "",
	lastName: "",
	email: "",
	badRequest: false,
};
const quickEmailSignUp = [
	{
		name: "email",
		placeholder: "Email Address",
		type: "email",
		required: true,
		className: "form-input",
		rows: 1,
		textarea: false,
	},
];
const QUICK_INITIAL_STATE = {
	email: "",
};

const QUICK_ERROR_STATE = {
	email: "",
	badRequest: false,
};
export {
	emailSignUp,
	INITIAL_STATE,
	ERROR_STATE,
	quickEmailSignUp,
	QUICK_INITIAL_STATE,
	QUICK_ERROR_STATE,
};
