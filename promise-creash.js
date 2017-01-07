var http=require('http');
var cheerio=require('cheerio');
// 在高版本的node中带有Promise
// 或者是通过bluebird中的Promise
//var Promise = require('bluebird');

var baseUrl='http://www.imooc.com/learn/';
var videoIds = [348, 259, 197, 134, 75];
function getpageAsync(url){
	return new Promise(function(resolve,reject){
		console.log('正在爬取'+url)
		http.get(url,function(res){
			var html='';
			//监听是否有数据响应
			res.on('data',function(data){
				html+=data;
			})
			//监听数据响应是否结束
			res.on('end',function(){
				resolve(html);
			})

			res.on('error',function(e){
				reject(e);
				console.log('获取课程数据出错');
			})
		})
	})
	
}
var fetchCourseArray = [];
videoIds.forEach(function(id) {
    fetchCourseArray.push(getpageAsync(baseUrl + id));
});


Promise.all(fetchCourseArray).then(function(pages){
	var courseData=[];
	pages.forEach(function(html){
		var course=filterData(html);
		courseData.push(course);
	})

	printCourseInfo(courseData)
})


function filterData(html){
	var $ = cheerio.load(html);
	var courseMess={}
	var courseTitle=$('.course-infos .hd h2').text().trim();
	var number=$('.static-item span').eq(1).text().trim();
	var chapters=$('.chapter');
	courseMess.courseTitle=courseTitle;
	courseMess.number=number;
	var mess=[];
	chapters.each(function(item){
		var chaptersTitle=$(this).find('strong').text().trim();
		var videos=$(this).find('.video li');
		var obj={
			chaptersTitle:chaptersTitle,
			videos:[]
		}
		videos.each(function(item){
			var oA=$(this).find('a');
			var title=oA.text().trim();
			var videoHerf=oA.attr('href').split('video/')[1];
			obj.videos.push({
				title:title,
				videoHerf:videoHerf
			})
		})
		mess.push(obj);
	})
	courseMess.mess=mess;
	return courseMess;
}

function printCourseInfo(mess){

	mess.forEach(function(ele){
		console.log(ele.courseTitle);
		console.log(ele.number);
		var courseC=ele.mess;
		courseC.forEach(function(item){
			console.log(item.chaptersTitle);
			var chapterscontent=item.videos;
			chapterscontent.forEach(function(obj){
				console.log(obj.title);
				console.log(obj.videoHerf);
			})
		})
	})
}