module.exports = {
	action: 'RequestReport', //The MWS action
	url: 'Reports', //The MWS endpoint
	version: '2009-01-01', //MWS Version	
	responseParser: function(response) { //A function returning the significant portion of the parsed response.
		return response.RequestReportResponse.RequestReportResult[0].ReportRequestInfo[0];
	}
};