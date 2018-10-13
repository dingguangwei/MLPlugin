该项目是一个完整的嵌入kibana的机器学习前端插件，使用方法如下：
1、将项目（一个文件夹）完整复制至kibana-5.4\plugins目录下
2、打开es（无论是源码中开启还是终端开启）
3、启动kibana
	cd kibana-5.4/bin
	npm start
4、启动该插件中的nodejs（监听的8080端口）
	cd kibana-5.4/plugins/MLPlugin/nodejsServer2.1（请根据版本号选择最新版本）
	node server.js

PS:windowsBat中是widows下安装es插件和开启kibana的脚本
windows下使用修改相关路径即可
linux下使用，需要修改相应命令