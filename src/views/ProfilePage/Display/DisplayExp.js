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
import authAxios from "authAxios";
import Experience from "../Experience";
import { isTemplateExpression } from "typescript";
const useStyles = makeStyles(styles);

export default function DisplayExp(props) {

  const classes = useStyles();
  const {ProfilePage,cle,className,...rest} = props;
  if(props.displayexp.length>0){
    return (
        props.displayexp.map((item,index) =>{
           function deleteExp(e){
             e.preventDefault();
            console.log("cle"+cle);
            var div= document.getElementById("dispexp"+item.id_ex);
            console.log(div);
            var id = localStorage.getItem("iduser");
            authAxios.delete("/Candidats/DeleteExperience/"+item.id_ex,
            ).then((response) => {
            console.log(response);
            props.displayexp.splice(index,1)
            props.setDisplayExp([]);
            props.setDisplayExp(props.displayexp)
            div.style.display="none";
          }, (error) => {
            console.log(error);
          })
          }
          function editExp(){        
            var div = document.getElementById("editdivexp"+item.id_ex)
            console.log(div)
            div.style.display ="block";
            document.getElementById("dispexp"+item.id_ex).style.display="none";
          }
            return(
              <div>
                 <div style= {{display:"none"}} id={"editdivexp"+item.id_ex}>
                <Experience titre={item.poste_occupe} employeur ={item.employeur} 
                   lieu={item.lieu_Exp} type={item.typeEmploi} dateDeb={item.date_debut}
                   dateFin ={item.date_fin} description={item.description}
                   cle={item.id_ex} btn={false} displayexp={props.displayexp} 
                   setDisplayExp={props.setDisplayExp} id={index}
                />
              </div>
                <div
                  //style={{marginLeft:"100px"}}
                   id={"dispexp"+item.id_ex} >
                  <Card style={{display:"flex",alignItems:"left",flexDirection:"column",justifyContent:"space-between",width:"auto",flexWrap:"wrap",hyphens: "auto",whiteSpace: "pre-line"}}>
                  <CardBody>                  
                      <h5><strong>{item.poste_occupe}</strong>
                        <br/> {item.employeur} - {item.typeEmploi}
                        <br/> Période : {new Date(item.date_debut).toLocaleString('fr-FR').slice(0,10)} -  {new Date(item.date_fin).toLocaleString('fr-FR').slice(0,10)} 
                        {/*&nbsp; {new Date(item.date_fin) - new Date(item.date_debut)} mois*/}
                      </h5> 
                      <h6 style={{color:"lightslategray"}}>{item.description}</h6>
                    <div style={{float:"right"}}>
                      <Link>&nbsp;<button style={{padding:"8px"}} class="primary" onClick={deleteExp}>&nbsp;<i class="far fa-trash-alt" title="Supprimer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
                      <Link><button style={{padding:"8px"}} class="primary" onClick={editExp}>&nbsp;<i class="fas fa-pencil-alt" title="Editer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
                    </div>
                  </CardBody>
                  </Card>                                                                                                                                                 
              </div>
              </div>
            )
        })
  ); 
} else{
    return(
       null
    );
}
}
