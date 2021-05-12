const percentageMarkers = [25, 50, 75, 90, 100];
const percentileMarkers = () => {
	return percentageMarkers.map(marker => {
		return {
			percentile: marker,
			percentileCheck: false,
		};
	});
};

export default percentileMarkers;
