import React, { useEffect,useContext ,Suspense} from "react";
import{ useState }from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "assets/scss/material-kit-react.scss?v=1.9.0";
// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ConfirmMail from "views/LoginPage/ConfirmMail.js";
import MsgConfirmation from "views/LoginPage/MsgConfimation.js";
import ProtectedRoute from "views/LoginPage/ProtectedRoute";
import PublicRoute from "views/LoginPage/PublicRoute";
import data from "./data.js"
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import MyProvider from "MyProvider.js";
import Logout from "views/LoginPage/Logout.js";
import Loader from "react-loader-spinner";
const ChangePassword  = React.lazy(()=>import("views/LoginPage/ChangePassword.js")) ;
const Components = React.lazy(()=>import( "views/Components/Components.js"))
const Login = React.lazy(()=>import("views/LoginPage/Login.js"))
const ProfilePage = React.lazy(()=>import("views/ProfilePage/ProfilePage.js"))
const LoginPage = React.lazy(()=>import("views/LoginPage/LoginPage.js"))
const Candidature = React.lazy(()=>import("views/candidatures/Candidature"));
const NotFound404 = React.lazy(()=>import("NotFound404.js"))
const Offres = React.lazy(()=>import("views/offres/Offres.js")) ;
const Examen = React.lazy(()=> import("views/examens/examen.js")) ;
const ResetPassword = React.lazy(()=> import("views/LoginPage/ResetPassword")) ;

var bar = 0 ;
export const MyContext = React.createContext();

var hist = createBrowserHistory();

var auth ;
if(localStorage.length !=0 && localStorage.getItem('access_token') != null && localStorage.getItem('access_token') != ""
   && localStorage.getItem('iduser') != null && 
   localStorage.getItem('iduser') != "" && localStorage.getItem('refresh_token') != null && 
   localStorage.getItem('refresh_token') != "" 
  ){
     auth= true
   }else{
     auth=false
   }

console.log("auth from index",auth)
 {/* <MyProvider>*/}
ReactDOM.render(

  <Router history={hist}>
  <Suspense fallback={<Loader type="Bars" color="purple" height={50} width={50} style={{marginTop:"20%",marginLeft:"45%"}}></Loader>}>
  <Header color="white" isAuth = {auth} fixed rightLinks={<HeaderLinks isAuth = {auth}/>}/>
    <Switch>
      <PublicRoute  path="/Inscription/Message-confirmation" component={MsgConfirmation} isAuth={!auth}/>
      <PublicRoute exact path="/Inscription/Confirmation-compte" component={ConfirmMail} isAuth={!auth}/>
      <Route exact path="/landing-page" component={LandingPage} />
      <PublicRoute exact path="/login" component={Login}  isAuth={!auth}/>
      <ProtectedRoute exact  path="/candidat/moncompte" component={ProfilePage} isAuth={auth}/>
      <PublicRoute exact path="/Inscription" component={LoginPage} isAuth={!auth} />
      <Route exact path="/" component={Components}/>
      <Route exact  path="/toutes-les-offres" component={Offres} />
      <ProtectedRoute exact  path="/toutes-les-offres/details/:id" component={Offres} isAuth={auth} />
      <ProtectedRoute exact  path="/candidat/mes-candidatures" component={Candidature} isAuth={auth} />
      <PublicRoute exact path="/password-recovery" component={ResetPassword} isAuth={!auth}/>
      <PublicRoute exact path="/change-password" component={ChangePassword} isAuth={!auth}/>
      <ProtectedRoute exact  path="/logout" component={Logout} isAuth={auth} />
      <ProtectedRoute exact  path="/candidat/mes-candidatures/examen/:idcandidature/:idexam" component={Examen} isAuth={auth} />  
      <Route path="*" component={NotFound404}/>
    </Switch>
    </Suspense>
  </Router>  

  , 
  document.getElementById("root")
);
 {/* </MyProvider>*/}