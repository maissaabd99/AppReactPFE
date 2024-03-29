import React, { useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import  { useState, useEffect } from 'react';
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/bg7.jpg";
import { Phone } from "@material-ui/icons";
import { Redirect } from "react-router";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);


export default function ConfirmMail(props) {
   props={...msg};
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var msg = null;
  
  var urlParams = new URLSearchParams(window.location.search);
  var iduser = urlParams.get('id')
  console.log(iduser)  

  return (
    <div>
     {/* <Header
        absolute
        color="transparent"
        image={require("assets/img/logo.png")}
      //  brand="Area E-Hire"
        rightLinks={<HeaderLinks />}
        {...rest}
      />*/}
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center" >
            <GridItem xs={10} sm={10} md={9}>
              <Card className={classes[cardAnimaton]}>
                <Link  style={{color: "purple",textAlign:"center"}}>
                    
                          <h4 style={{textTransform:"none"}}><strong>Un email a été envoyé à vous pour la confimation de votre compte . 
                            <br></br>
                            Merci de vérifier votre boite email !
                          </strong> 
                          </h4>
                       
                </Link>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
