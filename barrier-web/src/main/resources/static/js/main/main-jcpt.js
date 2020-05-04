/**
 * 基础平台 G2 图
 */

// 页面访问累计耗时
function initC6() {
	// var data = [{
	// 	country: 'Europe',
	// 	year: 'index.jsp',
	// 	value: 163
	// }, {
	// 	country: 'Asia5',
	// 	year: 'main.jsp',
	// 	value: 1402
	// }];

	$.when(findDataC6()).done(function(result){
		console.log(result)
		var Tdata = []
		if(0 == result.code) {
			if(!result.data.length || 0 == result.data.length) {
				$('#c6').parent('.dataSource').html('<div style="height: 152px;width: 100%;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
				return;
			}
			for(var i=0; i<result.data.length; i++) {
				var dt = {}
				dt.country = 'swt'
				dt.year = result.data[i].id
				dt.value = result.data[i].countTime*0.25
				Tdata.push(dt)
				var dt1 = {}
				dt1.country = 'swt' + i
				dt1.year = result.data[i].id
				dt1.value = result.data[i].countTime
				Tdata.push(dt1)
			}


			var ds = new DataSet();
			var dv = ds.createView().source(Tdata).transform({
				type: 'percent',
				field: 'value', // 缁熻閿€閲�
				dimension: 'country', // 姣忓勾鐨勫崰姣�
				groupBy: ['year'], // 浠ヤ笉鍚屼骇鍝佺被鍒负鍒嗙粍
				as: 'percent'
			});
			var chart = new G2.Chart({
				container: 'c6',
				forceFit: true,
				height: 165,
				padding: ['auto', 0, 'auto', 0]
			});
			chart.tooltip(false)
			chart.legend(false);
			chart.axis('percent',false);
			chart.axis('year', {
				label: {
					textStyle: {
						fontSize: 10
					},
					autoRotate:false
				}
			});
			chart.source(dv, {
				percent: {
					min: 0,
					formatter: function formatter(val) {
						return (val * 100).toFixed(2) + '%';
					}
				}
			});
			chart.intervalStack().position('year*percent').color('country',['#f0f0f0',
				'l(65) 0:#fbad4a 1:#fe752b',
				'l(65) 0:#719afe 1:#5b59fd',
				'l(65) 0:#eb7cea 1:#bb77f0',
				'l(65) 0:#ff7469 1:#ff3654',
				'l(65) 0:#f8639e 1:#e42c82']).size(18).style({
				shadowColor: '#e9e9e9',
				shadowOffsetX: '5',
				shadowOffsetY: '5',
				shadowBlur: 10
			});
			chart.render();
		}
	})
}
function findDataC6(){
	var defer = $.Deferred();
	$.ajax({
		url: ctxPath + "proxy/openAdapterURL",
		type: 'get',
		dataType: "json",
		data: {
			'url': '/squery/logs/rank/ranking?group=ServletPath&_table=logs_http&limit=5&direction=-1&sort=countTime',
			'method': 'GET'
		},
		error: function(e) {
			$('#c6').parent('.dataSource').html('<div style="height: 152px;width: 100%;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
		}
	}).then(function (res) {
		defer.resolve(res);
	})
	return defer.promise();
}

// 浏览器累计耗时（TOP6）
function initC5() {
	var _DataSet = DataSet, DataView = _DataSet.DataView;
	$.when(findDataC5()).done(function(result){
		if(0 == result.code) {
			if(!result.data.length || 0 == result.data.length) {
				$('#c5').parent('.dataSource').html('<div style="height: 152px;width: 100%;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
				return;
			}
			var dv = new DataView().source(result.data);
			dv.transform({
				type: 'fold',
				// fields: 'countTime', // 展开字段集
				fields: 'maxTime', // 展开字段集
				key: 'user', // key字段
				value: 'score' // value字段
			});
			var chart = new G2.Chart({
				container: 'c5',
				forceFit: true,
				height: 170,
				padding: [10, 40, 20, 40]
			});
			chart.source(dv, {
				score: {
					min: 0,
					// max: 80
				}
			});
			chart.coord('polar', {
				radius: 0.8
			});
			chart.axis('id', {
				line: 'none',
				tickLine: null,
				grid: {
					lineStyle: {
						lineDash: null
					},
					hideFirstLine: false
				}
			});
			chart.axis('score', {
				line: null,
				tickLine: null,
				label: null,
				grid: {
					type: 'polygon',
					lineStyle: {
						lineDash: null
					}
				}
			});
			chart.legend(false);
			//chart.tooltip(false)
			chart.tooltip(true,{
				crosshairs: false,
				itemTpl: '<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>耗时: {value}</li>', // tooltip 每项记录的默认模板

				follow: true
			})
			chart.line().position('id*score').color('l(0) 0:#7299ff 1:#7072fb').size(1);
			chart.point().position('id*score').color('l(0) 0:#7299ff 1:#7072fb').shape('circle').size(4).style({
				stroke: '#fff',
				lineWidth: 1,
				fillOpacity: 0
			});
			chart.coord('polar').rotate(30)
			chart.area().position('id*score').color('user').select(false).active(true);
			chart.render();
		}
	})
}
function findDataC5(){
	var defer = $.Deferred();
	$.ajax({
		url: ctxPath + "proxy/openAdapterURL",
		type: 'get',
		dataType: "json",
		data: {
			'url': '/squery/logs/rank/ranking?group=BrowserName&_table=logs_http&limit=6&direction=-1&sort=countTime',//sort=countTime
			'method': 'GET'
		},
		error: function(e) {
			$('#c5').parent('.dataSource').html('<div style="height: 152px;width: 100%;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
		}
	}).then(function (res) {
		defer.resolve(res);
	})
	return defer.promise();
}

// 操作系统累计耗时
function initC4() {
	// 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
	var sliceNumber = 0.02;
	// 自定义 other 的图形，增加两条线
	G2.Shape.registerShape('interval', 'sliceShape', {
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

				}
			});
		}
	});

	var chart = new G2.Chart({
		container: 'c4',
		forceFit: true,
		padding: ['auto', 'auto', 20, 'auto'],
		height: 152
	});
	$.when(findDataC4()).done(function(result){
		if(0 == result.code) {
			if(!result.data.length || 0 == result.data.length) {
				$('#c4').parent('.dataSource').html('<div style="height: 152px;width: 100%;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
				return;
			}
			chart.source(result.data);
			chart.coord('theta', {
				innerRadius: 0.75
			});
			chart.tooltip(false);
			chart.legend(false);
			// chart.guide().html({
			//     position: ['50%', '50%'],
			//     html: '<div style="color:#8c8c8c;font-size: 20px;text-align: center;width: 10em;">3289<br><span style="color:#8c8c8c;font-size:14px">总用户</span></div>',
			// });
			chart.intervalStack().position('countTime').color('id',["l(45) 0:#fe8478 1:#fe6c83",
				"l(45) 0:#c55ff9 1:#b152fd",
				"l(45) 0:#729efe 1:#71c2fe"]).shape('sliceShape').select(false);

			chart.render();
			$('#operatingSystem').empty();
			for(var i = 0; i< result.data.length; i++) {
				var str = '<li>';
				str += '<span></span>';
				str += '<div style="flex: 1;line-height: 1.5;">';
				str += '<div>'+result.data[i].id+'</div>';
				str += '<div>'+result.data[i].countTime+'</div>';
				str += '</div>';
				str += '</li>';
				$('#operatingSystem').append(str)
			}

		}
	})
}
function findDataC4(){
	var defer = $.Deferred();
	$.ajax({
		url: ctxPath + "proxy/openAdapterURL",
		type: 'get',
		dataType: "json",
		data: {
			'url': '/squery/logs/rank/ranking?group=OSName&_table=logs_http&limit=3&direction=-1&sort=countTime',
			'method': 'GET'
		},
		error: function(e) {
			$('#c4').parent('.dataSource').html('<div style="height: 152px;width: 100%;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
		}
	}).then(function (res) {
		defer.resolve(res);
	})
	return defer.promise();
}




// 用户管理
function initC3() {
	// 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
	var sliceNumber = 0.02;
	// 自定义 other 的图形，增加两条线
	G2.Shape.registerShape('interval', 'sliceShape', {
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

				}
			});
		}
	});
	var chart = new G2.Chart({
		container: 'c3',
		forceFit: true,
		padding: ['auto', 'auto', 20, 'auto'],
		height: 202
	});
	// /用户统计数量
	$.when(
		// 教师
		findDataC3('xxtb_yeyrypbxx'),
		// 学生
		findDataC3('basic_youer'),
		// 家长
		findDataC3('xxtb_yeyxzcgglxx'),
		// 食堂人数
		findDataC3('xxtb_stgzryxxgl')
	).done(function(result1,result2,result3,result4){

		if(undefined == result1.data.typeof) {result1.data = 0}
		if(undefined == result2.data.typeof) {result2.data = 0}
		if(undefined == result3.data.typeof) {result3.data = 0}
		if(undefined == result4.data.typeof) {result4.data = 0}

		var allNum = 0;
		$('#userManagement').append('<li><span></span><div class="_c2">教师</div><div class="_c1">' + result1.data + '</div><div class="_c2">人</div></li>');
		$('#userManagement').append('<li><span></span><div class="_c2">学生</div><div class="_c1">' + result2.data + '</div><div class="_c2">人</div></li>');
		$('#userManagement').append('<li><span></span><div class="_c2">家长</div><div class="_c1">' + result3.data + '</div><div class="_c2">人</div></li>');
		$('#userManagement').append('<li><span></span><div class="_c2">食堂人员</div><div class="_c1">' + result4.data + '</div><div class="_c2">人</div></li>');
		var data = [{
			type: '教师',
			value: parseInt(result1.data)
		}, {
			type: '学生',
			value: parseInt(result2.data)
		}, {
			type: '家长',
			value: parseInt(result3.data)
		}, {
			type: '食堂人员',
			value: parseInt(result4.data)
		}];
		allNum += (parseInt(result1.data) + parseInt(result2.data) + parseInt(result3.data) + parseInt(result4.data))
		chart.source(data);
		chart.coord('theta', {
			radius:0.9,
			innerRadius: 0.85
		});
		chart.tooltip({
			showTitle: false
		});
		chart.legend(false);
		chart.guide().html({
			position: ['50%', '50%'],
			html: '<div style="color:#8c8c8c;font-size: 20px;text-align: center;width: 10em;">'+allNum+'<br><span style="color:#8c8c8c;font-size:14px">总用户</span></div>',
		});
		chart.intervalStack().position('value').color('type',["l(45) 0:#fe9e68 1:#f6c355",
			"l(45) 0:#736cfd 1:#6bb1fe",
			"l(45) 0:#a771f9 1:#e56af8",
			"l(45) 0:#ff9486 1:#fe9381"]).shape('sliceShape').select(false);
		chart.render();
	})
}
function findDataC3(table){
	var defer = $.Deferred();
	$.ajax({
		url: ctxPath + "proxy/openBasicsURL",
		type: 'get',
		dataType: "json",
		data: {
			'url': encodeURI('/form/' + table + '/count?site[EQ]=' + siteid),
			'method': 'GET'
		},
		error: function(e) {
			$('#c3').parent('.dataSource').html('<div style="height: 202px;width: 100%;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
		}
	}).then(function (res) {
		defer.resolve(res);
	})
	return defer.promise();

}



// 攻击趋势统计
function initC2() {
    var day = new Date();
    var s1 = day.format("yyyy-MM-dd");
    day.setDate(day.getDate() - 12);
    var s2 = day.format("yyyy-MM-dd");
    var data = [];
	$.ajax({
		url: _url.securityUrl + '/Main/getAnalysisAttackLine?start_time=' + s2 + '&end_time=' + s1,
		type: 'get',
        dataType: 'json',
        async: false,
		data: {},
		error: function(e) {
			$('#c2').html('<div style="height: 290px;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
		}
	}).then(function (res) {
        var xAxis = res.xAxis
        // 系统应用异常
        var appExceptionList = res.appExceptionList
        // 下载非法文件
        var fileDownloadList = res.fileDownloadList
        // 不常见的HTTP请求
        var httpMethodList = res.httpMethodList
        // 参数规则不匹配
        var paramMatchList = res.paramMatchList
        // SQL注入攻击
        var sqlInjectList = res.sqlInjectList
        // XSS跨站攻击
        var xssInjectList = res.xssInjectList
		if(!xAxis.length || 0 == xAxis.length) {
			$('#c2').html('<div style="height: 370px;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
			return;
		}
        for(var i=0; i<xAxis.length; i++) {
            var _app = {}, Tdata = xAxis[i].split('-');
            xAxis[i] = Tdata[1] + '/' + Tdata[2]
            //2019-09-25

            _app.company = '系统应用异常'
            _app.type = xAxis[i]
            _app.value = parseInt(appExceptionList[i])
            data.push(_app)

            var _file = {}
            _file.company = '下载非法文件'
            _file.type = xAxis[i]
            _file.value = parseInt(fileDownloadList[i])
            data.push(_file)

            var _http = {}
            _http.company = '不常见的HTTP请求'
            _http.type = xAxis[i]
            _http.value = parseInt(httpMethodList[i])
            data.push(_http)

            var _param = {}
            _param.company = '参数规则不匹配'
            _param.type = xAxis[i]
            _param.value = parseInt(paramMatchList[i])
            data.push(_param)

            var _sql = {}
            _sql.company = 'SQL注入攻击'
            _sql.type = xAxis[i]
            _sql.value = parseInt(sqlInjectList[i])
            data.push(_sql)

            var _xss = {}
            _xss.company = 'XSS跨站攻击'
            _xss.type = xAxis[i]
            _xss.value = parseInt(xssInjectList[i])
            data.push(_xss)
        }
	})
	var chart = new G2.Chart({
		container: 'c2',
		forceFit: true,
		height: 370,
		padding: ['auto', 'auto', 40, 'auto']
	});
	chart.source(data);
	chart.scale('value', {
		alias: '占比（%）',
		// max: 75,
		min: 0,
		tickCount: 6
	});
	chart.axis('type', {
		label: {
			textStyle: {
				fill: '#aaaaaa'
			}
		},
		tickLine: {
			alignWithLabel: false,
			length: 0
		}
	});

	chart.axis('value', {
		label: {
			textStyle: {
				fill: '#aaaaaa'
			}
		},
		title: {
			offset: 80
		}
	});
	chart.legend({
		position: 'top-center'
	});
	chart.interval().position('type*value').color('company',['l(0) 0:#fd9143 1:#fd9a49',
        'l(0) 0:#fd6280 1:#ff6975',
        'l(0) 0:#d977d9 1:#d57bed',
        'l(0) 0:#6572fe 1:#6b6bfb']).opacity(1).adjust([{
		type: 'dodge',
		marginRatio: 1 / 6
	}]);
	chart.render();
}


// 攻击趋势统计
function initC1() {
    // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
    var sliceNumber = -0.03;
    // 自定义 other 的图形，增加两条线
    G2.Shape.registerShape('interval', 'sliceShape', {
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
                    path: path,
                }
            });
        }
    });
    var data = [], totalNum = 0;
    $.ajax({
        url: _url.securityUrl + '/Main/getAnalysisAttackPie',
        type: 'get',
        dataType: 'json',
        async: false,
        data: {},
		error: function(e) {
			$('#c1').html('<div style="height: 150px;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
		}
    }).then(function (res) {
    	if(!res.piedata.length || 0 == res.piedata.length) {
			$('#c1').html('<div style="height: 150px;display: flex; justify-content: center; align-items: center;">暂无数据</div>')
			return;
		}
        for(var i=0; i<res.piedata.length; i++) {
            if(res.piedata[i].name == '系统应用异常' || res.piedata[i].name == '参数规则不匹配') {
                continue;
            }
            totalNum += res.piedata[i].value
            res.piedata[i].type = res.piedata[i].name
            data.push(res.piedata[i])
        }
    })
    var chart = new G2.Chart({
        container: 'c1',
        forceFit: true,
        height: 150,
        padding: [10, 100, 10, -20]
    });
    chart.source(data);
    chart.legend({
        position: 'top',
    });
    // chart.legend(false);
    chart.facet('rect', {
        fields: ['type'],
        padding: 20,
        showTitle: false,
        eachView: function eachView(view, facet) {
            var data = facet.data;
            var color = void 0;
            if (data[0].type === '不常见的HTTP请求') {
                color = "l(90) 0:#ff955c 1:#f9b45e";
            } else if (data[0].type === 'SQL注入攻击') {
                color = "l(90) 0:#fe937f 1:#fe7486";
            } else if (data[0].type === '下载非法文件') {
                color = "l(90) 0:#db6bf8 1:#aa55ff";
            } else if (data[0].type === 'XSS跨站攻击') {
                color = "l(90) 0:#6e69fa 1:#6c98ff";
            } else {
                color = "l(90) 0:#ffffff 1:#000000";
            }
            data.push({
                type: '其他1',
                value: totalNum - data[0].value
            });
            view.source(data);
            view.coord('theta', {
                radius: 0.85,
                innerRadius: 0.75
            });
            chart.tooltip(false);
            view.intervalStack().position('value').color('type', [color, '#eceef1']).opacity(1)
                .shape('sliceShape')
                .select(false)
                .active(false);
            view.guide().html({
                position: ['105%', '50%'],
				offset:[10, 0],
                html: '<div class="g2-guide-html-c1" style="width: auto;overflow: hidden;"><p class="title" style="white-space: nowrap;">'
                    + data[0].type
                    + '</p><p class="value" style="font-size: 18px;">'
                    + (data[0].value)
                    + '</p></div>'
            });
        }
    });
    chart.render();
}
// 攻击趋势统计 -- 查看更多
function openMore() {
    window.open(_url.securityUrl);
}

// 最新攻击动态
function newAttack() {
	$.ajax({
		url: _url.securityUrl + '/Main/getAnalysisAttackNew',
		type: 'get',
		dataType: 'json',
		data: {}
	}).then(function (res) {
		var sum = 0;
		if(!res.data.length || 0 == res.data.length) {
			$('#newAttack').append('<li>暂无数据</li>');
			return
		}
		for(var i = 0;i < res.data.length; i++) {
			var data = res.data[i];
			if('系统应用异常'==data.attack_name||sum>=5){
				continue;
			}
			var str = '<li>';
			str += '<div class="icon '+(data.attack_name.indexOf('HTTP')>-1?'_http':'_sql')+'">' + (data.attack_name.indexOf('HTTP')>-1?'HTTP':'SQL') + '</div>';
			str += '<div class="_center">';
			str += '<div class="_name"><font>' + data.server_name + '</font> 站点受到 <font>' + data.attack_name + '</font> 攻击</div>';
			str += '<div class="_time">' + data.attack_time + '</div>';
			str += '</div>';
			str += '</li>';
			$('#newAttack').append(str);
			sum += 1;
		}
	})
}

// 受攻击统计
function attacked() {
	$.ajax({
		url: _url.securityUrl + '/Main/getAnalysisAttackTop10',
		type: 'get',
		dataType: 'json',
		data: {},
		error: function(e) {
			$('#attacked').append('<tr><td colspan="6">暂无数据</td></tr>');
		}
	}).then(function (res) {
		var sum = 0;
		if(!res.data.length || 0 == res.data.length) {
			$('#attacked').append('<tr><td colspan="6">暂无数据</td></tr>');
			return
		}
		for(var i = 0;i < res.data.length; i++) {
            if(sum >= 5){
                // continue;
                break;
            }
			var data = res.data[i];
			var str = '<tr>';
			str += '<td>' + (i+1) + '</td>';
			str += '<td title="'+ data.site_name +'">' + data.site_name + '</td>';
			str += '<td title="'+data.server_name+'">' + data.server_name + '</td>';
			str += '<td title="'+data.app_name+'">' + data.app_name + '</td>';
			str += '<td title="'+data.attack_name+'">' + data.attack_name + '</td>';
			str += '<td>' + data.attack_num + '</td>';
			str += '</tr>';
			$('#attacked').append(str);
			sum += 1;
		}
	})
}

function currentSite() {
    // 获得站点数
    $.post(_url.securityUrl + "/Main/getSiteNum", {}, function(result) {
        loadNum(result,"#siteNum");
        // result.toString().length
        // $("#siteNum").html(result)
    }, "json");

    // 获得服务器数
    $.post(_url.securityUrl + "/Main/getServerNum", {}, function(result) {
        loadNum(result,"#serverNum");
    }, "json");

    // 获得应用数
    $.post(_url.securityUrl + "/Main/getAppNum", {}, function(result) {
        loadNum(result,"#appNum");
    }, "json");

    // 获得攻击总数
    $.post(_url.securityUrl + "/Main/getAttackSummaryNum", {}, function(result) {
        loadNum(result,"#attackSummaryNum");
    }, "json");
}
function loadNum(result, id) {
    $(id).find('.num').html(result)
    var len = result.toString().length
    $(id).find('.speed-item').width(len*10+'%')
}

// SQL执行累计耗时（TOP5）
function logs_sql() {
	$.ajax({
		url: ctxPath + "proxy/openAdapterURL",
		type: 'get',
		dataType: "json",
		data: {
			'url': '/squery/logs/rank/ranking?group=Sql&_table=logs_sql&limit=5&direction=-1&sort=countTime',
			'method': 'GET'
		},
		error: function(e) {
			$('#logs_sql').append('<li style="height: 130px;width: 100%;display: flex;justify-content: center;align-items: center;">暂无数据</li>')
		}
	}).then(function (res) {
		if(!res.data.length || 0 == res.data.length) {
			$('#logs_sql').append('<li style="height: 130px;width: 100%;display: flex;justify-content: center;align-items: center;">暂无数据</li>')
		}
		for(var i = 0; i < res.data.length; i++) {
			$('#logs_sql').append('<li><span class="user-dot t'+((i+1)>=3?3:(i+1))+'"></span><div>'+res.data[i].id+'</div></li>')
		}
	})
}
// 服务器监控（适配器）
function adapter() {
	$.ajax({
		url: ctxPath + "proxy/openAdapterURL",
		type: 'get',
		dataType: "json",
		data: {
			'url': '/ccc/appmon/list',
			'method': 'GET'
		},
		error: function(e) {
			$('#adapter').append('<tr><td colspan="5">暂无数据</td></tr>');
		}
	}).then(function (res) {
		var showIndex = 0;
		if(!res.data.length || 0 == res.data.length) {
			$('#adapter').append('<tr><td colspan="5">暂无数据</td></tr>');
			return
		}
		for(var i = 0; i < res.data.length; i++) {
			if(showIndex>=2){
				break;
			}
			var str = '<tr>';
			str += '<td>' + (i + 1) + '</td>';
			str += '<td>'+res.data[i].name+'</td>';
			str += '<td>'+res.data[i].adapterIp+'</td>';
			// str += '<td>'+res.data[i].port+'</td>';
			str += '<td>'+res.data[i].scheme+'</td>';
			str += '<td>'+(res.data[i].adapter[0].online==1?"<span style=\"color:green;\">在线</span>":"<span style=\"color:red;\">离线</span>")+'</td>';
			str += '</tr>';
			$('#adapter').append(str);
			showIndex += 1;
		}
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