import React,{ useEffect, useState,useContext} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Link } from "react-router-dom";
import AllLanguages from "./OtherComponents/AllLanguages";
import authAxios from "authAxios";
import { Grid, Snackbar } from "@material-ui/core";
import BarContext from "views/ProfilePage/ProfilePage";

const useStyles = makeStyles(styles);

export default function Langue(props) {
 
  const {ProfilePage,cle,className,onClick,update,setDisplay,...rest } = props;

  const[n,setNiveau] = useState(props.niveau)
  const[l,setLangue] = useState(props.contenu)
  const classes = useStyles();

  function deleteLang(e){
    console.log("cle"+cle);
    var div= document.getElementById("lang"+cle);
    console.log(div);
    div.style.display="none";
  }
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });

  function AddLang(e){
    var id = localStorage.getItem("iduser");
   // console.log(document.getElementById("selectlang"+cle).options[document.getElementById("selectlang"+cle).selectedIndex].textContent)
    console.log(document.getElementById("selectniveau"+cle).options[document.getElementById("selectniveau"+cle).selectedIndex].textContent)
    console.log(document.getElementById("selectniveau"+cle).selectedIndex);

    var valurNiveau  = document.getElementById("selectniveau"+cle).selectedIndex;
    var lang =document.getElementById("selectlang"+cle).options[document.getElementById("selectlang"+cle).selectedIndex].textContent;
    var niveau =document.getElementById("selectniveau"+cle).options[document.getElementById("selectniveau"+cle).selectedIndex].textContent;
    console.log(update);
    if(props.btn==null){
      authAxios.post("/Candidats/AddLanguage/"+id,{
        "langue":lang,
        "niveau" : niveau,
        "value": valurNiveau,
      }).then((response) => {
        console.log(response);
        var div= document.getElementById("lang"+cle);
        console.log(div);
        div.style.display="none";   
        setDisplay(update.concat(response.data.langue)); 
      }, (error) => {
      console.log(error);
      })
      setState({ ...state, open: true });

    }  
    else{
      console.log(cle)
      authAxios.put("/Candidats/UpdateLanguage/"+cle,{
        "langue":lang,
        "niveau" : niveau,
        "value": valurNiveau,
      }).then((response) => {
        console.log(update.filter(e=>e[props.id]));
        console.log(Array.isArray(update));
        var div= document.getElementById("lang"+cle);
        console.log(div);
        div.style.display="none";     
        //setDisplay(delete update[props.id]);  
        update.splice(props.id,1)
        setDisplay([])   
        setDisplay(update.concat(response.data.languemodifier));   
    }, (error) => {
      console.log(error);
    })
    }
  }

  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  //const bar = useContext(BarContext)
 // console.log(bar)
    return (
      <div
     //  style={{...rest ,marginLeft:"80px"}}
        id={"lang"+cle}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="Langue ajouté avec succès!"
            key={vertical + horizontal}
          /> 
        <Card >
        <CardBody style={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"space-between",flexWrap: "wrap"}}>
          <AllLanguages value={l} id={"selectlang"+cle}  onChange={e=>{setLangue(e.currentTarget.value);console.log(e.currentTarget.value)}} contenu = {l}></AllLanguages>&nbsp;
          <select style={{padding:"9px",width:"30%"}} id={"selectniveau"+cle} value={n} onChange={(e)=>{setNiveau(e.target.value);console.log(e.target.selectedIndex)}} >
                <option>Connaissance passive</option>
                <option>Connaissance orale de base</option>
                <option>Capacité conversationnelle</option>
                <option>S'exprime couramment</option>
                <option>Langue maternelle</option>
          </select>
          <div style={{float:"right"}}>
          <Button color="primary" style={{padding:"10px",marginTop:"2px"}} onClick={AddLang}>Enregistrer</Button>&nbsp;
         { /*<Link  cle={cle} key={props.cle}>&nbsp;<button style={{padding:"8px"}}  class="primary"  >&nbsp;<i  class="far fa-trash-alt" title="Supprimer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>*/}
          {props.btn==null ? (<Link><button style={{padding:"8.2px"}} onClick= {deleteLang} class="primary">&nbsp;<i class="fas fa-times" title="Fermer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>):null}&nbsp;
          </div>
          </CardBody>
        </Card>  
        </div>                                                                                                                                              
  ); 
}