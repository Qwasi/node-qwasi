var argv = require('minimist')(process.argv.slice(2));

var qwasi = require('../lib/client')('5575fa17e1910a4f6e3244f3',
				     'c479a1f1c72b66fa510b7076890f5e01',
				     { beta: true });

qwasi['message.send'](argv.to, argv.alert, argv.message, function(err, response) {
    if (err) {
	console.log(err);
    }
    if (response) {
	console.log(response);
    }
});
