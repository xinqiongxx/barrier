!
function($) {
	function writeHandler($instance, dataObj) {
		$instance.find("input,div,textarea,select").each(function(i) {
			var fieldValue, checkValueArr, j, n = $(this).attr("name"),
				trueType = $(this).attr("fillType");
			if (trueType || (trueType = $(this).attr("trueType")), n) try {
				if (fieldValue = eval("dataObj." + n.toString()), "textinput" == trueType || "autoComplete" == trueType || "date" == trueType || "keypad" == trueType || "stepper" == trueType || "password" == trueType || "hidden" == trueType) $(this).val(fieldValue), $(this).attr("fillType") && $(this).render();
				else if ("color" == trueType) $(this).val(fieldValue), $(this)[0].style.backgroundColor = "#" + fieldValue;
				else if ("radio" == trueType) $(this).val() == fieldValue && $(this).attr("checked", !0);
				else if ("checkbox" == trueType) {
					for (checkValueArr = fieldValue, "[object Array]" !== Object.prototype.toString.call(fieldValue) && (checkValueArr = fieldValue.split(",")), j = 0; j < checkValueArr.length; j++) if ($(this).val() == checkValueArr[j]) {
						$(this).attr("checked", !0);
						break
					}
				} else "textarea" == trueType ? ($(this).html(fieldValue), $(this).attr("fillType") && $(this).render()) : "select" == trueType ? ($(this).attr("selectedValue", fieldValue), $(this).render()) : "q_select" == trueType || ("selectTree" == trueType ? ($(this).attr("selectedValue", fieldValue), $(this).render()) : "suggestion" == trueType ? "remote" != $(this).attr("suggestMode") && ($(this).attr("selectedValue", fieldValue), $(this).render()) : "filter" == trueType ? ($(this).attr("selectedValue", fieldValue), $(this).render()) : "lister" == trueType ? ($(this).attr("selectedValue", fieldValue), $(this).render()) : "listerTree" == trueType ? ($(this).attr("selectedValue", fieldValue), $(this).render()) : "rating" == trueType && ($(this).attr("value", fieldValue), $(this).render()))
			} catch (e) {} else $(this).attr("fillType") && $(this).render()
		})
	}

	function timeoutHandler(a, b) {
		"true" == a.attr("finished") ? (a.attr("selectedValue", b), a.render()) : setTimeout(function() {
			timeoutHandler(a, b)
		}, 500)
	}

	function doAjaxSubmit(a) {
		var b = a.data;
		a.isDefaultPrevented() || (a.preventDefault(), $(this).ajaxSubmit(b))
	}

	function captureSubmittingElement(a) {
		var d, e, f, b = a.target,
			c = $(b);
		if (!c.is(":submit,input:image")) {
			if (d = c.closest(":submit"), 0 === d.length) return;
			b = d[0]
		}
		e = this, e.clk = b, "image" == b.type && (void 0 !== a.offsetX ? (e.clk_x = a.offsetX, e.clk_y = a.offsetY) : "function" == typeof $.fn.offset ? (f = c.offset(), e.clk_x = a.pageX - f.left, e.clk_y = a.pageY - f.top) : (e.clk_x = a.pageX - b.offsetLeft, e.clk_y = a.pageY - b.offsetTop)), setTimeout(function() {
			e.clk = e.clk_x = e.clk_y = null
		}, 100)
	}

	function log() {
		$.fn.ajaxSubmit.debug && "[jquery.form] " + Array.prototype.join.call(arguments, "")
	}
	var feature, instance;
	$.fn.ajaxWrite = function(options) {
		var dataObj, dataType, $instance = $(this);
		return options.data || options.url ? options.data && options.url ? (top.Toast("showWarningToast", uncompile(quiLanguage.form.errorMessage2)), void 0) : (options.data ? (dataObj = options.data, writeHandler($instance, dataObj)) : options.url && (dataType = "json", options.dataType && (dataType = options.dataType), $.ajax({
			type: "POST",
			url: options.url,
			data: options.params,
			dataType: dataType,
			error: function() {
				top.Toast("showWarningToast", uncompile(quiLanguage.form.errorMessage3))
			},
			success: function(data) {
				dataObj = "text" == dataType ? eval("(" + data + ")") : data, writeHandler($instance, dataObj)
			}
		})), void 0) : (top.Toast("showWarningToast", uncompile(quiLanguage.form.errorMessage1)), void 0)
	}, feature = {}, feature.fileapi = void 0 !== $("<input type='file'/>").get(0).files, feature.formdata = void 0 !== window.FormData, $.fn.ajaxSubmit = function(a) {
		function u(b) {
			var d, e, f, g, c = new FormData;
			for (d = 0; d < b.length; d++) c.append(b[d].name, b[d].value);
			if (a.extraData) for (e in a.extraData) a.extraData.hasOwnProperty(e) && c.append(e, a.extraData[e]);
			a.data = null, f = $.extend(!0, {}, $.ajaxSettings, a, {
				contentType: !1,
				processData: !1,
				cache: !1,
				type: "POST"
			}), a.uploadProgress && (f.xhr = function() {
				var b = jQuery.ajaxSettings.xhr();
				return b.upload && (b.upload.onprogress = function(b) {
					var c = 0,
						d = b.loaded || b.position,
						e = b.total;
					b.lengthComputable && (c = Math.ceil(100 * (d / e))), a.uploadProgress(b, d, e, c)
				}), b
			}), f.data = null, g = f.beforeSend, f.beforeSend = function(b, d) {
				d.data = c, g && g.call(d, b, a)
			}, $.ajax(f)
		}

		function v(c) {
			function v(a) {
				var b = a.contentWindow ? a.contentWindow.document : a.contentDocument ? a.contentDocument : a.document;
				return b
			}

			function y() {
				function f() {
					try {
						var a = v(m).readyState;
						log("state = " + a), a && "uninitialized" == a.toLowerCase() && setTimeout(f, 50)
					} catch (b) {
						log("Server abort: ", b, " (", b.name, ")"), D(u), r && clearTimeout(r), r = void 0
					}
				}
				var g, h, a = e.attr("target"),
					c = e.attr("action");
				d.setAttribute("target", k), b || d.setAttribute("method", "POST"), c != i.url && d.setAttribute("action", i.url), i.skipEncodingOverride || b && !/post/i.test(b) || e.attr({
					encoding: "multipart/form-data",
					enctype: "multipart/form-data"
				}), i.timeout && (r = setTimeout(function() {
					q = !0, D(t)
				}, i.timeout)), g = [];
				try {
					if (i.extraData) for (h in i.extraData) i.extraData.hasOwnProperty(h) && g.push($('<input type="hidden" name="' + h + '">').attr("value", i.extraData[h]).appendTo(d)[0]);
					i.iframeTarget || (l.appendTo("body"), m.attachEvent ? m.attachEvent("onload", D) : m.addEventListener("load", D, !1)), setTimeout(f, 15), d.submit()
				} finally {
					d.setAttribute("action", c), a ? d.setAttribute("target", a) : e.removeAttr("target"), $(g).remove()
				}
			}

			function D(a) {
				var d, c, e, f, g, h, k, o, p;
				if (!n.aborted && !C) {
					try {
						A = v(m)
					} catch (b) {
						log("cannot access response document: ", b), a = u
					}
					if (a === t && n) return n.abort("timeout"), void 0;
					if (a == u && n) return n.abort("server abort"), void 0;
					if (A && A.location.href != i.iframeSrc || q) {
						m.detachEvent ? m.detachEvent("onload", D) : m.removeEventListener("load", D, !1), c = "success";
						try {
							if (q) throw "timeout";
							if (e = "xml" == i.dataType || A.XMLDocument || $.isXMLDoc(A), log("isXml=" + e), !e && window.opera && (null === A.body || !A.body.innerHTML) && --B) return log("requeing onLoad callback, DOM not available"), setTimeout(D, 250), void 0;
							f = A.body ? A.body : A.documentElement, n.responseText = f ? f.innerHTML : null, n.responseXML = A.XMLDocument ? A.XMLDocument : A, e && (i.dataType = "xml"), n.getResponseHeader = function(a) {
								var b = {
									"content-type": i.dataType
								};
								return b[a]
							}, f && (n.status = Number(f.getAttribute("status")) || n.status, n.statusText = f.getAttribute("statusText") || n.statusText), g = (i.dataType || "").toLowerCase(), h = /(json|script|text)/.test(g), h || i.textarea ? (k = A.getElementsByTagName("textarea")[0], k ? (n.responseText = k.value, n.status = Number(k.getAttribute("status")) || n.status, n.statusText = k.getAttribute("statusText") || n.statusText) : h && (o = A.getElementsByTagName("pre")[0], p = A.getElementsByTagName("body")[0], o ? n.responseText = o.textContent ? o.textContent : o.innerText : p && (n.responseText = p.textContent ? p.textContent : p.innerText))) : "xml" == g && !n.responseXML && n.responseText && (n.responseXML = E(n.responseText));
							try {
								z = G(n, g, i)
							} catch (a) {
								c = "parsererror", n.error = d = a || c
							}
						} catch (a) {
							log("error caught: ", a), c = "error", n.error = d = a || c
						}
						n.aborted && (log("upload aborted"), c = null), n.status && (c = n.status >= 200 && n.status < 300 || 304 === n.status ? "success" : "error"), "success" === c ? (i.success && i.success.call(i.context, z, "success", n), j && $.event.trigger("ajaxSuccess", [n, i])) : c && (void 0 === d && (d = n.statusText), i.error && i.error.call(i.context, n, c, d), j && $.event.trigger("ajaxError", [n, i, d])), j && $.event.trigger("ajaxComplete", [n, i]), j && !--$.active && $.event.trigger("ajaxStop"), i.complete && i.complete.call(i.context, n, c), C = !0, i.timeout && clearTimeout(r), setTimeout(function() {
							i.iframeTarget || l.remove(), n.responseXML = null
						}, 100)
					}
				}
			}
			var f, g, i, j, k, l, m, n, o, p, q, r, t, u, w, x, z, A, C, B, E, F, G, d = e[0],
				s = !! $.fn.prop;
			if ($(":input[name=submit],:input[id=submit]", d).length) return top.Toast("showWarningToast", 'Error: Form elements must not have name or id of "submit".'), void 0;
			if (c) for (g = 0; g < h.length; g++) f = $(h[g]), s ? f.prop("disabled", !1) : f.removeAttr("disabled");
			return i = $.extend(!0, {}, $.ajaxSettings, a), i.context = i.context || i, k = "jqFormIO" + (new Date).getTime(), i.iframeTarget ? (l = $(i.iframeTarget), p = l.attr("name"), p ? k = p : l.attr("name", k)) : (l = $('<iframe name="' + k + '" src="' + i.iframeSrc + '" />'), l.css({
				position: "absolute",
				top: "-1000px",
				left: "-1000px"
			})), m = l[0], n = {
				aborted: 0,
				responseText: null,
				responseXML: null,
				status: 0,
				statusText: "n/a",
				getAllResponseHeaders: function() {},
				getResponseHeader: function() {},
				setRequestHeader: function() {},
				abort: function(a) {
					var b = "timeout" === a ? "timeout" : "aborted";
					log("aborting upload... " + b), this.aborted = 1, l.attr("src", i.iframeSrc), n.error = b, i.error && i.error.call(i.context, n, b, a), j && $.event.trigger("ajaxError", [n, i, b]), i.complete && i.complete.call(i.context, n, b)
				}
			}, j = i.global, j && 0 === $.active++ && $.event.trigger("ajaxStart"), j && $.event.trigger("ajaxSend", [n, i]), i.beforeSend && i.beforeSend.call(i.context, n, i) === !1 ? (i.global && $.active--, void 0) : (n.aborted || (o = d.clk, o && (p = o.name, p && !o.disabled && (i.extraData = i.extraData || {}, i.extraData[p] = o.value, "image" == o.type && (i.extraData[p + ".x"] = d.clk_x, i.extraData[p + ".y"] = d.clk_y))), t = 1, u = 2, w = $("meta[name=csrf-token]").attr("content"), x = $("meta[name=csrf-param]").attr("content"), x && w && (i.extraData = i.extraData || {}, i.extraData[x] = w), i.forceSync ? y() : setTimeout(y, 10), B = 50, E = $.parseXML ||
			function(a, b) {
				return window.ActiveXObject ? (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a)) : b = (new DOMParser).parseFromString(a, "text/xml"), b && b.documentElement && "parsererror" != b.documentElement.nodeName ? b : null
			}, F = $.parseJSON ||
			function(a) {
				return window["eval"]("(" + a + ")")
			}, G = function(a, b, c) {
				var d = a.getResponseHeader("content-type") || "",
					e = "xml" === b || !b && d.indexOf("xml") >= 0,
					f = e ? a.responseXML : a.responseText;
				return e && "parsererror" === f.documentElement.nodeName && $.error && $.error("parsererror"), c && c.dataFilter && (f = c.dataFilter(f, b)), "string" == typeof f && ("json" === b || !b && d.indexOf("json") >= 0 ? f = F(f) : ("script" === b || !b && d.indexOf("javascript") >= 0) && $.globalEval(f)), f
			}), void 0)
		}
		var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t;
		if (!this.length) return log("ajaxSubmit: skipping submit process - no element selected"), this;
		if (e = this, "function" == typeof a && (a = {
			success: a
		}), b = this.attr("method"), c = this.attr("action"), instance = this, d = "string" == typeof c ? $.trim(c) : "", d = d || window.location.href || "", d && (d = (d.match(/^([^#]+)/) || [])[1]), a = $.extend(!0, {
			url: d,
			success: $.ajaxSettings.success,
			type: b || "GET",
			iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
		}, a), f = {}, this.trigger("form-pre-serialize", [this, a, f]), f.veto) return log("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
		if (a.beforeSerialize && a.beforeSerialize(this, a) === !1) return log("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
		if (g = a.traditional, void 0 === g && (g = $.ajaxSettings.traditional), h = [], j = this.formToArray(a.semantic, h), a.data && (a.extraData = a.data, i = $.param(a.data, g)), a.beforeSubmit && a.beforeSubmit(j, this, a) === !1) return log("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
		if (this.trigger("form-submit-validate", [j, this, a, f]), f.veto) return log("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
		for (k = $.param(j, g), i && (k = k ? k + "&" + i : i), "GET" == a.type.toUpperCase() ? (a.url += (a.url.indexOf("?") >= 0 ? "&" : "?") + k, a.data = null) : a.data = k, l = [], a.resetForm && l.push(function() {
			e.resetForm()
		}), a.clearForm && l.push(function() {
			e.clearForm(a.includeHidden)
		}), !a.dataType && a.target ? (m = a.success ||
		function() {}, l.push(function(b) {
			var c = a.replaceTarget ? "replaceWith" : "html";
			$(a.target)[c](b).each(m, arguments)
		})) : a.success && l.push(a.success), a.success = function(b, c, d) {
			var g, h, f = a.context || a;
			for (g = 0, h = l.length; h > g; g++) l[g].apply(f, [b, c, d || e, e])
		}, a.complete = function(a, b) {
			try {} catch (c) {}
			if (instance.unmask(), "error" == b) try {
				top.Toast("showWarningToast", uncompile(quiLanguage.form.errorMessage4))
			} catch (c) {
				alert(uncompile(quiLanguage.form.errorMessage4))
			}
		}, n = $("input:file:enabled[value]", this), o = n.length > 0, p = "multipart/form-data", q = e.attr("enctype") == p || e.attr("encoding") == p, r = feature.fileapi && feature.formdata, log("fileAPI :" + r), s = (o || q) && !r, a.iframe !== !1 && (a.iframe || s) ? a.closeKeepAlive ? $.get(a.closeKeepAlive, function() {
			v(j)
		}) : v(j) : (o || q) && r ? u(j) : ($.ajax(a), this.mask(uncompile(quiLanguage.form.submitMessage))), t = 0; t < h.length; t++) h[t] = null;
		return this.trigger("form-submit-notify", [this, a]), this
	}, $.fn.ajaxForm = function(a) {
		if (a = a || {}, a.delegation = a.delegation && $.isFunction($.fn.on), !a.delegation && 0 === this.length) {
			var b = {
				s: this.selector,
				c: this.context
			};
			return !$.isReady && b.s ? (log("DOM not ready, queuing ajaxForm"), $(function() {
				$(b.s, b.c).ajaxForm(a)
			}), this) : (log("terminating; zero elements found by selector" + ($.isReady ? "" : " (DOM not ready)")), this)
		}
		return a.delegation ? ($(document).off("submit.form-plugin", this.selector, doAjaxSubmit).off("click.form-plugin", this.selector, captureSubmittingElement).on("submit.form-plugin", this.selector, a, doAjaxSubmit).on("click.form-plugin", this.selector, a, captureSubmittingElement), this) : this.ajaxFormUnbind().live("submit.form-plugin", a, doAjaxSubmit).live("click.form-plugin", a, captureSubmittingElement)
	}, $.fn.ajaxFormUnbind = function() {
		return this.unbind("submit.form-plugin click.form-plugin")
	}, $.fn.formToArray = function(a, b) {
		var d, e, f, g, h, i, j, k, l, m, n, o, c = [];
		if (0 === this.length) return c;
		if (d = this[0], e = a ? d.getElementsByTagName("*") : d.elements, !e) return c;
		for (f = 0, k = e.length; k > f; f++) if (j = e[f], h = j.name) if (a && d.clk && "image" == j.type) j.disabled || d.clk != j || (c.push({
			name: h,
			value: $(j).val(),
			type: j.type
		}), c.push({
			name: h + ".x",
			value: d.clk_x
		}, {
			name: h + ".y",
			value: d.clk_y
		}));
		else if (i = $.fieldValue(j, !0), i && i.constructor == Array) for (b && b.push(j), g = 0, l = i.length; l > g; g++) c.push({
			name: h,
			value: i[g]
		});
		else if (feature.fileapi && "file" == j.type && !j.disabled) for (b && b.push(j), m = j.files, g = 0; g < m.length; g++) c.push({
			name: h,
			value: m[g],
			type: j.type
		});
		else null !== i && "undefined" != typeof i && (b && b.push(j), c.push({
			name: h,
			value: i,
			type: j.type,
			required: j.required
		}));
		return !a && d.clk && (n = $(d.clk), o = n[0], h = o.name, h && !o.disabled && "image" == o.type && (c.push({
			name: h,
			value: n.val()
		}), c.push({
			name: h + ".x",
			value: d.clk_x
		}, {
			name: h + ".y",
			value: d.clk_y
		}))), c
	}, $.fn.formSerialize = function(a) {
		return $.param(this.formToArray(a))
	}, $.fn.fieldSerialize = function(a) {
		var b = [];
		return this.each(function() {
			var d, e, f, c = this.name;
			if (c) if (d = $.fieldValue(this, a), d && d.constructor == Array) for (e = 0, f = d.length; f > e; e++) b.push({
				name: c,
				value: d[e]
			});
			else null !== d && "undefined" != typeof d && b.push({
				name: this.name,
				value: d
			})
		}), $.param(b)
	}, $.fn.fieldValue = function(a) {
		var b, c, d, e, f;
		for (b = [], c = 0, d = this.length; d > c; c++) e = this[c], f = $.fieldValue(e, a), null === f || "undefined" == typeof f || f.constructor == Array && !f.length || (f.constructor == Array ? $.merge(b, f) : b.push(f));
		return b
	}, $.fieldValue = function(a, b) {
		var f, g, h, i, j, k, l, m, c = a.name,
			d = a.type,
			e = a.tagName.toLowerCase();
		if (void 0 === b && (b = !0), b && (!c || a.disabled || "reset" == d || "button" == d || ("checkbox" == d || "radio" == d) && !a.checked || ("submit" == d || "image" == d) && a.form && a.form.clk != a || "select" == e && -1 == a.selectedIndex)) return null;
		if ("select" == e) {
			if (f = a.selectedIndex, 0 > f) return null;
			for (g = [], h = a.options, i = "select-one" == d, j = i ? f + 1 : h.length, k = i ? f : 0; j > k; k++) if (l = h[k], l.selected) {
				if (m = l.value, m || (m = l.attributes && l.attributes["value"] && !l.attributes["value"].specified ? l.text : l.value), i) return m;
				g.push(m)
			}
			return g
		}
		return $(a).val()
	}, $.fn.clearForm = function(a) {
		return this.each(function() {
			$("input,select,textarea", this).clearFields(a)
		})
	}, $.fn.clearFields = $.fn.clearInputs = function(a) {
		var b = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
		return this.each(function() {
			var c = this.type,
				d = this.tagName.toLowerCase();
			b.test(c) || "textarea" == d ? this.value = "" : "checkbox" == c || "radio" == c ? this.checked = !1 : "select" == d ? this.selectedIndex = -1 : a && (a === !0 && /hidden/.test(c) || "string" == typeof a && $(this).is(a)) && (this.value = "")
		})
	}, $.fn.resetForm = function() {
		return this.each(function() {
			("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
		})
	}, $.fn.enable = function(a) {
		return void 0 === a && (a = !0), this.each(function() {
			this.disabled = !a
		})
	}, $.fn.selected = function(a) {
		return void 0 === a && (a = !0), this.each(function() {
			var c, b = this.type;
			"checkbox" == b || "radio" == b ? this.checked = a : "option" == this.tagName.toLowerCase() && (c = $(this).parent("select"), a && c[0] && "select-one" == c[0].type && c.find("option").selected(!1), this.selected = a)
		})
	}, $.fn.ajaxSubmit.debug = !1
}(jQuery);