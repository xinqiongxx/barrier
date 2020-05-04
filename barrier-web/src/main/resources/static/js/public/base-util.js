function $ajax(options, callback, failcallback) {
    var ajaxSetting = {dataType: "JSON", timeout: 600000, method: "POST", show: true};
    $.extend(ajaxSetting, options);
    if (ajaxSetting.show) {
        layer.load(2, {content: "加载中"});
    }
    $.ajax(ajaxSetting).done(function (ret) {
        layer.closeAll();
        if (isNotEmpty(callback)) {
            callback(ret);
        }
    }).fail(function () {
        layer.closeAll();
        if (isNotEmpty(failcallback)) {
            failcallback(ret);
        }
    });
}

// 判断是否为空
function isNotEmpty(obj) {
    if (typeof (obj) == "undefined" || null == obj) {
        return false;
    }
    if (typeof (obj) == "function") {
        return true;
    }
    if (obj.constructor == Number) {
        if (obj) {
            return true;
        } else {
            return false;
        }
    } else if (typeof (obj) == "string") {
        if (obj != "") {
            return true;
        } else {
            return false;
        }
    } else {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return true;
            }
        }
        return false;
    }
};

function replacehtml(text) {
    var newstr = text.replace('<', '&lt;').replace('<', '&gt;');
    return newstr;
}