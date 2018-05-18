module.exports = {
	action: 'GetReport', //The MWS action
	url: 'Reports', //The MWS endpoint
	version: '2009-01-01', //MWS Version
	raw: true,
	responseParser: function(response) { //A function returning the significant portion of the parsed response.		
		return response;
	}
};