var rest = require('restler');

var crypto = require('crypto');
var url = require('url');

function sha1(data) {
    var generator = crypto.createHash('sha1');
    generator.update(data);
    return generator.digest('hex');
}

var SlideShare = function(key, secret) {
    this.api_key = key;
    this.secret = secret;
};

SlideShare.prototype = {
    api_key: '',
    secret: '',
    api_url: 'https://www.slideshare.net/api/2/',
    
    // The timestamp
    timestamp: function() { 
        return Math.round(new Date().getTime() / 1000);
    },
    // The hash method: returns the current hash
    currentHash: function() {
        return sha1(this.secret + this.timestamp());
    },
    // Get core parameters required in every API call
    coreParams: function() {
        return {
            parser: rest.parsers.xml,
            data: {
                api_key: this.api_key,
                ts: this.timestamp(),
                hash: this.currentHash()
            }
        }
    },

    // API Calls
    
    /**
     * Get a slideshow by it's id
     * @param {string} id The id of the slideshow
     * @return {Object} A slideshow object
     */
    getSlideshowById: function(id, opts, callback) {
        if (typeof opts === "function") {
            callback = opts;
            opts = {};
        }
        opts.slideshow_id = id;
        this.getSlideshow(opts, callback);
    },

    /**
     * Get a slideshow by its url
     * @param {string} slideShareUrl The url of the slideshow
     * @return {Object} A slideshow object
     */
    getSlideshowByURL: function(slideShareUrl, opts, callback) {
        if (typeof opts === "function") {
            callback = opts;
            opts = {};
        }
        opts = opts || {};
        // The SlideShare API does not take URLs that have querystring parameters so we condense `slideshow_url`
        // to the minimal URL.
        // ex: Given `http://www.slideshare.net/username/slideshow?from_search=4` we will request:
        // `http://www.slideshare.net/username/slideshow`
        var parsedUrl = url.parse(slideShareUrl);
        opts.slideshow_url = parsedUrl.protocol + '//' + parsedUrl.host + parsedUrl.pathname;
        this.getSlideshow(opts, callback);
    },
    
    getSlideshow: function(opts, callback) {
        var params = this.coreParams();
        for (var key in opts) {
            params.data[key] = opts[key];
        }
        rest.get(this.api_url + 'get_slideshow', params).on('complete', function(data) {
            return callback(data);
        });
    },

    /**
     * Get slideshows by a tag name
     * @param {string} tag The tag name
     * @param {Object} opts Optional parameters, for example { limit: 10, offset: 2, detailed: true }, or null.
     * @return {Object} An object containing an array of slideshows
     */
    getSlideshowsByTag: function(tag, opts, callback) {
        var params = this.coreParams();
        params.data.tag = tag;
        if(opts != null) {
            params.data.limit = opts.limit;
            params.data.offset = opts.offset;
            params.data.detailed = opts.detailed;
        }
        rest.get(this.api_url + 'get_slideshows_by_tag', params).on('complete', function(data) {
            return callback(data);
        });
    },
    
    /**
     * Get slideshows by a group 
     * @param {string} group_name The group name
     * @param {Object} opts Optional parameters, for example { limit: 10, offset: 2, detailed: true }, or null.
     * @return {Object} An object containing an array of slideshows
     */
    getSlideshowsByGroup: function(group_name, opts, callback) {
        var params = this.coreParams();
        params.data.group_name = group_name;
        if(opts != null) {
            params.data.limit = opts.limit;
            params.data.offset = opts.offset;
            params.data.detailed = opts.detailed;
        }
        rest.get(this.api_url + 'get_slideshows_by_group', params).on('complete', function(data) {
            return callback(data);
        });
    },

    /**
     * Get slideshows by user
     * @param {string} username_for username of owner of slideshows
     * @param {Object} opts Optional parameters, for example { username: 'john', password: 'doe', limit: 10, offset: 2, detailed: true, get_unconverted: false }, or null.
     * @return {Object} An object containing an array of slideshows
     */
    getSlideshowsByUser: function(username_for, opts, callback) {
        var params = this.coreParams();
        params.data.username_for = username_for;
        if(opts != null) {
            if(opts.username != undefined && opts.password != undefined) {
                params.data.username = opts.username;
                params.data.password = opts.password;
            }
            params.data.limit = opts.limit;
            params.data.offset = opts.offset;
            params.data.detailed = opts.detailed;
            params.data.get_unconverted = opts.get_unconverted;
        }
        rest.get(this.api_url + 'get_slideshows_by_user', params).on('complete', function(data) {
            return callback(data);
        });
    },

    /**
     * Search Slideshows
     * @param {string} q the query string
     * @param {Object} opts Optional parameters, for example { page: 2, items_per_page: 10, lang: 'en', sort: 'latest', fileformat: 'pdf', detailed: true }, or null.
     * @return {Object} An object containing an array of slideshows
     */
    searchSlideshows: function(q, opts, callback) {
        var params = this.coreParams();
        params.data.q = q;
        if(opts != null) {
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
        rest.get(this.api_url + 'search_slideshows', params).on('complete', function(data) {
            return callback(data);
        });
    },

    /**
     * Get user groups
     * @param {string} username_for username of owner of slideshows
     * @param {Object} opts Optional parameters, for example { username: 'john', password: 'doe' }, or null.
     * @return {Object} An object containing an array of groups
     */
    getUserGroups: function(username_for, opts, callback) {
        var params = this.coreParams();
        params.data.username_for = username_for;
        if(opts != null) {
            if(opts.username != undefined && opts.password != undefined) {
                params.data.username = opts.username;
                params.data.password = opts.password;
            }
        }
        rest.get(this.api_url + 'get_user_groups', params).on('complete', function(data) {
            return callback(data);
        });
    },

    /**
     * TODO: Ask slideshare to fix this, get_user_favorites returns 'No API Key provided'
     * Get user favorites
     * @param {string} username_for username of owner of slideshows
     * @return {Object} An object containing an array of favorites
     */
    getUserFavorites: function(username_for, callback) {
        var params = this.coreParams();
        params.data.username_for = username_for;
        rest.get(this.api_url + 'get_user_favorites', params).on('complete', function(data) {
            return callback(data);
        });
    },

    /**
     * TODO: See why the limit option does not work
     * Get user contacts
     * @param {string} username_for username of owner of slideshows
     * @param {Object} opts Optional parameters, for example { limit: 10, offset: 2 }, or null.
     * @return {Object} An object containing an array of contacts
     */
    getUserContacts: function(username_for, opts, callback) {
        var params = this.coreParams();
        params.data.username_for = username_for;
        if(opts != null) {
            params.data.limit = opts.limit;
            params.data.offset = opts.offset;
        }
        console.log(params);
        rest.get(this.api_url + 'get_user_contacts', params).on('complete', function(data) {
            return callback(data);
        });
    },

    /**
     * Get user tags
     * @param {string} username username
     * @param {string} password password
     * @return {Object} An object containing an array of Tags
     */
    getUserTags: function(username, password, callback) {
        var params = this.coreParams();
        params.data.username = username;
        params.data.password = password;
        rest.get(this.api_url + 'get_user_tags', params).on('complete', function(data) {
            return callback(data);
        });
    }
};

module.exports = SlideShare;
