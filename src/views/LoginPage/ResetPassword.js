import React from "react";
import { useContext} from "react"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
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
import { createBrowserHistory } from "history";
import authAxios from "authAxios";
import Loader from "react-loader-spinner";

//import {MyContext} from "index"

const useStyles = makeStyles(styles);


export default function ResetPassword(props) {
  var hist = createBrowserHistory();
   props={...msg};
   const [loading, setLoading] = useState(false);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const {lien,...rest } = props;
  const [email, setEmail] = useState("");
  const [hidden, setHidden] = useState("");
  var msg = null;
  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById('msgerror').textContent=""
    setLoading(true);
    authAxios.post("Authentication/ResetPassword",
    {
       extrafield:email
    })
    .then((res)=>{
       console.log(res);
       document.getElementById("formforreset").style.display="none";
       document.getElementById("msgAfterEmailSent").style.display="block";
       setLoading(false);
    },
    (error)=>{
        document.getElementById('msgerror').textContent="Adresse email introuvable ! Réessayez";
      console.log(error)
      setLoading(false);
    })
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
        <div className={classes.container} >
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes[cardAnimaton]} id="formforreset">
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4> Réinitialiser vote mot de passe</h4>
                  </CardHeader>
                  <CardBody>
                  <h5 style={{textAlign:"center"}}>Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe tout de suite!</h5>
                  <h5 style={{color:"red",textAlign:"center"}} id="msgerror"></h5>
                  <Loader type="Bars" color="purple" height={30} width={30} style={{marginLeft:"45%"}} visible={loading}/>
                     <CustomInput 
                      labelText="Email ..."
                      id="email"
                      value={email}
                      onChange={e =>setEmail(e.target.value)}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                 <Button color="primary" size="lg" type="submit">
                      Envoyer
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
