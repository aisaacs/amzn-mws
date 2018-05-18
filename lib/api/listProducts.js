module.exports = {
	action: 'ListProducts',
	url: 'Orders',
	version: '2013-09-01',
	responseParser: function(response) {
		return response.ListOrderItemsResponse.ListOrderItemsResult[0];
	}
};
