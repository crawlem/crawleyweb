# DocPad Configuration File
# http://docpad.org/docs/config

# Requires
moment = require('moment')
moment.lang('en')  # set locale
 
# Define Configuration
docpadConfig =
    templateData:
        site:
            url: "http://crawleyweb.co.uk/"
            title: "crawleyweb"
            author: "Mark Crawley"

        formatDate: (date,format='LLLL') -> return moment(date).format(format)
            
    plugins:
        feedr:
            feeds:
                flickrusa2008:
                    url: "http://ycpi.api.flickr.com/services/rest/?method=flickr.photos.search&user_id=90014740@N00&min_taken_date=2008-10-10 00:00:00&max_taken_date=2008-10-24 23:59:59&sort=date-taken-asc&format=json&nojsoncallback=1&extras=date_taken&api_key=6b44b7eaf862acb6abf898f5bc3882fb"

    collections:
    	usa2008: ->
    		@getCollection("html").findAllLive({group:"usa2008"},[{date:1}])
    	playground: ->
    		@getCollection("html").findAllLive({group:"playground"},[{date:1}])


# Export the DocPad Configuration
module.exports = docpadConfig