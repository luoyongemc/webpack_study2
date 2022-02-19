
console.log('index.js');

// import {mul} from './test';

// console.log(mul);

document.getElementById('btn').onclick = function () {
  //webpackPrefetch:预加载，在事件调用之前就已经加载好了
  //懒加载：在事件触发之后才加载
  //正常加载可以认为是并行加载（同一时间加载多个文件）  预加载prefetch：等其它资源加载完毕后，浏览器空闲了，再加载
  import(/*webpackChunkName:'test',webpackPrefetch:true */'./test').then(({mul}) => {
    console.log(mul(4,5));
  })
  // console.log(mul(4,2));
}