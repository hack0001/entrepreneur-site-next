import FacebookShareCount from "./FacebookShareCount";
import PinterestShareCount from "./PinterestShareCount";

const GetShareCount = async url => {
	const [facebookShareCount, pinterestShareCount] = await Promise.all([
		FacebookShareCount(url),
		PinterestShareCount(url),
	]);

	return {
		facebookShareCount,
		pinterestShareCount,
	};
};

export default GetShareCount;
