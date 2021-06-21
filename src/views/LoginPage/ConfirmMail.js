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
import authAxios from "authAxios";

const useStyles = makeStyles(styles);


export default function ConfirmMail(props) {
   props={...msg};
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const [msg, setMsg] = useState("");
  const [password, setPassword] = useState("");
  
  var urlParams = new URLSearchParams(window.location.search);
  var iduser = urlParams.get("id");
  var token = urlParams.get("token");
  console.log(token)  
  const[loading ,setLoading] = useState()

  useEffect(() => {
    authAxios.post("Authentication/Inscription/ConfimMail",
    //{headers: {"Access-Control-Allow-Origin": "*"}},
      {
       nom:token,
       UserName:iduser   
      })
       .then((result)=>{
          console.log(result.data)  
          setLoading(true); 
      },
       (error)=>{
        console.log(error.response)
        if(error.response.data.status === "401")
        {
          setMsg(error.response.data.message)
        }else{
          setMsg("Une erreure s'est produite !")
        }
        setLoading(false);
      });
  }, [])
  
  
  return (
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={8} sm={8} md={8}>
              <Card className={classes[cardAnimaton]}>
               {loading === true ? 
                <Link to ="/Login" style={{color: "purple",textAlign:"center"}}>
                       <Button color="transparent" target="_blanck">
                       <h4  style={{textTransform:"none"}}><strong>   Votre compte a été activé !<br></br> Maintenant vous pouver vous connecter en cliquant ici !
                       </strong></h4>
                       </Button>
                </Link> : null
               }
               {loading === false ? 
                
                       <Button color="transparent" target="_blanck">
                       <h4  style={{textTransform:"none"}}><strong>   {msg}
                       </strong></h4>
                       </Button>
                : null
               }
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
  );
}
