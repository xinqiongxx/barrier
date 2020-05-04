var validationPrePath = "../../";
null != $("#skin").attr("prePath") && (validationPrePath = $("#skin").attr("prePath")), function($) {
	var yzId = 1;
	$.fn.validationEngine = function(a) {
		function b(b) {
			$.validationEngine.settings = a, 0 != $.validationEngine.intercept && $.validationEngine.intercept ? $.validationEngine.intercept = !1 : ($.validationEngine.onSubmitValid = !1, $.validationEngine.loadValidation(b))
		}
		return $.validationEngineLanguage && (allRules = $.validationEngineLanguage.allRules), a = jQuery.extend({
			allrules: allRules,
			validationEventTriggers: "focusout",
			inlineValidation: !0,
			returnIsValid: !1,
			liveEvent: !1,
			unbindEngine: !0,
			ajaxSubmit: !1,
			scroll: !0,
			promptPosition: "bottomRight",
			success: !0,
			beforeSuccess: function() {},
			failure: function() {},
			showArray: !1,
			showOnMouseOver: !0,
			errorClass: "error-field"
		}, a), $.validationEngine.settings = a, $.validationEngine.ajaxValidArray = new Array, $.validationEngine.ajaxValid = !0, 1 == a.inlineValidation && (a.returnIsValid || (allowReturnIsvalid = !1, $(this).find("[class*=validate]").not("[type=checkbox]").not("[type=radio]").bind(a.validationEventTriggers, function() {
			b(this)
		}), $(this).find("[class*=validate][type=checkbox]").bind("click", function() {
			b(this)
		}), $(this).find("[class*=validate][type=radio]").bind("click", function() {
			b(this)
		}), $(this).find("select[class*=validate]").bind("change", function() {
			b(this)
		}), $(this).find("input:text[class*=date]").bind("blur", function() {
			$(this).hasClass("date")?b(this):'';
		}), $(this).find("input:file").bind("blur", function() {
			b(this)
		}), $(this).find("[class*=selectTree]").bind("focus", function() {
			b(this)
		}), $(this).find("[class*=filter]").bind("click", function() {
			b(this)
		}), $(this).find("[class*=lister]").bind("itemClick", function() {
			b(this)
		}), $(this).find("[class*=listerTree]").bind("itemClick", function() {
			b(this)
		}), $(this).find("[class*=selectCustom]").bind("boxClose", function() {
			b(this)
		}), $(this).find("[class*=suggestion]").bind("validate", function() {
			b(this)
		}), $(this).find("[class*=suggestion]").bind("validate2", function() {
			b(this)
		}), $(this).find("[class*=selectSuggestion]").bind("validate", function() {
			b(this)
		}), $(this).find("[class*=selectSuggestion]").bind("validate2", function() {
			b(this)
		}), firstvalid = !1, $(this).find("[class*=validate]").each(function() {
			$(this).attr("yzId", yzId), yzId++
		}))), a.returnIsValid ? $.validationEngine.submitValidation(this, a) ? !1 : !0 : ($(".formError").bind("click", function() {
			$(this).fadeOut(150, function() {
				$(this).remove()
			})
		}), void 0)
	}, $.validationEngine = {
		defaultSetting: function() {
			$.validationEngineLanguage && (allRules = $.validationEngineLanguage.allRules), settings = {
				allrules: allRules,
				validationEventTriggers: "blur",
				inlineValidation: !0,
				returnIsValid: !1,
				scroll: !0,
				unbindEngine: !0,
				ajaxSubmit: !1,
				promptPosition: "bottomRight",
				success: !1,
				failure: function() {}
			}, $.validationEngine.settings = settings
		},
		loadValidation: function(a, b) {
			try {
				$.validationEngine.settings || $.validationEngine.defaultSetting(), rulesParsing = $(a).attr("class"), rulesRegExp = /\[(.*)\]/, getRules = rulesRegExp.exec(rulesParsing), str = getRules[1], pattern = /\[|,|\]/, result = str.split(pattern);
				var c = $.validationEngine.validateCall(a, result, b);
				return c
			} catch (d) {}
		},
		validateCall: function(caller, rules, isSubmit) {
			function radioHack() {
				$("input[name='" + callerName + "']").size() > 1 && ("radio" == callerType || "checkbox" == callerType) && (caller = $("input[name='" + callerName + "'][type!=hidden]:first"), $.validationEngine.showTriangle = !1)
			}
			function _required(a, b) {
				if ($(a).hasClass("selectTree"))(null == $(a).attr("relValue") || "" == $(a).attr("relValue")) && ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />");
				else if ($(a).hasClass("selectCustom"))(null == $(a).attr("relValue") || "" == $(a).attr("relValue")) && ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />");
				else if ($(a).hasClass("suggestion"))(null == $(a).attr("relText") || "" == $(a).attr("relText")) && ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />");
				else if ($(a).hasClass("selectSuggestion"))(null == $(a).attr("relText") || "" == $(a).attr("relText")) && ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />");
				else if ("file" == $(a).attr("type")) if ($(a).hasClass("fileComponent")) {
					var c = $(a).parent().find("input[type=text]");
					"" == c.val() && ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />")
				} else "" == $(a).val() && ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />");
				else $(a).is("select") ? (null == $(a).val() || "" == $(a).val()) && ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />") : $(a).hasClass("filter") ? (null == $(a).attr("relValue") || "" == $(a).attr("relValue")) && ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />") : $(a).hasClass("lister") ? (null == $(a).attr("relValue") || "" == $(a).attr("relValue")) && ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />") : $(a).hasClass("listerTree") ? (null == $(a).attr("relValue") || "" == $(a).attr("relValue")) && ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />") : $(a).is("textarea") ? (null == $(a).val() || "" == $(a).val()) && ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />") : (callerType = $(a).attr("type"), ("text" == callerType || "password" == callerType || "textarea" == callerType) && ($(a).val() || ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />")), ("radio" == callerType || "checkbox" == callerType) && (callerName = $(a).attr("name"), 0 == $("input[name='" + callerName + "']:checked").size() && ($.validationEngine.isError = !0, promptText = 1 == $("input[name='" + callerName + "']").size() ? $.validationEngine.settings.allrules[b[i]].alertTextCheckboxe + "<br />" : $.validationEngine.settings.allrules[b[i]].alertTextCheckboxMultiple + "<br />")), "select-one" == callerType && ($(a).val() || 1 == $(a).attr("disabled") || ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />")), "select-multiple" == callerType && ($(a).find("option:selected").val() || ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[b[i]].alertText + "<br />")))
			}
			function _customRegex(caller, rules, position) {
				customRule = rules[position + 1], pattern = eval($.validationEngine.settings.allrules[customRule].regex), "" != $(caller).val() && (pattern.test(jQuery.trim($(caller).val())) || ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules[customRule].alertText + "<br />"))
			}
			function _exemptString(a, b, c) {
				var d, e;
				customRule = b[c + 1], d = customRule.split("|"), e = d[1], customString = d[0], "" != $(a).val() && customString == $(a).val() && ($.validationEngine.isError = !0, promptText = e + "<br />")
			}
			function _functionCall(a, b, c) {
				var d, e, f, g;
				0 == $.validationEngine.isError && (d = b[c + 1].split("|"), e = window[d[0]], f = d[1], "" != $(a).val() && "function" == typeof e && (g = e(), $.validationEngine.isError = g, promptText = f + "<br />"))
			}
			function _passwordStrength(a, b, c) {
				if (0 == $.validationEngine.isError) {
					if ("" != $(a).val()) {
						$(a).attr("passStrength", "true"), customRule = b[c];
						var d = $(a).password_strength2($(a).val());
						$(a).data("passStrength", d), promptText = $.validationEngine.settings.allrules[customRule][d - 1] + "<br />"
					}
				} else $(a).attr("passStrength", "false")
			}
			function _funcCall(a, b, c) {
				var d, e;
				customRule = b[c + 1], funce = $.validationEngine.settings.allrules[customRule].nname, d = window[funce], "function" == typeof d && (e = d(), $.validationEngine.isError = e, promptText = $.validationEngine.settings.allrules[customRule].alertText + "<br />")
			}
			function _ajax(a, b, c) {
				var d, e;
				ajaxValidate = !0, $(a).attr("ajaxValidate", "true"), $(a).parents("form").eq(0).attr("ajaxIng", "true"), customAjaxRule = b[c + 1], d = customAjaxRule.split("|"), postfile = d[0], e = d[1], fieldValue = $(a).val(), ajaxCaller = a, fieldId = $(a).attr("yzId"), ajaxisError = $.validationEngine.isError, ajaxisError ? $(a).parents("form").eq(0).attr("ajaxIng", "false") : $.ajax({
					url: postfile,
					dataType: "json",
					async:false,
					data: {
						validateValue: fieldValue
					},
					error: function() {
						top.Toast("showWarningToast", uncompile(quiLanguage.validation.ajaxErrow))
					},
					beforeSend: function() {
						if (0 == $(a).parent().find("input:button[class='loading']").length) {
							var b = $('<input type="button" class="loading"/>');
							$(a).after(b), $.validationEngine.settings.showOnMouseOver || b.css({
								paddingLeft: "15px",
								paddingTop: "20px",
								position: "absolute",
								backgroundPosition: "100% 100%"
							})
						} else $(a).parent().find("input:button[class='loading']").show()
					},
					success: function(b) {
						$(a).parent().find("input:button[class='loading']").hide();
						var c = b.validateResult.valid;
						"false" == c || 0 == c ? ($.validationEngine.ajaxValid = !1, $.validationEngine.isError = !0, promptText = e + "<br />", $.validationEngine.buildPrompt(ajaxCaller, promptText, "load"), $(a).parents("form").eq(0).attr("ajaxSucess", "false")) : ($.validationEngine.ajaxValid = !0, $.validationEngine.isError = !1, $.validationEngine.closePrompt(ajaxCaller), $(a).parents("form").eq(0).attr("ajaxSucess", "true")), $(a).parents("form").eq(0).attr("ajaxIng", "false")
					}
				})
			}
			function _confirm(a, b, c) {
				confirmField = b[c + 1], $(a).val() != $("#" + confirmField).val() && ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules["confirm"].alertText + "<br />")
			}
			function _length(caller, rules, position) {
				"" != $(caller).val() && (startLength = eval(rules[position + 1]), endLength = eval(rules[position + 2]), feildLength = $(caller).val().length, (startLength > feildLength || feildLength > endLength) && ($.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules["length"].alertText + startLength + $.validationEngine.settings.allrules["length"].alertText2 + endLength + $.validationEngine.settings.allrules["length"].alertText3 + "<br />"))
			}
			function _maxCheckbox(caller, rules, position) {
				nbCheck = eval(rules[position + 1]), groupname = $(caller).attr("name"), groupSize = $("input[name='" + groupname + "']:checked").size(), groupSize > nbCheck && ($.validationEngine.showTriangle = !1, $.validationEngine.isError = !0, promptText = $.validationEngine.settings.allrules["maxCheckbox"].alertText + "<br />")
			}
			function _minCheckbox(caller, rules, position) {
				nbCheck = eval(rules[position + 1]), groupname = $(caller).attr("name"), groupSize = $("input[name='" + groupname + "']:checked").size(), nbCheck > groupSize && ($.validationEngine.isError = !0, $.validationEngine.showTriangle = !1, promptText = $.validationEngine.settings.allrules["minCheckbox"].alertText + " " + nbCheck + " " + $.validationEngine.settings.allrules["minCheckbox"].alertText2 + "<br />")
			}
			var callerName, promptText = "";
			for (caller = caller, ajaxValidate = !1, callerName = $(caller).attr("name"), $.validationEngine.isError = !1, callerType = $(caller).attr("type"), i = 0; i < rules.length; i++) switch (rules[i]) {
			case "optional":
				if (!$(caller).val()) return $.validationEngine.closePrompt(caller), $.validationEngine.isError;
				break;
			case "required":
				_required(caller, rules);
				break;
			case "custom":
				_customRegex(caller, rules, i);
				break;
			case "exemptString":
				_exemptString(caller, rules, i);
				break;
			case "ajax":
				"undefined" != typeof isSubmit && isSubmit || _ajax(caller, rules, i);
				break;
			case "length":
				_length(caller, rules, i);
				break;
			case "maxCheckbox":
				_maxCheckbox(caller, rules, i), groupname = $(caller).attr("name"), caller = $("input[name='" + groupname + "']");
				break;
			case "minCheckbox":
				_minCheckbox(caller, rules, i), groupname = $(caller).attr("name"), caller = $("input[name='" + groupname + "']");
				break;
			case "confirm":
				_confirm(caller, rules, i);
				break;
			case "funcCall":
				_funcCall(caller, rules, i);
				break;
			case "functionCall":
				_functionCall(caller, rules, i);
				break;
			case "passwordStrength":
				_passwordStrength(caller, rules, i)
			}
			return radioHack(), "true" == $(caller).attr("passstrength") ? $.validationEngine.buildPrompt_strength(caller, promptText, "error") : 1 == $.validationEngine.isError ? $.validationEngine.settings.showOnMouseOver ? (linkTofield = $.validationEngine.linkTofield(caller), 0 == $("div." + linkTofield).size() ? $.validationEngine.buildPrompt(caller, promptText, "error") : $.validationEngine.updatePromptText(caller, promptText)) : $.validationEngine.buildPrompt(caller, promptText, "error") : "true" == $(caller).attr("ajaxValidate") || $.validationEngine.closePrompt(caller), $.validationEngine.isError ? $.validationEngine.isError : !1
		},
		submitForm: function(a) {
			if ($.validationEngine.settings.beforeSuccess()) return !0;
			if ($.validationEngine.settings.success) {
				$.validationEngine.settings.unbindEngine && $(a).unbind("submit");
				try {
					return $.validationEngine.settings.success && $.validationEngine.settings.success(), !0
				} catch (b) {}
			}
			return !1
		},
		showTip: function(a) {
			a.data.stop(), a.data.fadeTo(100, 1), a.data.css({
				top: a.pageY + 10,
				left: a.pageX - 20
			})
		},
		hideTip: function(a) {
			a.data.stop(), a.data.fadeTo(100, 0, function() {
				$(this).hide()
			})
		},
		buildPrompt: function(a, b) {
			var e, f, g, h;
			$.validationEngine.settings || $.validationEngine.defaultSetting(), $.validationEngine.settings.showOnMouseOver ? (linkTofield = $.validationEngine.linkTofield(a), e = document.createElement("div"), deleteItself = "." + $(a).attr("yzId") + "formError", $(deleteItself)[0] && ($(deleteItself).get(0).validateField.unbind("mouseover", $.validationEngine.showTip).unbind("mouseout", $.validationEngine.hideTip), $(deleteItself).stop(), $(deleteItself).remove()), f = document.createElement("div"), g = document.createElement("div"), $(e).addClass("formError"), $(e).addClass(linkTofield), $(f).addClass("formErrorContent"), $(g).addClass("formErrorBottom"), $("body").append(e), $(e).append(f), $(e).append(g), $(f).html(b), callerTopPosition = $(a).offset().top, callerleftPosition = $(a).offset().left, callerWidth = $(a).width(), inputHeight = $(e).height(), "topRight" == $.validationEngine.settings.promptPosition && (callerleftPosition += callerWidth - 30, callerTopPosition += -inputHeight - 10), "topLeft" == $.validationEngine.settings.promptPosition && (callerTopPosition += -inputHeight - 10), "centerRight" == $.validationEngine.settings.promptPosition && (callerleftPosition += callerWidth + 13), "bottomLeft" == $.validationEngine.settings.promptPosition && (callerHeight = $(a).height(), callerleftPosition = callerleftPosition, callerTopPosition = callerTopPosition + callerHeight + 15), "bottomRight" == $.validationEngine.settings.promptPosition && (callerHeight = $(a).height(), callerleftPosition += callerWidth - 30, callerTopPosition += callerHeight + 15), $(e).css({
				opacity: $.validationEngine.settings.showOnMouseOver ? 1 : 0,
				display: $.validationEngine.settings.showOnMouseOver ? "none" : ""
			}), $(a).is(":checkbox,:radio") ? $(e).get(0).validateField = $(a).parent() : $(a).is("select") ? $(e).get(0).validateField = $(a).parent().find("input:text").length > 0 ? $(a).parent().find("input:text") : $(a).parent() : $(a).hasClass("selectTree") ? $(e).get(0).validateField = $(a).find("input:text").length > 0 ? $(a).find("input:text") : $(a) : $(a).hasClass("selectCustom") ? $(e).get(0).validateField = $(a).find("input:text").length > 0 ? $(a).find("input:text") : $(a) : $(a).hasClass("suggestion") ? $(e).get(0).validateField = $(a).find("input:text").length > 0 ? $(a).find("input:text") : $(a) : $(a).hasClass("selectSuggestion") ? $(e).get(0).validateField = $(a).find("input:text").length > 0 ? $(a).find("input:text") : $(a) : $(a).hasClass("fileComponent") ? $(a).parent().find("input:text").length > 0 ? ($(e).get(0).validateField = $(a).parent().find("input:text"), h = $(a).parent(), h.bind("mouseover", $(e), $.validationEngine.showTip).bind("mouseout", $(e), $.validationEngine.hideTip)) : $(e).get(0).validateField = $(a) : $(e).get(0).validateField = $(a), $(e).get(0).validateField.addClass($.validationEngine.settings.errorClass), $(e).get(0).validateField.attr("access", "false"), $(e).get(0).validateField.bind("mouseover", $(e), $.validationEngine.showTip).bind("mouseout", $(e), $.validationEngine.hideTip)) : (e = $.validationEngine.linkTofield2(a), b = b.replace("*", ""), e.html(b), e.removeClass("validation_right"), e.removeClass("validation_warn"), e.addClass("validation_wrong"))
		},
		buildPrompt_strength: function(a, b) {
			$.validationEngine.settings || $.validationEngine.defaultSetting();
			var e;
			e = $.validationEngine.linkTofield2(a), b = b.replace("*", ""), e.html(b), $(a).data("passStrength") > 3 ? (e.removeClass("validation_warn"), e.removeClass("validation_wrong"), e.addClass("validation_right")) : (e.removeClass("validation_right"), e.removeClass("validation_wrong"), e.addClass("validation_warn"))
		},
		updatePromptText: function(a, b) {
			linkTofield = $.validationEngine.linkTofield(a);
			var e = "." + linkTofield;
			$(e).find(".formErrorContent").html(b), callerTopPosition = $(a).offset().top, inputHeight = $(e).height(), ("bottomLeft" == $.validationEngine.settings.promptPosition || "bottomRight" == $.validationEngine.settings.promptPosition) && (callerHeight = $(a).height(), callerTopPosition = callerTopPosition + callerHeight + 15), "centerRight" == $.validationEngine.settings.promptPosition && (callerleftPosition += callerWidth + 13), ("topLeft" == $.validationEngine.settings.promptPosition || "topRight" == $.validationEngine.settings.promptPosition) && (callerTopPosition = callerTopPosition - inputHeight - 10)
		},
		linkTofield: function(a) {
			return $.validationEngine.settings.showOnMouseOver ? (linkTofield = $(a).attr("yzId") + "formError", linkTofield = linkTofield.replace(/\[/g, ""), linkTofield = linkTofield.replace(/\]/g, "")) : void 0
		},
		linkTofield2: function(a) {
			var b, c;
			return $.validationEngine.settings.showOnMouseOver ? void 0 : (b = $(a).hasClass("fileComponent") ? $(a).parent().parent() : $(a).is(":checkbox,:radio") ? $(a).parent() : $(a), c = b.nextUntil(".validation_info").next().eq(-1), 0 == c.length && (c = b.parent().find(".validation_info").eq(0)), 0 == c.length && (c = b.parent().parent().find(".validation_info").eq(0)), c)
		},
		closePrompt: function(a) {
			$.validationEngine.settings || $.validationEngine.defaultSetting(), "undefined" == typeof ajaxValidate && (ajaxValidate = !1), $.validationEngine.settings.showOnMouseOver ? (linkTofield = $.validationEngine.linkTofield(a), closingPrompt = "." + linkTofield, $.validationEngine.settings.showOnMouseOver ? ($(closingPrompt).get(0) && ($(closingPrompt).get(0).validateField.removeClass($.validationEngine.settings.errorClass).unbind("mouseover", $.validationEngine.showTip).unbind("mouseout", $.validationEngine.hideTip), $(closingPrompt).get(0).validateField.attr("access", "true")), $(closingPrompt).remove()) : $(closingPrompt).fadeTo("fast", 0, function() {
				$(closingPrompt).remove()
			})) : (closingPrompt = $.validationEngine.linkTofield2(a), closingPrompt.html(""), closingPrompt.addClass("validation_right"), closingPrompt.removeClass("validation_warn"), closingPrompt.removeClass("validation_wrong"))
		},
		debug: function(a) {
			$("#debugMode")[0] || $("body").append("<div id='debugMode'><div class='debugError'><strong>这是调试模式，来帮你解决设置的问题。</strong></div></div>"), $(".debugError").append("<div class='debugerror'>" + a + "</div>")
		},
		submitValidation: function(a) {
			var b = !1;
			if ($(a).find(".formError").remove(), "true" == $(a).attr("ajaxIng") || 1 == $(a).attr("ajaxIng")) {
				try {
					top.Toast("showNoticeToast", "正在进行ajax验证中，请稍后提交表单!")
				} catch (c) {
					alert(uncompile(quiLanguage.validation.ajaxIng))
				}
				return !0
			}
			if ($(a).find("[class*=validate]").size(), $(a).find("[class*=validate]").each(function() {
				if (linkTofield = $.validationEngine.linkTofield(this), !$("." + linkTofield).hasClass("ajaxed")) {
					//var a = $.validationEngine.loadValidation(this, !0);
					var a = $.validationEngine.loadValidation(this);
					return a ? b = !0 : ""
				}
			}), ajaxErrorLength = $.validationEngine.ajaxValidArray.length, "false" == $(a).attr("ajaxSucess") || 0 == $(a).attr("ajaxSucess")) {
				if (null != $(a).attr("failAlert")) try {
					top.Toast("showErrorToast", $(a).attr("failAlert"))
				} catch (c) {
					alert($(a).attr("failAlert"))
				}
				return !0
			}
			return b || !$.validationEngine.ajaxValid ? !0 : !1
		}
	}
}(jQuery), $(document).ready(function() {
	$("form").each(function() {
		"false" == $(this).attr("showOnMouseOver") || 0 == $(this).attr("showOnMouseOver") ? $(this).validationEngine({
			showOnMouseOver: !1
		}) : $(this).validationEngine()
	})
});