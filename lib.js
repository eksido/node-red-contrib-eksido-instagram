/*jshint -W069 */
/**
 * Description of Instagram RESTful API.

Current limitations:
  * Instagram service does not support [cross origin headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
  for security reasons, therefore it is not possible to use Swagger UI and make API calls directly from browser.
  * Modification API requests (`POST`, `DELETE`) require additional security [scopes](https://instagram.com/developer/authorization/)
  that are available for Apps [created on or after Nov 17, 2015](http://instagram.com/developer/review/) and
  started in [Sandbox Mode](http://instagram.com/developer/sandbox/).
  * Consider the [Instagram limitations](https://instagram.com/developer/limits/) for API calls that depends on App Mode.

**Warning:** For Apps [created on or after Nov 17, 2015](http://instagram.com/developer/changelog/) API responses
containing media objects no longer return the `data` field in `comments` and `likes` nodes.

Last update: 2015-11-28

 * @class Instagram
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var Instagram = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function Instagram(options){
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'https://api.instagram.com/v1';
        if(this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
                this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
                this.apiKey = (typeof options === 'object') ? (options.apiKey ? options.apiKey : {}) : {};
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                  .forEach(function(parameterName) {
                      var parameter = parameters.$queryParameters[parameterName];
                      queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name Instagram#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    Instagram.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if(Object.keys(form).length > 0) {
            if (req.headers['Content-Type'] && req.headers['Content-Type'][0] === 'multipart/form-data') {
                delete req.body;
                var keyName = Object.keys(form)[0]
                req.formData = {
                    [keyName]: {
                        value: form[keyName],
                        options: {
                            filename: (fileType(form[keyName]) != null ? `file.${ fileType(form[keyName]).ext }` : `file` )
                        }
                    }
                };
            } else {
                req.form = form;
            }
        }
        if(typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body){
            if(error) {
                deferred.reject(error);
            } else {
                if(/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch(e) {}
                }
                if(response.statusCode === 204) {
                    deferred.resolve({ response: response });
                } else if(response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });
    };

            /**
            * Set Token
            * @method
            * @name Instagram#setToken
            * @param {string} value - token's value
            * @param {string} headerOrQueryName - the header or query name to send the token at
            * @param {boolean} isQuery - true if send the token as query param, otherwise, send as header param
            */
            Instagram.prototype.setToken = function (value, headerOrQueryName, isQuery) {
                this.token.value = value;
                this.token.headerOrQueryName = headerOrQueryName;
                this.token.isQuery = isQuery;
            };
            /**
            * Set Api Key
            * @method
            * @name Instagram#setApiKey
            * @param {string} value - apiKey's value
            * @param {string} headerOrQueryName - the header or query name to send the apiKey at
            * @param {boolean} isQuery - true if send the apiKey as query param, otherwise, send as header param
            */
            Instagram.prototype.setApiKey = function (value, headerOrQueryName, isQuery) {
                this.apiKey.value = value;
                this.apiKey.headerOrQueryName = headerOrQueryName;
                this.apiKey.isQuery = isQuery;
            };
        /**
        * Set Auth headers
        * @method
        * @name Instagram#setAuthHeaders
        * @param {object} headerParams - headers object
        */
        Instagram.prototype.setAuthHeaders = function (headerParams) {
            var headers = headerParams ? headerParams : {};
            if (!this.token.isQuery) {
                if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.value) {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }
            }
            if (!this.apiKey.isQuery && this.apiKey.headerOrQueryName) {
                headers[this.apiKey.headerOrQueryName] = this.apiKey.value;
            }
            return headers;
        };

/**
 * Get recent media from a geography subscription that you created.

**Note:** You can only access Geographies that were explicitly created by your OAuth client. Check the
Geography Subscriptions section of the [real-time updates page](https://instagram.com/developer/realtime/).
When you create a subscription to some geography that you define, you will be returned a unique `geo-id` that
can be used in this query. To backfill photos from the location covered by this geography, use the
[media search endpoint](https://instagram.com/developer/endpoints/media/).

**Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015

 * @method
 * @name Instagram#getGeographiesByGeoIdMediaRecent
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.geoId - The geography ID.
     * @param {integer} parameters.count - Max number of media to return.
     * @param {string} parameters.minId - Return media before this `min_id`.
 */
 Instagram.prototype.getGeographiesByGeoIdMediaRecent = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/geographies/{geo-id}/media/recent';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{geo-id}', parameters['geoId']);
        
        


        if(parameters['geoId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: geoId'));
            return deferred.promise;
        }
 

                if(parameters['count'] !== undefined){
                    queryParameters['count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['minId'] !== undefined){
                    queryParameters['min_id'] = parameters['minId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Search for a location by geographic coordinate.
 * @method
 * @name Instagram#getLocationsSearch
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.distance - Default is 1000m (distance=1000), max distance is 5000.
     * @param {string} parameters.facebookPlacesId - Returns a location mapped off of a Facebook places id. If used, a Foursquare id and `lat`, `lng` are not required.
     * @param {string} parameters.foursquareId - Returns a location mapped off of a foursquare v1 api location id. If used, you are not required to use
`lat` and `lng`. Note that this method is deprecated; you should use the new foursquare IDs with V2 of their API.

     * @param {number} parameters.lat - Latitude of the center search coordinate. If used, `lng` is required.
     * @param {number} parameters.lng - Longitude of the center search coordinate. If used, `lat` is required.
     * @param {string} parameters.foursquareV2Id - Returns a location mapped off of a foursquare v2 api location id. If used, you are not required to use
`lat` and `lng`.

 */
 Instagram.prototype.getLocationsSearch = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/locations/search';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['distance'] !== undefined){
                    queryParameters['distance'] = parameters['distance'];
                }
        
        
        


 

                if(parameters['facebookPlacesId'] !== undefined){
                    queryParameters['facebook_places_id'] = parameters['facebookPlacesId'];
                }
        
        
        


 

                if(parameters['foursquareId'] !== undefined){
                    queryParameters['foursquare_id'] = parameters['foursquareId'];
                }
        
        
        


 

                if(parameters['lat'] !== undefined){
                    queryParameters['lat'] = parameters['lat'];
                }
        
        
        


 

                if(parameters['lng'] !== undefined){
                    queryParameters['lng'] = parameters['lng'];
                }
        
        
        


 

                if(parameters['foursquareV2Id'] !== undefined){
                    queryParameters['foursquare_v2_id'] = parameters['foursquareV2Id'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get information about a location.
 * @method
 * @name Instagram#getLocationsByLocationId
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.locationId - The location ID.
 */
 Instagram.prototype.getLocationsByLocationId = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/locations/{location-id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{location-id}', parameters['locationId']);
        
        


        if(parameters['locationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: locationId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a list of recent media objects from a given location.
 * @method
 * @name Instagram#getLocationsByLocationIdMediaRecent
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.locationId - The location ID.
     * @param {integer} parameters.minTimestamp - Return media after this UNIX timestamp.
     * @param {integer} parameters.maxTimestamp - Return media before this UNIX timestamp.
     * @param {string} parameters.minId - Return media before this `min_id`.
     * @param {string} parameters.maxId - Return media after this `max_id`.
 */
 Instagram.prototype.getLocationsByLocationIdMediaRecent = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/locations/{location-id}/media/recent';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{location-id}', parameters['locationId']);
        
        


        if(parameters['locationId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: locationId'));
            return deferred.promise;
        }
 

                if(parameters['minTimestamp'] !== undefined){
                    queryParameters['min_timestamp'] = parameters['minTimestamp'];
                }
        
        
        


 

                if(parameters['maxTimestamp'] !== undefined){
                    queryParameters['max_timestamp'] = parameters['maxTimestamp'];
                }
        
        
        


 

                if(parameters['minId'] !== undefined){
                    queryParameters['min_id'] = parameters['minId'];
                }
        
        
        


 

                if(parameters['maxId'] !== undefined){
                    queryParameters['max_id'] = parameters['maxId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a list of what media is most popular at the moment. Can return mix of `image` and `video` types.

**Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015

 * @method
 * @name Instagram#getMediaPopular
 * @param {object} parameters - method options and parameters
 */
 Instagram.prototype.getMediaPopular = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/media/popular';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Search for media in a given area. The default time span is set to 5 days. The time span must not exceed 7 days.
Defaults time stamps cover the last 5 days. Can return mix of `image` and `video` types.

 * @method
 * @name Instagram#getMediaSearch
 * @param {object} parameters - method options and parameters
     * @param {number} parameters.lat - Latitude of the center search coordinate. If used, `lng` is required.
     * @param {number} parameters.lng - Longitude of the center search coordinate. If used, `lat` is required.
     * @param {integer} parameters.minTimestamp - A unix timestamp. All media returned will be taken later than this timestamp.
     * @param {integer} parameters.maxTimestamp - A unix timestamp. All media returned will be taken earlier than this timestamp.
     * @param {integer} parameters.distance - Default is 1km (distance=1000), max distance is 5km.
 */
 Instagram.prototype.getMediaSearch = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/media/search';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['lat'] !== undefined){
                    queryParameters['lat'] = parameters['lat'];
                }
        
        
        


        if(parameters['lat'] === undefined){
            deferred.reject(new Error('Missing required  parameter: lat'));
            return deferred.promise;
        }
 

                if(parameters['lng'] !== undefined){
                    queryParameters['lng'] = parameters['lng'];
                }
        
        
        


        if(parameters['lng'] === undefined){
            deferred.reject(new Error('Missing required  parameter: lng'));
            return deferred.promise;
        }
 

                if(parameters['minTimestamp'] !== undefined){
                    queryParameters['min_timestamp'] = parameters['minTimestamp'];
                }
        
        
        


 

                if(parameters['maxTimestamp'] !== undefined){
                    queryParameters['max_timestamp'] = parameters['maxTimestamp'];
                }
        
        
        


 

                if(parameters['distance'] !== undefined){
                    queryParameters['distance'] = parameters['distance'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * This endpoint returns the same response as `GET /media/{media-id}`.

A media object's shortcode can be found in its shortlink URL. An example shortlink is
`http://instagram.com/p/D/`, its corresponding shortcode is `D`.

 * @method
 * @name Instagram#getMediaShortcodeByShortcode
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.shortcode - The short code of the media resource.
 */
 Instagram.prototype.getMediaShortcodeByShortcode = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/media/shortcode/{shortcode}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{shortcode}', parameters['shortcode']);
        
        


        if(parameters['shortcode'] === undefined){
            deferred.reject(new Error('Missing required  parameter: shortcode'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get information about a media object. The returned type key will allow you to differentiate between image and
video media.

**Note:** if you authenticate with an OAuth Token, you will receive the user_has_liked key which quickly tells
you whether the current user has liked this media item.

 * @method
 * @name Instagram#getMediaByMediaId
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.mediaId - The ID of the media resource.
 */
 Instagram.prototype.getMediaByMediaId = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/media/{media-id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{media-id}', parameters['mediaId']);
        
        


        if(parameters['mediaId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: mediaId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a list of recent comments on a media object.
 * @method
 * @name Instagram#getMediaByMediaIdComments
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.mediaId - The ID of the media resource.
 */
 Instagram.prototype.getMediaByMediaIdComments = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/media/{media-id}/comments';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{media-id}', parameters['mediaId']);
        
        


        if(parameters['mediaId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: mediaId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Create a comment on a media object with the following rules:

  * The total length of the comment cannot exceed 300 characters.
  * The comment cannot contain more than 4 hashtags.
  * The comment cannot contain more than 1 URL.
  * The comment cannot consist of all capital letters.

 * @method
 * @name Instagram#postMediaByMediaIdComments
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.mediaId - The ID of the media resource.
     * @param {string} parameters.text - Text to post as a comment on the media object as specified in `media-id`.
 */
 Instagram.prototype.postMediaByMediaIdComments = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/media/{media-id}/comments';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{media-id}', parameters['mediaId']);
        
        


        if(parameters['mediaId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: mediaId'));
            return deferred.promise;
        }
 

                if(parameters['text'] !== undefined){
                    queryParameters['text'] = parameters['text'];
                }
        
        
        


        if(parameters['text'] === undefined){
            deferred.reject(new Error('Missing required  parameter: text'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Remove a comment either on the authenticated user's media object or authored by the authenticated user.

 * @method
 * @name Instagram#deleteMediaByMediaIdCommentsByCommentId
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.mediaId - The ID of the media resource.
     * @param {string} parameters.commentId - The ID of the comment entry.
 */
 Instagram.prototype.deleteMediaByMediaIdCommentsByCommentId = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/media/{media-id}/comments/{comment-id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{media-id}', parameters['mediaId']);
        
        


        if(parameters['mediaId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: mediaId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{comment-id}', parameters['commentId']);
        
        


        if(parameters['commentId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: commentId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Remove a like on this media by the currently authenticated user.
 * @method
 * @name Instagram#deleteMediaByMediaIdLikes
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.mediaId - The ID of the media resource.
 */
 Instagram.prototype.deleteMediaByMediaIdLikes = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/media/{media-id}/likes';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{media-id}', parameters['mediaId']);
        
        


        if(parameters['mediaId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: mediaId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a list of users who have liked this media.
 * @method
 * @name Instagram#getMediaByMediaIdLikes
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.mediaId - The ID of the media resource.
 */
 Instagram.prototype.getMediaByMediaIdLikes = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/media/{media-id}/likes';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{media-id}', parameters['mediaId']);
        
        


        if(parameters['mediaId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: mediaId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Set a like on this media by the currently authenticated user.
 * @method
 * @name Instagram#postMediaByMediaIdLikes
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.mediaId - The ID of the media resource.
 */
 Instagram.prototype.postMediaByMediaIdLikes = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/media/{media-id}/likes';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{media-id}', parameters['mediaId']);
        
        


        if(parameters['mediaId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: mediaId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Search for tags by name.
 * @method
 * @name Instagram#getTagsSearch
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.q - A valid tag name without a leading \#. (eg. snowy, nofilter)
 */
 Instagram.prototype.getTagsSearch = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/tags/search';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['q'] !== undefined){
                    queryParameters['q'] = parameters['q'];
                }
        
        
        


        if(parameters['q'] === undefined){
            deferred.reject(new Error('Missing required  parameter: q'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get information about a tag object.
 * @method
 * @name Instagram#getTagsByTagName
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tagName - The tag name.
 */
 Instagram.prototype.getTagsByTagName = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/tags/{tag-name}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{tag-name}', parameters['tagName']);
        
        


        if(parameters['tagName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tagName'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get a list of recently tagged media. Use the `max_tag_id` and `min_tag_id` parameters in the pagination
response to paginate through these objects.

 * @method
 * @name Instagram#getTagsByTagNameMediaRecent
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.tagName - The tag name.
     * @param {integer} parameters.count - Count of tagged media to return.
     * @param {string} parameters.minTagId - Return media before this `min_tag_id`.
     * @param {string} parameters.maxTagId - Return media after this `max_tag_id`.
 */
 Instagram.prototype.getTagsByTagNameMediaRecent = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/tags/{tag-name}/media/recent';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{tag-name}', parameters['tagName']);
        
        


        if(parameters['tagName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: tagName'));
            return deferred.promise;
        }
 

                if(parameters['count'] !== undefined){
                    queryParameters['count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['minTagId'] !== undefined){
                    queryParameters['min_tag_id'] = parameters['minTagId'];
                }
        
        
        


 

                if(parameters['maxTagId'] !== undefined){
                    queryParameters['max_tag_id'] = parameters['maxTagId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Search for a user by name.
 * @method
 * @name Instagram#getUsersSearch
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.q - A query string.
     * @param {integer} parameters.count - Number of users to return.
 */
 Instagram.prototype.getUsersSearch = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/users/search';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['q'] !== undefined){
                    queryParameters['q'] = parameters['q'];
                }
        
        
        


        if(parameters['q'] === undefined){
            deferred.reject(new Error('Missing required  parameter: q'));
            return deferred.promise;
        }
 

                if(parameters['count'] !== undefined){
                    queryParameters['count'] = parameters['count'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * See the authenticated user's feed.

**Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015

 * @method
 * @name Instagram#getUsersSelfFeed
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.count - Count of media to return.
     * @param {string} parameters.minId - Return media later than this `min_id`.
     * @param {string} parameters.maxId - Return media earlier than this `max_id`.
 */
 Instagram.prototype.getUsersSelfFeed = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/users/self/feed';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['count'] !== undefined){
                    queryParameters['count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['minId'] !== undefined){
                    queryParameters['min_id'] = parameters['minId'];
                }
        
        
        


 

                if(parameters['maxId'] !== undefined){
                    queryParameters['max_id'] = parameters['maxId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * See the list of media liked by the authenticated user. Private media is returned as long as the authenticated
user has permission to view that media. Liked media lists are only available for the currently authenticated
user.

 * @method
 * @name Instagram#getUsersSelfMediaLiked
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.count - Count of media to return.
     * @param {string} parameters.maxLikeId - Return media liked before this id.
 */
 Instagram.prototype.getUsersSelfMediaLiked = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/users/self/media/liked';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['count'] !== undefined){
                    queryParameters['count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['maxLikeId'] !== undefined){
                    queryParameters['max_like_id'] = parameters['maxLikeId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * List the users who have requested this user's permission to follow.
 * @method
 * @name Instagram#getUsersSelfRequestedBy
 * @param {object} parameters - method options and parameters
 */
 Instagram.prototype.getUsersSelfRequestedBy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/users/self/requested-by';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get basic information about a user. To get information about the owner of the access token, you can use
**self** instead of the `user-id`.

Security scope `public_content` is required to read information about other users.

 * @method
 * @name Instagram#getUsersByUserId
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userId - The ID of a user to get information about, or **self** to retrieve information about authenticated user.
 */
 Instagram.prototype.getUsersByUserId = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/users/{user-id}';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{user-id}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the list of users this user is followed by. To get users followed by the owner of the access token, you
can use **self** instead of the `user-id`.

 * @method
 * @name Instagram#getUsersByUserIdFollowedBy
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userId - The ID of a user, or **self** to retrieve information about authenticated user.
 */
 Instagram.prototype.getUsersByUserIdFollowedBy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/users/{user-id}/followed-by';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{user-id}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the list of users this user follows. To get follows of the owner of the access token, you can use **self**
instead of the `user-id`.

 * @method
 * @name Instagram#getUsersByUserIdFollows
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userId - The ID of a user, or **self** to retrieve information about authenticated user.
 */
 Instagram.prototype.getUsersByUserIdFollows = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/users/{user-id}/follows';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{user-id}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get the most recent media published by a user. To get the most recent media published by the owner of the
access token, you can use **self** instead of the `user-id`.

Security scope `public_content` is required to read information about other users.

 * @method
 * @name Instagram#getUsersByUserIdMediaRecent
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userId - The ID of a user to get recent media of, or **self** to retrieve media of authenticated user.
     * @param {integer} parameters.count - Count of media to return.
     * @param {integer} parameters.maxTimestamp - Return media before this UNIX timestamp.
     * @param {integer} parameters.minTimestamp - Return media after this UNIX timestamp.
     * @param {string} parameters.minId - Return media later than this `min_id`.
     * @param {string} parameters.maxId - Return media earlier than this `max_id`.
 */
 Instagram.prototype.getUsersByUserIdMediaRecent = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/users/{user-id}/media/recent';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{user-id}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 

                if(parameters['count'] !== undefined){
                    queryParameters['count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['maxTimestamp'] !== undefined){
                    queryParameters['max_timestamp'] = parameters['maxTimestamp'];
                }
        
        
        


 

                if(parameters['minTimestamp'] !== undefined){
                    queryParameters['min_timestamp'] = parameters['minTimestamp'];
                }
        
        
        


 

                if(parameters['minId'] !== undefined){
                    queryParameters['min_id'] = parameters['minId'];
                }
        
        
        


 

                if(parameters['maxId'] !== undefined){
                    queryParameters['max_id'] = parameters['maxId'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get information about a relationship to another user.
 * @method
 * @name Instagram#getUsersByUserIdRelationship
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userId - The ID of a user to get information about.
 */
 Instagram.prototype.getUsersByUserIdRelationship = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/users/{user-id}/relationship';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{user-id}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Modify the relationship between the current user and the target user.
 * @method
 * @name Instagram#postUsersByUserIdRelationship
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.userId - The ID of the target user.
     * @param {string} parameters.action - Type of action to apply for relationship with the user.
 */
 Instagram.prototype.postUsersByUserIdRelationship = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/users/{user-id}/relationship';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{user-id}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 

                if(parameters['action'] !== undefined){
                    queryParameters['action'] = parameters['action'];
                }
        
        
        


        if(parameters['action'] === undefined){
            deferred.reject(new Error('Missing required  parameter: action'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return Instagram;
})();

exports.Instagram = Instagram;
