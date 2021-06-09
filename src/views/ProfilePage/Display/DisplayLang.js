import React, { useState } from "react";
import ReactDOM from "react-dom";
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
import Langue from "../Langue";
import { DriveEtaTwoTone } from "@material-ui/icons";
const useStyles = makeStyles(styles);

export default function DisplayLangue(props) {

  const classes = useStyles();
  const { ProfilePage, cle, className, tableau, ...rest } = props;
  var tab = [];

  if (props.tableau.length > 0) {
    props.tableau.map((item, index) => {
      // console.log(tableau[index])
      function deleteLang(e) {
        //console.log("cle"+ cle);
        var div = document.getElementById("disp" + item.id);
        authAxios.delete("/Candidats/DeleteLanguage/" + item.id,
        ).then((response) => {
          console.log(response);
          tableau.splice(index, 1)
          console.log(tableau)
          props.setDisplay([]);
          props.setDisplay(tableau)
          div.style.display = "none";
        }, (error) => {
          console.log(error);
        })
      }
      function editLangue() {
        var div = document.getElementById("editdiv" + item.id)
        console.log(div)
        div.style.display = "block";
        document.getElementById("disp" + item.id).style.display = "none"
      }
      tab.push(
        <div key={"editdiv" + item.id}>
          <div style={{ display: "none" }} id={"editdiv" + item.id} >
            <Langue contenu={item.langue} niveau={item.niveau} cle={item.id} btn={false} update={props.tableau} setDisplay={props.setDisplay} id={index} />
          </div>
          <div id={"disp" + item.id}>
            <div id={"grid" + item.id}>
              <Card>
                <CardBody style={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between", width: "auto", flexWrap: "wrap" }}>
                  <h4><strong>{item.langue}</strong></h4>
                  <h6 style={{ color: "lightslategray" }}><i class="fas fa-star" style={{ color: "purple" }}></i> {item.niveau}</h6>
                  <div style={{ float: "right" }}>
                    <Link>&nbsp;<button style={{ padding: "8px" }} class="primary" onClick={deleteLang}>&nbsp;<i class="far fa-trash-alt" title="Supprimer" style={{ fontSize: "15px" }}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
                    <Link><button style={{ padding: "8px" }} class="primary" onClick={editLangue}>&nbsp;<i class="fas fa-pencil-alt" title="Editer" style={{ fontSize: "15px" }}></i>&nbsp;</button>&nbsp;</Link>&nbsp;
                    </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      )
    })
  }
  return (
    <div>
      {tab}
    </div>
  )
}
