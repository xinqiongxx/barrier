/**
 *  系统main页
 *
 * <pre>
 *
 * 作者：hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-9-17-上午11:15:52
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 *
 */
if ("ibps" in window || (window.ibps = {}), ibps.config = {
	cookie_expiry: 604800,
	cookie_path: "",
	storage_method: 2
}, "vars" in window.ibps || (window.ibps.vars = {}), ibps.vars.very_old_ie = !("querySelector" in document.documentElement), ibps.settings = {
	is: function (e, s) {
		return 1 == ibps.data.get("settings", e + "-" + s)
	}, exists: function (e, s) {
		return null !== ibps.data.get("settings", e + "-" + s)
	}, set: function (e, s) {
		ibps.data.set("settings", e + "-" + s, 1)
	}, unset: function (e, s) {
		ibps.data.set("settings", e + "-" + s, -1)
	}, remove: function (e, s) {
		ibps.data.remove("settings", e + "-" + s)
	}, navbar_fixed: function (e, s, i, t) {
		if (ibps.vars.very_old_ie) return !1
		var e = e || "#navbar"
		if ("string" == typeof e && (e = document.querySelector(e)), !e) return !1
		if (s = s || !1, i = i && !0, !s && t !== !1) {
			var n = null;
			(ibps.settings.is("sidebar", "fixed") || (n = document.getElementById("sidebar")) && ibps.hasClass(n, "sidebar-fixed")) && ibps.settings.sidebar_fixed(n, !1, i)
		}
		s ? (ibps.hasClass(e, "navbar-fixed-top") || ibps.addClass(e, "navbar-fixed-top"), i !== !1 && ibps.settings.set("navbar", "fixed")) : (ibps.removeClass(e, "navbar-fixed-top"), i !== !1 && ibps.settings.unset("navbar", "fixed"))
		try {
			document.getElementById("ibps-settings-navbar").checked = s
		} catch (r) {}
		window.jQuery && jQuery(document).trigger("settings.ibps", ["navbar_fixed", s, e])
	}, sidebar_fixed: function (e, s, i, t) {
		if (ibps.vars.very_old_ie) return !1
		var e = e || "#sidebar"
		if ("string" == typeof e && (e = document.querySelector(e)), !e) return !1
		if (s = s || !1, i = i && !0, !s && t !== !1) {
			var n = null;
			(ibps.settings.is("breadcrumbs", "fixed") || (n = document.getElementById("breadcrumbs")) && ibps.hasClass(n, "breadcrumbs-fixed")) && ibps.settings.breadcrumbs_fixed(n, !1, i)
		}
		if (s && t !== !1 && !ibps.settings.is("navbar", "fixed") && ibps.settings.navbar_fixed(null, !0, i), s) {
			if (!ibps.hasClass(e, "sidebar-fixed")) {
				ibps.addClass(e, "sidebar-fixed")
				var r = document.getElementById("menu-toggler")
				r && ibps.addClass(r, "fixed")
			}
			i !== !1 && ibps.settings.set("sidebar", "fixed")
		} else {
			ibps.removeClass(e, "sidebar-fixed")
			var r = document.getElementById("menu-toggler")
			r && ibps.removeClass(r, "fixed"), i !== !1 && ibps.settings.unset("sidebar", "fixed")
		}
		try {
			document.getElementById("ibps-settings-sidebar").checked = s
		} catch (a) {}
		window.jQuery && jQuery(document).trigger("settings.ibps", ["sidebar_fixed", s, e])
	}, breadcrumbs_fixed: function (e, s, i, t) {
		if (ibps.vars.very_old_ie) return !1
		var e = e || "#breadcrumbs"
		if ("string" == typeof e && (e = document.querySelector(e)), !e) return !1
		s = s || !1, i = i && !0, s && t !== !1 && !ibps.settings.is("sidebar", "fixed") && ibps.settings.sidebar_fixed(null, !0, i), s ? (ibps.hasClass(e, "breadcrumbs-fixed") || ibps.addClass(e, "breadcrumbs-fixed"), i !== !1 && ibps.settings.set("breadcrumbs", "fixed")) : (ibps.removeClass(e, "breadcrumbs-fixed"), i !== !1 && ibps.settings.unset("breadcrumbs", "fixed"))
		try {
			document.getElementById("ibps-settings-breadcrumbs").checked = s
		} catch (n) {}
		window.jQuery && jQuery(document).trigger("settings.ibps", ["breadcrumbs_fixed", s, e])
	}, main_container_fixed: function (e, s, i) {
		if (ibps.vars.very_old_ie) return !1
		s = s || !1, i = i && !0
		var e = e || "#main-container"
		if ("string" == typeof e && (e = document.querySelector(e)), !e) return !1
		var t = document.getElementById("navbar-container")
		s ? (ibps.hasClass(e, "container") || ibps.addClass(e, "container"), t && !ibps.hasClass(t, "container") && ibps.addClass(t, "container"), i !== !1 && ibps.settings.set("main-container", "fixed")) : (ibps.removeClass(e, "container"), t && ibps.removeClass(t, "container"), i !== !1 && ibps.settings.unset("main-container", "fixed"))
		try {
			document.getElementById("ibps-settings-add-container").checked = s
		} catch (n) {}
		if (navigator.userAgent.match(/webkit/i)) {
			var r = document.getElementById("sidebar")
			ibps.toggleClass(r, "menu-min"), setTimeout(function () {
				ibps.toggleClass(r, "menu-min")
			}, 0)
		}
		window.jQuery && jQuery(document).trigger("settings.ibps", ["main_container_fixed", s, e])
	}, sidebar_collapsed: function (e, s, i) {
		if (ibps.vars.very_old_ie) return !1
		var e = e || "#sidebar"
		if ("string" == typeof e && (e = document.querySelector(e)), !e) return !1
		if (s = s || !1, s ? (ibps.addClass(e, "menu-min"), i !== !1 && ibps.settings.set("sidebar", "collapsed")) : (ibps.removeClass(e, "menu-min"), i !== !1 && ibps.settings.unset("sidebar", "collapsed")), window.jQuery && jQuery(document).trigger("settings.ibps", ["sidebar_collapsed", s, e]), !window.jQuery) {
			var t = document.querySelector('.sidebar-collapse[data-target="#' + (e.getAttribute("id") || "") + '"]')
			if (t || (t = e.querySelector(".sidebar-collapse")), !t) return
			var n, r, a = t.querySelector("[data-icon1][data-icon2]")
			if (!a) return
			n = a.getAttribute("data-icon1"), r = a.getAttribute("data-icon2"), s ? (ibps.removeClass(a, n), ibps.addClass(a, r)) : (ibps.removeClass(a, r), ibps.addClass(a, n))
		}
	}
}, ibps.settings.check = function (e, s) {
	if (ibps.settings.exists(e, s)) {
		var i = ibps.settings.is(e, s),
			t = {
				"navbar-fixed": "navbar-fixed-top",
				"sidebar-fixed": "sidebar-fixed",
				"breadcrumbs-fixed": "breadcrumbs-fixed",
				"sidebar-collapsed": "menu-min",
				"main-container-fixed": "container"
			},
			n = document.getElementById(e)
		i != ibps.hasClass(n, t[e + "-" + s]) && ibps.settings[e.replace("-", "_") + "_" + s](null, i)
	}
}, ibps.data_storage = function (e, s) {
	var i = "ibps_",
		t = null,
		n = 0;
	(1 == e || e === s) && "localStorage" in window && null !== window.localStorage ? (t = ibps.storage, n = 1) : null == t && (2 == e || e === s) && "cookie" in document && null !== document.cookie && (t = ibps.cookie, n = 2), this.set = function (e, s, r, a, o) {
		if (t)
			if (r === o) r = s, s = e, null == r ? t.remove(i + s) : 1 == n ? t.set(i + s, r) : 2 == n && t.set(i + s, r, ibps.config.cookie_expiry, a || ibps.config.cookie_path)
			else if (1 == n) null == r ? t.remove(i + e + "_" + s) : t.set(i + e + "_" + s, r)
			else if (2 == n) {
				var l = t.get(i + e),
					d = l ? JSON.parse(l) : {}
				if (null == r) {
					if (delete d[s], 0 == ibps.sizeof(d)) return t.remove(i + e), o
				} else d[s] = r
				t.set(i + e, JSON.stringify(d), ibps.config.cookie_expiry, a || ibps.config.cookie_path)
			}
	}, this.get = function (e, s, r) {
		if (!t) return null
		if (s === r) return s = e, t.get(i + s)
		if (1 == n) return t.get(i + e + "_" + s)
		if (2 == n) {
			var a = t.get(i + e),
				o = a ? JSON.parse(a) : {}
			return s in o ? o[s] : null
		}
	}, this.remove = function (e, s, i) {
		t && (s === i ? (s = e, this.set(s, null)) : this.set(e, s, null))
	}
}, ibps.cookie = {
	get: function (e) {
		var s, i, t = document.cookie,
			n = e + "="
		if (t) {
			if (i = t.indexOf("; " + n), -1 == i) {
				if (i = t.indexOf(n), 0 != i) return null
			} else i += 2
			return s = t.indexOf(";", i), -1 == s && (s = t.length), decodeURIComponent(t.substring(i + n.length, s))
		}
	}, set: function (e, s, i, t, n, r) {
		var a = new Date "object" == typeof i && i.toGMTString ? i = i.toGMTString() : parseInt(i, 10) ? (a.setTime(a.getTime() + 1e3 * parseInt(i, 10)), i = a.toGMTString()) : i = "",
			document.cookie = e + "=" + encodeURIComponent(s) + (i ? "; expires=" + i : "") + (t ? "; path=" + t : "") + (n ? "; domain=" + n : "") + (r ? "; secure" : "")
	}, remove: function (e, s) {
		this.set(e, "", -1e3, s)
	}
}, ibps.storage = {
	get: function (e) {
		return window.localStorage.getItem(e)
	}, set: function (e, s) {
		window.localStorage.setItem(e, s)
	}, remove: function (e) {
		window.localStorage.removeItem(e)
	}
}, ibps.sizeof = function (e) {
	var s = 0
	for (var i in e) e.hasOwnProperty(i) && s++
	return s
}, ibps.hasClass = function (e, s) {
	return (" " + e.className + " ").indexOf(" " + s + " ") > -1
}, ibps.addClass = function (e, s) {
	if (!ibps.hasClass(e, s)) {
		var i = e.className
		e.className = i + (i.length ? " " : "") + s
	}
}, ibps.removeClass = function (e, s) {
	ibps.replaceClass(e, s)
}, ibps.replaceClass = function (e, s, i) {
	var t = RegExp("(^|\\s)" + s + "(\\s|$)", "i")
	e.className = e.className.replace(t, function (e, s, t) {
		return i ? s + i + t : " "
	}).replace(/^\s+|\s+$/g, "")
}, ibps.toggleClass = function (e, s) {
	ibps.hasClass(e, s) ? ibps.removeClass(e, s) : ibps.addClass(e, s)
}, ibps.isHTTMlElement = function (e) {
	return window.HTMLElement ? e instanceof HTMLElement : "nodeType" in e ? 1 == e.nodeType : !1
}, ibps.data = new ibps.data_storage(ibps.config.storage_method), "undefined" == typeof jQuery) throw Error("IBPS's JavaScript requires jQuery")
if (function (e, s) {
	var i = function (i, t) {
		function n(e) {
			e.preventDefault(), e.stopPropagation()
			var s = S.offset(),
				i = s[f],
				t = y ? e.pageY : e.pageX
			t > i + j ? (j = t - i - E + D, j > P && (j = P)) : (j = t - i - D, 0 > j && (j = 0)), h.update_scroll()
		}

		function r(s) {
			s.preventDefault(), s.stopPropagation(), ie = se = y ? s.pageY : s.pageX, B = !0, e("html").off("mousemove.ibps_scroll").on("mousemove.ibps_scroll", a), e(R).off("mouseup.ibps_scroll").on("mouseup.ibps_scroll", o), S.addClass("active"), Y && h.$element.trigger("drag.start")
		}

		function a(e) {
			e.preventDefault(), e.stopPropagation(), ie = y ? e.pageY : e.pageX, ie - se + j > P ? ie = se + P - j : 0 > ie - se + j && (ie = se - j), j += ie - se, se = ie, 0 > j ? j = 0 : j > P && (j = P), h.update_scroll()
		}

		function o(s) {
			s.preventDefault(), s.stopPropagation(), B = !1, e("html").off(".ibps_scroll"), e(R).off(".ibps_scroll"), S.removeClass("active"), Y && h.$element.trigger("drag.end"), k && U && !V && d()
		}

		function l(e) {
			var s = +new Date
			if (Z && s - ne > 1e3) {
				var i = I[w]
				K != i && (K = i, ee = !0, h.reset(!0)), ne = s
			}
			k && U && (null != te && (clearTimeout(te), te = null), S.addClass("not-idle"), V || 1 != e || d())
		}

		function d() {
			null != te && (clearTimeout(te), te = null), te = setTimeout(function () {
				te = null, S.removeClass("not-idle")
			}, G)
		}

		function c() {
			S.css("visibility", "hidden").addClass("scroll-hover"), N = y ? parseInt(S.outerWidth()) || 0 : parseInt(S.outerHeight()) || 0, S.css("visibility", "").removeClass("scroll-hover")
		}

		function p() {
			if (F !== !1) {
				var e = z.offset(),
					s = e.left,
					i = e.top
				y ? O || (s += z.outerWidth() - N) : O || (i += z.outerHeight() - N), F === !0 ? S.css({
					top: parseInt(i),
					left: parseInt(s)
				}) : "left" === F ? S.css("left", parseInt(s)) : "top" === F && S.css("top", parseInt(i))
			}
		}
		var h = this,
			u = ibps.helper.getAttrSettings(i, e.fn.ibps_scroll.defaults),
			b = e.extend({}, e.fn.ibps_scroll.defaults, t, u)
		this.size = 0, this.lock = !1, this.lock_anyway = !1, this.$element = e(i), this.element = i
		var f, v, g, m, _, w, y = !0,
			C = !1,
			k = !1,
			x = !1,
			z = null,
			I = null,
			S = null,
			T = null,
			$ = null,
			H = null,
			M = null,
			E = 0,
			j = 0,
			P = 0,
			D = 0,
			A = !0,
			q = !1,
			Q = "",
			O = !1,
			N = 0,
			W = 1,
			L = !1,
			B = !1,
			R = "onmouseup" in window ? window : "html",
			Y = b.dragEvent || !1,
			J = t.scrollEvent || !1,
			X = b.detached || !1,
			F = b.updatePos || !1,
			U = b.hideOnIdle || !1,
			G = b.hideDelay || 1500,
			V = !1,
			Z = b.observeContent || !1,
			K = 0,
			ee = !0
		this.create = function (i) {
			if (!x) {
				i && (b = e.extend({}, e.fn.ibps_scroll.defaults, i)), this.size = parseInt(this.$element.attr("data-size")) || b.size || 200, y = !b.horizontal, f = y ? "top" : "left", v = y ? "height" : "width", g = y ? "maxHeight" : "maxWidth", m = y ? "clientHeight" : "clientWidth", _ = y ? "scrollTop" : "scrollLeft", w = y ? "scrollHeight" : "scrollWidth", this.$element.addClass("ibps-scroll"), "static" == this.$element.css("position") ? (L = this.element.style.position, this.element.style.position = "relative") : L = !1
				var t = null
				X ? t = e('<div class="scroll-track scroll-detached"><div class="scroll-bar"></div></div>').appendTo("body") : (this.$element.wrapInner('<div class="scroll-content" />'), this.$element.prepend('<div class="scroll-track"><div class="scroll-bar"></div></div>')), z = this.$element, X || (z = this.$element.find(".scroll-content").eq(0)), y || z.wrapInner("<div />"), I = z.get(0), X ? (S = t, p()) : S = this.$element.find(".scroll-track").eq(0), T = S.find(".scroll-bar").eq(0), $ = S.get(0), H = T.get(0), M = H.style, y || S.addClass("scroll-hz"), b.styleClass && (Q = b.styleClass, S.addClass(Q), O = !!Q.match(/scroll\-left|scroll\-top/)), 0 == N && (S.show(), c()), S.hide(), S.on("mousedown", n), T.on("mousedown", r), z.on("scroll", function () {
					A && (j = parseInt(Math.round(this[_] * W)), M[f] = j + "px"), A = !1, J && this.$element.trigger("scroll", [I])
				}), b.mouseWheel && (this.lock = b.mouseWheelLock, this.lock_anyway = b.lockAnyway, this.$element.on(e.event.special.mousewheel ? "mousewheel.ibps_scroll" : "mousewheel.ibps_scroll DOMMouseScroll.ibps_scroll", function (s) {
					if (!C) {
						if (l(!0), !k) return !h.lock_anyway
						B && (B = !1, e("html").off(".ibps_scroll"), e(R).off(".ibps_scroll"), Y && h.$element.trigger("drag.end")), s.deltaY = s.deltaY || 0
						var i = s.deltaY > 0 || s.originalEvent.detail < 0 || s.originalEvent.wheelDelta > 0 ? 1 : -1,
							t = !1,
							n = I[m],
							r = I[_]
						h.lock || (t = -1 == i ? I[w] <= r + n : 0 == r), h.move_bar(!0)
						var a = parseInt(n / 8)
						return 80 > a && (a = 80), a > h.size && (a = h.size), a += 1, I[_] = r - i * a, t && !h.lock_anyway
					}
				}))
				var a = ibps.vars.touch && "ibps_drag" in e.event.special && b.touchDrag
				if (a) {
					var o = "",
						u = a ? "ibps_drag" : "swipe"
					this.$element.on(u + ".ibps_scroll", function (e) {
						if (C) return e.retval.cancel = !0, s
						if (l(!0), !k) return e.retval.cancel = this.lock_anyway, s
						if (o = e.direction, y && ("up" == o || "down" == o) || !y && ("left" == o || "right" == o)) {
							var i = y ? e.dy : e.dx
							0 != i && (Math.abs(i) > 20 && a && (i = 2 * i), h.move_bar(!0), I[_] = I[_] + i)
						}
					})
				}
				U && S.addClass("idle-hide"), Z && S.on("mouseenter.ibps_scroll", function () {
					V = !0, l(!1)
				}).on("mouseleave.ibps_scroll", function () {
					V = !1, 0 == B && d()
				}), this.$element.on("mouseenter.ibps_scroll touchstart.ibps_scroll", function (e) {
					ee = !0, Z ? l(!0) : b.hoverReset && h.reset(!0), S.addClass("scroll-hover")
				}).on("mouseleave.ibps_scroll touchend.ibps_scroll", function () {
					S.removeClass("scroll-hover")
				}), y || z.children(0).css(v, this.size), z.css(g, this.size), C = !1, x = !0
			}
		}, this.is_active = function () {
			return k
		}, this.is_enabled = function () {
			return !C
		}, this.move_bar = function (e) {
			A = e
		}, this.get_track = function () {
			return $
		}, this.reset = function (e) {
			if (!C) {
				x || this.create()
				var i = this.size
				if (!e || ee) {
					if (ee = !1, X) {
						var t = parseInt(Math.round((parseInt(z.css("border-top-width")) + parseInt(z.css("border-bottom-width"))) / 2.5))
						i -= t
					}
					var n = y ? I[w] : i
					if (y && 0 == n || !y && 0 == this.element.scrollWidth) return S.removeClass("scroll-active"), s
					var r = y ? i : I.clientWidth
					y || z.children(0).css(v, i), z.css(g, this.size), n > r ? (k = !0, S.css(v, r).show(), W = parseFloat((r / n).toFixed(5)), E = parseInt(Math.round(r * W)), D = parseInt(Math.round(E / 2)), P = r - E, j = parseInt(Math.round(I[_] * W)), M[v] = E + "px", M[f] = j + "px", S.addClass("scroll-active"), 0 == N && c(), q || (b.reset && (I[_] = 0, M[f] = 0), q = !0), X && p()) : (k = !1, S.hide(), S.removeClass("scroll-active"), z.css(g, ""))
				}
			}
		}, this.disable = function () {
			I[_] = 0, M[f] = 0, C = !0, k = !1, S.hide(), this.$element.addClass("scroll-disabled"), S.removeClass("scroll-active"), z.css(g, "")
		}, this.enable = function () {
			C = !1, this.$element.removeClass("scroll-disabled")
		}, this.destroy = function () {
			k = !1, C = !1, x = !1, this.$element.removeClass("ibps-scroll scroll-disabled scroll-active"), this.$element.off(".ibps_scroll"), X || (y || z.find("> div").children().unwrap(), z.children().unwrap(), z.remove()), S.remove(), L !== !1 && (this.element.style.position = L), null != te && (clearTimeout(te), te = null)
		}, this.modify = function (s) {
			s && (b = e.extend({}, b, s)), this.destroy(), this.create(), ee = !0, this.reset(!0)
		}, this.update = function (i) {
			i && (b = e.extend({}, b, i)), this.size = i.size || this.size, this.lock = i.mouseWheelLock || this.lock, this.lock_anyway = i.lockAnyway || this.lock_anyway, i.styleClass != s && (Q && S.removeClass(Q), Q = i.styleClass, Q && S.addClass(Q), O = !!Q.match(/scroll\-left|scroll\-top/))
		}, this.start = function () {
			I[_] = 0
		}, this.end = function () {
			I[_] = I[w]
		}, this.hide = function () {
			S.hide()
		}, this.show = function () {
			S.show()
		}, this.update_scroll = function () {
			A = !1, M[f] = j + "px", I[_] = parseInt(Math.round(j / W))
		}
		var se = -1,
			ie = -1,
			te = null,
			ne = 0
		return this.track_size = function () {
			return 0 == N && c(), N
		}, this.create(), ee = !0, this.reset(!0), K = I[w], this
	}
	e.fn.ibps_scroll = function (t, n) {
		var r, a = this.each(function () {
			var s = e(this),
				a = s.data("ibps_scroll"),
				o = "object" == typeof t && t
			a || s.data("ibps_scroll", a = new i(this, o)), "string" == typeof t && (r = a[t](n))
		})
		return r === s ? a : r
	}, e.fn.ibps_scroll.defaults = {
		size: 200,
		horizontal: !1,
		mouseWheel: !0,
		mouseWheelLock: !1,
		lockAnyway: !1,
		styleClass: !1,
		observeContent: !1,
		hideOnIdle: !1,
		hideDelay: 1500,
		hoverReset: !0,
		reset: !1,
		dragEvent: !1,
		touchDrag: !0,
		touchSwipe: !1,
		scrollEvent: !1,
		detached: !1,
		updatePos: !0
	}
}(window.jQuery), function (e, s) {
	var i = function (s, i) {
		var t = ibps.helper.getAttrSettings(s, e.fn.ibps_colorpicker.defaults),
			n = e.extend({}, e.fn.ibps_colorpicker.defaults, i, t),
			r = e(s),
			a = "",
			o = "",
			l = null,
			d = []
		r.addClass("hide").find("option").each(function () {
			var e = "colorpick-btn",
				s = this.value.replace(/[^\w\s,#\(\)\.]/g, "")
			this.value != s && (this.value = s), this.selected && (e += " selected", o = s), d.push(s), a += '<li><a class="' + e + '" href="#" style="background-color:' + s + ';" data-color="' + s + '"></a></li>'
		}).end().on("change.color", function () {
			r.next().find(".btn-colorpicker").css("background-color", this.value)
		}).after('<div class="dropdown dropdown-colorpicker">		<a data-toggle="dropdown" class="dropdown-toggle" ' + (n.auto_pos ? 'data-position="auto"' : "") + ' href="#"><span class="btn-colorpicker" style="background-color:' + o + '"></span></a><ul class="dropdown-menu' + (n.caret ? " dropdown-caret" : "") + (n.pull_right ? " dropdown-menu-right" : "") + '">' + a + "</ul></div>")
		var c = r.next().find(".dropdown-menu")
		c.on(ibps.click_event, function (s) {
			var i = e(s.target)
			if (!i.is(".colorpick-btn")) return !1
			l && l.removeClass("selected"), l = i, l.addClass("selected")
			var t = l.data("color")
			return r.val(t).trigger("change"), s.preventDefault(), !0
		}), l = r.next().find("a.selected"), this.pick = function (i, t) {
			if ("number" == typeof i) {
				if (i >= d.length) return
				s.selectedIndex = i, c.find("a:eq(" + i + ")").trigger(ibps.click_event)
			} else if ("string" == typeof i) {
				var n = i.replace(/[^\w\s,#\(\)\.]/g, "")
				if (i = d.indexOf(n), -1 == i && t === !0 && (d.push(n), e("<option />").appendTo(r).val(n), e('<li><a class="colorpick-btn" href="#"></a></li>').appendTo(c).find("a").css("background-color", n).data("color", n), i = d.length - 1), -1 == i) return
				c.find("a:eq(" + i + ")").trigger(ibps.click_event)
			}
		}, this.destroy = function () {
			r.removeClass("hide").off("change.color").next().remove(), d = []
		}
	}
	e.fn.ibps_colorpicker = function (t, n) {
		var r, a = this.each(function () {
			var s = e(this),
				a = s.data("ibps_colorpicker"),
				o = "object" == typeof t && t
			a || s.data("ibps_colorpicker", a = new i(this, o)), "string" == typeof t && (r = a[t](n))
		})
		return r === s ? a : r
	}, e.fn.ibps_colorpicker.defaults = {
		pull_right: !1,
		caret: !0,
		auto_pos: !0
	}
}(window.jQuery), function (e, s) {
	function i(i, n) {
		var r = this,
			a = e(i),
			o = "right",
			l = !1,
			d = a.hasClass("fade"),
			c = ibps.helper.getAttrSettings(i, e.fn.ibps_aside.defaults)
		if (this.settings = e.extend({}, e.fn.ibps_aside.defaults, n, c), !this.settings.background || n.scroll_style || c.scroll_style || (this.settings.scroll_style = "scroll-white no-track"), this.container = this.settings.container, this.container) try {
			e(this.container).get(0) == document.body && (this.container = null)
		} catch (p) {}
		this.container && (this.settings.backdrop = !1, a.addClass("aside-contained"))
		var h = a.find(".modal-dialog"),
			u = a.find(".modal-content"),
			b = 300
		this.initiate = function () {
			i.className = i.className.replace(/(\s|^)aside\-(right|top|left|bottom)(\s|$)/gi, "$1$3"), o = this.settings.placement, o && (o = e.trim(o.toLowerCase())), o && /right|top|left|bottom/.test(o) || (o = "right"), a.attr("data-placement", o), a.addClass("aside-" + o), /right|left/.test(o) ? (l = !0, a.addClass("aside-vc")) : a.addClass("aside-hz"), this.settings.fixed && a.addClass("aside-fixed"), this.settings.background && a.addClass("aside-dark"), this.settings.offset && a.addClass("navbar-offset"), this.settings.transition || a.addClass("transition-off"), a.addClass("aside-hidden"), this.insideContainer(), h = a.find(".modal-dialog"), u = a.find(".modal-content"), this.settings.body_scroll || a.on("mousewheel.aside DOMMouseScroll.aside touchmove.aside pointermove.aside", function (i) {
				return e.contains(u[0], i.target) ? s : (i.preventDefault(), !1)
			}), 0 == this.settings.backdrop && a.addClass("no-backdrop")
		}, this.show = function () {
			if (0 == this.settings.backdrop) try {
				a.data("bs.modal").$backdrop.remove()
			} catch (s) {}
			this.container ? e(this.container).addClass("overflow-hidden") : a.css("position", "fixed"), a.removeClass("aside-hidden")
		}, this.hide = function () {
			this.container && (this.container.addClass("overflow-hidden"), ibps.vars.firefox && i.offsetHeight), f(), ibps.vars.transition && !d && a.one("bsTransitionEnd", function () {
				a.addClass("aside-hidden"), a.css("position", ""), r.container && r.container.removeClass("overflow-hidden")
			}).emulateTransitionEnd(b)
		}, this.shown = function () {
			if (f(), e("body").removeClass("modal-open").css("padding-right", ""), "invisible" == this.settings.backdrop) try {
				a.data("bs.modal").$backdrop.css("opacity", 0)
			} catch (s) {}
			var i = l ? u.height() : h.height()
			ibps.vars.touch ? u.addClass("overflow-scroll").css("max-height", i + "px") : u.hasClass("ibps-scroll") || u.ibps_scroll({
				size: i,
				reset: !0,
				mouseWheelLock: !0,
				lockAnyway: !this.settings.body_scroll,
				styleClass: this.settings.scroll_style,
				observeContent: !0,
				hideOnIdle: !ibps.vars.old_ie,
				hideDelay: 1500
			}), t.off("resize.modal.aside").on("resize.modal.aside", function () {
				if (ibps.vars.touch) u.css("max-height", (l ? u.height() : h.height()) + "px")
				else {
					u.ibps_scroll("disable")
					var e = l ? u.height() : h.height()
					u.ibps_scroll("update", {
						size: e
					}).ibps_scroll("enable").ibps_scroll("reset")
				}
			}).triggerHandler("resize.modal.aside"), r.container && ibps.vars.transition && !d && a.one("bsTransitionEnd", function () {
				r.container.removeClass("overflow-hidden")
			}).emulateTransitionEnd(b)
		}, this.hidden = function () {
			t.off(".aside"), (!ibps.vars.transition || d) && (a.addClass("aside-hidden"), a.css("position", ""))
		}, this.insideContainer = function () {
			var s = e(".main-container"),
				i = a.find(".modal-dialog")
			if (i.css({
				right: "",
				left: ""
			}), s.hasClass("container")) {
				var n = !1
				1 == l && (i.css(o, parseInt((t.width() - s.width()) / 2)), n = !0), n && ibps.vars.firefox && ibps.helper.redraw(s[0])
			}
		}, this.flip = function () {
			var e = {
				right: "left",
				left: "right",
				top: "bottom",
				bottom: "top"
			}
			a.removeClass("aside-" + o).addClass("aside-" + e[o]), o = e[o]
		}
		var f = function () {
			var e = a.find(".aside-trigger")
			if (0 != e.length) {
				e.toggleClass("open")
				var s = e.find(ibps.vars[".icon"])
				0 != s.length && s.toggleClass(s.attr("data-icon1") + " " + s.attr("data-icon2"))
			}
		}
		this.initiate(), this.container && (this.container = e(this.container)), a.appendTo(this.container || "body")
	}
	var t = e(window)
	e(document).on("show.bs.modal", ".modal.aside", function (s) {
		e(".aside.in").modal("hide"), e(this).ibps_aside("show")
	}).on("hide.bs.modal", ".modal.aside", function (s) {
		e(this).ibps_aside("hide")
	}).on("shown.bs.modal", ".modal.aside", function (s) {
		e(this).ibps_aside("shown")
	}).on("hidden.bs.modal", ".modal.aside", function (s) {
		e(this).ibps_aside("hidden")
	}), e(window).on("resize.aside_container", function () {
		e(".modal.aside").ibps_aside("insideContainer")
	}), e(document).on("settings.ibps.aside", function (s, i) {
		"main_container_fixed" == i && e(".modal.aside").ibps_aside("insideContainer")
	}), e.fn.ibpsAside = e.fn.ibps_aside = function (t, n) {
		var r, a = this.each(function () {
			var s = e(this),
				a = s.data("ibps_aside"),
				o = "object" == typeof t && t
			a || s.data("ibps_aside", a = new i(this, o)), "string" == typeof t && "function" == typeof a[t] && (r = n instanceof Array ? a[t].apply(a, n) : a[t](n))
		})
		return r === s ? a : r
	}, e.fn.ibps_aside.defaults = {
		fixed: !1,
		background: !1,
		offset: !1,
		body_scroll: !1,
		transition: !0,
		scroll_style: "scroll-dark no-track",
		container: null,
		backdrop: !1,
		placement: "right"
	}
}(window.jQuery), "undefined" == typeof jQuery) throw Error("Ibps's JavaScript requires jQuery")! function (e) {
	"ibps" in window || (window.ibps = {}), "helper" in window.ibps || (window.ibps.helper = {}), "vars" in window.ibps || (window.ibps.vars = {}), window.ibps.vars.icon = " ibps-icon ", window.ibps.vars[".icon"] = ".ibps-icon", ibps.vars.touch = "ontouchstart" in window
	var s = navigator.userAgent
	ibps.vars.webkit = !!s.match(/AppleWebKit/i), ibps.vars.safari = !!s.match(/Safari/i) && !s.match(/Chrome/i), ibps.vars.android = ibps.vars.safari && !!s.match(/Android/i), ibps.vars.ios_safari = !!s.match(/OS ([4-9])(_\d)+ like Mac OS X/i) && !s.match(/CriOS/i), ibps.vars.ie = window.navigator.msPointerEnabled || document.all && document.querySelector, ibps.vars.old_ie = document.all && !document.addEventListener, ibps.vars.very_old_ie = document.all && !document.querySelector, ibps.vars.firefox = "MozAppearance" in document.documentElement.style, ibps.vars.non_auto_fixed = ibps.vars.android || ibps.vars.ios_safari
}(),
	function (e, s) {
		ibps.click_event = ibps.vars.touch && e.fn.tap ? "tap" : "click"
	}(jQuery), jQuery(function (e) {
	function s() {
		ibps.vars.non_auto_fixed && e("body").addClass("mob-safari"), ibps.vars.transition = !!e.support.transition.end
	}

	function i() {
		var s = e(".sidebar")
		e.fn.ibps_sidebar && s.ibps_sidebar(), e.fn.ibps_sidebar_scroll && s.ibps_sidebar_scroll({
			include_toggle: ibps.vars.safari || ibps.vars.ios_safari
		}), e.fn.ibps_sidebar_hover && s.ibps_sidebar_hover({
			sub_hover_delay: 750,
			sub_scroll_style: "no-track scroll-thin scroll-margin scroll-visible"
		})
	}

	function t() {
		var s = !!e.fn.ibps_scroll
		s && e(".dropdown-content").ibps_scroll({
			reset: !1,
			mouseWheelLock: !0
		}), s && !ibps.vars.old_ie && (e(window).on("resize.reset_scroll", function () {
			e(".ibps-scroll:not(.scroll-disabled)").not(":hidden").ibps_scroll("reset")
		}), s && e(document).on("settings.ibps.reset_scroll", function (s, i) {
			"sidebar_collapsed" == i && e(".ibps-scroll:not(.scroll-disabled)").not(":hidden").ibps_scroll("reset")
		}))
	}

	function n() {
		e(document).on("click.dropdown.pos", '.dropdown-toggle[data-position="auto"]', function () {
			var s = e(this).offset(),
				i = e(this.parentNode)
			parseInt(s.top + e(this).height()) + 50 > ibps.helper.scrollTop() + ibps.helper.winHeight() - i.find(".dropdown-menu").eq(0).height() ? i.addClass("dropup") : i.removeClass("dropup")
		})
	}

	function r() {
		e('.ibps-nav [class*="icon-animated-"]').closest("a").one("click", function () {
			var s = e(this).find('[class*="icon-animated-"]').eq(0),
				i = s.attr("class").match(/icon\-animated\-([\d\w]+)/)
			s.removeClass(i[0])
		}), e(document).on("click", ".dropdown-navbar .nav-tabs", function (s) {
			s.stopPropagation()
			var i
			s.target;
			(i = e(s.target).closest("[data-toggle=tab]")) && i.length > 0 && (i.tab("show"), s.preventDefault(), e(window).triggerHandler("resize.navbar.dropdown"))
		})
	}

	function a() {
		e(".sidebar .nav-list .badge[title],.sidebar .nav-list .badge[title]").each(function () {
			var s = e(this).attr("class").match(/tooltip\-(?:\w+)/)
			s = s ? s[0] : "tooltip-error", e(this).tooltip({
				placement: function (s, i) {
					var t = e(i).offset()
					return parseInt(t.left) < parseInt(document.body.scrollWidth / 2) ? "right" : "left"
				}, container: "body",
				template: '<div class="tooltip ' + s + '"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
			})
		})
	}

	function o() {
		var s = e(".btn-scroll-up")
		if (s.length > 0) {
			var i = !1
			e(window).on("scroll.scroll_btn", function () {
				var e = ibps.helper.scrollTop(),
					t = ibps.helper.winHeight(),
					n = document.body.scrollHeight
				e > parseInt(t / 4) || e > 0 && n >= t && t + e >= n - 1 ? i || (s.addClass("display"), i = !0) : i && (s.removeClass("display"), i = !1)
			}).triggerHandler("scroll.scroll_btn"), s.on(ibps.click_event, function () {
				var s = Math.min(500, Math.max(100, parseInt(ibps.helper.scrollTop() / 3)))
				return e("html,body").animate({
					scrollTop: 0
				}, s), !1
			})
		}
	}

	function l() {
		if (ibps.vars.webkit) {
			var s = e(".ibps-nav").get(0)
			s && e(window).on("resize.webkit_fix", function () {
				ibps.helper.redraw(s)
			})
		}
		ibps.vars.ios_safari && e(document).on("ibps.settings.ios_fix", function (s, i, t) {
			"navbar_fixed" == i && (e(document).off("focus.ios_fix blur.ios_fix", "input,textarea,.wysiwyg-editor"), 1 == t && e(document).on("focus.ios_fix", "input,textarea,.wysiwyg-editor", function () {
				e(window).on("scroll.ios_fix", function () {
					var s = e("#navbar").get(0)
					s && ibps.helper.redraw(s)
				})
			}).on("blur.ios_fix", "input,textarea,.wysiwyg-editor", function () {
				e(window).off("scroll.ios_fix")
			}))
		}).triggerHandler("ibps.settings.ios_fix", ["navbar_fixed", "fixed" == e("#navbar").css("position")])
	}

	function d() {
		e(document).on("hide.bs.collapse show.bs.collapse", function (s) {
			var i = s.target.getAttribute("id"),
				t = e('a[href*="#' + i + '"]')
			0 == t.length && (t = e('a[data-target*="#' + i + '"]')), 0 != t.length && t.find(ibps.vars[".icon"]).each(function () {
				var i, t = e(this),
					n = null,
					r = null
				return (n = t.attr("data-icon-show")) ? r = t.attr("data-icon-hide") : (i = t.attr("class").match(/fa\-(.*)\-(up|down)/)) && (n = "fa-" + i[1] + "-down", r = "fa-" + i[1] + "-up"), n ? ("show" == s.type ? t.removeClass(n).addClass(r) : t.removeClass(r).addClass(n), !1) : void 0
			})
		})
	}

	function c() {
		function s() {
			var s = e(this).find("> .dropdown-menu")
			if ("fixed" == s.css("position")) {
				var t = parseInt(e(window).width()),
					n = t > 320 ? 60 : t > 240 ? 40 : 30,
					r = parseInt(t) - n,
					a = parseInt(e(window).height()) - 30,
					o = parseInt(Math.min(r, 320))
				s.css("width", o)
				var l = !1,
					d = 0,
					c = s.find(".tab-pane.active .dropdown-content.ibps-scroll")
				0 == c.length ? c = s.find(".dropdown-content.ibps-scroll") : l = !0
				var p = c.closest(".dropdown-menu"),
					h = s[0].scrollHeight
				if (1 == c.length) {
					var u = c.find(".scroll-content")[0]
					u && (h = u.scrollHeight), d += p.find(".dropdown-header").outerHeight(), d += p.find(".dropdown-footer").outerHeight()
					var b = p.closest(".tab-content")
					0 != b.length && (d += b.siblings(".nav-tabs").eq(0).height())
				}
				var f = parseInt(Math.min(a, 480, h + d)),
					v = parseInt(Math.abs((r + n - o) / 2)),
					g = parseInt(Math.abs((a + 30 - f) / 2)),
					m = parseInt(s.css("z-index")) || 0
				if (s.css({
					height: f,
					left: v,
					right: "auto",
					top: g - (l ? 3 : 1)
				}), 1 == c.length && (ibps.vars.touch ? c.ibps_scroll("disable").css("max-height", f - d).addClass("overflow-scroll") : c.ibps_scroll("update", {
					size: f - d
				}).ibps_scroll("enable").ibps_scroll("reset")), s.css("height", f + (l ? 7 : 2)), s.hasClass("user-menu")) {
					s.css("height", "")
					var _ = e(this).find(".user-info")
					1 == _.length && "fixed" == _.css("position") ? _.css({
						left: v,
						right: "auto",
						top: g,
						width: o - 2,
						"max-width": o - 2,
						"z-index": m + 1
					}) : _.css({
						left: "",
						right: "",
						top: "",
						width: "",
						"max-width": "",
						"z-index": ""
					})
				}
				e(this).closest(".navbar.navbar-fixed-top").css("z-index", m)
			} else 0 != s.length && i.call(this, s)
			var w = this
			e(window).off("resize.navbar.dropdown").one("resize.navbar.dropdown", function () {
				e(w).triggerHandler("shown.bs.dropdown.navbar")
			})
		}

		function i(s) {
			if (s = s || e(this).find("> .dropdown-menu"), s.length > 0 && (s.css({
				width: "",
				height: "",
				left: "",
				right: "",
				top: ""
			}).find(".dropdown-content").each(function () {
				ibps.vars.touch && e(this).css("max-height", "").removeClass("overflow-scroll")
				var s = parseInt(e(this).attr("data-size") || 0) || e.fn.ibps_scroll.defaults.size
				e(this).ibps_scroll("update", {
					size: s
				}).ibps_scroll("enable").ibps_scroll("reset")
			}), s.hasClass("user-menu"))) {
				e(this).find(".user-info").css({
					left: "",
					right: "",
					top: "",
					width: "",
					"max-width": "",
					"z-index": ""
				})
			}
			e(this).closest(".navbar").css("z-index", "")
		}
		ibps.vars.old_ie || e(".ibps-nav > li").on("shown.bs.dropdown.navbar", function (e) {
			s.call(this)
		}).on("hidden.bs.dropdown.navbar", function (s) {
			e(window).off("resize.navbar.dropdown"), i.call(this)
		})
	}
	s(), i(), t(), n(), r(), a(), o(), l(), d(), c()
}),
	function (e, s) {
		e.unCamelCase = function (e) {
			return e.replace(/([a-z])([A-Z])/g, function (e, s, i) {
				return s + "-" + i.toLowerCase()
			})
		}, e.strToVal = function (e) {
			var s = e.match(/^(?:(true)|(false)|(null)|(\-?[\d]+(?:\.[\d]+)?)|(\[.*\]|\{.*\}))$/i),
				i = e
			if (s)
				if (s[1]) i = !0
				else if (s[2]) i = !1
				else if (s[3]) i = null
				else if (s[4]) i = parseFloat(e)
				else if (s[5]) try {
					i = JSON.parse(e)
				} catch (t) {}
			return i
		}, e.getAttrSettings = function (s, i, t) {
			var n = i instanceof Array ? 1 : 2,
				t = t ? t.replace(/([^\-])$/, "$1-") : ""
			t = "data-" + t
			var r = {}
			for (var a in i)
				if (i.hasOwnProperty(a)) {
					var o, l = 1 == n ? i[a] : a,
						d = e.unCamelCase(l.replace(/[^A-Za-z0-9]{1,}/g, "-")).toLowerCase()
					if (!(o = s.getAttribute(t + d))) continue
					r[l] = e.strToVal(o)
				}
			return r
		}, e.scrollTop = function () {
			return document.scrollTop || document.documentElement.scrollTop || document.body.scrollTop
		}, e.winHeight = function () {
			return window.innerHeight || document.documentElement.clientHeight
		}, e.redraw = function (e, s) {
			var i = e.style.display
			e.style.display = "none", e.offsetHeight, s !== !0 ? e.style.display = i : setTimeout(function () {
				e.style.display = i
			}, 10)
		}
	}(ibps.helper),
	function (e, s) {
		if (ibps.vars.touch) {
			var i = "touchstart MSPointerDown pointerdown",
				t = "touchend touchcancel MSPointerUp MSPointerCancel pointerup pointercancel",
				n = "touchmove MSPointerMove MSPointerHover pointermove"
			e.event.special.ibps_drag = {
				setup: function () {
					var r = 0,
						a = e(this)
					a.on(i, function (i) {
						function o(e) {
							if (c) {
								var s = e.originalEvent.touches ? e.originalEvent.touches[0] : e
								if (l = {
									coords: [s.pageX, s.pageY]
								}, c && l && (h = 0, u = 0, p = Math.abs(u = c.coords[1] - l.coords[1]) > r && Math.abs(h = c.coords[0] - l.coords[0]) <= Math.abs(u) ? u > 0 ? "up" : "down" : Math.abs(h = c.coords[0] - l.coords[0]) > r && Math.abs(u) <= Math.abs(h) ? h > 0 ? "left" : "right" : !1, p !== !1)) {
									var i = {
										cancel: !1
									}
									c.origin.trigger({
										type: "ibps_drag",
										direction: p,
										dx: h,
										dy: u,
										retval: i
									}), 0 == i.cancel && e.preventDefault()
								}
								c.coords[0] = l.coords[0], c.coords[1] = l.coords[1]
							}
						}
						var l, d = i.originalEvent.touches ? i.originalEvent.touches[0] : i,
							c = {
								coords: [d.pageX, d.pageY],
								origin: e(i.target)
							},
							p = !1,
							h = 0,
							u = 0
						a.on(n, o).one(t, function (e) {
							a.off(n, o), c = l = s
						})
					})
				}
			}
		}
	}(window.jQuery),
	function (e, s) {
		function i(i, n) {
			function r() {
				this.mobile_view = this.mobile_style < 4 && this.is_mobile_view(), this.collapsible = !this.mobile_view && this.is_collapsible(), this.minimized = !this.collapsible && this.$sidebar.hasClass(p) || 3 == this.mobile_style && this.mobile_view && this.$sidebar.hasClass(h), this.horizontal = !(this.mobile_view || this.collapsible) && this.$sidebar.hasClass(u)
			}
			var a = this
			this.$sidebar = e(i), this.$sidebar.attr("data-sidebar", "true"), this.$sidebar.attr("id") || this.$sidebar.attr("id", "id-sidebar-" + ++t)
			var o = ibps.helper.getAttrSettings(i, e.fn.ibps_sidebar.defaults, "sidebar-")
			this.settings = e.extend({}, e.fn.ibps_sidebar.defaults, n, o), this.minimized = !1, this.collapsible = !1, this.horizontal = !1, this.mobile_view = !1, this.vars = function () {
				return {
					minimized: this.minimized,
					collapsible: this.collapsible,
					horizontal: this.horizontal,
					mobile_view: this.mobile_view
				}
			}, this.get = function (e) {
				return this.hasOwnProperty(e) ? this[e] : s
			}, this.set = function (e, s) {
				this.hasOwnProperty(e) && (this[e] = s)
			}, this.ref = function () {
				return this
			}
			var l = function (i) {
					var t, n, r = e(this).find(ibps.vars[".icon"])
					r.length > 0 && (t = r.attr("data-icon1"), n = r.attr("data-icon2"), i !== s ? i ? r.removeClass(t).addClass(n) : r.removeClass(n).addClass(t) : r.toggleClass(t).toggleClass(n))
				},
				d = function () {
					var s = a.$sidebar.find(".sidebar-collapse")
					return 0 == s.length && (s = e('.sidebar-collapse[data-target="#' + (a.$sidebar.attr("id") || "") + '"]')), s = 0 != s.length ? s[0] : null
				}
			this.toggleMenu = function (e, s) {
				if (!this.collapsible) {
					this.minimized = !this.minimized
					try {
						ibps.settings.sidebar_collapsed(i, this.minimized, !(e === !1 || s === !1))
					} catch (t) {
						this.minimized ? this.$sidebar.addClass("menu-min") : this.$sidebar.removeClass("menu-min")
					}
					e || (e = d()), e && l.call(e, this.minimized), ibps.vars.old_ie && ibps.helper.redraw(i)
				}
			}, this.collapse = function (e, s) {
				this.collapsible || (this.minimized = !1, this.toggleMenu(e, s))
			}, this.expand = function (e, s) {
				this.collapsible || (this.minimized = !0, this.toggleMenu(e, s))
			}, this.toggleResponsive = function (s) {
				if (this.mobile_view && 3 == this.mobile_style) {
					if (this.$sidebar.hasClass("menu-min")) {
						this.$sidebar.removeClass("menu-min")
						var i = d()
						i && l.call(i)
					}
					if (this.minimized = !this.$sidebar.hasClass("responsive-min"), this.$sidebar.toggleClass("responsive-min responsive-max"), s || (s = this.$sidebar.find(".sidebar-expand"), 0 == s.length && (s = e('.sidebar-expand[data-target="#' + (this.$sidebar.attr("id") || "") + '"]')), s = 0 != s.length ? s[0] : null), s) {
						var t, n, r = e(s).find(ibps.vars[".icon"])
						r.length > 0 && (t = r.attr("data-icon1"), n = r.attr("data-icon2"), r.toggleClass(t).toggleClass(n))
					}
					e(document).triggerHandler("settings.ibps", ["sidebar_collapsed", this.minimized])
				}
			}, this.is_collapsible = function () {
				var s
				return this.$sidebar.hasClass("navbar-collapse") && null != (s = e('.navbar-toggle[data-target="#' + (this.$sidebar.attr("id") || "") + '"]').get(0)) && s.scrollHeight > 0
			}, this.is_mobile_view = function () {
				var s
				return null != (s = e('.menu-toggler[data-target="#' + (this.$sidebar.attr("id") || "") + '"]').get(0)) && s.scrollHeight > 0
			}, this.$sidebar.on(ibps.click_event + ".ibps.submenu", ".nav-list", function (s) {
				var i = this,
					t = e(s.target).closest("a")
				if (t && 0 != t.length) {
					var n = a.minimized && !a.collapsible
					if (t.hasClass("dropdown-toggle")) {
						s.preventDefault()
						var r = t.siblings(".submenu").get(0)
						if (!r) return !1
						var o = e(r),
							l = 0,
							d = r.parentNode.parentNode
						if (n && d == i || o.parent().hasClass("hover") && "absolute" == o.css("position") && !a.collapsible) return !1
						var c = 0 == r.scrollHeight
						return c && e(d).find("> .open > .submenu").each(function () {
							this == r || e(this.parentNode).hasClass("active") || (l -= this.scrollHeight, a.hide(this, a.settings.duration, !1))
						}), c ? (a.show(r, a.settings.duration), 0 != l && (l += r.scrollHeight)) : (a.hide(r, a.settings.duration), l -= r.scrollHeight), 0 != l && ("true" != a.$sidebar.attr("data-sidebar-scroll") || a.minimized || a.$sidebar.ibps_sidebar_scroll("prehide", l)), !1
					}
					if ("tap" == ibps.click_event && n && t.get(0).parentNode.parentNode == i) {
						var p = t.find(".menu-text").get(0)
						if (null != p && s.target != p && !e.contains(p, s.target)) return s.preventDefault(), !1
					}
					if (ibps.vars.ios_safari && "false" !== t.attr("data-link")) return document.location = t.attr("href"), s.preventDefault(), !1
				}
			})
			var c = !1
			this.show = function (s, i, t) {
				if (t = t !== !1, t && c) return !1
				var n, r = e(s)
				if (r.trigger(n = e.Event("show.ibps.submenu")), n.isDefaultPrevented()) return !1
				t && (c = !0), i = i || this.settings.duration, r.css({
					height: 0,
					overflow: "hidden",
					display: "block"
				}).removeClass("nav-hide").addClass("nav-show").parent().addClass("open"), s.scrollTop = 0, i > 0 && r.css({
					height: s.scrollHeight,
					"transition-property": "height",
					"transition-duration": i / 1e3 + "s"
				})
				var a = function (s, i) {
					s && s.stopPropagation(), r.css({
						"transition-property": "",
						"transition-duration": "",
						overflow: "",
						height: ""
					}), i !== !1 && r.trigger(e.Event("shown.ibps.submenu")), t && (c = !1)
				}
				return i > 0 && e.support.transition.end ? r.one(e.support.transition.end, a) : a(), ibps.vars.android && setTimeout(function () {
					a(null, !1), ibps.helper.redraw(s)
				}, i + 20), !0
			}, this.hide = function (s, i, t) {
				if (t = t !== !1, t && c) return !1
				var n, r = e(s)
				if (r.trigger(n = e.Event("hide.ibps.submenu")), n.isDefaultPrevented()) return !1
				t && (c = !0), i = i || this.settings.duration, r.css({
					height: s.scrollHeight,
					overflow: "hidden",
					display: "block"
				}).parent().removeClass("open"), s.offsetHeight, i > 0 && r.css({
					height: 0,
					"transition-property": "height",
					"transition-duration": i / 1e3 + "s"
				})
				var a = function (s, i) {
					s && s.stopPropagation(), r.css({
						display: "none",
						overflow: "",
						height: "",
						"transition-property": "",
						"transition-duration": ""
					}).removeClass("nav-show").addClass("nav-hide"), i !== !1 && r.trigger(e.Event("hidden.ibps.submenu")), t && (c = !1)
				}
				return i > 0 && e.support.transition.end ? r.one(e.support.transition.end, a) : a(), ibps.vars.android && setTimeout(function () {
					a(null, !1), ibps.helper.redraw(s)
				}, i + 20), !0
			}, this.toggle = function (e, s) {
				if (s = s || a.settings.duration, 0 == e.scrollHeight) {
					if (this.show(e, s)) return 1
				} else if (this.hide(e, s)) return -1
				return 0
			}
			var p = "menu-min",
				h = "responsive-min",
				u = "h-sidebar",
				b = function () {
					this.mobile_style = 1, this.$sidebar.hasClass("responsive") && !e('.menu-toggler[data-target="#' + this.$sidebar.attr("id") + '"]').hasClass("navbar-toggle") ? this.mobile_style = 2 : this.$sidebar.hasClass(h) ? this.mobile_style = 3 : this.$sidebar.hasClass("navbar-collapse") && (this.mobile_style = 4)
				}
			b.call(a), e(window).on("resize.sidebar.vars", function () {
				r.call(a)
			}).triggerHandler("resize.sidebar.vars")
		}
		var t = 0
		e(document).on(ibps.click_event + ".ibps.menu", ".menu-toggler", function (i) {
			var t = e(this),
				n = e(t.attr("data-target"))
			if (0 != n.length) {
				i.preventDefault(), n.toggleClass("display"), t.toggleClass("display")
				var r = ibps.click_event + ".ibps.autohide",
					a = "true" === n.attr("data-auto-hide")
				return t.hasClass("display") ? (a && e(document).on(r, function (i) {
					return n.get(0) == i.target || e.contains(n.get(0), i.target) ? (i.stopPropagation(), s) : (n.removeClass("display"), t.removeClass("display"), e(document).off(r), s)
				}), "true" == n.attr("data-sidebar-scroll") && n.ibps_sidebar_scroll("reset")) : a && e(document).off(r), !1
			}
		}).on(ibps.click_event + ".ibps.menu", ".sidebar-collapse", function (s) {
			var i = e(this).attr("data-target"),
				t = null
			i && (t = e(i)), (null == t || 0 == t.length) && (t = e(this).closest(".sidebar")), 0 != t.length && (s.preventDefault(), t.ibps_sidebar("toggleMenu", this))
		}).on(ibps.click_event + ".ibps.menu", ".sidebar-expand", function (i) {
			var t = e(this).attr("data-target"),
				n = null
			if (t && (n = e(t)), (null == n || 0 == n.length) && (n = e(this).closest(".sidebar")), 0 != n.length) {
				var r = this
				i.preventDefault(), n.ibps_sidebar("toggleResponsive", this)
				var a = ibps.click_event + ".ibps.autohide"
				"true" === n.attr("data-auto-hide") && (n.hasClass("responsive-max") ? e(document).on(a, function (i) {
					return n.get(0) == i.target || e.contains(n.get(0), i.target) ? (i.stopPropagation(), s) : (n.ibps_sidebar("toggleResponsive", r), e(document).off(a), s)
				}) : e(document).off(a))
			}
		}), e.fn.ibps_sidebar = function (t, n) {
			var r, a = this.each(function () {
				var s = e(this),
					a = s.data("ibps_sidebar"),
					o = "object" == typeof t && t
				a || s.data("ibps_sidebar", a = new i(this, o)), "string" == typeof t && "function" == typeof a[t] && (r = n instanceof Array ? a[t].apply(a, n) : a[t](n))
			})
			return r === s ? a : r
		}, e.fn.ibps_sidebar.defaults = {
			duration: 300
		}
	}(window.jQuery),
	function (e, s) {
		function i(i, r) {
			var a = this,
				o = e(window),
				l = e(i),
				d = l.find(".nav-list"),
				c = l.find(".sidebar-toggle").eq(0),
				p = l.find(".sidebar-shortcuts").eq(0),
				h = d.get(0)
			if (h) {
				var u = ibps.helper.getAttrSettings(i, e.fn.ibps_sidebar_scroll.defaults)
				this.settings = e.extend({}, e.fn.ibps_sidebar_scroll.defaults, r, u)
				var b = a.settings.scroll_to_active,
					f = l.ibps_sidebar("ref")
				l.attr("data-sidebar-scroll", "true")
				var v = null,
					g = null,
					m = null,
					_ = null,
					w = null,
					y = null
				this.is_scrolling = !1
				var C = !1
				this.sidebar_fixed = n(i, "fixed")
				var k, x, z = function () {
						var e = d.parent().offset()
						return a.sidebar_fixed && (e.top -= ibps.helper.scrollTop()), o.innerHeight() - e.top
					},
					I = function () {
						return h.clientHeight
					},
					S = function (i) {
						if (!C && a.sidebar_fixed) {
							d.wrap('<div class="nav-wrap-up pos-rel" />'), d.after("<div><div></div></div>"), d.wrap('<div class="nav-wrap" />'), a.settings.include_toggle || c.css({
								"z-index": 1
							}), a.settings.include_shortcuts || p.css({
								"z-index": 99
							}), v = d.parent().next().ibps_scroll({
								size: z(),
								mouseWheelLock: !0,
								hoverReset: !1,
								dragEvent: !0,
								styleClass: a.settings.scroll_style,
								touchDrag: !1
							}).closest(".ibps-scroll").addClass("nav-scroll"), y = v.data("ibps_scroll"), g = v.find(".scroll-content").eq(0), m = g.find(" > div").eq(0), w = e(y.get_track()), _ = w.find(".scroll-bar").eq(0), a.settings.include_shortcuts && 0 != p.length && (d.parent().prepend(p).wrapInner("<div />"), d = d.parent()), a.settings.include_toggle && 0 != c.length && (d.append(c), d.closest(".nav-wrap").addClass("nav-wrap-t")), d.css({
								position: "relative"
							}), 1 == a.settings.scroll_outside && v.addClass("scrollout"), h = d.get(0), h.style.top = 0, g.on("scroll.nav", function () {
								h.style.top = -1 * this.scrollTop + "px"
							}), d.on(e.event.special.mousewheel ? "mousewheel.ibps_scroll" : "mousewheel.ibps_scroll DOMMouseScroll.ibps_scroll", function (e) {
								return a.is_scrolling && y.is_active() ? v.trigger(e) : !a.settings.lock_anyway
							}), d.on("mouseenter.ibps_scroll", function () {
								w.addClass("scroll-hover")
							}).on("mouseleave.ibps_scroll", function () {
								w.removeClass("scroll-hover")
							})
							var n = g.get(0)
							if (d.on("ibps_drag.nav", function (i) {
								if (!a.is_scrolling || !y.is_active()) return i.retval.cancel = !0, s
								if (0 != e(i.target).closest(".can-scroll").length) return i.retval.cancel = !0, s
								if ("up" == i.direction || "down" == i.direction) {
									y.move_bar(!0)
									var t = i.dy
									t = parseInt(Math.min(k, t)), Math.abs(t) > 2 && (t = 2 * t), 0 != t && (n.scrollTop = n.scrollTop + t, h.style.top = -1 * n.scrollTop + "px")
								}
							}), a.settings.smooth_scroll && d.on("touchstart.nav MSPointerDown.nav pointerdown.nav", function (e) {
								d.css("transition-property", "none"), _.css("transition-property", "none")
							}).on("touchend.nav touchcancel.nav MSPointerUp.nav MSPointerCancel.nav pointerup.nav pointercancel.nav", function (e) {
								d.css("transition-property", "top"), _.css("transition-property", "top")
							}), t && !a.settings.include_toggle) {
								var r = c.get(0)
								r && g.on("scroll.safari", function () {
									ibps.helper.redraw(r)
								})
							}
							if (C = !0, 1 == i && (a.reset(), b && a.scroll_to_active(), b = !1), "number" == typeof a.settings.smooth_scroll && a.settings.smooth_scroll > 0 && (d.css({
								"transition-property": "top",
								"transition-duration": (a.settings.smooth_scroll / 1e3).toFixed(2) + "s"
							}), _.css({
								"transition-property": "top",
								"transition-duration": (a.settings.smooth_scroll / 1500).toFixed(2) + "s"
							}), v.on("drag.start", function (e) {
								e.stopPropagation(), d.css("transition-property", "none")
							}).on("drag.end", function (e) {
								e.stopPropagation(), d.css("transition-property", "top")
							})), ibps.vars.android) {
								var o = ibps.helper.scrollTop()
								2 > o && (window.scrollTo(o, 0), setTimeout(function () {
									a.reset()
								}, 20))
								var l, u = ibps.helper.winHeight()
								e(window).on("scroll.ibps_scroll", function () {
									a.is_scrolling && y.is_active() && (l = ibps.helper.winHeight(), l != u && (u = l, a.reset()))
								})
							}
						}
					}
				this.scroll_to_active = function () {
					if (y && y.is_active()) try {
						var e, s = f.vars(),
							i = l.find(".nav-list")
						s.minimized && !s.collapsible ? e = i.find("> .active") : (e = d.find("> .active.hover"), 0 == e.length && (e = d.find(".active:not(.open)")))
						var t = e.outerHeight()
						i = i.get(0)
						for (var n = e.get(0); n != i;) t += n.offsetTop, n = n.parentNode
						var r = t - v.height()
						r > 0 && (h.style.top = -r + "px", g.scrollTop(r))
					} catch (a) {}
				}, this.reset = function (e) {
					if (e === !0 && (this.sidebar_fixed = n(i, "fixed")), !this.sidebar_fixed) return this.disable(), s
					C || S()
					var t = f.vars(),
						r = !t.collapsible && !t.horizontal && (k = z()) < (x = h.clientHeight)
					this.is_scrolling = !0, r && (m.css({
						height: x,
						width: 8
					}), v.prev().css({
						"max-height": k
					}), y.update({
						size: k
					}), y.enable(), y.reset()), r && y.is_active() ? l.addClass("sidebar-scroll") : this.is_scrolling && this.disable()
				}, this.disable = function () {
					this.is_scrolling = !1, v && (v.css({
						height: "",
						"max-height": ""
					}), m.css({
						height: "",
						width: ""
					}), v.prev().css({
						"max-height": ""
					}), y.disable()), parseInt(h.style.top) < 0 && a.settings.smooth_scroll && e.support.transition.end ? d.one(e.support.transition.end, function () {
						l.removeClass("sidebar-scroll"), d.off(".trans")
					}) : l.removeClass("sidebar-scroll"), h.style.top = 0
				}, this.prehide = function (e) {
					if (this.is_scrolling && !f.get("minimized"))
						if (I() + e < z()) this.disable()
						else if (0 > e) {
							var s = g.scrollTop() + e
							if (0 > s) return
							h.style.top = -1 * s + "px"
						}
				}, this._reset = function (e) {
					e === !0 && (this.sidebar_fixed = n(i, "fixed")), ibps.vars.webkit ? setTimeout(function () {
						a.reset()
					}, 0) : this.reset()
				}, this.set_hover = function () {
					w && w.addClass("scroll-hover")
				}, this.get = function (e) {
					return this.hasOwnProperty(e) ? this[e] : s
				}, this.set = function (e, s) {
					this.hasOwnProperty(e) && (this[e] = s)
				}, this.ref = function () {
					return this
				}, this.updateStyle = function (e) {
					null != y && y.update({
						styleClass: e
					})
				}, l.on("hidden.ibps.submenu.sidebar_scroll shown.ibps.submenu.sidebar_scroll", ".submenu", function (e) {
					e.stopPropagation(), f.get("minimized") || (a._reset(), "shown" == e.type && a.set_hover())
				}), S(!0)
			}
		}
		var t = ibps.vars.safari && navigator.userAgent.match(/version\/[1-5]/i),
			n = "getComputedStyle" in window ? function (e, s) {
				return e.offsetHeight, window.getComputedStyle(e).position == s
			} : function (s, i) {
				return s.offsetHeight, e(s).css("position") == i
			}
		e(document).on("settings.ibps.sidebar_scroll", function (s, i, t) {
			e(".sidebar[data-sidebar-scroll=true]").each(function () {
				var s = e(this),
					t = s.ibps_sidebar_scroll("ref")
				if ("sidebar_collapsed" == i && n(this, "fixed")) "true" == s.attr("data-sidebar-hover") && s.ibps_sidebar_hover("reset"), t._reset()
				else if ("sidebar_fixed" === i || "navbar_fixed" === i) {
					var r = t.get("is_scrolling"),
						a = n(this, "fixed")
					t.set("sidebar_fixed", a), a && !r ? t._reset() : a || t.disable()
				}
			})
		}), e(window).on("resize.ibps.sidebar_scroll", function () {
			e(".sidebar[data-sidebar-scroll=true]").each(function () {
				var s = e(this)
				"true" == s.attr("data-sidebar-hover") && s.ibps_sidebar_hover("reset")
				var i = e(this).ibps_sidebar_scroll("ref"),
					t = n(this, "fixed")
				i.set("sidebar_fixed", t), i._reset()
			})
		}), e.fn.ibps_sidebar_scroll || (e.fn.ibps_sidebar_scroll = function (t, n) {
			var r, a = this.each(function () {
				var s = e(this),
					a = s.data("ibps_sidebar_scroll"),
					o = "object" == typeof t && t
				a || s.data("ibps_sidebar_scroll", a = new i(this, o)), "string" == typeof t && "function" == typeof a[t] && (r = a[t](n))
			})
			return r === s ? a : r
		}, e.fn.ibps_sidebar_scroll.defaults = {
			scroll_to_active: !0,
			include_shortcuts: !0,
			include_toggle: !1,
			smooth_scroll: 150,
			scroll_outside: !1,
			scroll_style: "",
			lock_anyway: !1
		})
	}(window.jQuery),
	function (e, s) {
		function i(i, o) {
			function l(s) {
				var i = s,
					t = e(i),
					n = null,
					r = !1
				this.show = function () {
					null != n && clearTimeout(n), n = null, t.addClass("hover-show hover-shown"), r = !0
					for (var e = 0; e < a.length; e++) a[e].find(".hover-show").not(".hover-shown").each(function () {
						d(this).hide()
					})
				}, this.hide = function () {
					r = !1, t.removeClass("hover-show hover-shown hover-flip"), null != n && clearTimeout(n), n = null
					var e = t.find("> .submenu").get(0)
					e && c(e, "hide")
				}, this.hideDelay = function (e) {
					null != n && clearTimeout(n), t.removeClass("hover-shown"), n = setTimeout(function () {
						r = !1, t.removeClass("hover-show hover-flip"), n = null
						var s = t.find("> .submenu").get(0)
						s && c(s, "hide"), "function" == typeof e && e.call(this)
					}, u.settings.sub_hover_delay)
				}, this.is_visible = function () {
					return r
				}
			}

			function d(s) {
				var i = e(s).data("subHide")
				return i || e(s).data("subHide", i = new l(s)), i
			}

			function c(s, i) {
				var t = e(s).data("ibps_scroll")
				return t ? "string" == typeof i ? (t[i](), !0) : t : !1
			}

			function p(s) {
				var t = e(this),
					r = e(s)
				s.style.top = "", s.style.bottom = ""
				var a = null
				g.minimized && (a = t.find(".menu-text").get(0)) && (a.style.marginTop = "")
				var o = ibps.helper.scrollTop(),
					l = 0,
					d = o
				C && (l = i.offsetTop, d += l + 1)
				var p = t.offset()
				p.top = parseInt(p.top)
				var u, b = 0
				s.style.maxHeight = ""
				var f = s.scrollHeight,
					u = t.height()
				a && (b = u, p.top += b)
				var m = parseInt(p.top + f),
					y = 0,
					x = w.height(),
					z = parseInt(p.top - d - b),
					I = x,
					S = g.horizontal,
					T = !1
				S && this.parentNode == v && (y = 0, p.top += t.height(), T = !0), !T && (y = m - (x + o)) >= 0 && (y = z > y ? y : z, 0 == y && (y = 20), z - y > 10 && (y += parseInt(Math.min(25, z - y))), p.top + (u - b) > m - y && (y -= p.top + (u - b) - (m - y)), y > 0 && (s.style.top = -y + "px", a && (a.style.marginTop = -y + "px"))), 0 > y && (y = 0)
				var $ = y > 0 && y > u - 20
				if ($ ? t.addClass("pull_up") : t.removeClass("pull_up"), S)
					if (t.parent().parent().hasClass("hover-flip")) t.addClass("hover-flip")
					else {
						var H = r.offset(),
							M = r.width(),
							E = w.width()
						H.left + M > E && t.addClass("hover-flip")
					}
				var j = t.hasClass("hover") && !g.mobile_view
				if (!(j && r.find("> li > .submenu").length > 0)) {
					var P = I - (p.top - o) + y,
						D = y - P
					if (D > 0 && u > D && (P += parseInt(Math.max(u, u - D))), P -= 5, !(90 > P)) {
						var A = !1
						if (n) r.addClass("sub-scroll").css("max-height", P + "px")
						else {
							if (A = c(s), 0 == A) {
								r.ibps_scroll({
									observeContent: !0,
									detached: !0,
									updatePos: !1,
									reset: !0,
									mouseWheelLock: !0,
									styleClass: h.settings.sub_scroll_style
								}), A = c(s)
								var q = A.get_track()
								q && r.after(q)
							}
							A.update({
								size: P
							})
						} if (k = P, !n && A) {
							P > 14 && f - P > 4 ? (A.enable(), A.reset()) : A.disable()
							var q = A.get_track()
							if (q) {
								q.style.top = -(y - b - 1) + "px"
								var p = r.position(),
									Q = p.left
								Q += _ ? 2 : r.outerWidth() - A.track_size(), q.style.left = parseInt(Q) + "px", T && (q.style.left = parseInt(Q - 2) + "px", q.style.top = parseInt(p.top) + (a ? b - 2 : 0) + "px")
							}
						}
						ibps.vars.safari && ibps.helper.redraw(s)
					}
				}
			}
			var h = this,
				u = this,
				b = ibps.helper.getAttrSettings(i, e.fn.ibps_sidebar_hover.defaults)
			this.settings = e.extend({}, e.fn.ibps_sidebar_hover.defaults, o, b)
			var f = e(i),
				v = f.find(".nav-list").get(0)
			f.attr("data-sidebar-hover", "true"), a.push(f)
			var g = {},
				m = ibps.vars.old_ie,
				_ = !1
			t && (h.settings.sub_hover_delay = parseInt(Math.max(h.settings.sub_hover_delay, 2500)))
			var w = e(window),
				y = e(".navbar").eq(0),
				C = "fixed" == y.css("position")
			this.update_vars = function () {
				C = "fixed" == y.css("position")
			}, h.dirty = !1, this.reset = function () {
				0 != h.dirty && (h.dirty = !1, f.find(".submenu").each(function () {
					var s = e(this),
						i = s.parent()
					s.css({
						top: "",
						bottom: "",
						"max-height": ""
					}), s.hasClass("ibps-scroll") ? s.ibps_scroll("disable") : s.removeClass("sub-scroll"), r(this, "absolute") ? s.addClass("can-scroll") : s.removeClass("can-scroll"), i.removeClass("pull_up").find(".menu-text:first").css("margin-top", "")
				}), f.find(".hover-show").removeClass("hover-show hover-shown hover-flip"))
			}, this.updateStyle = function (e) {
				sub_scroll_style = e, f.find(".submenu.ibps-scroll").ibps_scroll("update", {
					styleClass: e
				})
			}, this.changeDir = function (e) {
				_ = "right" === e
			}
			var k = -1
			n || f.on("hide.ibps.submenu.sidebar_hover", ".submenu", function (s) {
				if (!(1 > k)) {
					s.stopPropagation()
					var i = e(this).closest(".ibps-scroll.can-scroll")
					0 != i.length && r(i[0], "absolute") && i[0].scrollHeight - this.scrollHeight < k && i.ibps_scroll("disable")
				}
			}), n || f.on("shown.ibps.submenu.sidebar_hover hidden.ibps.submenu.sidebar_hover", ".submenu", function (s) {
				if (!(1 > k)) {
					var i = e(this).closest(".ibps-scroll.can-scroll")
					if (0 != i.length && r(i[0], "absolute")) {
						var t = i[0].scrollHeight
						k > 14 && t - k > 4 ? i.ibps_scroll("enable").ibps_scroll("reset") : i.ibps_scroll("disable")
					}
				}
			})
			var x = t ? "mouseenter" : "touchstart"
			f.on(x, "li.hover", function (s) {
				var i = e(this),
					t = i.children(".submenu"),
					n = t.closest(".nav-show").length > 0 || t.find(".nav-show").length > 0
				if (!(t.length <= 0 || n)) {
					var r = w.innerHeight() - i.offset().top,
						a = t.outerHeight()
					a > r ? t.css("top", -(a - r + 5)) : t.css("top", "")
				}
			})
			var z = -1,
				I = t ? "touchstart.sub_hover" : "mouseenter.sub_hover",
				S = t ? "touchend.sub_hover touchcancel.sub_hover" : "mouseleave.sub_hover"
			f.on(I, ".nav-list li, .sidebar-shortcuts", function (i) {
				if (g = f.ibps_sidebar("vars"), !g.collapsible) {
					var n = e(this),
						a = !1,
						o = n.hasClass("hover"),
						l = n.find("> .submenu").get(0)
					if (!(l || this.parentNode == v || o || (a = n.hasClass("sidebar-shortcuts")))) return l && e(l).removeClass("can-scroll"), s
					var c = l,
						u = !1
					if (c || this.parentNode != v || (c = n.find("> a > .menu-text").get(0)), !c && a && (c = n.find(".sidebar-shortcuts-large").get(0)), !(c && (u = r(c, "absolute")) || o)) return l && e(l).removeClass("can-scroll"), s
					var b = d(this)
					if (l)
						if (u) {
							h.dirty = !0
							var _ = ibps.helper.scrollTop()
							if (!b.is_visible() || !t && _ != z || m)
								if (e(l).addClass("can-scroll"), m || t) {
									var w = this
									setTimeout(function () {
										p.call(w, l)
									}, 0)
								} else p.call(this, l)
							z = _
						} else e(l).removeClass("can-scroll")
					b.show()
				}
			}).on(S, ".nav-list li, .sidebar-shortcuts", function (s) {
				g = f.ibps_sidebar("vars"), g.collapsible || e(this).hasClass("hover-show") && d(this).hideDelay()
			})
		}
		if (!ibps.vars.very_old_ie) {
			var t = ibps.vars.touch,
				n = ibps.vars.old_ie || t,
				r = "getComputedStyle" in window ? function (e, s) {
					return e.offsetHeight, window.getComputedStyle(e).position == s
				} : function (s, i) {
					return s.offsetHeight, e(s).css("position") == i
				}
			e(window).on("resize.sidebar.ibps_hover", function () {
				e(".sidebar[data-sidebar-hover=true]").ibps_sidebar_hover("update_vars").ibps_sidebar_hover("reset")
			}), e(document).on("settings.ibps.ibps_hover", function (s, i, t) {
				"sidebar_collapsed" == i ? e(".sidebar[data-sidebar-hover=true]").ibps_sidebar_hover("reset") : "navbar_fixed" == i && e(".sidebar[data-sidebar-hover=true]").ibps_sidebar_hover("update_vars")
			})
			var a = []
			e.fn.ibps_sidebar_hover = function (t, n) {
				var r, a = this.each(function () {
					var s = e(this),
						a = s.data("ibps_sidebar_hover"),
						o = "object" == typeof t && t
					a || s.data("ibps_sidebar_hover", a = new i(this, o)), "string" == typeof t && "function" == typeof a[t] && (r = a[t](n))
				})
				return r === s ? a : r
			}, e.fn.ibps_sidebar_hover.defaults = {
				sub_sub_hover_delay: 750,
				sub_scroll_style: "no-track scroll-thin"
			}
		}
	}(window.jQuery),
	function (e, s) {
		e("#ibps-settings-btn").on(ibps.click_event, function (s) {
			s.preventDefault(), e(this).toggleClass("open"), e("#ibps-settings-box").toggleClass("open")
		}), e("#ibps-settings-navbar").on("click", function () {
			ibps.settings.navbar_fixed(null, this.checked)
		}).each(function () {
			this.checked = ibps.settings.is("navbar", "fixed")
		}), e("#ibps-settings-sidebar").on("click", function () {
			ibps.settings.sidebar_fixed(null, this.checked)
		}).each(function () {
			this.checked = ibps.settings.is("sidebar", "fixed")
		}), e("#ibps-settings-breadcrumbs").on("click", function () {
			ibps.settings.breadcrumbs_fixed(null, this.checked)
		}).each(function () {
			this.checked = ibps.settings.is("breadcrumbs", "fixed")
		}), e("#ibps-settings-add-container").on("click", function () {
			ibps.settings.main_container_fixed(null, this.checked)
		}).each(function () {
			this.checked = ibps.settings.is("main-container", "fixed")
		}), e("#ibps-settings-compact").on("click", function () {
			if (this.checked) {
				e("#sidebar").addClass("compact")
				var s = e("#ibps-settings-hover")
				s.length > 0 && s.removeAttr("checked").trigger("click")
			} else e("#sidebar").removeClass("compact"), e("#sidebar[data-sidebar-scroll=true]").ibps_sidebar_scroll("reset")
			ibps.vars.old_ie && ibps.helper.redraw(e("#sidebar")[0], !0)
		}), e("#ibps-settings-highlight").on("click", function () {
			this.checked ? e("#sidebar .nav-list > li").addClass("highlight") : e("#sidebar .nav-list > li").removeClass("highlight"), ibps.vars.old_ie && ibps.helper.redraw(e("#sidebar")[0])
		}), e("#ibps-settings-hover").on("click", function () {
			if (!e("#sidebar").hasClass("h-sidebar")) {
				if (this.checked) e("#sidebar li").addClass("hover").filter(".open").removeClass("open").find("> .submenu").css("display", "none")
				else {
					e("#sidebar li.hover").removeClass("hover")
					var s = e("#ibps-settings-compact")
					s.length > 0 && s.get(0).checked && s.trigger("click")
				}
				e(".sidebar[data-sidebar-hover=true]").ibps_sidebar_hover("reset"), e(".sidebar[data-sidebar-scroll=true]").ibps_sidebar_scroll("reset"), ibps.vars.old_ie && ibps.helper.redraw(e("#sidebar")[0])
			}
		})
	}(jQuery),
	function (e, s) {
		e("#ibps-settings-rtl").removeAttr("checked").on("click", function () {
			i()
		})
		var i = function () {
			function s(s) {
				function i(e, s) {
					n.find("." + e).removeClass(e).addClass("tmp-rtl-" + e).end().find("." + s).removeClass(s).addClass(e).end().find(".tmp-rtl-" + e).removeClass("tmp-rtl-" + e).addClass(s)
				}
				var t = e(document.body)
				s || t.toggleClass("rtl"), s = s || document.body
				var n = e(s)
				n.find(".dropdown-menu:not(.datepicker-dropdown,.colorpicker)").toggleClass("dropdown-menu-right").end().find(".pull-right:not(.dropdown-menu,blockquote,.profile-skills .pull-right)").removeClass("pull-right").addClass("tmp-rtl-pull-right").end().find(".pull-left:not(.dropdown-submenu,.profile-skills .pull-left)").removeClass("pull-left").addClass("pull-right").end().find(".tmp-rtl-pull-right").removeClass("tmp-rtl-pull-right").addClass("pull-left").end().find(".chosen-select").toggleClass("chosen-rtl").next().toggleClass("chosen-rtl"), i("align-left", "align-right"), i("no-padding-left", "no-padding-right"), i("arrowed", "arrowed-right"), i("arrowed-in", "arrowed-in-right"), i("tabs-left", "tabs-right"), i("messagebar-item-left", "messagebar-item-right"), e(".modal.aside-vc").ibps_aside("flip").ibps_aside("insideContainer"), n.find(".fa").each(function () {
					if (!(this.className.match(/ui-icon/) || e(this).closest(".fc-button").length > 0))
						for (var s = this.attributes.length, i = 0; s > i; i++) {
							var t = this.attributes[i].value
							t.match(/fa\-(?:[\w\-]+)\-left/) ? this.attributes[i].value = t.replace(/fa\-([\w\-]+)\-(left)/i, "fa-$1-right") : t.match(/fa\-(?:[\w\-]+)\-right/) && (this.attributes[i].value = t.replace(/fa\-([\w\-]+)\-(right)/i, "fa-$1-left"))
						}
				})
				var r = t.hasClass("rtl")
				r ? (n.find(".scroll-hz").addClass("make-ltr").find(".scroll-content").wrapInner('<div class="make-rtl" />'), e(".sidebar[data-sidebar-hover=true]").ibps_sidebar_hover("changeDir", "right")) : (n.find(".scroll-hz").removeClass("make-ltr").find(".make-rtl").children().unwrap(), e(".sidebar[data-sidebar-hover=true]").ibps_sidebar_hover("changeDir", "left")), e.fn.ibps_scroll && n.find(".scroll-hz").ibps_scroll("reset")
				try {
					var a = e("#piechart-placeholder")
					if (a.length > 0) {
						var o = t.hasClass("rtl") ? "nw" : "ne"
						a.data("draw").call(a.get(0), a, a.data("chart"), o)
					}
				} catch (l) {}
				ibps.helper.redraw(s, !0)
			}
			if (0 == e("#ibps-rtl-stylesheet").length) {
				var i = e("head").find("link.ibps-main-stylesheet")
				0 == i.length && (i = e("head").find('link[href*="/ibps.min.css"],link[href*="/ibps-part2.min.css"]'), 0 == i.length && (i = e("head").find('link[href*="/ibps.css"],link[href*="/ibps-part2.css"]')))
				var t = e("head").find("link#ibps-skins-stylesheet"),
					n = i.first().attr("href").replibps(/(\.min)?\.css$/i, "-rtl$1.css")
				e.ajax({
					url: n
				}).done(function () {
					var e = jQuery("<link />", {
						type: "text/css",
						rel: "stylesheet",
						id: "ibps-rtl-stylesheet"
					})
					t.length > 0 ? e.insertAfter(t) : i.length > 0 ? e.insertAfter(i.last()) : e.appendTo("head"), e.attr("href", n), s(), window.Pace && Pace.running && Pace.stop()
				})
			} else s()
			e(".page-content-area[data-ajax-content=true]").on("ajaxscriptsloaded.rtl", function () {
				e("body").hasClass("rtl") && s(this)
			})
		}
	}(jQuery),
	function (e, s) {
		try {
			e("#skin-colorpicker").ibps_colorpicker({
				auto_pos: !1
			})
		} catch (i) {}
		e("#skin-colorpicker").on("change", function () {
			function s(s) {
				var i = e(document.body)
				i.removeClass("no-skin skin-1 skin-2 skin-3"), i.addClass(s), ibps.data.set("skin", s)
				var t = ["red", "blue", "green", ""]
				e(".ibps-nav > li.grey").removeClass("dark"), e(".ibps-nav > li").removeClass("no-border margin-1"), e(".ibps-nav > li:not(:last-child)").removeClass("light-pink").find("> a > " + ibps.vars[".icon"]).removeClass("pink").end().eq(0).find(".badge").removeClass("badge-warning"), e(".sidebar-shortcuts .btn").removeClass("btn-pink btn-white").find(ace.vars[".icon"]).removeClass("white"), e(".ibps-nav > li.grey").removeClass("red").find(".badge").removeClass("badge-yellow"), e(".sidebar-shortcuts .btn").removeClass("btn-primary btn-white")
				var n = 0
				e(".sidebar-shortcuts .btn").each(function () {
					e(this).find(ibps.vars[".icon"]).removeClass(t[n++])
				})
				var r = ["btn-success", "btn-info", "btn-warning", "btn-danger"]
				if ("no-skin" == s) {
					var n = 0
					e(".sidebar-shortcuts .btn").each(function () {
						e(this).attr("class", "btn " + r[n++ % 4])
					}), e(".sidebar[data-sidebar-scroll=true]").ibps_sidebar_scroll("updateStyle", ""), e(".sidebar[data-sidebar-hover=true]").ibps_sidebar_hover("updateStyle", "no-track scroll-thin")
				} else if ("skin-1" == s) {
					e(".ibps-nav > li.grey").addClass("dark")
					var n = 0
					e(".sidebar-shortcuts").find(".btn").each(function () {
						e(this).attr("class", "btn " + r[n++ % 4])
					}), e(".sidebar[data-sidebar-scroll=true]").ibps_sidebar_scroll("updateStyle", "scroll-white no-track"), e(".sidebar[data-sidebar-hover=true]").ibps_sidebar_hover("updateStyle", "no-track scroll-thin scroll-white")
				} else if ("skin-2" == s) e(".ibps-nav > li").addClass("no-border margin-1"), e(".ibps-nav > li:not(:last-child)").addClass("light-pink").find("> a > " + ibps.vars[".icon"]).addClass("pink").end().eq(0).find(".badge").addClass("badge-warning"), e(".sidebar-shortcuts .btn").attr("class", "btn btn-white btn-pink").find(ibps.vars[".icon"]).addClass("white"), e(".sidebar[data-sidebar-scroll=true]").ibps_sidebar_scroll("updateStyle", "scroll-white no-track"), e(".sidebar[data-sidebar-hover=true]").ibps_sidebar_hover("updateStyle", "no-track scroll-thin scroll-white")
				else if ("skin-3" == s) {
					i.addClass("no-skin"), e(".ibps-nav > li.grey").addClass("red").find(".badge").addClass("badge-yellow")
					var n = 0
					e(".sidebar-shortcuts .btn").each(function () {
						e(this).attr("class", "btn btn-primary btn-white"), e(this).find(ibps.vars[".icon"]).addClass(t[n++])
					}), e(".sidebar[data-sidebar-scroll=true]").ibps_sidebar_scroll("updateStyle", "scroll-dark no-track"), e(".sidebar[data-sidebar-hover=true]").ibps_sidebar_hover("updateStyle", "no-track scroll-thin")
				}
				e(".sidebar[data-sidebar-scroll=true]").ibps_sidebar_scroll("reset"), ibps.vars.old_ie && ibps.helper.redraw(document.body, !0)
			}
			var i = e(this).find("option:selected").data("skin")
			if (0 == e("#ibps-skins-stylesheet").length) {
				var t = e("head").find("link.ibps-main-stylesheet")
				0 == t.length && (t = e("head").find('link[href*="/ibps.min.css"],link[href*="/ibps-part2.min.css"]'), 0 == t.length && (t = e("head").find('link[href*="/ibps.css"],link[href*="/ibps-part2.css"]')))
				var n = t.first().attr("href").replace(/(\.min)?\.css$/i, "-skins$1.css")
				e.ajax({
					url: n
				}).done(function () {
					var e = jQuery("<link />", {
						type: "text/css",
						rel: "stylesheet",
						id: "ibps-skins-stylesheet"
					})
					t.length > 0 ? e.insertAfter(t.last()) : e.appendTo("head"), e.attr("href", n), s(i), window.Pace && Pace.running && Pace.stop()
				})
			} else s(i)
		})
	}(jQuery)