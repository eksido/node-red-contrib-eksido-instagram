'use strict';
var lib = require('./lib.js');

module.exports = function (RED) {
    function InstagramNode(config) {
        RED.nodes.createNode(this, config);
        this.service = RED.nodes.getNode(config.service);
        this.method = config.method;
        this.getGeographiesByGeoIdMediaRecent_geoId = config.getGeographiesByGeoIdMediaRecent_geoId;
        this.getGeographiesByGeoIdMediaRecent_geoIdType = config.getGeographiesByGeoIdMediaRecent_geoIdType || 'str';
        this.getGeographiesByGeoIdMediaRecent_count = config.getGeographiesByGeoIdMediaRecent_count;
        this.getGeographiesByGeoIdMediaRecent_countType = config.getGeographiesByGeoIdMediaRecent_countType || 'str';
        this.getGeographiesByGeoIdMediaRecent_minId = config.getGeographiesByGeoIdMediaRecent_minId;
        this.getGeographiesByGeoIdMediaRecent_minIdType = config.getGeographiesByGeoIdMediaRecent_minIdType || 'str';
        this.getLocationsSearch_distance = config.getLocationsSearch_distance;
        this.getLocationsSearch_distanceType = config.getLocationsSearch_distanceType || 'str';
        this.getLocationsSearch_facebookPlacesId = config.getLocationsSearch_facebookPlacesId;
        this.getLocationsSearch_facebookPlacesIdType = config.getLocationsSearch_facebookPlacesIdType || 'str';
        this.getLocationsSearch_foursquareId = config.getLocationsSearch_foursquareId;
        this.getLocationsSearch_foursquareIdType = config.getLocationsSearch_foursquareIdType || 'str';
        this.getLocationsSearch_lat = config.getLocationsSearch_lat;
        this.getLocationsSearch_latType = config.getLocationsSearch_latType || 'str';
        this.getLocationsSearch_lng = config.getLocationsSearch_lng;
        this.getLocationsSearch_lngType = config.getLocationsSearch_lngType || 'str';
        this.getLocationsSearch_foursquareV2Id = config.getLocationsSearch_foursquareV2Id;
        this.getLocationsSearch_foursquareV2IdType = config.getLocationsSearch_foursquareV2IdType || 'str';
        this.getLocationsByLocationId_locationId = config.getLocationsByLocationId_locationId;
        this.getLocationsByLocationId_locationIdType = config.getLocationsByLocationId_locationIdType || 'str';
        this.getLocationsByLocationIdMediaRecent_locationId = config.getLocationsByLocationIdMediaRecent_locationId;
        this.getLocationsByLocationIdMediaRecent_locationIdType = config.getLocationsByLocationIdMediaRecent_locationIdType || 'str';
        this.getLocationsByLocationIdMediaRecent_minTimestamp = config.getLocationsByLocationIdMediaRecent_minTimestamp;
        this.getLocationsByLocationIdMediaRecent_minTimestampType = config.getLocationsByLocationIdMediaRecent_minTimestampType || 'str';
        this.getLocationsByLocationIdMediaRecent_maxTimestamp = config.getLocationsByLocationIdMediaRecent_maxTimestamp;
        this.getLocationsByLocationIdMediaRecent_maxTimestampType = config.getLocationsByLocationIdMediaRecent_maxTimestampType || 'str';
        this.getLocationsByLocationIdMediaRecent_minId = config.getLocationsByLocationIdMediaRecent_minId;
        this.getLocationsByLocationIdMediaRecent_minIdType = config.getLocationsByLocationIdMediaRecent_minIdType || 'str';
        this.getLocationsByLocationIdMediaRecent_maxId = config.getLocationsByLocationIdMediaRecent_maxId;
        this.getLocationsByLocationIdMediaRecent_maxIdType = config.getLocationsByLocationIdMediaRecent_maxIdType || 'str';
        this.getMediaSearch_lat = config.getMediaSearch_lat;
        this.getMediaSearch_latType = config.getMediaSearch_latType || 'str';
        this.getMediaSearch_lng = config.getMediaSearch_lng;
        this.getMediaSearch_lngType = config.getMediaSearch_lngType || 'str';
        this.getMediaSearch_minTimestamp = config.getMediaSearch_minTimestamp;
        this.getMediaSearch_minTimestampType = config.getMediaSearch_minTimestampType || 'str';
        this.getMediaSearch_maxTimestamp = config.getMediaSearch_maxTimestamp;
        this.getMediaSearch_maxTimestampType = config.getMediaSearch_maxTimestampType || 'str';
        this.getMediaSearch_distance = config.getMediaSearch_distance;
        this.getMediaSearch_distanceType = config.getMediaSearch_distanceType || 'str';
        this.getMediaShortcodeByShortcode_shortcode = config.getMediaShortcodeByShortcode_shortcode;
        this.getMediaShortcodeByShortcode_shortcodeType = config.getMediaShortcodeByShortcode_shortcodeType || 'str';
        this.getMediaByMediaId_mediaId = config.getMediaByMediaId_mediaId;
        this.getMediaByMediaId_mediaIdType = config.getMediaByMediaId_mediaIdType || 'str';
        this.getMediaByMediaIdComments_mediaId = config.getMediaByMediaIdComments_mediaId;
        this.getMediaByMediaIdComments_mediaIdType = config.getMediaByMediaIdComments_mediaIdType || 'str';
        this.postMediaByMediaIdComments_mediaId = config.postMediaByMediaIdComments_mediaId;
        this.postMediaByMediaIdComments_mediaIdType = config.postMediaByMediaIdComments_mediaIdType || 'str';
        this.postMediaByMediaIdComments_text = config.postMediaByMediaIdComments_text;
        this.postMediaByMediaIdComments_textType = config.postMediaByMediaIdComments_textType || 'str';
        this.deleteMediaByMediaIdCommentsByCommentId_mediaId = config.deleteMediaByMediaIdCommentsByCommentId_mediaId;
        this.deleteMediaByMediaIdCommentsByCommentId_mediaIdType = config.deleteMediaByMediaIdCommentsByCommentId_mediaIdType || 'str';
        this.deleteMediaByMediaIdCommentsByCommentId_commentId = config.deleteMediaByMediaIdCommentsByCommentId_commentId;
        this.deleteMediaByMediaIdCommentsByCommentId_commentIdType = config.deleteMediaByMediaIdCommentsByCommentId_commentIdType || 'str';
        this.deleteMediaByMediaIdLikes_mediaId = config.deleteMediaByMediaIdLikes_mediaId;
        this.deleteMediaByMediaIdLikes_mediaIdType = config.deleteMediaByMediaIdLikes_mediaIdType || 'str';
        this.getMediaByMediaIdLikes_mediaId = config.getMediaByMediaIdLikes_mediaId;
        this.getMediaByMediaIdLikes_mediaIdType = config.getMediaByMediaIdLikes_mediaIdType || 'str';
        this.postMediaByMediaIdLikes_mediaId = config.postMediaByMediaIdLikes_mediaId;
        this.postMediaByMediaIdLikes_mediaIdType = config.postMediaByMediaIdLikes_mediaIdType || 'str';
        this.getTagsSearch_q = config.getTagsSearch_q;
        this.getTagsSearch_qType = config.getTagsSearch_qType || 'str';
        this.getTagsByTagName_tagName = config.getTagsByTagName_tagName;
        this.getTagsByTagName_tagNameType = config.getTagsByTagName_tagNameType || 'str';
        this.getTagsByTagNameMediaRecent_tagName = config.getTagsByTagNameMediaRecent_tagName;
        this.getTagsByTagNameMediaRecent_tagNameType = config.getTagsByTagNameMediaRecent_tagNameType || 'str';
        this.getTagsByTagNameMediaRecent_count = config.getTagsByTagNameMediaRecent_count;
        this.getTagsByTagNameMediaRecent_countType = config.getTagsByTagNameMediaRecent_countType || 'str';
        this.getTagsByTagNameMediaRecent_minTagId = config.getTagsByTagNameMediaRecent_minTagId;
        this.getTagsByTagNameMediaRecent_minTagIdType = config.getTagsByTagNameMediaRecent_minTagIdType || 'str';
        this.getTagsByTagNameMediaRecent_maxTagId = config.getTagsByTagNameMediaRecent_maxTagId;
        this.getTagsByTagNameMediaRecent_maxTagIdType = config.getTagsByTagNameMediaRecent_maxTagIdType || 'str';
        this.getUsersSearch_q = config.getUsersSearch_q;
        this.getUsersSearch_qType = config.getUsersSearch_qType || 'str';
        this.getUsersSearch_count = config.getUsersSearch_count;
        this.getUsersSearch_countType = config.getUsersSearch_countType || 'str';
        this.getUsersSelfFeed_count = config.getUsersSelfFeed_count;
        this.getUsersSelfFeed_countType = config.getUsersSelfFeed_countType || 'str';
        this.getUsersSelfFeed_minId = config.getUsersSelfFeed_minId;
        this.getUsersSelfFeed_minIdType = config.getUsersSelfFeed_minIdType || 'str';
        this.getUsersSelfFeed_maxId = config.getUsersSelfFeed_maxId;
        this.getUsersSelfFeed_maxIdType = config.getUsersSelfFeed_maxIdType || 'str';
        this.getUsersSelfMediaLiked_count = config.getUsersSelfMediaLiked_count;
        this.getUsersSelfMediaLiked_countType = config.getUsersSelfMediaLiked_countType || 'str';
        this.getUsersSelfMediaLiked_maxLikeId = config.getUsersSelfMediaLiked_maxLikeId;
        this.getUsersSelfMediaLiked_maxLikeIdType = config.getUsersSelfMediaLiked_maxLikeIdType || 'str';
        this.getUsersByUserId_userId = config.getUsersByUserId_userId;
        this.getUsersByUserId_userIdType = config.getUsersByUserId_userIdType || 'str';
        this.getUsersByUserIdFollowedBy_userId = config.getUsersByUserIdFollowedBy_userId;
        this.getUsersByUserIdFollowedBy_userIdType = config.getUsersByUserIdFollowedBy_userIdType || 'str';
        this.getUsersByUserIdFollows_userId = config.getUsersByUserIdFollows_userId;
        this.getUsersByUserIdFollows_userIdType = config.getUsersByUserIdFollows_userIdType || 'str';
        this.getUsersByUserIdMediaRecent_userId = config.getUsersByUserIdMediaRecent_userId;
        this.getUsersByUserIdMediaRecent_userIdType = config.getUsersByUserIdMediaRecent_userIdType || 'str';
        this.getUsersByUserIdMediaRecent_count = config.getUsersByUserIdMediaRecent_count;
        this.getUsersByUserIdMediaRecent_countType = config.getUsersByUserIdMediaRecent_countType || 'str';
        this.getUsersByUserIdMediaRecent_maxTimestamp = config.getUsersByUserIdMediaRecent_maxTimestamp;
        this.getUsersByUserIdMediaRecent_maxTimestampType = config.getUsersByUserIdMediaRecent_maxTimestampType || 'str';
        this.getUsersByUserIdMediaRecent_minTimestamp = config.getUsersByUserIdMediaRecent_minTimestamp;
        this.getUsersByUserIdMediaRecent_minTimestampType = config.getUsersByUserIdMediaRecent_minTimestampType || 'str';
        this.getUsersByUserIdMediaRecent_minId = config.getUsersByUserIdMediaRecent_minId;
        this.getUsersByUserIdMediaRecent_minIdType = config.getUsersByUserIdMediaRecent_minIdType || 'str';
        this.getUsersByUserIdMediaRecent_maxId = config.getUsersByUserIdMediaRecent_maxId;
        this.getUsersByUserIdMediaRecent_maxIdType = config.getUsersByUserIdMediaRecent_maxIdType || 'str';
        this.getUsersByUserIdRelationship_userId = config.getUsersByUserIdRelationship_userId;
        this.getUsersByUserIdRelationship_userIdType = config.getUsersByUserIdRelationship_userIdType || 'str';
        this.postUsersByUserIdRelationship_userId = config.postUsersByUserIdRelationship_userId;
        this.postUsersByUserIdRelationship_userIdType = config.postUsersByUserIdRelationship_userIdType || 'str';
        this.postUsersByUserIdRelationship_action = config.postUsersByUserIdRelationship_action;
        this.postUsersByUserIdRelationship_actionType = config.postUsersByUserIdRelationship_actionType || 'str';
        var node = this;

        node.on('input', function (msg) {
            var errorFlag = false;
            var client = new lib.Instagram();
            if (!errorFlag && this.service && this.service.credentials && this.service.credentials.secureTokenValue) {
                if (this.service.secureTokenIsQuery) {
                    client.setToken(this.service.credentials.secureTokenValue,
                                    this.service.secureTokenHeaderOrQueryName, true);
                } else {
                    client.setToken(this.service.credentials.secureTokenValue,
                                    this.service.secureTokenHeaderOrQueryName, false);
                }
            }
            if (!errorFlag && this.service && this.service.credentials && this.service.credentials.secureApiKeyValue) {
                if (this.service.secureApiKeyIsQuery) {
                    client.setApiKey(this.service.credentials.secureApiKeyValue,
                                     this.service.secureApiKeyHeaderOrQueryName, true);
                } else {
                    client.setApiKey(this.service.credentials.secureApiKeyValue,
                                     this.service.secureApiKeyHeaderOrQueryName, false);
                }
            }
            if (!errorFlag) {
                client.body = msg.payload;
            }

            var result;
            if (!errorFlag && node.method === 'getGeographiesByGeoIdMediaRecent') {
                var getGeographiesByGeoIdMediaRecent_parameters = [];
                var getGeographiesByGeoIdMediaRecent_nodeParam;
                var getGeographiesByGeoIdMediaRecent_nodeParamType;

                getGeographiesByGeoIdMediaRecent_nodeParam = node.getGeographiesByGeoIdMediaRecent_geoId;
                getGeographiesByGeoIdMediaRecent_nodeParamType = node.getGeographiesByGeoIdMediaRecent_geoIdType;
                if (getGeographiesByGeoIdMediaRecent_nodeParamType === 'str') {
                    getGeographiesByGeoIdMediaRecent_parameters.geoId = getGeographiesByGeoIdMediaRecent_nodeParam || '';
                } else {
                    getGeographiesByGeoIdMediaRecent_parameters.geoId = RED.util.getMessageProperty(msg, getGeographiesByGeoIdMediaRecent_nodeParam);
                }
                getGeographiesByGeoIdMediaRecent_parameters.geoId = !!getGeographiesByGeoIdMediaRecent_parameters.geoId ? getGeographiesByGeoIdMediaRecent_parameters.geoId : msg.payload;
                
                getGeographiesByGeoIdMediaRecent_nodeParam = node.getGeographiesByGeoIdMediaRecent_count;
                getGeographiesByGeoIdMediaRecent_nodeParamType = node.getGeographiesByGeoIdMediaRecent_countType;
                if (getGeographiesByGeoIdMediaRecent_nodeParamType === 'str') {
                    getGeographiesByGeoIdMediaRecent_parameters.count = getGeographiesByGeoIdMediaRecent_nodeParam || '';
                } else {
                    getGeographiesByGeoIdMediaRecent_parameters.count = RED.util.getMessageProperty(msg, getGeographiesByGeoIdMediaRecent_nodeParam);
                }
                getGeographiesByGeoIdMediaRecent_parameters.count = !!getGeographiesByGeoIdMediaRecent_parameters.count ? getGeographiesByGeoIdMediaRecent_parameters.count : msg.payload;
                
                getGeographiesByGeoIdMediaRecent_nodeParam = node.getGeographiesByGeoIdMediaRecent_minId;
                getGeographiesByGeoIdMediaRecent_nodeParamType = node.getGeographiesByGeoIdMediaRecent_minIdType;
                if (getGeographiesByGeoIdMediaRecent_nodeParamType === 'str') {
                    getGeographiesByGeoIdMediaRecent_parameters.minId = getGeographiesByGeoIdMediaRecent_nodeParam || '';
                } else {
                    getGeographiesByGeoIdMediaRecent_parameters.minId = RED.util.getMessageProperty(msg, getGeographiesByGeoIdMediaRecent_nodeParam);
                }
                getGeographiesByGeoIdMediaRecent_parameters.minId = !!getGeographiesByGeoIdMediaRecent_parameters.minId ? getGeographiesByGeoIdMediaRecent_parameters.minId : msg.payload;
                                result = client.getGeographiesByGeoIdMediaRecent(getGeographiesByGeoIdMediaRecent_parameters);
            }
            if (!errorFlag && node.method === 'getLocationsSearch') {
                var getLocationsSearch_parameters = [];
                var getLocationsSearch_nodeParam;
                var getLocationsSearch_nodeParamType;

                getLocationsSearch_nodeParam = node.getLocationsSearch_distance;
                getLocationsSearch_nodeParamType = node.getLocationsSearch_distanceType;
                if (getLocationsSearch_nodeParamType === 'str') {
                    getLocationsSearch_parameters.distance = getLocationsSearch_nodeParam || '';
                } else {
                    getLocationsSearch_parameters.distance = RED.util.getMessageProperty(msg, getLocationsSearch_nodeParam);
                }
                getLocationsSearch_parameters.distance = !!getLocationsSearch_parameters.distance ? getLocationsSearch_parameters.distance : msg.payload;
                
                getLocationsSearch_nodeParam = node.getLocationsSearch_facebookPlacesId;
                getLocationsSearch_nodeParamType = node.getLocationsSearch_facebookPlacesIdType;
                if (getLocationsSearch_nodeParamType === 'str') {
                    getLocationsSearch_parameters.facebookPlacesId = getLocationsSearch_nodeParam || '';
                } else {
                    getLocationsSearch_parameters.facebookPlacesId = RED.util.getMessageProperty(msg, getLocationsSearch_nodeParam);
                }
                getLocationsSearch_parameters.facebookPlacesId = !!getLocationsSearch_parameters.facebookPlacesId ? getLocationsSearch_parameters.facebookPlacesId : msg.payload;
                
                getLocationsSearch_nodeParam = node.getLocationsSearch_foursquareId;
                getLocationsSearch_nodeParamType = node.getLocationsSearch_foursquareIdType;
                if (getLocationsSearch_nodeParamType === 'str') {
                    getLocationsSearch_parameters.foursquareId = getLocationsSearch_nodeParam || '';
                } else {
                    getLocationsSearch_parameters.foursquareId = RED.util.getMessageProperty(msg, getLocationsSearch_nodeParam);
                }
                getLocationsSearch_parameters.foursquareId = !!getLocationsSearch_parameters.foursquareId ? getLocationsSearch_parameters.foursquareId : msg.payload;
                
                getLocationsSearch_nodeParam = node.getLocationsSearch_lat;
                getLocationsSearch_nodeParamType = node.getLocationsSearch_latType;
                if (getLocationsSearch_nodeParamType === 'str') {
                    getLocationsSearch_parameters.lat = getLocationsSearch_nodeParam || '';
                } else {
                    getLocationsSearch_parameters.lat = RED.util.getMessageProperty(msg, getLocationsSearch_nodeParam);
                }
                getLocationsSearch_parameters.lat = !!getLocationsSearch_parameters.lat ? getLocationsSearch_parameters.lat : msg.payload;
                
                getLocationsSearch_nodeParam = node.getLocationsSearch_lng;
                getLocationsSearch_nodeParamType = node.getLocationsSearch_lngType;
                if (getLocationsSearch_nodeParamType === 'str') {
                    getLocationsSearch_parameters.lng = getLocationsSearch_nodeParam || '';
                } else {
                    getLocationsSearch_parameters.lng = RED.util.getMessageProperty(msg, getLocationsSearch_nodeParam);
                }
                getLocationsSearch_parameters.lng = !!getLocationsSearch_parameters.lng ? getLocationsSearch_parameters.lng : msg.payload;
                
                getLocationsSearch_nodeParam = node.getLocationsSearch_foursquareV2Id;
                getLocationsSearch_nodeParamType = node.getLocationsSearch_foursquareV2IdType;
                if (getLocationsSearch_nodeParamType === 'str') {
                    getLocationsSearch_parameters.foursquareV2Id = getLocationsSearch_nodeParam || '';
                } else {
                    getLocationsSearch_parameters.foursquareV2Id = RED.util.getMessageProperty(msg, getLocationsSearch_nodeParam);
                }
                getLocationsSearch_parameters.foursquareV2Id = !!getLocationsSearch_parameters.foursquareV2Id ? getLocationsSearch_parameters.foursquareV2Id : msg.payload;
                                result = client.getLocationsSearch(getLocationsSearch_parameters);
            }
            if (!errorFlag && node.method === 'getLocationsByLocationId') {
                var getLocationsByLocationId_parameters = [];
                var getLocationsByLocationId_nodeParam;
                var getLocationsByLocationId_nodeParamType;

                getLocationsByLocationId_nodeParam = node.getLocationsByLocationId_locationId;
                getLocationsByLocationId_nodeParamType = node.getLocationsByLocationId_locationIdType;
                if (getLocationsByLocationId_nodeParamType === 'str') {
                    getLocationsByLocationId_parameters.locationId = getLocationsByLocationId_nodeParam || '';
                } else {
                    getLocationsByLocationId_parameters.locationId = RED.util.getMessageProperty(msg, getLocationsByLocationId_nodeParam);
                }
                getLocationsByLocationId_parameters.locationId = !!getLocationsByLocationId_parameters.locationId ? getLocationsByLocationId_parameters.locationId : msg.payload;
                                result = client.getLocationsByLocationId(getLocationsByLocationId_parameters);
            }
            if (!errorFlag && node.method === 'getLocationsByLocationIdMediaRecent') {
                var getLocationsByLocationIdMediaRecent_parameters = [];
                var getLocationsByLocationIdMediaRecent_nodeParam;
                var getLocationsByLocationIdMediaRecent_nodeParamType;

                getLocationsByLocationIdMediaRecent_nodeParam = node.getLocationsByLocationIdMediaRecent_locationId;
                getLocationsByLocationIdMediaRecent_nodeParamType = node.getLocationsByLocationIdMediaRecent_locationIdType;
                if (getLocationsByLocationIdMediaRecent_nodeParamType === 'str') {
                    getLocationsByLocationIdMediaRecent_parameters.locationId = getLocationsByLocationIdMediaRecent_nodeParam || '';
                } else {
                    getLocationsByLocationIdMediaRecent_parameters.locationId = RED.util.getMessageProperty(msg, getLocationsByLocationIdMediaRecent_nodeParam);
                }
                getLocationsByLocationIdMediaRecent_parameters.locationId = !!getLocationsByLocationIdMediaRecent_parameters.locationId ? getLocationsByLocationIdMediaRecent_parameters.locationId : msg.payload;
                
                getLocationsByLocationIdMediaRecent_nodeParam = node.getLocationsByLocationIdMediaRecent_minTimestamp;
                getLocationsByLocationIdMediaRecent_nodeParamType = node.getLocationsByLocationIdMediaRecent_minTimestampType;
                if (getLocationsByLocationIdMediaRecent_nodeParamType === 'str') {
                    getLocationsByLocationIdMediaRecent_parameters.minTimestamp = getLocationsByLocationIdMediaRecent_nodeParam || '';
                } else {
                    getLocationsByLocationIdMediaRecent_parameters.minTimestamp = RED.util.getMessageProperty(msg, getLocationsByLocationIdMediaRecent_nodeParam);
                }
                getLocationsByLocationIdMediaRecent_parameters.minTimestamp = !!getLocationsByLocationIdMediaRecent_parameters.minTimestamp ? getLocationsByLocationIdMediaRecent_parameters.minTimestamp : msg.payload;
                
                getLocationsByLocationIdMediaRecent_nodeParam = node.getLocationsByLocationIdMediaRecent_maxTimestamp;
                getLocationsByLocationIdMediaRecent_nodeParamType = node.getLocationsByLocationIdMediaRecent_maxTimestampType;
                if (getLocationsByLocationIdMediaRecent_nodeParamType === 'str') {
                    getLocationsByLocationIdMediaRecent_parameters.maxTimestamp = getLocationsByLocationIdMediaRecent_nodeParam || '';
                } else {
                    getLocationsByLocationIdMediaRecent_parameters.maxTimestamp = RED.util.getMessageProperty(msg, getLocationsByLocationIdMediaRecent_nodeParam);
                }
                getLocationsByLocationIdMediaRecent_parameters.maxTimestamp = !!getLocationsByLocationIdMediaRecent_parameters.maxTimestamp ? getLocationsByLocationIdMediaRecent_parameters.maxTimestamp : msg.payload;
                
                getLocationsByLocationIdMediaRecent_nodeParam = node.getLocationsByLocationIdMediaRecent_minId;
                getLocationsByLocationIdMediaRecent_nodeParamType = node.getLocationsByLocationIdMediaRecent_minIdType;
                if (getLocationsByLocationIdMediaRecent_nodeParamType === 'str') {
                    getLocationsByLocationIdMediaRecent_parameters.minId = getLocationsByLocationIdMediaRecent_nodeParam || '';
                } else {
                    getLocationsByLocationIdMediaRecent_parameters.minId = RED.util.getMessageProperty(msg, getLocationsByLocationIdMediaRecent_nodeParam);
                }
                getLocationsByLocationIdMediaRecent_parameters.minId = !!getLocationsByLocationIdMediaRecent_parameters.minId ? getLocationsByLocationIdMediaRecent_parameters.minId : msg.payload;
                
                getLocationsByLocationIdMediaRecent_nodeParam = node.getLocationsByLocationIdMediaRecent_maxId;
                getLocationsByLocationIdMediaRecent_nodeParamType = node.getLocationsByLocationIdMediaRecent_maxIdType;
                if (getLocationsByLocationIdMediaRecent_nodeParamType === 'str') {
                    getLocationsByLocationIdMediaRecent_parameters.maxId = getLocationsByLocationIdMediaRecent_nodeParam || '';
                } else {
                    getLocationsByLocationIdMediaRecent_parameters.maxId = RED.util.getMessageProperty(msg, getLocationsByLocationIdMediaRecent_nodeParam);
                }
                getLocationsByLocationIdMediaRecent_parameters.maxId = !!getLocationsByLocationIdMediaRecent_parameters.maxId ? getLocationsByLocationIdMediaRecent_parameters.maxId : msg.payload;
                                result = client.getLocationsByLocationIdMediaRecent(getLocationsByLocationIdMediaRecent_parameters);
            }
            if (!errorFlag && node.method === 'getMediaPopular') {
                var getMediaPopular_parameters = [];
                var getMediaPopular_nodeParam;
                var getMediaPopular_nodeParamType;
                result = client.getMediaPopular(getMediaPopular_parameters);
            }
            if (!errorFlag && node.method === 'getMediaSearch') {
                var getMediaSearch_parameters = [];
                var getMediaSearch_nodeParam;
                var getMediaSearch_nodeParamType;

                getMediaSearch_nodeParam = node.getMediaSearch_lat;
                getMediaSearch_nodeParamType = node.getMediaSearch_latType;
                if (getMediaSearch_nodeParamType === 'str') {
                    getMediaSearch_parameters.lat = getMediaSearch_nodeParam || '';
                } else {
                    getMediaSearch_parameters.lat = RED.util.getMessageProperty(msg, getMediaSearch_nodeParam);
                }
                getMediaSearch_parameters.lat = !!getMediaSearch_parameters.lat ? getMediaSearch_parameters.lat : msg.payload;
                
                getMediaSearch_nodeParam = node.getMediaSearch_lng;
                getMediaSearch_nodeParamType = node.getMediaSearch_lngType;
                if (getMediaSearch_nodeParamType === 'str') {
                    getMediaSearch_parameters.lng = getMediaSearch_nodeParam || '';
                } else {
                    getMediaSearch_parameters.lng = RED.util.getMessageProperty(msg, getMediaSearch_nodeParam);
                }
                getMediaSearch_parameters.lng = !!getMediaSearch_parameters.lng ? getMediaSearch_parameters.lng : msg.payload;
                
                getMediaSearch_nodeParam = node.getMediaSearch_minTimestamp;
                getMediaSearch_nodeParamType = node.getMediaSearch_minTimestampType;
                if (getMediaSearch_nodeParamType === 'str') {
                    getMediaSearch_parameters.minTimestamp = getMediaSearch_nodeParam || '';
                } else {
                    getMediaSearch_parameters.minTimestamp = RED.util.getMessageProperty(msg, getMediaSearch_nodeParam);
                }
                getMediaSearch_parameters.minTimestamp = !!getMediaSearch_parameters.minTimestamp ? getMediaSearch_parameters.minTimestamp : msg.payload;
                
                getMediaSearch_nodeParam = node.getMediaSearch_maxTimestamp;
                getMediaSearch_nodeParamType = node.getMediaSearch_maxTimestampType;
                if (getMediaSearch_nodeParamType === 'str') {
                    getMediaSearch_parameters.maxTimestamp = getMediaSearch_nodeParam || '';
                } else {
                    getMediaSearch_parameters.maxTimestamp = RED.util.getMessageProperty(msg, getMediaSearch_nodeParam);
                }
                getMediaSearch_parameters.maxTimestamp = !!getMediaSearch_parameters.maxTimestamp ? getMediaSearch_parameters.maxTimestamp : msg.payload;
                
                getMediaSearch_nodeParam = node.getMediaSearch_distance;
                getMediaSearch_nodeParamType = node.getMediaSearch_distanceType;
                if (getMediaSearch_nodeParamType === 'str') {
                    getMediaSearch_parameters.distance = getMediaSearch_nodeParam || '';
                } else {
                    getMediaSearch_parameters.distance = RED.util.getMessageProperty(msg, getMediaSearch_nodeParam);
                }
                getMediaSearch_parameters.distance = !!getMediaSearch_parameters.distance ? getMediaSearch_parameters.distance : msg.payload;
                                result = client.getMediaSearch(getMediaSearch_parameters);
            }
            if (!errorFlag && node.method === 'getMediaShortcodeByShortcode') {
                var getMediaShortcodeByShortcode_parameters = [];
                var getMediaShortcodeByShortcode_nodeParam;
                var getMediaShortcodeByShortcode_nodeParamType;

                getMediaShortcodeByShortcode_nodeParam = node.getMediaShortcodeByShortcode_shortcode;
                getMediaShortcodeByShortcode_nodeParamType = node.getMediaShortcodeByShortcode_shortcodeType;
                if (getMediaShortcodeByShortcode_nodeParamType === 'str') {
                    getMediaShortcodeByShortcode_parameters.shortcode = getMediaShortcodeByShortcode_nodeParam || '';
                } else {
                    getMediaShortcodeByShortcode_parameters.shortcode = RED.util.getMessageProperty(msg, getMediaShortcodeByShortcode_nodeParam);
                }
                getMediaShortcodeByShortcode_parameters.shortcode = !!getMediaShortcodeByShortcode_parameters.shortcode ? getMediaShortcodeByShortcode_parameters.shortcode : msg.payload;
                                result = client.getMediaShortcodeByShortcode(getMediaShortcodeByShortcode_parameters);
            }
            if (!errorFlag && node.method === 'getMediaByMediaId') {
                var getMediaByMediaId_parameters = [];
                var getMediaByMediaId_nodeParam;
                var getMediaByMediaId_nodeParamType;

                getMediaByMediaId_nodeParam = node.getMediaByMediaId_mediaId;
                getMediaByMediaId_nodeParamType = node.getMediaByMediaId_mediaIdType;
                if (getMediaByMediaId_nodeParamType === 'str') {
                    getMediaByMediaId_parameters.mediaId = getMediaByMediaId_nodeParam || '';
                } else {
                    getMediaByMediaId_parameters.mediaId = RED.util.getMessageProperty(msg, getMediaByMediaId_nodeParam);
                }
                getMediaByMediaId_parameters.mediaId = !!getMediaByMediaId_parameters.mediaId ? getMediaByMediaId_parameters.mediaId : msg.payload;
                                result = client.getMediaByMediaId(getMediaByMediaId_parameters);
            }
            if (!errorFlag && node.method === 'getMediaByMediaIdComments') {
                var getMediaByMediaIdComments_parameters = [];
                var getMediaByMediaIdComments_nodeParam;
                var getMediaByMediaIdComments_nodeParamType;

                getMediaByMediaIdComments_nodeParam = node.getMediaByMediaIdComments_mediaId;
                getMediaByMediaIdComments_nodeParamType = node.getMediaByMediaIdComments_mediaIdType;
                if (getMediaByMediaIdComments_nodeParamType === 'str') {
                    getMediaByMediaIdComments_parameters.mediaId = getMediaByMediaIdComments_nodeParam || '';
                } else {
                    getMediaByMediaIdComments_parameters.mediaId = RED.util.getMessageProperty(msg, getMediaByMediaIdComments_nodeParam);
                }
                getMediaByMediaIdComments_parameters.mediaId = !!getMediaByMediaIdComments_parameters.mediaId ? getMediaByMediaIdComments_parameters.mediaId : msg.payload;
                                result = client.getMediaByMediaIdComments(getMediaByMediaIdComments_parameters);
            }
            if (!errorFlag && node.method === 'postMediaByMediaIdComments') {
                var postMediaByMediaIdComments_parameters = [];
                var postMediaByMediaIdComments_nodeParam;
                var postMediaByMediaIdComments_nodeParamType;

                postMediaByMediaIdComments_nodeParam = node.postMediaByMediaIdComments_mediaId;
                postMediaByMediaIdComments_nodeParamType = node.postMediaByMediaIdComments_mediaIdType;
                if (postMediaByMediaIdComments_nodeParamType === 'str') {
                    postMediaByMediaIdComments_parameters.mediaId = postMediaByMediaIdComments_nodeParam || '';
                } else {
                    postMediaByMediaIdComments_parameters.mediaId = RED.util.getMessageProperty(msg, postMediaByMediaIdComments_nodeParam);
                }
                postMediaByMediaIdComments_parameters.mediaId = !!postMediaByMediaIdComments_parameters.mediaId ? postMediaByMediaIdComments_parameters.mediaId : msg.payload;
                
                postMediaByMediaIdComments_nodeParam = node.postMediaByMediaIdComments_text;
                postMediaByMediaIdComments_nodeParamType = node.postMediaByMediaIdComments_textType;
                if (postMediaByMediaIdComments_nodeParamType === 'str') {
                    postMediaByMediaIdComments_parameters.text = postMediaByMediaIdComments_nodeParam || '';
                } else {
                    postMediaByMediaIdComments_parameters.text = RED.util.getMessageProperty(msg, postMediaByMediaIdComments_nodeParam);
                }
                postMediaByMediaIdComments_parameters.text = !!postMediaByMediaIdComments_parameters.text ? postMediaByMediaIdComments_parameters.text : msg.payload;
                                result = client.postMediaByMediaIdComments(postMediaByMediaIdComments_parameters);
            }
            if (!errorFlag && node.method === 'deleteMediaByMediaIdCommentsByCommentId') {
                var deleteMediaByMediaIdCommentsByCommentId_parameters = [];
                var deleteMediaByMediaIdCommentsByCommentId_nodeParam;
                var deleteMediaByMediaIdCommentsByCommentId_nodeParamType;

                deleteMediaByMediaIdCommentsByCommentId_nodeParam = node.deleteMediaByMediaIdCommentsByCommentId_mediaId;
                deleteMediaByMediaIdCommentsByCommentId_nodeParamType = node.deleteMediaByMediaIdCommentsByCommentId_mediaIdType;
                if (deleteMediaByMediaIdCommentsByCommentId_nodeParamType === 'str') {
                    deleteMediaByMediaIdCommentsByCommentId_parameters.mediaId = deleteMediaByMediaIdCommentsByCommentId_nodeParam || '';
                } else {
                    deleteMediaByMediaIdCommentsByCommentId_parameters.mediaId = RED.util.getMessageProperty(msg, deleteMediaByMediaIdCommentsByCommentId_nodeParam);
                }
                deleteMediaByMediaIdCommentsByCommentId_parameters.mediaId = !!deleteMediaByMediaIdCommentsByCommentId_parameters.mediaId ? deleteMediaByMediaIdCommentsByCommentId_parameters.mediaId : msg.payload;
                
                deleteMediaByMediaIdCommentsByCommentId_nodeParam = node.deleteMediaByMediaIdCommentsByCommentId_commentId;
                deleteMediaByMediaIdCommentsByCommentId_nodeParamType = node.deleteMediaByMediaIdCommentsByCommentId_commentIdType;
                if (deleteMediaByMediaIdCommentsByCommentId_nodeParamType === 'str') {
                    deleteMediaByMediaIdCommentsByCommentId_parameters.commentId = deleteMediaByMediaIdCommentsByCommentId_nodeParam || '';
                } else {
                    deleteMediaByMediaIdCommentsByCommentId_parameters.commentId = RED.util.getMessageProperty(msg, deleteMediaByMediaIdCommentsByCommentId_nodeParam);
                }
                deleteMediaByMediaIdCommentsByCommentId_parameters.commentId = !!deleteMediaByMediaIdCommentsByCommentId_parameters.commentId ? deleteMediaByMediaIdCommentsByCommentId_parameters.commentId : msg.payload;
                                result = client.deleteMediaByMediaIdCommentsByCommentId(deleteMediaByMediaIdCommentsByCommentId_parameters);
            }
            if (!errorFlag && node.method === 'deleteMediaByMediaIdLikes') {
                var deleteMediaByMediaIdLikes_parameters = [];
                var deleteMediaByMediaIdLikes_nodeParam;
                var deleteMediaByMediaIdLikes_nodeParamType;

                deleteMediaByMediaIdLikes_nodeParam = node.deleteMediaByMediaIdLikes_mediaId;
                deleteMediaByMediaIdLikes_nodeParamType = node.deleteMediaByMediaIdLikes_mediaIdType;
                if (deleteMediaByMediaIdLikes_nodeParamType === 'str') {
                    deleteMediaByMediaIdLikes_parameters.mediaId = deleteMediaByMediaIdLikes_nodeParam || '';
                } else {
                    deleteMediaByMediaIdLikes_parameters.mediaId = RED.util.getMessageProperty(msg, deleteMediaByMediaIdLikes_nodeParam);
                }
                deleteMediaByMediaIdLikes_parameters.mediaId = !!deleteMediaByMediaIdLikes_parameters.mediaId ? deleteMediaByMediaIdLikes_parameters.mediaId : msg.payload;
                                result = client.deleteMediaByMediaIdLikes(deleteMediaByMediaIdLikes_parameters);
            }
            if (!errorFlag && node.method === 'getMediaByMediaIdLikes') {
                var getMediaByMediaIdLikes_parameters = [];
                var getMediaByMediaIdLikes_nodeParam;
                var getMediaByMediaIdLikes_nodeParamType;

                getMediaByMediaIdLikes_nodeParam = node.getMediaByMediaIdLikes_mediaId;
                getMediaByMediaIdLikes_nodeParamType = node.getMediaByMediaIdLikes_mediaIdType;
                if (getMediaByMediaIdLikes_nodeParamType === 'str') {
                    getMediaByMediaIdLikes_parameters.mediaId = getMediaByMediaIdLikes_nodeParam || '';
                } else {
                    getMediaByMediaIdLikes_parameters.mediaId = RED.util.getMessageProperty(msg, getMediaByMediaIdLikes_nodeParam);
                }
                getMediaByMediaIdLikes_parameters.mediaId = !!getMediaByMediaIdLikes_parameters.mediaId ? getMediaByMediaIdLikes_parameters.mediaId : msg.payload;
                                result = client.getMediaByMediaIdLikes(getMediaByMediaIdLikes_parameters);
            }
            if (!errorFlag && node.method === 'postMediaByMediaIdLikes') {
                var postMediaByMediaIdLikes_parameters = [];
                var postMediaByMediaIdLikes_nodeParam;
                var postMediaByMediaIdLikes_nodeParamType;

                postMediaByMediaIdLikes_nodeParam = node.postMediaByMediaIdLikes_mediaId;
                postMediaByMediaIdLikes_nodeParamType = node.postMediaByMediaIdLikes_mediaIdType;
                if (postMediaByMediaIdLikes_nodeParamType === 'str') {
                    postMediaByMediaIdLikes_parameters.mediaId = postMediaByMediaIdLikes_nodeParam || '';
                } else {
                    postMediaByMediaIdLikes_parameters.mediaId = RED.util.getMessageProperty(msg, postMediaByMediaIdLikes_nodeParam);
                }
                postMediaByMediaIdLikes_parameters.mediaId = !!postMediaByMediaIdLikes_parameters.mediaId ? postMediaByMediaIdLikes_parameters.mediaId : msg.payload;
                                result = client.postMediaByMediaIdLikes(postMediaByMediaIdLikes_parameters);
            }
            if (!errorFlag && node.method === 'getTagsSearch') {
                var getTagsSearch_parameters = [];
                var getTagsSearch_nodeParam;
                var getTagsSearch_nodeParamType;

                getTagsSearch_nodeParam = node.getTagsSearch_q;
                getTagsSearch_nodeParamType = node.getTagsSearch_qType;
                if (getTagsSearch_nodeParamType === 'str') {
                    getTagsSearch_parameters.q = getTagsSearch_nodeParam || '';
                } else {
                    getTagsSearch_parameters.q = RED.util.getMessageProperty(msg, getTagsSearch_nodeParam);
                }
                getTagsSearch_parameters.q = !!getTagsSearch_parameters.q ? getTagsSearch_parameters.q : msg.payload;
                                result = client.getTagsSearch(getTagsSearch_parameters);
            }
            if (!errorFlag && node.method === 'getTagsByTagName') {
                var getTagsByTagName_parameters = [];
                var getTagsByTagName_nodeParam;
                var getTagsByTagName_nodeParamType;

                getTagsByTagName_nodeParam = node.getTagsByTagName_tagName;
                getTagsByTagName_nodeParamType = node.getTagsByTagName_tagNameType;
                if (getTagsByTagName_nodeParamType === 'str') {
                    getTagsByTagName_parameters.tagName = getTagsByTagName_nodeParam || '';
                } else {
                    getTagsByTagName_parameters.tagName = RED.util.getMessageProperty(msg, getTagsByTagName_nodeParam);
                }
                getTagsByTagName_parameters.tagName = !!getTagsByTagName_parameters.tagName ? getTagsByTagName_parameters.tagName : msg.payload;
                                result = client.getTagsByTagName(getTagsByTagName_parameters);
            }
            if (!errorFlag && node.method === 'getTagsByTagNameMediaRecent') {
                var getTagsByTagNameMediaRecent_parameters = [];
                var getTagsByTagNameMediaRecent_nodeParam;
                var getTagsByTagNameMediaRecent_nodeParamType;

                getTagsByTagNameMediaRecent_nodeParam = node.getTagsByTagNameMediaRecent_tagName;
                getTagsByTagNameMediaRecent_nodeParamType = node.getTagsByTagNameMediaRecent_tagNameType;
                if (getTagsByTagNameMediaRecent_nodeParamType === 'str') {
                    getTagsByTagNameMediaRecent_parameters.tagName = getTagsByTagNameMediaRecent_nodeParam || '';
                } else {
                    getTagsByTagNameMediaRecent_parameters.tagName = RED.util.getMessageProperty(msg, getTagsByTagNameMediaRecent_nodeParam);
                }
                getTagsByTagNameMediaRecent_parameters.tagName = !!getTagsByTagNameMediaRecent_parameters.tagName ? getTagsByTagNameMediaRecent_parameters.tagName : msg.payload;
                
                getTagsByTagNameMediaRecent_nodeParam = node.getTagsByTagNameMediaRecent_count;
                getTagsByTagNameMediaRecent_nodeParamType = node.getTagsByTagNameMediaRecent_countType;
                if (getTagsByTagNameMediaRecent_nodeParamType === 'str') {
                    getTagsByTagNameMediaRecent_parameters.count = getTagsByTagNameMediaRecent_nodeParam || '';
                } else {
                    getTagsByTagNameMediaRecent_parameters.count = RED.util.getMessageProperty(msg, getTagsByTagNameMediaRecent_nodeParam);
                }
                getTagsByTagNameMediaRecent_parameters.count = !!getTagsByTagNameMediaRecent_parameters.count ? getTagsByTagNameMediaRecent_parameters.count : msg.payload;
                
                getTagsByTagNameMediaRecent_nodeParam = node.getTagsByTagNameMediaRecent_minTagId;
                getTagsByTagNameMediaRecent_nodeParamType = node.getTagsByTagNameMediaRecent_minTagIdType;
                if (getTagsByTagNameMediaRecent_nodeParamType === 'str') {
                    getTagsByTagNameMediaRecent_parameters.minTagId = getTagsByTagNameMediaRecent_nodeParam || '';
                } else {
                    getTagsByTagNameMediaRecent_parameters.minTagId = RED.util.getMessageProperty(msg, getTagsByTagNameMediaRecent_nodeParam);
                }
                getTagsByTagNameMediaRecent_parameters.minTagId = !!getTagsByTagNameMediaRecent_parameters.minTagId ? getTagsByTagNameMediaRecent_parameters.minTagId : msg.payload;
                
                getTagsByTagNameMediaRecent_nodeParam = node.getTagsByTagNameMediaRecent_maxTagId;
                getTagsByTagNameMediaRecent_nodeParamType = node.getTagsByTagNameMediaRecent_maxTagIdType;
                if (getTagsByTagNameMediaRecent_nodeParamType === 'str') {
                    getTagsByTagNameMediaRecent_parameters.maxTagId = getTagsByTagNameMediaRecent_nodeParam || '';
                } else {
                    getTagsByTagNameMediaRecent_parameters.maxTagId = RED.util.getMessageProperty(msg, getTagsByTagNameMediaRecent_nodeParam);
                }
                getTagsByTagNameMediaRecent_parameters.maxTagId = !!getTagsByTagNameMediaRecent_parameters.maxTagId ? getTagsByTagNameMediaRecent_parameters.maxTagId : msg.payload;
                                result = client.getTagsByTagNameMediaRecent(getTagsByTagNameMediaRecent_parameters);
            }
            if (!errorFlag && node.method === 'getUsersSearch') {
                var getUsersSearch_parameters = [];
                var getUsersSearch_nodeParam;
                var getUsersSearch_nodeParamType;

                getUsersSearch_nodeParam = node.getUsersSearch_q;
                getUsersSearch_nodeParamType = node.getUsersSearch_qType;
                if (getUsersSearch_nodeParamType === 'str') {
                    getUsersSearch_parameters.q = getUsersSearch_nodeParam || '';
                } else {
                    getUsersSearch_parameters.q = RED.util.getMessageProperty(msg, getUsersSearch_nodeParam);
                }
                getUsersSearch_parameters.q = !!getUsersSearch_parameters.q ? getUsersSearch_parameters.q : msg.payload;
                
                getUsersSearch_nodeParam = node.getUsersSearch_count;
                getUsersSearch_nodeParamType = node.getUsersSearch_countType;
                if (getUsersSearch_nodeParamType === 'str') {
                    getUsersSearch_parameters.count = getUsersSearch_nodeParam || '';
                } else {
                    getUsersSearch_parameters.count = RED.util.getMessageProperty(msg, getUsersSearch_nodeParam);
                }
                getUsersSearch_parameters.count = !!getUsersSearch_parameters.count ? getUsersSearch_parameters.count : msg.payload;
                                result = client.getUsersSearch(getUsersSearch_parameters);
            }
            if (!errorFlag && node.method === 'getUsersSelfFeed') {
                var getUsersSelfFeed_parameters = [];
                var getUsersSelfFeed_nodeParam;
                var getUsersSelfFeed_nodeParamType;

                getUsersSelfFeed_nodeParam = node.getUsersSelfFeed_count;
                getUsersSelfFeed_nodeParamType = node.getUsersSelfFeed_countType;
                if (getUsersSelfFeed_nodeParamType === 'str') {
                    getUsersSelfFeed_parameters.count = getUsersSelfFeed_nodeParam || '';
                } else {
                    getUsersSelfFeed_parameters.count = RED.util.getMessageProperty(msg, getUsersSelfFeed_nodeParam);
                }
                getUsersSelfFeed_parameters.count = !!getUsersSelfFeed_parameters.count ? getUsersSelfFeed_parameters.count : msg.payload;
                
                getUsersSelfFeed_nodeParam = node.getUsersSelfFeed_minId;
                getUsersSelfFeed_nodeParamType = node.getUsersSelfFeed_minIdType;
                if (getUsersSelfFeed_nodeParamType === 'str') {
                    getUsersSelfFeed_parameters.minId = getUsersSelfFeed_nodeParam || '';
                } else {
                    getUsersSelfFeed_parameters.minId = RED.util.getMessageProperty(msg, getUsersSelfFeed_nodeParam);
                }
                getUsersSelfFeed_parameters.minId = !!getUsersSelfFeed_parameters.minId ? getUsersSelfFeed_parameters.minId : msg.payload;
                
                getUsersSelfFeed_nodeParam = node.getUsersSelfFeed_maxId;
                getUsersSelfFeed_nodeParamType = node.getUsersSelfFeed_maxIdType;
                if (getUsersSelfFeed_nodeParamType === 'str') {
                    getUsersSelfFeed_parameters.maxId = getUsersSelfFeed_nodeParam || '';
                } else {
                    getUsersSelfFeed_parameters.maxId = RED.util.getMessageProperty(msg, getUsersSelfFeed_nodeParam);
                }
                getUsersSelfFeed_parameters.maxId = !!getUsersSelfFeed_parameters.maxId ? getUsersSelfFeed_parameters.maxId : msg.payload;
                                result = client.getUsersSelfFeed(getUsersSelfFeed_parameters);
            }
            if (!errorFlag && node.method === 'getUsersSelfMediaLiked') {
                var getUsersSelfMediaLiked_parameters = [];
                var getUsersSelfMediaLiked_nodeParam;
                var getUsersSelfMediaLiked_nodeParamType;

                getUsersSelfMediaLiked_nodeParam = node.getUsersSelfMediaLiked_count;
                getUsersSelfMediaLiked_nodeParamType = node.getUsersSelfMediaLiked_countType;
                if (getUsersSelfMediaLiked_nodeParamType === 'str') {
                    getUsersSelfMediaLiked_parameters.count = getUsersSelfMediaLiked_nodeParam || '';
                } else {
                    getUsersSelfMediaLiked_parameters.count = RED.util.getMessageProperty(msg, getUsersSelfMediaLiked_nodeParam);
                }
                getUsersSelfMediaLiked_parameters.count = !!getUsersSelfMediaLiked_parameters.count ? getUsersSelfMediaLiked_parameters.count : msg.payload;
                
                getUsersSelfMediaLiked_nodeParam = node.getUsersSelfMediaLiked_maxLikeId;
                getUsersSelfMediaLiked_nodeParamType = node.getUsersSelfMediaLiked_maxLikeIdType;
                if (getUsersSelfMediaLiked_nodeParamType === 'str') {
                    getUsersSelfMediaLiked_parameters.maxLikeId = getUsersSelfMediaLiked_nodeParam || '';
                } else {
                    getUsersSelfMediaLiked_parameters.maxLikeId = RED.util.getMessageProperty(msg, getUsersSelfMediaLiked_nodeParam);
                }
                getUsersSelfMediaLiked_parameters.maxLikeId = !!getUsersSelfMediaLiked_parameters.maxLikeId ? getUsersSelfMediaLiked_parameters.maxLikeId : msg.payload;
                                result = client.getUsersSelfMediaLiked(getUsersSelfMediaLiked_parameters);
            }
            if (!errorFlag && node.method === 'getUsersSelfRequestedBy') {
                var getUsersSelfRequestedBy_parameters = [];
                var getUsersSelfRequestedBy_nodeParam;
                var getUsersSelfRequestedBy_nodeParamType;
                result = client.getUsersSelfRequestedBy(getUsersSelfRequestedBy_parameters);
            }
            if (!errorFlag && node.method === 'getUsersByUserId') {
                var getUsersByUserId_parameters = [];
                var getUsersByUserId_nodeParam;
                var getUsersByUserId_nodeParamType;

                getUsersByUserId_nodeParam = node.getUsersByUserId_userId;
                getUsersByUserId_nodeParamType = node.getUsersByUserId_userIdType;
                if (getUsersByUserId_nodeParamType === 'str') {
                    getUsersByUserId_parameters.userId = getUsersByUserId_nodeParam || '';
                } else {
                    getUsersByUserId_parameters.userId = RED.util.getMessageProperty(msg, getUsersByUserId_nodeParam);
                }
                getUsersByUserId_parameters.userId = !!getUsersByUserId_parameters.userId ? getUsersByUserId_parameters.userId : msg.payload;
                                result = client.getUsersByUserId(getUsersByUserId_parameters);
            }
            if (!errorFlag && node.method === 'getUsersByUserIdFollowedBy') {
                var getUsersByUserIdFollowedBy_parameters = [];
                var getUsersByUserIdFollowedBy_nodeParam;
                var getUsersByUserIdFollowedBy_nodeParamType;

                getUsersByUserIdFollowedBy_nodeParam = node.getUsersByUserIdFollowedBy_userId;
                getUsersByUserIdFollowedBy_nodeParamType = node.getUsersByUserIdFollowedBy_userIdType;
                if (getUsersByUserIdFollowedBy_nodeParamType === 'str') {
                    getUsersByUserIdFollowedBy_parameters.userId = getUsersByUserIdFollowedBy_nodeParam || '';
                } else {
                    getUsersByUserIdFollowedBy_parameters.userId = RED.util.getMessageProperty(msg, getUsersByUserIdFollowedBy_nodeParam);
                }
                getUsersByUserIdFollowedBy_parameters.userId = !!getUsersByUserIdFollowedBy_parameters.userId ? getUsersByUserIdFollowedBy_parameters.userId : msg.payload;
                                result = client.getUsersByUserIdFollowedBy(getUsersByUserIdFollowedBy_parameters);
            }
            if (!errorFlag && node.method === 'getUsersByUserIdFollows') {
                var getUsersByUserIdFollows_parameters = [];
                var getUsersByUserIdFollows_nodeParam;
                var getUsersByUserIdFollows_nodeParamType;

                getUsersByUserIdFollows_nodeParam = node.getUsersByUserIdFollows_userId;
                getUsersByUserIdFollows_nodeParamType = node.getUsersByUserIdFollows_userIdType;
                if (getUsersByUserIdFollows_nodeParamType === 'str') {
                    getUsersByUserIdFollows_parameters.userId = getUsersByUserIdFollows_nodeParam || '';
                } else {
                    getUsersByUserIdFollows_parameters.userId = RED.util.getMessageProperty(msg, getUsersByUserIdFollows_nodeParam);
                }
                getUsersByUserIdFollows_parameters.userId = !!getUsersByUserIdFollows_parameters.userId ? getUsersByUserIdFollows_parameters.userId : msg.payload;
                                result = client.getUsersByUserIdFollows(getUsersByUserIdFollows_parameters);
            }
            if (!errorFlag && node.method === 'getUsersByUserIdMediaRecent') {
                var getUsersByUserIdMediaRecent_parameters = [];
                var getUsersByUserIdMediaRecent_nodeParam;
                var getUsersByUserIdMediaRecent_nodeParamType;

                getUsersByUserIdMediaRecent_nodeParam = node.getUsersByUserIdMediaRecent_userId;
                getUsersByUserIdMediaRecent_nodeParamType = node.getUsersByUserIdMediaRecent_userIdType;
                if (getUsersByUserIdMediaRecent_nodeParamType === 'str') {
                    getUsersByUserIdMediaRecent_parameters.userId = getUsersByUserIdMediaRecent_nodeParam || '';
                } else {
                    getUsersByUserIdMediaRecent_parameters.userId = RED.util.getMessageProperty(msg, getUsersByUserIdMediaRecent_nodeParam);
                }
                getUsersByUserIdMediaRecent_parameters.userId = !!getUsersByUserIdMediaRecent_parameters.userId ? getUsersByUserIdMediaRecent_parameters.userId : msg.payload;
                
                getUsersByUserIdMediaRecent_nodeParam = node.getUsersByUserIdMediaRecent_count;
                getUsersByUserIdMediaRecent_nodeParamType = node.getUsersByUserIdMediaRecent_countType;
                if (getUsersByUserIdMediaRecent_nodeParamType === 'str') {
                    getUsersByUserIdMediaRecent_parameters.count = getUsersByUserIdMediaRecent_nodeParam || '';
                } else {
                    getUsersByUserIdMediaRecent_parameters.count = RED.util.getMessageProperty(msg, getUsersByUserIdMediaRecent_nodeParam);
                }
                getUsersByUserIdMediaRecent_parameters.count = !!getUsersByUserIdMediaRecent_parameters.count ? getUsersByUserIdMediaRecent_parameters.count : msg.payload;
                
                getUsersByUserIdMediaRecent_nodeParam = node.getUsersByUserIdMediaRecent_maxTimestamp;
                getUsersByUserIdMediaRecent_nodeParamType = node.getUsersByUserIdMediaRecent_maxTimestampType;
                if (getUsersByUserIdMediaRecent_nodeParamType === 'str') {
                    getUsersByUserIdMediaRecent_parameters.maxTimestamp = getUsersByUserIdMediaRecent_nodeParam || '';
                } else {
                    getUsersByUserIdMediaRecent_parameters.maxTimestamp = RED.util.getMessageProperty(msg, getUsersByUserIdMediaRecent_nodeParam);
                }
                getUsersByUserIdMediaRecent_parameters.maxTimestamp = !!getUsersByUserIdMediaRecent_parameters.maxTimestamp ? getUsersByUserIdMediaRecent_parameters.maxTimestamp : msg.payload;
                
                getUsersByUserIdMediaRecent_nodeParam = node.getUsersByUserIdMediaRecent_minTimestamp;
                getUsersByUserIdMediaRecent_nodeParamType = node.getUsersByUserIdMediaRecent_minTimestampType;
                if (getUsersByUserIdMediaRecent_nodeParamType === 'str') {
                    getUsersByUserIdMediaRecent_parameters.minTimestamp = getUsersByUserIdMediaRecent_nodeParam || '';
                } else {
                    getUsersByUserIdMediaRecent_parameters.minTimestamp = RED.util.getMessageProperty(msg, getUsersByUserIdMediaRecent_nodeParam);
                }
                getUsersByUserIdMediaRecent_parameters.minTimestamp = !!getUsersByUserIdMediaRecent_parameters.minTimestamp ? getUsersByUserIdMediaRecent_parameters.minTimestamp : msg.payload;
                
                getUsersByUserIdMediaRecent_nodeParam = node.getUsersByUserIdMediaRecent_minId;
                getUsersByUserIdMediaRecent_nodeParamType = node.getUsersByUserIdMediaRecent_minIdType;
                if (getUsersByUserIdMediaRecent_nodeParamType === 'str') {
                    getUsersByUserIdMediaRecent_parameters.minId = getUsersByUserIdMediaRecent_nodeParam || '';
                } else {
                    getUsersByUserIdMediaRecent_parameters.minId = RED.util.getMessageProperty(msg, getUsersByUserIdMediaRecent_nodeParam);
                }
                getUsersByUserIdMediaRecent_parameters.minId = !!getUsersByUserIdMediaRecent_parameters.minId ? getUsersByUserIdMediaRecent_parameters.minId : msg.payload;
                
                getUsersByUserIdMediaRecent_nodeParam = node.getUsersByUserIdMediaRecent_maxId;
                getUsersByUserIdMediaRecent_nodeParamType = node.getUsersByUserIdMediaRecent_maxIdType;
                if (getUsersByUserIdMediaRecent_nodeParamType === 'str') {
                    getUsersByUserIdMediaRecent_parameters.maxId = getUsersByUserIdMediaRecent_nodeParam || '';
                } else {
                    getUsersByUserIdMediaRecent_parameters.maxId = RED.util.getMessageProperty(msg, getUsersByUserIdMediaRecent_nodeParam);
                }
                getUsersByUserIdMediaRecent_parameters.maxId = !!getUsersByUserIdMediaRecent_parameters.maxId ? getUsersByUserIdMediaRecent_parameters.maxId : msg.payload;
                                result = client.getUsersByUserIdMediaRecent(getUsersByUserIdMediaRecent_parameters);
            }
            if (!errorFlag && node.method === 'getUsersByUserIdRelationship') {
                var getUsersByUserIdRelationship_parameters = [];
                var getUsersByUserIdRelationship_nodeParam;
                var getUsersByUserIdRelationship_nodeParamType;

                getUsersByUserIdRelationship_nodeParam = node.getUsersByUserIdRelationship_userId;
                getUsersByUserIdRelationship_nodeParamType = node.getUsersByUserIdRelationship_userIdType;
                if (getUsersByUserIdRelationship_nodeParamType === 'str') {
                    getUsersByUserIdRelationship_parameters.userId = getUsersByUserIdRelationship_nodeParam || '';
                } else {
                    getUsersByUserIdRelationship_parameters.userId = RED.util.getMessageProperty(msg, getUsersByUserIdRelationship_nodeParam);
                }
                getUsersByUserIdRelationship_parameters.userId = !!getUsersByUserIdRelationship_parameters.userId ? getUsersByUserIdRelationship_parameters.userId : msg.payload;
                                result = client.getUsersByUserIdRelationship(getUsersByUserIdRelationship_parameters);
            }
            if (!errorFlag && node.method === 'postUsersByUserIdRelationship') {
                var postUsersByUserIdRelationship_parameters = [];
                var postUsersByUserIdRelationship_nodeParam;
                var postUsersByUserIdRelationship_nodeParamType;

                postUsersByUserIdRelationship_nodeParam = node.postUsersByUserIdRelationship_userId;
                postUsersByUserIdRelationship_nodeParamType = node.postUsersByUserIdRelationship_userIdType;
                if (postUsersByUserIdRelationship_nodeParamType === 'str') {
                    postUsersByUserIdRelationship_parameters.userId = postUsersByUserIdRelationship_nodeParam || '';
                } else {
                    postUsersByUserIdRelationship_parameters.userId = RED.util.getMessageProperty(msg, postUsersByUserIdRelationship_nodeParam);
                }
                postUsersByUserIdRelationship_parameters.userId = !!postUsersByUserIdRelationship_parameters.userId ? postUsersByUserIdRelationship_parameters.userId : msg.payload;
                
                postUsersByUserIdRelationship_nodeParam = node.postUsersByUserIdRelationship_action;
                postUsersByUserIdRelationship_nodeParamType = node.postUsersByUserIdRelationship_actionType;
                if (postUsersByUserIdRelationship_nodeParamType === 'str') {
                    postUsersByUserIdRelationship_parameters.action = postUsersByUserIdRelationship_nodeParam || '';
                } else {
                    postUsersByUserIdRelationship_parameters.action = RED.util.getMessageProperty(msg, postUsersByUserIdRelationship_nodeParam);
                }
                postUsersByUserIdRelationship_parameters.action = !!postUsersByUserIdRelationship_parameters.action ? postUsersByUserIdRelationship_parameters.action : msg.payload;
                                result = client.postUsersByUserIdRelationship(postUsersByUserIdRelationship_parameters);
            }
            if (!errorFlag && result === undefined) {
                node.error('Method is not specified.', msg);
                errorFlag = true;
            }
            var setData = function (msg, data) {
                if (data) {
                    if (data.response) {
                        if (data.response.statusCode) {
                            msg.statusCode = data.response.statusCode;
                        }
                        if (data.response.headers) {
                            msg.headers = data.response.headers;
                        }
                        if (data.response.request && data.response.request.uri && data.response.request.uri.href) {
                            msg.responseUrl = data.response.request.uri.href;
                        }
                    }
                    if (data.body) {
                        msg.payload = data.body;
                    }
                }
                return msg;
            };
            if (!errorFlag) {
                node.status({ fill: 'blue', shape: 'dot', text: 'Instagram.status.requesting' });
                result.then(function (data) {
                    node.send(setData(msg, data));
                    node.status({});
                }).catch(function (error) {
                    var message = null;
                    if (error && error.body && error.body.message) {
                        message = error.body.message;
                    }
                    node.error(message, setData(msg, error));
                    node.status({ fill: 'red', shape: 'ring', text: 'node-red:common.status.error' });
                });
            }
        });
    }

    RED.nodes.registerType('eksido-instagram', InstagramNode);
    function InstagramServiceNode(n) {
        RED.nodes.createNode(this, n);

        this.secureTokenValue = n.secureTokenValue;
        this.secureTokenHeaderOrQueryName = n.secureTokenHeaderOrQueryName;
        this.secureTokenIsQuery = n.secureTokenIsQuery;
        this.secureApiKeyValue = n.secureApiKeyValue;
        this.secureApiKeyHeaderOrQueryName = n.secureApiKeyHeaderOrQueryName;
        this.secureApiKeyIsQuery = n.secureApiKeyIsQuery;
    }

    RED.nodes.registerType('eksido-instagram-service', InstagramServiceNode, {
        credentials: {
            secureTokenValue: { type: 'password' },
            secureApiKeyValue: { type: 'password' },
            temp: { type: 'text' }
        }
    });
};
