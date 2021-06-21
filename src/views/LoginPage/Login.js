import React from "react";
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
import { Link,Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import data from "../../data.js"
import Loader from "react-loader-spinner";
//import {MyContext} from "index"

const useStyles = makeStyles(styles);


export default function Login(props) {
  var hist = createBrowserHistory();
   props={...msg};
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { isLogged ,lien,...rest } = props;
  console.log(hist.location)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  var msg = null;
  var linkvalue="";
  console.log(data["access_token"])
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
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
             props.msg =" Email ou mot de passe incorrect ! Réessayer";
             document.getElementById('msgerror').textContent=props.msg;
             console.log(props)
             setLoading(false);
         }else{
           if(result.status=="500"){
            document.getElementById('msgerror').textContent="Votre compte n'est pas activé , merci de vérifier votre email et activer votre compte";
            console.log(result)
            setLoading(false);
          }else{
          /*  data["access_token"] = result.token;
            data["refresh_token"] = result.refreshToken;
            data["iduser"] = result.user.id;
            Object.freeze(data)*/
           // console.log("data after login : ",data)
            document.getElementById('msgerror').textContent="";
            console.log(result)
            localStorage.setItem("iduser",result.user.id);
            localStorage.setItem('access_token',result.token);
            localStorage.setItem('refresh_token',result.refreshToken);
            setLoading(false)
           // context.setId(result.user.id)
          //  console.log(context)
            //props.history.push('/moncompte');
            if(hist.location.state!==undefined && hist.location.state!=="/logout"){
              //hist.push(hist.location.state['from'])
              window.location.href=hist.location.state['from'];
            }else{
              window.location.href="/candidat/moncompte" ;
            }
           }          
         }      
     },
     (error)=>{
       alert(error.message)
       setLoading(false)
       console.log(error)
     })
  }
 // const context = useContext(MyContext)
 //console.log(context.state)
  return (
    <div>
     {/* <Header
         color="white"
         fixed
       // brand="Area E-Hire"
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
        <div className={classes.container} >
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4> <strong>Connexion</strong> </h4>
                  </CardHeader>
                  <CardBody>
                  <h5 style={{color:"red",textAlign:"center"}} id="msgerror">{props.msg}</h5>
                  <Loader type="Bars" color="purple" height={30} width={30} style={{marginLeft:"45%"}} visible={loading}></Loader>
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
                <div style={{color: "purple",textAlign:"center"}}>
                <Link to={"/password-recovery"} style={{textDecoration:"underline"}}>
                      Mot de pass oublié ?
                </Link>
                <Link to ="/inscription">
                       <Button color="transparent" target="_blank" >
                            Vous n'avez pas de compte ! Inscrivez vous ici 
                       </Button>
                </Link>
                </div>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
