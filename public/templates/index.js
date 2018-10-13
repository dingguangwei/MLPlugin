function generateURL() {
	var s = new Array();
	s[0] = "MeachineLearningForm";
	s[1] = "index";
	s[2] = "from";
	s[3] = "size";
	s[4] = "attributeSelect";
	s[5] = "vectorize";
	s[6] = "clfName";
	s[7] = "classifyAttributeName";
	
	url = "http://127.0.0.1:9200/_taste/parameter?";
	var value = new Array();
	value[0]="";
	for(var i=1; i<s.length; i++)
	{
		value[i] = document.forms[s[0]][s[i]].value;
		url+=s[i]+"="+value[i]+"&";
	}
	url = url.substring(0, url.length-1);
	return true;
}

$(document).ready(function(){
	
	$("button").click(function(){
		generateURL();
		
		$.get("http://127.0.0.1:9200/_taste",function(data,status){
			
			var html = '<ul>';
			html += data.message;
			html += '</ul>';
			
			document.getElementById("div1").innerHTML = html;
		});

	});
	
});