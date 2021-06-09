import React, { useContext, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import notfound from "assets/img/404.png";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import Parallax from "components/Parallax/Parallax";

const useStyles = makeStyles(styles);

export default function NotFound404(props) {
 
  const classes = useStyles();
  const {cle,setDisplayExp,displayexp,...rest } = props;

  return (
    <div>
    <br></br>
    <br></br>
    
    <Parallax image={require("assets/img/404.png")}>
    
    <div style={{width:"100%",height:"100%",textAlign:"center",position:"relative"}}>
   {/* <div style={{
      // backgroundPosition: 'center',
     //backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
   //  marginTop:"auto",marginLeft:"auto",backgroundImage: `url(${notfound})`
     }}>
    </div> */}                                                                                                                                
    </div>
    </Parallax>
    <br></br>
    <Footer/>
    </div>
  );
}
