function getPosition(a, b) {
	for (var c = 0; c < b.length; c++) if (a == b[c]) return c
}

function zTreeSelectItemClick(a, b, c) {
	var g, h, d = $("#" + b).parents(".selectTree"),
		e = $("#" + b).parents(".mainCon").find('input[type="hidden"]'),
		f = $.fn.zTree.getZTreeObj(b);
	if ("true" == d.attr("multiMode") || 1 == d.attr("multiMode")) 1 == c.clickExpand || "true" == c.clickExpand ? "true" == d.attr("allSelectable") || 1 == d.attr("allSelectable") ? (f.checkNode(c, "", !0), f.expandNode(c, !0)) : f.expandNode(c) : f.checkNode(c);
	else if (1 == c.clickExpand || "true" == c.clickExpand) f.expandNode(c);
	else {
		g = $("#" + b).parents(".mainCon").find("input[class*=selectbox]"), g.val(c.name), d.attr("relText", c.name), d.attr("relValue", c.id), d.data("selectedNode", c), e.val(c.id), ("true" == d.attr("editable") || 1 == d.attr("editable")) && (d.attr("editValue", g.val()), e.val(g.val())), d.focus(), h = $("#" + b).parents(".mainCon").find("div[class=selectbox-tree]"), h.hide(), h.attr("hasfocus", 0);
		try {
			d.trigger("change")
		} catch (i) {}
	}
}

function zTreeSelectAddItem(a, b, c, d) {
	var g, e = $.fn.zTree.getZTreeObj(a.find("ul").eq(0).attr("id")),
		f = e.transformToArray(e.getNodes());
	for (g = 0; g < f.length; g++) f[g].id == b && e.addNodes(f[g], {
		id: c,
		pId: f[g].id,
		name: d
	})
}

function zTreeSelectRemoveItem(a, b) {
	var e, c = $.fn.zTree.getZTreeObj(a.find("ul").eq(0).attr("id")),
		d = c.transformToArray(c.getNodes());
	for (e = 0; e < d.length; e++) d[e].id == b && c.removeNode(d[e])
}
var parentTopHeight, broswerFlag, asyncSetting, selectTree_id, sigleSelectionSetting = {
	view: {
		dblClickExpand: !1,
		selectedMulti: !1
	},
	data: {
		simpleData: {
			enable: !0
		}
	},
	callback: {
		onClick: zTreeSelectItemClick
	}
},
	multiNoGroupSelectionSetting = {
		view: {
			selectedMulti: !0,
			showIcon: !1,
			showLine: !1
		},
		check: {
			enable: !0,
			chkboxType: {
				Y: "",
				N: ""
			}
		},
		data: {
			simpleData: {
				enable: !0
			}
		},
		callback: {
			onClick: zTreeSelectItemClick
		}
	},
	multiTreeSelectionSetting = {
		view: {
			selectedMulti: !1
		},
		check: {
			enable: !0,
			chkboxType: {
				Y: "",
				N: ""
			}
		},
		data: {
			simpleData: {
				enable: !0
			}
		},
		callback: {
			onClick: zTreeSelectItemClick
		}
	},
	multiTreeSelectionSetting2 = {
		view: {
			selectedMulti: !1
		},
		check: {
			enable: !0,
			chkboxType: {
				Y: "ps",
				N: "ps"
			}
		},
		data: {
			simpleData: {
				enable: !0
			}
		},
		callback: {
			onClick: zTreeSelectItemClick
		}
	};
jQuery.fn.extend({
	selectTreeRender: function(a) {
		return this.each(function() {
			$(this).html(""), new jQuery.SelectTreeBox(this, a)
		})
	},
	selectTreeAddItem: function(a) {
		this.each(function() {
			var d, b = $(this).data("data"),
				c = "treeNodes";
			$(this).attr("dataRoot") && (c = $(this).attr("dataRoot")), d = b[c] ? b[c] : b, d.push(a), $(this).data("data", b), $(this).html(""), new jQuery.SelectTreeBox(this)
		})
	},
	selectTreeRemoveItem: function(a) {
		this.each(function() {
			var e, b = $(this).data("data"),
				c = -1,
				d = "treeNodes";
			$(this).attr("dataRoot") && (d = $(this).attr("dataRoot")), e = b[d] ? b[d] : b, $.each(e, function(b, d) {
				d.id.toString() == a && (c = b)
			}), -1 != c && e.splice(c, 1), $(this).data("data", b), $(this).html(""), new jQuery.SelectTreeBox(this)
		})
	}
}), selectTree_id = 1, jQuery.SelectTreeBox = function(selectobj, el) {
	function setHeight() {
		var b, c, d, a = $container[0].scrollTop;
		$container.css({
			overflowY: "visible",
			overflowX: "visible"
		}), $container.width(""), $container.height(""), b = 200, b = window.document.documentElement.clientHeight - ($select.offset().top - $(window).scrollTop()) - 30, $select.attr("boxWidth") || (c = $container.width()), $container.css({
			overflowY: "auto",
			overflowX: "hidden"
		}), $select.attr("boxWidth") ? $container.width(Number($select.attr("boxWidth"))) : $container.width(c), d = 0, $select.attr("boxHeight") && (d = Number($select.attr("boxHeight"))), 0 != d ? ($container.height(d), "top" == $select.attr("openDirection") ? $container.css({
			top: -d
		}) : "bottom" == $select.attr("openDirection") ? ($container.css({
			top: selInputHeight
		}), ("IE6" == broswerFlag || "IE7" == broswerFlag || "IE8" == broswerFlag || "IE9" == broswerFlag || "IE10" == broswerFlag || "IE11" == broswerFlag) && ($container[0].scrollTop = a)) : d > b ? $select.offset().top > d ? $container.css({
			top: -d
		}) : 100 > b && $select.offset().top > b && $select.offset().top > 100 ? $container.css({
			top: -d
		}) : ($container.css({
			top: selInputHeight
		}), ("IE6" == broswerFlag || "IE7" == broswerFlag || "IE8" == broswerFlag || "IE9" == broswerFlag || "IE10" == broswerFlag || "IE11" == broswerFlag) && ($container[0].scrollTop = a)) : $container.css({
			top: selInputHeight
		})) : "top" == $select.attr("openDirection") ? $select.offset().top > $container.outerHeight() ? $container.css({
			top: -$container.outerHeight()
		}) : ($container.height($mainCon.offset().top), $container.css({
			top: -$mainCon.offset().top
		})) : "bottom" == $select.attr("openDirection") ? b < $container.outerHeight() ? ($container.css({
			top: selInputHeight
		}), $container.height(b), ("IE6" == broswerFlag || "IE7" == broswerFlag || "IE8" == broswerFlag || "IE9" == broswerFlag || "IE10" == broswerFlag || "IE11" == broswerFlag) && ($container[0].scrollTop = a)) : $container.css({
			top: selInputHeight
		}) : b < $container.outerHeight() ? $select.offset().top > $container.outerHeight() ? $container.css({
			top: -$container.outerHeight()
		}) : 100 > b && $select.offset().top > b && $select.offset().top > 100 ? ($container.height($select.offset().top), $container.css({
			top: -$select.offset().top
		})) : ($container.css({
			top: selInputHeight
		}), $container.height(b), ("IE6" == broswerFlag || "IE7" == broswerFlag || "IE8" == broswerFlag || "IE9" == broswerFlag || "IE10" == broswerFlag || "IE11" == broswerFlag) && ($container[0].scrollTop = a)) : $container.css({
			top: selInputHeight
		}), $select.attr("boxWidth") || $container.width() < inputWidth + selButtonWidth && $container.width(inputWidth + selButtonWidth)
	}

	function setupMainCon() {
		var a = $("<div></div>");
		return a.addClass("mainCon"), a
	}

	function setupContainer(a) {
		var b = $("<div></div>");
		return b.attr("id", "selectTree" + selectTree_id + "_container"), b.addClass(a.containerClass), b.attr("hasfocus", 0), b
	}

	function setupInput(a) {
		var d, b = document.createElement("input"),
			c = $(b);
		return c.attr("id", "selectTree" + selectTree_id + "_input"), c.attr("type", "text"), c.addClass(a.inputClass), c.attr("autocomplete", "off"), d = !1, null != $select.attr("editable") && (d = "true" == $select.attr("editable") ? !0 : !1), d ? c.attr("readonly", !1) : c.attr("readonly", "readonly"), ("disabled" == $select.attr("disabled") || "true" == $select.attr("disabled") || 1 == $select.attr("disabled")) && (c.attr("disabled", !0), c.addClass("inputDisabled")), c
	}

	function setupHidden() {
		var b = document.createElement("input"),
			c = $(b);
		return c.attr("type", "hidden"), null != $select.attr("name") && c.attr("name", $select.attr("name")), c
	}

	function setCurrent(a, b) {
		return $select.attr("relText", a), $select.attr("relValue", b), $hidden.val(b), $input.val(a), ("true" == edit || 1 == edit) && ($select.attr("editValue", $input.val()), $hidden.val($input.val())), $select.focus(), !0
	}

	function createOptions(a) {
		var b, c, d, e, f, g, i, j, k, l, m, n;
		if (a) {
			if (b = a[dataRoot] ? a[dataRoot] : a, 1 == multiMode) {
				for (b[0].name == promptText && b.splice(0, 1), c = 0; c < b.length; c++) b[c].checked = !1;
				if ("" == selectedValue) $input.val(promptText), $select.attr("relText", promptText), $select.attr("relValue", ""), $select.data("selectedNodes", null), $hidden.val("");
				else {
					for (d = selectedValue.split(","), e = "", f = 0; f < d.length; f++) for (g = 0; g < b.length; g++) b[g].id.toString() != d[f] || (b[g].checked = !0, e = e + b[g].name + ",");
					if (e.length > 0 && (e = e.substring(0, e.length - 1)), setCurrent(e, selectedValue), "false" == $select.attr("showInfo") || 0 == $select.attr("showInfo"));
					else {
						$input.attr("title", e);
						try {
							$input.hideTip(), "" != e && e != promptText && $input.tip()
						} catch (h) {}
					}
				}
				"true" == $select.attr("noGroup") || 1 == $select.attr("noGroup") ? el ? $.fn.zTree.init($treeContainer, el, b) : $.fn.zTree.init($treeContainer, multiNoGroupSelectionSetting, b) : "true" == $select.attr("allSelectable") || 1 == $select.attr("allSelectable") ? el ? $.fn.zTree.init($treeContainer, el, b) : $.fn.zTree.init($treeContainer, multiTreeSelectionSetting2, b) : el ? $.fn.zTree.init($treeContainer, el, b) : $.fn.zTree.init($treeContainer, multiTreeSelectionSetting, b), i = $.fn.zTree.getZTreeObj($treeContainer.attr("id")), i && (j = i.getCheckedNodes(!0), $select.data("selectedNodes", j))
			} else if (k = {
				name: promptText,
				id: "",
				icon: promptIcon
			}, b[0].name == promptText && b.splice(0, 1), b.unshift(k), el ? $.fn.zTree.init($treeContainer, el, b) : $.fn.zTree.init($treeContainer, sigleSelectionSetting, b), "" == selectedValue) $input.val(promptText), $select.attr("relText", promptText), $select.attr("relValue", ""), $select.data("selectedNode", null), $hidden.val("");
			else for ($select.attr("relValue", selectedValue), $hidden.val(selectedValue), l = $.fn.zTree.getZTreeObj($treeContainer.attr("id")), m = l.transformToArray(l.getNodes()), n = 0; n < m.length; n++) m[n].id.toString() == selectedValue && (l.selectNode(m[n]), $select.attr("relText", m[n].name), $select.data("selectedNode", m[n]), $input.val(m[n].name));
			1 == edit && ("" == selectedValue ? $select.attr("editValue", promptText) : $select.attr("editValue", $select.attr("relText")))
		}
	}

	function createOptions2(a, b, c) {
		var d, e, f, g, h, i;
		if (1 == multiMode)"" == selectedValue ? ($input.val(promptText), $select.attr("relText", promptText), $select.attr("relValue", ""), $select.data("selectedNodes", null), $hidden.val("")) : top.Toast("showWarningToast", uncompile(quiLanguage.selectTree.promptMessageErrorMessage)), asyncSetting = {
			async: {
				enable: !0,
				dataType: "JSON",
				dataName: dataRoot,
				url: a,
				autoParam: b,
				otherParam: c
			},
			view: {
				selectedMulti: !1
			},
			check: {
				enable: !0,
				chkboxType: {
					Y: "",
					N: ""
				}
			},
			data: {
				simpleData: {
					enable: !0
				}
			},
			callback: {
				onClick: zTreeSelectItemClick
			}
		}, el ? $.fn.zTree.init($treeContainer, el) : $.fn.zTree.init($treeContainer, asyncSetting), d = $.fn.zTree.getZTreeObj($treeContainer.attr("id")), d && (e = d.getCheckedNodes(!0), $select.data("selectedNodes", e));
		else {
			if (asyncSetting = {
				async: {
					enable: !0,
					dataType: "JSON",
					dataName: dataRoot,
					url: a,
					autoParam: b,
					otherParam: c
				},
				view: {
					dblClickExpand: !1,
					selectedMulti: !1
				},
				data: {
					simpleData: {
						enable: !0
					}
				},
				callback: {
					onClick: zTreeSelectItemClick
				}
			}, el ? $.fn.zTree.init($treeContainer, el) : $.fn.zTree.init($treeContainer, asyncSetting), "" == selectedValue) $input.val(promptText), $select.attr("relText", promptText), $select.attr("relValue", ""), $select.data("selectedNode", null), $hidden.val("");
			else for ($select.attr("relValue", selectedValue), $hidden.val(selectedValue), f = $.fn.zTree.getZTreeObj($treeContainer.attr("id")), g = f.transformToArray(f.getNodes()), h = 0; h < g.length; h++) g[h].id.toString() == selectedValue && (f.selectNode(g[h]), $select.attr("relText", g[h].name), $select.data("selectedNode", g[h]), $input.val(g[h].name));
			d = $.fn.zTree.getZTreeObj($treeContainer.attr("id")), i = {
				name: promptText,
				id: "",
				icon: promptIcon
			}, i = d.addNodes(null, i)
		}
		1 == edit && ("" == selectedValue ? $select.attr("editValue", promptText) : $select.attr("editValue", $select.attr("relText")))
	}

	function hideMe() {
		var a, b, c, d, e, f;
		if ($container.attr("hasfocus", 0), $container.hide(), $("body").unbind("mousedown", onBodyDown), 1 == multiMode && (a = $.fn.zTree.getZTreeObj($treeContainer.attr("id")))) {
			for (b = a.getCheckedNodes(!0), c = [], d = "", e = "", f = 0; f < b.length; f++)("true" != $select.attr("exceptParent") && 1 != $select.attr("exceptParent") || !b[f].isParent) && (c.push(b[f]), d = d + b[f].name + ",", e = e + b[f].id + ",");
			if ($select.data("selectedNodes", c), d.length > 0 && (d = d.substring(0, d.length - 1)), e.length > 0 && (e = e.substring(0, e.length - 1)), "" == d && (d = promptText), setCurrent(d, e), "false" == $select.attr("showInfo") || 0 == $select.attr("showInfo"));
			else {
				d == promptText ? $input.attr("title", " ") : $input.attr("title", d);
				try {
					$input.hideTip(), "" != d && d != promptText && $input.tip()
				} catch (g) {}
			}
		}
		try {
			$select.trigger("change")
		} catch (g) {}
	}

	function showMe() {
		$container.attr("hasfocus", 1), depth++, $select.css({
			zIndex: depth
		}), $container.show(), $("body").bind("mousedown", onBodyDown)
	}

	function onBodyDown(a) {
		0 == $container.attr("hasfocus") || ($(a.target).attr("id") == curInputId || $(a.target).attr("id") == curButtonId || "ztree" == $(a.target).parent().attr("class") || "ztree" == $(a.target).attr("class") || $(a.target).parents(".ztree").length > 0 || "selectbox-tree" == $(a.target).attr("class") ? $(a.target).parents(".ztree").length > 0 && setTimeout(function() {
			$container.height() > $container.find("ul").eq(0).height() && setHeight()
		}, 500) : hideMe())
	}

	function getCurrentSelected() {
		return $select.val()
	}

	function getCurrentValue() {
		return $input.val()
	}
	var selInputHeight, selButtonWidth, defaultSelWidth, fontSize, fontFamily, $select, $parentThemeDom, promptText, promptIcon, curInputId, curButtonId, inFocus, $container, $treeContainer, $input, $hidden, $selBtn, multiMode, inputWidth, $table, selectedValue, edit, dataRoot, paramsStr, paramsObj, dataObj, urlStr, dataStr, dataObj2, autoParamStr, autoParam, dataType, opt = {};
	if (opt.inputClass = opt.inputClass || "selectbox", opt.containerClass = opt.containerClass || "selectbox-tree", opt.hoverClass = opt.hoverClass || "current", opt.currentClass = opt.selectedClass || "selected", opt.debug = opt.debug || !1, selInputHeight = 32, selButtonWidth = 29, defaultSelWidth = 200, fontSize = 12, fontFamily = "宋体", $select = $(selectobj), splitMode) null != $select.attr("selInputHeight") && (selInputHeight = Number($select.attr("selInputHeight"))), null != $select.attr("selButtonWidth") && (selButtonWidth = Number($select.attr("selButtonWidth")));
	else {
		$parentThemeDom = $(window.top.document.getElementById("theme")), null != $parentThemeDom.attr("selInputHeight") && (selInputHeight = Number($parentThemeDom.attr("selInputHeight"))), null != $parentThemeDom.attr("selButtonWidth") && (selButtonWidth = Number($parentThemeDom.attr("selButtonWidth"))), null != $parentThemeDom.attr("defaultSelWidth") && (defaultSelWidth = Number($parentThemeDom.attr("defaultSelWidth")));
		try {
			fontSize = top.getFontSize(), fontFamily = top.getFontFamily()
		} catch (e) {}
	}
	if (selectTree_id++, promptText = uncompile(quiLanguage.selectTree.promptMessage), promptIcon = prePath + "libs/icons/mark.png", curInputId = "0_input", curButtonId = "0_button", inFocus = !1, $select.addClass("mainCon"), "right" == $select.attr("selAlign") && $select.css("float", "right"), null != $select.attr("prompt") && (promptText = $select.attr("prompt")), null != $select.attr("promptIcon") && (promptIcon = $select.attr("promptIcon")), $container = setupContainer(opt), $treeContainer = $('<ul class="ztree"></ul>'), $treeContainer.attr("id", "selectTree" + selectTree_id + "_tree"), $input = setupInput(opt), $hidden = setupHidden(opt), $selBtn = $("<input type='button' value=' ' class='selBtn'/>"), multiMode = !1, null != $select.attr("multiMode") && ("true" == $select.attr("multiMode") || 1 == $select.attr("multiMode") ? (multiMode = !0, $selBtn.addClass("selBtnMuiti"), "true" == $select.attr("noGroup") || 1 == $select.attr("noGroup") ? $treeContainer.addClass("noGroupZtree") : $treeContainer.addClass("multiSelectZtree")) : multiMode = !1), ("disabled" == $select.attr("disabled") || "true" == $select.attr("disabled") || 1 == $select.attr("disabled")) && ($selBtn.attr("disabled", !0), 1 == multiMode ? $selBtn.addClass("selBtn_disabledMuiti") : $selBtn.addClass("selBtn_disabled"), $input.addClass("selectbox_disabled")), $selBtn.attr("id", "selectTree" + selectTree_id + "_button"), inputWidth = 97, null != $select.attr("selWidth") ? inputWidth = Number($select.attr("selWidth")) - selButtonWidth : 0 != defaultSelWidth && (inputWidth = "IE7" == broswerFlag ? defaultSelWidth - selButtonWidth + 5 : defaultSelWidth - selButtonWidth), $input.width(inputWidth), $input.css("fontFamily", fontFamily), $input.css("fontSize", fontSize), $table = $('<table cellspacing="0" cellpadding="0" style="border-style:none;"><tr><td class="ali01" style="border-style:none;padding:0;margin:0;"></td><td class="ali01" style="border-style:none;;padding:0;margin:0;"></td></tr></table>'), $table.find("td").eq(0).append($input), $table.find("td").eq(1).append($selBtn), $select.append($table), $select.append($container), $select.append($hidden), $container.append($treeContainer), selectedValue = "", $select.attr("selectedValue") && (selectedValue = $select.attr("selectedValue")), edit = !1, null != $select.attr("editable") && (edit = "true" == $select.attr("editable") ? !0 : !1), $container.hide(), dataRoot = "treeNodes", $select.attr("dataRoot") && (dataRoot = $select.attr("dataRoot")), paramsStr = $select.attr("params")) try {
		paramsObj = JSON.parse(paramsStr)
	} catch (e) {
		paramsObj = [], top.Toast("showWarningToast", uncompile(quiLanguage.selectTree.paramErrorMessage))
	} else paramsObj = [];
	if (dataObj = "", urlStr = $select.attr("url"), dataStr = $select.attr("data"), dataObj2 = $select.data("data"), "true" == $select.attr("asyncMode") || 1 == $select.attr("asyncMode")) {
		if (autoParamStr = $select.attr("autoParam")) try {
			autoParam = JSON.parse(autoParamStr)
		} catch (e) {
			autoParam = [], top.Toast("showWarningToast", uncompile(quiLanguage.selectTree.paramErrorMessage))
		} else autoParam = ["id", "name"];
		createOptions2(urlStr, autoParam, paramsObj)
	} else if (dataObj2) createOptions(dataObj2);
	else if (dataStr) {
		try {
			dataObj = JSON.parse(dataStr)
		} catch (e) {
			dataObj = "", top.Toast("showWarningToast", uncompile(quiLanguage.selectTree.dataErrorMessage))
		}
		$select.data("data", dataObj), createOptions(dataObj)
	} else urlStr && (dataType = "json", $select.attr("dataType") && (dataType = $select.attr("dataType")), $.ajax({
		url: $select.attr("url"),
		dataType: dataType,
		data: paramsObj,
		error: function() {
			top.Toast("showWarningToast", uncompile(quiLanguage.selectTree.urlErrorMessage))
		},
		success: function(data) {
			var myData;
			myData = "text" == dataType ? eval("(" + data + ")") : data, $select.data("data", myData), dataObj = myData, createOptions(myData)
		}
	}));
	edit ? ($input.css({
		cursor: "text"
	}), $input.change(function() {
		$select.attr("editValue", $(this).val()), $hidden.val($(this).val())
	})) : ($input.css({
		cursor: "pointer"
	}), $input.click(function(a) {
		curInputId = $(a.target).attr("id"), setHeight(), depth++, $select.css({
			zIndex: depth
		}), 0 == $container.attr("hasfocus") ? showMe() : hideMe()
	})), $selBtn.click(function(a) {
		curButtonId = $(a.target).attr("id"), setHeight(), depth++, $select.css({
			zIndex: depth
		}), 0 == $container.attr("hasfocus") ? showMe() : hideMe()
	})
}, String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "")
};