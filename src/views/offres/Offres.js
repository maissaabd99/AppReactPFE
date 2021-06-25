import React, { useEffect, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { useState } from "react";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import classNames from "classnames";
import Parallax from "components/Parallax/Parallax";
import {
  Collapse,
  CssBaseline,
  Divider,
  Grid,
  Icon,
  IconButton,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
import SearchBar from "./SearchBar";
import "./offre.css";
import authAxios from "authAxios";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
import CustomInput from "components/CustomInput/CustomInput";
import CloseIcon from "@material-ui/icons/Close";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Alert } from "@material-ui/lab";
import Pagination from '@material-ui/lab/Pagination';
import Drawer from "./Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Accordion from "@material-ui/core/ExpansionPanel";
import AccordionSummary from "@material-ui/core/ExpansionPanelSummary";
import AccordionDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from "react-router-dom";
import Postuler from "./Postuler";
import { now } from "moment";
import Badge from "components/Badge/Badge";
import  MyContext  from "MyProvider";
import clsx from 'clsx';
import {FacebookShareCount,FacebookShareButton,FacebookIcon,TwitterIcon,TwitterShareButton, LinkedinShareButton, LinkedinIcon} from "react-share";
import Loader from "react-loader-spinner";
import { Texture } from "@material-ui/icons";

const useStyles = makeStyles(styles, () => ({
  root: {
    backgroundColor: "purple",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "50%",
  },
}));

/*const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
Transition.displayName = "Transition";
*/
export default function Offres(props) {
  const { maissa, style, ...rest } = props;
  const classes = useStyles();
  const [classicModal, setClassicModal] = useState(false);
  const [classicModal1, setClassicModal1] = useState(false);
  const [classicModalLogin, setClassicModalLogin] = useState(false);

  //get user
  const [user, setUser] = useState([]);
  function getUser() {
    authAxios
      .get("Candidats/" + localStorage.getItem("iduser"), {
        method: "GET",
      })
      .then(
        (res) => {
          console.log(res.data)
          setUser(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open, item) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOffre(item);
    setLangues(item.langue);
    setCometences(item.competence)
    setDiplomes(item.diplome)
    setState({ ...state, [anchor]: open });
  };
  const [offre, setOffre] = useState([]);
  const [competences, setCometences] = useState([]);
  const [langues, setLangues] = useState([]);
  const [diplomes, setDiplomes] = useState([]);
  const [nom, setNom] = useState(user.nom);
  const [prenom, setPrenom] = useState(user.prenom);
  const [email, setEmail] = useState(user.email);
  const [desc, setDesc] = useState();

  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(false);

  // get all offres
  function getAllOffres() {
    setLoading(true)
    authAxios.get("Offre/getAllOffres").then(
      (res) => {
        console.log(res.data);
        setOffres(res.data);
        // setOffres(res.data.slice(indexOfFirstTodo, indexOfLastTodo))
        setForDisplay(res.data)
        setLoading(false)
      },
      (error) => {
        alert(error);
        setLoading(false)
        console.log(error);
      }
    );
  }
  const [state1, setState1] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state1;
  const handleClose = () => {
    setState1({ ...state1, open: false });
  };
  function postuler(e) {
    e.preventDefault();
    console.log(offre.id)
    var iduser = localStorage.getItem("iduser");
    authAxios
      .post("Candidature/AddCandidature/" + iduser + "/" + offre.id, {
        nom: nom,
        prenom: prenom,
        email: email,
        lettre_motivation: desc,
      })
      .then((res) => {
        console.log(res.data)
        setState1({ ...state1, open: true })
        setClassicModal1(false);
      },
      (error) => {
        alert(error);
        console.log(error);
      });
  }

  const [open1, setOpen1] = useState(false);
  const [hidden, setHidden] = useState("none");
  const [nombre, setNombre] = useState(0);
  const [message, setMessage] = useState("");
  const [lien, setLien] = useState("");
  const [textebutton, setTextButton] = useState("");
  const [bar, setBar] = useState(0);

  function progression() {
    var l = 20; var e = 20; var et = 20; var c = 20; var h = 10; var lin = 10;
    if (user.langue == 0) { l = 0; }
    if (user.experience_prof == 0) { e = 0; }
    if (user.formation == 0) { et = 0; }
    if (user.competence == 0) { c = 0; }
    if (user.hobby == 0) { h = 0; }
    if (user.linkedin == 0) { lin = 0; }
    setBar(l + e + et + c + h + lin);
  }

  function fonction2(item) {
    setOffre(item);
    console.log("offre fonction 2", offre)
    console.log(offre)
    setNom(user.nom);
    setPrenom(user.prenom);
    setEmail(user.email);
    setClassicModal1(true);
  }

  const [offreclicked, setOffreClicked] = useState([])
  const [verif, setVerif] = useState(false)
  const [a, setA] = useState(false)

  function verifWords(str1,str2) {
    var words1 = str1.split(/\s+/g),
      words2 = str2.split(/\s+/g),
      i,
      j;
    var counts=0;
    for (i = 0; i < words1.length; i++) {
    //  console.log("i from boucle 1 :",i)
      for (j = 0; j < words2.length; j++) {
       // console.log("j from boucle 1 :",j)
        if (words1[i].toLowerCase() == words2[j].toLowerCase() && isNaN(words1[i]) && isNaN(words2[j])
         && words1[i].match(/[a-zA-Z]/) && words2[j].match(/[a-zA-Z]/)) {
          counts++;
          console.log('word : "' + words1[i] + ' " was found in both strings');
        }
      }
    }
    return counts;
  }
  //check user's profile data
  function CheckData() {
    if (offreclicked != 0 && user != 0) {
      //verif languages
      var founds1 = [];
      var lngs;
      offreclicked.langue.map((o) => {
        lngs = user.langue.find(element=>element.langue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() === o.langue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() && element.value >= o.value);
        if (lngs) {
          founds1.push(lngs)
        }
      });
      var founds2 = [];
      var cmpts;
         console.log("competences user",user.competence)
      offreclicked.competence.map((o,index) => {
        cmpts = user.competence.find(
          element => 
          //element.titre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().split(" ").includes(o.titre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().split(" "))
          element.value >= o.value && verifWords(element.titre,o.titre)>0);
        if (cmpts) {
          founds2.push(cmpts)
        }
      })

      //diplomes
      var founds3 = [];
      var dips;
      // console.log(user.competences)
     for(var j = 0; j< offreclicked.diplome.length;j++) {
        console.log("cpt j :",j)
        dips = user.formation.find(element => (verifWords(element.diplome,offreclicked.diplome[j].titre)>0)
        //  element.normalize("NFD").replace(/[\u0300-\u036f]/g, "").diplome.toUpperCase().includes(o.titre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase())
          );
        //  for(var i = 0;i< user.formation.length;i++){
         // console.log('index of dip offre : ',index)
        //  console.log('"cpt i :", : ',i)
          if (dips
        //    verifWords(user.formation[i].diplome,offreclicked.diplome[j].titre)>0
            ) {
            founds3.push(dips)
          }
      }
      
      
      console.log("tab founds 3 of displomes :",founds3)
      console.log("tab founds 2 of competeces :",founds2)
      console.log("verif displomes length", founds3.length >= offreclicked.diplome.length)
      console.log("verif langues length", founds1.length === offreclicked.langue.length)
      console.log("verif competences length", founds2.length === offreclicked.competence.length)
      console.log("Compétences :",founds2)
      //expyears(offreclicked.annee_exp);
     // console.log("offre clicked :", offreclicked)
      console.log("value of verif", verif)
      setA(verif);
      console.log("evaluer expression : ",verif == true  && founds1.length === offreclicked.langue.length &&
      founds2.length === offreclicked.competence.length &&
      founds3.length >= offreclicked.diplome.length)
      if ( expyears(offreclicked.annee_exp)==true
        && founds1.length === offreclicked.langue.length &&
        founds2.length === offreclicked.competence.length &&
        founds3.length >= offreclicked.diplome.length
        ) {
        if (user.candidatures.find(element => element.offre.id == offreclicked.id) !== undefined) {
          setClassicModal1(false);
          setMessage("Vous avez déjà postulé à cette offre ! ")
          setTextButton("Ok")
          //setClassicModal1(false);
          setClassicModalLogin(true);
        } else {
          setClassicModalLogin(false)
          setOffre(offreclicked);
          setNom(user.nom);
          setPrenom(user.prenom);
          setEmail(user.email);
          // setClassicModalLogin(false)
          setClassicModal1(true);
        }
      }
      else {
        if (user.candidatures.find(element => element.offre.id == offreclicked.id) !== undefined) {
          setClassicModal1(false);
          setMessage("Vous avez déjà postulé à cette offre ! ")
          setTextButton("Ok")
          setClassicModalLogin(true);
        }
        else{
          console.log(user.candidatures)
          setClassicModal1(false);
          setMessage("Votre profil ne correspond pas aux exigences du cette offre !")
          setTextButton("Compris")
          setClassicModalLogin(true)
        }
      }
      setOffreClicked([])
    }

  }
  function expyears(anneexp) {
    console.log("nbranne from function switch :", nbrannee)
    switch (anneexp) {
      case "Sans expérience": setVerif(true); console.log("case 0");return true; break;
      case "Moins d'un an": if (nbrannee >= 1 || nbrannee <= 1) { setVerif(true);return true; } else {setVerif(false);return false;};
        console.log("case 1"); break;
      case "1 à 2 ans": if (nbrannee >= 1 ) { setVerif(true) ;return true;} else { setVerif(false);return false; };
        console.log("case 2"); break;
      case "3 à 5 ans": if (nbrannee >= 3 || nbrannee >= 5) { setVerif(true);return true; } else { setVerif(false);return false; };
        console.log("case 3"); break;
      case "6 à 10 ans": if (nbrannee >= 6 || nbrannee >= 10) { setVerif(true) ;return true;} else { setVerif(false) ;return false;};
        console.log("case 4"); break;
      case "Plus de 10 ans": if (nbrannee >= 10) { setVerif(true);return true; } else { setVerif(false) ;return false;};
        console.log("case 5"); break;
      default: console.log("default case !"); break;
    }
  }
  const [nbrannee, setNbrAnnee] = useState()
  /*********************************************** */

  useEffect(() => {
    CheckData();
   console.log("offre clicked ; ", offreclicked)
  }, [offreclicked]);

  useEffect(() => {
    getAllOffres();
    getUser();

  }, []);
  var x = 0;
  useEffect(() => {
    progression();
    if (user != 0) {
      user.experience_prof.map((item) => {
        x = x + (((new Date(item.date_fin) - new Date(item.date_debut)) / (1000 * 3600 * 24)) / 365)
        setNbrAnnee(x)
      })
      //  console.log(nbrannee)
    }
  }, [user, nbrannee]);

  //function getOffresPagination(){

  // }
  const [fordisplay, setForDisplay] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [offrePerPage, setOffrePerPage] = useState(2)
  var [currentOffres, setCurrentOffres] = useState([])
  
  //console.log("current offre from get AllOffres : ",currentOffres)
  const indexOfLastTodo = currentPage * offrePerPage;
  const indexOfFirstTodo = indexOfLastTodo - offrePerPage;
  currentOffres = offres.slice(indexOfFirstTodo, indexOfLastTodo)
 
  useEffect(() => {
     const indexOfLastTodo = currentPage * offrePerPage;
     const indexOfFirstTodo = indexOfLastTodo - offrePerPage;
     currentOffres = offres.slice(indexOfFirstTodo, indexOfLastTodo)
     setCurrentPage(1)
     console.log("current offres after change or first render : ",currentOffres);
     console.log("indexOfLastTodo : ",indexOfLastTodo);
     console.log("indexOfFirstTodo : ",indexOfFirstTodo);

  }, [offres])
  const handleChange = (event, value) => {
    setCurrentPage(value)
  };
  const context = useContext(MyContext)
  //console.log(context)
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
 
  return (
    <div>
      <Parallax style={{ height: "100px" }} />
      <h4 style={{ textAlign: "center" }}>
        <strong> Trouvez des offres</strong>{" "}
      </h4>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        //autoHideDuration={4000}
        onClose={handleClose}
        style={{ marginTop: "35px" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          style={{ backgroundColor: "purple", color: "white" }}
        >
          Votre demande a été bien envoyée !<br></br>
          <Link to="/candidat/mes-candidatures" style={{ color: "white", textDecoration:"underline"}}>
            Consulter mes canidatures
          </Link>
        </Alert>
      </Snackbar>
      <SearchBar offres={offres}
        currentOffres={currentOffres}
        setCurrentOffres={setCurrentOffres}
        setOffres={setOffres}
        getAllOffres={getAllOffres}
        setNombre={setNombre}
        setHidden={setHidden} />
      <br></br>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ backgroundColor: "#F0F0F0" }}>
          <Grid container direction="row" justify="center">
            <GridItem xs={12} sm={12} md={8}>
            <br></br>
              <Loader type="ThreeDots" color="purple" height={60} width={60} style={{marginLeft:"45%"}}  visible={loading}>
              <span>Loading ...</span>
              </Loader>
              <div style={{ display: hidden }}>
                <h3><strong ><span style={{ color: "purple" }}>{nombre}</span> offres trouvées</strong></h3>
              </div>
              {currentOffres.map((item, index, offres) => (
                (new Date(item.date_expiration) - new Date()) / (1000 * 3600 * 24) > 0 ?
                  <div key={"gg" + item.id}>
                    <Card className="animcard" id={item.id}>
                      <CardBody>
                         <Grid container direction="row" justify="space-between">                   
                          <GridItem xs={12} sm={12} md={8}>
                           {(new Date(item.date_expiration) - new Date()) / (1000 * 3600 * 24) < 3 ?
                              <Badge color="info">Offre Bientôt expirée</Badge> : null
                           }
                            <h6>Publié le {new Date(item.date_publication).toLocaleString('fr-FR').slice(0, 10)}</h6>
                            <h5>
                            <strong>{item.titre}</strong>
                          </h5>
                        <h5>
                          <i
                            className="fas fa-map-marker-alt"
                            style={{ color: "purple" }}
                          ></i>{" "}
                          {item.lieu_travail}
                        </h5>
                          <span style={{ overflow: "hidden" }}>
                            <span id="spandesc" dangerouslySetInnerHTML={{__html:item.description}}></span>
                          </span>
                          </GridItem>
                          <GridItem  xs={12} sm={12} md={3}
                             style={{
                              //backgroundColor:"grey",
                              float: "right",  
                             display: "flex",
                             flexDirection: "column",
                             justifyContent:"center",
                           //  marginTop:"-25px",
                            // flexWrap:"wrap",
                             alignContent: "center",
                            }}>
                            <div style={{display:"flex",  flexDirection: "row",alignItems:"center",
                             justifyContent:"center",marginRight:"-0%",marginTop:"0px"}}>
                            <FacebookShareButton
                      
                      hashtag="#areaconsulting"
                      url={`http://13df0c165b7a.ngrok.io/toutes-les-offres/details/${item.id}`}
                      quote={"Offre disponible sur Area E-hire : \n"+item.titre}
                      >
                      <FacebookIcon size={25} round={true}/>
                    </FacebookShareButton>
                    <TwitterShareButton
                     // hashtags="#areaconsulting"
                      title={"Offre disponible sur Area E-Hire : \n "+item.titre}
                      url={`http://13df0c165b7a.ngrok.io/toutes-les-offres/details/${item.id}`}
                      via={"AreaEHire"}
                     >
                      <TwitterIcon  size={25} round={true}></TwitterIcon>
                    </TwitterShareButton> 
                    <LinkedinShareButton
                    title={"Offre disponible sur Area E-Hire : \n "+item.titre}
                    url={`http://13df0c165b7a.ngrok.io/toutes-les-offres/details/${item.id}`}
                    description = "Rejoignez-nous pour une meilleure expérience ! this is some description for sharing an oppirtunity job from Area E-Hire on Linkedin web site !">
                      <LinkedinIcon size={25} round={true}></LinkedinIcon>
                    </LinkedinShareButton>
                            </div>
                          <Button
                            color="default"
                            onClick={(e) => {
                              //setOffre(offres[index]),
                              /*voirplus(offres[index]);*/
                            }}
                            onClick={toggleDrawer("right", true, offres[index])}>
                            <LibraryBooks className={classes.icon} />
                            Voir plus
                          </Button>
                          {localStorage.getItem('iduser') && bar >= 80 ?
                            <Button
                              onClick={() => {
                              //  setOffreClicked([]);
                                setOffreClicked(offres[index]);
                               // CheckData(offres[index]);
                                // fonction2(offres[index]);
                              }}
                              color="primary"
                            >
                              Postuler
                            </Button> : [
                              localStorage.getItem('iduser') && bar < 80 ?
                                <Button
                                  onClick={() => {
                                    setClassicModalLogin(true);
                                    setMessage("Vous devez avoir un profil complété à 80% au minimum !");
                                    setLien("/candidat/moncompte");
                                    setTextButton("Complétez votre profil")
                                  }}
                                  color="primary"
                                >
                                  Postuler
                                </Button>
                                :
                                <Button
                                  onClick={() => {
                                    setClassicModalLogin(true);
                                    setMessage("Vous devez vous connectez à votre comte pour pouvoir postuler à nos offres !");
                                    setLien("/login");
                                    setTextButton("Connectez-vous maintenant");
                                  }}
                                  color="primary"
                                >
                                  Postuler
                          </Button>
                            ]
                          }
                         { /*</div>*/}
                         </GridItem>
                         </Grid>
                         {/*<GridItem xs={12} sm={12} md={10}>*/}
                         
                       { /*</GridItem>*/}
                          <Postuler
                            setClassicModalLogin={setClassicModalLogin}
                            classicModalLogin={classicModalLogin}
                            message={message}
                            lien={lien}
                            textebutton={textebutton}>
                          </Postuler>
                        
                       
                      </CardBody>
                      {/*** postuler à une offre */}
                      <Dialog
                        classes={{
                          root: classes.center,
                          paper: classes.modal,
                        }}
                        open={classicModal1}
                        //TransitionComponent={Transition}
                        keepMounted
                        onClose={() => setClassicModal1(false)}
                        aria-labelledby="classic-modal-slide-title"
                        aria-describedby="classic-modal-slide-description"
                      >
                        <DialogTitle
                          id="classic-modal-slide-title"
                          disableTypography
                          className={classes.modalHeader}
                        >
                          <IconButton
                            className={classes.modalCloseButton}
                            key="close"
                            style={{ fontSize: "10px", float: "right" }}
                            aria-label="Close"
                            color="inherit"
                            onClick={() => setClassicModal1(false)}
                          >
                            <Close className={classes.modalClose} />
                          </IconButton>
                          <h3 style={{ textAlign: "center" }}>
                            <strong> Postuler à {offre.titre}</strong>
                          </h3>
                          <Divider />
                        </DialogTitle>
                        <DialogContent
                          id="classic-modal-slide-description"
                        //  className={classes.modalBody}
                        >
                          <form className={classes.form} onSubmit={postuler}>
                            <Card>
                              <CardBody>
                                <CustomInput
                                  id={"nom" + item.id}
                                  onChange={(e) => setNom(e.target.value)}
                                  value={nom}
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  inputProps={{
                                    placeholder: "Nom",
                                    type: "text",
                                    autoComplete: "off",
                                  }}
                                />
                                <CustomInput
                                  value={prenom}
                                  onChange={(e) => setPrenom(e.target.value)}
                                  id={"prenom" + item.id}
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  inputProps={{
                                    placeholder: "Prénom",
                                    type: "text",
                                    autoComplete: "off",
                                  }}
                                />
                                <CustomInput
                                  id={"email" + item.id}
                                  onChange={(e) => setEmail(e.target.value)}
                                  defaultValue={email}
                                  value={email}
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  inputProps={{
                                    placeholder: "Email",
                                    type: "email",
                                    autoComplete: "off",
                                  }}
                                />
                                <CustomInput
                                required ="false"
                                  labelText="Présentez vous brièvement..."
                                  id={"description" + item.id}
                                  value={desc}
                                  onChange={(e) => setDesc(e.target.value)}
                                  inputProps={{
                                    multiline: true,
                                    rows: 5,
                                  }}
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                />
                              </CardBody>
                              <DialogActions className={classes.modalFooter}>
                                <Button color="primary" type="submit" className={classes.modalFooter}>
                                  Envoyer
                               </Button>
                              </DialogActions>
                            </Card>
                          </form>
                        </DialogContent>
                      </Dialog>
                      {/****** details offre  ***********/}
                      <div key={"right"}>
                        <SwipeableDrawer
                        //swipeAreaWidth={10}
                        disableBackdropTransition={!iOS} disableDiscovery={!iOS}
                        anchor={"right"}
                        //  classes={{ paper: classes.paper }}
                          open={state["right"]}
                          onClose={toggleDrawer("right", false, offres[index])}
                          onOpen={toggleDrawer("right", true, offres[index])}
                        >
                         <div style={{textAlign: "center", padding: 8 }} 
                         className={classes.fullList}
                         >
                            <Button color="primary" justIcon round onClick={toggleDrawer("right", false, offre)}
                              style={{ float: "left" }}>
                              <ChevronLeftIcon > : </ChevronLeftIcon>
                            </Button>
                            <div style={{ maxWidth:"75ch",textAlign: "center"}}>
                            <h3 >
                              <strong> {offre.titre}</strong>
                            </h3>
                            </div>
                            <p style={{ textAlign: "center" }}>
                              {" "}
                              <i
                                style={{ color: "purple" }}
                                className="fas fa-map-marker-alt"
                              ></i>{" "}
                              <strong>{offre.lieu_travail}</strong>
                            </p>
                            <Divider />
                            <h6>
                              <i
                                className="far fa-clock"
                                style={{ color: "purple" }}
                              ></i>{" "}
                          Publié le {new Date(offre.date_publication).toLocaleString('fr-FR').slice(0, 10)}
                            </h6>
                            <h6>
                              <strong>
                                <i
                                  className="far fa-clipboard"
                                  style={{ color: "purple" }}
                                ></i>{" "}
                            Type de l'offre :
                          </strong>{" "}
                              {offre.type_offre}
                            </h6>
                            <div style={{ maxWidth:"75ch",textAlign:"center" }}>
                            <p>
                              <strong>Description de l'offre</strong>
                              <br></br>
                                <span dangerouslySetInnerHTML={{__html:offre.description}}></span>
                            </p>
                            </div>
                            <h6>
                              <strong>
                                <i
                                  className="far fa-file-alt"
                                  style={{ color: "purple" }}
                                ></i>{" "}
                            Type de contrat :
                          </strong>{" "}
                              {offre.type_contrat}
                            </h6>
                            <h6>
                              <strong>
                                <i
                                  className="far fa-star"
                                  style={{ color: "purple" }}
                                ></i>{" "}
                            Années d'expériences demandées :{" "}
                              </strong>{" "}
                              {offre.annee_exp}
                            </h6>
                            <Accordion style={{ width: "100%" }}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <h6>
                                  <strong>
                                    <i className="fas fa-language" style={{ color: "purple" }} ></i>{" "}
                                  Langues demandées{" "}
                                  </strong>
                                </h6>
                              </AccordionSummary>
                              {langues.map((item) => (
                                <AccordionDetails
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    flexDirection: "row",
                                  }}
                                >
                                  <h6>
                                  {/*{item.require===true ? (<h6> (Essentiel) </h6>) : <h6> (Optionnel) </h6>} {" "}*/}
                                  <span>{item.langue}</span></h6>
                                  <span style={{ fontSize: "15px" }}>{item.niveau}</span>
                                </AccordionDetails>
                              ))}
                            </Accordion>
                            <Accordion style={{ width: "100%" }}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <h6>
                                  <strong>
                                    <i class="fas fa-clipboard" style={{ color: "purple" }}></i>{" "}Compétences demandées{" "}
                                  </strong>
                                </h6>
                              </AccordionSummary>
                              {competences.map((item) => (
                                <AccordionDetails
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    flexDirection: "row",
                                  }}
                                >
                               {/*{item.require===true ? (<h6> (Essentiel) </h6>) : <h6> (Optionnel) </h6>} {" "}*/}
                                  <h6>
                                  <span>{item.titre}</span></h6>
                                  <span style={{ fontSize: "15px" }}>{item.niveau}</span>
                                </AccordionDetails>
                              ))}
                            </Accordion>
                            <Accordion style={{ width: "100%" }}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <h6>
                                  <strong>
                                    <i class="fas fa-graduation-cap"
                                      style={{ color: "purple" }}
                                    ></i>{" "}
                                  Diplômes demandés{" "}
                                  </strong>
                                </h6>
                              </AccordionSummary>
                              {diplomes.map((item) => (
                                <AccordionDetails
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    flexDirection: "row",
                                  }}
                                >
                                  {/*{item.require===true ? (<h6> (Essentiel) </h6>) : <h6> (Optionnel) </h6>} {" "}*/}
                                  <div style={{maxWidth:"300px"}}><h6><span>{item.titre}</span></h6></div>
                                  <div style={{maxWidth:"300px"}}><span style={{ fontSize: "12px", color: "grey" }}>{item.description}</span></div>
                                </AccordionDetails>
                              ))}
                            </Accordion>
                            <h6>
                              <strong>
                                <i
                                  className="far fa-user"
                                  style={{ color: "purple" }}
                                ></i>{" "}
                                     Postes vacants : {offre.nbr_poste}
                              </strong>{" "}
                            </h6>
                            <h6>
                              <i
                                className="far fa-clock"
                                style={{ color: "purple" }}
                              ></i>{" "}
                              <strong>
                                Date d'expiration : {new Date(offre.date_expiration).toLocaleString('fr-FR').slice(0, 10)}
                              </strong>
                            </h6>
                            <h6>
                              <Link to={"/toutes-les-offres/details/"+offre.id}><Button color="primary"> Voir dans une page à part </Button></Link>
                            </h6>
                          </div> 
                      </SwipeableDrawer>
                      </div>
                    </Card>
                  </div>
                  : null
              ))}
            </GridItem>
          </Grid>
          {<div className={classes.description}></div>}
          {<div className={classes.description}></div>}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Pagination count={Math.ceil(offres.length / 2)} color="default" page={currentPage} onChange={handleChange} />
          </div>
          { /* <Pagination count={offres.length/3} variant="outlined"  />*/}
        </div>
      </div>
      <Footer />
      
    </div>
  );
}
