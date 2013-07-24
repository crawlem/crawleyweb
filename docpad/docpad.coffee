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
            title: "Mark Crawley"

        # Format the passed date, by default format like: Thursday, November 29 2012 3:53 PM
        formatDate: (date,format='LLLL') -> return moment(date).format(format)

    collections:
    	usa2008: ->
    		@getCollection("html").findAllLive({group:"usa2008"},[{date:1}])
    	playground: ->
    		@getCollection("html").findAllLive({group:"playground"},[{date:1}])

# Export the DocPad Configuration
module.exports = docpadConfig