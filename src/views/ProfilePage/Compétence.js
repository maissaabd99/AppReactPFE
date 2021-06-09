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

export default function Compétence(props) {
const [titre,setTitre] = useState(props.compt);
const [niveau,setNiveau] = useState(props.niveau);

  function deleteCompt(e){
    console.log("cle"+cle);
    var div= document.getElementById("compt"+cle);
    console.log(div)
    div.style.display="none";
  }

  function AddCompetence(e){
    e.preventDefault();
    var id = localStorage.getItem("iduser");
    console.log(document.getElementById("niveaucompt"+cle).selectedIndex);
    var valueNiveau  = document.getElementById("niveaucompt"+cle).selectedIndex;
    var titrecompt=document.getElementById("titrecopmt"+cle).value;
    var niveaucompt=document.getElementById("niveaucompt"+cle).options[document.getElementById("niveaucompt"+cle).selectedIndex].textContent;
    if (props.btn == null) {
      authAxios.post("/Competence/AddCompetence/" + id, {
        "titre": titrecompt,
        "niveau": niveaucompt,
        "value":valueNiveau,
      }).then((response) => {
        console.log(response.data);
        var div = document.getElementById("compt" + cle);
        div.style.display = "none";
        props.setDisplayComp(props.displaycomp.concat(response.data.comp));
      }, (error) => {
        console.log(error);
      })
    } else {
      authAxios.put("/Competence/UpdateCompetence/" + cle, {
        "titre": titrecompt,
        "niveau": niveaucompt,
        "value":valueNiveau,
      }).then((response) => {
        console.log(response.data);
        var div = document.getElementById("compt" + cle);
        div.style.display = "none";
        //delete props.displaycomp[props.id];
        props.displaycomp.splice(props.id,1)
        props.setDisplayComp([]);
        props.setDisplayComp(props.displaycomp.concat(response.data.updatedcomp));
      }, (error) => {
        console.log(error);
      })
    }
  }

  const classes = useStyles();
  const {ProfilePage,cle,tab,className,...rest } = props;
    return (
      <div
      // style={{marginLeft:"100px"}} 
      id={"compt"+cle}>
     
        <Card>
        <form onSubmit={AddCompetence} >
        <CardBody style={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"space-around",flexWrap: "wrap"}}>
         <div style={{width:"35%"}}>
                  <CustomInput
                    onChange={e=>setTitre(e.currentTarget.value)} value={titre}
                    labelText="Saisir une compétence" 
                    id={"titrecopmt" + cle} formControlProps={{
                      fullWidth: true
                    }}
                  />
         </div>
         <select style={{padding:"8.5px",width:"30%"}} id={"niveaucompt"+cle} 
             onChange={e=>setNiveau(e.target.value)} value={niveau}>
                 <option class="dropdown" style={{hover:"primary"}} selected>Pas développée</option>
                 <option>Connaissance de base</option>
                 <option>Compétent</option>
                 <option>Fort</option>
                 <option>Expert</option>
          </select>
          <div style={{ float: "right"}}>
              <Button color="primary" style={{ marginTop: "2px", padding: "9.5px" }} type="submit">Enregistrer</Button> &nbsp;
              {/*<Link cle={cle} >&nbsp;<button style={{padding:"8px"}}  class="primary"  >&nbsp;<i  class="far fa-trash-alt" title="Supprimer" style={{fontSize:"15px"}}></i>&nbsp;</button>&nbsp;</Link>*/}
              {props.btn == null ? (<Link><button style={{ padding: "8px" }} onClick={deleteCompt} class="primary">&nbsp;<i class="fas fa-times" title="Fermer" style={{ fontSize: "15px" }}></i>&nbsp;</button></Link>) : null}
          </div>
     </CardBody>
     </form>
    </Card>                                                                                                                                                 
</div>
  ); 
}
