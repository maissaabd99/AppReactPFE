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
import authAxios from "../../authAxios"

//import {MyContext} from "index"

const useStyles = makeStyles(styles);


export default function Logout(props) {
    function logout(){
             // localStorage.clear();

    var iduser = localStorage.getItem("iduser")
    console.log(iduser);
    //localStorage.clear();
    authAxios.post(`Authentication/logout/${iduser}`,{
          "access_token":localStorage.getItem('access_token'),
          "refresh_token" :localStorage.getItem('refresh_token')
        })
        .then((res) => {
        console.log(res.data)
        window.location.href="/login"  
        localStorage.clear();
      },
      (error) => {
        alert(error)
        console.log(error);
      });  
        /*localStorage.setItem('UserEmail',"");
         localStorage.setItem('Usernom',"");
         localStorage.setItem('Userprenom',"");
         localStorage.setItem('access_token',"");*/
           
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
