var should = require('should');
var helper = require('node-red-node-test-helper');
var node = require('../node.js');

helper.init(require.resolve('node-red'));

describe('eksido-instagram node', function () {

    before(function (done) {
        helper.startServer(done);
    });

    after(function (done) {
        helper.stopServer(done);
    });

    afterEach(function () {
        helper.unload();
    });

    it('should be loaded', function (done) {
        var flow = [{ id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram' }];
        helper.load(node, flow, function () {
            var n1 = helper.getNode('n1');
            n1.should.have.property('name', 'eksido-instagram');
            done();
        });
    });

    it('should handle getGeographiesByGeoIdMediaRecent()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getGeographiesByGeoIdMediaRecent',
                getGeographiesByGeoIdMediaRecent_geoId: '<node property>', // (1) define node properties
                getGeographiesByGeoIdMediaRecent_count: '<node property>', // (1) define node properties
                getGeographiesByGeoIdMediaRecent_minId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getLocationsSearch()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getLocationsSearch',
                getLocationsSearch_distance: '<node property>', // (1) define node properties
                getLocationsSearch_facebookPlacesId: '<node property>', // (1) define node properties
                getLocationsSearch_foursquareId: '<node property>', // (1) define node properties
                getLocationsSearch_lat: '<node property>', // (1) define node properties
                getLocationsSearch_lng: '<node property>', // (1) define node properties
                getLocationsSearch_foursquareV2Id: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getLocationsByLocationId()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getLocationsByLocationId',
                getLocationsByLocationId_locationId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getLocationsByLocationIdMediaRecent()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getLocationsByLocationIdMediaRecent',
                getLocationsByLocationIdMediaRecent_locationId: '<node property>', // (1) define node properties
                getLocationsByLocationIdMediaRecent_minTimestamp: '<node property>', // (1) define node properties
                getLocationsByLocationIdMediaRecent_maxTimestamp: '<node property>', // (1) define node properties
                getLocationsByLocationIdMediaRecent_minId: '<node property>', // (1) define node properties
                getLocationsByLocationIdMediaRecent_maxId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getMediaPopular()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getMediaPopular',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getMediaSearch()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getMediaSearch',
                getMediaSearch_lat: '<node property>', // (1) define node properties
                getMediaSearch_lng: '<node property>', // (1) define node properties
                getMediaSearch_minTimestamp: '<node property>', // (1) define node properties
                getMediaSearch_maxTimestamp: '<node property>', // (1) define node properties
                getMediaSearch_distance: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getMediaShortcodeByShortcode()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getMediaShortcodeByShortcode',
                getMediaShortcodeByShortcode_shortcode: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getMediaByMediaId()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getMediaByMediaId',
                getMediaByMediaId_mediaId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getMediaByMediaIdComments()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getMediaByMediaIdComments',
                getMediaByMediaIdComments_mediaId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle postMediaByMediaIdComments()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'postMediaByMediaIdComments',
                postMediaByMediaIdComments_mediaId: '<node property>', // (1) define node properties
                postMediaByMediaIdComments_text: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteMediaByMediaIdCommentsByCommentId()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'deleteMediaByMediaIdCommentsByCommentId',
                deleteMediaByMediaIdCommentsByCommentId_mediaId: '<node property>', // (1) define node properties
                deleteMediaByMediaIdCommentsByCommentId_commentId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle deleteMediaByMediaIdLikes()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'deleteMediaByMediaIdLikes',
                deleteMediaByMediaIdLikes_mediaId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getMediaByMediaIdLikes()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getMediaByMediaIdLikes',
                getMediaByMediaIdLikes_mediaId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle postMediaByMediaIdLikes()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'postMediaByMediaIdLikes',
                postMediaByMediaIdLikes_mediaId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTagsSearch()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getTagsSearch',
                getTagsSearch_q: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTagsByTagName()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getTagsByTagName',
                getTagsByTagName_tagName: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getTagsByTagNameMediaRecent()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getTagsByTagNameMediaRecent',
                getTagsByTagNameMediaRecent_tagName: '<node property>', // (1) define node properties
                getTagsByTagNameMediaRecent_count: '<node property>', // (1) define node properties
                getTagsByTagNameMediaRecent_minTagId: '<node property>', // (1) define node properties
                getTagsByTagNameMediaRecent_maxTagId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUsersSearch()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getUsersSearch',
                getUsersSearch_q: '<node property>', // (1) define node properties
                getUsersSearch_count: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUsersSelfFeed()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getUsersSelfFeed',
                getUsersSelfFeed_count: '<node property>', // (1) define node properties
                getUsersSelfFeed_minId: '<node property>', // (1) define node properties
                getUsersSelfFeed_maxId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUsersSelfMediaLiked()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getUsersSelfMediaLiked',
                getUsersSelfMediaLiked_count: '<node property>', // (1) define node properties
                getUsersSelfMediaLiked_maxLikeId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUsersSelfRequestedBy()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getUsersSelfRequestedBy',
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUsersByUserId()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getUsersByUserId',
                getUsersByUserId_userId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUsersByUserIdFollowedBy()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getUsersByUserIdFollowedBy',
                getUsersByUserIdFollowedBy_userId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUsersByUserIdFollows()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getUsersByUserIdFollows',
                getUsersByUserIdFollows_userId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUsersByUserIdMediaRecent()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getUsersByUserIdMediaRecent',
                getUsersByUserIdMediaRecent_userId: '<node property>', // (1) define node properties
                getUsersByUserIdMediaRecent_count: '<node property>', // (1) define node properties
                getUsersByUserIdMediaRecent_maxTimestamp: '<node property>', // (1) define node properties
                getUsersByUserIdMediaRecent_minTimestamp: '<node property>', // (1) define node properties
                getUsersByUserIdMediaRecent_minId: '<node property>', // (1) define node properties
                getUsersByUserIdMediaRecent_maxId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle getUsersByUserIdRelationship()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'getUsersByUserIdRelationship',
                getUsersByUserIdRelationship_userId: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
    it('should handle postUsersByUserIdRelationship()', function (done) {
        var flow = [
            { id: 'n1', type: 'eksido-instagram', name: 'eksido-instagram',
                method: 'postUsersByUserIdRelationship',
                postUsersByUserIdRelationship_userId: '<node property>', // (1) define node properties
                postUsersByUserIdRelationship_action: '<node property>', // (1) define node properties
                wires: [['n3']],
                service: 'n2' },
            { id: 'n2', type: 'eksido-instagram-service', host: 'http://<host name>' }, // (4) define host name
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', '<output message>'); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: '<input message>' }); // (2) define input message
        });
    });
});
