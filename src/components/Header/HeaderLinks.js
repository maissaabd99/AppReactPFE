/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import Offres from "views/offres/Offres";
import ProfilePage from "views/ProfilePage/ProfilePage";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  var buttonvalue ="Se connecter";
 // console.log("props from headerLinks ",props)  
  if(props.isAuth ===false){
  return ( 
    <List className={classes.list}>
        <ListItem className={classes.listItem}>
        <Link to ="/" >
        <Button
          Link="/"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          Accueil
        </Button>
        </Link>
      </ListItem>  
      <ListItem className={classes.listItem}>
           <Link to ="/toutes-les-offres"  style={{color: "white"}}>
           <Button
             Link ="/toutes-les-offres"
             color="transparent"
             target="_blank"
             className={classes.navLink}
           >
             Offres d'emploi
           </Button>
           </Link>     
      </ListItem>  
            
          <ListItem className={classes.listItem}>
             <Link to ="/login" style={{color: "white"}}>
             <Button
               color="transparent"
               target="_blank"
               className={classes.navLink}
             >             
             Se connecter
             </Button>
           </Link>
          </ListItem>
    </List>
  );}else{
    return (
      <List className={classes.list}>
          <ListItem className={classes.listItem}>
          <Link to ="/"  style={{color: "white"}}>
          <Button
            Link="/"
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            Accueil
          </Button>
          </Link>
        </ListItem>    
        <ListItem className={classes.listItem}>
          <Link to ="/candidat/mes-candidatures"  style={{color: "white"}}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          > Mes candidatures   
          </Button>
          </Link>
        </ListItem> 
        <ListItem className={classes.listItem}>
             <Link to ="/toutes-les-offres"  style={{color: "white"}}>
             <Button  
               color="transparent"
               target="_blank"
               className={classes.navLink}
             >
               Offres d'emploi
             </Button>
             </Link>     
        </ListItem>     
        <ListItem className={classes.listItem}>
               <Link to ="/candidat/moncompte" style={{color: "white"}}>
               <Button
                 link="/candidat/moncompte"
                 color="transparent"
                 target="_blank"
                 className={classes.navLink}>
                 Mon compte
               </Button>
             </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
               <Link to ="/logout" style={{color: "white"}}>
               <Button
                 color="transparent"
                 target="_blank"
                 className={classes.navLink}
               >             
                Déconnexion
               </Button>
             </Link>
            </ListItem>
         
     
      </List>
    );

  }
}
