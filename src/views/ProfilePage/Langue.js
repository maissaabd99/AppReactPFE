import React,{ useState} from "react";
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
import AllLanguages from "./AllLanguages";
const useStyles = makeStyles(styles);

export default function Langue(props) {
  const [langs,setLangs]=useState([])
  function deleteLang(e){
    console.log("cle"+cle);
    console.log(className);
    console.log(Object.entries(tab))
    var div= document.getElementById("lang"+cle);
    console.log(div)
    div.style.display="none"

   // console.log(props.vartochange)
 //   console.log(Object.entries(tab)[1][1].props)
   //  console.log(e.target.parentElement)
 /*  var x = parseInt(props.cle); 
    console.log(props.tab[x]); 
   console.log(props.tab[props.cle])
   var index = props.tab.indexOf(e.target)
   console.log(index)*/
    //setLangs(props.data)
   // props.changetab(Object.entries(tab));
    //props.changetab(props.tab.splice(props.data[props.cle], 1))
  }

  const classes = useStyles();
  const {ProfilePage,cle,tab,className,...rest } = props;
    return (
      <div style={{marginLeft:"100px"}} id={"lang"+cle} >
      <GridItem xs={8} sm={8} md={8}>
        <Card>
        <CardBody>
          <div style={{width:"230px"}}>
          <AllLanguages ></AllLanguages>
          </div>
          <div style={{float:"right",marginTop:"-5%"}}>
          <select style={{padding:"9px"}} >
                 <option disabled selected>Niveau</option>
                <option class="dropdown" style={{hover:"primary"}}> Connaissance passive</option>
                <option>Connaissance orale de base</option>
                <option>Capacité conversationnelle</option>
                <option>S'exprime couramment</option>
                <option>Langue maternelle</option>
          </select>
        <Link style={{float:"right"}}><button style={{padding:"8px"}} class="primary">&nbsp;<i   class="fas fa-times" title="Fermer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
          <Link style={{float:"right"}} cle={cle} onClick= {deleteLang} key={props.cle}>&nbsp;<button style={{padding:"8px"}}  class="primary"  >&nbsp;<i  class="far fa-trash-alt" title="Supprimer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
          &nbsp;<Button color="primary" style={{marginTop:"0%",float:"right",padding:"10px"}}>Enregistrer</Button>
          </div>
          </CardBody>
        </Card>                                                                                                                                                 
    </GridItem>
</div>

  );
   
}
//