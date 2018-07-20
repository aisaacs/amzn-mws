module.exports = {
	action: 'GetMatchingProductForId',
	url: 'Products',
	version: '2011-10-01',
	responseParser: function(response) {
		return response.GetMatchingProductForIdResponse.GetMatchingProductForIdResult[0].Products[0].Product[0];
	}
};
