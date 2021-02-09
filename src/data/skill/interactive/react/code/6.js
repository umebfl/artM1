
export const c6_exp = `
ExampleA.js:

import React from 'react';
 
export default ({ text }) => {
    
    console.log('Example A：', 'render');
    return <div>Example A 组件：{ text }</div>
 
}

ExampleB.js:

import React from 'react';
 
export default ({ text }) => {
    
    console.log('Example B：', 'render');
    return <div>Example B 组件：{ text }</div>
 
}

`

export const c6_app_1 = `
App.js:

import React, { useState, useMemo } from 'react';
import ExampleA from './ExampleA';
import ExampleB from './ExampleB';
 
import './App.css';
 
export default () => {
 
    const [a, setA] = useState('ExampleA');
    const [b, setB] = useState('ExampleB');
 
+    const exampleA = useMemo(() => <ExampleA />, [a]);
+    const exampleB = useMemo(() => <ExampleB />, [b]);
 
    return (
        <div>
+            {/* <ExampleA text={ a } />
+            <ExampleB text={ b } /> */}
+            { exampleA }
+            { exampleB }
            <br />
            <button onClick={ () => setA('修改后的 ExampleA') }>修改传给 ExampleA 的属性</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={ () => setB('修改后的 ExampleB') }>修改传给 ExampleB 的属性</button>
        </div>
    )
}
`

export const c6_app_2 = `
// 同时改变版:

import React, { useState } from 'react';
import ExampleA from './ExampleA';
import ExampleB from './ExampleB';
 
import './App.css';
 
export default () => {
 
    const [a, setA] = useState('ExampleA');
    const [b, setB] = useState('ExampleB');
 
    return (
        <div>
            <ExampleA text={ a } />
            <ExampleB text={ b } />
            <br />
            <button onClick={ () => setA('修改后的 ExampleA') }>修改传给 ExampleA 的属性</button>

            <button onClick={ () => setB('修改后的 ExampleB') }>修改传给 ExampleB 的属性</button>
        </div>
    )
}
`