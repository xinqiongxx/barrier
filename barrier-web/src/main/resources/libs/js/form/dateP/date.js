// JavaScript Document
/********************日期控件************************/
	    function SetTimePicker(id, cb) {
	        var stime = moment($('#' + id).val()).format('YYYY/MM/DD HH:mm');
	        var etime = moment($('#' + id).val()).format('YYYY/MM/DD HH:mm');
	        if (!$('#' + id).val()) {
	            stime = moment(new Date().getTime()).format('YYYY/MM/DD HH:mm');
	            etime = moment(new Date().getTime()).format('YYYY/MM/DD HH:mm');
	        }
	        var optionSet = {
	            startDate: stime,
	            endDate: etime,
	            singleDatePicker: true,
	            timePicker: true,
	            timePicker12Hour: false,
	            format: 'YYYY-MM-DD HH:mm',
	            locale: {
	                applyLabel: '确定',
	                cancelLabel: '取消',
	                fromLabel: '开始日期 ',
	                toLabel: '结束日期',
	                customRangeLabel: '自定义',
	                daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
	                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	                firstDay: 1
	            }
	        };
	        $('#' + id).daterangepicker(optionSet, cb);
	    }

	    function SetDatePicker(id, cb) {
	        var stime = moment($('#' + id).val()).format('YYYY/MM/DD');
	        var etime = moment($('#' + id).val()).format('YYYY/MM/DD');
	        if (!$('#' + id).val()) {
	            stime = moment(new Date().getTime()).format('YYYY/MM/DD');
	            etime = moment(new Date().getTime()).format('YYYY/MM/DD');
	        }
	        var optionSet = {
	            startDate: stime,
	            endDate: etime,
	            singleDatePicker: true,
	            format: 'YYYY/MM/DD',
	            locale: {
	                applyLabel: '确定',
	                cancelLabel: '取消',
	                fromLabel: '从',
	                toLabel: '到',
	                customRangeLabel: '自定义',
	                daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
	                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	                firstDay: 1
	            }
	        };
	        $('#' + id).daterangepicker(optionSet, cb);
	    }

	    function SetDateRangePicker(id,cb) {
	    	
	        var date = $('#' + id).val();

	        var sDate = '';
	        var eDate= '';
	        if (date && date !='选择时间') {
	            var dates = date.split('-');
	            if (dates.length > 0) {
	                sDate = moment(dates[0]);
	                if (dates.length > 1) {
	                    eDate = moment(dates[1]);
	                } else {
	                    eDate = moment(sDate).subtract('days', -29);
	                }
	            } else {
	                sDate = moment().subtract('days', 29);
	                eDate = moment();
	            }
	        } else {
	            sDate = moment().subtract('days', 29);
	            eDate = moment();

	        }
	        var optionSet = {
	            startDate: sDate,
	            endDate: eDate,
	            opens: 'right',
	            buttonClasses: ['btn btn-default'],
	            applyClass: 'btn-comm btn-primary',
	            cancelClass: 'btn-small',
	            format: 'YYYY/MM/DD',
	            locale: {
	                applyLabel: '选中',
	                cancelLabel: '取消',
	                fromLabel: '开始日期 ',
	                toLabel: '结束日期',
	                customRangeLabel: '自定义',
	                daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
	                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	                firstDay: 1
	            }
	        };
	        $('#' + id).daterangepicker(optionSet, cb);
	    }
	    function SetDateRangePickerAll(id, cb) {
	        var date = $('#' + id).val();
	       
	        var sDate = '';
	        var eDate = '';
	        if (date) {
	            var dates = date.split('-');
	            if (dates.length > 0) {
	                sDate = moment(dates[0]);
	                if (dates.length > 1) {
	                    eDate = moment(dates[1]);
	                } else {
	                    eDate = moment(sDate).subtract('days', -29);
	                }
	            } else {
	                sDate = moment().subtract('days', 29);
	                eDate = moment();
	            }
	        } else {
	            sDate = moment().subtract('days', 29);
	            eDate = moment();

	        }
	        var optionSet = {
	            startDate: sDate,
	            endDate: eDate,
	            ranges: {
	                '今天': [moment(), moment()],
	                '昨天': [moment().subtract('days', 1), moment().subtract('days', 1)],
	                '最近七天': [moment().subtract('days', 6), moment()],
	                '最近一月': [moment().subtract('days', 29), moment()],
	                '本月': [moment().startOf('month'), moment().endOf('month')],
	                '上月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
	            },
	            opens: 'left',
	            buttonClasses: ['btn btn-default'],
	            applyClass: 'btn-small btn-primary',
	            cancelClass: 'btn-small',
	            format: 'YYYY/MM/DD',
	            locale: {
	                applyLabel: '确定',
	                cancelLabel: '取消',
	                fromLabel: '从',
	                toLabel: '到',
	                customRangeLabel: '自定义',
	                daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
	                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	                firstDay: 1
	            }
	        };
	        $('#' + id).daterangepicker(optionSet, cb);
	    }