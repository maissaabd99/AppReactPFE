import React,{useEffect} from "react";
import { useContext} from "react"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import  { useState } from 'react';
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/bg7.jpg";
import { Link,Redirect, useParams } from "react-router-dom";
import authAxios from "authAxios";
import Loader from "react-loader-spinner";

//import {MyContext} from "index"

const useStyles = makeStyles(styles);

export default function ChangePassword(props) {
  props={...msg};
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  var msg = null;
const[erroremsg,setErrorMsg] = useState("");
  var urlParams = new URLSearchParams(window.location.search);
  var iduser = urlParams.get("user_id");
  var token = urlParams.get("token");
  console.log(iduser,"token = ",token) 
 useEffect(() => {
     if(token==null || iduser==null){
       setErrorMsg("token de vérification est invalide !");
     }
 }, [])
  const {u_id_f_r } = useParams();
  var format2=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
  function handleSubmit(e) {
    console.log(iduser)
    console.log(token)
    e.preventDefault();
    setLoading(true)
    if(password1 != password2){
        document.getElementById('msgerror').textContent="Les mots de passe doivent correspondre !";
        setLoading(false)
    }else{
      if(format2.test(password1)==false){
        document.getElementById('msgerror').textContent="Mot de passe invalide ! Réessayez";
        setLoading(false)
      }
      else{
        authAxios.post("Authentication/ChangerUserPassword/"+iduser,
        {
           extrafield:password1,
           message:token,
        })
        .then((res)=>{
           console.log(res);
           document.getElementById('msgerror').textContent="";
           setLoading(false);
           window.location.href="/login"

        },
        (error)=>{
          console.log(error)
          document.getElementById('msgerror').textContent="Token invalide !";
          setLoading(false)
        })
    }
    }
    
   
  }
 
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
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes[cardAnimaton]} id="formforreset">
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4> Changer votre mot de passe </h4>
                  </CardHeader>
                  <CardBody>
                  <h5 style={{color:"grey",textAlign:"center"}}>{erroremsg}</h5>
                  <h5 style={{color:"red",textAlign:"center"}} id="msgerror"></h5>
                  <h6 style={{textTransform:"none"}}>Vous devez inclure au moins un caractère spécial,un majuscule et un chiffre (au moins 8 caractères)</h6>
                  <Loader type="Bars" color="purple" height={30} width={30} style={{marginLeft:"45%"}} visible={loading}></Loader>
                  <CustomInput
                      labelText="mot de passe"
                      id="pass1"
                      value={password1}
                      onChange={e => setPassword1(e.target.value)}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                     <CustomInput
                      labelText="confirmer mot de passe"
                      id="pass2"
                      value={password2}
                      onChange={e => setPassword2(e.target.value)}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                    
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                 <Button color="primary" size="lg" type="submit">
                      Changer
                 </Button>
                  </CardFooter>
                </form>
              </Card>
              <Card style={{display:"none"}} id="msgAfterEmailSent">
                  <CardBody>
                  <h4 style={{textTransform:"none",textAlign:"center"}}>
                    <strong>Un email a été envoyé à vous pour la réninitialisation de votre mot de passe . 
                        <br></br>
                        Merci de vérifier votre boite email !
                    </strong> 
                   </h4>
                  </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
    </div>
  );
}
