module.exports = {
    success: function(data) {
        var retData = {};
        retData.error = 0;
        retData.message = "success";
        retData.result = data;
        return retData;
    },
    error: function(data) {
        var retData = {};
        retData.error = 1;
        if (data && data.errmsg)
            retData.message = data.errmsg;
        else
            retData.message = "error";
        retData.result = data;
        return retData;
    }
};
