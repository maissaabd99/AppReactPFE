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
import AllMonths from "./OtherComponents/AllMonths";
import authAxios from "authAxios";
import styless from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import { TextField } from "@material-ui/core";
import { now } from "moment";

const useStyles = makeStyles(styles);

export default function Experience(props) {
 
  const classes = useStyles();
  const {cle,setDisplayExp,displayexp,...rest } = props;
  const[employeur,setEmployeur] = useState(props.employeur);
  const[titre,setTitre] = useState(props.titre);
  const[lieu,setLieu] = useState(props.lieu);
  const[type,setType] = useState(props.type);
  //console.log("type de l'emploiiii",type)
  const[datedeb,setDatedeb] = useState(props.dateDeb);
  const[datefin,setDatefin] = useState(props.dateFin);
  const[description,setDescription] = useState(props.description);

    function deleteExp(e){
      console.log("cle"+cle);
      var div= document.getElementById("exp"+cle);
      console.log(div)
      div.style.display="none"  
    }

    function AddExp(e){
      e.preventDefault();
      var id = localStorage.getItem("iduser");
      var employeur =document.getElementById("employeur"+cle).value;
      var titre =document.getElementById("titreposte"+cle).value
      var lieu =document.getElementById("lieutravail"+cle).value;
      var typeemploi=document.getElementById("typemp"+cle).options[document.getElementById("typemp"+cle).selectedIndex].textContent;
      var datedebut = document.getElementById("datedeb"+cle).value;
      var datefin = document.getElementById("datefin"+cle).value;
      var description=document.getElementById("description"+cle).value;
      console.log(description)
      console.log(lieu)
      console.log( new Date().toLocaleDateString())
      console.log(displayexp);
      if (datedebut < datefin) {
        if (props.btn == null) {
          authAxios.post("Candidats/AddExperience/" + id, {
            "poste_occupe": titre,
            "employeur": employeur,
            "lieu_Exp": lieu,
            "date_debut": datedebut,
            "date_fin": datefin,
            "typeEmploi": typeemploi,
            "description": description,
          }).then((response) => {
            console.log(response);
            var div = document.getElementById("exp" + cle);
            console.log(div)
            div.style.display = "none";
            props.displayexp.unshift(response.data.exp)
            props.setDisplayExp([...props.displayexp]);
          }, (error) => {
            console.log(error);
          })
        } else {
          authAxios.put("Candidats/UpdateExperience/" + cle, {
            "poste_occupe": titre,
            "employeur": employeur,
            "lieu_Exp": lieu,
            "date_debut": datedebut,
            "date_fin": datefin,
            "typeEmploi": typeemploi,
            "description": description,
          }).then((response) => {
            console.log(response);
            var div = document.getElementById("exp"+cle);
            console.log(div);
            div.style.display = "none";
            //delete displayexp[props.id];
            displayexp.splice(props.id,1)
            setDisplayExp([]);
            displayexp.splice(props.id,0,response.data.updatedexp)
            setDisplayExp([...displayexp]);

          }, (error) => {
            console.log(error);
          })
        }
      }
      else {
        document.getElementById("erreurDate").innerHTML = "Date début doit être inférieur à date de fin"
      }
    }
  
  return (
    <div 
   // style={{marginLeft:"100px"}}
     id={"exp"+cle}>
              <Card style={{width:"auto"}}>
              <CardBody>        
                <form onSubmit={AddExp}>      
                   <GridContainer>
                   <GridItem xs={12} sm={12} md={6}>
                    <CustomInput onChange={e=>setEmployeur(e.currentTarget.value)} value={employeur}
                      labelText="Employeur ..."
                      id={"employeur"+cle}
                      formControlProps={{
                         fullWidth: true           
                      }} 
                      inputProps={{
                        endAdornment: (
                            <InputAdornment>
                             <i class="far fa-building"></i>
                           </InputAdornment>
                        )
                      }}          
                    />
                 </GridItem>    
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput onChange={(e)=>setTitre(e.currentTarget.value)} value={titre}
                      labelText="Titre du poste ..."
                      id={"titreposte"+cle} 
                      formControlProps={{
                         fullWidth: true
                      }}   
                      inputProps={{
                        endAdornment: (
                            <InputAdornment>
                          <i class="far fa-id-badge"></i>
                           </InputAdornment>
                        )
                      }}        
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                    <CustomInput onChange={(e)=>setLieu(e.currentTarget.value)} value={lieu}
                      labelText="Lieu de travail ..."
                      id={"lieutravail"+cle}
                      formControlProps={{
                         fullWidth: true
                      }}  
                      inputProps={{
                        endAdornment: (
                            <InputAdornment>
                          <i class="fas fa-map-marker-alt"></i>
                           </InputAdornment>
                        )
                      }}               
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                    <br></br>
                      <select required id={"typemp"+cle} style={{padding:"10px",width:"100%"}}
                        onChange={(e)=>setType(e.target.value)} value={type}
                      >
                      <option value="" data-default selected disabled>Choisir un type de contrat</option>
                        <option>Stage</option>
                        <option>CDD</option>
                        <option>CDI</option>
                    </select>
                    </GridItem>
                    </GridContainer>             
                    <br></br>
                    <div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap"}}>
                        <strong>A travaillé de : </strong>
                        <TextField type= "date" id={"datedeb"+cle}
                           onKeyDown={(e)=>e.preventDefault()}
                                    type="date"
                                    InputProps={{
                                      inputProps: {
                                        min: "1980-12-31",
                                        max: "2030-12-31"}
                                    }}
                          value={datedeb !=null ? datedeb.slice(0,10) : null} onChange={e=>setDatedeb(e.target.value)} 
                        />
                        <strong> au </strong>
                        <TextField type= "date" id={"datefin"+cle}
                         onKeyDown={(e)=>e.preventDefault()}
                                    type="date"
                                    InputProps={{
                                      inputProps: {
                                        min: "1980-12-31",
                                        max: "2030-12-31"}
                                    }}
                          value={datefin!= null ? datefin.slice(0,10) : null} onChange={e=>setDatefin(e.target.value)} 
                        />   
                    </div>
                    <br></br>
                    <p id="erreurDate" style={{color:"red"}}></p>
                     <CustomInput
                      labelText="Description ..."
                      value={description} onChange={e=>setDescription(e.target.value)}
                      id={"description"+cle}
                      inputProps={{
                          multiline: true,
                          rows: 5
                      }}   
                      formControlProps={{
                         fullWidth: true
                      }}                          
                    />
                <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",alignItems:"center",flexWrap:"wrap"}}>
                  <Button color="primary"  style={{marginTop:"0.7%",padding:"9.5px"}} type="submit">Enregistrer</Button>&nbsp;
                  {/*<Link cle={cle} onClick={deleteExp}>&nbsp;<button style={{padding:"8px"}} class="primary">&nbsp;<i  class="far fa-trash-alt" title="Supprimer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;*/}
                  {props.btn==null ? (<Link ><button style={{padding:"8px"}} onClick={deleteExp} class="primary">&nbsp;<i class="fas fa-times" title="Fermer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>):null}&nbsp;
                </div>     
              </form>                      
              </CardBody>
            </Card>                                                                                                                                                 
      </div>
  );
}
