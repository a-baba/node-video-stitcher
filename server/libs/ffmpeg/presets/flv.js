define(function(){

    return {

        bitrates: [
            500,
            600,
            700,
            800
        ],
        headers : {

            'Content-Type'      : 'video/flv',
            'Connection'        : 'keep-alive',
            'Transfer-Encoding' : 'chunked',
            'Accept-Ranges'     : 'bytes',
            'Content-Encoding'  : 'gzip'
        }
    }
});
