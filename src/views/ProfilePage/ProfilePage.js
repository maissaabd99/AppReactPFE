import React,{ useState} from "react";
import ReactDOM from 'react-dom'
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import profile1 from "assets/img/faces/christian.jpg";
import "./stylee.css"
import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Experience from "./Experience";
import Langue from "./Langue";
import Compétence from "./Compétence";
import Hobbies from "./Hobbies";
import Linkedin from "./Linkedin";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles";
import { Link } from "react-router-dom";


const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
 var [profile,setProfile] = useState(profile1);
 console.log(profile);
  const classes = useStyles();
  const {data,cle , ...rest} = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const sletectedfile = event =>{
    let reader = new FileReader();
    reader.onload = (event) =>{
    
       setProfile(event.target.result) ;
    }
    reader.readAsDataURL(event.target.files[0])

  }
  var [languages,setState]= useState([])
  ajouterLang = ajouterLang.bind(this);
  function ajouterLang(e){
    console.log(languages.length)
    e.preventDefault();
   setState(languages.concat(<Langue cle ={languages.length} tab={languages} changetab={setState}/>));   
  }
 var [exps,setExp]= useState([])
 ajouterExp = ajouterExp.bind(this);
  function ajouterExp(e){
    e.preventDefault();
    setExp([exps,<Experience cle={exps.length}/>]); 
  }

  var [compt,setCompt]= useState([])
  ajouterCompt = ajouterCompt.bind(this);
  function ajouterCompt(e){
    e.preventDefault();
    setCompt([compt,<Compétence cle={compt.length}/>]); 
  }
 var [hobbies,setHobbies]= useState([])
 ajouterHobby = ajouterHobby.bind(this);
  function ajouterHobby(e){
    e.preventDefault();
    setHobbies([hobbies,<Hobbies cle={"hob"+hobbies.length}/>]); 
  }

  deleteExp = deleteExp.bind(this);
  function deleteExp(e,index){
    e.preventDefault();
    setState(props.langs);  
  }
  function filename(e){
  var name =document.getElementById("cv").files[0].name;
  document.getElementById("pfile").textContent=name;
    console.log(document.getElementById("cv").files[0])
  }

  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (  
    <div>
      <Header
        color="transparent"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "dark"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)} >
        <div style={{backgroundColor:"#F0F0F0"}}>
          <div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                    {/*<div style={{maxHeight:"200px",backgroundColor:"grey",marginLeft:"230px"}}>*/}
                    <img id="img-profile" src={profile} alt="img-user" className={imageClasses} onChange={sletectedfile} />
                   
                  <div className={classes.name}>
                  <label class="btn btn-primary">
                      <i class="fa fa-image"></i> Modifier photo <input type="file" style={{display:"none"}} name="image-user" onChange={sletectedfile}></input>
                    </label><br></br>
                    <h3 className={classes.title}>{localStorage.getItem("Usernom").toUpperCase()} {localStorage.getItem("Userprenom")}</h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <Card style={{float:"right",marginRight:"100px",width:"280px",height:"250px"}}>
              <h2>votre profil est complété à 0%</h2>
              <div class="progress-circle">
              </div>
            </Card>
            
            <h3 style={{marginLeft:"120px"}}><i class="fas fa-language"  style={{color:"purple"}}></i> <strong> Langues maitrisées</strong></h3>
            <i class="fas fa-plus" style={{fontSize:"17px",marginLeft:"860px",color:"purple"}} onClick={ajouterLang}></i>   
            <Langue tab={languages} cle={100} changetab={setState}/>   
           {languages}
           
            <h3 style={{marginLeft:"120px"}}><i class="fas fa-briefcase" style={{color:"purple"}}></i><strong> Exprériences professionnelles</strong></h3>
            <i class="fas fa-plus" style={{fontSize:"17px",marginLeft:"860px",color:"purple"}} onClick={ajouterExp}></i>   
            <br></br>
           
            <Experience tab={languages} cle={1000}/>
            <Card style={{float:"right",marginRight:"100px",width:"280px",height:"250px",marginTop:"-40%"}}>
              <br></br>
              <h4 style={{textAlign:"center"}}>Importer votre CV</h4><br></br>
            <label style={{marginLeft:"65px"}}>
              <span style={{backgroundColor:"purple",padding:"15px",color:"white"}}><i class="fas fa-upload" style={{color:"white"}}></i> Choisir un fichier
              <input type="file" onChange={filename} id="cv" style={{display:"none"}}></input></span>
            </label>
            <br></br>
            <h5 id="pfile" style={{color:"black",textAlign:"center",}}>Aucun fichier choisit</h5>
            <progress></progress>
            </Card> 
            {exps}
            <h3 style={{marginLeft:"120px"}}><i class="fas fa-clipboard" style={{color:"purple"}}></i><strong> Compétences</strong></h3>
            <i class="fas fa-plus" style={{fontSize:"17px",marginLeft:"860px",color:"purple"}} onClick={ajouterCompt}></i>
            <Compétence cle={1004}/>
            {compt}
            <h3 style={{marginLeft:"120px"}}><i class="fas fa-gamepad" style={{color:"purple"}}></i><strong> Passe-temps</strong></h3>
            <i class="fas fa-plus" style={{fontSize:"17px",marginLeft:"860px",color:"purple"}} onClick={ajouterHobby}></i>
            <Hobbies cle={1005}/>
            {hobbies}
            <h3 style={{marginLeft:"120px"}}><i class="fab fa-linkedin" style={{color:"purple"}}></i><strong> Profil Linkedin</strong></h3>
            <Linkedin/>                      
            <br></br>
            <div className={classes.description}>  
            </div>
            
            {/*<GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Studio",
                      tabIcon: Camera,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio2}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={studio5}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio4}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Work",
                      tabIcon: Palette,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work5}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Favorite",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    }
                  ]}
                />
              </GridItem>
                </GridContainer>*/}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
