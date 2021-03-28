import React from "react";
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
const useStyles = makeStyles(styles);

 

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var valnom;
  var valpren;
  var valusername;
  var valpassword;
 
  function  validatenom(){
    if(document.getElementById('nom').value.length>15 ||document.getElementById('nom').value.length<3){
      document.getElementById('errornom').textContent="Nom doit etre entre 3 et 15 caractères";
      valnom= false
    }else{
      if(document.getElementById('nom').value.length<=15 && document.getElementById('nom').value.length>=3){
        document.getElementById('errornom').textContent="";
        valnom=true;
      }    
    }
    console.log(valnom);
  }
  
  function validateprenom(){
    if(document.getElementById('prenom').value.length>15 ||document.getElementById('prenom').value.length<3){
      document.getElementById('errorpren').textContent="Prénom doit etre entre 3 et 15 caractères";
      valpren=false;
    }else{
      if(document.getElementById('prenom').value.length<=15 && document.getElementById('prenom').value.length>=3){
        document.getElementById('errorpren').textContent="";
        valpren=true;
      }     
    }
    console.log(valpren)
  }

  function validateusername(){
    if(document.getElementById('username').value.length>15 ||document.getElementById('username').value.length<3){
      document.getElementById('errorusername').textContent="Nom d'utilisateur doit etre entre 3 et 15 caractères";
      valusername=false;
    }else{
      if(document.getElementById('username').value.length<=15 && document.getElementById('username').value.length>=3){
        document.getElementById('errorusername').textContent="";
        valusername=true;
      }     
    }
    console.log(valusername);
  }
  function validatepass(){
    if(document.getElementById('pass').value.length <6 ){
      document.getElementById('errorpassword').textContent="Mot de passe doit contenir au moins 6 caractères ";
      valpassword=false;
    }else{
      var format2=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
      if(format2.test(document.getElementById('pass').value)==true){
          document.getElementById('errorpassword').textContent="";
          valpassword=true;
      } else{
        document.getElementById('errorpassword').textContent="Vous devez inclure au moins un caractère spécial ,un majuscule et un chiffre ";
        valpassword=false;
      }
    } 
    console.log(valpassword)   
  }
  function handleSubmit(e) {
    e.preventDefault();
     console.log(valpren)
   // if((valnom===true) && (valpren===true) && (valusername===true) && (valpassword===true)){    
     fetch("https://localhost:44392/api/Authentication/Register",{
        method: 'POST',
        headers: {
       'Content-Type': 'application/json'
      },
     body: JSON.stringify({ 
       nom: nom,
       prenom:prenom,
       Email:email,
       Username : username,
       password:password
      })
    })
     .then(data => data.json())
     .then((result)=>{
      console.log(result.message)
      if(result.message=="Cette adresse mail est déjà utilisée"){
        document.getElementById('erroremail').textContent=result.message;
      }else{
        if(result.message=="Nom d'utilisateur déjà utilisé!"){
          document.getElementById('errorusername').textContent=result.message;
        }
        else{
        //redirect(result.status)
        }
      }
     },
     (error)=>{
       alert(error.message)
       console.log(error.message)
     })
  //}
}
  function redirect(string){
    if(string==="success 200 "){
      window.location.href="/Inscription/Message-confirmation"
    }  
  }

  return (
    <div>
      <Header
        absolute
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
        <div className={classes.container} >
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Inscrivez-vous </h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Nom ..."
                      id="nom"
                      value={nom}
                      className="nom"
                      onChange = { e =>setNom(e.target.value)}
                      onKeyUp ={validatenom}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <p style={{color:"red"}} id="errornom"></p>
                    <CustomInput
                      labelText="Prénom..."
                      id="prenom"
                      value={prenom}
                      onKeyUp={validateprenom}
                      onChange={e => setPrenom(e.target.value)}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />     
                          </InputAdornment>
                        )
                      }}
                    />
                    <p style={{color:"red"}} id="errorpren"></p>
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
                    <p style={{color:"red"}} id="erroremail"></p>
                     <CustomInput
                      labelText="Username ..."
                      id="username"
                      onKeyUp={validateusername}
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end" style={{marginTop: '-4px'}}>
                           <Icon >
                                <i className="fas fa-map-marker-alt"></i>
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                    <p style={{color:"red"}} id="errorusername"></p>
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      value={password}
                      onKeyUp={validatepass}
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
                    <p style={{color:"red"}} id="errorpassword"></p>

                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="primary" size="lg" type="submit">
                      S'inscrire
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
