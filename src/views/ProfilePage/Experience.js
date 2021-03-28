import React, { useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Link } from "react-router-dom";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
import CustomTabs from "components/CustomTabs/CustomTabs";
const useStyles = makeStyles(styles);

export default function Experience(props) {
 

    function deleteExp(e){
      console.log("cle"+cle);
      var div= document.getElementById("exp"+cle);
      console.log(div)
      div.style.display="none"  
    }
  const classes = useStyles();
  const {cle,...rest } = props;
  
  return (
    <div style={{marginLeft:"100px"}} id={"exp"+cle}>
            <GridItem xs={6} sm={6} md={8}>
              <Card>
              <CardBody>
                <div style={{width:"723px",border:"1px solid #F0F0F0",marginTop:"5px",borderRadius:"8px",backgroundColor:"#F0F0F0",marginLeft:"-10px"}}>
                <form>
                  <CardBody>
                    <div>
                    <CustomInput
                      labelText="Employeur ..."
                      id="Employeur"
                      className="Employeur"  
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    <select style={{padding:"10px",width:"230px"}}>
                      <option disabled selected>Type d'emploi</option>
                      <option>Stage</option>
                      <option>Contrat</option>
                      <option>CDI</option>
                    </select>
                    <CustomInput
                      labelText="Titre du poste ..."
                      id="Titre du poste"
                      formControlProps={{
                        fullWidth: true
                      }}  
                    />
                    </div>
                    <div>
                     <CustomInput
                      labelText="Username ..."
                      id="ghgh"  
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="ckjgkf"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                  </CardFooter>
                </form>
                <div style={{float:"right"}}>
                <Link style={{marginTop:"-8%",float:"right"}}><button style={{padding:"8px"}} class="primary">&nbsp;<i   class="fas fa-times" title="Fermer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
                <Link style={{marginTop:"-8%",float:"right"}} cle={cle} onClick={deleteExp}>&nbsp;<button style={{padding:"8px"}} class="primary">&nbsp;<i  class="far fa-trash-alt" title="Supprimer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
                &nbsp;<Button color="primary" style={{marginTop:"-8%",float:"right",padding:"10px"}}>Enregistrer</Button>
                </div>
                </div>               
                </CardBody>
              </Card>                                                                                                                                                 
          </GridItem>
      </div>
  );
}
