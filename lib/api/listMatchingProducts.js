module.exports = {
	action: 'ListMatchingProducts',
	url: 'Products',
	version: '2011-10-01',
	responseParser: function(response) {
		return response.ListMatchingProductsResponse.ListMatchingProductsResult[0].Products;
	}
};
