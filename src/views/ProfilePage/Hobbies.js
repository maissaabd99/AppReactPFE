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
import authAxios from "authAxios";

const useStyles = makeStyles(styles);
export default function Hobbies(props) {

  const classes = useStyles();
  const {ProfilePage,cle,tab,className,displayhobby,setDisplayHobby,...rest} = props;
  const [hobby ,setHobby] = useState(props.hobby)

  function deleteHobby(e){
    console.log("cle"+cle);   
    var div= document.getElementById("hob"+cle);
    console.log(div)
    div.style.display="none"
  }

  function AddHobby(e) {
    e.preventDefault();
    var id = localStorage.getItem("iduser");
    var hobby = document.getElementById("hobby" + cle).value;
    if (props.btn == null) {
      authAxios.post("/Hobby/AddHobby/" + id, {
        "hobby": hobby
      }).then((response) => {
        console.log(response.data);
        var div = document.getElementById("hob" + cle);
        div.style.display = "none";
        setDisplayHobby(displayhobby.concat(response.data.hobby));

      }, (error) => {
        console.log(error);
      })
    } else {
      authAxios.put("/Hobby/UpdateHobby/"+cle,{
        "hobby": hobby
      }).then((response) => {
        console.log(response.data);
        var div = document.getElementById("hob"+cle);
        div.style.display = "none";
     //   delete displayhobby[props.id];
        displayhobby.splice(props.id,1)
        setDisplayHobby([])
        setDisplayHobby(displayhobby.concat(response.data.updatedhobby));
      }, (error) => {
        console.log(error);
      })
    }
  }
    return (
      <div 
      //style={{marginLeft:"100px"}}
      id={"hob"+cle}>
        <Card  style={{display:"flex",alignItems:"center",flexDirection:"row",flexGrow: 1,justifyContent:"space-between",width:"auto"}}>
        <CardBody>
        <form onSubmit ={AddHobby}>
          <div style={{width:"60%",marginTop:"-2%",}}>
          <CustomInput onChange={e=>setHobby(e.currentTarget.value)} value={hobby}
            id={"hobby"+cle} labelText="Saisir un loisir ..."
            formControlProps={{
            fullWidth: true
          }}>
          </CustomInput>
          </div>
          <div style={{float:"right",marginTop:"-6%"}}>
          {props.btn == null ? (<Link style={{float:"right"}}><button style={{padding:"8.5px"}} class="primary" onClick={deleteHobby}>&nbsp;<i class="fas fa-times" title="Fermer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>):null}&nbsp;
          {/*<Link style={{float:"right"}} cle={cle} >&nbsp;<button style={{padding:"8px"}}  class="primary"  >&nbsp;<i class="far fa-trash-alt" title="Supprimer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>*/}&nbsp;
          <Button color="primary" style={{marginTop:"-0%",float:"right",padding:"10px"}} type="submit"> Enregistrer</Button>&nbsp;
          </div>
          </form>
          </CardBody>
        </Card>                                                                                                                                                 
</div>
  );
}
