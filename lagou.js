var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');
var querystring=require('querystring');

var dataArr=[]
var i=1;
function getAllData(){
	if(i<=24){
		var postData=querystring.stringify({
			"first":false,
			"pn":i,
			"kd":"web前端"
		});
	}else{
		return;
	}
	dataArr.push(getAllMess(postData));
	i++;
	getAllData();
}
getAllData();

http.createServer(function(req,res){
	res.setHeader('Access-Control-Allow-Origin', '*');
	Promise.all(dataArr).then(function(data){
		res.write(JSON.stringify(data));
    	res.end()
	},function(error){
		console.log(error);
	})
}).listen(12345)

function getAllMess(query){
	return new Promise(function(resolve,reject){
		var options={
			hostname:'www.lagou.com',
			port:80,
			method:'POST',
			path:'/jobs/positionAjax.json?px=default&city=%E6%B7%B1%E5%9C%B3&needAddtionalResult=false',
			headers:{
				'Accept':'application/json, text/javascript, */*; q=0.01',
				'Accept-Encoding':'gzip, deflate',
				'Accept-Language':'zh-CN,zh;q=0.8,und;q=0.6',
				'Connection':'keep-alive',
				'Content-Length':query.length,
				'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
				'Cookie':'user_trace_token=20161216222217-6c03026bb17f414f94d3cedfefaf2c40; LGUID=20161216222219-0d8e009b-c39b-11e6-bdee-5254005c3644; _gat=1; PRE_UTM=m_cf_cpc_baidu_pc; PRE_HOST=www.baidu.com; PRE_SITE=https%3A%2F%2Fwww.baidu.com%2Fbaidu.php%3Fsc.K000000fJeHuq9k18nF8VoPUadV3NYNLbijS6S6OcbyxaAKjLgb1VhYvlzN2OhflqBwEJjd39nFvMcC-0CFNIuQr3HlYoB0-0mndvwtoHtO9tuV_mwn3PEr57SmS6xVRr-wWnqwirpR8WovBAJV3K5ZdjqOYeCI7ZTo_B7Lu_UxpWFScC6.DY_NR2Ar5Od66k_kk3LHR52B1JI6wKwksNRPPAa7vMilQMLsRP5QAeKPa-WHzslSyZZjzL_3_ZQW9llXgV3AQvTyj-9kst_IgjNz42qMu8_4xZ__dsst8Z1lT5o33xyEj4e_rO3T5okONsSxH9vX8ZuEsSXej_qT5o43x5ksSEzseldBmovyuPqIhH-TMHzLp-9h9m3SrHWyC0.U1Yk0ZDqs2v4_eMu1x60IjLFeVEpFHcss2v4VnL30A-V5HczPfKM5gN-rH00Iybqmh7GuZN_UfKspyfqP0KWpyfqrHn0UgfqnH0YP7tknjDLg1DsnH-xn1msnfKopHYs0ZFY5HT4n6K-pyfq0AFG5HcsP7tkPHR0UynqnH0zg1nsrjnzP1c4nNt1nj61nWT1njPxn0KkTA-b5H00TyPGujYs0ZFMIA7M5H00ULu_5HcvPWbVuZGxnWmvrN6VuZGxPWDLPiYkg1mvnjbVnH0snjD0mycqn7ts0ANzu1Ys0ZKs5HDsn1RdPjDsPjm0UMus5H08nj0snj0snj00Ugws5H00uAwETjYs0ZFJ5H00uANv5gKW0AuY5H00TA6qn0KET1Ys0AFL5HDs0A4Y5H00TLCq0ZwdT1YzPjbYrHTsrj01PHcYnWmsn1nv0ZF-TgfqnHf3n1mzn1cLnHn1P6K1pyfqm1nLn1KBuHRsnj0knjfsP6KWTvYqwHn1nWD1nWujPjuDfHPKPfK9m1Yk0ZK85H00TydY5H00Tyd15H00XMfqn1ndPHfYn1n0UyPxuMFEUHYknjfvg1Kxn7ts0AwYpyfqn0K-IA-b5iYk0A71TAPW5H00IgKGUhPW5H00Tydh5H00uhPdIjYs0AulpjYs0ZGsUZN15H00mywhUA7M5HD0mLFW5HcYnjn1%26ck%3D1759.6.112.298.148.196.146.264%26shh%3Dwww.baidu.com%26sht%3D18029102_oem_dg%26us%3D1.0.1.0.1.301.0.0%26wd%3D%25E6%258B%2589%25E9%2592%25A9%25E5%25AE%2598%25E7%25BD%2591%26issp%3D1%26f%3D3%26ie%3Dutf-8%26rqlang%3Dcn%26tn%3D18029102_oem_dg%26inputT%3D2962%26prefixsug%3D%25E6%258B%2589%25E9%2592%25A9%26rsp%3D2%26bc%3D110101; PRE_LAND=https%3A%2F%2Fpassport.lagou.com%2Flp%2Fhtml%2Fcommon.html%3Futm_source%3Dm_cf_cpc_baidu_pc%26m_kw%3Dbaidu_cpc_shzh_218450_740fcc_%25E6%25B7%25B1%25E5%259C%25B3%2B%25E6%258B%2589%25E5%258B%25BE%25E7%25BD%2591; JSESSIONID=FCF9CCBFD6E8EB4DE7A4CB7CB50AE3D2; index_location_city=%E6%B7%B1%E5%9C%B3; SEARCH_ID=a5462e6aea99481695037fae36f532a4; _ga=GA1.2.379105841.1481898124; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1483623255,1483623264,1483623270,1483623445; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1483623485; LGSID=20170105213437-b3cbd41a-d34b-11e6-96c5-525400f775ce; LGRID=20170105213825-3c0d7970-d34c-11e6-8b4c-5254005c3644; TG-TRACK-CODE=search_code',
				'Host':'www.lagou.com',
				'Origin':'https://www.lagou.com',
				'Referer':'https://www.lagou.com/jobs/list_web%E5%89%8D%E7%AB%AF?px=default&city=%E6%B7%B1%E5%9C%B3',
				'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
				'X-Anit-Forge-Code':0,
				'X-Anit-Forge-Token':'None',
				'X-Requested-With':'XMLHttpRequest'
			}
		}
		var req=http.request(options,function(res){
			var mes=""
			res.on('data',function(chunk){
				// 获取的数据是buffer数据流，所有要转换
				mes+=chunk.toString();
			})
			res.on('end',function(){

				resolve(JSON.parse(mes));
				console.log(JSON.parse(mes));
			})
		});

		req.write(query);

		req.end();
	})
}



