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

        formatDate: (date,format='LLLL') ->
            return moment(date).format(format)

        getUrl: (url) ->
            return url.replace /^\//g, ""

    plugins:
        related:
            collectionName: "posts"

        sitemap:
            collectionName: 'pages'

    collections:
        posts: ->
            @getCollection("html").findAllLive({layout:"post"},[{date:-1}])
        pages: ->
            @getCollection("html").findAllLive({ignored: false, isPage: true}, [{pageOrder: 1}])
        mainMenu: ->
            @getCollection("html").findAllLive({ignored: false, isMainMenu: true}, [{pageOrder: 1}])
        footerMenu: ->
            @getCollection("html").findAllLive({ignored: false, isFooterMenu: true}, [{pageOrder: 1}])

}

# Export the DocPad Configuration
module.exports = docpadConfig