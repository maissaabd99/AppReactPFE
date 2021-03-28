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
const useStyles = makeStyles(styles);

export default function Compétence(props) {
  const [langs,setLangs]=useState([])
  function deleteCompt(e){
    console.log("cle"+cle);
    
    var div= document.getElementById("compt"+cle);
    console.log(div)
    div.style.display="none";
  }

  const classes = useStyles();
  const {ProfilePage,cle,tab,className,...rest } = props;
    return (
      <div style={{marginLeft:"100px"}} id={"compt"+cle} >
      <GridItem xs={8} sm={8} md={8}>
        <Card>
        <CardBody>
          <div style={{width:"250px",marginTop:"-2%",}}>
          <CustomInput  labelText="Saisir une compétence"
           formControlProps={{
            fullWidth: true
          }}>
          </CustomInput>
          </div>
          <div style={{float:"right",marginTop:"-6%"}}>
          <select style={{padding:"9px"}} >
                 <option disabled selected>Niveau</option>
                 <option class="dropdown" style={{hover:"primary"}}> pas developpée</option>
                 <option>Connaissance de base</option>
                 <option>Compétent</option>
                 <option>Fort</option>
                 <option>Expert</option>
          </select>
          <Link style={{float:"right"}}><button style={{padding:"8px"}} class="primary">&nbsp;<i   class="fas fa-times" title="Fermer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
          <Link style={{float:"right"}} cle={cle} onClick= {deleteCompt}>&nbsp;<button style={{padding:"8px"}}  class="primary"  >&nbsp;<i  class="far fa-trash-alt" title="Supprimer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
          &nbsp;<Button color="primary" style={{marginTop:"-0%",float:"right",padding:"10px"}}>Enregistrer</Button>
          </div>
          </CardBody>
        </Card>                                                                                                                                                 
    </GridItem>
</div>

  );
   
}
