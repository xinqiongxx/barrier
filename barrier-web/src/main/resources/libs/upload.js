function initImgUpload(){
	
	// 预览图片容器
	var $list = $("#icon_control");
	// 缩略图相关
	var ratio = window.devicePixelRatio || 1;
	var thumbnailWidth = 80 * ratio;
	var thumbnailHeight = 80 * ratio;
	
	// 获取上传必要参数
	var server= ctxPath + "file/load";
	var swf = "/libs/js/webuploader/Uploader.swf";
	var chunkSize;
	// 初始化webuploader控件
	uploader = WebUploader.create({
		// swf文件路径
		swf : swf,
		// 文件接收服务端。
		server : server,
		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		// pick : '#thelist',
		pick:{
			id:'#thelist',
			multiple: false
		},
		fileNumLimit : 1,
		fileSingleSizeLimit : 3*1024*1024,
		// 分片相关
		chunked : true,
		// 分片大小
		chunkSize : chunkSize,
		// 失败后重试次数
		chunkRetry : 0,
		// 多线程上传的线程数
		threads : 1,
		duplicate : true,
		prepareNextFile : true,
		// 自动上传
		auto : false,
		// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
		resize : false,
		// 使用二进制发送数据  这个不要修改
		sendAsBinary : true,
		method: 'post',
		accept: {
		    title: 'Images',
		    extensions: 'jpg,jpeg,bmp,png,gif',
		    // mimeTypes: 'multipart/form-data;image/png'
		    mimeTypes: 'image/jpg,image/jpeg,image/bmp,image/png,image/gif'
		}
	});
	
	// 上传错误
	uploader.on('error', function(type) {
		if('Q_EXCEED_NUM_LIMIT'==type){
			layer.msg("文件数量超出",{shift:6,icon:5,time:1200},function(){});
		}else if('Q_TYPE_DENIED'==type){
			layer.msg("文件类型不正确",{shift:6,icon:5,time:1200},function(){});
		}else if('F_EXCEED_SIZE'==type){
			layer.msg("文件过大",{shift:6,icon:5,time:1200},function(){});
		}
	});
	
	
	// 文件被加入队列之前
	uploader.on('beforeFileQueued', function(file) {
		// 更换图片
		var curFileNum = uploader.getFiles().length;
		if(curFileNum>=1){
			// 重置队列
		    uploader.removeFile(file);
		}
	});
	//当有文件被添加进队列的时候
	uploader.on('fileQueued', function(file) {
		// 成功显示图片
		uploader.makeThumb( file, function( error, src ) {
			if ( error ) {
			    $list.text( '不能预览' );
			    return;
			}
			var img = $('<img src="'+src+'" class="imgMaxW110H110" style="height:80px;">');
		    $("#icon_control").html(img);
		}, thumbnailWidth, thumbnailHeight );
	});	
	//上传成功
	uploader.on('uploadSuccess', function(file,response) {
		console.log('---------')
		console.log('---------')
		if(0 == response.code){
			$("#icon").val(response.data);
			add();
		}
	});
	
	//上传失败
	uploader.on('uploadError', function(file, reason) {

		console.log(file)
		console.log(reason)

	});
	//上传完成后--无论成功/失败
	uploader.on('uploadComplete', function(file) {
		// 重置上传
		uploader.reset();
	});	
}