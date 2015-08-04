var jayson = require('jayson');
var util = require('util');
var url = require('url');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

function Qwasi(app_id, api_key, options) {
    var self = this;
    options = options || {};
    
    Qwasi.super_.call(self);

    if (_.isString(options)) {
	options = { api_url: options };
    }
    
    var api_url = options.api_url || 'https://api.qwasi.com/rpc'

    if (options.beta) {
	api_url = 'https://beta.qwasi.com/rpc';
    }
    else if (options.sandbox) {
	api_url = 'https://beta.qwasi.com/rpc';
    }
    
    options = url.parse(api_url);

    _.defaults(options, {
	headers: {
	    'X-QWASI-API-KEY': api_key,
	    'X-QWASI-APP-ID': app_id
	}
    });
    
    if (/^https/.test(options.protocol)) {
	self.client = jayson.client.https(options);
    }
    else {
	self.client = jayson.client.http(options);
    }
};
util.inherits(Qwasi, EventEmitter);

Qwasi.prototype['message.send'] = function(audience, notification, payload, payload_type, tags, options, callback) {
    var self = this;
   
    if (_.isFunction(payload)) {
	callback = payload;
	options = {};
    }
    else if (_.isFunction(payload_type)) {
	callback = payload_type;
	options = {};
    }
    else if (_.isFunction(tags)) {
	callback = tags;
	options = {};
    }
    else if (_.isFunction(options)) {
	callback = options;
	options = {};
    }

    if (!_.isArray(audience)) {
	audience += '';
	audience = audience.split(/[\s,]+/);
    }

    options = options || {};
    
    _.defaults(options, {
	encodedPayload: false
    });
    
    self.invoke_method('message.send', {
	audience: audience,
	notification: notification,
	payload: payload,
	payload_type: payload_type,
	tags: tags,
	options: options
    }, callback);
};

Qwasi.prototype.invoke_method = function(method, params, callback) {
    var self = this;

    self.client.request('message.send', params, function(err, error, response) {
	if (err) {
	    if (callback)
		callback(err);
	}
	else if (error) {
	    if (callback) {
		callback(err);
	    }
	}
	else if (response) {
	    if (callback) {
		callback(null, response);
	    }
	}
    });
};

module.exports = function(app_id, api_key, url) {
    return new Qwasi(app_id, api_key, url);
};
