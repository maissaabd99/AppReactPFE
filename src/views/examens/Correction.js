import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { useState } from "react";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
//import styles from "assets/jss/material-kit-react/views/loginPage.js";
import classNames from "classnames";
import Parallax from "components/Parallax/Parallax";
//import { FacebookButton } from 'react-social';
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@material-ui/core";
import "react-notifications-component/dist/theme.css";
import { Check } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function Correction(props) {

  const classes = useStyles();
  const exam = props.examen;
  const notesQuestions = props.notesQuestions;
  const tab =props.tab;
  console.log(props)
  console.log("exam from correction", exam)
  console.log("noteQuestions from correction", notesQuestions)
  console.log("tab from correction", props.tab)

  return (
    <div style={{textAlign:"left"}}>
      <h4 style={{ color: "black", textAlign: "center", fontWeight: "bold" }}>Correction {exam.titre}</h4>
      {notesQuestions.map((item, index) => (
        <span><strong>Question {index + 1} : </strong> <br></br>
          <h5><strong>{item.question.question} {" "} ({tab[index].note_obtenue}/{item.question.note} points)</strong></h5>
          <br />
          {item.question.reponses.map((rep, index) =>{
            var isChecked =false;
            if(rep.correcte===true){
              isChecked =true;
            }
           
            return(<div key={"checkbox" + index}>
              <React.Fragment>
                <FormGroup aria-label="position" column value={rep.correcte}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        tabIndex={-1}
                        disabled
                        checked={isChecked}
                        value={rep.correcte}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />
                    }
                    style={{ color: "black" }}
                    label={rep.reponse}
                  />
                </FormGroup>
              </React.Fragment>
            </div>
          )})}
          <br></br>
        </span>
      ))}
    </div>
  );
}
