define(function(){

    return[

    // VIDEOS

        {
            method           : 'get',
            path             : '/videos',
            controller       : 'video',
            controllerMethod : 'get',
            description      : 'used to retrieve all videos'
        },
        {
            method           : 'post',
            path             : '/video',
            controller       : 'video',
            controllerMethod : 'create',
            description      : 'creates a video',
            requestBody      : [{
                TemplateId : 9999999,
                Field1: 'string',
                Field2: 'string',
                Field3: 'string',
                Field4: 'string',
                FieldCollection: [
                    {
                        Field1: 'string',
                        Field2: 'string',
                        Field3: 'string'
                    }
                ]
            }],
            responseBody    : [{
                TemplateId    : 9999999,
                VideoId       : 'string'
            }]
        },
        {
            method           : 'delete',
            path             : '/videos/:videoId',
            controller       : 'video',
            controllerMethod : 'delete',
            description      : 'remove a video'
        },


    //  Webm live streaming

        {
            method           : 'get',
            path             : '/stream/webm/:bitrate/:width/:height/:videoId.*',
            controller       : 'stream/webm',
            controllerMethod : 'init',
            description      : 'start initial video transcoding process.'
        },

    //  Mp4 live streaming

        {
            method           : 'get',
            path             : '/stream/mp4/:bitrate/:width/:height/:videoId.*',
            controller       : 'stream/mp4',
            controllerMethod : 'init',
            description      : 'start initial video transcoding process.'
        },

    //  Ogg live streaming

        {
            method           : 'get',
            path             : '/stream/ogg/:bitrate/:width/:height/:videoId.*',
            controller       : 'stream/ogg',
            controllerMethod : 'init',
            description      : 'start initial video transcoding process.'
        },

    //  Flv live streaming

        {
            method           : 'get',
            path             : '/stream/flv/:bitrate/:width/:height/:videoId.*',
            controller       : 'stream/flv',
            controllerMethod : 'init',
            description      : 'start initial video transcoding process.'
        },

    //  Rtmp live streaming

        {
            method           : 'get',
            path             : '/stream/rtmp/:bitrate/:width/:height/:videoId',
            controller       : 'stream/rtmp',
            controllerMethod : 'init',
            description      : 'start initial video transcoding process. responds with link to rtmp stream.'
        },

    //  Http Live Streaming (HLS)
        {
            method           : 'get',
            path             : '/stream/hls/:bitrate/:width/:height/:videoId.*',
            controller       : 'stream/hls',
            controllerMethod : 'init',
            description      : 'start initial video transcoding process; returns initial bandwidth manifest (.m3u8)'
        },
        {
            method           : 'get',
            path             : '/stream/hls/:bitrate/:width/:height/:videoId/:file.ts',
            controller       : 'stream/hls',
            controllerMethod : 'segment',
            description      : 'intercepts request for files, buffers and gzips the response'
        },
        {
            method           : 'get',
            path             : '/stream/hls/:bitrate/:width/:height/:videoId/playlist.m3u8',
            controller       : 'stream/hls',
            controllerMethod : 'playlist',
            description      : 'intercepts player request for bandwidth playlist.'
        },

    // TEMPLATES
        {
            method           : 'get',
            path             : '/templates/:brandId',
            controller       : 'templates',
            controllerMethod : 'byBrand',
            description      : 'gets templates by brandId (eg. audi).',
            requestBody      : {},
            responseBody     : []
        },
        {
            method           : 'put',
            path             : '/templates',
            controller       : 'templates',
            controllerMethod : 'save',
            description      : 'saves a template.',
            requestBody      : {},
            responseBody     : {}
        },
        {
            method           : 'post',
            path             : '/templates',
            controller       : 'templates',
            controllerMethod : 'create',
            description      : 'creates a template.',
            requestBody      : {},
            responseBody     : {}
        },


    // BRANDS
        {
            method           : 'get',
            path             : '/brands/:brandId',
            controller       : 'brands',
            controllerMethod : 'get',
            description      : 'gets all brands',
            requestBody      : {},
            responseBody     : []
        },


    // SERVICES
        {
            method           : 'get',
            path             : '/services',
            controller       : 'services',
            controllerMethod : 'get',
            description      : 'sends this json to the front end.',
            requestBody      : {},
            responseBody     : []
        }
    ]
});
