/**
 * 园首页 G2 图
 */
// $(function(){
// 	$.ajax({
// 		url: ' http://192.168.254.220:8019' + "/ibps/platform/bpmn/bpmTask/listJson.htm",
// 		type: 'get',
// 		dataType: 'json',
// 		data: {
// 			'url': encodeURI('/dangerlist!dangerLevelStatistic.do?state=' + state + '&siteid=' + siteid ),
// 			'method': 'GET'
// 		}
// 	}).then(function (res) {
// 		defer.resolve(res);
// 	})
//
// })


// 安全责任管理
function initC5() {
	// 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
	var sliceNumber = -0.03;
	// 自定义 other 的图形，增加两条线
	G2.Shape.registerShape('interval', 'sliceShape5', {
		draw: function draw(cfg, container) {
			var isoverflow = cfg.origin._origin.value != 0 && cfg.origin._origin.value != 100;
			if(!isoverflow){
				sliceNumber = 0
			}else{
				sliceNumber = -0.03
			}
			var isother = cfg.origin._origin.type == '其他1';
			var points = cfg.points;
			var path = [];
			path.push(['M', points[0].x, points[0].y]);
			path.push(['L', points[1].x, points[1].y - sliceNumber]);
			path.push(['L', points[2].x, points[2].y - sliceNumber]);
			path.push(['L', points[3].x, points[3].y]);
			path.push('Z');
			path = this.parsePath(path);
			if(isoverflow){
				var radius = Math.sqrt(Math.pow(path[2][1] - path[1][6],2) + Math.pow(path[2][2] - path[1][7],2))/2;
				var ry = (path[2][1] - path[1][6]) /2
				var rx = (path[2][2] - path[1][7]) /2
				var p2y = path[1][7] - ry
				var p2x = path[1][6] + rx
				var p3y = path[2][2] - ry
				var p3x = path[2][1] +  rx
				var ly = (path[0][1] - path[3][6]) /2
				var lx = (path[0][2] - path[3][7]) /2
				var p1x = path[0][1] + lx
				var p1y = path[0][2] - ly
				var p4x = path[3][6] + lx
				var p4y = path[3][7] - ly
				var temp = [];
				temp.push(['M',p1x,p1y]);
				temp.push(['A', path[1][1], path[1][2], path[1][3],  path[1][4],  path[1][5], p2x, p2y]);
				if(isother){
					temp.push(['A', radius, radius, 0, 0, 1, p3x, p3y]);
				}else{
					temp.push(['A', radius, radius, 0, 0, 0, p3x, p3y]);
				}
				temp.push(['A', path[3][1], path[3][2], path[3][3],  path[3][4],  path[3][5], p4x, p4y]);
				if(isother){
					temp.push(['A', radius, radius, 0, 0,1, p1x, p1y]);
				}else{
					temp.push(['A', radius, radius, 0, 0,0, p1x, p1y]);
				}
				temp.push(['Z']);
				path = temp;
			}
			return container.addShape('path', {
				attrs: {
					fill: cfg.color,
					path: path
				}
			});
		}
	});
	var chart = new G2.Chart({
		container: 'c5',
		forceFit: true,
		height: 182,
		padding: 'auto'
	});
	$.ajax({
		url: ctxPath + "proxy/openHdURL",
		type: 'get',
		dataType: 'json',
		data: {
			'url': encodeURI('/task!missionStatistic.do?siteid=' + siteid ),
			'method': 'GET'
		},
		error: function(e) {
			$('#c5').html('<div style="height: 182px;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
			return;
		}
	}).then(function (res) {
		if(!res.length || res.length==0) {
			$('#c5').html('<div style="height: 182px;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
			return;
		}

		var allNum = 0
		for(var i=0; i< res.length; i++) {
			allNum += res[i].value
		}
		chart.source(res);
		chart.legend(false);
		chart.facet('rect', {
			fields: ['type'],
			padding: 20,
			showTitle: false,
			eachView: function eachView(view, facet) {
				var data = facet.data;
				console.log(data)
				var color = void 0;
				if (data[0].type === '待审核任务') {
					color = 'l(90) 0:#fd9d6a 1:#f7c559';
				} else if(data[0].type === '发布的任务'){
					color = 'l(90) 0:#fe8c84 1:#fe7886';
				} else {
					color = 'l(90) 0:#b370f7 1:#de6bf7';
				}
				data.push({
					type: '其他1',
					value: allNum - data[0].value
				});
				view.source(data);
				view.coord('theta', {
					radius:1,
					innerRadius: 0.75
				});
				chart.tooltip(false);
				view.intervalStack().position('value').color('type', [color, '#eceef1']).opacity(1)
					.shape('sliceShape5')
					.select(false)
					.active(false);
				view.guide().html({
					position: ['50%', '50%'],
					html: '<div class="g2-guide-html-c5"><p class="title">' + data[0].value + '</p><p class="value">' + (data[0].type) + '</p></div>'
				});
			}
		});
		chart.render();
	})
}

// 隐患级别统计
var chart4;
function initClickC4(state) {
	$.when(
		findDataC4(state)
	).done(function(result){
		var allNum = 0
		$('#content_c4').empty();
		for(var i=0; i < result.list.length; i++) {
			allNum += result.list[i].count
			var str = '<li>';
			str += '<span></span><div class="_c1">'+result.list[i].name+'</div><div class="_c2">|</div>';
			str += '<div class="_c3">'+result.list[i].rate+'</div><div class="_c4">'+result.list[i].count+'</div></li>';
			$('#content_c4').append(str);
		}
		chart4.source(result.list);
		chart4.guide().clear();
		chart4.guide().html({
			position: ['50%', '50%'],
			html: '<div class="g2-guide-html-c4"><p class="title">' + allNum + '</p><p class="value">' + '总数' + '</p></div>'
		});
		chart4.render();
	})
}
function initC4() {
	chart4 = new G2.Chart({
		container: 'c4',
		forceFit: true,
		height: 252,
		padding: [50,'auto']
	});
	// 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
	var sliceNumber = 0.02;
	// 自定义 other 的图形，增加两条线
	G2.Shape.registerShape('interval', 'sliceShape4', {
		draw: function draw(cfg, container) {
			var points = cfg.points;
			var path = [];
			path.push(['M', points[0].x, points[0].y]);
			path.push(['L', points[1].x, points[1].y - sliceNumber]);
			path.push(['L', points[2].x, points[2].y - sliceNumber]);
			path.push(['L', points[3].x, points[3].y]);
			path.push('Z');
			path = this.parsePath(path);
			var radius = Math.sqrt(Math.pow(path[2][1] - path[1][6],2) + Math.pow(path[2][2] - path[1][7],2))/2;
			var ry = (path[2][1] - path[1][6]) /2
			var rx = (path[2][2] - path[1][7]) /2
			var p2y = path[1][7] - ry
			var p2x = path[1][6] + rx
			var p3y = path[2][2] - ry
			var p3x = path[2][1] +  rx
			var ly = (path[0][1] - path[3][6]) /2
			var lx = (path[0][2] - path[3][7]) /2
			var p1x = path[0][1] + lx
			var p1y = path[0][2] - ly
			var p4x = path[3][6] + lx
			var p4y = path[3][7] - ly
			var temp = [];
			temp.push(['M',p1x,p1y]);
			temp.push(['A', path[1][1], path[1][2], path[1][3],  path[1][4],  path[1][5], p2x, p2y]);
			temp.push(['A', radius, radius, 0, 0, 0, p3x, p3y]);
			temp.push(['A', path[3][1], path[3][2], path[3][3],  path[3][4],  path[3][5], p4x, p4y]);
			temp.push(['A', radius, radius, 0, 0, 0, p1x, p1y]);
			temp.push(['Z']);
			return container.addShape('path', {
				attrs: {
					fill: cfg.color,
					path: temp,
					shadowColor: '#e3e3e3',
					shadowOffsetX: '15',
					shadowOffsetY: '15',
					shadowBlur: 10
				}
			});
		}
	});
	$.when(
		findDataC4(0)
	).done(function(result){
		if(!result.list.length || result.list.length==0) {
			$('#c2').parent('.dataSource').html('<div style="height: 312px;width: 100%;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
			$('#toUpdate').html('更新于 &nbsp;' + s1)
			return;
		}


		var allNum = 0
		for(var i=0; i < result.list.length; i++) {
			allNum += result.list[i].count
			var str = '<li>';
			str += '<span></span><div class="_c1">'+result.list[i].name+'</div><div class="_c2">|</div>';
			str += '<div class="_c3">'+result.list[i].rate+'</div><div class="_c4">'+result.list[i].count+'</div></li>';
			$('#content_c4').append(str);
		}
		chart4.source(result.list);
		chart4.coord('theta', {
			radius:1,
			innerRadius: 0.85
		});
		chart4.tooltip({
			showTitle: false
		});
		chart4.legend(false);
		chart4.intervalStack().position('count').color('name',["l(45) 0:#fd9c6b 1:#f7c559",
			"l(45) 0:#41e8a2 1:#01f0c7",
			"l(45) 0:#17e9d1 1:#62cdf1",
			"l(45) 0:#71bcff 1:#6e68f3",
			"l(45) 0:#ad70f7 1:#ea67f9",
			"l(45) 0:#fe8e84 1:#fe7385"]).shape('sliceShape4');
		chart4.guide().html({
			position: ['50%', '50%'],
			html: '<div class="g2-guide-html-c4"><p class="title">' + allNum + '</p><p class="value">' + '总数' + '</p></div>'
		});
		chart4.render();
	})
}
function findDataC4(state) {
	var defer = $.Deferred();
	$.ajax({
		url: ctxPath + "proxy/openHdURL",
		type: 'get',
		dataType: 'json',
		data: {
			//'url': encodeURI('/dangerlist!dangerLevelStatistic.do?state=' + state + '&siteid=' + siteid ),
			'url': encodeURI('/duty!findDutyStatistic.do?state=' + state + '&siteid=' + siteid ),
			'method': 'GET'
		},
		error: function(e) {
			$('#c4').parent('.dataSource').html('<div style="height: 252px;width:100%;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
		}
	}).then(function (res) {
		defer.resolve(res);
	})
	return defer.promise();
}

// 工作站状态
function initC3(a) {
	var Shape = G2.Shape;
	// 自定义Shape 部分
	Shape.registerShape('point', 'pointer', {
		drawShape: function drawShape(cfg, group) {
			var center = this.parsePoint({ // 获取极坐标系下画布中心点
				x: 0,
				y: 0
			});
			// 绘制指针
			group.addShape('line', {
				attrs: {
					x1: center.x,
					y1: center.y,
					x2: cfg.x,
					y2: cfg.y,
					stroke: cfg.color,
					lineWidth: 5,
					lineCap: 'round'
				}
			});
			return group.addShape('circle', {
				attrs: {
					x: center.x,
					y: center.y,
					r: 9.75,
					stroke: cfg.color,
					lineWidth: 4.5,
					fill: '#fff'
				}
			});
		}
	});
	console.log(a)
	var data = [{
		value: a
	}];
	var chart = new G2.Chart({
		container: 'c3',
		forceFit: true,
		height: 230,
		padding: [0, 80, 30, 80]
	});
	chart.source(data);

	chart.coord('polar', {
		startAngle: -9 / 8 * Math.PI,
		endAngle: 1 / 8 * Math.PI,
		radius: 0.7
	});
	chart.scale('value', {
		min: 0.4,
		max: 8.6,
		nice: false,
		ticks: [2.25, 3.75, 5.25, 6.75]
	});

	chart.axis('1', false);
	chart.axis('value', {
		zIndex: 2,
		line: null,
		label: {
			offset: -15,
			formatter: function formatter(val) {
				if (val === '2.25') {
					return '差';
				} else if (val === '3.75') {
					return '中';
				} else if (val === '5.25') {
					return '良';
				}
				return '优';
			},
			textStyle: {
				fontSize: 12,
				textAlign: 'center'
			}
		},
		tickLine: null,
		grid: null
	});
	chart.legend(false);
	chart.point().position('value*1').shape('pointer').color('#1e80f8').active(false);

	// 绘制仪表盘刻度线
	chart.guide().line({
		start: [3, 0.905],
		end: [3.0035, 0.85],
		lineStyle: {
			stroke: '#0961fb', // 线的颜色
			lineDash: null, // 虚线的设置
			lineWidth: 3
		}
	});
	chart.guide().line({
		start: [4.5, 0.905],
		end: [4.5, 0.85],
		lineStyle: {
			stroke: '#0961fb', // 线的颜色
			lineDash: null, // 虚线的设置
			lineWidth: 3
		}
	});

	chart.guide().line({
		start: [6, 0.905],
		end: [6.0035, 0.85],
		lineStyle: {
			stroke: '#0961fb', // 线的颜色
			lineDash: null, // 虚线的设置
			lineWidth: 3
		}
	});

	// 绘制仪表盘背景
	chart.guide().arc({
		zIndex: 0,
		top: false,
		start: [0, 0.965],
		end: [9, 0.965],
		style: { // 底灰色
			stroke: '#e0e0e0',
			lineWidth: 15
		}
	});
	// 绘制指标
	chart.guide().arc({
		zIndex: 1,
		start: [0, 0.965],
		end: [data[0].value, 0.965],
		style: {
			stroke: 'l(0) 0:#0256fb 1:#00a7ff',
			lineWidth: 16
		}
	});
	// 绘制指标数字
	chart.guide().html({
		position: ['50%', '95%'],
		html: '<div class="g2-guide-html-c3">'
			+ '<p class="title">工作站状态</p>'
			+ '<p class="value">' + (data[0].value>=6?'优':data[0].value>=4.5?'良':data[0].value>=3?'中':'差') + '</p>'
			+ '</div>'
	});
	chart.render()
}
function workstation() {
	$.ajax({
		url: ctxPath + "proxy/openAdapterURL",
		type: 'get',
		dataType: "json",
		data: {
			'url': '/system/info/cmn',
			'method': 'GET'
		},
		error: function(e) {
			initC3(0)
		}
	}).then(function (res) {
		if(0 == res.code) {
			var a = res.data.mem.freeGB * 9 / res.data.mem.totalGB
			initC3(a)
			$('#workstation #freeGB').html('可用'+res.data.mem.freeGB + 'G')
			$('#workstation #totalGB').html(res.data.mem.totalGB)
			$('#workstation #usedGB').html(res.data.mem.usedGB)
            $('#freeGB').width(res.data.mem.freeGB*100/res.data.mem.totalGB+'%')
		}
	})
}

// 今日幼儿异常进出情况
function initC2() {
	var chart = new G2.Chart({
		container: 'c2',
		forceFit: true,
		height: 312,
		width: '100%',
		padding: [20, 90, 50, 50],
		background: {
			fillOpacity: 0.5
		}
	});

	//异常进出园统计
	$.when(
		findDataC2()
	).done(function(result){
		var day = new Date();
		var s1 = day.format("yyyy-MM-dd");
		if(!result.data.length || result.data.length==0) {
			$('#c2').html('<div style="height: 312px;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
			$('#toUpdate').html('更新于 &nbsp;' + s1)
			return;
		}
		var t = ''
		for(var i=0;i<result.data.length;i++) {
		    if(t<result.data[i].month) {
                t = result.data[i].month
            }
        }
		$('#toUpdate').html('更新于 &nbsp;' + t)
		chart.source(result.data, {
			month: {
				range: [0, 1]
			}
		});
		chart.tooltip(true,{
			crosshairs: false,
			containerTpl: '<div class="g2-tooltip">'
				+ '<div class="g2-tooltip-title" style="margin:10px 0;"></div>'
				+ '<ul class="g2-tooltip-list"></ul></div>', // tooltip 容器模板
			itemTpl: '<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{name}: {value}</li>', // tooltip 每项记录的默认模板
			'g2-tooltip': {
				backgroundColor: 'rgb(93,146,252)',
				color: '#fff',
				width: '140px'
			},
			follow: true
		})

		chart.legend({
			position: 'top',
		});
		chart.line().position('month*temperature').color('city', ['l(0) 0:rgba(167,129,242,0) 0.5:rgba(167,129,242,1) 1:rgba(167,129,242,0)', 'l(0) 0:rgba(6,243,193,0) 0.5:rgba(6,243,193,1) 1:rgba(6,243,193,0)']).size(8).shape('smooth');
		chart.point().position('month*temperature').color('city').size(0).shape('circle').style({
			stroke: '#fff',
			lineWidth: 5
		});
		chart.render();
	})
}
function findDataC2() {
	var defer = $.Deferred();
	$.ajax({
		url: ctxPath + "proxy/openBasicsURL",
		type: 'get',
		dataType: "json",
		data: {
			'url': encodeURI('/groups/xxtb_yeyjqqkxx/getExceptionKq?siteid=' + siteid + '&limit=12'),
			// 'url': encodeURI('/groups/xxtb_yeyjqqkxx/getExceptionKq?limit=12'),
			'method': 'GET'
		},
		error: function(e) {
			var day = new Date();
			var s1 = day.format("yyyy-MM-dd");
			$('#c2').html('<div style="height: 312px;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
			$('#toUpdate').html('更新于 &nbsp;' + s1)
		}
	}).then(function (res) {
		defer.resolve(res);
	})
	return defer.promise();
}


//幼儿班级统计
var chart1, chart1X;
function initc1Data(datatime) {
    $.when(getKqDate(datatime)).done(function(result){
        var res = result.data;
        chart1X = res
        var date = new Date()
        if(res.length != 0){
            chart1.source(res);
            chart1.render();
			$('#emptyKq tr:not(.fixed)').empty();
			var showindex = 0;
			if(!res.length || 0 == res.length) {
				$('#emptyKq').append('<tr><td colspan="3">暂无数</td></tr>');
				return
			}
			for(var x = 0 ; x < res.length ;x++){
				if(showindex >= 8){
					break;
				}
				var str = '<tr>';
				str += '<td>' + (x + 1) + '</td>';
				str += '<td>'+res[x].bjname+'</td>';
				str += '<td>'+res[x].人数+'</td>';
				str += '</tr>';
				// console.log(str)
				$('#emptyKq').append(str);
				showindex+=1
			}
        }
    })
}
function initC1() {
	chart1 = new G2.Chart({
		container: 'c1',
		forceFit: true,
		height: 290,
		padding: [30,30,40,60]
	});
	$.when(getKqDate()).done(function(result){
		console.log(result)
		var res = result.data;
		chart1X = res
		var date = new Date()
		if(res.length != 0){
			chart1.source(res);
			chart1.scale('sales', {
				tickInterval: 20
			});
			//Graphic
			chart1.interval().position('bjname*人数').color("l(90) 0:#f595f1 1:#967df3").style({
			// chart1.interval().position('bjname*人数').color("l(90) 0:#000000 1:#ffffff").style({
				shadowColor: '#eee',
				shadowOffsetX: '10',
				shadowOffsetY: '5',
				shadowBlur: 10
			}).size(20);
			chart1.render();

			$('#emptyKq tr:not(.fixed)').empty();
			var showindex = 0;
			if(!res.length || 0 == res.length) {
				$('#emptyKq').append('<tr><td colspan="3">暂无数</td></tr>');
				return
			}
			for(var x = 0 ; x < res.length ;x++){
				if(showindex >= 8){
					break;
				}
				var str = '<tr>';
				str += '<td>' + (x + 1) + '</td>';
				str += '<td>'+res[x].bjname+'</td>';
				str += '<td>'+res[x].人数+'</td>';
				str += '</tr>';
				// console.log(str)
				$('#emptyKq').append(str);
				showindex+=1
			}
		}else {
            $('#c1').html('<div style="height: 290px;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
            return;
        }
	})
}
function getKqDate(type){
    var date = new Date();
    var year = date.getFullYear();
    var month = getSystemDate();
    var today = getNowFormatDate();

    var dateTmp = "";
    if(!type || type=='year') {
		type = 'year'
        dateTmp = '/^'+year+'/';
    } else if(type =='month') {
        dateTmp = '/^'+month+'/';
    } else if(type =='today') {
        dateTmp = today;
    } else if(type =='week') {
        //按周日为一周的最后一天计算
        var date = new Date();
        //今天是这周的第几天
        var today = date.getDay();
        //上周日距离今天的天数（负数表示）
        var stepSunDay = -today + 1;
        // 如果今天是周日
        if (today == 0) {
            stepSunDay = -7;
        }
        // 周一距离今天的天数（负数表示）
        var stepMonday = 7 - today;
        var time = date.getTime();
        var monday = new Date(time + stepSunDay * 24 * 3600 * 1000);
        var sunday = new Date(time + stepMonday * 24 * 3600 * 1000);
        //本周一的日期 （起始日期）
        var startDate = transferDate(monday); // 日期变换
        //本周日的日期 （结束日期）
        var endDate = transferDate(sunday); // 日期变换
        dateTmp = "{$gte:\'"+startDate+"\'_$lte:\'"+endDate+"\' }"
        // dateTmp = '{$gte:'+startDate+'_$lte:'+endDate+' }'
    } else {
		var t1 = type.split(' - ')[0]
		var t2 = type.split(' - ')[1]
		t1 = t1.replace(new RegExp('/','gm'),'-')
		t2 = t2.replace(new RegExp('/','gm'),'-')

        dateTmp = "{$gte:\'"+t1+"\'_$lte:\'"+t2+"\' }"
		type = 'week'
    }


	var defer = $.Deferred();
    var a = encodeURIComponent(dateTmp)
	$.ajax({
		url: ctxPath + "proxy/openBasicsURL",
		type: 'get',
        dataType: "json",
		data: {
			//'url': '/groups/yeyyekqgl/kqData?key=kqrq&sites=' + siteid + '&value=' + a + '&type=' + type + '&limit=15',
			'url': '/tongji/xxtb_yeyxzglxx/xxCount',
			'method': 'GET'
		},
		error: function(err) {
			$('#c1').html('<div style="height: 290px;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
			//
			$('#emptyKq').append('<tr><td colspan="3">暂无数据</td></tr>');
		}
	}).then(function (res) {
        defer.resolve(res);
	})
	return defer.promise();
}



function getSystemDate(){
	var systemDate = new Date();
	// 获取当年
	var year = systemDate.getFullYear();
	// 获取当月 （月+1是因为js中月份是按0开始的）
	var month = systemDate.getMonth() + 1;
	// 获取当日
	var day =  systemDate.getDate();
	if (day < 10) { // 如果日小于10，前面拼接0
		day = '0' + day;
	}
	if (month < 10) { // 如果月小于10，前面拼接0
		month = '0' + month;
	}
	return [year, month].join('-');
}

function transferDate(date) {
	// 年
	var year = date.getFullYear();
	// 月
	var month = date.getMonth() + 1;
	// 日
	var day = date.getDate();

	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (day >= 0 && day <= 9) {
		day = "0" + day;
	}
	var dateString = year + '-' + month + '-' + day;
	return dateString;
}

function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}




function initTopSum() {
	//晨检合格人数
	$.when(
		getCjhgsr(siteid,getNowFormatDate(),0),
		getCjhgsr(siteid,getNowFormatDate(),-1)
	).done(function(todayResult,yesResult){
		if(!todayResult.data) {todayResult.data = 0}
		if(!yesResult.data) {yesResult.data = 0}
		$('#morningCheck .c-lable').html(todayResult.data)
		$('#morningCheck .lable').html('昨日 ' + yesResult.data + '人<span></span>')
		if(todayResult.data>yesResult.data) {
			$('#morningCheck .upDown').html('↑')
			$('#morningCheck .compare').html((todayResult.data-yesResult.data) + '人')
		} else if(todayResult.data<yesResult.data) {
			$('#morningCheck .upDown').html('↓')
			$('#morningCheck .compare').html((yesResult.data-todayResult.data) + '人')
		}
	})
	//安全隐患数量
	$.when(
		getAqyhsl(siteid,getNowFormatDate(),0),
		getAqyhsl(siteid,getNowFormatDate(),-1)
	).done(function(todayResult,yesResult){
		if(!todayResult.data) {todayResult.data = 0}
		if(!yesResult.data) {yesResult.data = 0}
		$('#hiddenDanger .c-lable').html(todayResult.data)
		$('#hiddenDanger .lable').html('昨日 ' + yesResult.data + '人<span></span>')
		if(todayResult.data>yesResult.data) {
			$('#hiddenDanger .upDown').html('↑')
			$('#hiddenDanger .compare').html((todayResult.data-yesResult.data) + '人')
		} else if(todayResult.data<yesResult.data) {
			$('#hiddenDanger .upDown').html('↓')
			$('#hiddenDanger .compare').html((yesResult.data-todayResult.data) + '人')
		}
	})
	// 在校学生数
	$.when(
		getTodayYouerCount(siteid,getNowFormatDate(),0),
		getTodayYouerCount(siteid,getNowFormatDate(),-1)
	).done(function(todayResult,yesResult){
		if(!todayResult.data) {todayResult.data = 0}
		if(!yesResult.data) {yesResult.data = 0}
		$('#studentNumber .c-lable').html(todayResult.data)
		$('#studentNumber .lable').html('昨日 ' + yesResult.data + '人<span></span>')
		if(todayResult.data>yesResult.data) {
			$('#studentNumber .upDown').html('↑')
			$('#studentNumber .compare').html((todayResult.data-yesResult.data) + '人')
		} else if(todayResult.data<yesResult.data) {
			$('#studentNumber .upDown').html('↓')
			$('#studentNumber .compare').html((yesResult.data-todayResult.data) + '人')
		}
	})
	//今日异常入园数
	$.when(
		getTodayYcryCount(siteid, getNowFormatDate(),0),
		getTodayYcryCount(siteid, getNowFormatDate(),-1)
	).done(function(todayResult,yesResult){
		if(!todayResult.data) {todayResult.data = 0}
		if(!yesResult.data) {yesResult.data = 0}
		var res = todayResult.data;
		var standard_jysj = ['07:00','08:00'];
		var standard_lysj = ['16:00','17:30'];
		var t_e = 0, v_e = 0;
		if(res.length != 0){
			var yjsj_flag = true ; var lysj_flag = true ; var exception_jysj =0;var exception_lysj =0;
			for(var i = 0 ; i < res.length ;i++){
				//进园时间
				var jysj = res[i].yeyjqqkxx_jysj;
				yjsj_flag = time_range(standard_jysj[0], standard_jysj[1], jysj);
				if(!yjsj_flag){
					exception_jysj++;
				}
				//离园时间
				var lysj = res[i].yeyjqqkxx_lysj;
				lysj_flag = time_range(standard_lysj[0], standard_lysj[1], lysj);
				if(!lysj_flag){
					exception_lysj++;
				}
			}
			t_e = exception_jysj + exception_lysj;
		}
		var yesRes = yesResult.data;
		if(yesRes.length != 0){
			var yjsj_flag = true ; var lysj_flag = true ; var exception_jysj =0;var exception_lysj =0;
			for(var i = 0 ; i < yesRes.length ;i++){
				//进园时间
				var jysj = yesRes[i].yeyjqqkxx_jysj;
				yjsj_flag = time_range(standard_jysj[0], standard_jysj[1], jysj);
				if(!yjsj_flag){
					exception_jysj++;
				}
				//离园时间
				var lysj = yesRes[i].yeyjqqkxx_lysj;
				lysj_flag = time_range(standard_lysj[0], standard_lysj[1], lysj);
				if(!lysj_flag){
					exception_lysj++;
				}
			}
			v_e = exception_jysj + exception_lysj;
		}
		$('#abnormalAdmission .c-lable').html(t_e)
		$('#abnormalAdmission .lable').html('昨日 ' + v_e + '人<span></span>')
		if(t_e > v_e) {
			$('#abnormalAdmission .upDown').html('↑')
			$('#abnormalAdmission .compare').html((t_e - v_e) + '人')
		} else if(t_e < v_e) {
			$('#abnormalAdmission .upDown').html('↓')
			$('#abnormalAdmission .compare').html((v_e - t_e) + '人')
		}
	})
}
function getCjhgsr(site,today,count){
    var yeyaqws_cjxx_cjjlsj = (count==-1?GetDateStr(today,-1):today); //晨检记录时间
    var defer = $.Deferred();
    $.ajax({
        url: ctxPath + "proxy/openBasicsURL",
        type: 'get',
        dataType: "json",
        data: {
            'url': encodeURI('/form/xxtb_yeyaqws_cjxx_calendar/count?site[EQ]=' + siteid + '&yeyaqws_cjxx_cjjlsj[EQ]='+ yeyaqws_cjxx_cjjlsj+'&yeyaqws_cjxx_detail_sfhg[EQ]=不合格'),
            'method': 'GET'
        }
    }).then(function (res) {
        defer.resolve(res);
    })
    return defer.promise();
}
function getAqyhsl(site,today,count){
	var yeyaqyhxx_fssj = (count==-1?GetDateStr(today,-1):today);
	var defer = $.Deferred();
	$.ajax({
		url: ctxPath + "proxy/openBasicsURL",
		type: 'get',
		dataType: "json",
		data: {
			'url': encodeURI('/form/xxtb_yeyaqws_cjxx_calendar/count?site[EQ]=' + siteid + '&yeyaqyhxx_fssj[EQ]=' + yeyaqyhxx_fssj),
			'method': 'GET'
		}
	}).then(function (res) {
		defer.resolve(res);
	})
	return defer.promise();
}
function getTodayYouerCount(site,today,count){
	var defer = $.Deferred();
	var time = (count==-1?GetDateStr(today,-1):today);
	$.ajax({
		url: ctxPath + "proxy/openBasicsURL",
		type: 'get',
		dataType: "json",
		data: {
			'url': encodeURI('/form/basic_youer/count'),
			'method': 'GET'
		}
	}).then(function (res) {
		defer.resolve(res);
	})
	return defer.promise();
}
function getTodayYcryCount(site,today,count){
	var time = (count==-1?GetDateStr(today,-1):today);
	var defer = $.Deferred();
	$.ajax({
		url: ctxPath + "proxy/openBasicsURL",
		type: 'get',
		dataType: "json",
		data: {
			'url': encodeURI('/form/xxtb_yeyjqqkxx/tree?site[EQ]=' + siteid + '&yeyjqqkxx_rq[EQ]=' + time),
			'method': 'GET'
		}
	}).then(function (res) {
		defer.resolve(res);
	})
	return defer.promise();
}



function initFile() {
	$.ajax({
		url: ctxPath + "proxy/openFileURL",
		type: 'get',
		dataType: "json",
		data: {
			'url': '/biz/filemanage/stat/getSearchAndDownloadStat?siteId='+siteid+'&searchTop=5',
			'method': 'GET'
		},
		error: function(e) {
			$('#libs_rank').append('<tr><td colspan="4">暂无数据</td></tr>');
		}
	}).then(function (res) {
		if(0 == res.code) {
			$('#total_download').html(res.data.total_download)
			$('#total_search').html(res.data.total_search)
			if(!res.data.libs_rank.length || 0== res.data.libs_rank.length) {
				$('#libs_rank').append('<tr><td colspan="4">暂无数据</td></tr>');
				return
			}
			if(res.data.libs_rank){
				$('#libs_rank tr:not(.fixed)').empty();
				var showindex = 0
				for(var i = 0; i < res.data.libs_rank.length; i++) {
					var _file = res.data.libs_rank[i]
					if(showindex>=4){
						break;
					}
					var str = '<tr>';
					str += '<td>' + (i+1) + '</td>';
					str += '<td>' + _file.file_text_name + '</td>';
					str += '<td>' + _file.search_number + '</td>';
					str += '<td>' + _file.dl_number + '</td>';
					str += '</tr>';
					$('#libs_rank').append(str);
				}
			}
		}
	})
}

function GetDateStr(today,AddDayCount) {
    var dd = new Date(today);
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();//获取当前年份的日期
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();//获取当前天数的日期
    var h = dd.getHours(); //获取当前小时数
    var mm = dd.getMinutes(); //获取当前分钟数
    var s = dd.getSeconds(); //获取当前描述
	if(d < 10) { d = '0' + d; }
	if(m < 10) { m = '0' + m; }
	return y + "-" + m + "-" + d;
}

var time_range = function (beginTime, endTime, nowTime) {
	if(nowTime == undefined){
		return false;
	}

	var strb = beginTime.split (":");
	if (strb.length != 2) {
		return false;
	}
	var stre = endTime.split (":");
	if (stre.length != 2) {
		return false;
	}
	var strn = nowTime.split (":");
	if (stre.length != 2) {
		return false;
	}
	var b = new Date ();
	var e = new Date ();
	var n = new Date ();
	b.setHours (strb[0]);
	b.setMinutes (strb[1]);
	e.setHours (stre[0]);
	e.setMinutes (stre[1]);
	n.setHours (strn[0]);
	n.setMinutes (strn[1]);
	if (n.getTime () - b.getTime () >= 0 && n.getTime () - e.getTime () <= 0) {
		return true;
	} else {
		//alert ("当前时间是：" + n.getHours () + ":" + n.getMinutes () + "，不在该时间范围内！");
		return false;
	}
}

// 安全协作
function cooperation() {
    $.ajax({
        url: ctxPath + "proxy/openCooperationURL",
        type: 'get',
        dataType: "json",
        data: {
            'url': encodeURI('/platform/yey/stat/getDashboardList.htm?userId=' + userid),
            'method': 'GET'
        }
    }).then(function (res) {
        res = JSON.parse(res)
        console.log(res)
        $('#unreadCount').html(res.unreadCount)
        $('#todoCount p').html(res.todoCount)
        $('#processCount p').html(res.processCount)
        $('#myRequestCount p').html(res.myRequestCount)
    })
}


Date.prototype.format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}