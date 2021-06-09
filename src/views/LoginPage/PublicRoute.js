import { createBrowserHistory } from "history";
import { Router, Route,Redirect } from "react-router-dom";
import React from "react"
import Login from "./Login";


export default function PublicRoute({isAuth:isAuth, component:Component,... rest}){
    return (
        /*<Redirect to ={{ pathname : props.location.pathname , state : {from : props.location }}}*/
        <Route {... rest} render= {(props)=>
           isAuth ?  <Component {...props} /> : <Redirect to ={{ pathname : "/candidat/moncompte" , state : {from : props.location }}} />
        }
        />
    )
}