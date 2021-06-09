import  React  from "react";
import{ useState }from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "assets/scss/material-kit-react.scss?v=1.9.0";
// pages for this product
import Components from "views/Components/Components.js";
import {MyContext} from "index"

class MyProvider extends React.Component{
    state = {
      iduser :"",
      token :"tokentoken"
    }
    render (){
      return(
        <MyContext.Provider 
          value={{state: this.state,
          setId : (id) => this.setState({iduser:id})}}>
          {this.props.children}
        </MyContext.Provider>
      )
    }
  }
  export default MyProvider;