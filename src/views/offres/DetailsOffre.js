import React,{ useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
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
    return (
      <Dialog
      classes={{
        root: classes.center,
        paper: classes.modal,
      }}
      open={classicModal}
      //TransitionComponent={Transition}
      keepMounted
      onClose={() => setClassicModal(false)}
      aria-labelledby="classic-modal-slide-title"
      aria-describedby="classic-modal-slide-description"
    >
      <DialogTitle
        id="classic-modal-slide-title"
        disableTypography
        className={classes.modalHeader}
      >
        <h3 style={{ textAlign: "center" }}>
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
      </DialogTitle>
      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
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
        <p>
          <strong>Description</strong>
          <br></br>
          {offre.description}
        </p>

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
        <h6>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h6>
                <strong>
                  <i
                    class="fas fa-language"
                    style={{ color: "purple" }}
                  ></i>{" "}
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
                <span>{item.langue}</span>
                <span>{item.niveau}</span>
              </AccordionDetails>
            ))}
          </Accordion>
        </h6>
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
      </DialogContent>
      <DialogActions className={classes.modalFooter}>
        <Button
          onClick={() => setClassicModal(false)}
          color="default"
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>

  ); 
}