

var setting = {
	data: {
		simpleData: {
			idKey: "id",
			pIdKey: "parentId",
			enable: true
		},
		key: {
			children: "children"
		}
	}
};
var	show_on=0;
function transition(setting, sNodes) {
	var i, l,
		key = setting.data.simpleData.idKey,
		parentKey = setting.data.simpleData.pIdKey,
		childKey = setting.data.key.children;
	if(!key || key == "" || !sNodes) return [];
	var r = [];
	var tmpMap = {};
	for(i = 0, l = sNodes.length; i < l; i++) {
		tmpMap[sNodes[i][key]] = sNodes[i];
	};
	for(i = 0, l = sNodes.length; i < l; i++) {
		if(tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
			if(!tmpMap[sNodes[i][parentKey]][childKey])
				tmpMap[sNodes[i][parentKey]][childKey] = [];
			tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
		} else {
			r.push(sNodes[i]);
		};
	};
	return r;
};

function switchMenu(switch_on){
	if(!switch_on){
		$("#bs_left").stop().animate({
			width:"42px"
		},200);
		$(".menu_content").find(".menu_content_content").stop().slideUp(50);
		$("#bs_left").removeClass("lbox_middlecenter_content");
		$(".bs_left_shrink i").removeClass("active");
		show_on=1;
	}else{
		$("#bs_left").stop().animate({
			width:"220px"
		},200);
		$(".menu_content").find(".menu_content_content").stop().show();
		$("#bs_left").addClass("lbox_middlecenter_content");
		$(".bs_left_shrink i").addClass("active");
		show_on=0;
	};
}
function switchHead(state){
	if(!state){
		$("#hbox").hide();
		$("#hbox").height(0);
		autoReset();
	}
	else{
		$("#hbox").hide();
		$("#hbox").height(oldBannerHeight);
		autoReset();
	}
}
$(function(){
	/**设置iframe初始高度*/
	$("#bs_right").height($("#bs_right").height()-5)
	$("#bs_right iframe").height($("#bs_right").height())
	
	$.post("/main!findOperation.do",{},function(data){
		var sNodes=data.pop;
		var content = transition(setting, sNodes);
		$(".hbox_content_right_menu").empty();
		var html='';
		for(var i=0;i<content.length;i++){
			if(content[i].parentId=="0"){
				$(".hbox_content_right_menu").append('<li url="'+content[i].url+'"><i style="background-image:url('+content[i].icon+');background-position:'+content[i].backgroundPosition+'"></i>'+content[i].name+'</li>');
				if(i==0){
					//alert(1)
					//console.log($(".hbox_content_right_menu>li"))
					//console.log($(".hbox_content_right_menu>li").attr("url"))
					//$(".hbox_content_right_menu>li").click();
					$("#bs_right iframe").attr("src",$(".hbox_content_right_menu>li").attr("url"));
				}
			};
			html+='<div class="menu_content">';
			if(content[i].children!=undefined){
				for(var j=0;j<content[i].children.length;j++){
					if(content[i].children[j].children!=undefined){
						html+='<div class="menu_content_win">';
						html+='<div class="menu_content_title clearfloat"><i style="background-image:url('+content[i].children[j].icon+');background-position:'+content[i].children[j].backgroundPosition+'"></i><span>'+content[i].children[j].name+'</span></div>';
						html+='<div class="menu_content_content">';
						for(var k=0;k<content[i].children[j].children.length;k++){
							html+='<a href="'+content[i].children[j].children[k].url+'" target="'+content[i].children[j].children[k].target+'" class="menu_content_list clearfloat "><i style="background-image:url('+content[i].children[j].children[k].icon+');background-position:'+content[i].children[j].children[k].backgroundPosition+'"></i>'+content[i].children[j].children[k].name+'</a>';
						};
						html+='</div>';
						html+='</div>';
					}else{
						html+='<a href="'+content[i].children[j].url+'" target="'+content[i].children[j].target+'" class="menu_content_list clearfloat "><i></i>'+content[i].children[j].name+'</a>';
					};
				};
			}
			html+='</div>';
		};
		$(".lbox_middlecenter_content").append(html);
		//右侧头部js
		$(".right_toggle").hover(function() {
			$(this).find(".right_toggle_content").stop().slideToggle(200);
		});
		$(".menu_content_list").click(function(){
			if($(this).hasClass()!="active"){
				$(this).parents(".lbox_middlecenter_content").find(".menu_content_list").removeClass("active");
				$(this).addClass("active");
			};
			$(".rbox_topcenter span").text($(this).parent().siblings(".menu_content_title").find("span").text()+' / '+$(this).text());
		});
		//组件导航切换
		$(".hbox_content_right_menu li").click(function(){
			var index=$(this).index();
			$("#bs_left .menu_content").eq(index).show().siblings(".menu_content").hide();
			if($(this).hasClass()!="active"){
				$(this).addClass("active").siblings("li").removeClass("active");
			};
			$("#bs_left").stop().animate({scrollTop:0},500);
			$("#bs_right iframe").attr("src",$(this).attr("url"));
			$(".rbox_topcenter span").text('');
		});
		//左侧导航收缩
		$(".bs_left_shrink i").click(function(){
			if($(this).hasClass("active")){
				switchMenu(0);
			}else{
				switchMenu(1);
			};
		});
		$(".menu_content_win").hover(function(){
			if(show_on!=0){
				$(this).find(".menu_content_content").addClass("active").stop().show();
				$(this).find(".menu_content_title").addClass("hover");
				var top = $(this).find(".menu_content_content").offset().top; //子集距离浏览器顶部的距离
				var all_height = $(window).height(); //可视窗口的高度
				var self_height = $(this).find(".menu_content_content").height(); //子集的高度
				var end_hei = all_height - top - self_height; //子集距离浏览器底部的距离
				if(end_hei < 0) {
					$(this).find(".menu_content_content").stop().animate({
						"top": -(top-130)
					})
				};
			};
		},function(){
			if(show_on!=0){
				$(this).find(".menu_content_content").removeClass("active").stop().hide();
				$(this).find(".menu_content_title").removeClass("hover");
				$(this).find(".menu_content_content").stop().animate({
					"top": 0
				})
			}
		});
		//按钮控制导航收缩
		$(".right_toggle_fullscreen").click(function(){
			var iconBtn=$(this);
			if(iconBtn.hasClass('right_toggle_screen')){
	            switchMenu(1);
	            fullScrennHander(false);
	            iconBtn.removeClass('right_toggle_screen');
	            $(this).find("div").text("全屏");
	        }
	        else{
	          top.switchMenu(0);
	          if (typeof window.screenX === "number"){
	            top.fullScrennHander(true);
	            }
	          else{
	            top.Toast('showNoticeToast', '您的浏览器不支持全屏，如果需要，请手动按F11键。');
	          }
	          iconBtn.addClass('right_toggle_screen');
	          $(this).find("div").text("还原");
	        }
		});
		
		
		//默认第一个组件内容显示
		//$(".menu_content").eq(0).show().find("a").eq(0).addClass("active");
		//$("#bs_right iframe").attr("src",$(".menu_content").eq(0).find("a").eq(0).attr("href"));
		$(".hbox_content_right_menu li").eq(0).addClass("active");
		$(".menu_content").eq(0).show()
		
	})
	
	
	
})
