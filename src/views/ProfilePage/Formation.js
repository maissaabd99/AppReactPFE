import React, { useContext, useState } from "react";
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
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Link } from "react-router-dom";
import AllYears from "./OtherComponents/AllYears";
import authAxios from "authAxios";

const useStyles = makeStyles(styles);

export default function Formation(props) {
 
  const classes = useStyles();
  const {cle,setDisplayEtude,displayetude,...rest } = props;
  const[titredip,setTitreDip] = useState(props.titredip);
  const[fac,setFac] = useState(props.fac);
  const[anneedeb,setAnneedeb] = useState(props.anneeDeb);
  const[anneefin,setAnneefin] = useState(props.anneeFin);
  const[description,setDescription] = useState(props.description);

    function deleteFormation(e){
      console.log("cle"+cle);
      var div= document.getElementById("formation"+cle);
      console.log(div)
      div.style.display="none"  
    }

    function AddFormation(e){
      e.preventDefault();
      var id = localStorage.getItem("iduser");
      var diplome =document.getElementById("diplome"+cle).value;
      var universite =document.getElementById("universite"+cle).value
      var anneedebut = document.getElementById("anneedebut"+cle).value;
      var anneefin = document.getElementById("anneefin"+cle).value;
      var description=document.getElementById("descetude"+cle).value;
      if (anneedebut < anneefin) {
        if (props.btn == null) {
          authAxios.post("/Formations/AddFormation/" + id, {
            "universite": universite,
            "diplome": diplome,
            "annee_debut": anneedebut,
            "annee_fin": anneefin,
            "description": description
          }).then((response) => {
            console.log(response);
            var div = document.getElementById("formation" + cle);
            console.log(div)
            div.style.display = "none";
            setDisplayEtude(displayetude.concat(response.data.formation));
          }, (error) => {
            console.log(error);
          })
        } else {
          authAxios.put("/Formations/UpdateFormation/" + cle, {
            "universite": universite,
            "diplome": diplome,
            "annee_debut": anneedebut,
            "annee_fin": anneefin,
            "description": description
          }).then((response) => {
            console.log(response);
            var div = document.getElementById("formation" + cle);
            console.log(div)
            div.style.display = "none";
           console.log(props.div2)
          // props.div1.style.display="none";
            //delete displayetude[props.id];
            displayetude.splice(props.id,1)
            console.log(displayetude)
            setDisplayEtude([])
            setDisplayEtude(displayetude.concat(response.data.updatedformation));
            //props.div2.style.display="none"

          }, (error) => {
            console.log(error);
          })
        }
      }else {
        document.getElementById("year").innerHTML = "Année début doit être inférieur à année de fin"
      } 
    }
  
  return (
    <div 
    //style={{marginLeft:"100px"}} 
    id={"formation"+cle}>
              <Card style={{width:"auto"}}>
              <CardBody>        
                <form onSubmit={AddFormation}>      
                   <GridContainer>
                   <GridItem xs={12} sm={12} md={6}>
                    <CustomInput  onChange={e=>setTitreDip(e.target.value)} value={titredip}
                      labelText="Titre du diplôme ..."
                      id={"diplome"+cle}
                      formControlProps={{
                         fullWidth: true           
                      }} 
                      inputProps={{
                        endAdornment: (
                            <InputAdornment>
                             <i class="fas fa-book"></i>
                           </InputAdornment>
                        )
                      }}          
                    />
                 </GridItem>    
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput onChange={e=>setFac(e.target.value)} value={fac}
                      labelText="Université ..."
                      id={"universite"+cle} 
                      formControlProps={{
                         fullWidth: true
                      }}   
                      inputProps={{
                        endAdornment: (
                            <InputAdornment>
                              <i class="fas fa-university"></i>
                           </InputAdornment>
                        )
                      }}        
                    />
                    </GridItem>     
                    </GridContainer>             
                    <br></br>
                    <div style={{display:"flex",flexDirection:"row",width:"auto",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap"}}>
                        <strong>A fréquenté de : <i class="far fa-calendar-alt"></i> </strong>
                        <AllYears id={"anneedebut"+cle} onChange={(e)=>{setAnneedeb(e.target.value);console.log(e.target.value)}} value={anneedeb}/> 
                        <strong> au </strong>
                        <AllYears id={"anneefin"+cle} onChange={(e)=>(setAnneefin(e.target.value),console.log(e.target.value))} value={anneefin}/>
                    </div>
                    <br></br>
                    <p id="year" style={{color:"red"}}></p>
                     <CustomInput onChange={e=>setDescription(e.target.value)} value={description}
                      labelText="Description ..." 
                      id={"descetude"+cle}
                      inputProps={{
                          multiline: true,
                          rows: 5
                      }}   
                      formControlProps={{
                         fullWidth: true
                      }}                          
                    />
                <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",alignItems:"center",flexWrap:"wrap"}}>
                  <Button color="primary"  style={{marginTop:"0.7%",padding:"9.5px"}} type="submit">Enregistrer</Button>
                  {/*<Link cle={cle} onClick={deleteFormation}>&nbsp;<button style={{padding:"8px"}} class="primary">&nbsp;<i  class="far fa-trash-alt" title="Supprimer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>*/}&nbsp;
                  {props.btn==null ? (<Link ><button style={{padding:"8px"}} onClick={deleteFormation} class="primary">&nbsp;<i class="fas fa-times" title="Fermer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>):null}&nbsp;
                </div>     
              </form>                      
              </CardBody>
            </Card>                                                                                                                                                 
      </div>
  );
}
