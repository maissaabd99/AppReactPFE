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

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  var buttonvalue ="Se connecter";
  if(localStorage.getItem('UserEmail')!= ""){
       buttonvalue = "Déconnexion";
  }
 
  console.log(buttonvalue);
  function logout(){
      if (buttonvalue=="Déconnexion"){
        localStorage.setItem('UserEmail',"");
        localStorage.setItem('Usernom',"");
        localStorage.setItem('Userprenom',"");
        localStorage.setItem('access_token',"");
        
      }else{
        window.location.href="/login";
      }
  }
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
           <Link to ="/"  style={{color: "white"}}>
           <Button
             Link="/"
             color="transparent"
             target="_blank"
             className={classes.navLink}
           >
             Nos offres d'emploi
           </Button>
           </Link>     
      </ListItem>  
      {localStorage.getItem('UserEmail')!= "" ? (
      <ListItem className={classes.listItem}>
             <Link to ="/moncompte" style={{color: "white"}}>
             <Button
               color="transparent"
               target="_blank"
               className={classes.navLink}>
               Mon compte
             </Button>
           </Link>
          </ListItem>)  : (
             <ListItem className={classes.listItem}>
           
          </ListItem>
          )}
          <ListItem className={classes.listItem}>
             <Link to ="/login" style={{color: "white"}}>
             <Button
               onClick= {logout}
               color="transparent"
               target="_blank"
               className={classes.navLink}
             >             
              {buttonvalue}
             </Button>
           </Link>
          </ListItem>
       
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/novencia?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/NOVENCIAGroup/"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on LinkedIn"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.linkedin.com/company/novencia?originalSubdomain=fr"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-linkedin"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
