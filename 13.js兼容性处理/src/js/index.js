// import '@babel/polyfill';
const add = (x, y) => {
  return x + y;
}

console.log(add(2, 5));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('111');
    resolve();
  },1000)
})

console.log(promise);
