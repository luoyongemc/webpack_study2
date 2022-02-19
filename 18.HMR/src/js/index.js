import "../media/iconfont.css";
import "../css/index.less";
import print from './print';

print();

function add(x, y) {
  return x + y;
}

if(module.hot) {
  module.hot.accept('./print.js',function () {
    //方法会监听print.js文件的变化，一旦发生变化，其它模块不会重新打包构建
    //会执行后面的回调函数
    print();
  })
}

console.log(add(1, 2));
