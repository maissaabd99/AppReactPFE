import React,{ useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components

import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Link } from "react-router-dom";
import CustomInput from "components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
const useStyles = makeStyles(styles);

export default function Langue(props) {
  const [langs,setLangs]=useState([])
  function deleteLang(e){
    console.log("cle"+cle);
    console.log(className);
    console.log(Object.entries(tab))
    var div= document.getElementById(cle);
    console.log(div)
    div.style.display="none"
  }

  const classes = useStyles();
  const {ProfilePage,cle,tab,className,...rest } = props;
    return (
      <div style={{marginLeft:"100px"}} id={cle} >
      <GridItem xs={8} sm={8} md={8}>
        <Card>
        <CardBody>
       
          <div style={{width:"400px",marginTop:"-2%",}}>
          <CustomInput  labelText="Coller le lien de votre profil linkedin"
           formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            type: "text",
            endAdornment: (
              <InputAdornment position="end" style={{marginTop: '-4px'}}>
               <Icon >
               <i class="fab fa-linkedin" style={{fontSize:"17px",color:"purple"}}></i>
                </Icon>
              </InputAdornment>
            )
          }}>
          </CustomInput>
          </div>
          <div style={{float:"right",marginTop:"-6%"}}>
          &nbsp;<Link style={{float:"right"}}><button style={{padding:"8px"}} class="primary">&nbsp;<i class="fas fa-times" title="Fermer" style={{fontSize:"15px"}}></i></button></Link>&nbsp;
          &nbsp;&nbsp;<Button color="primary" style={{marginTop:"-0%",float:"right",padding:"10px"}}> Enregistrer</Button> &nbsp;
          </div>
          </CardBody>
        </Card>                                                                                                                                                 
    </GridItem>
</div>

  );
   
}
