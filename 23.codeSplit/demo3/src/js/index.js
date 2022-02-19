// import '../css/index.css';
// import { mul } from './test';


function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

/**
 * 
 */

import(/*webpackChunkName:'test'*/'./test').then(({mul,sub}) => {
  console.log(mul(3,2));
}).catch(() => {
  console.log('file loading fail');
})

// eslint-disable-next-line
console.log(sum(1,2,3,4,5));

// eslint-disable-next-line
// console.log(mul(2,3));