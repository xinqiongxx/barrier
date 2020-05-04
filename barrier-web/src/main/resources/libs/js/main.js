function RunPrefixMethod(a, b) {
	for (var d, e, c = 0; c < pfx.length && !a[d];) {
		if (d = b, "" == pfx[c] && (d = d.substr(0, 1).toLowerCase() + d.substr(1)), d = pfx[c] + d, e = typeof a[d], "undefined" != e) return pfx = [pfx[c]], "function" == e ? a[d]() : a[d];
		c++
	}
}

function fullScrennHander() {
	RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen") ? (RunPrefixMethod(document, "CancelFullScreen"), autoReset()) : (RunPrefixMethod($("body")[0], "RequestFullScreen"), autoReset())
}

function iframeHeight(a) {
	var b = document.getElementById(a);
	b.style.height = b.contentWindow.document.body.scrollHeight + "px"
}

function createPosition(a, b) {
	var c = $("#" + a);
	c.html(b)
}

function getFontSize() {
	var b, a = jQuery.jCookie("fontSize");
	return 0 != a ? b = parseInt(a) : null != $("#theme").attr("defaultFontSize") && (b = Number($("#theme").attr("defaultFontSize"))), b
}

function getFontFamily() {
	var b, a = jQuery.jCookie("fontFamily");
	return 0 != a ? b = a : null != $("#theme").attr("defaultFontFamily") && (b = $("#theme").attr("defaultFontFamily")), b
}

function firstReset() {
	var a, b, c, e, f;
	leftOverHeight = $("#hbox").outerHeight() + $("#fbox").outerHeight() + $("#lbox_topcenter").outerHeight() + $("#lbox_bottomcenter").outerHeight(), rightOverHeight = $("#hbox").outerHeight() + $("#fbox").outerHeight() + $("#rbox_topcenter").outerHeight() + $("#rbox_bottomcenter").outerHeight(), middleOverHeight = $("#hbox").outerHeight() + $("#fbox").outerHeight() + $("#mbox_topcenter").outerHeight() + $("#mbox_bottomcenter").outerHeight(), a = document.documentElement.clientHeight, b = document.documentElement.clientWidth;
	try {
		c = a - leftOverHeight - parseInt($("#lbox").css("paddingTop")) - parseInt($("#lbox").css("paddingBottom")), $("#bs_left").height(c), $(document.getElementById("frmleft")).height(c), $(document.getElementById("frmleft")).height("100%")
	} catch (d) {}
	try {
		e = a - rightOverHeight - parseInt($("#rbox").css("paddingTop")) - parseInt($("#rbox").css("paddingBottom")), $("#bs_right").height(e), $(document.getElementById("frmright")).height(e), $(document.getElementById("frmright")).height("100%")
	} catch (d) {}
	try {
		f = a - middleOverHeight - parseInt($("#mbox").css("paddingTop")) - parseInt($("#mbox").css("paddingBottom")), $("#bs_middle").height(f), $(document.getElementById("bs_middle")).height(f), $(document.getElementById("bs_middle")).height("100%")
	} catch (d) {}
	try {
		mainResizeHandler(a, b)
	} catch (d) {}
}

function autoReset() {
	var a, b, c, e, f;
	leftOverHeight = $("#hbox").outerHeight() + $("#fbox").outerHeight() + $("#lbox_topcenter").outerHeight() + $("#lbox_bottomcenter").outerHeight(), rightOverHeight = $("#hbox").outerHeight() + $("#fbox").outerHeight() + $("#rbox_topcenter").outerHeight() + $("#rbox_bottomcenter").outerHeight(), middleOverHeight = $("#hbox").outerHeight() + $("#fbox").outerHeight() + $("#mbox_topcenter").outerHeight() + $("#mbox_bottomcenter").outerHeight(), a = document.documentElement.clientHeight, b = document.documentElement.clientWidth;
	try {
		c = a - leftOverHeight - parseInt($("#lbox").css("paddingTop")) - parseInt($("#lbox").css("paddingBottom")), $("#bs_left").height(c), document.getElementById("frmleft").contentWindow._customHeightSet(c)
	} catch (d) {}
	try {
		e = a - rightOverHeight - parseInt($("#rbox").css("paddingTop")) - parseInt($("#rbox").css("paddingBottom")), $("#bs_right").height(e), document.getElementById("frmright").contentWindow._customHeightSet(e)
	} catch (d) {}
	try {
		f = a - middleOverHeight - parseInt($("#mbox").css("paddingTop")) - parseInt($("#mbox").css("paddingBottom")), $("#bs_middle").height(f), document.getElementById("frmmiddle").contentWindow._customHeightSet(f)
	} catch (d) {}
	try {
		mainResizeHandler(a, b)
	} catch (d) {}
	$("#mainLayout").length > 0 && mainLayout._onResize()
}

function showProgressBar(a) {
	var b = uncompile(quiLanguage.progressBar.title);
	a && (b = a), top.progressFlag = 1, top.showSimpleProgress(b, 0, !0, "#ffffff")
}

function showSimpleProgress(a, b, c, d) {
	$("#bs_right").mask(a, b, c, d)
}

function closeProgressBar() {
	$("#bs_right").unmask()
}

function uncompile(a) {
	var b, c;
	for (a = unescape(a), b = String.fromCharCode(a.charCodeAt(0) - a.length - 611), c = 1; c < a.length; c++) b += String.fromCharCode(a.charCodeAt(c) - b.charCodeAt(c - 1));
	return b
}

function _getStrLength(a) {
	var b, c;
	for (b = 0, c = 0; b < a.length; b++) a.charCodeAt(b) < 128 ? c++ : c += 2;
	return c
}
var broswerFlag, broswerVersion, maskDiv, codePageMenu, mainLayout, currentMouseX, currentMouseY, pfx, leftOverHeight = 0,
	rightOverHeight = 0,
	middleOverHeight = 0,
	exitMenu = 0,
	hexitMenu = 0,
	progressFlag = 0,
	oldBannerHeight = 0,
	oldFootHeight = 0,
	positionType = "none",
	positionContent = "",
	_autoFormat = !0,
	pResizeTimer = null,
	fontSize = 12,
	fontFamily = "微软雅黑";
$(function() {
	function l(a) {
		var b = d.exec(a);
		return null != b ? {
			browser: "IE",
			version: b[2] || "0"
		} : (b = e.exec(a), null != b ? {
			browser: b[1] || "",
			version: b[2] || "0"
		} : (b = f.exec(a), null != b ? {
			browser: b[1] || "",
			version: b[2] || "0"
		} : (b = g.exec(a), null != b ? {
			browser: b[1] || "",
			version: b[2] || "0"
		} : (b = h.exec(a), null != b ? {
			browser: b[2] || "",
			version: b[1] || "0"
		} : null != b ? {
			browser: "",
			version: "0"
		} : void 0))))
	}
	var c, d, e, f, g, h, i, j, m, n, o, p, q, r, s, u, v, w, x, y, z, A, B, C, D, E, F, b = null;
	null != b && top.Toast("showWarningToast", "内容页面不可引入main.js！"), ("true" == $("#theme").attr("install") || "true" == $("#theme").attr("authorizeInfo")) && top.Notice("showNotice", {
		title: "您的部署信息",
		text: document.location,
		sticky: !0,
		type: "info"
	}), maskDiv = $('<div class="loadmask"></div>'), $("#bs_right").append(maskDiv), c = navigator.userAgent, d = /(msie\s|trident.*rv:)([\w.]+)/, e = /(firefox)\/([\w.]+)/, f = /(opera).+version\/([\w.]+)/, g = /(chrome)\/([\w.]+)/, h = /version\/([\w.]+).*(safari)/, c.toLowerCase(), m = l(c.toLowerCase()), m.browser && (i = m.browser, j = m.version), "IE" == i ? "6.0" == j ? broswerFlag = "IE6" : "7.0" == j ? broswerFlag = "IE7" : "8.0" == j ? broswerFlag = "IE8" : "9.0" == j ? broswerFlag = "IE9" : "10.0" == j ? broswerFlag = "IE10" : "11.0" == j && (broswerFlag = "IE11") : broswerFlag = i, broswerVersion = Number(j.split(".")[0]), n = $("#theme").attr("ie6detect"), null != n && "" != n && "IE6" == broswerFlag && top.Dialog.open({
		URL: n,
		Title: uncompile(quiLanguage.jsError.ieDetectTitle),
		Width: 510,
		Height: 550,
		ShowCloseButton: !1,
		CloseHideScroller: !0
	}), o = $("#theme").attr("ie7detect"), null != o && "" != o && "IE7" == broswerFlag && top.Dialog.open({
		URL: o,
		Title: uncompile(quiLanguage.jsError.ieDetectTitle),
		Width: 505,
		Height: 550,
		ShowCloseButton: !1,
		CloseHideScroller: !0
	}), p = $("#theme").attr("ie8detect"), null != p && "" != p && "IE8" == broswerFlag && top.Dialog.open({
		URL: p,
		Title: uncompile(quiLanguage.jsError.ieDetectTitle),
		Width: 510,
		Height: 550,
		ShowCloseButton: !1,
		CloseHideScroller: !0
	}), ("false" == $("#theme").attr("autoFormat") || 0 == $("#theme").attr("autoFormat")) && (_autoFormat = !1), oldBannerHeight = $("#bs_bannercenter").outerHeight(), oldFootHeight = $("#fbox").outerHeight(), 1 == _autoFormat && (q = document.getElementsByTagName("html")[0], q.style.overflow = "hidden", firstReset(), window.onresize = function() {
		pResizeTimer && clearTimeout(pResizeTimer), pResizeTimer = setTimeout("autoReset()", 100)
	}), $(".spliter").each(function() {
		$(this).spliterRender()
	}), null != $("#theme").attr("defaultFontSize") && (fontSize = Number($("#theme").attr("defaultFontSize"))), null != $("#theme").attr("defaultFontFamily") && (fontFamily = $("#theme").attr("defaultFontFamily"));
	try {
		r = jQuery.jCookie("fontSize"), s = jQuery.jCookie("fontFamily"), 0 != r && (fontSize = parseInt(r)), 0 != s && (fontFamily = s)
	} catch (t) {}
	12 == fontSize ? $(".fontChange").eq(2).find("a").addClass("fontChange_cur") : 14 == fontSize ? $(".fontChange").eq(1).find("a").addClass("fontChange_cur") : 16 == fontSize && $(".fontChange").eq(0).find("a").addClass("fontChange_cur"), "微软雅黑" == fontFamily ? $(".fontFamily").eq(0).find("a").addClass("fontChange_cur") : "微软雅黑" == fontFamily && $(".fontFamily").eq(1).find("a").addClass("fontChange_cur"), $(".fontChange a").each(function() {
		$(this).click(function() {
			$(".fontChange a").removeClass("fontChange_cur"), $(this).addClass("fontChange_cur");
			var a = parseInt($(this).attr("setFont"));
			$("#theme").attr("defaultFontSize", a), jQuery.jCookie("fontSize", a);
			try {
				document.getElementById("frmright").contentWindow.changeFont(a)
			} catch (b) {}
			try {
				document.getElementById("frmleft").contentWindow.changeFont(a)
			} catch (b) {}
			try {
				document.getElementById("frmmiddle").contentWindow.changeFont(a)
			} catch (b) {}
		})
	}), $(".fontFamily a").each(function() {
		$(this).click(function() {
			$(".fontFamily a").removeClass("fontChange_cur"), $(this).addClass("fontChange_cur");
			var a = $(this).attr("setFont");
			$("#theme").attr("defaultFontFamily", a), jQuery.jCookie("fontFamily", a);
			try {
				document.getElementById("frmright").contentWindow.changeFontFamily(a)
			} catch (b) {}
			try {
				document.getElementById("frmleft").contentWindow.changeFontFamily(a)
			} catch (b) {}
			try {
				document.getElementById("frmmiddle").contentWindow.changeFontFamily(a)
			} catch (b) {}
		})
	}), $(".popupMenu").length > 0 && $(".popupMenu").popupMenuRender(), $("#fullSrceen").fullSrceenRender(), u = $("#mainLayout"), u.length > 0 && (v = 210, w = 170, x = !1, y = !1, z = !0, A = !0, B = 10, C = 150, D = 400, E = 150, F = 400, u.attr("leftWidth") && (v = Number(u.attr("leftWidth"))), u.attr("rightWidth") && (w = Number(u.attr("rightWidth"))), u.attr("space") && (B = Number(u.attr("space"))), u.attr("minLeftWidth") && (C = Number(u.attr("minLeftWidth"))), u.attr("maxLeftWidth") && (D = Number(u.attr("maxLeftWidth"))), u.attr("minRightWidth") && (E = Number(u.attr("minRightWidth"))), u.attr("maxRightWidth") && (F = Number(u.attr("maxRightWidth"))), ("true" == u.attr("isLeftCollapse") || 1 == u.attr("isLeftCollapse")) && (x = !0), ("true" == u.attr("isRightCollapse") || 1 == u.attr("isRightCollapse")) && (y = !0), ("false" == u.attr("allowLeftResize") || 0 == u.attr("allowLeftResize")) && (z = !1), ("false" == u.attr("allowRightResize") || 0 == u.attr("allowRightResize")) && (A = !1), "IE6" == broswerFlag && (z = !1, A = !1), mainLayout = $("#mainLayout").quiLayout({
		leftWidth: v,
		rightWidth: w,
		isLeftCollapse: x,
		isRightCollapse: y,
		allowLeftResize: z,
		allowRightResize: A,
		space: B,
		minLeftWidth: C,
		maxLeftWidth: D,
		minRightWidth: E,
		maxRightWidth: F
	}))
}), $.fn.popupMenuRender = function() {
	$(this).hover(function() {
		$(this).find(".popupMenu_con").show()
	}, function() {
		$(this).find(".popupMenu_con").hide()
	})
}, jQuery.fn.extend({
	fullSrceenRender: function() {},
	buttonInputRender: function() {
		var a, b, c;
		"true" == $(this).attr("keepDefaultStyle") || 1 == $(this).attr("keepDefaultStyle") || ($(this).addClass("button"), "IE7" == broswerFlag && ($(this).css("minWidth", "auto"), a = _getStrLength($(this).val()), 5 > a && $(this).css({
			paddingLeft: "10px",
			paddingRight: "10px"
		})), $(this).css("fontFamily", fontFamily), $(this).css("fontSize", fontSize), a = _getStrLength($(this).val()), "false" == $(this).attr("useMinWidth") || 0 == $(this).attr("useMinWidth"), "true" == $(this).attr("toggle") || 1 == $(this).attr("toggle") ? (b = $("<input type='hidden'/>"), null != $(this).attr("name") && b.attr("name", $(this).attr("name")), $(this).after(b), c = 0, "1" == $(this).attr("relValue") && (c = 1), $(this).attr("relValue", c), b.attr("relValue", c), $(this).click(function() {
			0 == c ? ($(this).addClass("toggle"), $(this).attr("relValue", 1), b.attr("relValue", 1), c = 1) : ($(this).removeClass("toggle"), $(this).attr("relValue", 0), b.attr("relValue", 0), c = 0)
		})) : $(this).hover(function() {
			$(this).addClass("button_hover")
		}, function() {
			$(this).removeClass("button_hover")
		}))
	},
	buttonRender: function() {
		var a, b, c;
		"true" == $(this).attr("keepDefaultStyle") || 1 == $(this).attr("keepDefaultStyle") || ($(this).hasClass("default") || $(this).hasClass("plan") ? $(this).addClass("button") : ($(this).addClass("button"), $(this).addClass("primary")), "IE7" == broswerFlag && ($(this).css("minWidth", "auto"), a = _getStrLength($(this).text()), 5 > a && ($(this).find("span").length > 0 || $(this).css({
			paddingLeft: "10px",
			paddingRight: "10px"
		}))), "false" == $(this).attr("useMinWidth") || 0 == $(this).attr("useMinWidth") || (a = _getStrLength($(this).text()), b = 0, c = 50, b = _getStrLength($(this).filter(":has(span)").find("span").text()), 0 != b && (c = 20 + 7 * b + 10), "firefox" == broswerFlag || "opera" == broswerFlag || "safari" == broswerFlag ? $(this).filter(":has(span)").css({
			paddingLeft: "5px"
		}) : $(this).filter(":has(span)").css({
			paddingLeft: "5px"
		})), $(this).filter(":has(span)").find("span").css({
			cursor: "default",
			fontFamily: fontFamily,
			fontSize: fontSize
		}), $(this).hover(function() {
			$(this).addClass("button_hover")
		}, function() {
			$(this).removeClass("button_hover")
		}))
	}
}), pfx = ["webkit", "moz", "ms", "o", ""], jQuery.jCookie = function(a, b, c, d) {
	var e, f, g, h, i, j, k, l;
	if (!navigator.cookieEnabled) return !1;
	if (d = d || {}, "string" != typeof arguments[0] && 1 === arguments.length && (d = arguments[0], a = d.name, b = d.value, c = d.expires), a = encodeURI(a), b && "number" != typeof b && "string" != typeof b && null !== b) return !1;
	if (e = d.path ? "; path=" + d.path : "", f = d.domain ? "; domain=" + d.domain : "", g = d.secure ? "; secure" : "", h = "", b || null === b && 2 == arguments.length) return c = null === c || null === b && 2 == arguments.length ? -1 : c, "number" == typeof c && "session" != c && void 0 !== c && (i = new Date, i.setTime(i.getTime() + 1e3 * 60 * 60 * 24 * c), h = ["; expires=", i.toGMTString()].join("")), document.cookie = [a, "=", encodeURI(b), h, f, e, g].join(""), !0;
	if (!b && "string" == typeof arguments[0] && 1 == arguments.length && document.cookie && document.cookie.length) for (j = document.cookie.split(";"), k = j.length; k--;) if (l = j[k].split("="), jQuery.trim(l[0]) === a) return decodeURI(l[1]);
	return !1
}, function(a) {
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
		var f, g, h;
		maskDiv.show(), f = Math.round(b.height() / 2 - 30), g = Math.round(b.width() / 2 - 100), void 0 !== b.data("_mask_timeout") && (clearTimeout(b.data("_mask_timeout")), b.removeData("_mask_timeout")), b.isMasked() && a.unmaskElement(b), "static" == b.css("position") && b.addClass("masked-relative"), b.addClass("masked"), maskDiv.css({
			backgroundColor: e
		}), navigator.userAgent.toLowerCase().indexOf("msie") > -1 && (maskDiv.height(b.height() + parseInt(b.css("padding-top")) + parseInt(b.css("padding-bottom"))), maskDiv.width(b.width() + parseInt(b.css("padding-left")) + parseInt(b.css("padding-right")))), void 0 !== c && null != c && (h = a('<div class="loadmask-msg" style="display:none;"></div>'), d ? h.append('<div class="mask_lading">' + c + "</div>") : h.append('<div  class="normal">' + c + "</div>"), b.append(h), h[0].style.top = f + "px", h[0].style.left = g + "px", h[0].style.display = "")
	}, a.unmaskElement = function(a) {
		void 0 !== a.data("_mask_timeout") && (clearTimeout(a.data("_mask_timeout")), a.removeData("_mask_timeout")), a.find(".loadmask-msg").remove(), a.removeClass("masked"), maskDiv.fadeOut(400)
	}
}(jQuery), jQuery &&
function(a) {
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
}(jQuery), function($) {
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
			if (a) if ("object" != typeof a) {
				if (e = a, 0 == e.indexOf("on")) return "function" == typeof b && this.bind(e.substr(2), b), void 0;
				this.trigger("propertychange", a, b), this.options || (this.options = {}), this.options[e] = b, f = "_set" + e.substr(0, 1).toUpperCase() + e.substr(1), this[f] && this[f].call(this, b), this.trigger("propertychanged", a, b)
			} else {
				if (this.options != a ? ($.extend(this.options, a), c = a) : c = $.extend({}, a), void 0 == b || 1 == b) for (d in c) 0 == d.indexOf("on") && this.set(d, c[d]);
				if (void 0 == b || 0 == b) for (d in c) 0 != d.indexOf("on") && this.set(d, c[d])
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
			if (d) for (b = b || [], 0 == b instanceof Array && (b = [b]), e = 0; e < d.length; e++) if (f = d[e], 0 == f.handler.apply(f.context, b)) return !1
		},
		bind: function(a, b, c) {
			var d, e, f;
			if ("object" != typeof a) {
				if ("function" != typeof b) return !1;
				e = a.toLowerCase(), f = this.events[e] || [], c = c || this, f.push({
					handler: b,
					context: c
				}), this.events[e] = f
			} else for (d in a) this.bind(d, a[d])
		},
		unbind: function(a, b) {
			var c, d, e, f;
			if (!a) return this.events = {}, void 0;
			if (c = a.toLowerCase(), d = this.events[c], d && d.length) if (b) {
				for (e = 0, f = d.length; f > e; e++) if (d[e].handler == b) {
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
				if (attributes = this.attr(), attributes && attributes instanceof Array) for (i = 0; i < attributes.length; i++) name = attributes[i], this.options[name] = $(this.element).attr(name);
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
			for (c = 0, d = b.length; d > c; c++) if (e = b.eq(c).attr("quiuiid"), (!a || a.id != e) && (f = $.quiui.get(e), f && (g = f.get("modal")))) return;
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
			for (var a in this.tasks) if (this.tasks[a]) return !0;
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
}(jQuery), function(a) {
	a.fn.quiLayout = function() {
		return a.quiui.run.call(this, "quiLayout", arguments)
	}, a.fn.quiGetLayoutManager = function() {
		return a.quiui.run.call(this, "quiGetLayoutManager", arguments)
	}, a.quiDefaults.Layout = {
		topHeight: 50,
		bottomHeight: 50,
		leftWidth: 200,
		centerWidth: 300,
		rightWidth: 170,
		InWindow: !0,
		height: "100%",
		onHeightChanged: null,
		isLeftCollapse: !1,
		isRightCollapse: !1,
		allowLeftCollapse: !1,
		allowRightCollapse: !1,
		allowLeftResize: !0,
		allowRightResize: !0,
		allowTopResize: !0,
		allowBottomResize: !0,
		space: 10,
		onEndResize: null,
		minLeftWidth: 150,
		maxLeftWidth: 400,
		minRightWidth: 150,
		maxRightWidth: 400
	}, a.quiMethos.Layout = {}, a.quiui.controls.Layout = function(b, c) {
		a.quiui.controls.Layout.base.constructor.call(this, b, c)
	}, a.quiui.controls.Layout.quiExtend(a.quiui.core.UIComponent, {
		__getType: function() {
			return "Layout"
		},
		__idPrev: function() {
			return "Layout"
		},
		_extendMethods: function() {
			return a.quiMethos.Layout
		},
		_render: function() {
			var b = this,
				c = this.options;
			b.layout = a(this.element), b.layout.addClass("main-layout"), b.width = b.layout.width(), a("> div[position=left]", b.layout).length > 0 && (b.left = a("> div[position=left]", b.layout).wrap('<div class="main-layout-left" style="left:0px;"></div>').parent(), b.left.content = a("> div[position=left]", b.left), b.left.content.hasClass("main-layout-content") || b.left.content.addClass("main-layout-content"), b.leftWidth = c.leftWidth, b.leftWidth && b.left.width(b.leftWidth)), a("> div[position=center]", b.layout).length > 0 && (b.center = a("> div[position=center]", b.layout).wrap('<div class="main-layout-center" ></div>').parent(), b.center.content = a("> div[position=center]", b.center), b.center.content.addClass("main-layout-content"), b.centerWidth = c.centerWidth, b.centerWidth && b.center.width(b.centerWidth)), a("> div[position=right]", b.layout).length > 0 && (b.right = a("> div[position=right]", b.layout).wrap('<div class="main-layout-right"></div>').parent(), b.right.content = a("> div[position=right]", b.right), b.right.content.hasClass("main-layout-content") || b.right.content.addClass("main-layout-content"), b.rightWidth = c.rightWidth, b.rightWidth && b.right.width(b.rightWidth)), b.layout.lock = a("<div class='main-layout-lock'></div>"), b.layout.append(b.layout.lock), b._addDropHandle(), b.isLeftCollapse = c.isLeftCollapse, b.isRightCollapse = c.isRightCollapse, b.leftCollapse = a('<div class="main-layout-collapse-left" style="display: none; "><table height="100%" cellpadding="0" cellspacing="0" class="table_border0"><tr><td><div class="bs_rightArr" title="' + uncompile(quiLanguage.layout.collapseText) + '"></div></td></tr></table></div>'), b.rightCollapse = a('<div class="main-layout-collapse-right" style="display: none; "><table height="100%" cellpadding="0" cellspacing="0" class="table_border0"><tr><td><div class="bs_leftArr" title="' + uncompile(quiLanguage.layout.expendText) + '"></div></td></tr></table></div>'), b.layout.append(b.leftCollapse).append(b.rightCollapse), b.leftCollapse.toggle = a(".bs_rightArr", b.leftCollapse), b.rightCollapse.toggle = a(".bs_leftArr", b.rightCollapse), b._setCollapse(), b._bulid(), a(window).resize(function() {
				b._onResize()
			}), b.set(c), b.mask.height(b.layout.height()), b.leftDropHandle && (b.leftDropHandle.hide(), b.leftDropHandle.show()), b.rightDropHandle && (b.rightDropHandle.hide(), b.rightDropHandle.show()), b.isLeftCollapse && b.leftDropHandle.hide(), b.isRightCollapse && b.rightDropHandle.hide()
		},
		setLeftCollapse: function(b) {
			var c = this;
			return this.options, c.left ? (c.isLeftCollapse = b, c.isLeftCollapse ? (c.leftCollapse.show(), c.leftDropHandle && c.leftDropHandle.hide(), c.left.hide(), a("#vTab").hide()) : (c.leftCollapse.hide(), c.leftDropHandle && c.leftDropHandle.show(), c.left.show(), a("#vTab").show()), c._onResize(), void 0) : !1
		},
		setRightCollapse: function(a) {
			var b = this;
			return this.options, b.right ? (b.isRightCollapse = a, b._onResize(), b.isRightCollapse ? (b.rightCollapse.show(), b.rightDropHandle && b.rightDropHandle.hide(), b.right.hide()) : (b.rightCollapse.hide(), b.rightDropHandle && b.rightDropHandle.show(), b.right.show()), b._onResize(), void 0) : !1
		},
		_bulid: function() {
			var a = this,
				b = this.options;
			a.middleTop = 0, a.top && (a.middleTop += a.top.height(), a.middleTop += parseInt(a.top.css("borderTopWidth")), a.middleTop += parseInt(a.top.css("borderBottomWidth")), a.middleTop += b.space), a.left && (a.left.css({
				top: a.middleTop
			}), a.leftCollapse.css({
				top: a.middleTop
			})), a.center && a.center.css({
				top: a.middleTop
			}), a.right && (a.right.css({
				top: a.middleTop
			}), a.rightCollapse.css({
				top: a.middleTop
			})), a.left && a.left.css({
				left: 0
			}), a._onResize(), a._onResize()
		},
		_setCollapse: function() {
			var a = this;
			this.options, a.leftCollapse.toggle.click(function() {
				a.setLeftCollapse(!1)
			}), a.rightCollapse.toggle.click(function() {
				a.setRightCollapse(!1)
			}), a.left && a.isLeftCollapse && (a.leftCollapse.show(), a.leftDropHandle && a.leftDropHandle.hide(), a.left.hide()), a.right && a.isRightCollapse && (a.rightCollapse.show(), a.rightDropHandle && a.rightDropHandle.hide(), a.right.hide())
		},
		_addDropHandle: function() {
			var d, e, f, g, b = this,
				c = this.options;
			b.left && (b.leftDropHandle = a("<div class='main-layout-drophandle-left'></div>"), c.allowLeftResize && b.leftDropHandle.css("cursor", "col-resize"), d = a('<table height="100%" cellpadding="0" cellspacing="0" class="table_border0"><tr><td><div class="bs_leftArr" title="' + uncompile(quiLanguage.layout.collapseText) + '"></div></td></tr></table>'), b.leftDropHandle.append(d), d.find(".bs_leftArr").click(function() {
				b.setLeftCollapse(!0)
			}), e = 0, d.find(".bs_leftArr").hover(function() {
				e = 1
			}, function() {
				e = 0
			}), b.layout.append(b.leftDropHandle), b.leftDropHandle && b.leftDropHandle.show(), b.leftDropHandle.mousedown(function(a) {
				c.allowLeftResize && 0 == e && b._start("leftresize", a)
			})), b.right && (b.rightDropHandle = a("<div class='main-layout-drophandle-right'></div>"), c.allowRightResize && b.rightDropHandle.css("cursor", "col-resize"), f = a('<table height="100%" cellpadding="0" cellspacing="0" class="table_border0"><tr><td><div class="bs_rightArr" title="' + uncompile(quiLanguage.layout.collapseText) + '"></div></td></tr></table>'), b.rightDropHandle.append(f), f.find(".bs_rightArr").click(function() {
				b.setRightCollapse(!0)
			}), g = 0, f.find(".bs_rightArr").hover(function() {
				g = 1
			}, function() {
				g = 0
			}), b.layout.append(b.rightDropHandle), b.rightDropHandle && b.rightDropHandle.show(), b.rightDropHandle.mousedown(function(a) {
				c.allowRightResize && 0 == g && b._start("rightresize", a)
			})), b.draggingyline = a("<div class='main-layout-dragging-yline'></div>"), b.mask = a("<div class='l-dragging-mask'></div>"), b.layout.append(b.draggingyline).append(b.mask)
		},
		_setDropHandlePosition: function() {
			var a = this,
				b = this.options;
			a.leftDropHandle && a.leftDropHandle.css({
				left: a.left.width() + parseInt(a.left.css("left")),
				height: a.middleHeight,
				top: a.middleTop
			}), a.rightDropHandle && a.rightDropHandle.css({
				left: parseInt(a.right.css("left")) - b.space,
				height: a.middleHeight,
				top: a.middleTop
			})
		},
		_onResize: function() {
			var h, i, b = this,
				c = this.options,
				d = b.layout.height(),
				e = 0,
				f = a(window).height(),
				g = null;
			"string" == typeof c.height && c.height.indexOf("%") > 0 ? (h = b.layout.parent(), c.InWindow || "body" == h[0].tagName.toLowerCase() ? (g = f, g -= parseInt(a("body").css("paddingTop")), g -= parseInt(a("body").css("paddingBottom"))) : g = h.height(), e = .01 * g * parseFloat(c.height), (c.InWindow || "body" == h[0].tagName.toLowerCase()) && (e -= b.layout.offset().top - parseInt(a("body").css("paddingTop")))) : e = parseInt(c.height), e += -a("#fbox").outerHeight(), b.layout.height(e), b.layoutHeight = b.layout.height(), b.middleWidth = b.layout.width(), b.middleHeight = b.layout.height(), b.middleHeight -= 0, b.hasBind("heightChanged") && b.layoutHeight != d && b.trigger("heightChanged", [{
				layoutHeight: b.layoutHeight,
				diff: b.layoutHeight - d,
				middleHeight: b.middleHeight
			}]), b.center && (b.centerWidth = b.middleWidth, b.left && (b.isLeftCollapse ? (b.centerWidth -= b.leftCollapse.width(), b.centerWidth -= parseInt(b.leftCollapse.css("borderLeftWidth")), b.centerWidth -= parseInt(b.leftCollapse.css("borderRightWidth")), b.centerWidth -= parseInt(b.leftCollapse.css("left"))) : (b.centerWidth -= b.leftWidth, b.centerWidth -= parseInt(b.left.css("borderLeftWidth")), b.centerWidth -= parseInt(b.left.css("borderRightWidth")), b.centerWidth -= parseInt(b.left.css("left")), b.centerWidth -= c.space)), b.right && (b.isRightCollapse ? (b.centerWidth -= b.rightCollapse.width(), b.centerWidth -= parseInt(b.rightCollapse.css("borderLeftWidth")), b.centerWidth -= parseInt(b.rightCollapse.css("borderRightWidth")), b.centerWidth -= parseInt(b.rightCollapse.css("right"))) : (b.centerWidth -= b.rightWidth, b.centerWidth -= parseInt(b.right.css("borderLeftWidth")), b.centerWidth -= parseInt(b.right.css("borderRightWidth")), b.centerWidth -= c.space)), b.centerLeft = 0, b.left && (b.isLeftCollapse ? (b.centerLeft += b.leftCollapse.width(), b.centerLeft += parseInt(b.leftCollapse.css("borderLeftWidth")), b.centerLeft += parseInt(b.leftCollapse.css("borderRightWidth")), b.centerLeft += parseInt(b.leftCollapse.css("left"))) : (b.centerLeft += b.left.width(), b.centerLeft += parseInt(b.left.css("borderLeftWidth")), b.centerLeft += parseInt(b.left.css("borderRightWidth")), b.centerLeft += c.space)), b.center.css({
				left: b.centerLeft
			}), b.center.width(b.centerWidth), b.center.height(b.middleHeight), i = b.middleHeight, b.center.header && (i -= b.center.header.height()), b.center.content.height(i)), b.left && (b.leftCollapse.height(b.middleHeight), b.left.height(b.middleHeight)), b.right && (b.rightCollapse.height(b.middleHeight), b.right.height(b.middleHeight), b.rightLeft = 0, b.left && (b.isLeftCollapse ? (b.rightLeft += b.leftCollapse.width(), b.rightLeft += parseInt(b.leftCollapse.css("borderLeftWidth")), b.rightLeft += parseInt(b.leftCollapse.css("borderRightWidth"))) : (b.rightLeft += b.left.width(), b.rightLeft += parseInt(b.left.css("borderLeftWidth")), b.rightLeft += parseInt(b.left.css("borderRightWidth")), b.rightLeft += parseInt(b.left.css("left")), b.rightLeft += c.space)), b.center && (b.rightLeft += b.center.width(), b.rightLeft += parseInt(b.center.css("borderLeftWidth")), b.rightLeft += parseInt(b.center.css("borderRightWidth")), b.rightLeft += c.space), b.right.css({
				left: b.rightLeft
			})), b._setDropHandlePosition()
		},
		_start: function(b, c) {
			var d = this;
			this.options, d.dragtype = b, ("leftresize" == b || "rightresize" == b) && (d.xresize = {
				startX: c.pageX
			}, d.draggingyline.css({
				left: c.pageX - d.layout.offset().left,
				height: d.middleHeight,
				top: d.middleTop
			}).show(), a("body").css("cursor", "col-resize"), d.mask.height(d.layout.height()).removeClass("main-layout-ymask").addClass("main-layout-xmask").show(), d.layout.lock.width(d.layout.width()), d.layout.lock.height(d.layout.height()), d.layout.lock.show(), (a.browser.msie || a.browser.safari) && a("body").bind("selectstart", function() {
				return !1
			}), a(document).bind("mouseup", function() {
				d._stop.apply(d, arguments)
			}), a(document).bind("mousemove", function() {
				d._drag.apply(d, arguments)
			}))
		},
		_drag: function(b) {
			var c = this,
				d = this.options;
			if (c.xresize) {
				if (c.xresize.diff = b.pageX - c.xresize.startX, c.draggingyline.css({
					left: b.pageX - c.layout.offset().left
				}), "leftresize" == c.dragtype) {
					if (d.minLeftWidth && b.pageX - c.layout.offset().left < d.minLeftWidth) return c.draggingyline.css({
						left: d.minLeftWidth
					}), void 0;
					if (d.maxLeftWidth && b.pageX - c.layout.offset().left > d.maxLeftWidth) return c.draggingyline.css({
						left: d.maxLeftWidth
					}), void 0
				} else if ("rightresize" == c.dragtype) {
					if (d.minRightWidth && a(window).width() - b.pageX < d.minRightWidth) return c.draggingyline.css({
						left: a(window).width() - d.minRightWidth
					}), void 0;
					if (d.maxRightWidth && a(window).width() - b.pageX > d.maxRightWidth) return c.draggingyline.css({
						left: a(window).width() - d.maxRightWidth
					}), void 0
				}
				a("body").css("cursor", "col-resize")
			}
		},
		_stop: function(b) {
			var e, c = this,
				d = this.options;
			c.xresize && void 0 != c.xresize.diff && ("leftresize" == c.dragtype ? (d.minLeftWidth && c.leftWidth + c.xresize.diff < d.minLeftWidth && (c.xresize.diff = d.minLeftWidth - c.leftWidth), d.maxLeftWidth && c.leftWidth + c.xresize.diff > d.maxLeftWidth && (c.xresize.diff = d.maxLeftWidth - c.leftWidth), e = c.xresize.diff, c.leftWidth += c.xresize.diff, c.left.width(c.leftWidth), c.center ? c.center.width(c.center.width() - c.xresize.diff).css({
				left: parseInt(c.center.css("left")) + c.xresize.diff
			}) : c.right && c.right.width(c.left.width() - c.xresize.diff).css({
				left: parseInt(c.right.css("left")) + c.xresize.diff
			})) : "rightresize" == c.dragtype && (d.minRightWidth && c.rightWidth - c.xresize.diff < d.minRightWidth && (c.xresize.diff = c.rightWidth - d.minRightWidth), d.maxRightWidth && c.rightWidth - c.xresize.diff > d.maxRightWidth && (c.xresize.diff = c.rightWidth - d.maxRightWidth), c.rightWidth -= c.xresize.diff, c.right.width(c.rightWidth).css({
				left: parseInt(c.right.css("left")) + c.xresize.diff
			}), c.center ? c.center.width(c.center.width() + c.xresize.diff) : c.left && c.left.width(c.left.width() + c.xresize.diff))), c.trigger("endResize", [{
				direction: c.dragtype ? c.dragtype.replace(/resize/, "") : "",
				diff: e
			},
			b]), c._setDropHandlePosition(), c.draggingyline.hide(), c.mask.hide(), c.xresize = c.yresize = c.dragtype = !1, c.layout.lock.hide(), (a.browser.msie || a.browser.safari) && a("body").unbind("selectstart"), a(document).unbind("mousemove", c._drag), a(document).unbind("mouseup", c._stop), a("body").css("cursor", "")
		}
	})
}(jQuery), function(a) {
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
}(jQuery), function(a) {
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
}(jQuery);