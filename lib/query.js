var crypto = require('crypto');

var generateSignature = function(stringToSign, awsSecret) {

	var hmac = crypto.createHmac('sha256', awsSecret);
	var signature = hmac.update(stringToSign).digest('base64');

	return signature;
};


module.exports = function(domain, url, version, action, query, credentials){
	var parts = [];

	if (!credentials || !credentials.awsId ||  !credentials.awsSecret) {
		throw new Error('Missing credentials');
	}

	//Required params : http://docs.developer.amazonservices.com/en_US/dev_guide/DG_RequiredRequestParameters.html#DG_RequiredRequestParameters
	parts.push('AWSAccessKeyId=' + credentials.awsId);
	parts.push('Action=' + action);
	if (credentials.mwsAuthToken) parts.push('MWSAuthToken=' + credentials.mwsAuthToken);
	parts.push('SellerId=' + credentials.sellerId);
	parts.push('SignatureMethod=HmacSHA256');
	parts.push('SignatureVersion=2');
	parts.push('Timestamp=' + (encodeURIComponent((new Date()).toISOString())));
	parts.push('Version=' + version);

	for (var param in query) {
		parts.push(param + '=' + encodeURIComponent(query[param]));
	}

	var unsignedString = parts.sort().join('&');
	var req = 'GET\n' + domain + '\n/' + [url, version].join('/') + '\n' + unsignedString;

	var signature = encodeURIComponent(generateSignature(req, credentials.awsSecret)).replace(/\+/g, '%2B');

	var httpquery = 'https://' + [domain, url, version].join('/') + '?' + unsignedString + '&Signature=' + signature;

	return httpquery;

};

