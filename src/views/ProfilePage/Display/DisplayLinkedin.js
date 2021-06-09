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
import Linkedin from "../Linkedin.js"
//const useStyles = makeStyles(styles);

export default function DisplayLinkedin(props) {
var itemlinkedin = null;
//const classes = useStyles();
  const {cle,className,...rest} = props;
 // console.log("linkedin from displaylinkedin :",props.displaylinkedin);
  if(props.displaylinkedin.length >0){
    props.displaylinkedin.map((item,index)=>{
      itemlinkedin=item;
     // console.log(item)
    })
   // console.log(itemlinkedin)
    function deleteLinkedin(e){
            var div= document.getElementById("displink"+itemlinkedin.id);
            console.log(div);
            authAxios.delete("Linkedin/DeleteLinkenin/"+itemlinkedin.id
                 ).then((response) => {
                    console.log(response.data);
                    div.style.display="none";
                    props.setLinkeds([]);
                    props.setDisplaylinkedin([]);
                    console.log(props.linkeds);
                  /*  props.setLinkeds(props.linkeds.concat(<Linkedin 
                    cle={itemlinkedin.id} displaylinkedin ={props.displaylinkedin} 
                    setDisplaylinkedin = {props.setDisplaylinkedin}  linkeds={props.linkeds}
                    setLinkeds={props.setLinkeds} 
                    />
                    ))*/
                  }, (error) => {
                      console.log(error);
            })
          }
          function editLinkedin(){        
            var div = document.getElementById("editdivlink"+itemlinkedin.id)
            console.log(div)
            div.style.display ="block";
            document.getElementById("displink"+itemlinkedin.id).style.display="none";
          }
            return(
              <div>
              <div 
                style= {{display:"none"}} 
                id={"editdivlink"+itemlinkedin.id}>
              <Linkedin linked={itemlinkedin.linkedin}
                 cle={itemlinkedin.id} btn={false} displaylinkedin={props.displaylinkedin} 
                 setDisplaylinkedin={props.setDisplaylinkedin} linkeds={props.linkeds}
                    setLinkeds={props.setLinkeds}
              />
              </div>
                <div id={"displink"+itemlinkedin.id}>
                  <Card>
                  <CardBody style={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"space-between",width:"auto"
                  ,hyphens: "auto",whiteSpace: "pre-line",flexWrap:"wrap",overflow:"auto"}}>                  
                    <h5><i class="fab fa-linkedin-in" style={{fontSize:"25px",color:"purple"}}></i>&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href = {itemlinkedin.linkedin} target="_blank" style={{color:"black"}}>
                        {itemlinkedin.linkedin}
                    </a></h5> 
                    <div style={{float:"right"}}>
                    <Link>&nbsp;<button style={{padding: "8px"}} class="primary" onClick={deleteLinkedin}>&nbsp;<i class="far fa-trash-alt" title="Supprimer" style={{ fontSize: "15px" }}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
                      <Link><button style={{padding:"8px"}} class="primary" onClick={editLinkedin}>&nbsp;<i class="fas fa-pencil-alt" title="Editer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
                    </div>
                  </CardBody>
                  </Card>                                                                                                                                                 
              </div>
              </div>
            )
} else{
    return(
       null
    );
}
}
