export const ARTICLE = /* GraphQL */ `
	query GetProductionArticle($id: String!) {
		getProductionArticle(id: $id) {
			id
			authorId
			authorName
			category
			viewCount
			development
			production
			overview
			developmentId
			content
			schedule
			original
			scheduleTime
			showContentsTable
			affiliateDisclaimer
			pinterestPinLink
			pinterestLink
			pinterestEmbedCode
			user {
				alias
			}
			linkedCpc {
				id
				displayAd
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
			createdAt
			updatedAt
		}
	}
`;
export const ADVERT_ARTICLE = /* GraphQL */ `
	query GetProductionArticle($id: String!) {
		getProductionArticle(id: $id) {
			id
			authorId
			authorName
			category
			viewCount
			development
			production
			overview
			developmentId
			schedule
			original
			scheduleTime
			showContentsTable
			createdAt
			updatedAt
			linkedCpc {
				id
				displayAd
			}
		}
	}
`;
export const NEXT_ARTICLE = /* GraphQL */ `
	query ListProductionArticles(
		$limit: Int
		$id: String
		$nextToken: String
		$sortIndex: String
	) {
		listProductionArticles(
			limit: $limit
			id: $id
			nextToken: $nextToken
			sortIndex: $sortIndex
		) {
			items {
				id
				headlineImage
				headlineImageAlt
				headlineImagePath
				headlineImageCrop
				headlineImageCropInfo
				headline
				category
				kicker
				urlDescription
			}
			nextToken
			sortIndex
		}
	}
`;

export const UPDATE_ARTICLE = /* GraphQL */ `
	mutation updateProductionArticle($input: UpdateProductionArticleInput!) {
		updateProductionArticle(input: $input) {
			id
			viewCount
		}
	}
`;
