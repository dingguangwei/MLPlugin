//################################################################################################
//
//                                     1、创建图表
//
//################################################################################################

//---------------------------------------------------------------------
//                            main2：误差率
//---------------------------------------------------------------------
// 基于准备好的dom，初始化echarts实例
var myChart2 = echarts.init(document.getElementById('main2'),'vintage');

// 指定图表的配置项和数据
var option2 = {
	title: {
		text: '统计量'
	},
	tooltip: {},
	legend: {
		data:[]
	},
	xAxis: {
		data: []
	},
	yAxis: {},
	series: [{
		type: 'bar',
		data: []
	}]
};

// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);

//---------------------------------------------------------------------
//                            main3：正确率饼图
//---------------------------------------------------------------------
var myChart3 = echarts.init(document.getElementById('main3'),'vintage');
// option3 = {
//     series : [
//         {
//             type: 'liquidFill',
//             data: []
//         }
//     ]
// };
// myChart3.setOption(option3);

//---------------------------------------------------------------------
//                            main4：分类情况
//---------------------------------------------------------------------
var myChart4 = echarts.init(document.getElementById('main4'),'vintage');
var option4 = {
	title: {
        text: '分类情况'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: []
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis:  {
        type: 'value'
    },
    series: []
};
myChart4.setOption(option4);

function genData4(arr4name, arr4item, arr4value){
	var nameList = [
        'CorrectRate', 'inCorrectRate'
    ];
    var legendData = []; // a b c d
	var xAxisData = []; // aRepresent00
    var series4 = [];
	//var seriesData = [];
    var selected = {};
    for (var i = 0; i < arr4name.length; i++) {
        xAxisData.push(arr4name[i].substr(11));
    }
	for(var i=0; i<arr4item.length; i++){
		legendData.push(arr4item[i]);
	}
	for(var i=0; i<arr4value.length; i++){
		var item = {
			name: arr4item[i],
			type: 'bar',
			label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
			stack: '总量',
			data: arr4value[i]
		}
		series4.push(item);
	}
	
    return {
        legendData: legendData,
        xAxisData: xAxisData,
		series4:series4
    };
}

//---------------------------------------------------------------------
//                            main6：数据散点图
//---------------------------------------------------------------------
var myChart6 = echarts.init(document.getElementById('main6'),'vintage');

// 在json对象中，通过key获取对应value
function getValue(JSONobj, key){
    return JSONobj[''+key+''];
}
// 按照参数名获取url中参数
function getQueryString(newurl, name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = newurl.substr(newurl.indexOf('?')).substr(1).match(reg);  
    if (r != null) return unescape(r[2]);  
    return null;  
}
// 传入数据集和超平面点集（此处data就是data.data）
function genData6(data, midResult){
	var datasetSource = [];
	var dimisions = [];
    var categories = [];

    var classifyAttributeName = getQueryString(newurl, 'classifyAttributeName');
	console.log("classifyAttributeName = "+classifyAttributeName);
	
	for(var i in data){
		datasetSource.push(data[i]);
	}

	$.each(data[0], function(i){
        dimisions.push(i);
	});
	
	// 获得数据集的所有类别
	for(var i in data){
        var item=getValue(data[i],classifyAttributeName);
		var indexitem = categories.indexOf(item);
		if(indexitem==-1){
			categories.push(item);
		}
    }
	
	// 暂时只写入最后一个超平面的点集
	// 获得超平面所有类别
	var hyperPlane;
	$.each(midResult, function(i){
		if(i=='iterator0'){
			hyperPlane = midResult[i];
			for(var j in midResult[i]){
				var hyperPlaneValue = getValue(midResult[i][j], 'classify');
				var indexi = categories.indexOf(hyperPlaneValue);
				if(indexi==-1){
					categories.push(hyperPlaneValue);
				}
			}
		}	
	});
	
	// var hyperPlane = midresult.iterator5;
	// var hyperPlaneValue = getValue(midResult[i], 'hyperPlane');
	// 	var indexi = categories.indexOf(hyperPlaneValue);
	// 	if(indexi==-1){
	// 		categories.push(hyperPlaneValue);
	// 	}
	
	

	for(var i in hyperPlane){
		datasetSource.push(hyperPlane[i]);
	}
	// console.log("hyperPlane = "+JSON.stringify(hyperPlane));

	// console.log("datasetSource = "+datasetSource);
	console.log("dimisions = "+dimisions);
	console.log("classifyAttributeName = "+classifyAttributeName);
	console.log("categories = "+categories);

	return{
		datasetSource:datasetSource,
		dimisions:dimisions, // 数据的key，如'a','b','c','classify'
		classifyAttributeName:classifyAttributeName,
		categories:categories // 分类属性
	}
}


//################################################################################################
//
//                                     2、设置图表数据
//
//################################################################################################
function getUrlInParameter(){
	var arg=window.location.search.substr(5);
	// 参数解析
	newurl=decodeURIComponent(arg);
	return newurl;
}

$(document).ready(function(){
	newurl=getUrlInParameter();
	$("#p1").text(newurl);
	//http://127.0.0.1:8080/index.html?ref=http%3A%2F%2F127.0.0.1%3A9200%2F_taste%2Fparameter%3Findex%3Diris-dgw%26from%3D0%26size%3D50%26attributeSelect%3D0%26vectorize%3D0%26clfName%3DJ48%26classifyAttributeName%3Dclassify
	doNothingURL="http://127.0.0.1:9200/_taste";
	
	myChart2.showLoading();
	// myChart3.showLoading();
	myChart4.showLoading();
	$.getJSON(newurl, function(data) {		
		var html = '<ul>';
		html+='<h4>'+'index'+" : "+data.res.index+'&nbsp;&nbsp;&nbsp;&nbsp;';
		html+=''+'Algorithm'+" : "+data.res.clfName+'</h4>';
		var DABC = data.res.EvaluationResult.DetailedAccuracyByClass;
		html+='<h4>'+'TPRate'+" : "+DABC.TPRate.WeightedAvg+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		html+=''+'FPRate'+" : "+DABC.FPRate.WeightedAvg+'</h4>';
		html+='<h4>'+'Precision'+" : "+DABC.Precision.WeightedAvg+'&nbsp;&nbsp;&nbsp;&nbsp;';
		html+=''+'Recall'+" : "+DABC.Recall.WeightedAvg+'</h4>';
		html+='<h4>'+'F-Measure'+" : "+DABC.FMeasure.WeightedAvg+'</h4>';
		html += '</ul>';
		$('#div1').html(html);
		
		var html2 = '<ul>';
		html2+='<p id="EvaluationResult">EvaluationResult : '+JSON.stringify(data.res.EvaluationResult)+'</p>';
		html2+='<p id="data">data : '+JSON.stringify(data.data)+'</p>';
		html2+='<p id="midResult">midResult : '+JSON.stringify(data.midResult)+'</p>';
		html2+='</ul>';
		$('#div2').html(html2);
		$("#EvaluationResult").hide();
		$("#data").hide();
		$("#midResult").hide();


		//---------------------------------------------------------------------
		//                            main2：误差率
		//---------------------------------------------------------------------
		var SummaryAccuracyData = data.res.EvaluationResult.SummaryAccuracy;

		var key = ["Kappastatistic", "Meanabsoluteerror", "Rootmeansquarederror", "Relativeabsoluteerror", "Rootrelativesquarederror"]; 
		var value = new Array();
		value[0] = SummaryAccuracyData.Kappastatistic;
		value[1] = SummaryAccuracyData.Meanabsoluteerror;
		value[2] = SummaryAccuracyData.Rootmeansquarederror;
		value[3] = SummaryAccuracyData.Relativeabsoluteerror;
		value[4] = SummaryAccuracyData.Rootrelativesquarederror;

		myChart2.hideLoading();
		myChart2.setOption({
			xAxis: {
				data: ["Kappa统计量", "平均绝对误差", "平方根误差", "相对误差绝对值", "相对平方根误差"]
			},
			series: [{
				// 根据名字对应到相应的系列
				name: 'percent',
				data: value
			}]
		});
		
		//---------------------------------------------------------------------
		//                            main3：正确率饼图
		//---------------------------------------------------------------------
		var rate = new Array();
		rate[0] = SummaryAccuracyData.CorrectlyClassifiedInstancesRate;
		rate[1] = SummaryAccuracyData.IncorrectlyClassifiedInstancesRate;
		CorrectRate = rate[0]*100;
		var bgColor = '#E3F7FF';
		// myChart3.hideLoading();
		myChart3.setOption({
			series: [
				{
				type: 'liquidFill',
				data: [rate[0],rate[0]-0.05, rate[0]-0.1],
				color: ['#49d088', '#38b470', '#2aaf66'],
				center: ['50%', '50%'],
				waveLength: '60%',
				amplitude: 8,
				radius: '40%',
				label: {
					normal: {
						formatter: function() {
							return '正确率：\n'+CorrectRate+'%'
						},
						textStyle: {
							fontSize: 22,
							color: '#44c078'
						},
						position: ['50%', '50%']
					}
				},
				outline: {
					itemStyle: {
						borderColor: '#49d088',
						borderWidth: 5
					},
					borderDistance: 0
				},
				itemStyle: {
					normal: {
						backgroundColor: '#fff'
					}
				}
			}
			]
		});
		//---------------------------------------------------------------------
		//                            main4：分类情况
		//---------------------------------------------------------------------
		CM = data.res.EvaluationResult.ConfusionMatrix;
		var arr4name = new Array();
		var arr4item = new Array();
		var arr4value = new Array();
		var arr4nameNum=0, arr4itemNum=0, arr4valueNumA=0, arr4valueNumB;
		var temp4;
		var flag = 0;
		$.each(CM, function(i){
			arr4name[arr4nameNum]=i;
			temp4 = CM[i];
			arr4value[arr4valueNumA] = new Array();
			arr4valueNumB=0;
			$.each(temp4, function(j){
				if(flag==0){
					arr4item[arr4itemNum] = j;
					arr4itemNum++;
				}
				arr4value[arr4valueNumA][arr4valueNumB]=temp4[j];
				arr4valueNumB++;
			});
			flag = 1;
			arr4nameNum++;
			arr4valueNumA++;
		});
		// 为正确表达图表的意思，将arr4value进行转置操作
		for(var i=0; i<arr4value.length; i++){
			for(var j=i+1; j<arr4value[0].length; j++){
				var tempswap = arr4value[i][j];
				arr4value[i][j] = arr4value[j][i];
				arr4value[j][i] = tempswap;
			}
		}
		var data4 = genData4(arr4name, arr4item, arr4value);
		myChart4.hideLoading();
		myChart4.setOption({
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				data: data4.legendData
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			yAxis:  {
				type: 'value'
			},
			xAxis: {
				type: 'category',
				data: data4.xAxisData
			},
			series: data4.series4
		});
		
		//---------------------------------------------------------------------
		//                            main6：数据散点图
		//---------------------------------------------------------------------
		if(data.midResult!=null){
			data6 = genData6(data.data, data.midResult);
			myChart6.setOption({
				dataset: {
					dimensions: data6.dimensions,
					source: data6.datasetSource
				},
				xAxis3D: {},
				yAxis3D: {},
				zAxis3D: {},
				grid3D: {
					// axisLine: {
					//     lineStyle: {
					//         color: '#ffbd67'
					//     }
					// },
					// axisPointer: {
					//     lineStyle: {
					//         color: '#ffbd67'
					//     }
					// },
					// viewControl: {
					//     autoRotate: true, //自动转动
					//     // projection: 'orthographic'
					// }
				},
				series: [
					{
						type: 'scatter3D',
						symbolSize: 10,
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
					categories: data6.categories
					// dimension:data1.classifyAttributeName
				},
				color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
			});
		}
		else{
			$("#main6HeadText").append("<p>( 该数据集不符合可视化展示要求，请选择三维数据集进行展示！ )</p>");
		}
		

	});


	$("#retu").click(function(){
		window.history.back();  //返回上一页
	});
	$("#show").click(function(){
		$("p").toggle();
	});
});