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
import CustomInput from "components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import authAxios from "authAxios";

const useStyles = makeStyles(styles);

export default function Linkedin(props) {

  const [linked,setLinked] = useState(props.linked); 
  const classes = useStyles();
  const {ProfilePage,cle,tab,className,...rest} = props;
  function deleteLinkedin(e){
    var div= document.getElementById("linkedin");
    console.log(div)
    div.style.display="none";
  }

  function AddLinkedin(e) {
    e.preventDefault();
    var id = localStorage.getItem("iduser");
    var linkedin = document.getElementById("lien").value;
    if (props.btn == null) {
      authAxios.post("/Linkedin/AddLinkedin/" + id, {
        "linkedin": linkedin
      }).then((response) => {
        console.log(response.data);
        var div = document.getElementById("linkedin");
        div.style.display = "none";
        //props.setLinkeds([]);
        props.setDisplaylinkedin([])
        props.setDisplaylinkedin(props.displaylinkedin.concat(response.data.lin));
      }, (error) => {
        console.log(error);
      })
    } else {
      authAxios.put("/Linkedin/UpdateLinkedin/" + cle, {
        "linkedin": linkedin
      }).then((response) => {
        console.log(cle);
        var div = document.getElementById("linkedin");
        div.style.display = "none";
        props.setLinkeds([]);
        props.setDisplaylinkedin([])
        props.setDisplaylinkedin(props.displaylinkedin.concat(response.data.updatelinked));
        console.log(props.displaylinkedin)
      }, (error) => {
        console.log(error);
      })
    }
  }
    return (
      <div 
    //  style={{marginLeft:"100px"}} 
      id="linkedin">
        <Card>
        <form onSubmit={AddLinkedin}>
        <CardBody style={{display:"flex",alignItems:"center",flexDirection:"row",flexGrow: 1,justifyContent:"space-around",width:"auto"}}>      
          <div style={{width:"50%",marginTop:"-2%",}}>    
          <CustomInput  labelText="Coller le lien de votre profil linkedin"
           id="lien" value={linked}
           onChange={e=>setLinked(e.currentTarget.value)}
           formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            type: "text",
            endAdornment: (
              <InputAdornment position="end" style={{marginTop:'-4px'}}>
               <Icon>
               <i class="fab fa-linkedin" style={{fontSize:"17px",color:"purple"}}></i>
                </Icon>
              </InputAdornment>
            )
          }}>
          </CustomInput>
          </div>
          <div style={{float:"right",marginTop:"0%"}}>
            &nbsp;&nbsp;<Button type="submit" color="primary" style={{marginTop:"-0%",float:"right",padding:"10px"}}>Enregistrer</Button> &nbsp;  
          </div>
          </CardBody>
          </form>
        </Card>                                                                                                                                                 
</div>
  );  
}
