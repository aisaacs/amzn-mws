module.exports = {
	action: 'GetOrder', //The MWS action
	url: 'Orders', //The MWS endpoint
	version: '2013-09-01', //MWS Version
	responseParser: function(response) { //A function returning the significant portion of the parsed response.
		return response.GetOrderResponse.GetOrderResult[0];
	}
};
