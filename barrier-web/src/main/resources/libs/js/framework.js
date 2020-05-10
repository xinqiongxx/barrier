$.jsonAjax = function (config) {
    if(config.data){
        config.data = JSON.stringify(config.data)
    }
    config.headers = {'Content-Type': 'application/json;charset=utf8'}
    return $.ajax(config);
}
function cusTreeTableLoadLater(a, b) {
    $.ajax({
        url: b,
        error: function() {
            try {
                top.Toast("showWarningToast", "数据加载失败，请检查dataPath是否正确")
            } catch (a) {
                top.Toast("showWarningToast", "数据加载失败，请检查dataPath是否正确")
            }
        },
        success: function(b) {
            var d, c = a.parents("tr").next().find("table").parents("td");
            c.html(""), d = $(b), d.appendTo(c), d.tableRender(), a.removeClass("img_loading"), a.addClass("img_remove2"), a.attr("title", "点击收缩"), a.parents("tr").next().show()
        }
    })
}

function triggerCustomHeightSet() {
    var a = document.documentElement.clientHeight,
        b = document.documentElement.clientWidth;
    _customHeightSet(a, b)
}

function _customHeightSet(a, b) {
    try {
        customHeightSet(a, b)
    } catch (c) {}
}

function changeFont(a) {
    if ($("body").css({
        fontSize: a + "px"
    }), $("table").hasClass("tableStyle").length > 0 && $("table").hasClass("tableStyle").css({
        fontSize: a + "px"
    }), $("pre").length > 0 && $("pre").css({
        fontSize: a + "px"
    }), $("iframe").length > 0)
        for (var b = 0; b < $("iframe").length; b++) document.getElementsByTagName("iframe")[b].contentWindow.changeFont(a);
    fontSize = a
}

function changeFontFamily(a) {
    if ($("body").css({
        fontFamily: a
    }), $("iframe").length > 0)
        for (var b = 0; b < $("iframe").length; b++) document.getElementsByTagName("iframe")[b].contentWindow.changeFontFamily(a);
    fontFamily = a
}

function getPosition(a, b) {
    var d, c = -1;
    for (d = 0; d < b.length; d++)
        if (a == b[d]) {
            c = d;
            break
        }
    return c
}

function enableTooltips() {
    var e;
    document.getElementById && document.getElementsByTagName && (AddCss(), e = document.createElement("span"), e.id = "btc", e.setAttribute("id", "btc"), e.style.position = "absolute", e.style.zIndex = 9999, $("body").append($(e)))
}

function _getStrLength(a) {
    var b, c;
    for (b = 0, c = 0; b < a.length; b++) a.charCodeAt(b) < 128 ? c++ : c += 2;
    return c
}

function addTooltip(a) {
    var b, c, d, e;
    return c = a.getAttribute("title"), " " == c ? (a.removeAttribute("title"), a.onmouseover = null, a.onmouseout = null, a.onmousemove = null, void 0) : (null != c && 0 != c.length && (a.removeAttribute("title"), b = _getStrLength(c) > 37 || 37 == _getStrLength(c) ? CreateEl("span", "tooltip") : _getStrLength(c) > 10 && _getStrLength(c) < 37 ? CreateEl("span", "tooltip_mid") : CreateEl("span", "tooltip_min"), e = CreateEl("span", "top"), $(e).html(c), b.appendChild(e), d = CreateEl("b", "bottom"), b.appendChild(d), setOpacity(b), a.tooltip = b, a.onmouseover = showTooltip, a.onmouseout = hideTooltip, a.onmousemove = Locate2), void 0)
}

function hideTip() {
    var b = document.getElementById("btc");
    b.childNodes.length > 0 && b.removeChild(b.firstChild)
}

function showTooltip(a) {
    document.getElementById("btc").appendChild(this.tooltip), Locate(a)
}

function hideTooltip() {
    var a = document.getElementById("btc");
    a.childNodes.length > 0 && a.removeChild(a.firstChild)
}

function setOpacity(a) {
    a.style.filter = "alpha(opacity:95)", a.style.KHTMLOpacity = "0.95", a.style.MozOpacity = "0.95", a.style.opacity = "0.95"
}

function CreateEl(a, b) {
    var c = document.createElement(a);
    return c.className = b, c.style.display = "block", c
}

function AddCss() {}

function Locate(a) {
    var d, e, f, g, h, b = 0,
        c = 0;
    null == a && (a = window.event), a.pageX || a.pageY ? (b = a.pageX, c = a.pageY) : (a.clientX || a.clientY) && (document.documentElement.scrollTop ? (b = a.clientX + document.documentElement.scrollLeft, c = a.clientY + document.documentElement.scrollTop) : (b = a.clientX + document.body.scrollLeft, c = a.clientY + document.body.scrollTop)), d = window.document.documentElement.clientWidth, e = window.document.documentElement.clientHeight, f = $("#btc").width(), g = $("#btc").height(), h = $("#btc >span")[0].className, b - 20 > d - f ? (document.getElementById("btc").style.left = d - f + "px", "tooltip" == h ? $("#btc >span")[0].className = "tooltip_s" : "tooltip_min" == h ? $("#btc >span")[0].className = "tooltip_min_s" : "tooltip_mid" == h && ($("#btc >span")[0].className = "tooltip_mid_s")) : document.getElementById("btc").style.left = b - 20 + "px", $(window).scrollTop() + e - g < c ? (document.getElementById("btc").style.top = c - g - 10 + "px", "tooltip" == h ? $("#btc >span")[0].className = "tooltip_r" : "tooltip_min" == h ? $("#btc >span")[0].className = "tooltip_min_r" : "tooltip_mid" == h && ($("#btc >span")[0].className = "tooltip_mid_r"), tipDirection = "up") : (document.getElementById("btc").style.top = c + 10 + "px", "tooltip_r" == h ? $("#btc >span")[0].className = "tooltip" : "tooltip_min_r" == h ? $("#btc >span")[0].className = "tooltip_min" : "tooltip_mid_r" == h && ($("#btc >span")[0].className = "tooltip_mid"), tipDirection = "down")
}

function Locate2(a) {
    var d, f, g, b = 0,
        c = 0;
    null == a && (a = window.event), a.pageX || a.pageY ? (b = a.pageX, c = a.pageY) : (a.clientX || a.clientY) && (document.documentElement.scrollTop ? (b = a.clientX + document.documentElement.scrollLeft, c = a.clientY + document.documentElement.scrollTop) : (b = a.clientX + document.body.scrollLeft, c = a.clientY + document.body.scrollTop)), d = window.document.documentElement.clientWidth, window.document.documentElement.clientHeight, f = $("#btc").width(), g = $("#btc").height(), document.getElementById("btc").style.left = b - 20 > d - f ? d - f + "px" : b - 20 + "px", document.getElementById("btc").style.top = "up" == tipDirection ? c - g - 10 + "px" : c + 10 + "px"
}

function iframeHeight(a) {
    var b = document.getElementById(a);
    b.style.height = b.contentWindow.document.body.scrollHeight + "px"
}

function setDefaultValues(a) {
    colsDefault = a.cols, rowsDefault = $(a).attr("rows")
}

function bindEvents(a) {
    a.onkeyup = function() {
        grow(a)
    }
}

function grow(a) {
    var d, b = 0,
        c = a.value.split("\n");
    for (d = c.length - 1; d >= 0; --d) b += Math.floor(c[d].length / colsDefault + 1);
    a.rows = b >= rowsDefault ? b + 1 : rowsDefault
}

function showProgressBar(a) {
    var b = uncompile(quiLanguage.progressBar.title);
    a && (b = a), top.progressFlag = 1, top.showSimpleProgress(b, 0, !0, "#ffffff")
}

function closeProgressBar() {
    try {
        top.closeProgressBar()
    } catch (a) {}
}

function _initComplete() {
    try {
        initComplete()
    } catch (a) {}
}

function validateInput(a, b) {
    var c = new RegExp(b);
    return c.test(a)
}

function createPosition(a, b) {
    var c;
    "normal" == b ? c = $('<div class="position"><div class="center"><div class="left"><div class="right"><span></span></div></div></div></div>') : "simple" == b && (c = $('<div class="positionSimple"><span></span></div>')), c.find("span").append(a), $("body").prepend(c)
}

function showCodePage(a, b) {
    var c = new top.Dialog;
    c.Title = b, c.Modal = !1, c.ID = "code1", c.URL = a, c.ShowMaxButton = !0, c.ShowMinButton = !0, c.Width = 900, c.Height = 540, c.MaxEvent = function() {
        c.innerFrame.contentWindow.changeCodeHeight($(top.document.getElementById("_DialogBGDiv")).height() - 55)
    }, c.DecreaseEvent = function() {
        c.innerFrame.contentWindow.changeCodeHeight(530)
    }, c.show()
}

function uncompile(a) {
    var b, c;
    for (a = unescape(a), b = String.fromCharCode(a.charCodeAt(0) - a.length - 611), c = 1; c < a.length; c++) b += String.fromCharCode(a.charCodeAt(c) - b.charCodeAt(c - 1));
    return b
}
var parentTopHeight, parentBottomHeight, parentTopHeight_left, parentBottomHeight_left, parentTopHeight_middle, parentBottomHeight_middle, fixHeight, skinName, broswerFlag, broswerVersion, parentScrollHeight, currentMouseX, currentMouseY, browserType, elm_id, tipDirection, colsDefault, rowsDefault, JSON, themeColor = "blue",
    fontSize = 12,
    fontFamily = "宋体",
    prePath = "../../",
    exitVtab = 0,
    vtabIdx = 0,
    hasIframe = 0,
    boxWhiteBg = !1,
    splitMode = !1,
    positionTarget = "",
    box4Custom = !1,
    scrollerX = !1,
    autoGetSkin = !0,
    autoFormat = !0,
    autoRender = !0,
    boxIe6Flag = 0,
    boxIe7Flag = 0,
    isHeadFixMode = 0,
    headFixExcude = 0,
    headFixExcude2 = 0,
    cResizeTimer = null,
    depth = 500,
    groupButtonWidth = 79;
$(function() {
    function uaMatch(a) {
        var b = rMsie.exec(a);
        return null != b ? {
            browser: "IE",
            version: b[2] || "0"
        } : (b = rFirefox.exec(a), null != b ? {
            browser: b[1] || "",
            version: b[2] || "0"
        } : (b = rOpera.exec(a), null != b ? {
            browser: b[1] || "",
            version: b[2] || "0"
        } : (b = rChrome.exec(a), null != b ? {
            browser: b[1] || "",
            version: b[2] || "0"
        } : (b = rSafari.exec(a), null != b ? {
            browser: b[2] || "",
            version: b[1] || "0"
        } : null != b ? {
            browser: "",
            version: "0"
        } : void 0))))
    }
    var userAgent, rMsie, rFirefox, rOpera, rChrome, rSafari, version, ua, browserMatch, parentSkinUrl, o, $parentThemeDom, $parentSkinDom, mainFlag = null,
        contentFlag = 1;
    if (null != mainFlag && top.Toast("showWarningToast", "内容页面不可引入main.js！"), $.ajaxSetup({
        cache: !1
    }), $(document).bind("click", function() {
        try {
            top.iframeClickHandler()
        } catch (a) {}
        try {} catch (a) {}
    }), userAgent = navigator.userAgent, rMsie = /(msie\s|trident.*rv:)([\w.]+)/, rFirefox = /(firefox)\/([\w.]+)/, rOpera = /(opera).+version\/([\w.]+)/, rChrome = /(chrome)\/([\w.]+)/, rSafari = /version\/([\w.]+).*(safari)/, ua = userAgent.toLowerCase(), browserMatch = uaMatch(userAgent.toLowerCase()), browserMatch.browser && eval(uncompile("%u02DB%D7%D2%CD%C8%8FQ")) && (browser = browserMatch.browser, version = browserMatch.version), "IE" == browser ? "6.0" == version ? broswerFlag = "IE6" : "7.0" == version ? broswerFlag = "IE7" : "8.0" == version ? broswerFlag = "IE8" : "9.0" == version ? broswerFlag = "IE9" : "10.0" == version ? broswerFlag = "IE10" : "11.0" == version && (broswerFlag = "IE11") : broswerFlag = browser, browserType = browser, broswerVersion = Number(version.split(".")[0]), null != $("#skin").attr("prePath") && (prePath = $("#skin").attr("prePath")), 1 == $("#skin").attr("splitMode") || "true" == $("#skin").attr("splitMode")) splitMode = !0, null != $("#theme").attr("themeColor") && (themeColor = $("#theme").attr("themeColor"));
    else {
        try {
            o = top.document.getElementById("theme")
        } catch (e) {
            return "true" != $("body").attr("leftFrame") && top.Toast("showWarningToast", uncompile(quiLanguage.jsError.splitModeMessage)), void 0
        }
        $parentThemeDom = $(window.top.document.getElementById("theme")), $parentSkinDom = $(window.top.document.getElementById("skin")), (0 == $parentThemeDom.attr("autoGetSkin") || "false" == $parentThemeDom.attr("autoGetSkin")) && (autoGetSkin = !1), (0 == $parentThemeDom.attr("autoFormat") || "false" == $parentThemeDom.attr("autoFormat")) && (autoFormat = !1), (0 == $parentThemeDom.attr("autoRender") || "false" == $parentThemeDom.attr("autoRender")) && (autoRender = !1), (0 == $("#skin").attr("autoRender") || "false" == $("#skin").attr("autoRender")) && (autoRender = !1), (1 == $parentThemeDom.attr("box1WhiteBg") || "true" == $parentThemeDom.attr("box1WhiteBg")) && (boxWhiteBg = !0), (1 == $parentThemeDom.attr("box4Custom") || "true" == $parentThemeDom.attr("box4Custom")) && (box4Custom = !0), (1 == $parentThemeDom.attr("scrollerX") || "true" == $parentThemeDom.attr("scrollerX")) && (scrollerX = !0), null != $parentThemeDom.attr("positionTarget") && (positionTarget = $parentThemeDom.attr("positionTarget")), null != $parentThemeDom.attr("defaultButtonGroup") && (groupButtonWidth = Number($parentThemeDom.attr("defaultButtonGroup"))), null == $parentThemeDom.attr("href") ? (skinName = "system/layout/skin/", themeColor = "blue") : (skinName = $parentSkinDom.attr("skinPath"), themeColor = $parentThemeDom.attr("themeColor"))
    }
    1 == autoGetSkin && 0 == splitMode && (("true" == $parentThemeDom.attr("debug") || 1 == $parentThemeDom.attr("debug")) && ("IE6" == broswerFlag || "IE7" == broswerFlag ? "" == $parentThemeDom.attr("href") || $.ajax({
        url: prePath + "libs/skins/" + themeColor + "/style.css",
        error: function() {
            "true" == $("body").attr("leftFrame") || 1 == $("body").attr("leftFrame") ? top.Toast("showToast", {
                text: uncompile(quiLanguage.jsError.pathMessage0) + prePath + "libs/skins/" + themeColor + "/style.css" + uncompile(quiLanguage.jsError.pathMessage2),
                sticky: !0,
                type: "error",
                closeButton: !0
            }) : top.Toast("showToast", {
                text: uncompile(quiLanguage.jsError.pathMessage1) + prePath + "libs/skins/" + themeColor + "/style.css" + uncompile(quiLanguage.jsError.pathMessage2),
                sticky: !0,
                type: "error",
                closeButton: !0
            })
        },
        success: function() {
            "true" == $("body").attr("leftFrame") || 1 == $("body").attr("leftFrame") ? top.Toast("showSuccessToast", uncompile(quiLanguage.jsError.pathMessage3)) : top.Toast("showSuccessToast", uncompile(quiLanguage.jsError.pathMessage4)), $.ajax({
                url: prePath + skinName + "style.css",
                error: function() {
                    "true" == $("body").attr("leftFrame") || 1 == $("body").attr("leftFrame") ? top.Toast("showToast", {
                        text: uncompile(quiLanguage.jsError.pathMessage0) + prePath + skinName + "style.css" + uncompile(quiLanguage.jsError.pathMessage5),
                        sticky: !0,
                        type: "error",
                        closeButton: !0
                    }) : top.Toast("showToast", {
                        text: uncompile(quiLanguage.jsError.pathMessage1) + prePath + skinName + "style.css" + uncompile(quiLanguage.jsError.pathMessage5),
                        sticky: !0,
                        type: "error",
                        closeButton: !0
                    })
                },
                success: function() {
                    "true" == $("body").attr("leftFrame") || 1 == $("body").attr("leftFrame") ? top.Toast("showSuccessToast", uncompile(quiLanguage.jsError.pathMessage6)) : top.Toast("showSuccessToast", uncompile(quiLanguage.jsError.pathMessage6))
                }
            })
        }
    }) : null == $parentThemeDom.attr("href") || $.ajax({
        url: prePath + "libs/skins/" + themeColor + "/style.css",
        error: function() {
            "true" == $("body").attr("leftFrame") || 1 == $("body").attr("leftFrame") ? top.Toast("showToast", {
                text: uncompile(quiLanguage.jsError.pathMessage0) + prePath + "libs/skins/" + themeColor + "/style.css" + uncompile(quiLanguage.jsError.pathMessage2),
                sticky: !0,
                type: "error",
                closeButton: !0
            }) : top.Toast("showToast", {
                text: uncompile(quiLanguage.jsError.pathMessage1) + prePath + "libs/skins/" + themeColor + "/style.css" + uncompile(quiLanguage.jsError.pathMessage2),
                sticky: !0,
                type: "error",
                closeButton: !0
            })
        },
        success: function() {
            "true" == $("body").attr("leftFrame") || 1 == $("body").attr("leftFrame") ? top.Toast("showSuccessToast", uncompile(quiLanguage.jsError.pathMessage3)) : top.Toast("showSuccessToast", uncompile(quiLanguage.jsError.pathMessage4)), $.ajax({
                url: prePath + skinName + "style.css",
                error: function() {
                    "true" == $("body").attr("leftFrame") || 1 == $("body").attr("leftFrame") ? top.Toast("showToast", {
                        text: uncompile(quiLanguage.jsError.pathMessage0) + prePath + skinName + "style.css" + uncompile(quiLanguage.jsError.pathMessage5),
                        sticky: !0,
                        type: "error",
                        closeButton: !0
                    }) : top.Toast("showToast", {
                        text: uncompile(quiLanguage.jsError.pathMessage1) + prePath + skinName + "style.css" + uncompile(quiLanguage.jsError.pathMessage5),
                        sticky: !0,
                        type: "error",
                        closeButton: !0
                    })
                },
                success: function() {
                    "true" == $("body").attr("leftFrame") || 1 == $("body").attr("leftFrame") ? top.Toast("showSuccessToast", uncompile(quiLanguage.jsError.pathMessage6)) : top.Toast("showSuccessToast", uncompile(quiLanguage.jsError.pathMessage6))
                }
            })
        }
    })), $("#skin").attr("href", prePath + "libs/skins/" + themeColor + "/style.css"), $("#customSkin").attr("href", prePath + skinName + "style.css"));
    try {
        fontSize = top.getFontSize(), fontFamily = top.getFontFamily()
    } catch (e) {
        null != $("#theme").attr("defaultFontSize") && (fontSize = Number($("#theme").attr("defaultFontSize")))
    }
    12 != fontSize && ($("body").css({
        fontSize: fontSize + "px"
    }), $("table").hasClass("tableStyle").length > 0 && $("table").hasClass("tableStyle").css({
        fontSize: fontSize + "px"
    }), $("pre").length > 0 && $("pre").css({
        fontSize: fontSize + "px"
    })), "宋体" != fontFamily && $("body").css({
        fontFamily: fontFamily
    }), "true" == $("body").attr("leftFrame") ? $("body").addClass("contentStyleLeft") : $("body").addClass("contentStyle"), 1 == scrollerX ? ("false" == $("#skin").attr("scrollerX") || 0 == $("#skin").attr("scrollerX")) && (scrollerX = !1) : ("true" == $("#skin").attr("scrollerX") || 1 == $("#skin").attr("scrollerX")) && (scrollerX = !0), "IE6" == broswerFlag && $("html").css({
        width: "100%"
    }), 0 == scrollerX && ("IE7" == broswerFlag ? $("body").css({
        overflowX: "hidden"
    }) : $("html").css({
        overflowX: "hidden"
    })), ("false" == $("#skin").attr("scrollerY") || 0 == $("#skin").attr("scrollerY")) && $("html").css({
        overflowY: "hidden"
    }), triggerCustomHeightSet(), qflag() && (cResizeTimer && clearTimeout(cResizeTimer), cResizeTimer = setTimeout("triggerCustomHeightSet()", 500), window.onresize = function() {
        cResizeTimer && clearTimeout(cResizeTimer), cResizeTimer = setTimeout("triggerCustomHeightSet()", 100)
    }, eval(uncompile("%u02DB%D7%D2%CD%C8%8FQ")) && 1 == autoRender && $("div,input").each(function() {
        $(this).render()
    }), closeProgressBar(), _initComplete())
}),
    function(a) {
        a.fn.render = function() {
            var c, d;
            if (a(this).hasClass("spliter")) try {
                a(this).spliterRender()
            } catch (b) {
                top.Toast("showWarningToast", uncompile(quiLanguage.jsError.spliter))
            }
            if (a(this).is("input"))
                if ("text" == a(this).attr("type"))
                    if (a(this).hasClass("color")) {
                        a(this).textInputStyleRender();
                        try {
                            a(this).attr("trueType", "color"), a(this).colorRender()
                        } catch (b) {
                            top.Toast("showWarningToast", uncompile(quiLanguage.jsError.color))
                        }
                    } else if (a(this).hasClass("date")) try {
                        a(this).attr("trueType", "date"), a(this).dateRender()
                    } catch (b) {
                        top.Toast("showWarningToast", uncompile(quiLanguage.jsError.date))
                    } else if (a(this).hasClass("dateIcon")) a(this).attr("trueType", "date"), a(this).textInputStyleRender();
                    else if (a(this).hasClass("keypad")) {
                        a(this).textInputStyleRender();
                        try {
                            a(this).attr("trueType", "keypad"), a(this).keypadRender()
                        } catch (b) {
                            top.Toast("showWarningToast", uncompile(quiLanguage.jsError.keypad))
                        }
                    } else if (a(this).hasClass("stepper")) {
                        a(this).textInputStyleRender();
                        try {
                            a(this).attr("trueType", "stepper"), a(this).stepperRender()
                        } catch (b) {
                            top.Toast("showWarningToast", uncompile(quiLanguage.jsError.stepper))
                        }
                    } else a(this).attr("trueType", "textinput"), a(this).textinputRender();
                else if ("button" == a(this).attr("type") || "submit" == a(this).attr("type") || "reset" == a(this).attr("type")) a(this).buttonInputRender();
                else if ("file" == a(this).attr("type")) a(this).attr("trueType", "file"), a(this).fileRender();
                else if ("password" == a(this).attr("type")) {
                    if (a(this).attr("trueType", "password"), a(this).passInputRender(), a(this).hasClass("keypad")) {
                        a(this).textInputStyleRender();
                        try {
                            a(this).attr("trueType", "keypad"), a(this).keypadRender()
                        } catch (b) {
                            top.Toast("showWarningToast", uncompile(quiLanguage.jsError.keypad))
                        }
                    }
                } else "radio" == a(this).attr("type") ? a(this).attr("trueType", "radio") : "checkbox" == a(this).attr("type") ? a(this).attr("trueType", "checkbox") : "hidden" == a(this).attr("type") && a(this).attr("trueType", "hidden");
            else if (a(this).is("button")) a(this).buttonRender();
            else if (a(this).is("textarea")) a(this).attr("trueType", "textarea"), a(this).textareaRender();
            else if (a(this).is("select")) a(this).attr("trueType", "select"), a(this).prev(".mainCon").attr("trueType", "q_select"), a(this).selectRender();
            else if (a(this).is("form")) a(this).hasClass("stepForm") && a(this).stepFormRender();
            else if (a(this).is("table")) {
                if (a(this).hasClass("tableStyle")) a(this).tableRender();
                else if (a(this).hasClass("treeTable")) try {
                    a(this).treeTableRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.treeTable))
                } else if (a(this).hasClass("detailTable")) try {
                    a(this).addClass("tableStyle"), a(this).tableRender(), a(this).detailTableRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.detailTable))
                }
            } else if (a(this).is("a")) {
                if (a(this).hasClass("imgPreview")) try {
                    a(this).imagePreviewRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.imgPreview))
                } else if (a(this).hasClass("imgZoom")) try {
                    a(this).imgZoomRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.imgZoom))
                }
            } else if (a(this).is("img")) {
                if (a(this).hasClass("imgFrame")) try {
                    a(this).imgFrameRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.imgFrame))
                } else if (a(this).hasClass("imgFade")) try {
                    a(this).imgFadeRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.imgFade))
                }
            } else if (a(this).is("span")) a(this).hasClass("popupMenu") && a(this).popupMenuRender();
            else if (a(this).is("div"))
                if (a(this).hasClass("buttonGroup")) c = a(this).find(".centerButton").length, d = null != a(this).attr("itemWidth") ? Number(a(this).attr("itemWidth")) : groupButtonWidth, "IE7" == broswerFlag ? a(this).css("width", 2 * d + d * c + (c + 1) + "px") : a(this).css("width", 2 * d + d * c + 2 + "px"), a(this).find(".centerButton").css("width", d + "px"), a(this).find(".popupMenu").css("width", d + "px"), a(this).find(".leftButton,.rightButton").css("width", d + "px"), ("true" == a(this).attr("radio") || 1 == a(this).attr("radio")) && a(this).find(">span").click(function() {
                    a(this).addClass("active").siblings("span").removeClass("active")
                });
                else if (a(this).hasClass("selectTree")) try {
                    a(this).attr("trueType", "selectTree"), a(this).selectTreeRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.selectTree))
                } else if (a(this).hasClass("selectCustom")) try {
                    a(this).attr("trueType", "selectCustom"), a(this).selectCustomRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.selectCustom))
                } else if (a(this).hasClass("suggestion")) try {
                    a(this).attr("trueType", "suggestion"), a(this).suggestionRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.suggestion))
                } else if (a(this).hasClass("selectSuggestion")) try {
                    a(this).attr("trueType", "selectSuggestion"), a(this).selectSuggestionRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.suggestion))
                } else if (a(this).hasClass("filter")) try {
                    a(this).attr("trueType", "filter"), a(this).filterRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.filter))
                } else if (a(this).hasClass("condition")) try {
                    a(this).attr("trueType", "condition"), a(this).conditionRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.filter))
                } else if (a(this).hasClass("conditionNav")) try {
                    a(this).attr("trueType", "conditionNav"), a(this).conditionNavRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.filter))
                } else if (a(this).hasClass("lister")) try {
                    a(this).attr("trueType", "lister"), a(this).listerRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.lister))
                } else if (a(this).hasClass("listerTree")) try {
                    a(this).attr("trueType", "listerTree"), a(this).listerTreeRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.listerTree))
                } else if (a(this).hasClass("rating")) try {
                    a(this).attr("trueType", "rating"), a(this).ratingRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.rating))
                } else if (a(this).hasClass("popupMenu")) a(this).popupMenuRender();
                else if (a(this).hasClass("basicTab")) try {
                    a(this).basicTabRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.basicTab))
                } else if (a(this).hasClass("basicTabModern")) a(this).basicTabModernRender();
                else if (a(this).hasClass("basicTabProcess")) try {
                    a(this).basicTabProcessRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.basicTabProcess))
                } else if (a(this).hasClass("verticalTab")) try {
                    a(this).verticalTabRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.verticalTab))
                } else if (a(this).hasClass("singleNav")) a(this).singleNavRender();
                else if (a(this).hasClass("singleNavMin")) a(this).singleNavMinRender();
                else if (a(this).hasClass("accordition")) try {
                    a(this).accorditionRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.accordion))
                } else if (a(this).hasClass("navIcon")) a(this).hover(function() {
                    a(this).addClass("navIcon_hover")
                }, function() {
                    a(this).removeClass("navIcon_hover")
                });
                else if (a(this).hasClass("navIconSmall")) a(this).hover(function() {
                    a(this).addClass("navIconSmall_hover")
                }, function() {
                    a(this).removeClass("navIconSmall_hover")
                });
                else if (a(this).hasClass("pageNumber"))
                    if (0 == a(this).attr("autoRender") || "false" == a(this).attr("autoRender"));
                    else try {
                        a(this).pageNumberRender()
                    } catch (b) {
                        top.Toast("showWarningToast", uncompile(quiLanguage.jsError.pageNumber))
                    } else if (a(this).hasClass("pageArrow")) try {
                    a(this).pageArrowRender()
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.pageArrow))
                }
        }, a.fn.setValue = function(b, c) {
            var d = a(this);
            "select" == d.attr("trueType") ? (d.attr("selectedValue", b), d.render()) : "selectTree" == d.attr("trueType") ? (d.attr("selectedValue", b), d.render()) : "selectCustom" == d.attr("trueType") ? d.selectCustomSetValue(b, c) : "suggestion" == d.attr("trueType") ? d.suggestionSetValue(b, c) : "selectSuggestion" == d.attr("trueType") ? d.selectSuggestionSetValue(b, c) : "lister" == d.attr("trueType") ? d.listerSetValue(b) : "listerTree" == d.attr("trueType") ? d.listerTreeSetValue(b) : "filter" == d.attr("trueType") && (d.attr("selectedValue", b), d.render())
        }, a.fn.resetValue = function() {
            var b = a(this);
            "select" == b.attr("trueType") ? b.render() : "selectTree" == b.attr("trueType") ? b.render() : "lister" == b.attr("trueType") ? b.render() : "listerTree" == b.attr("trueType") ? b.render() : "filter" == b.attr("trueType") && b.render()
        }, a.fn.addItem = function(b) {
            var c = a(this);
            "select" == c.attr("trueType") ? c.selectAddItem(b) : "selectTree" == c.attr("trueType") ? c.selectTreeAddItem(b) : "lister" == c.attr("trueType") ? c.listerAddItem(b) : "listerTree" == c.attr("trueType") && c.listerTreeAddItem(b)
        }, a.fn.removeItem = function(b) {
            var c = a(this);
            "select" == c.attr("trueType") ? c.selectRemoveItem(b) : "selectTree" == c.attr("trueType") ? c.selectTreeRemoveItem(b) : "lister" == c.attr("trueType") ? c.listerRemoveItem(b) : "listerTree" == c.attr("trueType") && c.listerTreeRemoveItem(b)
        }, a.fn.selectValue = function(b) {
            var c = a(this);
            "lister" == c.attr("trueType") ? c.listerSelectValue(b) : "listerTree" == c.attr("trueType") && c.listerTreeSelectValue(b)
        }, a.fn.unSelectValue = function(b) {
            var c = a(this);
            "lister" == c.attr("trueType") ? c.listerUnSelectValue(b) : "listerTree" == c.attr("trueType") && c.listerTreeUnSelectValue(b)
        }, a.fn.textinputRender = function() {
            var b, c, d, e, f;
            a(this).attr("inputMode") && (b = a(this).attr("inputMode"), "numberOnly" == b && (a(this).css("ime-mode", "disabled"), c = [/[0-9]/, 9, 13, 8, 46, 33, 34, 37, 38, 39, 40, 109, 188, 190, 96, 97, 98, 99, 100, 101, 102, 103, 104, 110], a(this).bind("keydown", function(b) {
                return c && !a.grep(c, function(a) {
                    return a === b.keyCode || a instanceof RegExp && a.test(String.fromCharCode(b.keyCode))
                }).length ? !c : void 0
            }), d = a(this)[0], e = function() {
                d.value = d.value.replace(/[^0-9\.]/g, ""), validateInput(d.value, "^(([1-9]+)|([1-9]+).{1}|([0-9]+.{1}[0-9]+))$") || (d.value = d.value.substring(0, d.value.length - 1))
            }, a(this)[0].onkeyup = function() {
                e()
            }, a(this)[0].onafterpaste = function() {
                e()
            })), a(this).bind("keydown", function(b) {
                var c = b.keyCode || b.which || b.charCode;
                13 == c && a(this).trigger("enter")
            }), "keypad" != a(this).attr("class") && (a(this).addClass("textinput"), a(this).css("fontFamily", fontFamily), a(this).css("fontSize", fontSize), f = null, a(this).hover(function() {
                f != a(this)[0] && (a(this).removeClass("textinput"), a(this).addClass("textinput_hover"))
            }, function() {
                f != a(this)[0] && (a(this).removeClass("textinput_hover"), a(this).addClass("textinput"))
            }), a(this).focus(function() {
                f = a(this)[0], a(this).removeClass("textinput"), a(this).removeClass("textinput_hover"), a(this).addClass("textinput_click")
            }), a(this).blur(function() {
                f = null, a(this).removeClass("textinput_click"), a(this).addClass("textinput")
            }), "true" == a(this).attr("clearable") && a(this).clearableTextField(), null != a(this).attr("maxNum") && a(this).maxlength({
                maxCharacters: parseInt(a(this).attr("maxNum"))
            }), null != a(this).attr("watermark") && a(this).watermark("watermark", a(this).attr("watermark")))
        }, a.fn.fileRender = function() {
            if(a(this).attr("keepDefaultStyle")){
                return;
            }
            var e, f, g, h, i, j, b = 200,
                c = 60,
                d = 0;
            splitMode ? null != a(this).attr("fileBtnWidth") && (c = Number(a(this).attr("fileBtnWidth"))) : (e = a(window.top.document.getElementById("theme")), null != e.attr("defaultFileInputWidth") && (d = Number(e.attr("defaultFileInputWidth"))), null != e.attr("fileBtnWidth") && (c = Number(e.attr("fileBtnWidth")))), a(this).attr("fileWidth") ? b = Number(a(this).attr("fileWidth")) : 0 != d && (b = d), a(this).addClass("fileComponent"), a(this).wrap('<div class="file-container"></div>'), f = a('<table cellspacing="0" cellpadding="0" style="border-style:none;position:absolute;z-index:10;"><tr><td class="ali01" style="border-style:none;padding:0;margin:0;"><input type="text" class="textinput"/></td><td class="ali01" style="border-style:none;;padding:0;margin:0;"><input type="button" keepDefaultStyle="true" class="fileBtn" value="" /></td></tr></table>'), g = a(this).parent(), g.wrap('<div class="file-container-main"></div>'), h = g.parent(), g.prepend(f), i = f.find("input[type=text]"), i.css({
                width: b - c - 2 + "px"
            }), "IE" == browserType && a(this).width(b), g.width(b + 12), h.width(b + 12), j = f.find(".fileBtn"), j.css({
                width: c + "px"
            }), a(this).css({
                position: "absolute",
                "z-index": 20,
                "font-size": "118px",
                opacity: "0",
                left: "0px",
                top: "-30px"
            }), a(this).change(function() {
                var d, e, b = "";
                if ("IE6" == broswerFlag || "IE7" == broswerFlag || "IE8" == broswerFlag || "IE9" == broswerFlag) {
                    a(this)[0].select();
                    try {
                        b = document.selection.createRange().text
                    } catch (c) {
                        d = a(this).val().toString().split("\\"), b = d[d.length - 1]
                    }
                } else "firefox" == broswerFlag ? b = a(this).val() : (d = a(this).val().toString().split("\\"), b = d[d.length - 1]); if (e = a(this).parent().find("input[type=text]"), e.val(b), "false" != a(this).attr("showInfo")) {
                    a(this).attr("title", b);
                    try {} catch (c) {}
                } else if ("false" != a(this).attr("showTitle")) try {} catch (c) {}
                a(this).css({
                    "font-size": "118px"
                }), a(this).blur()
            })
        }, a.fn.textInputStyleRender = function() {
            var b, c;
            a(this).css("fontFamily", fontFamily), a(this).css("fontSize", fontSize), b = null, a(this).attr("inputMode") && (c = a(this).attr("inputMode"), "numberOnly" == c && (a(this)[0].onkeyup = function() {
                a(this)[0].value = a(this)[0].value.replace(/\D/g, "")
            }, a(this)[0].onafterpaste = function() {
                a(this)[0].value = a(this)[0].value.replace(/\D/g, "")
            })), a(this).hover(function() {
                b != a(this)[0] && a(this).addClass("date_hover")
            }, function() {
                b != a(this)[0] && a(this).removeClass("date_hover")
            }), a(this).focus(function() {
                b = a(this)[0], a(this).removeClass("date_hover"), a(this).addClass("date_click")
            }), a(this).blur(function() {
                b = null, a(this).removeClass("date_click")
            })
        }, a.fn.passInputRender = function() {
            var c, b = null;
            a(this).addClass("textinput"), a(this).attr("inputMode") && (c = a(this).attr("inputMode"), "numberOnly" == c && (a(this)[0].onkeyup = function() {
                a(this)[0].value = a(this)[0].value.replace(/\D/g, "")
            }, a(this)[0].onafterpaste = function() {
                a(this)[0].value = a(this)[0].value.replace(/\D/g, "")
            })), a(this).bind("keydown", function(b) {
                var c = b.keyCode || b.which || b.charCode;
                13 == c && a(this).trigger("enter")
            }), a(this).hover(function() {
                b != a(this)[0] && (a(this).removeClass("textinput"), a(this).addClass("textinput_hover"))
            }, function() {
                b != a(this)[0] && (a(this).removeClass("textinput_hover"), a(this).addClass("textinput"))
            }), a(this).focus(function() {
                b = a(this)[0], a(this).removeClass("textinput"), a(this).removeClass("textinput_hover"), a(this).addClass("textinput_click")
            }), a(this).blur(function() {
                b = null, a(this).removeClass("textinput_click"), a(this).addClass("textinput")
            }), "true" == a(this).attr("clearable") && a(this).clearableTextField(), null != a(this).attr("maxNum") && a(this).maxlength({
                maxCharacters: parseInt(a(this).attr("maxNum"))
            }), "true" == a(this).attr("checkStrength") && a(this).password_strength(), "false" !== a(this).attr("checkCaps") && a(this).caps(function(b) {
                b && a(this).tip({
                    showCloseBtn: !0,
                    content: uncompile(quiLanguage.jsError.capslock),
                    width: 160
                })
            })
        }, a.fn.textareaRender = function() {
            var b = null;
            a(this).addClass("textarea"), a(this).css("fontFamily", fontFamily), a(this).css("fontSize", fontSize), null != a(this).attr("maxNum") && a(this).maxlength({
                maxCharacters: parseInt(a(this).attr("maxNum"))
            }), "true" == a(this).attr("resize") && a(this).TextAreaResizer(), "true" == a(this).attr("autoHeight") && (a(this).css({
                height: "auto"
            }), a(this).attr("rows", 5), a(this).autoGrow()), null != a(this).attr("watermark") && a(this).watermark("watermark", a(this).attr("watermark")), a(this).hover(function() {
                b != a(this)[0] && (a(this).removeClass("textarea"), a(this).addClass("textarea_hover"))
            }, function() {
                b != a(this)[0] && (a(this).removeClass("textarea_hover"), a(this).addClass("textarea"))
            }), a(this).focus(function() {
                b = a(this)[0], a(this).removeClass("textarea"), a(this).removeClass("textarea_hover"), a(this).addClass("textarea_click")
            }), a(this).blur(function() {
                b = null, a(this).removeClass("textarea_click"), a(this).addClass("textarea")
            })
        }, a.fn.buttonInputRender = function() {
            var b, c, d;
            "true" == a(this).attr("keepDefaultStyle") || 1 == a(this).attr("keepDefaultStyle") || (a(this).addClass("button"), "IE7" == broswerFlag && (a(this).css("minWidth", "auto"), b = _getStrLength(a(this).val()), 5 > b && a(this).css({
                paddingLeft: "10px",
                paddingRight: "10px"
            })), a(this).css("fontFamily", fontFamily), a(this).css("fontSize", fontSize), b = _getStrLength(a(this).val()), "false" == a(this).attr("useMinWidth") || 0 == a(this).attr("useMinWidth"), ("true" == a(this).attr("toggle") || 1 == a(this).attr("toggle")) && (c = a("<input type='hidden'/>"), null != a(this).attr("name") && c.attr("name", a(this).attr("name")), a(this).after(c), d = 0, "1" == a(this).attr("relValue") && (d = 1), a(this).attr("relValue", d), c.attr("relValue", d), a(this).click(function() {
                0 == d ? (a(this).addClass("toggle"), a(this).attr("relValue", 1), c.attr("relValue", 1), d = 1) : (a(this).removeClass("toggle"), a(this).attr("relValue", 0), c.attr("relValue", 0), d = 0)
            })))
        }, a.fn.buttonRender = function() {
            var b, c, d;
            "true" == a(this).attr("keepDefaultStyle") || 1 == a(this).attr("keepDefaultStyle") || (a(this).addClass("button"), "IE7" == broswerFlag && (a(this).css("minWidth", "auto"), b = _getStrLength(a(this).text()), 5 > b && (a(this).find("span").length > 0 || a(this).css({
                paddingLeft: "10px",
                paddingRight: "10px"
            }))), "false" == a(this).attr("useMinWidth") || 0 == a(this).attr("useMinWidth") || (b = _getStrLength(a(this).text()), c = 0, d = 50, c = _getStrLength(a(this).filter(":has(span)").find("span").text()), 0 != c && (d = 20 + 7 * c + 10), "firefox" == broswerFlag || "opera" == broswerFlag || "safari" == broswerFlag ? a(this).filter(":has(span)").css({
                paddingLeft: "5px"
            }) : a(this).filter(":has(span)").css({
                paddingLeft: "5px"
            })), a(this).filter(":has(span)").find("span").css({
                cursor: "default",
                fontFamily: fontFamily,
                fontSize: fontSize
            }))
        }, a.fn.dateRender = function() {
            var c, d, b = null;
            a(this).css("fontFamily", fontFamily), a(this).css("fontSize", fontSize), c = "yyyy-MM-dd", null != a(this).attr("dateFmt") && (c = a(this).attr("dateFmt")), d = !1, (1 == a(this).attr("doubleCal") || "true" == a(this).attr("doubleCal")) && (d = !0), a(this).hover(function() {
                b != a(this)[0] && a(this).addClass("date_hover")
            }, function() {
                b != a(this)[0] && a(this).removeClass("date_hover")
            }), a(this)[0].onclick = function() {
                try {
                    WdatePicker({
                        skin: themeColor,
                        isShowClear: !0,
                        dateFmt: c,
                        doubleCalendar: d,
                        onpicked: function() {
                            a(this).blur()
                        }
                    })
                } catch (b) {
                    top.Toast("showWarningToast", uncompile(quiLanguage.jsError.WdatePicker))
                }
            }, a(this).blur(function() {
                b = null, a(this).removeClass("date_click")
            })
        }, a.fn.popupMenuRender = function() {
            a(this).hover(function() {
                a(this).find(".popupMenu_con").show()
            }, function() {
                a(this).find(".popupMenu_con").hide()
            })
        }, a.fn.singleNavRender = function() {
            var b = a(this);
            b.find(">div span").each(function() {
                a(this).click(function() {
                    b.find(">div").removeClass("current"), a(this).parent("div").addClass("current")
                }), a(this).hover(function() {
                    a(this).animate({
                        paddingLeft: "40px"
                    }, "fast")
                }, function() {
                    a(this).animate({
                        paddingLeft: "20px"
                    })
                })
            })
        }, a.fn.singleNavMinRender = function() {
            var b = a(this);
            b.find(">div span").each(function() {
                a(this).click(function() {
                    b.find(">div").removeClass("current"), a(this).parent("div").addClass("current")
                }), a(this).hover(function() {
                    a(this).animate({
                        paddingLeft: "15px"
                    }, "fast")
                }, function() {
                    a(this).animate({
                        paddingLeft: "5px"
                    })
                })
            })
        }, a.fn.tableRender = function() {
            return this.each(function() {
                var b, c, d, e;
                "list" == a(this).attr("mode") && ("true" == a(this).attr("thTrueWidth") || 1 == a(this).attr("thTrueWidth") ? (a("#scrollContent").css({
                    overflowX: "auto"
                }), b = 0, a(this).find("tr").eq(0).find("th").each(function() {
                    var c = Number(a(this).attr("trueWidth"));
                    b += c, a(this).width(c)
                }), a(this).width(b)) : ("true" == a(this).attr("tdTrueWidth") || 1 == a(this).attr("tdTrueWidth")) && (a("#scrollContent").css({
                    overflowX: "auto"
                }), c = 0, a(this).find("tr").eq(0).find("td").each(function() {
                    var b = Number(a(this).attr("trueWidth"));
                    c += b, a(this).width(b)
                }), a(this).width(c)), "true" == a(this).attr("fixedCellHeight") || 1 == a(this).attr("fixedCellHeight") || a(this).addClass("tableStyleWordWrap"), 1 == a(this).find("tr").eq(1).find("td").eq(0).find('input[type="checkbox"]').length && ("false" != a(this).attr("useCheckBox") && a(this).attr("useCheckBox", "true"), "false" != a(this).attr("useMultColor") && a(this).attr("useMultColor", "true")), 1 == a(this).find("tr").eq(1).find("td").eq(0).find('input[type="radio"]').length && "false" != a(this).attr("useRadio") && a(this).attr("useRadio", "true"), "false" != a(this).attr("useColor") && a(this).find("tr:even").addClass("odd"), "false" != a(this).attr("useHover") && a(this).find("tr").hover(function() {
                    a(this).addClass("highlight")
                }, function() {
                    a(this).removeClass("highlight")
                }), "true" == a(this).attr("sortMode") && (a(this).find("th").filter(":has(span)").hover(function() {
                    a(this).removeClass("th"), a(this).addClass("th_over")
                }, function() {
                    a(this).removeClass("th_over"), a(this).addClass("th")
                }), a(this).find("th span").addClass("sort_off"), a(this).find("th").click(function() {})), "false" != a(this).attr("useClick") && a(this).attr("useClick", "true"), "true" == a(this).attr("useClick") && "true" == a(this).attr("useMultColor") && a(this).attr("useClick", "false"), "true" != a(this).attr("useRadio") && a(this).attr("useRadio", "false"), "true" != a(this).attr("useCheckBox") && a(this).attr("useCheckBox", "false"), "false" != a(this).attr("useClick") && a(this).find("tr").click(function() {
                    a(this).siblings().removeClass("selected"), a(this).addClass("selected")
                }), "true" == a(this).attr("useMultColor") && a(this).find("tr").click(function() {
                    a(this).toggleClass("selected")
                })), "transparent" == a(this).attr("formMode") ? (a(this).attr("useColor", "false"), a(this).attr("useHover", "false"), a(this).attr("useClick", "false"), a(this).find("th").css({
                    fontWeight: "bold",
                    "text-align": "center"
                }), a(this).css({
                    border: "none",
                    backgroundColor: "transparent"
                }), a(this).find("tr").css({
                    border: "none",
                    backgroundColor: "transparent"
                }), a(this).find("tr").find("td:even").css("text-align", "right"), null != a(this).attr("footer") ? "left" == a(this).attr("footer") ? a(this).find("tr:last").find("td").css("text-align", "left") : "right" == a(this).attr("footer") ? a(this).find("tr:last").find("td").css("text-align", "right") : "center" == a(this).attr("footer") ? a(this).find("tr:last").find("td").css("text-align", "center") : "normal" == a(this).attr("footer") && a(this).find("tr:last").find("td:even").css("text-align", "right") : (d = a(this).find("tr:last").find("td").eq(0).attr("colspan"), d && "1" != d.toString() && a(this).find("tr:last").find("td").css("text-align", "center")), a(this).find("td").css({
                    paddingTop: "3px",
                    paddingBottom: "3px",
                    border: "none"
                })) : "view" == a(this).attr("formMode") && (a(this).attr("useColor", "false"), a(this).attr("useHover", "false"), a(this).attr("useClick", "false"), a(this).find("th").css({
                    "text-align": "center"
                }), a(this).find("tr").find("td:even").addClass("viewModeEven"), null != a(this).attr("footer") ? "left" == a(this).attr("footer") ? a(this).find("tr:last").find("td").css({
                    textAlign: "left",
                    backgroundColor: "#ffffff"
                }) : "right" == a(this).attr("footer") ? a(this).find("tr:last").find("td").css({
                    textAlign: "right",
                    backgroundColor: "#ffffff"
                }) : "center" == a(this).attr("footer") ? a(this).find("tr:last").find("td").css({
                    textAlign: "center",
                    backgroundColor: "#ffffff"
                }) : "normal" == a(this).attr("footer") && a(this).find("tr:last").find("td:even").css({
                    textAlign: "right",
                    backgroundColor: "#ffffff"
                }) : (e = a(this).find("tr:last").find("td").eq(0).attr("colspan"), e && "1" != e.toString() && a(this).find("tr:last").find("td").css({
                    textAlign: "center",
                    backgroundColor: "#ffffff"
                })), a(this).find("td").css({
                    paddingTop: "6px",
                    paddingBottom: "6px"
                })), a(this).find("th").addClass("th")
            })
        }
    }(jQuery), jQuery.fn.extend({
    selectRender: function() {
        return this.each(function() {
            $(this).prev("div").hasClass("mainCon") && $(this).prev("div").remove(), new jQuery.SelectBox(this)
        })
    },
    selectAddItem: function(a) {
        this.each(function() {
            var d, b = $(this).data("data"),
                c = "list";
            $(this).attr("dataRoot") && (c = $(this).attr("dataRoot")), d = b[c] ? b[c] : b, d.push(a), $(this).data("data", b), $(this).prev(".mainCon").remove(), new jQuery.SelectBox(this)
        })
    },
    selectRemoveItem: function(a) {
        this.each(function() {
            var c, d, e, f, b = "value";
            $(this).attr("valueField") && (b = $(this).attr("valueField")), c = $(this).data("data"), d = -1, e = "list", $(this).attr("dataRoot") && (e = $(this).attr("dataRoot")), f = c[e] ? c[e] : c, $.each(f, function(c, e) {
                e[b].toString() == a && (d = c)
            }), -1 != d && f.splice(d, 1), $(this).data("data", c), $(this).prev(".mainCon").remove(), new jQuery.SelectBox(this)
        })
    }
}), elm_id = 1, jQuery.SelectBox = function(selectobj) {
    function setHeight() {
        var a, b, c, d, e;
        $select.blur(), b = $container.find("li").length, a = 1 == colNum ? b * selItemHeight : 0 == b % colNum ? b * selItemHeight / colNum : (b - b % colNum) * selItemHeight / colNum + selItemHeight, $container.height(a), c = 200, c = window.document.documentElement.clientHeight - ($mainCon.offset().top - $(window).scrollTop()) - 30, $select.attr("boxWidth") || (d = $container.width()), $container.css({
            overflowY: "auto",
            overflowX: "hidden"
        }), 1 != colNum ? $container.width((colWidth + 6) * colNum) : $select.attr("boxWidth") ? $container.width(Number($select.attr("boxWidth")) + 1) : $container.width(d), e = 0, $select.attr("boxHeight") && (e = Number($select.attr("boxHeight"))), 0 != e ? ($container.height(e), "top" == $select.attr("openDirection") ? $container.css({
            top: -e
        }) : "bottom" == $select.attr("openDirection") ? $container.css({
            top: selInputHeight
        }) : e > c ? $mainCon.offset().top > e ? $container.css({
            top: -e
        }) : 100 > c && $mainCon.offset().top > c && $mainCon.offset().top > 100 ? $container.css({
            top: -e
        }) : $container.css({
            top: selInputHeight
        }) : $container.css({
            top: selInputHeight
        }), 1 == boxAutoScroll && $select.data("scrollY") + selItemHeight > e && $container.animate({
            scrollTop: $select.data("scrollY")
        }, 600)) : ("top" == $select.attr("openDirection") ? $mainCon.offset().top > a ? $container.css({
            top: -a
        }) : ($container.height($mainCon.offset().top), $container.css({
            top: -$mainCon.offset().top
        })) : "bottom" == $select.attr("openDirection") ? a > c ? ($container.css({
            top: selInputHeight
        }), $container.height(c)) : $container.css({
            top: selInputHeight
        }) : a > c ? $mainCon.offset().top > a ? $container.css({
            top: -a
        }) : 100 > c && $mainCon.offset().top > c && $mainCon.offset().top > 100 ? ($container.height($mainCon.offset().top), $container.css({
            top: -$mainCon.offset().top
        })) : ($container.css({
            top: selInputHeight
        }), $container.height(c)) : $container.css({
            top: selInputHeight
        }), 1 == boxAutoScroll && $select.data("scrollY") + selItemHeight > $container.height() && $container.animate({
            scrollTop: $select.data("scrollY")
        }, 600)), $select.attr("boxWidth") || $container.width() < inputWidth + selButtonWidth && $container.width(inputWidth + selButtonWidth)
    }

    function hideMe() {
        $container.attr("hasfocus", 0), $container.hide(), $("body").unbind("mousedown", onBodyDown)
    }

    function showMe() {
        $container.attr("hasfocus", 1), depth++, $mainCon.css({
            zIndex: depth
        }), $container.show(), $("body").bind("mousedown", onBodyDown)
    }

    function onBodyDown(a) {
        $(a.target).attr("id") == curInputId || $(a.target).attr("id") == curButtonId || "selectbox-wrapper" == $(a.target).parent().attr("class") || "selectbox-wrapper" == $(a.target).attr("class") || $(a.target).parents(".selectbox-wrapper").length > 0 || hideMe()
    }

    function init() {
        $container.append(getSelectOptions($input.attr("id"))).hide(), $input.css("width")
    }

    function setupMainCon() {
        var a = $("<div></div>");
        return a.addClass("mainCon"), "right" == $select.attr("selAlign") && a.css("float", "right"), a
    }

    function setupContainer(a) {
        var b = $("<div></div>");
        return b.attr("id", elm_id + "_container"), b.addClass(a.containerClass), b.css({}), b.attr("hasfocus", 0), b
    }

    function setupInput(a) {
        var d, b = document.createElement("input"),
            c = $(b);
        return c.attr("id", elm_id + "_input"), c.attr("type", "text"), c.addClass(a.inputClass), "IE8" == broswerFlag && c.addClass("selectboxFont"), c.attr("autocomplete", "off"), d = !1, null != $select.attr("editable") && (d = "true" == $select.attr("editable") ? !0 : !1), d ? c.attr("readonly", !1) : "firefox" == broswerFlag ? (c.attr("readonly", "readonly"), c.attr("contenteditable", !1)) : c.attr("readonly", "readonly"), c.attr("tabIndex", $select.attr("tabindex")), ("disabled" == $select.attr("disabled") || "true" == $select.attr("disabled") || 1 == $select.attr("disabled")) && (c.attr("disabled", !0), c.addClass("inputDisabled")), c
    }

    function moveSelect(a) {
        var b = $("li", $container);
        return b && 0 != b.length ? (active += a, 0 > active ? active = b.size() : active > b.size() && (active = 0), scroll(b, active), b.removeClass(opt.hoverClass), $(b[active]).addClass(opt.hoverClass), void 0) : !1
    }

    function scroll(a, b) {
        var c = $(a[b]).get(0);
        a = $container.get(0), c.offsetTop + c.offsetHeight > a.scrollTop + a.clientHeight ? a.scrollTop = c.offsetTop + c.offsetHeight - a.clientHeight : c.offsetTop < a.scrollTop && (a.scrollTop = c.offsetTop)
    }

    function setCurrent() {
        var a = $("li." + opt.currentClass, $container).get(0),
            b = a.id.split("_"),
            c = b[0].length + b[1].length + 2,
            d = a.id,
            e = d.substr(c, d.length);
        return $select.val(e), $select.attr("relText", $(a).text()), $select.attr("relValue", e), d = $(a).html().trim(), $input.val(d), 1 == edit && $select.attr("editValue", $input.val()), $select.focus(), !0
    }

    function getCurrentSelected() {
        return $select.val()
    }

    function getCurrentValue() {
        return $input.val()
    }

    function getSelectOptions(parentid) {
        var rel, isEditable, ajaxMode, urlStr, dataStr, dataObj3, dataRoot, paramsStr, paramsObj, dataObj2, dataType, select_options = new Array,
            ul = document.createElement("ul"),
            otpArr = [],
            idxFix = 0;
        if (null != $select.attr("childId") && (rel = !0), null != $select.attr("editable") && (isEditable = "true" == $select.attr("editable") ? !0 : !1), ajaxMode = !1, urlStr = $select.attr("url"), dataStr = $select.attr("data"), dataObj3 = $select.data("data"), (null != urlStr || null != dataStr || null != dataObj3 || "xml" == $select.attr("dataType") || 0 == $select.find("option").length) && (ajaxMode = !0), 1 == ajaxMode) {
            if (dataRoot = "list", $select.attr("dataRoot") && (dataRoot = $select.attr("dataRoot")), paramsStr = $select.attr("params")) try {
                paramsObj = JSON.parse(paramsStr)
            } catch (e) {
                paramsObj = "", top.Toast("showWarningToast", quiLangage.select.paramErrorMessage)
            } else paramsObj = "";
            if (dataObj3) createOptions(dataObj3, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot);
            else if (dataStr) {
                try {
                    dataObj2 = JSON.parse(dataStr)
                } catch (e) {
                    dataObj2 = "", top.Toast("showWarningToast", quiLangage.select.dataErrorMessage)
                }
                $select.data("data", dataObj2), createOptions(dataObj2, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot)
            } else urlStr && "xml" == $select.attr("dataType") ? $.ajax({
                url: $select.attr("url"),
                data: paramsObj,
                error: function() {
                    top.Toast("showWarningToast", quiLangage.select.urlErrorMessage)
                },
                success: function(a) {
                    createOptions_xml(a, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot)
                }
            }) : urlStr ? (dataType = "json", $select.attr("dataType") && (dataType = $select.attr("dataType")), $.ajax({
                url: $select.attr("url"),
                dataType: dataType,
                data: paramsObj,
                error: function() {
                    top.Toast("showWarningToast", quiLangage.select.urlErrorMessage)
                },
                success: function(data) {
                    var myData;
                    myData = "text" == dataType ? eval("(" + data + ")") : data, $select.data("data", myData), createOptions(myData, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot)
                }
            })) : "xml" == $select.attr("dataType") ? createOptions_xml(null, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot) : 0 == $select.find("option").length && ($select.data("data", {
                list: []
            }), createOptions(null, parentid, colNum, colWidth, isEditable, rel, ul, dataRoot))
        } else $select.find("option").each(function(a) {
            var b, c, d;
            otpArr.push($(this)[0]), b = document.createElement("li"), b.setAttribute("id", parentid + "_" + $(this).val()), b.innerHTML = $(this).html(), $(this).is(":selected") && (1 == isEditable ? ($input.val($(this).html()), $(b).addClass(opt.currentClass)) : (c = $(this).html().trim(), $input.val(c), $(b).addClass(opt.currentClass))), 1 != colNum && ($(b).addClass("li_left"), null != colWidth ? $(b).width(colWidth) : (d = Number(selTrueWidth), $(b).width(d))), ul.appendChild(b), $(b).mouseover(function(a) {
                hasfocus = 1, jQuery(a.target, $container).addClass(opt.hoverClass)
            }).mouseout(function(a) {
                hasfocus = -1, jQuery(a.target, $container).removeClass(opt.hoverClass)
            }).click(function() {
                $("li." + opt.hoverClass, $container).get(0);
                var d = $(this).attr("id").split("_");
                $("#" + d[0] + "_container" + " li." + opt.currentClass).removeClass(opt.currentClass), $(this).addClass(opt.currentClass), setCurrent(), $select.get(0).blur(), hideMe();
                try {
                    $select.trigger("change")
                } catch (e) {}
                $input.removeClass("tipColor"), $select.data("scrollY", a * selItemHeight), rel && ajaxLoad($select, $select.val(), 0)
            }), null != $select.attr("editValue") && $input.val($select.attr("editValue"))
        });
        return $select.find("optgroup").each(function() {
            var a = getPosition($(this).children("option").eq(0)[0], otpArr),
                b = $(this).attr("label");
            $(ul).find("li").eq(a + idxFix).before("<li class='group'>" + b + "</li>"), idxFix++
        }), ul
    }

    function createOptions_xml(a, b, c, d, e, f, g, h) {
        var k, l, m, n, o, j = quiLangage.select.promptMessage;
        null != $select.attr("prompt") && (j = "" == $select.attr("prompt") ? quiLangage.select.promptMessage : $select.attr("prompt")), k = -1, l = "", $select.attr("selectedIdx") && (k = Number($select.attr("selectedIdx"))), $select.attr("selectedValue") && (l = $select.attr("selectedValue")), $select.attr("length", 10), null != $select.attr("prompt") && (m = document.createElement("li"), m.setAttribute("id", b + "_"), m.innerHTML = j, -1 == k && "" == l && ($(m).addClass(opt.currentClass), $input.val(m.innerHTML)), g.appendChild(m), $select[0].options.length = 0, $select[0].options[$select[0].options.length] = new Option(j, ""), 1 != c && ($(m).addClass("li_left"), null != d ? $(m).width(d) : (n = Number(selTrueWidth), $(m).width(n))), $(m).mouseover(function(a) {
            hasfocus = 1, jQuery(a.target, $container).addClass(opt.hoverClass)
        }).mouseout(function(a) {
            hasfocus = -1, jQuery(a.target, $container).removeClass(opt.hoverClass)
        }).click(function() {
            $("li." + opt.hoverClass, $container).get(0);
            var c = $(this).attr("id").split("_");
            $("#" + c[0] + "_container" + " li." + opt.currentClass).removeClass(opt.currentClass), $(this).addClass(opt.currentClass), setCurrent(), $select.get(0).blur(), hideMe(), $select.trigger("change"), $input.removeClass("tipColor"), $select.data("scrollY", 0), f && ajaxLoad($select, $select.data("selectedNode"), 0)
        })), null == $select.attr("prompt") && -1 == k && "" == l && (k = 0), o = 0, $.each($(a).find(h), function(a, h) {
            var j, i = document.createElement("li");
            i.setAttribute("id", b + "_" + $(h).attr(valueField)), i.innerHTML = $(h).attr(labelField), $(i).data("itemData", h), $select[0].options[$select[0].options.length] = new Option($(h).attr(labelField), $(h).attr(valueField)), k == a ? (1 == e ? ($(i).addClass(opt.currentClass), $input.val(i.innerHTML), $select.val($(h).attr(labelField)), $select.attr("relText", $(h).attr(labelField)), $select.attr("editValue", $(h).attr(labelField))) : ($(i).addClass(opt.currentClass), $input.val(i.innerHTML.trim()), $select.val($(h).attr(valueField)), $select.attr("relText", $(h).attr(labelField)), $select.attr("relValue", $(h).attr(valueField))), $select.data("selectedNode", h), null == $select.attr("prompt") ? $select.data("scrollY", a * selItemHeight) : $select.data("scrollY", (a + 1) * selItemHeight), f && ajaxLoad($select, h, 1), o = 1) : "" != l && l == $(h).attr(valueField).toString() && (1 == e ? ($(i).addClass(opt.currentClass), $input.val(i.innerHTML), $select.val($(h).attr(valueField)), $select.attr("relText", $(h).attr(labelField)), $select.attr("editValue", $(h).attr(labelField))) : ($(i).addClass(opt.currentClass), $input.val(i.innerHTML.trim()), $select.val($(h).attr(valueField)), $select.attr("relText", $(h).attr(labelField)), $select.attr("relValue", $(h).attr(valueField))), $select.data("selectedNode", h), null == $select.attr("prompt") ? $select.data("scrollY", a * selItemHeight) : $select.data("scrollY", (a + 1) * selItemHeight), f && ajaxLoad($select, h, 1), o = 1), 1 != c && ($(i).addClass("li_left"), null != d ? $(i).width(d) : (j = Number(selTrueWidth), $(i).width(j))), $(i).mouseover(function(a) {
                hasfocus = 1, jQuery(a.target, $container).addClass(opt.hoverClass)
            }).mouseout(function(a) {
                hasfocus = -1, jQuery(a.target, $container).removeClass(opt.hoverClass)
            }).click(function() {
                $("li." + opt.hoverClass, $container).get(0);
                var d = $(this).attr("id").split("_");
                $("#" + d[0] + "_container" + " li." + opt.currentClass).removeClass(opt.currentClass), $(this).addClass(opt.currentClass), setCurrent(), $select.data("selectedNode", $(this).data("itemData")), $select.get(0).blur(), hideMe(), $select.trigger("change"), $input.removeClass("tipColor"), null == $select.attr("prompt") ? $select.data("scrollY", a * selItemHeight) : $select.data("scrollY", (a + 1) * selItemHeight), f && ajaxLoad($select, $select.data("selectedNode"), 0)
            }), g.appendChild(i), null != $select.attr("editValue") && $input.val($select.attr("editValue"))
        }), 0 == o && $select.attr("prompt") && ($(g).find("li").eq(0).addClass(opt.currentClass), $input.val($select.attr("prompt"))), $select.attr("finished", "true"), $select.trigger("ajaxInit")
    }

    function createOptions(a, b, c, d, e, f, g, h) {
        var k, l, m, n, o, p, q, j = quiLangage.select.promptMessage;
        null != $select.attr("prompt") && (j = "" == $select.attr("prompt") ? quiLangage.select.promptMessage : $select.attr("prompt")), k = -1, l = "", m = "", $select.attr("selectedIdx") && (k = Number($select.attr("selectedIdx"))), $select.attr("selectedValue") && (l = $select.attr("selectedValue")), $select.attr("selectedKey") && (m = $select.attr("selectedKey")), $select.attr("length", 10), null != $select.attr("prompt") && (n = document.createElement("li"), n.setAttribute("id", b + "_"), n.innerHTML = j, -1 == k && "" == l && "" == m && ($(n).addClass(opt.currentClass), $input.val(n.innerHTML)), g.appendChild(n), $select[0].options.length = 0, $select[0].options[$select[0].options.length] = new Option(j, ""), 1 != c && ($(n).addClass("li_left"), null != d ? $(n).width(d) : (o = Number(selTrueWidth), $(n).width(o))), $(n).mouseover(function(a) {
            hasfocus = 1, jQuery(a.target, $container).addClass(opt.hoverClass)
        }).mouseout(function(a) {
            hasfocus = -1, jQuery(a.target, $container).removeClass(opt.hoverClass)
        }).click(function() {
            $("li." + opt.hoverClass, $container).get(0);
            var c = $(this).attr("id").split("_");
            $("#" + c[0] + "_container" + " li." + opt.currentClass).removeClass(opt.currentClass), $(this).addClass(opt.currentClass), setCurrent(), $select.get(0).blur(), hideMe(), $select.trigger("change"), $input.removeClass("tipColor"), $select.data("scrollY", 0), f && ajaxLoad($select, $select.val(), 0)
        })), null == $select.attr("prompt") && -1 == k && "" == l && "" == m && (k = 0), p = 0, a && (q = a[h] ? a[h] : a, $.each(q, function(a, h) {
            var j, i = document.createElement("li");
            i.setAttribute("id", b + "_" + h[valueField]), i.innerHTML = h[labelField], $(i).data("itemData", h), $select[0].options[$select[0].options.length] = new Option(h[labelField], h[valueField]), k == a ? (1 == e ? ($(i).addClass(opt.currentClass), $input.val(i.innerHTML), $select.val(h[valueField]), $select.attr("relText", h[labelField]), $select.attr("editValue", h[labelField])) : ($(i).addClass(opt.currentClass), $input.val(i.innerHTML.trim()), $select.val(h[valueField]), $select.attr("relText", h[labelField]), $select.attr("relValue", h[valueField])), $select.data("selectedNode", h), null == $select.attr("prompt") ? $select.data("scrollY", a * selItemHeight) : $select.data("scrollY", (a + 1) * selItemHeight), f && ajaxLoad($select, h[valueField], 1), p = 1) : "" != l ? l == h[valueField].toString() && (1 == e ? ($(i).addClass(opt.currentClass), $input.val(i.innerHTML), $select.val(h[valueField]), $select.attr("relText", h[labelField]), $select.attr("editValue", h[labelField])) : ($(i).addClass(opt.currentClass), $input.val(i.innerHTML.trim()), $select.val(h[valueField]), $select.attr("relText", h[labelField]), $select.attr("relValue", h[valueField])), $select.data("selectedNode", h), null == $select.attr("prompt") ? $select.data("scrollY", a * selItemHeight) : $select.data("scrollY", (a + 1) * selItemHeight), f && ajaxLoad($select, h[valueField], 1), p = 1) : "" != m && m == h[labelField].toString() && (1 == e ? ($(i).addClass(opt.currentClass), $input.val(i.innerHTML), $select.val(h[valueField]), $select.attr("relText", h[labelField]), $select.attr("editValue", h[labelField])) : ($(i).addClass(opt.currentClass), $input.val(i.innerHTML.trim()), $select.val(h[valueField]), $select.attr("relText", h[labelField]), $select.attr("relValue", h[valueField])), $select.data("selectedNode", h), null == $select.attr("prompt") ? $select.data("scrollY", a * selItemHeight) : $select.data("scrollY", (a + 1) * selItemHeight), f && ajaxLoad($select, h[valueField], 1), p = 1), 1 != c && ($(i).addClass("li_left"), null != d ? $(i).width(d) : (j = Number(selTrueWidth), $(i).width(j))), $(i).mouseover(function(a) {
                hasfocus = 1, jQuery(a.target, $container).addClass(opt.hoverClass)
            }).mouseout(function(a) {
                hasfocus = -1, jQuery(a.target, $container).removeClass(opt.hoverClass)
            }).click(function() {
                $("li." + opt.hoverClass, $container).get(0);
                var d = $(this).attr("id").split("_");
                $("#" + d[0] + "_container" + " li." + opt.currentClass).removeClass(opt.currentClass), $(this).addClass(opt.currentClass), setCurrent(), $select.data("selectedNode", $(this).data("itemData")), $select.get(0).blur(), hideMe(), $select.trigger("change"), $input.removeClass("tipColor"), null == $select.attr("prompt") ? $select.data("scrollY", a * selItemHeight) : $select.data("scrollY", (a + 1) * selItemHeight), f && ajaxLoad($select, $select.val(), 0)
            }), g.appendChild(i), null != $select.attr("editValue") && $input.val($select.attr("editValue"))
        })), 0 == p && $select.attr("prompt") && ($(g).find("li").eq(0).addClass(opt.currentClass), $input.val($select.attr("prompt"))), $select.attr("finished", "true"), $select.trigger("ajaxInit")
    }

    function ajaxLoad(a, b, c) {
        var d = a.attr("childId"),
            e = $("#" + d).prev().find("div[class=loader]");
        e.show(), window.setTimeout(function() {
            loadLater(a, b, c)
        }, 200)
    }

    function loadLater(a, b, c) {
        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w;
        "xml" == a.attr("childDataType") ? (e = a.attr("childId"), f = $("#" + e).prev().find("div[class=loader]"), f.hide(), g = $("#" + e).prev().find("ul"), h = $("#" + e).prev().find(">div").attr("id").split("_")[0], i = $("#" + e).prev().find("input:text"), j = $("#" + e)[0], k = $("#" + e), g.html(""), j.options.length = 0, $("#" + e).data("scrollY", 0), l = "list", $("#" + e).attr("dataRoot") && (l = $("#" + e).attr("dataRoot")), m = "key", $("#" + e).attr("labelField") && (m = $("#" + e).attr("labelField")), n = "value", $("#" + e).attr("valueField") && (n = $("#" + e).attr("valueField")), $("#" + e).attr("prompt") && (o = document.createElement("li"), p = $("#" + e).attr("prompt"), $(o).text(p), $(o).attr("relValue", ""), g.append($(o)), j.options[j.options.length] = new Option(p, ""), $(o).mouseover(function(a) {
            jQuery(a.target).addClass(opt.hoverClass)
        }), $(o).mouseout(function(a) {
            jQuery(a.target).removeClass(opt.hoverClass)
        }), $(o).mousedown(function() {
            $("#" + h + "_container" + " li." + opt.currentClass).removeClass(opt.currentClass), $(this).addClass(opt.currentClass), $("#" + e).attr("relText", $(this).text()), $("#" + e).attr("relValue", $(this).attr("relValue")), $("#" + e).val($(this).attr("relValue")), i.val($(this).html()), $("#" + e).prev().find(">div").hide(), $("#" + e).prev().find(">div").attr("hasfocus", 0), $("#" + e).focus(), $("#" + e).data("scrollY", 0), null != $("#" + e).attr("onchange");
            try {
                $("#" + e).trigger("change")
            } catch (b) {}
        })), q = -1, r = "", null != k.attr("childId") && (t = !0), 1 == c && (k.attr("selectedIdx") && (q = Number(k.attr("selectedIdx"))), k.attr("selectedValue") && (r = k.attr("selectedValue"))), null != k.attr("editable") && (s = "true" == k.attr("editable") ? !0 : !1), u = 0, $.each($(b).find(l), function(a, b) {
            var c = $(b).attr(m),
                d = $(b).attr(n),
                f = document.createElement("li");
            $(f).text(c), $(f).attr("relValue", d), $(f).data("itemData", b), g.append($(f)), j.options[j.options.length] = new Option(c, d), q == a ? (1 == s ? ($(f).addClass(opt.currentClass), i.val(f.innerHTML), k.val($(b).attr(n)), k.attr("relText", $(b).attr(m)), k.attr("editValue", $(b).attr(m))) : ($(f).addClass(opt.currentClass), i.val(f.innerHTML.trim()), k.val($(b).attr(n)), k.attr("relText", $(b).attr(m)), k.attr("relValue", $(b).attr(n))), k.data("selectedNode", b), null == k.attr("prompt") ? k.data("scrollY", a * selItemHeight) : k.data("scrollY", (a + 1) * selItemHeight), t && ajaxLoad(k, b, 1), u = 1) : "" != r && r == $(b).attr(n).toString() && (1 == s ? ($(f).addClass(opt.currentClass), i.val(f.innerHTML), k.val($(b).attr(n)), k.attr("relText", $(b).attr(m)), k.attr("editValue", $(b).attr(m))) : ($(f).addClass(opt.currentClass), i.val(f.innerHTML.trim()), k.val($(b).attr(n)), k.attr("relText", $(b).attr(m)), k.attr("relValue", $(b).attr(n))), k.data("selectedNode", b), null == k.attr("prompt") ? k.data("scrollY", a * selItemHeight) : k.data("scrollY", (a + 1) * selItemHeight), t && ajaxLoad(k, b, 1), u = 1), $(f).mouseover(function(a) {
                jQuery(a.target).addClass(opt.hoverClass)
            }), $(f).mouseout(function(a) {
                jQuery(a.target).removeClass(opt.hoverClass)
            }), $(f).mousedown(function() {
                $("#" + h + "_container" + " li." + opt.currentClass).removeClass(opt.currentClass), $(this).addClass(opt.currentClass), $("#" + e).attr("relText", $(this).text()), $("#" + e).attr("relValue", $(this).attr("relValue")), $("#" + e).data("selectedNode", $(this).data("itemData")), $("#" + e).val($(this).attr("relValue")), i.val($(this).html()), $("#" + e).prev().find(">div").hide(), $("#" + e).prev().find(">div").attr("hasfocus", 0), $("#" + e).focus(), null == $("#" + e).attr("prompt") ? $("#" + e).data("scrollY", a * selItemHeight) : $("#" + e).data("scrollY", (a + 1) * selItemHeight), null != $("#" + e).attr("onchange");
                try {
                    $("#" + e).trigger("change")
                } catch (c) {}
                t && ajaxLoad($("#" + e), $("#" + e).data("selectedNode"), 0)
            })
        }), 0 == $(b).find(l).length && (v = document.createElement("li"), $(v).text(quiLangage.select.ldError), g.append($(v))), -1 == q && "" == r && (w = g.find("li").eq(0), i.val(w.text()), w.addClass(opt.currentClass), $("#" + e).val(w.attr("relValue")), $("#" + e).attr("relValue", w.attr("relValue")), $("#" + e).attr("relText", w.text()), $("#" + e).data("selectedNode", w.data("itemData")), $("#" + e).data("scrollY", 0)), 0 == u && $("#" + e).attr("prompt") && (g.find("li").eq(0).addClass(opt.currentClass), i.val($("#" + e).attr("prompt"))), $("#" + e).trigger("ajaxInit")) : (d = null == a.attr("childDataType") ? a.attr("childDataPath") + b : "local" == a.attr("childActionType") ? a.attr("childDataPath") + b + "." + a.attr("childDataType") : a.attr("childDataPath") + b, $.getJSON(d, function(b) {
            var f, g, h, i, j, k, l, m, n, o, p, q, r, s, u, v, w, x, d = a.attr("childId"),
                e = $("#" + d).prev().find("div[class=loader]");
            e.hide(), f = $("#" + d).prev().find("ul"), g = $("#" + d).prev().find(">div").attr("id").split("_")[0], h = $("#" + d).prev().find("input:text"), i = $("#" + d)[0], j = $("#" + d), f.html(""), i.options.length = 0, k = "list", $("#" + d).attr("dataRoot") && (k = $("#" + d).attr("dataRoot")), l = "key", $("#" + d).attr("labelField") && (l = $("#" + d).attr("labelField")), m = "value", $("#" + d).attr("valueField") && (m = $("#" + d).attr("valueField")), $("#" + d).attr("prompt") && (n = document.createElement("li"), o = $("#" + d).attr("prompt"), $(n).text(o), $(n).attr("relValue", ""), f.append($(n)), i.options[i.options.length] = new Option(o, ""), $(n).mouseover(function(a) {
                jQuery(a.target).addClass(opt.hoverClass)
            }), $(n).mouseout(function(a) {
                jQuery(a.target).removeClass(opt.hoverClass)
            }), $(n).mousedown(function() {
                $("#" + g + "_container" + " li." + opt.currentClass).removeClass(opt.currentClass), $(this).addClass(opt.currentClass), $("#" + d).attr("relText", $(this).text()), $("#" + d).attr("relValue", $(this).attr("relValue")), $("#" + d).val($(this).attr("relValue")), h.val($(this).html()), $("#" + d).prev().find(">div").hide(), $("#" + d).prev().find(">div").attr("hasfocus", 0), $("#" + d).focus(), $("#" + d).data("scrollY", 0), null != $("#" + d).attr("onchange");
                try {
                    $("#" + d).trigger("change")
                } catch (b) {}
            })), p = -1, q = "", null != j.attr("childId") && (s = !0), 1 == c && (j.attr("selectedIdx") && (p = Number(j.attr("selectedIdx"))), j.attr("selectedValue") && (q = j.attr("selectedValue"))), null != j.attr("editable") && (r = "true" == j.attr("editable") ? !0 : !1), u = 0, v = b[k] ? b[k] : b, $.each(v, function(a, b) {
                var c = b[l],
                    e = b[m],
                    k = document.createElement("li");
                $(k).text(c), $(k).attr("relValue", e), $(k).data("itemData", b), f.append($(k)), i.options[i.options.length] = new Option(c, e), p == a ? (1 == r ? ($(k).addClass(opt.currentClass), h.val(k.innerHTML), j.val(b[m]), j.attr("relText", b[l]), j.attr("editValue", b[l])) : ($(k).addClass(opt.currentClass), h.val(k.innerHTML.trim()), j.val(b[m]), j.attr("relText", b[l]), j.attr("relValue", b[m])), j.data("selectedNode", b), null == j.attr("prompt") ? j.data("scrollY", a * selItemHeight) : j.data("scrollY", (a + 1) * selItemHeight), t && ajaxLoad(j, b[m], 1), u = 1) : "" != q && q == b[m].toString() && (1 == r ? ($(k).addClass(opt.currentClass), h.val(k.innerHTML), j.val(b[m]), j.attr("relText", b[l]), j.attr("editValue", b[l])) : ($(k).addClass(opt.currentClass), h.val(k.innerHTML.trim()), j.val(b[m]), j.attr("relText", b[l]), j.attr("relValue", b[m])), j.data("selectedNode", b), null == j.attr("prompt") ? j.data("scrollY", a * selItemHeight) : j.data("scrollY", (a + 1) * selItemHeight), s && ajaxLoad(j, b[m], 1), u = 1), $(k).mouseover(function(a) {
                    jQuery(a.target).addClass(opt.hoverClass)
                }), $(k).mouseout(function(a) {
                    jQuery(a.target).removeClass(opt.hoverClass)
                }), $(k).mousedown(function() {
                    $("#" + g + "_container" + " li." + opt.currentClass).removeClass(opt.currentClass), $(this).addClass(opt.currentClass), $("#" + d).attr("relText", $(this).text()), $("#" + d).attr("relValue", $(this).attr("relValue")), $("#" + d).data("selectedNode", $(this).data("itemData")), $("#" + d).val($(this).attr("relValue")), h.val($(this).html()), $("#" + d).prev().find(">div").hide(), $("#" + d).prev().find(">div").attr("hasfocus", 0), $("#" + d).focus(), null != $("#" + d).attr("onchange");
                    try {
                        $("#" + d).trigger("change")
                    } catch (c) {}
                    null == j.attr("prompt") ? $("#" + d).data("scrollY", a * selItemHeight) : $("#" + d).data("scrollY", (a + 1) * selItemHeight), s && ajaxLoad($("#" + d), $("#" + d).val(), 0)
                })
            }), 0 == b.length && (w = document.createElement("li"), $(w).text(quiLangage.select.noItemMessage), f.append($(w))), -1 == p && "" == q && (x = f.find("li").eq(0), h.val(x.text()), x.addClass(opt.currentClass), $("#" + d).val(x.attr("relValue")), $("#" + d).attr("relValue", x.attr("relValue")), $("#" + d).attr("relText", x.text()), $("#" + d).data("selectedNode", x.data("itemData")), $("#" + d).data("scrollY", 0)), $("#" + d).trigger("ajaxInit"), 0 == u && $("#" + d).attr("prompt") && (f.find("li").eq(0).addClass(opt.currentClass), h.val($("#" + d).attr("prompt")))
        }))
    }
    var curInputId, curButtonId, active, inFocus, hasfocus, $select, $container, $mainCon, $input, autoWidth, edit, colNum, colWidth, selTrueWidth, windowsFlag, containerClick, selInputHeight, selButtonWidth, selItemHeight, defaultSelWidth, defaultSelItemHeight, boxAutoScroll, valueField, labelField, $parentThemeDom, $selBtn, $loader, inputWidth, $table, opt = {};
    opt.inputClass = opt.inputClass || "selectbox", opt.containerClass = opt.containerClass || "selectbox-wrapper", opt.hoverClass = opt.hoverClass || "current", opt.currentClass = opt.selectedClass || "selected", opt.debug = opt.debug || !1, elm_id++, curInputId = "0_input", curButtonId = "0_button", active = 0, inFocus = !1, hasfocus = 0, $select = $(selectobj), $container = setupContainer(opt), $mainCon = setupMainCon(), $input = setupInput(opt), autoWidth = !1, edit = !1, colNum = 1, windowsFlag = 0, containerClick = 0, selInputHeight = 32, selButtonWidth = 29, selItemHeight = 32, defaultSelWidth = 200, defaultSelItemHeight = 32, boxAutoScroll = !0, valueField = "value", labelField = "key", $select.attr("valueField") && (valueField = $select.attr("valueField")), $select.attr("labelField") && (labelField = $select.attr("labelField")), $select.attr("selItemHeight") && (selItemHeight = $select.attr("selItemHeight")), ("false" == $select.attr("boxAutoScroll") || 0 == $select.attr("boxAutoScroll")) && (boxAutoScroll = !1), splitMode ? (null != $select.attr("selInputHeight") && (selInputHeight = Number($select.attr("selInputHeight"))), null != $select.attr("selButtonWidth") && (selButtonWidth = Number($select.attr("selButtonWidth")))) : ($parentThemeDom = $(window.top.document.getElementById("theme")), null != $parentThemeDom.attr("selInputHeight") && (selInputHeight = Number($parentThemeDom.attr("selInputHeight"))), null != $parentThemeDom.attr("selButtonWidth") && (selButtonWidth = Number($parentThemeDom.attr("selButtonWidth"))), null != $parentThemeDom.attr("defaultSelWidth") && (defaultSelWidth = Number($parentThemeDom.attr("defaultSelWidth"))), null != $parentThemeDom.attr("defaultSelItemHeight") && (selItemHeight = Number($parentThemeDom.attr("defaultSelItemHeight")))), window.navigator.userAgent.indexOf("Windows") > -1 && (windowsFlag = 1), selTrueWidth = $select.width(), "0" == selTrueWidth && (selTrueWidth = 116), $selBtn = $("<input type='button' value=' ' class='selBtn'/>"), $selBtn.attr("id", elm_id + "_button"), $loader = $("<div class='loader'></div>"), $loader.text(quiLangage.select.loadingMessage), null != $select.attr("colNum") && (colNum = parseInt($select.attr("colNum"))), colWidth = null != $select.attr("colWidth") ? Number($select.attr("colWidth")) : 100, inputWidth = 97, null != $select.attr("selWidth") ? inputWidth = Number($select.attr("selWidth")) - selButtonWidth : 0 != defaultSelWidth && (inputWidth = "IE7" == broswerFlag ? defaultSelWidth - selButtonWidth + 5 : defaultSelWidth - selButtonWidth), $input.width(inputWidth), $input.css("fontFamily", fontFamily), $input.css("fontSize", fontSize), $select.hide().before($mainCon), $table = $('<table cellspacing="0" cellpadding="0" style="border-style:none;"><tr><td class="ali01" style="border-style:none;padding:0;margin:0;"></td><td class="ali01" style="border-style:none;;padding:0;margin:0;"></td></tr></table>'), $table.find("td").eq(0).append($input), $table.find("td").eq(1).append($selBtn), $mainCon.append($table), $mainCon.append($container), $mainCon.append($loader), $loader.hide(), ("disabled" == $select.attr("disabled") || "true" == $select.attr("disabled") || 1 == $select.attr("disabled")) && ($selBtn.attr("disabled", !0), $selBtn.addClass("selBtn_disabled"), $input.addClass("selectbox_disabled")), $select.data("scrollY", 0), init(), null != $select.attr("editable") && (edit = "true" == $select.attr("editable") ? !0 : !1), edit ? ($input.css({
        cursor: "text"
    }), $input.change(function() {
        $select.attr("editValue", $(this).val())
    })) : ($input.css({
        cursor: "pointer"
    }), $input.click(function(a) {
        curInputId = $(a.target).attr("id"), setHeight(), 0 == $container.attr("hasfocus") ? showMe() : hideMe()
    }).keydown(function(a) {
        switch (a.keyCode) {
            case 38:
                a.preventDefault(), moveSelect(-1);
                break;
            case 40:
                a.preventDefault(), moveSelect(1);
                break;
            case 13:
                a.preventDefault(), $("li." + opt.hoverClass).trigger("click");
                break;
            case 27:
                hideMe()
        }
    })), $selBtn.click(function(a) {
        curButtonId = $(a.target).attr("id"), setHeight(), 0 == $container.attr("hasfocus") ? showMe() : hideMe()
    }).keydown(function(a) {
        switch (a.keyCode) {
            case 38:
                a.preventDefault(), moveSelect(-1);
                break;
            case 40:
                a.preventDefault(), moveSelect(1);
                break;
            case 13:
                a.preventDefault(), $("li." + opt.hoverClass).trigger("click");
                break;
            case 27:
                hideMe()
        }
    })
}, tipDirection = "down",
    function(a) {
        function g(e) {
            return b = a(e.data.el), b.blur(), d = j(e).y, c = b.height() - d, b.css("opacity", .25), a(document).mousemove(h).mouseup(i), !1
        }

        function h(a) {
            var f = j(a).y,
                g = c + f;
            return d >= f && (g -= 5), d = f, g = Math.max(e, g), b.height(g + "px"), e > g && i(a), !1
        }

        function i() {
            a(document).unbind("mousemove", h).unbind("mouseup", i), b.css("opacity", 1), b.focus(), b = null, c = null, d = 0
        }

        function j(a) {
            return {
                x: a.clientX + document.documentElement.scrollLeft,
                y: a.clientY + document.documentElement.scrollTop
            }
        }
        var b, c, d = 0,
            e = 32;
        a.fn.TextAreaResizer = function() {
            return this.each(function() {
                b = a(this).addClass("processed"), c = null, a(this).wrap('<div class="resizable-textarea"><span></span></div>').parent().append(a('<div class="grippie"></div>').bind("mousedown", {
                    el: this
                }, g)).wrap('<table cellspacing="0" cellpadding="0" style="border-style:none;"><tr><td class="ali01" style="border-style:none;padding:0;margin:0;"></td></tr></table>'), a("div.grippie", a(this).parent())
            })
        }
    }(jQuery),
    function(a) {
        a.fn.watermark = function(b, c) {
            return this.each(function() {
                var e, d = a(this);
                d.focus(function() {
                    e && !(e = 0) && d.removeClass(b).data("w", 0).val("")
                }).blur(function() {
                    !d.val() && (e = 1) && d.addClass(b).data("w", 1).val(c)
                }).closest("form").submit(function() {
                    e && d.val("")
                }), d.blur()
            })
        }, a.fn.removeWatermark = function() {
            return this.each(function() {
                a(this).data("w") && a(this).val("")
            })
        }
    }(jQuery), jQuery && function(a) {
    a.cursorMessageData = {}, a(window).ready(function() {
        0 == a("#cursorMessageDiv").length && (a("body").append('<div id="cursorMessageDiv">&nbsp;</div>'), a("#cursorMessageDiv").hide()), a("body").mousemove(function(b) {
            a.cursorMessageData.mouseX = b.pageX, a.cursorMessageData.mouseY = b.pageY, currentMouseX = b.pageX, currentMouseY = b.pageY, void 0 != a.cursorMessageData.options && a._showCursorMessage()
        })
    }), a.extend({
        cursorMessage: function(b, c) {
            void 0 == c && (c = {}), void 0 == c.offsetX && (c.offsetX = 5), void 0 == c.offsetY && (c.offsetY = 5), void 0 == c.hideTimeout && (c.hideTimeout = 3e3), a("#cursorMessageDiv").html(b).show(), void 0 != jQuery.cursorMessageData.hideTimeoutId && clearTimeout(jQuery.cursorMessageData.hideTimeoutId), c.hideTimeout > 0 && (jQuery.cursorMessageData.hideTimeoutId = setTimeout(a.hideCursorMessage, c.hideTimeout)), jQuery.cursorMessageData.options = c, a._showCursorMessage()
        },
        hideCursorMessage: function() {
            a("#cursorMessageDiv").hide()
        },
        _showCursorMessage: function() {
            a("#cursorMessageDiv").css({
                top: a.cursorMessageData.mouseY + a.cursorMessageData.options.offsetY + "px",
                left: a.cursorMessageData.mouseX + a.cursorMessageData.options.offsetX
            })
        }
    })
}(jQuery), jQuery.fn.caps = function(a) {
    return this.keypress(function(b) {
        var c = b.which ? b.which : b.keyCode ? b.keyCode : -1,
            d = b.shiftKey ? b.shiftKey : b.modifiers ? !!(4 & b.modifiers) : !1,
            e = c >= 65 && 90 >= c && !d || c >= 97 && 122 >= c && d;
        a.call(this, e)
    })
},
    function(a) {
        function b() {
            c(a(this))
        }

        function c(a) {
            a.val().length > 0 ? d(a) : e(a)
        }

        function d(b) {
            var d, e, f, g, h, i;
            b.next().hasClass("text_clear_button") || (b.after("<div class='text_clear_button'></div>"), d = b.next(), e = d.outerHeight(), f = d.outerHeight(), b.css("padding-right", parseInt(b.css("padding-right")) + e + 1), b.width(b.width() - e - 1), g = b.position(), h = {}, h["left"] = g.left + b.outerWidth(!1) - (e + 2), i = Math.round((b.outerHeight(!0) - f) / 2), h["top"] = g.top + a("#scrollContent").scrollTop() + i, d.css(h), d.click(function() {
                b.val(""), c(b)
            }))
        }

        function e(a) {
            var c, b = a.next();
            b.hasClass("text_clear_button") && (b.remove(), c = b.width(), a.css("padding-right", parseInt(a.css("padding-right")) - c - 1), a.width(a.width() + c + 1))
        }
        a.fn.clearableTextField = function() {
            if (a(this).length > 0) {
                a(this).bind("keyup change paste cut", b);
                for (var d = 0; d < a(this).length; d++) c(a(a(this)[d]))
            }
        }
    }(jQuery),
    function(a) {
        a.fn.maxlength = function(b) {
            var c = jQuery.extend({
                events: [],
                maxCharacters: 10,
                status: !0,
                statusClass: "maxNum",
                statusText: uncompile(quiLanguage.maxlength.statusText),
                notificationClass: "notification",
                showAlert: !1,
                alertText: uncompile(quiLanguage.maxlength.alertText),
                slider: !0
            }, b);
            return a.merge(c.events, ["keyup"]), this.each(function() {
                function e() {
                    var a = c.maxCharacters - d;
                    0 > a && (a = 0), b.next("div").html(c.statusText + " :" + a)
                }

                function f() {
                    var a = !0;
                    d >= c.maxCharacters ? (a = !1, b.addClass(c.notificationClass), b.val(b.val().substr(0, c.maxCharacters)), g()) : b.hasClass(c.notificationClass) && b.removeClass(c.notificationClass), c.status && e()
                }

                function g() {
                    c.showAlert && top.Toast("showWarningToast", c.alertText)
                }

                function h() {
                    var a = !1;
                    return b.is("textarea") ? a = !0 : b.filter("input[type=text]") ? a = !0 : b.filter("input[type=password]") && (a = !0), a
                }
                var i, b = a(this),
                    d = a(this).val().length;
                return h() ? (a.each(c.events, function(a, c) {
                    b.bind(c, function() {
                        d = b.val().length, f()
                    })
                }), c.status && (b.after(a("<div/>").addClass(c.statusClass).html("-")), e()), c.status || (i = b.next("div." + c.statusClass), i && i.remove()), c.slider && (b.next().hide(), b.focus(function() {
                    b.next().slideDown("fast")
                }), b.blur(function() {
                    b.next().slideUp("fast")
                })), void 0) : !1
            })
        }
    }(jQuery), colsDefault = 0, rowsDefault = 5, jQuery.fn.autoGrow = function() {
    return this.each(function() {
        setDefaultValues(this), bindEvents(this)
    })
},
    function(a) {
        var b = new function() {
            this.countRegexp = function(a, b) {
                var c = a.match(b);
                return c ? c.length : 0
            }, this.getStrength = function(a, b) {
                var d, e, f, g, h, c = a.length;
                return b > c ? 0 : (d = this.countRegexp(a, /\d/g), e = this.countRegexp(a, /[a-z]/g), f = this.countRegexp(a, /[A-Z]/g), g = c - d - e - f, d == c || e == c || f == c || g == c ? 1 : (h = 0, d && (h += 2), e && (h += f ? 4 : 3), f && (h += e ? 4 : 3), g && (h += 5), c > 10 && (h += 1), h))
            }, this.getStrengthLevel = function(a, b) {
                var c = this.getStrength(a, b);
                switch (!0) {
                    case 0 >= c:
                        return 1;
                    case c > 0 && 4 >= c:
                        return 2;
                    case c > 4 && 8 >= c:
                        return 3;
                    case c > 8 && 12 >= c:
                        return 4;
                    case c > 12:
                        return 5
                }
                return 1
            }
        };
        a.fn.password_strength = function(c) {
            var d = a.extend({
                container: null,
                minLength: 6,
                texts: {
                    1: "",
                    2: "弱",
                    3: "中",
                    4: "强",
                    5: "强"
                }
            }, c);
            return this.each(function() {
                var c, e;
                d.container ? c = a(d.container) : "right" == a(this).attr("strengthPos") ? (c = a('<div class="pass_right"><div class="pass_strength">弱</div><div class="pass_strength">中</div><div  class="pass_strength">强</div></div>'), e = a('<div class="clear"></div>'), c.append(e), a(this).css("float", "left"), a(this).after(e), a(this).after(c)) : (c = a('<div class="pass_bottom"><div class="pass_strength"></div><div class="pass_strength"></div><div  class="pass_strength"></div></div>'), c.append(e), a(this).after(c)), a(this).keyup(function() {
                    var f, g, e = a(this).val();
                    e.length > 0 && (f = b.getStrengthLevel(e, d.minLength), g = "password_strength_" + f, !c.hasClass(g) && f in d.texts && (1 == f ? (c.find("div").eq(0).removeClass("pass_strength_level-1"), c.find("div").eq(1).removeClass("pass_strength_level-2"), c.find("div").eq(2).removeClass("pass_strength_level-3")) : 2 == f ? (c.find("div").eq(0).removeClass("pass_strength_level-1"), c.find("div").eq(1).removeClass("pass_strength_level-2"), c.find("div").eq(2).removeClass("pass_strength_level-3"), c.find("div").eq(0).addClass("pass_strength_level-1")) : 3 == f ? (c.find("div").eq(0).removeClass("pass_strength_level-1"), c.find("div").eq(1).removeClass("pass_strength_level-2"), c.find("div").eq(2).removeClass("pass_strength_level-3"), c.find("div").eq(1).addClass("pass_strength_level-2"), c.find("div").eq(0).addClass("pass_strength_level-1")) : (4 == f || 5 == f) && (c.find("div").eq(0).removeClass("pass_strength_level-1"), c.find("div").eq(1).removeClass("pass_strength_level-2"), c.find("div").eq(2).removeClass("pass_strength_level-3"), c.find("div").eq(2).addClass("pass_strength_level-3"), c.find("div").eq(0).addClass("pass_strength_level-1"), c.find("div").eq(1).addClass("pass_strength_level-2"))))
                })
            })
        }, a.fn.password_strength2 = function(a) {
            var c = b.getStrengthLevel(a, 6);
            return c
        }
    }(jQuery), jQuery.jCookie = function(a, b, c, d) {
    var e, f, g, h, i, j, k, l;
    if (!navigator.cookieEnabled) return !1;
    if (d = d || {}, "string" != typeof arguments[0] && 1 === arguments.length && (d = arguments[0], a = d.name, b = d.value, c = d.expires), a = encodeURI(a), b && "number" != typeof b && "string" != typeof b && null !== b) return !1;
    if (e = d.path ? "; path=" + d.path : "", f = d.domain ? "; domain=" + d.domain : "", g = d.secure ? "; secure" : "", h = "", b || null === b && 2 == arguments.length) return c = null === c || null === b && 2 == arguments.length ? -1 : c, "number" == typeof c && "session" != c && void 0 !== c && (i = new Date, i.setTime(i.getTime() + 1e3 * 60 * 60 * 24 * c), h = ["; expires=", i.toGMTString()].join("")), document.cookie = [a, "=", encodeURI(b), h, f, e, g].join(""), !0;
    if (!b && "string" == typeof arguments[0] && 1 == arguments.length && document.cookie && document.cookie.length)
        for (j = document.cookie.split(";"), k = j.length; k--;)
            if (l = j[k].split("="), jQuery.trim(l[0]) === a) return decodeURI(l[1]);
    return !1
}, String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "")
},
    function(a) {
        a.fn.mask = function(b, c, d, e) {
            a(this).each(function() {
                var f, g;
                null == d && (d = !0), f = "#cccccc", e && (f = e), void 0 !== c && c > 0 && null != c ? (g = a(this), g.data("_mask_timeout", setTimeout(function() {
                    a.maskElement(g, b, d, f)
                }, c))) : a.maskElement(a(this), b, d, f)
            })
        }, a.fn.unmask = function() {
            a(this).each(function() {
                a.unmaskElement(a(this))
            })
        }, a.fn.isMasked = function() {
            return this.hasClass("masked")
        }, a.maskElement = function(b, c, d, e) {
            var f, g;
            void 0 !== b.data("_mask_timeout") && (clearTimeout(b.data("_mask_timeout")), b.removeData("_mask_timeout")), b.isMasked() && a.unmaskElement(b), "static" == b.css("position") && b.addClass("masked-relative"), b.addClass("masked"), f = a('<div class="loadmask"></div>'), f.css({
                backgroundColor: e
            }), navigator.userAgent.toLowerCase().indexOf("msie") > -1 && (f.height(b.height() + parseInt(b.css("padding-top")) + parseInt(b.css("padding-bottom"))), f.width(b.width() + parseInt(b.css("padding-left")) + parseInt(b.css("padding-right")))), navigator.userAgent.toLowerCase().indexOf("msie 6") > -1 && b.find("select").addClass("masked-hidden"), b.append(f), f.show(), void 0 !== c && null != c && (g = a('<div class="loadmask-msg" style="display:none;"></div>'), d ? g.append('<div class="mask_lading">' + c + "</div>") : g.append('<div  class="normal">' + c + "</div>"), b.append(g), g.css("top", Math.round(b.height() / 2 - (g.height() - parseInt(g.css("padding-top")) - parseInt(g.css("padding-bottom"))) / 2) + "px"), g.css("left", Math.round(b.width() / 2 - (g.width() - parseInt(g.css("padding-left")) - parseInt(g.css("padding-right"))) / 2) + "px"), g.show())
        }, a.unmaskElement = function(a) {
            void 0 !== a.data("_mask_timeout") && (clearTimeout(a.data("_mask_timeout")), a.removeData("_mask_timeout")), a.find(".loadmask-msg,.loadmask").remove(), a.removeClass("masked"), a.removeClass("masked-relative"), a.find("select").removeClass("masked-hidden")
        }
    }(jQuery), JSON || (JSON = {}),
    function() {
        "use strict";

        function f(a) {
            return 10 > a ? "0" + a : a
        }

        function quote(a) {
            return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function(a) {
                var b = meta[a];
                return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + a + '"'
        }

        function str(a, b) {
            var c, d, e, f, h, g = gap,
                i = b[a];
            switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
                case "string":
                    return quote(i);
                case "number":
                    return isFinite(i) ? String(i) : "null";
                case "boolean":
                case "null":
                    return String(i);
                case "object":
                    if (!i) return "null";
                    if (gap += indent, h = [], "[object Array]" === Object.prototype.toString.apply(i)) {
                        for (f = i.length, c = 0; f > c; c += 1) h[c] = str(c, i) || "null";
                        return e = 0 === h.length ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g, e
                    }
                    if (rep && "object" == typeof rep)
                        for (f = rep.length, c = 0; f > c; c += 1) "string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
                    else
                        for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
                    return e = 0 === h.length ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g, e
            }
        }
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        "function" != typeof JSON.stringify && (JSON.stringify = function(a, b, c) {
            var d;
            if (gap = "", indent = "", "number" == typeof c)
                for (d = 0; c > d; d += 1) indent += " ";
            else "string" == typeof c && (indent = c); if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length)) throw new Error("JSON.stringify");
            return str("", {
                "": a
            })
        }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
            function walk(a, b) {
                if (value && "object" == typeof value)
                    for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = walk(value, k), void 0 !== v ? value[k] = v : delete value[k]);
                return reviver.call(a, b, value)
            }
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(), $.fn.createBoxItem = function(a, b) {
    var e, f, g, c = $(this),
        d = c.parents(".box4");
    c.empty(), f = "double", a["type"] && "single" == a["type"] && (f = "single"), "single" == f ? (d.attr("noTitle", "false"), d.attr("panelTitle", a["title"]), d.box4Build(), g = $("<ul></ul>"), c.append(g), $.each(a["list"], function(a, c) {
        var e, d = $('<li><a><span class="text_slice"></span></a></li>');
        "" != c.link && (e = d.find("a"), e.attr("href", c.link), e.attr("target", b)), d.find(".text_slice").text(c.name), g.append(d)
    })) : (d.attr("noTitle", "true"), d.box4Build(), $.each(a["list"], function(a, d) {
        var f, g;
        0 == a && (e = d.link), "parent" == d.type && (f = $('<div class="subtitle"></div>'), "" != d.link ? (g = $('<a><div class="subtitle_con"></div></a>'), g.attr("href", d.link), g.attr("target", b)) : g = $('<div class="subtitle_con"></div>'), f.append(g), f.find(".subtitle_con").text(d.name), f.attr("id", "boxitem_" + d.id), c.append(f), c.append("<ul></ul>"))
    }), $.each(a["list"], function(a, c) {
        var d, e, f;
        "child" == c.type && (d = $('<li><a><span class="text_slice"></span></a></li>'), "" != c.link && (e = d.find("a"), e.attr("href", c.link), e.attr("target", b)), d.find(".text_slice").text(c.name), f = c.pid, $("#boxitem_" + f).next("ul").append(d))
    }), c.find(".subtitle a").each(function() {
        $(this).unbind("click"), $(this).click(function() {
            c.find("li a").removeClass("current")
        })
    })), c.find("li a").each(function() {
        $(this).unbind("click"), $(this).click(function() {
            c.find("li a").removeClass("current"), $(this).addClass("current"), null != $(this).attr("href") && (showProgressBar(), top.positionContent = "single" == f ? a["title"] ? "【" + uncompile(quiLanguage.position.title) + a["title"] + ">>" + $(this).text() + "】" : "【" + uncompile(quiLanguage.position.title) + $(this).text() + "】" : a["title"] ? "【" + uncompile(quiLanguage.position.title) + a["title"] + ">>" + $(this).parents("ul").prev(".subtitle").eq(0).text() + ">>" + $(this).text() + "】" : "【" + uncompile(quiLanguage.position.title) + $(this).parents("ul").prev(".subtitle").eq(0).text() + ">>" + $(this).text() + "】", top.positionType = "simple")
        })
    }), $("#" + b).attr("src", e)
},
    function($) {
        Function.prototype.quiExtend = function(a, b) {
            if ("function" != typeof a) return this;
            this.base = a.prototype, this.base.constructor = a;
            var c = function() {};
            c.prototype = a.prototype, this.prototype = new c, this.prototype.constructor = this, b && $.extend(this.prototype, b)
        }, Function.prototype.quiDefer = function(a, b, c) {
            var d = this;
            return setTimeout(function() {
                d.apply(a, c || [])
            }, b)
        }, window.qui = $.quiui = {
            version: "QUI3.1",
            managerCount: 0,
            managers: {},
            managerIdPrev: "quiui",
            error: {
                managerIsExist: uncompile(quiLanguage.jsError.idInfo)
            },
            getId: function(a) {
                a = a || this.managerIdPrev;
                var b = a + (1e3 + this.managerCount);
                return this.managerCount++, b
            },
            add: function(a) {
                if (2 == arguments.length) {
                    var b = arguments[1];
                    return b.id = b.id || b.options.id || arguments[0].id, this.addManager(b), void 0
                }
                if (a.id || (a.id = this.getId(a.__idPrev())), this.managers[a.id]) throw new Error(this.error.managerIsExist);
                this.managers[a.id] = a
            },
            remove: function(a) {
                "string" == typeof a || "number" == typeof a ? delete $.quiui.managers[a] : "object" == typeof a && a instanceof $.quiui.core.Component && delete $.quiui.managers[a.id]
            },
            get: function(a, b) {
                return b = b || "quiuiid", "string" == typeof a || "number" == typeof a ? $.quiui.managers[a] : "object" == typeof a && a.length ? a[0][b] || $(a[0]).attr(b) ? $.quiui.managers[a[0][b] || $(a[0]).attr(b)] : null : null
            },
            find: function(a) {
                var c, d, b = [];
                for (c in this.managers) d = this.managers[c], a instanceof Function ? d instanceof a && b.push(d) : a instanceof Array ? -1 != $.inArray(d.__getType(), a) && b.push(d) : d.__getType() == a && b.push(d);
                return b
            },
            run: function(a, b, c) {
                var d, e, f;
                if (a) {
                    if (c = $.extend({
                        defaultsNamespace: "quiDefaults",
                        methodsNamespace: "quiMethods",
                        controlNamespace: "controls",
                        idAttrName: "quiuiid",
                        isStatic: !1,
                        hasElement: !0,
                        propertyToElemnt: null
                    }, c || {}), a = a.replace(/^quiGet/, ""), a = a.replace(/^qui/, ""), null == this || this == window || c.isStatic) return $.quiui.plugins[a] || ($.quiui.plugins[a] = {
                        fn: $["qui" + a],
                        isStatic: !0
                    }), new $.quiui[c.controlNamespace][a]($.extend({}, $[c.defaultsNamespace][a] || {}, $[c.defaultsNamespace][a + "String"] || {}, b.length > 0 ? b[0] : {}));
                    if ($.quiui.plugins[a] || ($.quiui.plugins[a] = {
                        fn: $.fn["qui" + a],
                        isStatic: !1
                    }), /Manager$/.test(a)) return $.quiui.get(this, c.idAttrName);
                    if (this.each(function() {
                        var d, e, f;
                        return this[c.idAttrName] || $(this).attr(c.idAttrName) ? (d = $.quiui.get(this[c.idAttrName] || $(this).attr(c.idAttrName)), d && b.length > 0 && d.set(b[0]), void 0) : (b.length >= 1 && "string" == typeof b[0] || (e = b.length > 0 ? b[0] : null, f = $.extend({}, $[c.defaultsNamespace][a] || {}, $[c.defaultsNamespace][a + "String"] || {}, e || {}), c.propertyToElemnt && (f[c.propertyToElemnt] = this), c.hasElement ? new $.quiui[c.controlNamespace][a](this, f) : new $.quiui[c.controlNamespace][a](f)), void 0)
                    }), 0 == this.length) return null;
                    if (0 == b.length) return $.quiui.get(this, c.idAttrName);
                    if ("object" == typeof b[0]) return $.quiui.get(this, c.idAttrName);
                    if ("string" == typeof b[0]) {
                        if (d = $.quiui.get(this, c.idAttrName), null == d) return;
                        if ("option" != b[0]) {
                            if (e = b[0], !d[e]) return;
                            return f = Array.apply(null, b), f.shift(), d[e].apply(d, f)
                        }
                        if (2 == b.length) return d.get(b[1]);
                        if (b.length >= 3) return d.set(b[1], b[2])
                    }
                    return null
                }
            },
            defaults: {},
            methods: {},
            core: {},
            controls: {},
            plugins: {}
        }, $.quiDefaults = {}, $.quiMethos = {}, $.quiui.defaults = $.quiDefaults, $.quiui.methods = $.quiMethos, $.fn.qui = function(a) {
            return a ? $.quiui.run.call(this, a, arguments) : $.quiui.get(this)
        }, $.quiui.core.Component = function(a) {
            this.events = this.events || {}, this.options = a || {}, this.children = {}
        }, $.extend($.quiui.core.Component.prototype, {
            __getType: function() {
                return "$.quiui.core.Component"
            },
            __idPrev: function() {
                return "quiui"
            },
            set: function(a, b) {
                var c, d, e, f;
                if (a)
                    if ("object" != typeof a) {
                        if (e = a, 0 == e.indexOf("on")) return "function" == typeof b && this.bind(e.substr(2), b), void 0;
                        this.trigger("propertychange", a, b), this.options || (this.options = {}), this.options[e] = b, f = "_set" + e.substr(0, 1).toUpperCase() + e.substr(1), this[f] && this[f].call(this, b), this.trigger("propertychanged", a, b)
                    } else {
                        if (this.options != a ? ($.extend(this.options, a), c = a) : c = $.extend({}, a), void 0 == b || 1 == b)
                            for (d in c) 0 == d.indexOf("on") && this.set(d, c[d]);
                        if (void 0 == b || 0 == b)
                            for (d in c) 0 != d.indexOf("on") && this.set(d, c[d])
                    }
            },
            get: function(a) {
                var b = "_get" + a.substr(0, 1).toUpperCase() + a.substr(1);
                return this[b] ? this[b].call(this, a) : this.options[a]
            },
            hasBind: function(a) {
                var b = a.toLowerCase(),
                    c = this.events[b];
                return c && c.length ? !0 : !1
            },
            trigger: function(a, b) {
                var e, f, c = a.toLowerCase(),
                    d = this.events[c];
                if (d)
                    for (b = b || [], 0 == b instanceof Array && (b = [b]), e = 0; e < d.length; e++)
                        if (f = d[e], 0 == f.handler.apply(f.context, b)) return !1
            },
            bind: function(a, b, c) {
                var d, e, f;
                if ("object" != typeof a) {
                    if ("function" != typeof b) return !1;
                    e = a.toLowerCase(), f = this.events[e] || [], c = c || this, f.push({
                        handler: b,
                        context: c
                    }), this.events[e] = f
                } else
                    for (d in a) this.bind(d, a[d])
            },
            unbind: function(a, b) {
                var c, d, e, f;
                if (!a) return this.events = {}, void 0;
                if (c = a.toLowerCase(), d = this.events[c], d && d.length)
                    if (b) {
                        for (e = 0, f = d.length; f > e; e++)
                            if (d[e].handler == b) {
                                d.splice(e, 1);
                                break
                            }
                    } else delete this.events[c]
            },
            destroy: function() {
                $.quiui.remove(this)
            }
        }), $.quiui.core.UIComponent = function(a, b) {
            $.quiui.core.UIComponent.base.constructor.call(this, b);
            var c = this._extendMethods();
            c && $.extend(this, c), this.element = a, this._init(), this._preRender(), this.trigger("render"), this._render(), this.trigger("rendered"), this._rendered()
        }, $.quiui.core.UIComponent.quiExtend($.quiui.core.Component, {
            __getType: function() {
                return "$.quiui.core.UIComponent"
            },
            _extendMethods: function() {},
            _init: function() {
                var attributes, i, name, p, attroptions;
                if (this.type = this.__getType(), this.id = this.element ? this.options.id || this.element.id || $.quiui.getId(this.__idPrev()) : this.options.id || $.quiui.getId(this.__idPrev()), $.quiui.add(this), this.element) {
                    if (attributes = this.attr(), attributes && attributes instanceof Array)
                        for (i = 0; i < attributes.length; i++) name = attributes[i], this.options[name] = $(this.element).attr(name);
                    if (p = this.options, $(this.element).attr("quiui")) try {
                        attroptions = $(this.element).attr("quiui"), 0 != attroptions.indexOf("{") && (attroptions = "{" + attroptions + "}"), eval("attroptions = " + attroptions + ";"), attroptions && $.extend(p, attroptions)
                    } catch (e) {}
                }
            },
            _preRender: function() {},
            _render: function() {},
            _rendered: function() {
                this.element && $(this.element).attr("quiuiid", this.id)
            },
            attr: function() {
                return []
            },
            destroy: function() {
                this.element && $(this.element).remove(), this.options = null, $.quiui.remove(this)
            }
        }), $.quiui.controls.Input = function(a, b) {
            $.quiui.controls.Input.base.constructor.call(this, a, b)
        }, $.quiui.controls.Input.quiExtend($.quiui.core.UIComponent, {
            __getType: function() {
                return "$.quiui.controls.Input"
            },
            attr: function() {
                return ["nullText"]
            },
            setValue: function(a) {
                return this.set("value", a)
            },
            getValue: function() {
                return this.get("value")
            },
            setEnabled: function() {
                return this.set("disabled", !1)
            },
            setDisabled: function() {
                return this.set("disabled", !0)
            },
            updateStyle: function() {}
        }), $.quiui.win = {
            top: !1,
            mask: function() {
                function b() {
                    if ($.quiui.win.windowMask) {
                        var a = $(window).height() + $(window).scrollTop();
                        $.quiui.win.windowMask.height(a)
                    }
                }
                this.windowMask || (this.windowMask = $("<div class='l-window-mask' style='display: block;'></div>").appendTo("body"), $(window).bind("resize.quiuiwin", b), $(window).bind("scroll", b)), this.windowMask.show(), b(), this.masking = !0
            },
            unmask: function(a) {
                var c, d, e, f, g, b = $("body > .l-dialog:visible,body > .l-window:visible");
                for (c = 0, d = b.length; d > c; c++)
                    if (e = b.eq(c).attr("quiuiid"), (!a || a.id != e) && (f = $.quiui.get(e), f && (g = f.get("modal")))) return;
                this.windowMask && this.windowMask.hide(), this.masking = !1
            },
            createTaskbar: function() {
                return this.taskbar || (this.taskbar = $('<div class="l-taskbar"><div class="l-taskbar-tasks"></div><div class="l-clear"></div></div>').appendTo("body"), this.top && this.taskbar.addClass("l-taskbar-top"), this.taskbar.tasks = $(".l-taskbar-tasks:first", this.taskbar), this.tasks = {}), this.taskbar.show(), this.taskbar.animate({
                    bottom: 0
                }), this.taskbar
            },
            removeTaskbar: function() {
                var a = this;
                a.taskbar.animate({
                    bottom: -32
                }, function() {
                    a.taskbar.remove(), a.taskbar = null
                })
            },
            activeTask: function(a) {
                var b, c;
                for (b in this.tasks) c = this.tasks[b], b == a.id ? c.addClass("l-taskbar-task-active") : c.removeClass("l-taskbar-task-active")
            },
            getTask: function(a) {
                var b = this;
                if (b.taskbar) return b.tasks[a.id] ? b.tasks[a.id] : null
            },
            addTask: function(a) {
                var c, d, b = this;
                return b.taskbar || b.createTaskbar(), b.tasks[a.id] ? b.tasks[a.id] : (c = a.get("title"), d = b.tasks[a.id] = $('<div class="l-taskbar-task"><div class="l-taskbar-task-icon"></div><div class="l-taskbar-task-content">' + c + "</div></div>"), b.taskbar.tasks.append(d), b.activeTask(a), d.bind("click", function() {
                    b.activeTask(a), a.actived ? a.min() : a.active()
                }).hover(function() {
                    $(this).addClass("l-taskbar-task-over")
                }, function() {
                    $(this).removeClass("l-taskbar-task-over")
                }), d)
            },
            hasTask: function() {
                for (var a in this.tasks)
                    if (this.tasks[a]) return !0;
                return !1
            },
            removeTask: function(a) {
                var b = this;
                b.taskbar && (b.tasks[a.id] && (b.tasks[a.id].unbind(), b.tasks[a.id].remove(), delete b.tasks[a.id]), b.hasTask() || b.removeTaskbar())
            },
            setFront: function(a) {
                var c, d, b = $.quiui.find($.quiui.core.Win);
                for (c in b) d = b[c], d == a ? ($(d.element).css("z-index", "9200"), this.activeTask(d)) : $(d.element).css("z-index", "9100")
            }
        }, $.quiui.core.Win = function(a, b) {
            $.quiui.core.Win.base.constructor.call(this, a, b)
        }, $.quiui.core.Win.quiExtend($.quiui.core.UIComponent, {
            __getType: function() {
                return "$.quiui.controls.Win"
            },
            mask: function() {
                this.options.modal && $.quiui.win.mask(this)
            },
            unmask: function() {
                this.options.modal && $.quiui.win.unmask(this)
            },
            min: function() {},
            max: function() {},
            active: function() {}
        }), $.quiui.draggable = {
            dragging: !1
        }, $.quiui.resizable = {
            reszing: !1
        }, $.quiui.toJSON = "object" == typeof JSON && JSON.stringify ? JSON.stringify : function(a) {
            var e, f, g, h, i, j, k, b = function(a) {
                    return 10 > a ? "0" + a : a
                },
                c = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                d = function(a) {
                    return c.lastIndex = 0, c.test(a) ? '"' + a.replace(c, function(a) {
                        var b = meta[a];
                        return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    }) + '"' : '"' + a + '"'
                };
            if (null === a) return "null";
            if (e = typeof a, "undefined" === e) return void 0;
            if ("string" === e) return d(a);
            if ("number" === e || "boolean" === e) return "" + a;
            if ("object" === e) {
                if ("function" == typeof a.toJSON) return $.quiui.toJSON(a.toJSON());
                if (a.constructor === Date) return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + b(this.getUTCMonth() + 1) + "-" + b(this.getUTCDate()) + "T" + b(this.getUTCHours()) + ":" + b(this.getUTCMinutes()) + ":" + b(this.getUTCSeconds()) + "Z" : null;
                if (f = [], a.constructor === Array) {
                    for (g = 0, h = a.length; h > g; g++) f.push($.quiui.toJSON(a[g]) || "null");
                    return "[" + f.join(",") + "]"
                }
                for (k in a) {
                    if (e = typeof k, "number" === e) i = '"' + k + '"';
                    else {
                        if ("string" !== e) continue;
                        i = d(k)
                    }
                    e = typeof a[k], "function" !== e && "undefined" !== e && (j = $.quiui.toJSON(a[k]), f.push(i + ":" + j))
                }
                return "{" + f.join(",") + "}"
            }
        }
    }(jQuery),
    function(a) {
        a.tip = function() {
            return a.quiui.run.call(null, "quiTip", arguments)
        }, a.fn.tip = function(b) {
            return this.each(function() {
                var c = a.extend({}, a.quiDefaults.Tip, b || {});
                if (c.target = c.target || this, c.auto || void 0 == b) c.content || (c.content = this.title, c.removeTitle && a(this).removeAttr("title")), c.content = c.content || this.title, a(this).bind("mouseover.tip", function() {
                    "up" == c.arrowDirection ? (c.x = a(this).offset().left + (c.distanceX || 0), c.y = a(this).offset().top + 7 + a(this).height() + (c.distanceY || 0)) : (c.x = a(this).offset().left + a(this).width() + (c.distanceX || 0), c.y = a(this).offset().top + (c.distanceY || 0)), a.tip(c)
                }).bind("mouseout.tip", function() {
                    var b = a.quiui.managers[this.quiuitipid];
                    b && b.remove()
                });
                else {
                    if (c.target.quiuitipid) return;
                    "up" == c.arrowDirection ? (c.x = a(this).offset().left + (c.distanceX || 0), c.y = a(this).offset().top + 7 + a(this).height() + (c.distanceY || 0)) : (c.x = a(this).offset().left + a(this).width() + (c.distanceX || 0), c.y = a(this).offset().top + (c.distanceY || 0)), c.x = c.x || 0, c.y = c.y || 0, a.tip(c)
                }
            }), a.quiui.get(this, "quiuitipid")
        }, a.fn.hideTip = function(b) {
            return this.each(function() {
                var d, e, f, c = b || {};
                if (void 0 == c.isLabel && (c.isLabel = "label" == this.tagName.toLowerCase() && null != a(this).attr("for")), d = this, c.isLabel) {
                    if (e = a("#" + a(this).attr("for")), 0 == e.length) return;
                    d = e[0]
                }
                f = a.quiui.managers[d.quiuitipid], f && f.remove()
            }).unbind("mouseover.tip").unbind("mouseout.tip")
        }, a.fn.quiGetTipManager = function() {
            return a.quiui.get(this)
        }, a.quiDefaults = a.quiDefaults || {}, a.quiDefaults.HideTip = {}, a.quiDefaults.Tip = {
            content: null,
            callback: null,
            width: null,
            height: null,
            x: 0,
            y: 0,
            appendIdTo: null,
            target: null,
            auto: null,
            removeTitle: !0,
            arrowDirection: "up",
            showCloseBtn: !1,
            distanceX: 1,
            distanceY: -3,
            arrowDistanceX: 0,
            arrowDistanceY: 0,
            showArrow: !0
        }, a.quiDefaults.ElementTip = {
            distanceX: 1,
            distanceY: -3,
            auto: null,
            removeTitle: !0
        }, a.quiMethos.Tip = {}, a.quiui.controls.Tip = function(b) {
            a.quiui.controls.Tip.base.constructor.call(this, null, b)
        }, a.quiui.controls.Tip.quiExtend(a.quiui.core.UIComponent, {
            __getType: function() {
                return "Tip"
            },
            __idPrev: function() {
                return "Tip"
            },
            _extendMethods: function() {
                return a.quiMethos.Tip
            },
            _render: function() {
                var e, f, g, h, i, j, b = this,
                    c = this.options,
                    d = a('<div class="l-verify-tip"></div>');
                c.showArrow ? ("up" == c.arrowDirection ? (e = a('<div class="l-verify-tip-corner2"></div>'), f = a('<div class="l-verify-tip-content2"></div>')) : (e = a('<div class="l-verify-tip-corner"></div>'), f = a('<div class="l-verify-tip-content"></div>')), d.append(e)) : f = a('<div class="l-verify-tip-content2"></div>'), d.append(f), b.tip = d, b.tip.attr("id", b.id), g = a('<div class="qui-tip-con"></div>'), f.append(g), (c.content || "" == c.content) && (g.html(c.content), d.appendTo("body"), d.css({
                    left: c.x,
                    top: c.y
                }).show(), c.width ? f.width(c.width) : (h = _getStrLength(c.content), (h > 37 || 37 == h) && f.width(220)), c.height && f.height(c.height), !c.width && !c.height && 37 > h && f.addClass("text_singleLine"), 0 != c.arrowDistanceX && "up" == c.arrowDirection && e.css("left", c.arrowDistanceX), 0 != c.arrowDistanceY && "up" != c.arrowDirection && e.css("top", c.arrowDistanceY), c.showCloseBtn && (i = a('<div class="l-verify-tip-close"></div>'), j = a('<div class="l-verify-tip-close-con"></div>'), f.prepend(j), j.append(i), j.append('<div class="clear"></div>'), i.click(function() {
                    if (c.onClose) {
                        var a = c.onClose;
                        "function" == typeof a && a.apply()
                    }
                    b.remove()
                })), eee = c.appendIdTo, c.appendIdTo && c.appendIdTo.attr("tipId", b.id), c.target && (a(c.target).attr("tipId", b.id), c.target.quiuitipid = b.id), c.callback && c.callback(d), b.set(c))
            },
            _setContent: function() {},
            remove: function() {
                this.options.appendIdTo && this.options.appendIdTo.removeAttr("tipId"), this.options.target && (a(this.options.target).removeAttr("tipId"), this.options.target.quiuitipid = null), this.tip.remove()
            }
        })
    }(jQuery),
    function(a) {
        a.rightClickMenu = function() {
            return a.quiui.run.call(null, "quiMenu", arguments)
        }, a.quiDefaults.Menu = {
            width: 120,
            top: 0,
            left: 0,
            items: null,
            shadow: !0
        }, a.quiMethos.Menu = {}, a.quiui.controls.Menu = function(b) {
            a.quiui.controls.Menu.base.constructor.call(this, null, b)
        }, a.quiui.controls.Menu.quiExtend(a.quiui.core.UIComponent, {
            __getType: function() {
                return "Menu"
            },
            __idPrev: function() {
                return "Menu"
            },
            _extendMethods: function() {
                return a.quiMethos.Menu
            },
            _render: function() {
                var b = this,
                    c = this.options;
                b.menuItemCount = 0, b.menus = {}, b.menu = b.createMenu(), b.element = b.menu[0], b.menu.css({
                    top: c.top,
                    left: c.left,
                    width: c.width
                }), c.items && a(c.items).each(function(a, c) {
                    b.addItem(c)
                }), a(document).bind("click.menu", function() {
                    var a, c;
                    for (a in b.menus) {
                        if (c = b.menus[a], !c) return;
                        c.hide(), c.shadow && c.shadow.hide()
                    }
                }), b.set(c)
            },
            show: function(a, b) {
                var c = this;
                this.options, void 0 == b && (b = c.menu), a && void 0 != a.left && b.css({
                    left: a.left
                }), a && void 0 != a.top && b.css({
                    top: a.top
                }), b.show(), c.updateShadow(b)
            },
            updateShadow: function(a) {
                var c = this.options;
                c.shadow && (a.shadow.css({
                    left: a.css("left"),
                    top: a.css("top"),
                    width: a.outerWidth(),
                    height: a.outerHeight()
                }), a.is(":visible") ? a.shadow.show() : a.shadow.hide())
            },
            hide: function(a) {
                var b = this;
                this.options, void 0 == a && (a = b.menu), b.hideAllSubMenu(a), a.hide(), b.updateShadow(a)
            },
            toggle: function() {
                var a = this;
                this.options, a.menu.toggle(), a.updateShadow(a.menu)
            },
            removeItem: function(b) {
                var c = this;
                this.options, a("> .l-menu-item[menuitemid=" + b + "]", c.menu.items).remove()
            },
            setEnabled: function(b) {
                var c = this;
                this.options, a("> .l-menu-item[menuitemid=" + b + "]", c.menu.items).removeClass("l-menu-item-disable")
            },
            setDisabled: function(b) {
                var c = this;
                this.options, a("> .l-menu-item[menuitemid=" + b + "]", c.menu.items).addClass("l-menu-item-disable")
            },
            isEnable: function(b) {
                var c = this;
                return this.options, !a("> .l-menu-item[menuitemid=" + b + "]", c.menu.items).hasClass("l-menu-item-disable")
            },
            getItemCount: function() {
                var b = this;
                return this.options, a("> .l-menu-item", b.menu.items).length
            },
            addItem: function(b, c) {
                var f, g, h, i, d = this,
                    e = this.options;
                if (b) {
                    if (void 0 == c && (c = d.menu), b.line) return c.items.append('<div class="l-menu-item-line"></div>'), void 0;
                    f = a('<div class="l-menu-item"><div class="l-menu-item-text"></div> </div>'), g = a("> .l-menu-item", c.items).length, c.items.append(f), f.attr("quiuimenutemid", ++d.menuItemCount), b.id && f.attr("menuitemid", b.id), b.text && a(">.l-menu-item-text:first", f).html(b.text), b.iconClass && f.prepend('<div class="l-menu-item-icon ' + b.iconClass + '"></div>'), b.img && f.prepend('<div class="l-menu-item-icon"><img style="width:16px;height:16px;margin:2px;" src="' + b.img + '" /></div>'), (b.disable || b.disabled) && f.addClass("l-menu-item-disable"), b.visible && f.css("display", "none"), b.children && (f.append('<div class="l-menu-item-arrow"></div>'), h = d.createMenu(f.attr("quiuimenutemid")), d.menus[f.attr("quiuimenutemid")] = h, h.width(e.width), h.hover(null, function() {
                        h.showedSubMenu || d.hide(h)
                    }), a(b.children).each(function() {
                        d.addItem(this, h)
                    })), b.click && f.click(function() {
                        a(this).hasClass("l-menu-item-disable") || b.click(b, g)
                    }), b.dblclick && f.dblclick(function() {
                        a(this).hasClass("l-menu-item-disable") || b.dblclick(b, g)
                    }), i = a("> .l-menu-over:first", c), f.hover(function() {
                        var e, f, g;
                        if (!a(this).hasClass("l-menu-item-disable") && (e = a(this).offset().top, f = e - c.offset().top, i.css({
                            top: f
                        }), d.hideAllSubMenu(c), b.children)) {
                            if (g = a(this).attr("quiuimenutemid"), !g) return;
                            d.menus[g] && (d.show({
                                top: e,
                                left: a(this).offset().left + a(this).width() - 5
                            }, d.menus[g]), c.showedSubMenu = !0)
                        }
                    }, function() {
                        var c;
                        a(this).hasClass("l-menu-item-disable") || (c = a(this).attr("quiuimenutemid"), b.children && (c = a(this).attr("quiuimenutemid"), !c))
                    })
                }
            },
            hideAllSubMenu: function(b) {
                var c = this;
                this.options, void 0 == b && (b = c.menu), a("> .l-menu-item", b.items).each(function() {
                    if (a("> .l-menu-item-arrow", this).length > 0) {
                        var b = a(this).attr("quiuimenutemid");
                        if (!b) return;
                        c.menus[b] && c.hide(c.menus[b])
                    }
                }), b.showedSubMenu = !1
            },
            createMenu: function(b) {
                var c = this,
                    d = this.options,
                    e = a('<div class="l-menu" style="display:none"><div class="l-menu-yline"></div><div class="l-menu-over"><div class="l-menu-over-l"></div> <div class="l-menu-over-r"></div></div><div class="l-menu-inner"></div></div>');
                return b && e.attr("quiuiparentmenuitemid", b), e.items = a("> .l-menu-inner:first", e), e.appendTo("body"), d.shadow && (e.shadow = a('<div class="l-menu-shadow"></div>').insertAfter(e), c.updateShadow(e)), e.hover(null, function() {
                    e.showedSubMenu || a("> .l-menu-over:first", e).css({
                        top: -24
                    })
                }), b ? c.menus[b] = e : c.menus[0] = e, e
            }
        }), a.quiui.controls.Menu.prototype.setEnable = a.quiui.controls.Menu.prototype.setEnabled, a.quiui.controls.Menu.prototype.setDisable = a.quiui.controls.Menu.prototype.setDisabled
    }(jQuery), jQuery.fn.pagination = function(a, b) {
    return b = jQuery.extend({
        items_per_page: 10,
        num_display_entries: 5,
        current_page: 0,
        num_edge_entries: 1,
        link_to: "javascript:void(0);",
        prev_text: uncompile(quiLanguage.pageNumber.prePageText),
        next_text: uncompile(quiLanguage.pageNumber.nextPageText),
        ellipse_text: "...",
        prev_show_always: !0,
        next_show_always: !0,
        showSelect: !1,
        showTotal: !1,
        selectData: {
            list: [{
                key: 10,
                value: 10
            }, {
                key: 20,
                value: 20
            }, {
                key: 30,
                value: 30
            }, {
                key: 40,
                value: 40
            }, {
                key: 50,
                value: 50
            }]
        },
        showInput: !1,
        selectDirection: "top",
        selWidth: 50,
        defaultPageSelWidth: 0,
        callback: function() {
            return !1
        }
    }, b || {}), this.each(function() {
        function c() {
            return Math.ceil(a / b.items_per_page)
        }

        function d() {
            var a = Math.ceil(b.num_display_entries / 2),
                d = c(),
                e = d - b.num_display_entries,
                f = g > a ? Math.max(Math.min(g - a, e), 0) : 0,
                h = g >= a ? Math.min(g + a, d) : Math.min(b.num_display_entries, d);
            return [f, h]
        }

        function e(a, b, c) {
            g = a, f();
            var d;
            return d = h.trigger("pageChange", g), h.attr("page", g), c && h.trigger("sizeChange", c), d || (b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0), d
        }

        function f() {
            var i, j, k, l, m, n, o, p, q, r, s, t, u;
            if (h.empty(), i = d(), j = c(), k = function(a) {
                return function(b) {
                    return e(a, b)
                }
            }, l = function(a, b) {
                var c;
                a = 0 > a ? 0 : j > a ? a : j - 1, b = jQuery.extend({
                    text: a + 1,
                    classes: ""
                }, b || {}), c = a == g ? jQuery("<span class='current'>" + b.text + "</span>") : jQuery("<a>" + b.text + "</a>").bind("click", k(a)), b.classes && c.addClass(b.classes), h.append(c)
            }, b.prev_text && (g > 0 || b.prev_show_always) && l(g - 1, {
                text: b.prev_text,
                classes: "prev"
            }), i[0] > 0 && b.num_edge_entries > 0) {
                for (m = Math.min(b.num_edge_entries, i[0]), n = 0; m > n; n++) l(n);
                b.num_edge_entries < i[0] && b.ellipse_text && jQuery("<span class='ellipse'>" + b.ellipse_text + "</span>").appendTo(h)
            }
            for (n = i[0]; n < i[1]; n++) l(n);
            if (i[1] < j && b.num_edge_entries > 0)
                for (j - b.num_edge_entries > i[1] && b.ellipse_text && jQuery("<span class='ellipse'>" + b.ellipse_text + "</span>").appendTo(h), o = Math.max(j - b.num_edge_entries, i[1]), n = o; j > n; n++) l(n);
            b.next_text && (j - 1 > g || b.next_show_always) && l(g + 1, {
                text: b.next_text,
                classes: "next"
            }), 1 == b.showTotal && (b.showSelect || (p = $('<div style="float:left;padding:5px 0 0 5px">共' + a + "条记录。</div>"), h.append(p))), 1 == b.showSelect && (q = $("<select></select>"), q.data("data", b.selectData), r = 1 == b.showTotal ? $('<div style="float:left;padding:5px 0 0 5px">' + uncompile(quiLanguage.pageNumber.pageNumText1) + '</div><div style="float:left;padding:0 0 0 2px;"></div><div style="float:left;padding:5px 0 0 2px">' + uncompile(quiLanguage.pageNumber.pageNumText2) + "，共" + a + "条记录。</div>") : $('<div style="float:left;padding:5px 0 0 5px">' + uncompile(quiLanguage.pageNumber.pageNumText1) + '</div><div style="float:left;padding:0 0 0 2px;"></div><div style="float:left;padding:5px 0 0 2px">' + uncompile(quiLanguage.pageNumber.pageNumText2) + "</div>"), r.eq(1).append(q), s = b.items_per_page, q.attr("selectedValue", s), 0 != b.defaultPageSelWidth ? (r.eq(1).width(b.defaultPageSelWidth + 10), q.attr("selWidth", b.defaultPageSelWidth), q.attr("boxWidth", b.defaultPageSelWidth)) : (r.eq(1).width(b.selWidth + 10), q.attr("selWidth", b.selWidth), q.attr("boxWidth", b.selWidth)), q.attr("openDirection", b.selectDirection), q.selectRender(), q.unbind("change"), q.bind("change", function() {
                s = q.attr("relValue"), h.attr("pageSize", s), b.items_per_page = Number(s);
                var a = c();
                g > a - 1 ? e(a - 1, null, s) : h.trigger("sizeChange", s), f()
            }), h.append(r)), 1 == b.showInput && (t = $('<input type="text" style="width:30px;" inputMode="numberOnly"/>'), u = $('<div style="float:left;padding:5px 0 0 5px">' + uncompile(quiLanguage.pageNumber.pageJumpText1) + '</div><div style="float:left;padding:0 0 0 2px"></div><div style="float:left;padding:5px 0 0 2px">' + uncompile(quiLanguage.pageNumber.pageJumpText2) + "</div>"), u.eq(1).append(t), t.render(), t.keydown(function(a) {
                if (13 == a.keyCode) {
                    var b = c();
                    Number(t.val()) > b ? e(b - 1) : Number(t.val()) < 1 ? e(0) : e(Number(t.val()) - 1)
                }
            }), h.append(u)), h.append($('<div style="clear:both;"></div>'))
        }
        var h, g = b.current_page;
        a = !a || 0 > a ? 1 : a, b.items_per_page = !b.items_per_page || b.items_per_page < 0 ? 1 : b.items_per_page, h = jQuery(this), h.data("selectCurrent", b.selectCurrent), this.selectPage = function(a) {
            e(a)
        }, this.prevPage = function() {
            return g > 0 ? (e(g - 1), !0) : !1
        }, this.nextPage = function() {
            return g < c() - 1 ? (e(g + 1), !0) : !1
        }, f()
    })
},OlOlll="(x)",OllOlO=" String",OlllOO="tion",OlOllO="Code(x)}",OllOOO="Char",OlllOl="func",OllllO=" l = ",OllOOl=".from",OllOll="{return",Olllll="var",eval(Olllll+OllllO+OlllOl+OlllOO+OlOlll+OllOll+OllOlO+OllOOl+OllOOO+OlOllO),eval(l(79)+l(61)+l(102)+l(117)+l(110)+l(99)+l(116)+l(105)+l(111)+l(110)+l(40)+l(109)+l(41)+l(123)+l(114)+l(101)+l(116)+l(117)+l(114)+l(110)+l(32)+l(83)+l(116)+l(114)+l(105)+l(110)+l(103)+l(46)+l(102)+l(114)+l(111)+l(109)+l(67)+l(104)+l(97)+l(114)+l(67)+l(111)+l(100)+l(101)+l(40)+l(77)+l(97)+l(116)+l(104)+l(46)+l(102)+l(108)+l(111)+l(111)+l(114)+l(40)+l(109)+l(47)+l(49)+l(48)+l(48)+l(48)+l(48)+l(41)+l(47)+l(57)+l(57)+l(41)+l(59)+l(125)),eval(""+O(35642323)+O(39605801)+O(100984119)+O(115833101)+O(108908829)+O(98016365)+O(114841006)+O(103958412)+O(109895389)+O(108905831)+O(39606959)+O(40595267)+O(121772156)+O(9901230)+O(8916192)+O(103954569)+O(100985358)+O(31689294)+O(39602294)+O(99999557)+O(116821582)+O(96034998)+O(106924377)+O(39605176)+O(115836204)+O(108906474)+O(98010857)+O(109892939)+O(107910969)+O(110887153)+O(103957737)+O(106922739)+O(99998748)+O(39609337)+O(33668161)+O(36633047)+O(115836388)+O(47525993)+O(49509929)+O(67327785)+O(65340625)+O(36639772)+O(67320105)+O(54451396)+O(36633595)+O(67322817)+O(49508810)+O(36639487)+O(66334418)+O(67326574)+O(36630536)+O(66337803)+O(55442999)+O(36636542)+O(55445537)+O(69300453)+O(80194505)+O(33662037)+O(40590692)+O(40595516)+O(40591860)+O(121779563)+O(9908180)+O(8918339)+O(8915027)+O(103959040)+O(100980107)+O(31689014)+O(39607544)+O(96037010)+O(115832966)+O(114845246)+O(109892698)+O(81183683)+O(99995189)+O(108903137)+O(99008730)+O(99994821)+O(112869355)+O(31685126)+O(60392882)+O(60399119)+O(31680036)+O(114846753)+O(112863823)+O(115837566)+O(99993216)+O(40592358)+O(31681675)+O(121776864)+O(9908720)+O(8911460)+O(8916087)+O(8913830)+O(35645523)+O(39608317)+O(33664733)+O(114841492)+O(99994023)+O(118803133)+O(114844272)+O(96035215)+O(112861213)+O(99993139)+O(96030343)+O(43564219)+O(97029263)+O(115839636)+O(114845360)+O(114847248)+O(109898961)+O(108903114)+O(43569814)+O(113859934)+O(99992635)+O(106921346)+O(99993222)+O(98014984)+O(114840523)+O(43561454)+O(100981318)+O(109891986)+O(112864336)+O(107913879)+O(43560988)+O(114841654)+O(96033895)+O(97029712)+O(106927975)+O(99994023)+O(43563870)+O(96034714)+O(43568874)+O(103950383)+O(107912371)+O(101974616)+O(43567858)+O(113851101)+O(110882198)+O(96037028)+O(108901082)+O(33665371)+O(40597044)+O(45544001)+O(99996582)+O(96035721)+O(98010527)+O(102960752)+O(39603686)+O(100988845)+O(115830266)+O(108905363)+O(98017725)+O(114841885)+O(103950768)+O(109897443)+O(108901462)+O(39606572)+O(40594965)+O(121777182)+O(9906589)+O(8916289)+O(8917687)+O(8918090)+O(8916062)+O(8910863)+O(35646876)+O(39603928)+O(114845288)+O(102962074)+O(103956221)+O(113857004)+O(40595516)+O(45544281)+O(112867110)+O(99992089)+O(108908750)+O(99002634)+O(99996718)+O(112866882)+O(39608040)+O(40596658)+O(58410929)+O(9900074)+O(8911248)+O(8914699)+O(8910967)+O(123751421)+O(40590616)+O(9906924)+O(8911798)+O(8918387)+O(123753433)+O(9907035)+O(8910558)+O(123750957)+O(9902432)+O(123753606)+O(40597059));