// 爬取慕课网一个课程的大纲
var http=require('http');
var cheerio=require('cheerio');
var url='http://www.imooc.com/learn/348';

function filterData(html){
	var $ = cheerio.load(html);
	var chapters=$('.chapter');
	var mess=[];
	chapters.each(function(item){
		var chaptersTitle=$(this).find('strong').text();
		var videos=$(this).find('.video li');
		var obj={
			chaptersTitle:chaptersTitle,
			videos:[]
		}
		videos.each(function(item){
			var oA=$(this).find('a');
			var title=oA.text();
			var videoHerf=oA.attr('href').split('video/')[1];
			obj.videos.push({
				title:title,
				videoHerf:videoHerf
			})
		})
		mess.push(obj);
	})
	return mess;
}

function printCourseInfo(mess){
	mess.forEach(function(ele){
		var chaptersTitle=ele.chaptersTitle.replace(/ /g,"");
		console.log(chaptersTitle);
		var chapterscontent=ele.videos;

		chapterscontent.forEach(function(item){
			console.log(item.title.replace(/ /g,""));
			console.log(item.videoHerf.replace(/ /g,""));
		})
	})
}


http.get(url,function(res){
	var html='';
	//监听是否有数据响应
	res.on('data',function(data){
		html+=data;
	})
	//监听数据响应是否结束
	res.on('end',function(){
		var mess=filterData(html);
		printCourseInfo(mess);
	})

	res.on('error',function(){
		 console.log('获取课程数据出错');
	})
})
