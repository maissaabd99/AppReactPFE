import React,{useEffect} from "react";
import { useContext} from "react"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import Login from "./Login";

//import {MyContext} from "index"

const useStyles = makeStyles(styles);


export default function Logout(props) {
    function logout(){
        localStorage.clear();
        /*localStorage.setItem('UserEmail',"");
         localStorage.setItem('Usernom',"");
         localStorage.setItem('Userprenom',"");
         localStorage.setItem('access_token',"");*/
         window.location.href="/login"      
   }
    useEffect(() => {
        logout()
        return () => { 
        }
    }, [])
  return (
   null
  );
}
