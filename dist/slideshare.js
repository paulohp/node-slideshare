'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _restler = require('restler');

var _restler2 = _interopRequireDefault(_restler);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var api_url = 'https://www.slideshare.net/api/2/';

var SlideShare = (function () {
  function SlideShare(key, secret) {
    _classCallCheck(this, SlideShare);

    this.api_key = key;
    this.secret = secret;
  }

  _createClass(SlideShare, [{
    key: 'getSlideshowById',

    // API Calls
    /**
     * Get a slideshow by it's id
     * @param {string} id The id of the slideshow
     * @return {Object} A slideshow object
     */
    value: function getSlideshowById(id, opts, callback) {
      if (typeof opts === 'function') {
        callback = opts;
        opts = {};
      }
      opts.slideshow_id = id;
      this.getSlideshow(opts, callback);
    }
  }, {
    key: 'getSlideshowByURL',

    /**
     * Get a slideshow by its url
     * @param {string} slideShareUrl The url of the slideshow
     * @return {Object} A slideshow object
     */
    value: function getSlideshowByURL(slideShareUrl, opts, callback) {
      if (typeof opts === 'function') {
        callback = opts;
        opts = {};
      }
      opts = opts || {};
      // The SlideShare API does not take URLs that have querystring parameters so we condense `slideshow_url`
      // to the minimal URL.
      // ex: Given `http://www.slideshare.net/username/slideshow?from_search=4` we will request:
      // `http://www.slideshare.net/username/slideshow`
      var parsedUrl = _url2['default'].parse(slideShareUrl);
      opts.slideshow_url = parsedUrl.protocol + '//' + parsedUrl.host + parsedUrl.pathname;
      this.getSlideshow(opts, callback);
    }
  }, {
    key: 'getSlideshow',
    value: function getSlideshow(opts, callback) {
      var params = _utils2['default'].coreParams(this.api_key, this.secret);
      for (var key in opts) {
        params.data[key] = opts[key];
      }
      _restler2['default'].get(api_url + 'get_slideshow', params).on('complete', function (data) {
        return callback(data);
      });
    }
  }, {
    key: 'getSlideshowsByTag',

    /**
     * Get slideshows by a tag name
     * @param {string} tag The tag name
     * @param {Object} opts Optional parameters, for example { limit: 10, offset: 2, detailed: true }, or null.
     * @return {Object} An object containing an array of slideshows
     */
    value: function getSlideshowsByTag(tag, opts, callback) {
      var params = _utils2['default'].coreParams(this.api_key, this.secret);
      params.data.tag = tag;
      if (opts != null) {
        params.data.limit = opts.limit;
        params.data.offset = opts.offset;
        params.data.detailed = opts.detailed;
      }
      _restler2['default'].get(api_url + 'get_slideshows_by_tag', params).on('complete', function (data) {
        return callback(data);
      });
    }
  }, {
    key: 'getSlideshowsByGroup',

    /**
     * Get slideshows by a group
     * @param {string} group_name The group name
     * @param {Object} opts Optional parameters, for example { limit: 10, offset: 2, detailed: true }, or null.
     * @return {Object} An object containing an array of slideshows
     */
    value: function getSlideshowsByGroup(group_name, opts, callback) {
      var params = _utils2['default'].coreParams(this.api_key, this.secret);
      params.data.group_name = group_name;
      if (opts != null) {
        params.data.limit = opts.limit;
        params.data.offset = opts.offset;
        params.data.detailed = opts.detailed;
      }
      _restler2['default'].get(api_url + 'get_slideshows_by_group', params).on('complete', function (data) {
        return callback(data);
      });
    }
  }, {
    key: 'getSlideshowsByUser',

    /**
     * Get slideshows by user
     * @param {string} username_for username of owner of slideshows
     * @param {Object} opts Optional parameters, for example { username: 'john', password: 'doe', limit: 10, offset: 2, detailed: true, get_unconverted: false }, or null.
     * @return {Object} An object containing an array of slideshows
     */
    value: function getSlideshowsByUser(username_for, opts, callback) {
      var params = _utils2['default'].coreParams(this.api_key, this.secret);
      params.data.username_for = username_for;
      if (opts != null) {
        if (opts.username != undefined && opts.password != undefined) {
          params.data.username = opts.username;
          params.data.password = opts.password;
        }
        params.data.limit = opts.limit;
        params.data.offset = opts.offset;
        params.data.detailed = opts.detailed;
        params.data.get_unconverted = opts.get_unconverted;
      }
      _restler2['default'].get(api_url + 'get_slideshows_by_user', params).on('complete', function (data) {
        return callback(data);
      });
    }
  }, {
    key: 'searchSlideshows',

    /**
     * Search Slideshows
     * @param {string} q the query string
     * @param {Object} opts Optional parameters, for example { page: 2, items_per_page: 10, lang: 'en', sort: 'latest', fileformat: 'pdf', detailed: true }, or null.
     * @return {Object} An object containing an array of slideshows
     */
    value: function searchSlideshows(q, opts, callback) {
      var params = _utils2['default'].coreParams(this.api_key, this.secret);
      params.data.q = q;
      if (opts != null) {
        params.data.detailed = opts.detailed;
        params.data.page = opts.page;
        params.data.items_per_page = opts.items_per_page;
        params.data.lang = opts.lang;
        params.data.sort = opts.sort;
        params.data.upload_date = opts.upload_date;
        params.data.what = opts.what;
        params.data.download = opts.download;
        params.data.fileformat = opts.fileformat;
        params.data.file_type = opts.file_type;
        params.data.cc = opts.cc;
        params.data.cc_adapt = opts.cc_adapt;
        params.data.cc_commercial = opts.cc_commercial;
      }
      _restler2['default'].get(api_url + 'search_slideshows', params).on('complete', function (data) {
        return callback(data);
      });
    }
  }, {
    key: 'getUserGroups',

    /**
     * Get user groups
     * @param {string} username_for username of owner of slideshows
     * @param {Object} opts Optional parameters, for example { username: 'john', password: 'doe' }, or null.
     * @return {Object} An object containing an array of groups
     */
    value: function getUserGroups(username_for, opts, callback) {
      var params = _utils2['default'].coreParams(this.api_key, this.secret);
      params.data.username_for = username_for;
      if (opts != null) {
        if (opts.username != undefined && opts.password != undefined) {
          params.data.username = opts.username;
          params.data.password = opts.password;
        }
      }
      _restler2['default'].get(api_url + 'get_user_groups', params).on('complete', function (data) {
        return callback(data);
      });
    }
  }, {
    key: 'getUserFavorites',

    /**
     * TODO: Ask slideshare to fix this, get_user_favorites returns 'No API Key provided'
     * Get user favorites
     * @param {string} username_for username of owner of slideshows
     * @return {Object} An object containing an array of favorites
     */
    value: function getUserFavorites(username_for, callback) {
      var params = _utils2['default'].coreParams(this.api_key, this.secret);
      params.data.username_for = username_for;
      _restler2['default'].get(api_url + 'get_user_favorites', params).on('complete', function (data) {
        return callback(data);
      });
    }
  }, {
    key: 'getUserContacts',

    /**
     * TODO: See why the limit option does not work
     * Get user contacts
     * @param {string} username_for username of owner of slideshows
     * @param {Object} opts Optional parameters, for example { limit: 10, offset: 2 }, or null.
     * @return {Object} An object containing an array of contacts
     */
    value: function getUserContacts(username_for, opts, callback) {
      var params = _utils2['default'].coreParams(this.api_key, this.secret);
      params.data.username_for = username_for;
      if (opts != null) {
        params.data.limit = opts.limit;
        params.data.offset = opts.offset;
      }
      console.log(params);
      _restler2['default'].get(api_url + 'get_user_contacts', params).on('complete', function (data) {
        return callback(data);
      });
    }
  }, {
    key: 'getUserTags',

    /**
     * Get user tags
     * @param {string} username username
     * @param {string} password password
     * @return {Object} An object containing an array of Tags
     */
    value: function getUserTags(username, password, callback) {
      var params = _utils2['default'].coreParams(this.api_key, this.secret);
      params.data.username = username;
      params.data.password = password;
      _restler2['default'].get(api_url + 'get_user_tags', params).on('complete', function (data) {
        return callback(data);
      });
    }
  }]);

  return SlideShare;
})();

exports['default'] = SlideShare;
module.exports = exports['default'];
//# sourceMappingURL=slideshare.js.map