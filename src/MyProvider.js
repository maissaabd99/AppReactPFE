import  React, { useMemo, useState,createContext }  from "react";
import "assets/scss/material-kit-react.scss?v=1.9.0";
// pages for this product
import Components from "views/Components/Components.js";

export default function MyProvider (props) {
    const MyContext = createContext();

    const [user,setUser] =useState ([])
    const providerValue  = useMemo(() =>({ user,setUser}), [user,setUser])

    return (
        <MyContext.Provider 
          value={providerValue}>
          {props.children}
        </MyContext.Provider>
    )
  }
