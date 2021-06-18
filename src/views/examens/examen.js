import React, { useEffect,useContext ,Suspense} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { useState } from "react";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

//import styles from "assets/jss/material-kit-react/views/loginPage.js";
import classNames from "classnames";
import Parallax from "components/Parallax/Parallax";
import { useParams } from 'react-router-dom'
//import { FacebookButton } from 'react-social';
import {Checkbox,FormControlLabel,FormGroup,Grid,Snackbar} from "@material-ui/core";
import authAxios from "authAxios";
// @material-ui/icons
import "react-notifications-component/dist/theme.css";
import { Alert } from "@material-ui/lab";
import CardFooter from "components/Card/CardFooter";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Check } from "@material-ui/icons";
import { number } from "prop-types";
import { Link } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import NotFound404 from "NotFound404";

//import Correction from "./Correction";
import "react-loadingmask/dist/react-loadingmask.css";
const useStyles = makeStyles(styles,() => ({
  root: {
    backgroundColor: "purple",
  },
  titreOffre :{
   textTransform:"none"
  },
  '&:hover titreOffre': {
    textDecoration:"underline"
  },
}));
//const  NotFound404 = React.lazy(()=> import("NotFound404"));
const Correction  = React.lazy(() =>  import ('./Correction'));

export default function Examen(props) {

  const classes = useStyles();
  var urlParams = new URLSearchParams(window.location.search);
  const { idcandidature,idexam } = useParams();
  const [verif, setVerif] = useState();
  const [exam, setExam] = useState([]);
  const [notesQuestions, setNotesQuestions] = useState([]);
  const [resultExam, setResultExam] = useState([]);
  
  // get examen
    function getExamen() {
      setLoading(true)
    var id = localStorage.getItem("iduser");
     authAxios
      .post("Exam/getExam/"+idcandidature+"/"+idexam,{   
        extrafield: id,
        message:"waaaaaaw"
    })
      .then((res) => {
        setExam(res.data.exam)
        console.log(res.data)
        setH(Math.floor(res.data.exam.duree/60));
        setM(res.data.exam.duree % 60);
        setNotesQuestions(res.data.randomArray)
        setResultExam(res.data.exam.examenresults)
        console.log(res.data.exam)
        setLoading(false);
        setVerif(true);
      },
      (error) => {
        //alert(error);
        setLoading(false);
        setVerif(false)
        console.log(error);
      });
  }
  const {style ,...rest} = props;
  const [h,setH] = useState(0);
  const [m,setM] = useState(0);
  const[ok,setOk] = useState()
 
  function onCompleteTimer(){
    submit();
    document.getElementById("divqcm").style.display="none";
    document.getElementById('divresult').style.display="block";
    submit();
    handleClose();
  }
  //const context = useContext(MyContext)
  useEffect(() => {
    getExamen();
    }, []);

    const [state1, setState1] = useState({
      open: false,
      vertical: "bottom",
      horizontal: "right",
    });
    const { vertical, horizontal, open } = state1;
    const handleClose = () => {
      setState1({ ...state1, open: false });
    };

    useEffect(() => {
       window.onbeforeunload= function() {
        console.log("check state :",state1.open);
        if(state1.open===true){
          console.log("check state :",state1.open);
          submit()
          return true;
        }
      };
      return () => {
          window.onbeforeunload = null;
      };
  }, [state1]);
  //prop time for countdown timer 
    const children = ({ remainingTime }) => {
      const hours = Math.floor(remainingTime / 3600)
      const minutes = Math.floor((remainingTime % 3600) / 60)
      const seconds = remainingTime % 60
       return `${hours}  : ${minutes < 10 ?  `0${minutes}` : minutes}: ${seconds < 10 ?  `0${seconds}` : seconds}`
    }
    
    const[tab,setTab] = useState([])
    //get corrects responses number
    function  correctsResponses (id){
      var x=0;
      notesQuestions.map((item)=>{
        if(item.id===id)
        { 
          item.question.reponses.map((rep)=>{
          if(rep.correcte===true)
          {x=x+1;}
        }
        );}
      });
      return x;
    }
    //add notes 
    function addnote(checked,item,repid){
      console.log("note total de l'examen :",noteQCMTotal)
      console.log(tab)
      var first = tab.find(ele => ele.id == item.id);
      var aux = first.reps.find(r=>r.id===repid)
      console.log("aux from add note :",aux);
      if(checked){
       aux.checked = true;
       console.log("checked after update :",aux)
      }
      else{
        aux.checked = false;
        console.log("checked after update :",aux)
     } 
    }
    
    // fill tab fro calcul result 
    const [noteQCMTotal,setNoteQCMTotal] = useState(0)
    function remplirTab(){
      var tot =0;
      notesQuestions.map((item,index)=>{
        tot += item.question.note
        tab.push({id:item.id,reps:[],note_obtenue:0})
        item.question.reponses.map((r,i)=>{
          var aux  = tab.find(a=>a.id===item.id);
          aux.reps.push({id:r.id,correct:r.correcte,checked:false})
        })
      })
      setNoteQCMTotal(tot);
    }
 useEffect(() => {
  remplirTab()
  console.log('tab from use effect :',tab)
   return () => {
    // setTab([])
   }
 }, [notesQuestions])

   // submit result exam 
      function submit (){
        var total = Number(0);
        console.log("reponse 1 checked ou non :",(tab[0].reps[0].correct == "true"))
        tab.map((x,j)=>{
          var nbrcorr =0
          var final = Number(0);
          var noteobtenue = Number(0);
          var correctresponses= correctsResponses(notesQuestions[j].id);
          console.log(correctresponses)
          noteobtenue = notesQuestions[j].question.note / correctresponses;
          console.log("note obtenue question :",j," = ",noteobtenue,"note obteue avec addition :",noteobtenue+5)
          console.log(`/***********item ${j}**********/`)
            for(let i = 0;i< x.reps.length;i++){
              console.log(x.reps[i].correct)
              if(x.reps[i].correct == true){
                if(x.reps[i].checked == true){
                  nbrcorr += 1;
                  final = Number(final) + Number(noteobtenue); 
                  console.log("incerement final ")
                }
              }
              else{
                 if(x.reps[i].checked == true){
                  final = Number(0);
                  console.log("this message is from break ")
                  break;
                }  
            }
          }
          if(nbrcorr != correctresponses){
            final =Number(0)
          }
          tab[j].note_obtenue = final
          total = Number(total)+Number(final);
          console.log("totaaaaaal : ",total);
          setScore(total);
          console.log("tab from submit :",tab)
        });
        var etat = "";
        if(total>= noteQCMTotal/2){
          etat="préaccepté";
        }else{
          etat="rejeté";
        }
        var idcandidat = localStorage.getItem('iduser')
        authAxios.put(`Exam/addExamenResult/${idexam}/${idcandidat}/${etat}`,
        {
          id: idcandidature,
          note_totale: total,
        }).then((res)=>{
          console.log(res.data)
        },(error)=>{
          console.log(error)
        });
     }
    const[score,setScore] = useState()
    const[loading,setLoading] = useState(true);

    //on start exam ,set passed true
    function startExam(){
      var id= localStorage.getItem('iduser');
      setState1({ ...state1, open: true });
      document.getElementById("divqcm").style.display="block";
      document.getElementById("infoqcm").style.display="none";
     /* authAxios.put(`Exam/setPassedExam/${idexam}/${id}`)
      .then((res) => {
        console.log(res.data)
        setState1({ ...state1, open: true });
        document.getElementById("divqcm").style.display="block";
        document.getElementById("infoqcm").style.display="none";
      },
      (error) => {
        console.log(error);
      });*/
    }

  return (
    <div>
    {verif === true  ?
      <React.Fragment>
      <Parallax style={{ height: "100px" }} /> 
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}>
        <Alert
          variant="filled"
          icon={false}
          style={{ backgroundColor: "white", color: "white" ,textAlign:"center"}}
        >
         <CountdownCircleTimer
           isPlaying
           size={100}
           ariaLabel="Durée"
           duration={exam.duree*60}
           initialRemainingTime={exam.duree*60}
           colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
           children={children}
           onComplete={onCompleteTimer}
         />
        </Alert>
      </Snackbar>
      <Loader
        type="Bars"
        color="purple"
        height={50}
        width={50}
        visible={loading}
       // timeout={7000} //3 secs
      />
      <h3 style={{ textAlign: "center",margin:"20px"}}>
        <strong><span style={{borderBottom:"5px solid grey",padding:10}}>Evaluation</span> </strong>{" "}
      </h3>
      <br></br>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ backgroundColor: "#F0F0F0" }}>
          <Grid container direction="row" justify="center">
            <GridItem xs={12} sm={12} md={9} id="infoqcm">
            <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center" }}>
            <div>
            <h3 style={{ textAlign: "left"}}>
                <Alert severity="warning">
                <ul>
                    <li>Cet examen est un  <strong>questionnaire à choix multiples (QCM) </strong> contenant <strong>{exam.nbr_questions} questions .</strong></li>
                    <li>Il doit être passer dans une durée de <strong>
                      {
                        h > 0 && m >0  ? <span key="h">{h} h et {m} minutes .</span>  : 
                        [h > 0 && m == 0 ? <span key="m">{h} h</span> :
                          <span key="s">{m} minutes .</span>
                        ]}
                      </strong></li>
                    <li>Vous obtiendrez votre <strong>score</strong> à la fin de cet examen .</li>
                </ul>
               </Alert>
            </h3>
            </div>
            <div  >
            <Button color="success" onClick={()=> startExam()}>
                 Commencer maintenant 
            </Button> 
            </div>
            </div>
           
            </GridItem>
            <GridItem xs={12} sm={12} md={9} id="itemforunload" >
            <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center" }}>
            <Card style={{display:"none"}} id="divqcm">
                <CardBody>
                <h4 style={{color:"black",textAlign:"center",fontWeight:"bold"}}>{exam.titre}</h4>
                <Alert severity="info">
                <ul>
                  <li>Cochez lisiblement les cases des réponses que vous jugez correctes .</li>
                  <li>Ces questions à choix multiples (QCM) peuvent avoir une ou plusieurs bonnes réponses .</li>
                  <li>Toutes les bonnes réponses doivent être cochées pour que la question soit validée entièrement .</li>
                  <li>Si vous cochez une fausse réponse , la question sera rejeté entièrement .</li>
                </ul>
               </Alert>
               <br></br>
               {notesQuestions.map((item,index)=>(
               <span><strong>Question {index+1} : </strong> <br></br>
                <h5><strong>{item.question.question}</strong></h5>
                <br/>
               {item.question.reponses.map((rep,index)=>(
                <div key={"checkbox"+index}
              >
              <React.Fragment>
              <FormGroup aria-label="position" column id={"check"+item.id} className={"check"+item.id}
                onClick={(e) => console.log(e.target.value)}
                value={rep.correcte}
              >
                <FormControlLabel 
                  control={
                    <Checkbox 
                      tabIndex={-1}
                      value={rep.correcte}
                      onChange = {(e)=>{addnote(e.target.checked,item,rep.id)}}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                      }}
                    />
                  }
                    style={{color:"black"}}
                    label={rep.reponse}
                />
                </FormGroup>
                </React.Fragment>
              </div>
              ))}
              <br></br>
              </span>
               ))}
                </CardBody>
                <CardFooter>
                    <Button color="primary" onClick={()=>{submit();
                                                    document.getElementById('divresult').style.display="block";
                                                    document.getElementById('divqcm').style.display="none";
                                                    handleClose();}}>
                      Envoyer</Button>
                </CardFooter>
            </Card>
         
            <div id="divresult" style={{display:"none",textAlign:"center"}}>
              <Card>
                <CardBody>
                   <h2>Votre scrore final est <span style={{color:"purple"}}><strong>{score} / {noteQCMTotal}</strong></span></h2>
                   {Number(score) >= (Number(noteQCMTotal)/2 )?  
                     <h4><span> <strong>Félicitations ! Vous avez réussi votre examen !
                       <span style={{fontSize:50}}>&#127881;</span><br/>
                       Vous serez contacté par le responsable RH le plutôt possible pour un entretien .</strong>
                        <br/><br/> <Button color="primary" 
                        onClick={()=>{
                        //  document.getElementById('divresult').style.display="none";
                          document.getElementById('divcorrection').style.display="block";
                        }}> 
                          Voir la correction 
                        </Button></span></h4>
                    :
                   <span><h4><strong>Désolé ! Vous n'avez pas réussi votre examen ! </strong>
                   <span style={{fontSize:30}}>&#128577;</span></h4><br/>
                   <Link to={"/toutes-les-offres"} style={{textDecoration:"none"}}><Button>Essayez d'autres offres disponibles </Button></Link></span>}
                   <div id="divcorrection" style={{display:"none"}}>
                      <Suspense  fallback={<Loader type="Bars" color="purple" height={50} width={50}/>}>
                        <Correction tab ={tab} examen={exam} notesQuestions={notesQuestions}></Correction>
                      </Suspense>
                   </div>
                </CardBody>
              </Card>
            </div>
            </div>
            </GridItem>
          </Grid>
        </div>
      </div>
      <Footer />
      </React.Fragment>
      : 
      <NotFound404>
{      /*<Loader type="Bars" color="purple" height={50} width={50} style={{marginTop:"20%",marginLeft:"50%"}}></Loader>
*/}       </NotFound404>
    }
    </div>
  );
}
