# DocPad Configuration File
# http://docpad.org/docs/config

# Requires
moment = require('moment')
moment.lang('en')  # set locale

# Define the DocPad Configuration
docpadConfig = {
	templateData:
        site:
            url: "http://crawleyweb.co.uk/"
            title: "crawleyweb"
            author: "Mark Crawley"

        formatDate: (date,format='LLLL') -> return moment(date).format(format)

        getUrl: (url) ->
            return url.replace /^\//g, ""

    plugins:
        related:
            collectionName: "posts"

        #feedr:
            #feeds:
                #flickrusa2008:
                    #url: "http://ycpi.api.flickr.com/services/rest/?method=flickr.photos.search&user_id=90014740@N00&min_taken_date=2008-10-10 00:00:00&max_taken_date=2008-10-24 23:59:59&sort=date-taken-asc&format=json&nojsoncallback=1&extras=date_taken&api_key=6b44b7eaf862acb6abf898f5bc3882fb"

    collections:
        posts: ->
            @getCollection("html").findAllLive({layout:"post"},[{date:-1}])
    	playground: ->
            @getCollection("html").findAllLive({layout:"playground"},[{date:1}])
        pages: ->
            @getCollection("html").findAllLive({ignored: false, isPage: true}, [{pageOrder: 1}])
        mainMenu: ->
            @getCollection("html").findAllLive({ignored: false, isMainMenu: true}, [{pageOrder: 1}])
        footerMenu: ->
            @getCollection("html").findAllLive({ignored: false, isFooterMenu: true}, [{pageOrder: 1}])
}

# Export the DocPad Configuration
module.exports = docpadConfig