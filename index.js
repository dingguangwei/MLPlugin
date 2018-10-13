import api from './server/route';

export default function (kibana) {
    return new kibana.Plugin({
        require:['elasticsearch'],
        name: 'MLPlugin',//尽量保持与plugins目录下该插件文件夹名字一致
        uiExports: {
            app: {
                title: 'Meachine Learning',//属性叫title，其实是显示在网页左侧功能区的名字
                description: 'do Meachine Learning',
                //app.js文件的路径，加不加.js后缀都可
                //文件实际存放路径是 'E:kibana-5.4/plugins/xx-plugin/public/app'
                //但是代码中不要加 '/public'。
                main: 'plugins/MLPlugin/app',
                //icon.svg文件的路径，要加后缀
                //文件实际存放路径为：'plugins/xx-plugin/public/icon.svg'
                //icon: 'plugins/MLPlugin/icon.svg'
            },
        },
        
        init(server, option){
            api(server);
        }
        
    });
};