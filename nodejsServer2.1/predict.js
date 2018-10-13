
// 写数据
function writeData(url){
    $.getJSON(url, function(_data){
        // 写表头
        document.getElementById('tabelName').innerHTML='Data Set: '+document.forms["predictForm"]['index'].value;
        document.getElementById("tabelspan").style.display="none";
        var attr = _data.attribute;
        var html = '<table class="hovertable" border="1" width="1500" align="left">';
        html+='<tr align="left" style="color:rgb(0, 0, 0)" onmouseover="this.style.backgroundColor=\'#ffff66\';" onmouseout="this.style.backgroundColor=\'#d4e3e5\';">';
        html+='<th>id</th>';
        for(var i=0; i<attr.length; i++){
            html+='<th width:30%>'+attr[i]+'</th>';
        }
        html+='</tr>'; 

        // 写数据
        for(var line=0; line<_data.data.length; line++){
            html+='<tr style="color:rgb(0, 0, 0)" onmouseover="this.style.backgroundColor=\'#ffff66\';" onmouseout="this.style.backgroundColor=\'#d4e3e5\';">';
            html+='<td>'+line+'</td>';
            for(var item in _data.data[line]){
                html+='<td width:30%>'+_data.data[line][item]+'</td>';
            }
            html+='</tr>';

        }
        $('#tabel').html(html);
        document.getElementById('tabel').style.display="";
    });
}

// 写预测数据
function writePredictData(p_url){
    $.getJSON(p_url, function(_data){
        // 写表头
        document.getElementById('tabelName').innerHTML='Data Set: '+document.forms["predictForm"]['index'].value;
        document.getElementById('tabelspan').innerHTML='Correct / Total : '+_data.correctNum+" / "+_data.totalNum;
        document.getElementById("tabelspan").style.display="none";
        var attr = _data.attribute;
        var html = '<table class="hovertable" border="1" width="1500" align="left">';
        html+='<tr align="left" style="color:rgb(0, 0, 0)" onmouseover="this.style.backgroundColor=\'#ffff66\';" onmouseout="this.style.backgroundColor=\'#d4e3e5\';">';
        html+='<th>id</th><th>T/F</th><th>Predict</th><th>Actually</th>';
        for(var i=0; i<attr.length; i++){
            html+='<th>'+attr[i]+'</th>';
        }
        html+='</tr>';

        // 写数据
        for(var line=0; line<_data.data.length; line++){
            html+='<tr id="line'+line+'" style="color:rgb(0, 0, 0)" onmouseover="this.style.backgroundColor=\'#ffff66\';" onmouseout="this.style.backgroundColor=\'#d4e3e5\';">';
            html+='<td>'+line+'</td><td id="ToF'+line+'">-</td><td id="predict'+line+'">-</td><td id="actually'+line+'">-</td>';
            for(var item in _data.data[line]){
                html+='<td>'+_data.data[line][item]+'</td>';
            }
            html+='</tr>';

        }
        $('#tabel').html(html);
        document.getElementById('tabel').style.display="";

        // 写预测数据
        var line=0;
        foo(line, _data, _data.ToF.length, 1000);
    });
}

// 循环延迟写结果数据a=true/false,b=预测结果，c=原本结果
function foo(line, _data, max, time){
    window.setTimeout(function(){
        writePredictItem(line, _data.ToF[line], _data.predict[line], _data.actually[line]);
        line++;
        if(line<max){
            foo(line, _data, max, 50);
        }
        else{
            document.getElementById("tabelspan").style.display="";// 都整完再显示统计结果
        }
    }, time);
}


function writePredictItem(line, a, b, c){
    var s1='ToF'+line;
    var s2='predict'+line;
    var s3='actually'+line;
    console.info(line+" : "+a+"- "+b+"- "+c);

    document.getElementById(s1).innerHTML=a;
    document.getElementById(s2).innerHTML=b;
    document.getElementById(s3).innerHTML=c;

    if(a=="false"){
        document.getElementById('line'+line).style.backgroundColor="rgb(253, 166, 166)";
        document.getElementById('line'+line).onmouseover="this.style.backgroundColo='rgb(8, 65, 65)';";
        document.getElementById('line'+line).onmouseout="this.style.backgroundColor='rgb(168, 65, 65)';";
    }
}

// 获取真实路径（由于浏览器会隐藏主机上的真实路径）
function getFileUrl(sourceId) {
    console.log("调用getFileUrl 原地址："+document.getElementById(sourceId).value);
    var url; 
    if (navigator.userAgent.indexOf("MSIE")>=1) { // IE 
    url = document.getElementById(sourceId).value; 
    } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox 
    url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0)); 
    } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome 
        console.log("谷歌浏览器对应："+document.getElementById(sourceId).files.item(0));
    url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0)); 
    } 
    return url; 
}

function getFileUrl2(sourcePath) {
    console.log("调用getFileUrl2 原地址："+sourcePath);
    var url; 
    if (navigator.userAgent.indexOf("MSIE")>=1) { // IE 
    url = sourcePath; 
    } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox 
    url = window.URL.createObjectURL(sourcePath); 
    } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome 
    url = window.URL.createObjectURL(sourcePath); 
    } 
    return url; 
}

function generatePredictURL() {
	var s = new Array();
	s[0] = "predictForm";
	s[1] = "index";
	s[2] = "from";
    s[3] = "size";
    s[4] = "cAttr";

	p_url = "http://127.0.0.1:9200/_taste/parameter?";
	p_url+="op=32&"
	var value = new Array();
	value[0]="";
	for(var i=1; i<s.length; i++)
	{
		value[i] = document.forms[s[0]][s[i]].value;
		if(value[i]=="" || value[i]==null){
			alert("Please fill the "+s[i]+" item !");
			return false;
		}
		p_url+=s[i]+"="+value[i]+"&";
    }
    var mRpath = getFileUrl("mRpath");
    console.log("读取model："+mRpath);
    // document.getElementById("mRpath").value;
    // console.log("默认使用mRpath=F:/bc/J48.model");
    if(mRpath=="" || mRpath==null){
        alert("Please select a model file !");
        return false;
    }
    p_url+="mRpath=F:/bc/J48.model";
    return true;
}

function generateDataURL() {
	var s = new Array();
	s[0] = "predictForm";
	s[1] = "index";
	s[2] = "from";
    s[3] = "size";
    s[4] = "cAttr";
	
	url = "http://127.0.0.1:9200/_taste/parameter?";
	url+="op=01&"
	var value = new Array();
	value[0]="";
	for(var i=1; i<s.length; i++)
	{
		value[i] = document.forms[s[0]][s[i]].value;
		if(value[i]=="" || value[i]==null){
			alert("Please fill the "+s[i]+" item !");
			return false;
		}
		url+=s[i]+"="+value[i]+"&";
	}
	url = url.substring(0, url.length-1);
	return true;
}

$(document).ready(function(){
    $("#dataViewButton").click(function(){
        if(generateDataURL()){
            console.log("获取数据 url："+url);
            writeData(url);
        }
    });

    $("#predictButton").click(function(){
        if(generatePredictURL()){
            console.log("预测 p_url："+p_url);
            writePredictData(p_url);
        }
    });
});