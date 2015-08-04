#node-qwasi

The node-qwasi library provides a simple client interface for making API calls to the Qwasi Platform.


## Library Initialization

You initialize your Qwasi instance using your Application ID and API Key.

```
var qwasi = require('qwasi')({
	app_id: 'your Qwasi app id',
	api_key: 'your Qwasi api key'
});
```

## Invoking Methods
Methods are invoked by passing the method name, parameters object, and a callback.

```
qwasi.invoke('message.send', {
	audience: ["some user token"],
	notification: "You have a new message",
	payload: { foo: "bar" },
	tags: ['someTag']
}, function(err, response) {
	// Do stuff with the reponse here
});
```

## Convenience Methods

Many of the API call invocations are wrapped in simple convenience methods.

### message.send
Sends a message to a user token, device, or channel.

```
qwasi['message.send']('usertoken', 'Hello, Qwasi!', { foo: "bar" }, function(err, response) {
    if (err) {
		console.log(err);
    }
    if (response) {
		console.log(response);
    }
});
````
