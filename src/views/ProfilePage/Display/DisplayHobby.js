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
import Hobbies from "../Hobbies.js"
const useStyles = makeStyles(styles);

export default function DisplayHobby(props) {


  const classes = useStyles();
  const {cle,className,...rest} = props;
  if(props.displayhobby.length>0){
    return (
        props.displayhobby.map((item,index) =>{
           function deleteHobby(e){
            console.log("cle"+cle);
            var div= document.getElementById("disphobby"+item.id);
            console.log(div);
            authAxios.delete("Hobby/DeleteHobby/"+item.id
                 ).then((response) => {
                    console.log(response.data);
                    props.displayhobby.splice(index,1)
                    console.log(props.displayhobby)
                    props.setDisplayHobby([]);
                    props.setDisplayHobby(props.displayhobby)
                    div.style.display="none";
                  }, (error) => {
                      console.log(error);
            })
          }
          function editHobby(){        
            var div = document.getElementById("editdivhobby"+item.id)
            console.log(div)
            div.style.display ="block";
            document.getElementById("disphobby"+item.id).style.display="none";
          }
            return(
              <div key={"editdivhobby"+item.id}>
                <div style={{ display: "none" }} id={"editdivhobby" + item.id}>
                  <Hobbies hobby={item.hobby}
                    cle={item.id} btn={false} displayhobby={props.displayhobby}
                    setDisplayHobby={props.setDisplayHobby} id={index}
                  />
                </div>
                <div 
                 //style={{ marginLeft: "100px" }} 
                 id={"disphobby" + item.id} >
                    <Card>
                      <CardBody style={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between", width: "auto", flexWrap: "wrap" }}>
                        <h5><strong>{item.hobby}</strong></h5>
                        <div style={{ float: "right" }}>
                          <Link>&nbsp;<button style={{padding: "8px"}} class="primary" onClick={deleteHobby}>&nbsp;<i class="far fa-trash-alt" title="Supprimer" style={{ fontSize: "15px" }}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
                          <Link><button style={{padding: "8px"}} class="primary" onClick={editHobby}>&nbsp;<i class="fas fa-pencil-alt" title="Editer" style={{ fontSize: "15px" }}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
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
