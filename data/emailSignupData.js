const emailSignUp = [
	{
		name: "firstName",
		placeholder: "First Name",
		type: "text",
		required: true,
		className: "formInput",
		rows: 1,
		textarea: false,
	},
	{
		name: "lastName",
		placeholder: "Last Name",
		type: "text",
		required: true,
		className: "formInput",
		rows: 1,
		textarea: false,
	},
	{
		name: "email",
		placeholder: "Email Address",
		type: "email",
		required: true,
		className: "formInput",
		rows: 1,
		textarea: false,
	},
];
const editorEmailSignUp = [
	{
		name: "firstName",
		placeholder: "Name",
		type: "text",
		required: true,
		className: "formInput",
		rows: 1,
		textarea: false,
	},
	{
		name: "email",
		placeholder: "Email Address",
		type: "email",
		required: true,
		className: "formInput",
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
const EDITOR_EMAIL_INITIAL_STATE = {
	firstName: "",
	email: "",
};

const EDITOR_EMAIL_ERROR_STATE = {
	firstName: "",
	email: "",
	badRequest: false,
};
const quickEmailSignUp = [
	{
		name: "email",
		placeholder: "Email Address",
		type: "email",
		required: true,
		className: "formInput",
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
	editorEmailSignUp,
	INITIAL_STATE,
	ERROR_STATE,
	EDITOR_EMAIL_INITIAL_STATE,
	EDITOR_EMAIL_ERROR_STATE,
	quickEmailSignUp,
	QUICK_INITIAL_STATE,
	QUICK_ERROR_STATE,
};
