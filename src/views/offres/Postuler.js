import React, { useEffect } from "react";
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

import {
  Collapse,
  CssBaseline,
  Divider,
  IconButton,
} from "@material-ui/core";
import "./offre.css";
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
import { Link, Redirect } from "react-router-dom";
//const useStyles = makeStyles(styles);

const useStyles = makeStyles((getMuiTheme) => ({
    root: {
      backgroundColor: "purple",
      //width: '100%',
      /*'& > * + *': {
        marginTop: theme.spacing(2),
      },*/
    },
  }));

export default function Postuler(props){
    const classes = useStyles();
     const {location,...rest}=props
    // console.log(props.lien)
    const [classicModalLogin, setClassicModalLogin] = useState(props.state);

    return(
        <Dialog 
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={props.classicModalLogin}
        keepMounted
        onClose={() => props.setClassicModalLogin(false)} >
        <DialogTitle>
        <IconButton
          className={classes.modalCloseButton}
          key="close"
          style={{ fontSize: "10px", float: "right" }}
          aria-label="Close"
          color="inherit"
          onClick={() => props.setClassicModalLogin(false)}
        >
        <Close className={classes.modalClose} />
       </IconButton>
       <br></br>
        <h4 style={{textAlign:"center"}}>
        <strong>
          {props.message}
        </strong>
        </h4>
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <Divider/>
        <DialogActions>
        {props.lien != "" ? 
        <Link to ={{ pathname : props.lien , state : {from : window.location.href }}}>
            <Button color="primary" > {props.textebutton} </Button> 
        </Link> :
         <Button color="primary" onClick={() => props.setClassicModalLogin(false)}> {props.textebutton} </Button>
        }
        
        </DialogActions>
      </Dialog>
    )
   
}