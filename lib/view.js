'use strict';

module.exports = {
    JSON: json,
    format: format
};

function json(res, promise, acceptEmptyArray) {

    var responseData = {};

    promise.then(
        function(data){

            if(data){
                if(data.length == 0 && !acceptEmptyArray){

                    responseData = {
                        success: false,
                        error: 'Not Found',
                        data: data
                    };

                    if(res.status){
                        res.status(404).send(responseData);
                    }
                    else{
                        res.error('NotFound');
                    }

                }
                else{
                    responseData = {
                        success: true,
                        data: data
                    }

                    if(res.status){
                        res.status(200).send(responseData);
                    }
                    else{
                        res.success(responseData);
                    }

                }
            }
            else{

                responseData = {
                    success: false,
                    error: 'Not Found'
                };

                if(res.status){
                    res.status(404).send(responseData);
                }
                else{
                    res.error('NotFound');
                }
            }
        },
        function(error){
            responseData = {
                success: false,
                error: error
            };

            if(res.status){
                res.status(500).send(responseData);
            }
            else{
                res.error(responseData);
            }
        }
    );
}

function format(status, data) {
    var responseData = {
        success: status,
    };

    if(status) {
        responseData.data = data;
    }
    else {
        responseData.error = data;
    }

    return responseData;
}
