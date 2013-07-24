# DocPad Configuration File
# http://docpad.org/docs/config

# Requires
moment = require('moment')
moment.lang('en')  # set locale
 
# Define Configuration
docpadConfig =
    templateData:
        # Format the passed date, by default format like: Thursday, November 29 2012 3:53 PM
        formatDate: (date,format='LLLL') -> return moment(date).format(format)
    collections:
    	usa2008: ->
    		@getCollection("html").findAllLive({group:"usa2008"},[{date:1}])
    	playground: ->
    		@getCollection("html").findAllLive({group:"playground"},[{date:1}])

# Export the DocPad Configuration
module.exports = docpadConfig

#Plugin configuration
plugins:
	feedr:
		feeds:
			flickr:
				url: "http://ycpi.api.flickr.com/services/rest/?method=flickr.photos.search&user_id=90014740@N00&sort=date-taken-asc&format=json&nojsoncallback=1&api_key=6b44b7eaf862acb6abf898f5bc3882fb"