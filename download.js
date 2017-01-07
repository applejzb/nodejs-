var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');
var baseUrl="http://www.mzitu.com/zipai/comment-page-";
var urlArr=[];
for(var j=1;j<=241;j++){
	urlArr.push(j)
}
// 抓取整站页面
function getImgae(url){
	// Promise对象，可以将异步操作以同步操作的流程表达出来
	return new Promise(function(resolve,reject){
		http.get(url, function(res) {
			var data = '';
			res.on('data', function(chunk) {
				data += chunk;
			})
			res.on('end', function() {
				resolve(data);
			})
			res.on('error',function(e){
				reject(e);
				console.log('获取课程数据出错');
			})
		})
	})
}

var urlF=[];
// 获取的所有的promise实例对象
urlArr.forEach(function(id){
	urlF.push(getImgae(baseUrl + id));
})

// 抓取所有图片的地址
Promise.all(urlF).then(function(pages){
	var imgArr = [];
	pages.forEach(function(page){
		//console.log(data);
		var $ = cheerio.load(page);
		$(page).find('img').each(function(i, e) {
			imgArr.push($(e).attr('src'));
		});
	})
	console.log(imgArr.length);
	download(imgArr);
})

var i = 0;
// 下载所有图片
function download(resource) {
	var length = resource.length;
	var writerStream = fs.createWriteStream('image/' + i + '.jpg');
	http.get(resource[i], function(res) {
		res.pipe(writerStream);
	})
	writerStream.on('finish', function() {
		if(i <length) {
			i++;
			download(resource);
		} else {
			return;
		}
		console.log("第" + i + '/' + length + "张下载成功")
	})
}