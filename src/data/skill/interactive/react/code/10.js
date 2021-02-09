
export const c10_exp = `
import React, { useContext } from 'react';
 
import { ThemeContext } from './App';
 
export default () => {
    
    const context = useContext(ThemeContext);
 
    return (
        <div>Example 组件：当前 theme 是：{ context }</div>   
    )
}
`

export const c10_app = `
import React, { createContext } from 'react';
import Example from './Example';
 
import './App.css';
 
export const ThemeContext = createContext(null);
 
export default () => {
 
    return (
        <ThemeContext.Provider value="light">
            <Example />
        </ThemeContext.Provider>
    )
}
`