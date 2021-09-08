export const QUIZ = /* GraphQL */ `
	query GetProductionQuiz($id: String!) {
		getProductionQuiz(id: $id) {
			id
			authorId
			authorName
			viewCount
			development
			production
			overview
			developmentId
			questions
			original
			numQuestions
			createdAt
			updatedAt
			tags
			category
			mainHeadline
			sideHeadline
			bottomHeadline
			shareCount
			affiliateDisclaimer
			progressBar
			pinterestPinLink
			pinterestLink
			pinterestEmbedCode
			user {
				alias
			}
			linkedArticle {
				id
				headline
				headlineImage
				headlineImageAlt
				headlineImageCrop
				headlineImageCropInfo
				headlineImagePath
				kicker
				urlDescription
				category
			}
		}
	}
`;

export const UPDATE_QUIZ = /* GraphQL */ `
	mutation UpdateProductionQuiz($input: UpdateProductionQuizInput!) {
		updateProductionQuiz(input: $input) {
			id
			authorId
			authorName
			viewCount
			development
			production
			questions
			original
			numQuestions
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_QUIZ_VOTES = /* GraphQL */ `
	mutation UpdateProductionQuizVotes($input: UpdateProductionQuizVotesInput!) {
		updateProductionQuizVotes(input: $input) {
			id
			authorId
			authorName
			viewCount
			development
			production
			questions
			original
			numQuestions
			createdAt
			updatedAt
		}
	}
`;
