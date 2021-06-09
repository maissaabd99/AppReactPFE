import React, { useEffect,useContext } from "react";
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
import "./candidature.css";

import {
  Collapse,
  CssBaseline,
  Divider,
  Grid,
  Snackbar,
} from "@material-ui/core";
import authAxios from "authAxios";
// @material-ui/icons
import "react-notifications-component/dist/theme.css";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Accordion from "@material-ui/core/ExpansionPanel";
import AccordionSummary from "@material-ui/core/ExpansionPanelSummary";
import AccordionDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from "react-router-dom";
import { Delete } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {IconButton} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import Loader from "react-loader-spinner";


const useStyles = makeStyles(styles,() => ({
  root: {
    backgroundColor: "purple",
  },
  titreOffre :{
   textTransform:"none"
  },
  '&:hover titreOffre': {
    textDecoration:"underline"
  },

}));

export default function Candidature(props) {
  const {maissa,style ,...rest } = props;
  const classes = useStyles();
  const [classicModal, setClassicModal] = useState(false);
  const [classicModal1, setClassicModal1] = useState(false);
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
    console.log(item)
    setOffre(item);
    setLangues(item.langue);
    setCometences(item.competence)
    setDiplomes(item.diplome)
    setState({ ...state, [anchor]: open });
    console.log(langues)
  };
  const [competences, setCometences] = useState([]);
  const [langues, setLangues] = useState([]);
  const [diplomes, setDiplomes] = useState([]);
  const [offre, setOffre] = useState([]);

  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(false);
  var iduser= localStorage.getItem("iduser");
  // get all candidatures
  function getAllCandidatures() {
    setLoading(true)
    authAxios.get("Candidature/getAllCandidatures/"+iduser).then(
      (res) => {
        console.log("candidatures from get All  :",res.data.candidatures);
        setCandidatures(res.data.candidatures);
        setLoading(false)
      },
      (error) => {
        alert(error);
        setLoading(false)
        console.log(error);
      }
    );
  }

  //const context = useContext(MyContext)
  useEffect(() => {
    getAllCandidatures();
    }, []);
    const [state1, setState1] = useState({
      open: false,
      vertical: "top",
      horizontal: "right",
    });
    const { vertical, horizontal, open } = state1;
    const handleClose = () => {
      setState1({ ...state1, open: false });
    };
    const [ item, setItem ] = useState([]);
  return (
    <div>
      <Header color="white" fixed rightLinks={<HeaderLinks/>} />
      <Parallax style={{ height: "100px" }} /> 
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        style={{ marginTop: "45px" ,height:"50px"}}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          style={{ backgroundColor: "purple", color: "white" ,textAlign:"center"}}
        >
          Candidature supprimée<br></br> avec succès !
        </Alert>
      </Snackbar>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={classicModal1}
        keepMounted
        onClose={() => setClassicModal1(false)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
      <DialogTitle>
      </DialogTitle>
        <DialogContent
          id="classic-modal-slide-title"
          disableTypography
        >
          <p style={{ textAlign: "center" ,fontSize:16}}>
            <strong>
             Vouler vous vraiment supprimer 
             cette candidature ?
            </strong>
          </p>
        </DialogContent>
        <Divider />
        <DialogActions >
        <Button  type="reset" 
              onClick={() => setClassicModal1(false)}>
              Annuler
          </Button>
          <Button color="primary" type="submit"
            onClick={()=>{
              authAxios.delete("Candidature/deleteCandidature/"+item.id).then(
                      (res) => {
                       console.log(res.data);
                       getAllCandidatures();
                       setClassicModal1(false);
                       setState1({ ...state1, open: true })
                      },
                      (error) => {
                      alert(error);
                      console.log(error);
                    }
                    );
            }}>
              Supprimer
          </Button>
        </DialogActions>
        </Dialog>
      <h3 style={{ textAlign: "center",margin:"20px"}}>
        <strong><span style={{borderBottom:"5px solid grey",padding:10}}>Suivi de mes candidatures </span> </strong>{" "}
      </h3>
      <br></br>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ backgroundColor: "#F0F0F0" }}>
          <Grid container direction="row" justify="center" >
            <GridItem xs={12} sm={12} md={7}><br></br>
            <Loader type="ThreeDots" color="purple" height={60} width={60} style={{marginLeft:"45%"}} visible={loading}>Loading ...</Loader>
             {candidatures != 0 ?
             (candidatures.map((item, index, candidatures) => (
                  <Card id="gg">
                    <CardBody>
                   {item.etat.toLowerCase() === "en attente" || item.etat.toLowerCase() === "rejeté"  ?
                     <Button justIcon color="danger" style={{float:"right",marginRight:"-40px",marginTop:"-30px"}} 
                     onClick={()=>
                      { setClassicModal1(true);setItem(item)}
                   }><Delete/></Button>
                   : null
                   }
                   <Grid container direction="row" justify="space-between">     
                   {/******************************** Grid Item 1 ******************************** */}              
                   <GridItem xs={12} sm={12} md={7}>
                      <Link>
                      <p  id="transhover"  onClick={toggleDrawer("right", true,candidatures[index].offre)}>
                        <strong>{item.offre.titre}</strong>
                      </p>
                      </Link>
                      <h6>
                         <i
                            style={{ color: "purple" }}
                            className="fas fa-map-marker-alt"
                          ></i>{" "}
                        {item.offre.lieu_travail}
                      </h6>
                      <div style={{ overflow: "hidden" }}>
                      </div>
                      </GridItem>
                    {/******************************** Grid Item 2 ******************************** */}  
                   <GridItem xs={12} sm={12} md={5}
                     style={{
                          float: "right",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "left",
                         // flexWrap:"wrap"
                        }}
                   >
                        <p style={{textTransform:'none'}}>
                        <i
                          className="far fa-user"
                          style={{ color: "purple" }}
                        ></i>{" "}
                         postes ouverts : <strong>{item.offre.nbr_poste}</strong><br></br>
                          <i
                            className="far fa-clock"
                            style={{ color: "purple" }}
                          ></i>{" "}
                           Postulé le : {item.date_candidature.toLocaleString('fr-FR').slice(0,10)}  à {item.date_candidature.toLocaleString('fr-FR').slice(10,16)} <br></br>
                           <i class="far fa-file"
                              style={{ color: "purple" }}>
                            </i>{" "}
                           Etat de candidature : {" "}
                           {item.etat.toLowerCase() === "en attente" ? 
                           <span style={{color:"grey",textAlign:"center"}}><strong>{item.etat.toUpperCase()}</strong></span> 
                           : [
                            item.etat.toLowerCase() === "présélectionné" ? 
                            <span style={{color:"purple"}}><strong>{item.etat.toUpperCase()}</strong>
                            <Link to={"/candidat/mes-candidatures/examen/"+item.id+"/"+
                                                                           +item.offre.examen.id}>
                              <Button color="primary">Passer l'examen</Button>
                            </Link>
                            </span> 
                           :[
                              item.etat.toLowerCase() === "rejeté" ?
                              <span style={{color:"red"}}><strong>{item.etat.toUpperCase()}</strong>{" "}
                                 <span style={{color:"grey"}}>( Vous pouvez essayer d'autres offres disponibles <Link to={"/toutes-les-offres"} ><strong>ici</strong></Link> )</span></span> 
                              :[
                                item.etat.toLowerCase() === "préaccepté" ? 
                                <span style={{color:"green"}}><strong>{item.etat.toUpperCase()}</strong>{" "}
                                  <span style={{color:"grey"}}> ( Vous serez contacté par email/téléphone pour un entretient le plutôt possible )</span></span> 
                              : null
                            ]
                            ]
                           ]}
                         </p>
                      </GridItem>
                     
                      </Grid>
                    </CardBody>
                    
                    <React.Fragment key={"right"} >
                      <SwipeableDrawer 
                        anchor={"right"}
                        open={state["right"]}
                        onClose={toggleDrawer("right", false, candidatures[index].offre)}
                        onOpen={toggleDrawer("right", true, candidatures[index].offre)}
                      >
                      <div style={{maxWidth:"75ch",textAlign:"center",padding:8}}>
                      <Button color="primary" justIcon round onClick={toggleDrawer("right",false,candidatures[index].offre)} 
                           style={{float:"left"}}>
                        <ChevronLeftIcon > : </ChevronLeftIcon>
                      </Button>
                        <h3 style={{maxWidth:"75ch", textAlign: "center" }}>
                          <strong> {offre.titre}</strong>
                        </h3>
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
                          Publié le {offre.date_publication}
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
                            <h5>{offre.description}</h5>
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
                          {offre.annee_exp} ans
                        </h6>
                          <Accordion style={{ width: "100%" }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <h6>
                                <strong>
                                  <i class="fas fa-language" style={{ color: "purple" }} ></i>{" "}
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
                               {item.require===true ? (<h6> (Essentiel) </h6>) : <h6> (Optionnel) </h6>} {" "}
                                <h6><span>{item.langue}</span></h6>
                                <span style={{fontSize:"15px"}}>{item.niveau}</span>
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
                                  <i class="fas fa-clipboard" style={{color:"purple"}}></i>{" "}Compétences demandées{" "}
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
                               {item.require===true ? (<h6> (Essentiel) </h6>) : <h6> (Optionnel) </h6>} {" "}
                                <h6><span>{item.titre}</span></h6>
                                <span style={{fontSize:"15px"}}>{item.niveau}</span>
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
                                <h6><span>{item.titre}</span></h6>
                                <span style={{fontSize:"12px",color:"grey"}}>{item.description}</span>
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
                          Date d'expiration : {offre.date_expiration}
                        </h6>
                        </div>
                      </SwipeableDrawer>
                    </React.Fragment>
                    </Card>   
                  )))
                  : <div><h3 style={{textAlign:"center"}}>Aucune candidature pour le moment </h3><br></br></div>
            }
                {/*<Pagination count={10} variant="outlined" />*/}
            </GridItem> 
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
}
