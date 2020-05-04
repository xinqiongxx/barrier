function TipRock(a) {
	$(".tip_icon").addClass("rock"), setTimeout(function() {
		$(".tip_icon").removeClass("rock")
	}, a)
}

function TipBalloons(a) {
	1 > a ? $(".tip_balloons").hide().text(a) : $(".tip_balloons").text(a).show()
}

function addTip(a) {
	TipRock(4e3), addhtml += '<div class="tip_details">', addhtml += '<div class="tip_img tip_news"></div>', addhtml += '<span class="tip_txt">' + a + "</span>", addhtml += "</div>", $(".tip_details_win").prepend(addhtml);
	var b = $(".tip_details_win .tip_details").length;
	TipBalloons(b), $(".tip_toggle_content .tip_num span").text(b), add_tip_all += '<li data_off="0"><a href="javascript:;">' + a + '</a><div class="li_content">' + a + "</div></li>", $(".tip_allcontent .all_content ul").prepend(add_tip_all)
}

function iframeClickHandler() {
	$(".tip_toggle_content").stop().fadeOut(200), right_tip = 0
}

function mainResizeHandler(a, b) {
	$(".tip_allcontent_win").css({
		height: a - $("#hbox").height(),
		width: b
	}), $(".tip_allcontent").css("height", a - $("#hbox").height())
}
var addhtml, add_tip_all, right_tip = 0,
	html = "",
	html_con = "",
	tip_all = "",
	tip_all_content = "";
tip_construction = function(a, b) {
	var d, e;
	for (html += '<div class="tip_icon_win"><span class="tip_icon"></span><div class="tip_balloons">' + a.length + "</div></div>", html += '<ul class="tip_toggle_content">', html += '<li class="tip_title clearfloat"><div class="tip_img"></div><div class="tip_num"><span>' + a.length + '</span>条未读</div><span class="tip_close"></span></li>', html += '<li class="clearfloat tip_details_win">', d = 0; d < a.length; d++) html_con += '<div class="tip_details">', html_con += '<div class="tip_img tip_news"></div>', html_con += '<span class="tip_txt">' + a[d].news + "</span>", html_con += "</div>", tip_all_content += '<li data_off="0"><a href="javascript:;">' + a[d].news + '</a><div class="li_content">' + a[d].news + "</div></li>";
	html += html_con, html += "</li>", html += '<li class="clearfloat tip_bottom"><span class="tip_txt_more">进入信件箱>></span></li>', html += "</ul>", $(b).empty().append(html), tip_all += '<div class="tip_allcontent_win"></div>', tip_all += '<div class="tip_allcontent">', tip_all += '<div class="all_title clearfloat"><span>消息</span><em class="all_close"></em></div><div class="clear"></div>', tip_all += '<div class="all_content">', tip_all += "<ul>", tip_all += tip_all_content, tip_all += "</ul>", tip_all += "</div>", tip_all += "</div>", $("body").append(tip_all), $(".tip_allcontent .all_close").click(function() {
		$(this).parents(".tip_allcontent").stop().animate({
			right: "-400px"
		}, 100, function() {
			$(".tip_allcontent_win").hide()
		})
	}), $(".tip_allcontent_win").click(function() {
		$(this).siblings(".tip_allcontent").stop().animate({
			right: "-400px"
		}, 100, function() {
			$(".tip_allcontent_win").hide()
		})
	}), $(".tip_allcontent").click(function(a) {
		a.stopPropagation()
	}), $(".all_content ul").on("click", "li", function() {
		var a = $(".tip_allcontent").height() - $(".all_title").outerHeight() - ($(".all_content ul li>a").length - 1) * $(this).find(">a").height();
		0 == $(this).attr("data_off") ? ($(this).stop().animate({
			height: a
		}).attr("data_off", "1").find(".li_content").show(), $(this).siblings("li").stop().animate({
			height: $(this).find(">a").height()
		}).attr("data_off", "0").find(".li_content").hide()) : $(this).stop().animate({
			height: $(this).find(">a").height()
		}).attr("data_off", "0").find(".li_content").hide()
	}), $(b).on("click", ".tip_icon_win", function(a) {
		a.stopPropagation(), 0 == right_tip ? ($(this).next(".tip_toggle_content").stop().fadeIn(200), right_tip = 1) : ($(this).next(".tip_toggle_content").stop().fadeOut(200), right_tip = 0)
	}), $(b).on("click", ".tip_close", function(a) {
		a.stopPropagation(), $(this).parents(".tip_toggle_content").stop().fadeOut(200), right_tip = 0
	}), $(b).on("click", ".tip_title,.tip_bottom", function(a) {
		a.stopPropagation()
	}), $(b).on("click", ".tip_bottom", function(a) {
		a.stopPropagation(), $(".tip_allcontent_win").show().siblings(".tip_allcontent").show().stop().animate({
			right: 0
		}, 100), $(".tip_toggle_content").stop().fadeOut(200), right_tip = 0
	}), TipRock(8e3), e = $(".tip_details_win .tip_details").length, TipBalloons(e), $(b).on("click", ".tip_details_win .tip_details", function(a) {
		_TipBalloons2 = $(".tip_details_win .tip_details").length, a.stopPropagation(), $(this).addClass("zoomOutDown").stop().animate({
			fontSize: "0"
		}, 500, function() {
			$(this).remove(), TipBalloons(_TipBalloons2 - 1), $(".tip_toggle_content .tip_num span").text(_TipBalloons2 - 1)
		})
	})
}, $(document).click(function() {
	$(".tip_toggle_content").stop().fadeOut(200), right_tip = 0
}), addhtml = "", add_tip_all = "";