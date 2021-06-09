import React,{ useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Link } from "react-router-dom";
import authAxios from "authAxios";
import Compétence from "../Compétence";
const useStyles = makeStyles(styles);

export default function DisplayCompetence(props) {

  const classes = useStyles();
  const {ProfilePage,cle,className,...rest} = props;
  if(props.displaycomp.length>0){
    return (
        props.displaycomp.map((item,index) =>{
           function deleteCompt(e){
            console.log("cle"+cle);
            var div= document.getElementById("dispcomp"+item.id);
            console.log(div);
            authAxios.delete("/Competence/DeleteCompetence/"+item.id
                 ).then((response) => {
                    console.log(response);
                    props.displaycomp.splice(index,1)
                    console.log(props.displaycomp)
                    props.setDisplayComp([]);
                    props.setDisplayComp(props.displaycomp)
                    div.style.display="none";
                  }, (error) => {
                      console.log(error);
            })
          }
          function editCompetence(){        
            var div = document.getElementById("editdivcompt"+item.id)
            console.log(div)
            div.style.display ="block";
            document.getElementById("dispcomp"+item.id).style.display="none";
          }
            return(
              <div>
              <div style= {{display:"none"}} id={"editdivcompt"+item.id}>
              <Compétence compt={item.titre}  niveau={item.niveau}
                 cle={item.id} btn={false} displaycomp={props.displaycomp} 
                 setDisplayComp={props.setDisplayComp} id={index}
              />
            </div>
                <div 
                //style={{marginLeft:"100px"}} 
                id={"dispcomp"+item.id} >
                  <Card>
                  <CardBody style={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"space-between",width:"auto",flexWrap:"wrap",hyphens: "auto",whiteSpace: "pre-line"}}>                  
                      <h5><strong>{item.titre}</strong>
                      </h5> 
                      <h6 style={{color:"lightslategray"}}><i class="fas fa-star" style={{color:"purple"}}></i> {item.niveau}</h6>
                    <div style={{float:"right"}}>
                      <Link>&nbsp;<button style={{padding:"8px"}} class="primary" onClick={deleteCompt}>&nbsp;<i class="far fa-trash-alt" title="Supprimer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
                      <Link><button style={{padding:"8px"}} class="primary" onClick={editCompetence}>&nbsp;<i class="fas fa-pencil-alt" title="Editer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
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
