var argv = require('minimist')(process.argv.slice(2));

var qwasi = require('../lib/client')({ beta: true });

qwasi['message.send'](argv.to, argv.alert, argv.message, function(err, response) {
    if (err) {
	console.log(err);
    }
    if (response) {
	console.log(response);
    }
});
