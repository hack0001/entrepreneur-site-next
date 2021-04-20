export const SLIDESHOW = /* GraphQL */ `
	query GetProductionSlideshow($id: String!) {
		getProductionSlideshow(id: $id) {
			id
			authorId
			authorName
			viewCount
			development
			production
			overview
			developmentId
			showHeadlineSlide
			slides
			numSlides
			original
			schedule
			scheduleTime
			createdAt
			updatedAt
			tags
			category
			mainHeadline
			sideHeadline
			bottomHeadline
			shareCount
			affiliateDisclaimer
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

export const UPDATE_SLIDESHOW = /* GraphQL */ `
	mutation updateProductionSlideshow($input: UpdateProductionSlideshowInput!) {
		updateProductionSlideshow(input: $input) {
			id
			viewCount
		}
	}
`;
