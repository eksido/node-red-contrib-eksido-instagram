node-red-contrib-eksido-instagram
=====================

Node-RED node for eksido-instagram

Description of Instagram RESTful API.

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


Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install node-red-contrib-eksido-instagram

Usage
-----

### Methods

- getGeographiesByGeoIdMediaRecent

    Get recent media from a geography subscription that you created.

**Note:** You can only access Geographies that were explicitly created by your OAuth client. Check the
Geography Subscriptions section of the [real-time updates page](https://instagram.com/developer/realtime/).
When you create a subscription to some geography that you define, you will be returned a unique `geo-id` that
can be used in this query. To backfill photos from the location covered by this geography, use the
[media search endpoint](https://instagram.com/developer/endpoints/media/).

**Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015


- getLocationsSearch

    Search for a location by geographic coordinate.

- getLocationsByLocationId

    Get information about a location.

- getLocationsByLocationIdMediaRecent

    Get a list of recent media objects from a given location.

- getMediaPopular

    Get a list of what media is most popular at the moment. Can return mix of `image` and `video` types.

**Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015


- getMediaSearch

    Search for media in a given area. The default time span is set to 5 days. The time span must not exceed 7 days.
Defaults time stamps cover the last 5 days. Can return mix of `image` and `video` types.


- getMediaShortcodeByShortcode

    This endpoint returns the same response as `GET /media/{media-id}`.

A media object's shortcode can be found in its shortlink URL. An example shortlink is
`http://instagram.com/p/D/`, its corresponding shortcode is `D`.


- getMediaByMediaId

    Get information about a media object. The returned type key will allow you to differentiate between image and
video media.

**Note:** if you authenticate with an OAuth Token, you will receive the user_has_liked key which quickly tells
you whether the current user has liked this media item.


- getMediaByMediaIdComments

    Get a list of recent comments on a media object.

- postMediaByMediaIdComments

    Create a comment on a media object with the following rules:

  * The total length of the comment cannot exceed 300 characters.
  * The comment cannot contain more than 4 hashtags.
  * The comment cannot contain more than 1 URL.
  * The comment cannot consist of all capital letters.


- deleteMediaByMediaIdCommentsByCommentId

    Remove a comment either on the authenticated user's media object or authored by the authenticated user.


- deleteMediaByMediaIdLikes

    Remove a like on this media by the currently authenticated user.

- getMediaByMediaIdLikes

    Get a list of users who have liked this media.

- postMediaByMediaIdLikes

    Set a like on this media by the currently authenticated user.

- getTagsSearch

    Search for tags by name.

- getTagsByTagName

    Get information about a tag object.

- getTagsByTagNameMediaRecent

    Get a list of recently tagged media. Use the `max_tag_id` and `min_tag_id` parameters in the pagination
response to paginate through these objects.


- getUsersSearch

    Search for a user by name.

- getUsersSelfFeed

    See the authenticated user's feed.

**Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015


- getUsersSelfMediaLiked

    See the list of media liked by the authenticated user. Private media is returned as long as the authenticated
user has permission to view that media. Liked media lists are only available for the currently authenticated
user.


- getUsersSelfRequestedBy

    List the users who have requested this user's permission to follow.

- getUsersByUserId

    Get basic information about a user. To get information about the owner of the access token, you can use
**self** instead of the `user-id`.

Security scope `public_content` is required to read information about other users.


- getUsersByUserIdFollowedBy

    Get the list of users this user is followed by. To get users followed by the owner of the access token, you
can use **self** instead of the `user-id`.


- getUsersByUserIdFollows

    Get the list of users this user follows. To get follows of the owner of the access token, you can use **self**
instead of the `user-id`.


- getUsersByUserIdMediaRecent

    Get the most recent media published by a user. To get the most recent media published by the owner of the
access token, you can use **self** instead of the `user-id`.

Security scope `public_content` is required to read information about other users.


- getUsersByUserIdRelationship

    Get information about a relationship to another user.

- postUsersByUserIdRelationship

    Modify the relationship between the current user and the target user.


# node-red-contrib-eksido-instagram
