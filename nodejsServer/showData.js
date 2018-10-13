var myChart1 = echarts.init(document.getElementById('main1'),'vintage');

// 获取地址栏中作为参数的经过编码的url
function getUrlInParameter(){
    var arg=window.location.search.substr(5);
    // 参数解析
    newurl=decodeURIComponent(arg);
	return newurl;
}
// 按照参数名获取url中参数
function getQueryString(newurl, name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = newurl.substr(newurl.indexOf('?')).substr(1).match(reg);  
    if (r != null) return unescape(r[2]);  
    return null;  
}
// 在json对象中，通过key获取对应value
function getValue(JSONobj, key){
    return JSONobj[''+key+''];
}
function genData1(data, newurl){
    var dimisions = [];
    var categories = [];

    var classifyAttributeName = getQueryString(newurl, 'classifyAttributeName');
    console.log("classifyAttributeName = "+classifyAttributeName);

    var count = 0;
    var classifyIndex = 0;
    $.each(data.data[0], function(i){
        dimisions.push(i);
    });
    
    for(var i in data.data){
        var item=getValue(data.data[i],classifyAttributeName);
        var flag = 1;
        for(var j=0; j<categories.length; j++){
            if(item==categories[j]){
                flag = 0;
                break;
            }
        }
        if(flag==1){
            categories.push(item);
        }
    }
    console.log("categories = "+categories);
    return{
        datasetSource:data.data, //url返回的数据
        dimisions:dimisions, // 数据的key，如'a','b','c','classify'
        classifyAttributeName:classifyAttributeName,
        categories:categories // 分类属性
    };
}

$(document).ready(function(){
    newurl = getUrlInParameter();
    myChart1.showLoading();
    
    $.get(newurl, function (data) {
        var datastr = JSON.stringify(data);
        var html = '<ul><p>'+datastr+'<ul>';
        $('#div1').html(html);
        $("p").hide();

        data1 = genData1(data,newurl);
        
        var symbolSize = 20;
        myChart1.hideLoading();
        myChart1.setOption({
            dataset: {
                dimensions: data1.dimensions,
                source: data1.datasetSource
            },
            xAxis3D: {
                type: 'value'
            },
            yAxis3D: {
                type: 'value'
            },
            zAxis3D: {
                type: 'value'
            },
            grid3D: {
                axisLine: {
                    lineStyle: {
                        color: '#ffbd67'
                    }
                },
                axisPointer: {
                    lineStyle: {
                        color: '#ffbd67'
                    }
                },
                viewControl: {
                    autoRotate: true, //自动转动
                    // projection: 'orthographic'
                }
            },
            series: [
                {
                    type: 'scatter3D',
                    symbolSize: symbolSize,
                    encode: {
                        x: 0,
                        y: 1,
                        z: 2,
                        tooltip: [0, 1, 2, 3]
                    },
                    itemStyle: {
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.8)'
                    },
                }
            ],
            visualMap: {
                // type: 'piecewise', // 定义为分段型 visualMap
                categories: data1.categories
                // dimension:data1.classifyAttributeName
            }
        });

    });
    $("#retu").click(function(){
		window.history.back();  //返回上一页
	});
    $("#show").click(function(){
		$("p").toggle();
	});
});
