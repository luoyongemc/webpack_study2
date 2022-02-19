
import count from './count'


console.log(count(3,2));

import(/*webpackChunkName:'a'*/'./add.js').then(({default:add}) => {
    console.log(add(1,2));
})

