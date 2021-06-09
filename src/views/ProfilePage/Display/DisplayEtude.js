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
import Formation from "../Formation";
const useStyles = makeStyles(styles);

export default function DisplayEtude(props) {

  const classes = useStyles();
  const {ProfilePage,cle,className,displayetude,...rest} = props;
  if(displayetude.length>0){
    return (
        displayetude.map((item,index) =>{
           function deleteEtude(e){
             e.preventDefault();
            console.log("cle"+cle);
            var div= document.getElementById("dispetude"+item.id);
            console.log(div);
            authAxios.delete("/Formations/DeleteFormation/"+item.id,
            ).then((response) => {
            console.log(response.data);
            displayetude.splice(index,1)
            console.log(displayetude)
            props.setDisplayEtude([]);
            props.setDisplayEtude(displayetude)
            div.style.display="none";
          }, (error) => {
            console.log(error);
          })
          }
          function editFormation(){        
            var div = document.getElementById("editdivforma"+item.id)
            console.log(div)
            div.style.display ="block";
            document.getElementById("dispetude"+item.id).style.display="none";
          }
            return(
              <div>
              <div style= {{display:"none"}} id={"editdivforma"+item.id}>
              <Formation titredip={item.diplome} fac ={item.universite} 
                 anneeDeb={item.annee_debut}
                 anneeFin ={item.annee_fin} description={item.description}
                 cle={item.id} btn={false} displayetude={props.displayetude} 
                 setDisplayEtude={props.setDisplayEtude} id={index} 
                 div1={document.getElementById("dispetude"+item.id)}
                 div2={document.getElementById("editdivforma"+item.id)}
              />
               </div>
                <div 
                //style={{marginLeft:"100px"}}
                 id={"dispetude"+item.id} >
                  <Card style={{display:"flex",alignItems:"left",flexDirection:"column",justifyContent:"space-between",width:"auto",flexWrap:"wrap"}}>
                  <CardBody>                  
                      <h5 style={{hyphens: "auto",whiteSpace: "pre-line"}}><strong>{item.diplome}</strong>
                        <br/> {item.universite} {item.annee_debut} /  {item.annee_fin}
                        {/*&nbsp; {new Date(item.date_fin) - new Date(item.date_debut)} mois*/}
                      </h5> 
                      <h6 style={{color:"lightslategray"}}>{item.description}</h6>
                    <div style={{float:"right"}}>
                      <Link>&nbsp;<button style={{padding:"8px"}} class="primary" onClick={deleteEtude}>&nbsp;<i class="far fa-trash-alt" title="Supprimer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
                      <Link><button style={{padding:"8px"}} class="primary" onClick={editFormation}>&nbsp;<i class="fas fa-pencil-alt" title="Editer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
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
