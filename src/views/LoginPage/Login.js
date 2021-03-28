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


export default function Login(props) {
  localStorage.setItem('UserEmail',"");
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
  function handleSubmit(e) {
    e.preventDefault();
      console.log(email);
      
     fetch("https://localhost:44392/api/Authentication/Login",{
        method: 'POST',
        headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({ 
       Email:email,
       password:password
      })
    })
     .then(data => data.json())
     .then((result)=>{
         if(result.status==401){
             //console.log("mot de passe ou email incorrect !");
             props.msg =" Email ou password incorrect ! Réessayer";
             document.getElementById('msgerror').textContent=props.msg;
             console.log(props)
         }else{
           if(result.status=="500"){
            document.getElementById('msgerror').textContent="Votre compte n'est pas activé , merci de vérifier votre email et activer votre compte";
            console.log(result)
          }else{
            document.getElementById('msgerror').textContent="";
             console.log(result)
            localStorage.setItem('access_token',"");
            localStorage.setItem('access_token',result.token);
            localStorage.setItem('UserEmail',"");
            localStorage.setItem('UserEmail',result.email);
            localStorage.setItem('Usernom',result.nom);
            localStorage.setItem('Userprenom',result.prenom);
            //console.log(result.token);
            window.location.href="/moncompte"  ;
           }          
         }      
     },
     (error)=>{
       alert(error.message)
       console.log(error)
     })
  }
  function redirect(){
      
  }
  
  return (
    <div>
      <Header
        absolute
        image='assets/img/logo.png'
        color="transparent"
       // brand="Area E-Hire"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container} onSubmit={handleSubmit}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} >
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4> Connexion </h4>
                  </CardHeader>
                  <CardBody>
                  <h5 style={{color:"red",textAlign:"center"}} id="msgerror">{props.msg}</h5>
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
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
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
                      Se connecter
                    </Button>
                  </CardFooter>
                </form>
               
                <Link to ="/inscription" style={{color: "purple",textAlign:"center"}}>
                       <Button color="transparent" target="_blank" >
                            Vous n'avez pas de compte ! Inscrivez vous ici 
                       </Button>
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
