# amzn-mws

Client for the Amazon Marketplace Web Services API. Read more [here](https://developer.amazonservices.com/gp/mws/index.html/184-0882359-3394128).

# Supported endpoints

ListOrders - [docs](http://docs.developer.amazonservices.com/en_US/orders-2013-09-01/Orders_ListOrders.html)
ListOrdersByNextToken - [docs](http://docs.developer.amazonservices.com/en_US/orders-2013-09-01/Orders_ListOrdersByNextToken.html)
ListOrderItems - [docs](http://docs.developer.amazonservices.com/en_US/orders-2013-09-01/Orders_ListOrderItems.html)

These are limited to the endpoints I have a use for. If you need to use other API calls, please consider contributing. It is extremely simple to add support for other endpoints. 

# Usage

```
var mws = require('amzn-mws');

var client = mws.createClient({
	marketplaceDomain: 'mws.amazonservices.com',
	sellerId: 'YOUR-SELLER-ID',
	awsId: 'YOUR-AWS-ID',
	awsSecret: 'YOUR-SECRET'
});

client.ListOrders({
	'MarketplaceId.Id.1': 'MARKETPLACE-ID',
	'CreatedAfter': '2016-04-10T00:00:00Z'
}).then(function(data){
  //Process the data..
})
```

# Contributing

If you are interested in contributing to the library, please submit a PR. 

### Adding an endpoint

Adding an endpoint is extremely simple. For example, if you need to access the `GetOrder` endpoint [docs](http://docs.developer.amazonservices.com/en_US/orders-2013-09-01/Orders_GetOrder.html)
simply create a `getOrder.js` file in the `api` directory. The module should export and object in the format:

```
module.exports = {
	action: 'GetOrder', //The MWS action
	url: 'Orders', //The MWS endpoint
	version: '2013-09-01', //MWS Version
	responseParser: function(response) { //A function returning the significant portion of the parsed response.
		return response.GetOrderResponse.GetOrderResult[0];
	}
};

```

A good resource for exploring the api is the MWS scratchpad, found [here](https://mws.amazonservices.com/scratchpad/index.html)



