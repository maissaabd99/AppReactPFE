import { createBrowserHistory } from "history";
import { Router, Route,Redirect } from "react-router-dom";
import React from "react"
import Login from "./Login";


export default function ProtectedRoute({isAuth:isAuth, component:Component,... rest}){
    return (
        <Route {... rest} render= {(props)=>
           isAuth ? <Component {...props} /> : <Redirect to ={{ pathname : '/login' , state : {from : props.location.pathname }}}/>
        }
        />
    )
}