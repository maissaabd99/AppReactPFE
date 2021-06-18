import React,{ useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Link, useParams } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import classNames from "classnames";
import Slide from "@material-ui/core/Slide";
import Parallax from "components/Parallax/Parallax";
import authAxios from "authAxios";
import Loader from "react-loader-spinner";
import { Divider, Grid, IconButton, Snackbar } from "@material-ui/core";
import Footer from "components/Footer/Footer";
import "./offre.css"
import Badge from "components/Badge/Badge";
import {FacebookShareButton,FacebookIcon,TwitterIcon,TwitterShareButton,LinkedinShareButton,LinkedinIcon} from "react-share";
import Postuler from "./Postuler";
import MetaTags from 'react-meta-tags';
import CustomInput from "components/CustomInput/CustomInput";
import { Close } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import img from "assets/img/logo.png";

//import MuiAlert from '@material-ui/lab/Alert';
const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function DetailsOffre(props) {
  const classes = useStyles();
  const {cle,className,offre,...rest } = props;
  const [classicModal, setClassicModal] = useState(false);

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
  const [nom, setNom] = useState(user.nom);
  const [prenom, setPrenom] = useState(user.prenom);
  const [email, setEmail] = useState(user.email);
  const [desc, setDesc] = useState();
  //********************************************************* */
const[loading,setLoading] = useState(false);
const[offrebyid,setOffreById] = useState([]);
const[langues,setLangues] = useState([]);
const[competences,setCompetences] = useState([]);
const[diplomes,setDiplomes] = useState([]);
const {idoffre} = useParams();

//get offre by id 
function getOffre() {
  setLoading(true)
var id = localStorage.getItem("iduser");
 authAxios
  .get("Offre/getOffreById/"+idoffre)
  .then((res) => {
    setLoading(false);
    console.log(res.data)
    setOffreById(res.data);
    setLangues(res.data.langue);
    setCompetences(res.data.competence);
    setDiplomes(res.data.diplome);
  },
  (error) => {
    setLoading(false);
    console.log(error);
  });
}

const [offreclicked, setOffreClicked] = useState([])
const [verif, setVerif] = useState(false)

function verifWords(str1,str2) {
  var words1 = str1.split(/\s+/g),
  words2 = str2.split(/\s+/g),
  i,j;
  var counts=0;
  for (i = 0; i < words1.length; i++) {
    for (j = 0; j < words2.length; j++) {
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
        element.value >= o.value && verifWords(element.titre,o.titre)>0);
      if (cmpts) {
        founds2.push(cmpts)
      }
    })
    //diplomes
    var founds3 = [];
    var dips;
   for(var j = 0; j< offreclicked.diplome.length;j++) {
      console.log("cpt j :",j)
      dips = user.formation.find(element => (verifWords(element.diplome,offreclicked.diplome[j].titre)>0)
        );
        if (dips
          ) {
          founds3.push(dips)
        }
    }
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
        setClassicModalLogin(true);
      } else {
        setClassicModalLogin(false)
        setNom(user.nom);
        setPrenom(user.prenom);
        setEmail(user.email);
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
    case "Moins d'un an": if (nbrannee >= 1 || nbrannee <= 1) { setVerif(true);return true; } else {setVerif(false);return false;};break;
    case "1 à 2 ans": if (nbrannee >= 1 ) { setVerif(true) ;return true;} else { setVerif(false);return false; };break;
    case "3 à 5 ans": if (nbrannee >= 3 || nbrannee >= 5) { setVerif(true);return true; } else { setVerif(false);return false; };break;
    case "6 à 10 ans": if (nbrannee >= 6 || nbrannee >= 10) { setVerif(true) ;return true;} else { setVerif(false) ;return false;};break;
    case "Plus de 10 ans": if (nbrannee >= 10) { setVerif(true);return true; } else { setVerif(false) ;return false;};break;
    default: console.log("default case !"); break;
  }
}
const [nbrannee, setNbrAnnee] = useState()
/*********************************************** */
useEffect(() => {
  CheckData();
 console.log("offre clicked ; ", offreclicked)
}, [offreclicked]);

var x = 0;
useEffect(() => {
  progression();
  if (user != 0) {
    user.experience_prof.map((item) => {
      x = x + (((new Date(item.date_fin) - new Date(item.date_debut)) / (1000 * 3600 * 24)) / 365)
      setNbrAnnee(x)
    })
  }
}, [user, nbrannee]);

useEffect(() => {
  getOffre();
  getUser();
}, [])

const [state1, setState1] = useState({
  open: false,
  vertical: "top",
  horizontal: "right",
});
const { vertical, horizontal, open } = state1;
const handleClose = () => {
  setState1({ ...state1, open: false });
};
//postuler 
function postuler(e) {
  e.preventDefault();
  var iduser = localStorage.getItem("iduser");
  authAxios
    .post("Candidature/AddCandidature/" + iduser + "/" + offrebyid.id, {
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

    return (
      <div>
      <head>
       <MetaTags>
            <title>{offrebyid.titre}</title>
            <meta property="og:description" content="Some description." />
            <meta property="og:title" content="Area E-Hire" /> 
            <meta property="og:type" content="web application" />
            <meta property="og:url" content="https://pypolo.com" />
            <meta property="og:image" content="https://www.telotrovo.it/wp-content/uploads/2016/02/siteimage.jpg" />
          </MetaTags>
      </head>
        <Parallax style={{ height: "100px" }} /> 
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div style={{ backgroundColor: "#F0F0F0" }}>
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
     
            <Grid  container direction="row" justify="center">
              <GridItem xs={12} sm={12} md={9}>
              <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center" }}>
              <Card>
                <CardBody>
                <Loader type="ThreeDots" color="purple" height={60} width={60} style={{marginLeft:"45%"}}  visible={loading}/>   
                  <h4 className="centerText"><strong>{offrebyid.titre}</strong></h4>
                  {(new Date(offrebyid.date_expiration) - new Date()) / (1000 * 3600 * 24) < 3 ?
                    <Badge color="info">Offre Bientôt expirée</Badge> : null
                  }
                  <h5>Publié le {new Date(offrebyid.date_publication).toLocaleString('fr-FR').slice(0, 10)}</h5>
                  <h5>
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ color: "purple" }}
                    ></i>{" "}
                    {offrebyid.lieu_travail}
                  </h5>
                  <h5>
                    <span className="boldText">Type de l'offre : </span>
                    {offrebyid.type_offre}
                  </h5>
                  <h5 className="boldText">Description </h5>
                  <span dangerouslySetInnerHTML={{__html:offrebyid.description}}></span>
                  <h5 className="boldText">Langues demandées </h5>
                  {langues.map((item,index)=>(
                    <ul>
                      <li>{item.langue} {"  "} ({item.niveau})</li> 
                    </ul>
                  ))}
                  <h5 className="boldText">Compétence demandées </h5>
                  {competences.map((item,index)=>(
                    <ul>
                      <li>{item.titre} {"  "} ({item.niveau})</li> 
                    </ul>
                  ))}
                  <h5 className="boldText">Diplômes demandés </h5>
                  {diplomes.map((item,index)=>(
                    <ul>
                      <li>{item.titre} </li>
                      {item.description}
                    </ul>
                  ))}
                  <h5>
                    <span className="boldText">Années d'éxpériences demandées : </span>
                    {offrebyid.annee_exp}
                  </h5>
                  <h5>
                    <span className="boldText">Type de contrat : </span>
                    {offrebyid.type_contrat}
                  </h5>
                  <h5>
                    <span className="boldText">Postes vacants : </span>
                    {offrebyid.nbr_poste}
                  </h5>
                  <h5> <span className="boldText">Date d'expiration : </span>
                    {new Date(offrebyid.date_expiration).toLocaleString('fr-FR').slice(0, 10)}
                  </h5>
                  <div
                    style={{
                    float: "right",  
                    display: "flex",
                    flexDirection: "column",
                  }}>
                   <div className="flexOne">
                    <FacebookShareButton
                      hashtag="#areaconsulting"
                      url={`http://192.168.1.5:3000/toutes-les-offres/details/${offrebyid.id}`}
                      quote={"Offre disponible sur Area E-hire : \n"+offrebyid.titre}>
                      <FacebookIcon size={40} round={true}/>
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`http://192.168.1.5:3000/toutes-les-offres/details/${offrebyid.id}`}
                      quote={"Offre disponible sur Area E-hire : \n"+offrebyid.titre}>
                      <TwitterIcon  size={40} round={true}></TwitterIcon>
                    </TwitterShareButton> 
                    <LinkedinShareButton url={`http://192.168.1.5:3000/toutes-les-offres/details/${offrebyid.id}`}
                      quote={"Offre disponible sur Area E-hire : \n"+offrebyid.titre}>
                      <LinkedinIcon  size={40} round={true}></LinkedinIcon>
                    </LinkedinShareButton>
                   </div>
                  <GridItem>
                  {localStorage.getItem('iduser') && bar >= 80 ?
                            <Button
                              onClick={() => {
                                setOffreClicked(offrebyid);
                              }}
                              color="primary"
                            >
                              Postuler maintenant
                            </Button> : [
                              localStorage.getItem('iduser') && bar < 80 ?
                                <Button
                                  onClick={() => {
                                    setClassicModalLogin(true);
                                    setMessage("Vous devez avoir un profil complété à 80% au minimum !");
                                    setLien("/candidat/moncompte");
                                    setTextButton("Complétez votre profil")
                                  }}
                                  color="primary">
                                  Postuler maintenant
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
                                  Postuler maintenant
                          </Button>
                            ]
                          }
                          <Postuler
                            setClassicModalLogin={setClassicModalLogin}
                            classicModalLogin={classicModalLogin}
                            message={message}
                            lien={lien}
                            textebutton={textebutton}>
                          </Postuler>
                  </GridItem>
                  </div>
                </CardBody>
              </Card>
              </div>
              </GridItem>
            </Grid>
          </div>
        </div>
        {/*********************Postuler à l'offre **********************/}
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
              <strong> Postuler à {offrebyid.titre}</strong>
            </h3>
            <Divider />
          </DialogTitle>
          <DialogContent id="classic-modal-slide-description"  >
            <form className={classes.form} onSubmit={postuler}>
              <Card>
                <CardBody>
                  <CustomInput
                    id={"nom"}
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
                    id={"prenom"}
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
                    id={"email"}
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
                    required="false"
                    labelText="Présentez vous brièvement..."
                    id={"description"}
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
        <Footer />
      </div>
  ); 
}