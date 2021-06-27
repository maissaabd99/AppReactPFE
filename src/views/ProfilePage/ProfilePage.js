import React, { useState, useEffect,useContext } from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import profile1 from "assets/img/anonymous.jpg";
import "./stylee.css";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Experience from "./Experience";
import Langue from "./Langue";
import Compétence from "./Compétence";
import Hobbies from "./Hobbies";
import Linkedin from "./Linkedin";
import Card from "components/Card/Card.js";
import authAxios from "../../authAxios";
import DisplayLangue from "./Display/DisplayLang";
import {FormControl,FormControlLabel,Grid,InputAdornment,MenuItem,Radio,RadioGroup,Snackbar,TextField} from "@material-ui/core";
import DisplayExp from "./Display/DisplayExp";
import DisplayCompetence from "./Display/DisplayCompetence";
import DisplayHobby from "./Display/DisplayHobby";
import Formation from "./Formation";
import DisplayEtude from "./Display/DisplayEtude";
import DisplayLinkedin from "./Display/DisplayLinkedin";
import { Close, Edit } from "@material-ui/icons";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Alert } from "@material-ui/lab";
import Loader from "react-loader-spinner";


export const BarContext = React.createContext()
const useStyles = makeStyles(styles,(theme)=>({
  root: {
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    backgroundColor: 'purple',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: 'purple',
    },   
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
  countryList: {
    ...theme.typography.body1,
  }, 
}));

function ProfilePage(props) {
  const classes = useStyles();
  const { data, cle, ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  var [profile, setProfile] = useState(profile1);
  //get CV user
  async function getUserCV()
{  const a = await authAxios
    .get("UplodFiles/" + localStorage.getItem("iduser"), {
      method: "GET",
    })
    .then(
      (res) => {
        setGetFileName("https://localhost:44392/files/" + res.data.filename);
        setNomFichierFinal(res.data.original);
        setHidebutton(false);
      },
      (error) => {
        console.log(error);
      }
    );}
  //get photo user
  async function getUserPhoto()
  {await authAxios
    .get("UplodFiles/getUploadPhoto/" + localStorage.getItem("iduser"), {
      method: "GET",
    })
    .then(
      (res) => {
        setProfile("https://localhost:44392/Photos/" + res.data.photo);
      },
      (error) => {
        setProfile(profile1);
        console.log(error);
      }
    );
}
   const [display, setDisplay] = useState([]);
   const [displayexp, setDisplayExp] = useState([]);
   const [displaycomp, setDisplayComp] = useState([]);
   const [displayhobby, setDisplayHobby] = useState([]);
   const [displayetude, setDisplayEtude] = useState([]);
   const [displaylinkedin, setDisplaylinkedin] = useState([]);
   const [loading,setLoading] = useState(true);
  //get loggedin user
  const [user, setUser] = useState([]);
  async function getUser() {
    setLoading(true)
    await authAxios
      .get("Candidats/" + localStorage.getItem("iduser"), {
        method: "GET",
      })
      .then(
        (res) => {
         // setGetFileName("https://localhost:44392/files/" + res.data.cVname);
          //setNomFichierFinal(res.data.cVoriginalfilename);
          //setProfile("https://localhost:44392/Photos/" + res.data.photo);
          setHidebutton(false);
          console.log(res.data);
          setUser(res.data);
          setDisplay(res.data.langue)
          setDisplayComp(res.data.competence)
          setDisplayEtude(res.data.formation)
          setDisplayExp(res.data.experience_prof)
          if(res.data.linkedin!=null){
            setDisplaylinkedin(displaylinkedin.concat(res.data.linkedin));
          }
          setDisplayHobby(res.data.hobby) 
          setLoading(false)
        },
        (error) => {
          setLoading(false)
          console.log(error);
        }
      );
  }

  //Updating circular progress
  const [bar, setBar] = useState(0);
  var x = 0;
  function progression() {
    var l = 0; var e = 0;
    var et = 0;var c = 0;
    var h = 0;var lin = 0;
    if (display.length > 0) {l = 20;}
    if (displayexp.length > 0) {e = 20;}
    if (displayetude.length > 0) {et = 20;}
    if (displaycomp.length > 0) {c = 20;}
    if (displayhobby.length > 0) {h = 10;}
    if (displaylinkedin.length > 0) {lin = 10;}
    setBar(l + e + et + c + h + lin);
  }
  useEffect(() => {
    progression();
  }, [display,displayexp,displayhobby,displaylinkedin,displaycomp,displayetude,
  ]);

  useEffect(() => {
    getUserPhoto()
    getUserCV()
  }, [profile])

  useEffect(() => {
    progression();
    getUser();
  /*getAllFormations();getAllLanguages();getAllExperiences();getAllCompetences();getAllHobbies(); getLinkedin();*/
  }, []);

  //Add languages
  var [languages, setState] = useState([]);
  ajouterLang = ajouterLang.bind(this);
  function ajouterLang(e) {
    e.preventDefault();
    setState(
      languages.concat(
        <Langue
          cle={languages.length}
          update={display}
          setDisplay={setDisplay}
        />
      )
    );
  }
  //Add linkeds
  var [linkeds, setLinkeds] = useState([]);
  //Add Experiences
  var [exps, setExp] = useState([]);
  ajouterExp = ajouterExp.bind(this);
  function ajouterExp(e) {
    e.preventDefault();
    setExp(
      exps.concat(
        <Experience
          cle={exps.length}
          setDisplayExp={setDisplayExp}
          displayexp={displayexp}
        />
      )
    );
  }
  //Add cometences
  var [compt, setCompt] = useState([]);
  ajouterCompt = ajouterCompt.bind(this);
  function ajouterCompt(e) {
    e.preventDefault();
    setCompt(
      compt.concat(
        <Compétence
          cle={compt.length}
          setDisplayComp={setDisplayComp}
          displaycomp={displaycomp}
        />
      )
    );
  }
  //Add Hobbies
  var [hobbies, setHobbies] = useState([]);
  ajouterHobby = ajouterHobby.bind(this);
  function ajouterHobby(e) {
    e.preventDefault();
    setHobbies(
      hobbies.concat(
        <Hobbies
          cle={hobbies.length}
          displayhobby={displayhobby}
          setDisplayHobby={setDisplayHobby}
        />
      )
    );
  }
  //Add Etudes
  var [etudes, setEtudes] = useState([]);
  ajouterEtude = ajouterEtude.bind(this);
  function ajouterEtude(e) {
    e.preventDefault();
    setEtudes(
      etudes.concat(
        <Formation
          cle={etudes.length}
          setDisplayEtude={setDisplayEtude}
          displayetude={displayetude}
        />
      )
    );
  }

  var [etat, setEtat] = useState("true");
  var [coloretat, setColorEtat] = useState("light");
  var [nomfichier, setNomFichier] = useState("Aucun fichier choisi");
  var [fichier, setFichier] = useState(null);
  function filename(e) {
    if (document.getElementById("cv").files[0] != null) {
      setFichier(document.getElementById("cv").files[0]);
      var name = document.getElementById("cv").files[0].name;
      var patternFileExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i;
      //Get the file Extension
      var fileExtension = name.match(patternFileExtension);
      if (fileExtension != null) {
        if (fileExtension[0] != ".pdf") {
          alert("Veuillez choisir un fichier en format PDF !");
          setFichier(null);
          console.log(fichier);
          setNomFichier("Aucun fichier choisi ");
          setColorEtat("light");
          setEtat("true");
        } else {
          setNomFichier(name);
          var btn11 = document.getElementById("btnfff");
          console.log(btn11);
          setEtat("false");
          setColorEtat("purple");
          console.log(document.getElementById("cv").files[0]);
        }
      } else {
        alert("Veuillez choisir un fichier en format PDF !");
        setFichier(null);
        console.log(fichier);
        setNomFichier("Aucun fichier choisi ");
        setColorEtat("light");
        setEtat("true");
      }
    }
  }

  const [progress, setProgress] = useState();
  var [getfilename, setGetFileName] = useState();
  var [NomFichierFinal, setNomFichierFinal] = useState();
  var [hidebutton, setHidebutton] = useState(true);

    const  onFileUpload = (event) => {
    const formData = new FormData();
    if (fichier != null) {
      formData.append("file", document.getElementById("cv").files[0]);
      formData.append("useremail", localStorage.getItem("iduser"));
       authAxios
        .post("UplodFiles/Upload", formData, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            setProgress(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
            console.log(formData.getAll);
          },
        })
        .then((res) => {
          console.log(res);
          setGetFileName("https://localhost:44392/files/" + res.data.status);
          setNomFichierFinal(res.data.extrafield);
          setProgress(100);
          setTimeout(function () {
            document.getElementById("progbar").hidden = true;
          }, 500);
          setFichier(null);
          console.log(fichier);
          setNomFichier("Aucun fichier choisi ");
          setColorEtat("light");
          setEtat("true");
          setHidebutton(false);
        });
    }
  };
  const supprimerCV = (e) => {
    e.preventDefault();
    const deletecv = new FormData();
    var id = localStorage.getItem("iduser");
    authAxios.delete("UplodFiles/" + id).then((res) => {
      console.log(res.data);
      setHidebutton(true);
      setNomFichierFinal("");
    });
  };
  var [photo, setPhoto] = useState(null);
  const sletectedfile = (event) => {
    var filePath = document.getElementById("profilephoto").value;
    // Allowing file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.svg)$/i;
    if (!allowedExtensions.exec(filePath)) {
      alert(
        "Type de fichier invalide ! Veuillez choisir un fichier de type image (.jpg|.jpeg|.png|.gif)"
      );
      document.getElementById("profilephoto").value = "";
    } else {
      console.log(event.target.files[0]);
      let reader = new FileReader();
      reader.onload = (event) => {
        setProfile(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onImageUpload = (event) => {
    const formData = new FormData();
    if (document.getElementById("profilephoto").files[0] != null) {
      formData.append("file", document.getElementById("profilephoto").files[0]);
      formData.append("useremail", localStorage.getItem("iduser"));
      authAxios
        .post("UplodFiles/UploadPhoto", formData, console.log(formData.getAll))
        .then((res) => {
          console.log(res.data);
          setProfile("https://localhost:44392/Photos/" + res.data.photo);
        }, sletectedfile(event));
    }
  };
  //Delete user photo
  const supprimerPhoto = (e) => {
    e.preventDefault();
    var id = localStorage.getItem("iduser");
    console.log(user.photo)
    if(user.photo!= null){
      console.log(user.photo)
      authAxios.delete("UplodFiles/DeleteUploadedPhoto/" + id).then((res) => {
        setProfile(profile1);
        console.log(res.data);
      });
    }  
  };
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [adresse, setAdresse] = useState();
  const [birthday, setBirthday] = useState();
  const [tel, setTel] = useState();
  const [etatMatri, setEtatMatri] = useState("");
  const [metier, setMetier] = useState();
  const [genre, setGenre] = useState("");
  
  const handleRadioChange = (event) => {
    setGenre(event.target.value);
    console.log(genre)
  };
  const handleSelectChange = (event) => {
    setEtatMatri(event.target.value);
  };
  EditInfo = EditInfo.bind(this);
  function EditInfo() {
    setNom(user.nom);
    setPrenom(user.prenom);
    setAdresse(user.adresse);
    setMetier(user.metier);
    setEtatMatri(user.etat_matrimonial);
    setBirthday(user.date_naissance.toLocaleString().slice(0,10));
    console.log(user.date_naissance.toLocaleString().slice(0,10))
  //  new Date(item.date_debut).toLocaleString('fr-FR').slice(0,10)
    setTel(user.phoneNumber);
    setGenre(user.genre);console.log(genre)
    var card = document.getElementById("displayeduser");
    card.style.display = "none";
    var formuser = document.getElementById("formuser");
    formuser.style.display = "block";
    document.getElementById("editicon").style.visibility="hidden";
  }

  function closeForm() {
    var formuser = document.getElementById("formuser");
    formuser.style.display = "none";
    var card = document.getElementById("displayeduser");
    card.style.display = "block";
    document.getElementById("editicon").style.visibility = "visible";
  }

  async function handleEdit() {
    var id = localStorage.getItem("iduser");
    console.log(new Date());
    console.log(new Date(birthday))
    //alert("ereeeuuuuuuur birthday",new Date(birthday) <= new Date())
    if(new Date(birthday) >= new Date()){
      document.getElementById("validdate").textContent="Invalide date de naissance !"
    }else{
      await authAxios
      .put("Candidats/" + id, {
        nom: nom,
        prenom: prenom,
        adresse: adresse,
        PhoneNumber: tel,
        date_naissance: birthday,
        etat_matrimonial: etatMatri,
        metier:metier,
        genre: genre,
      })
      .then((res) => {
        console.log(res.data.phoneNumber);
        getUser();
        closeForm();
        setState1({ ...state1, open: true })
      });
    }
    
  }
  const [state1, setState1] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state1;
  const handleClose = () => {
    setState1({ ...state1, open: false });
  };

    return (
      <div style={{ backgroundColor: "#F0F0F0"}}>
      {loading === false  && user=== 0 ?
        <div><h3>erreur !!!</h3></div>
        :
        <React.Fragment>
        <Parallax medium filter image={require("assets/img/profile-bg.jpg")} style={{ height:"300px"}}/>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div style={{ backgroundColor: "#F0F0F0"}}>
          <div>
           <Loader type="ThreeDots" color="purple" height={60} width={60} style={{marginLeft:"45%"}}  visible={loading}/> 
          </div>
         {/*{loading === false ? */}
            <div>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <img
                      id="img-profile"
                      src={profile}
                      alt="img-user"
                      className={imageClasses}
                    />
                    <div className={classes.name}>
                      <label class="btn btn-primary">
                        <i class="fa fa-image"></i> Modifier photo{" "}
                        <input
                          id="profilephoto"
                          accept="image/*"
                          type="file"
                          style={{ display: "none" }}
                          name="image-user"
                          onChange={onImageUpload}
                        ></input>
                      </label>
                      <i
                        style={{ color: "grey" }}
                        class="far fa-trash-alt"
                        title="supprimer"
                        onClick={supprimerPhoto}
                      ></i>
                      <br></br>
                      {/**********************************/}
                      <Card id="global">
                        <span
                          style={{ padding: "10px 10px 0 0", float: "right" }}
                          id="editicon">
                          <i
                            class="fas fa-pencil-alt"
                            title="Editer"
                            onClick={EditInfo}
                            style={{ float: "right" }}
                          ></i>
                        </span>
                        <CardBody id="userinfo">
                          <div id="formuser" style={{ display: "none" }}>
                            <form autoComplete="off">
                              <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                  id="editnom"
                                  value={nom}
                                  onChange={(e) => setNom(e.target.value)}
                                  inputProps={{
                                    placeholder: "Nom",
                                    endAdornment: (
                                      <InputAdornment>
                                        <i class="fas fa-user"></i>
                                      </InputAdornment>
                                    ),
                                  }}
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                  id="editpren"
                                  value={prenom}
                                  onChange={(e) => setPrenom(e.target.value)}
                                  inputProps={{
                                    placeholder: "Prénom",
                                    endAdornment: (
                                      <InputAdornment>
                                        <i class="fas fa-user"></i>
                                      </InputAdornment>
                                    ),
                                  }}
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <h5>
                                  Genre :{" "}
                                  <FormControl component="fieldset">
                                    <RadioGroup
                                      row
                                      value={genre}
                                      onChange={(event) =>
                                        handleRadioChange(event)
                                      }
                                      aria-label="gender"
                                      name="gender1"
                                    >
                                      <FormControlLabel
                                        value="Femme"
                                        control={
                                          <Radio className={classes.root} />
                                        }
                                        label="Femme"
                                      />
                                      <FormControlLabel
                                        value="Homme"
                                        control={
                                          <Radio className={classes.root} />
                                        }
                                        label="Homme"
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </h5>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                  id="editmetier"
                                  value={metier}
                                  onChange={(e) => setMetier(e.target.value)}
                                  inputProps={{
                                    placeholder: "Post occupé actuellement ",
                                    endAdornment: (
                                      <InputAdornment>
                                         <i class="fas fa-briefcase"></i>
                                      </InputAdornment>
                                    ),
                                  }}
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                  id="editadresse"
                                  value={adresse}
                                  onChange={(e) => setAdresse(e.target.value)}
                                  inputProps={{
                                    placeholder: "Adresse",
                                    endAdornment: (
                                      <InputAdornment>
                                        <i class="fas fa-map-marker-alt"></i>
                                      </InputAdornment>
                                    ),
                                  }}
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <h5>
                                  Etat matrimonial :
                                  <TextField
                                    labelId="label"
                                    select
                                    value={
                                      etatMatri != null
                                        ? etatMatri
                                        : "Sélectionnez"
                                    }
                                    style={{ width: "60%" }}
                                    onChange={(e) => {
                                      setEtatMatri(e.target.value);
                                      console.log(etatMatri);
                                    }}
                                    id="select"
                                  >
                                    <MenuItem value="Sélectionnez"  selected disabled>
                                      Sélectionnez
                                    </MenuItem>
                                    <MenuItem value="Célibataire" >
                                      Célibataire
                                    </MenuItem>
                                    <MenuItem value="Marié(e)">Marié(e)</MenuItem>
                                    <MenuItem value="Divorcé(e)">
                                      Divorcé(e)
                                    </MenuItem>
                                    <MenuItem value="Veuf/veuve">
                                      Veuf/veuve
                                    </MenuItem>
                                  </TextField>
                                </h5>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                  id="edittel"
                                  value={tel}
                                  onChange={(e) => setTel(e.target.value)}
                                  inputProps={{
                                    placeholder: " N° Téléphone",
                                    type: "number",
                                    endAdornment: (
                                      <InputAdornment>
                                        <i class="fas fa-phone"></i>
                                      </InputAdornment>
                                    ),
                                  }}
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={12}>
                                <h5>
                                  {" "}
                                  Date de naissance :{" "}
                                  <TextField
                                  onKeyDown={(e)=>e.preventDefault()}
                                    type="date"
                                    InputProps={{
                                      inputProps: {
                                        min: "1930-12-31",
                                        max: "2004-12-31"
                                      }
                                    }}
                                    InputLabelProps={{
                                      shrink: true
                                    }}
                                    id="editbirthday"
                                    defaultValue={birthday}
                                    style={{ width: "60%" }}
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                  />
                                  <br></br><span id="validdate" style={{color:"red"}}></span>
                                </h5>
                              </GridItem>
                              <Button justIcon onClick={closeForm}>
                                <Close></Close>
                              </Button>
                              <Button color="primary" onClick={handleEdit}>
                                <Edit></Edit>Modifier
                              </Button>
                            </form>
                          </div>
                          <span id="displayeduser">
                            <h4 className={classes.title}>
                              <span id="nom">{user.nom}</span>{" "}
                              <span id="prenom">{user.prenom}</span>
                            </h4>
                            <h6>
                              <i
                                class="fas fa-envelope"
                                style={{ color: "purple" }}
                              ></i>
                              &nbsp;{user.email}
                            </h6>
                            <h6>
                              {user.genre != "" && user.genre != null ? (
                                <h6 id="genre">
                                  <i
                                    class="fas fa-venus-mars"
                                    style={{ color: "purple" }}
                                  ></i>
                                  &nbsp;{user.genre} , {" "}
                                  {user.etat_matrimonial != "" && user.etat_matrimonial != null ? (
                                    user.etat_matrimonial
                                  ) : null} 
                                  <h6>
                            </h6>
                                </h6>
                              ) : null}
                            </h6>
                            <h6>
                              {user.metier != "" && user.metier != null ? (
                                <h6 id="metier1">
                                <i class="fas fa-briefcase"
                                    style={{ color: "purple"}}
                                  ></i>
                                  &nbsp;{user.metier}
                                </h6>
                              ) : null}
                            </h6>
                            {user.date_naissance != "" &&
                            user.date_naissance != null   &&
                            user.date_naissance !="0001-01-01T00:00:00" ?(
                              <h6 id="birthday">
                                <i
                                  class="fas fa-birthday-cake"
                                  style={{ color: "purple" }}
                                ></i>
                                &nbsp;{new Date(user.date_naissance).toLocaleString('fr-FR').slice(0,10)}
                              </h6>
                            ) : null}
                            {user.adresse != "" && user.adresse != null ? (
                              <h6 id="adresse">
                                <i
                                  class="fas fa-map-marker-alt"
                                  style={{ color: "purple" }}
                                ></i>
                                &nbsp;{user.adresse}
                              </h6>
                            ) : null}
                            {user.phoneNumber != "" &&
                            user.phoneNumber != null ? (
                              <h6 id="tel">
                                <i
                                  class="fas fa-phone"
                                  style={{ color: "purple" }}
                                ></i>
                                &nbsp;{user.phoneNumber}
                              </h6>
                            ) : null}
                          </span>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          style={{ marginTop: "35px" }}
         >
          <Alert
            onClose={handleClose}
            variant="filled"
            style={{ backgroundColor: "grey", color: "white",marginTop:"20px" }}
          >
            Vos informations ont été mises à jours <br></br> avec succès  !
          </Alert>
         </Snackbar>
              {/******************************/}
         <Grid container direction="row" justify="center">
          <GridItem xs={12} sm={12} md={8} >
             <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row",alignItems:"center" }}>
                <h3 style={{ marginLeft: "0%" }}>
                  <i class="fas fa-language" style={{ color: "purple" }}></i>{" "}
                  <strong> Langues maitrisées</strong>
                </h3>
                <div style={{float: "right"}}>
                  <i
                    class="fas fa-plus"
                    title="ajouter une langue"
                    style={{ fontSize: "17px", color: "purple" }}
                    onClick={ajouterLang}
                  ></i>
                </div>
           </div>           
            
              {display.length === 0 && (
                <Langue
                  tab={languages}
                  cle={"lang"+100}
                  update={display}
                  setDisplay={setDisplay}
                />
              )}
              {languages}
              <DisplayLangue tableau={display} setDisplay={setDisplay} />
  
             {/********************* Expériences ***************/}
  
             <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row",alignItems:"center" }}>
                <h3 style={{ marginLeft: "0%" }}>
                  <i class="fas fa-briefcase" style={{ color: "purple" }}></i>{" "}
                  <strong>Exprériences professionnelles</strong>
                </h3>
                <div
                  style={{
                    float: "right"}} >
                  <i
                    class="fas fa-plus"
                    style={{ fontSize: "17px", color: "purple" }}
                    onClick={ajouterExp}
                  ></i>
                </div>
              </div>
              {displayexp.length === 0 && (
                <Experience
                  cle={"exp"+1000}
                  setDisplayExp={setDisplayExp}
                  displayexp={displayexp}
                />
              )}
              {exps}
              <DisplayExp displayexp={displayexp} setDisplayExp={setDisplayExp} />
  
              {/********************* Etudes ******************/}
  
              <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row",alignItems:"center" }}>
                <h3 style={{ marginLeft: "0%" }}>
                  <i
                    class="fas fa-graduation-cap"
                    style={{ color: "purple" }}
                  ></i>{" "}
                  <strong> Études</strong>
                </h3>
                <div style={{float: "right"}}>
                  <i
                    class="fas fa-plus"
                    style={{ fontSize: "17px", color: "purple" }}
                    onClick={ajouterEtude}
                  ></i>
                </div>
              </div>
              {displayetude.length === 0 && (
                <Formation
                  cle={"form"+1440}
                  setDisplayEtude={setDisplayEtude}
                  displayetude={displayetude}
                />
              )}
              {etudes}
              <DisplayEtude
                displayetude={displayetude}
                setDisplayEtude={setDisplayEtude}
              />
  
              {/********************* Compétences ******************/}
  
              <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row",alignItems:"center" }}>
                <h3 style={{ marginLeft: "0%" }}>
                  <i class="fas fa-clipboard" style={{ color: "purple" }}></i>{" "}
                  <strong>Compétences</strong>
                </h3>
                <div
                  style={{float: "right"}}>
                  <i
                    class="fas fa-plus"
                    style={{
                      fontSize: "17px",
                      color: "purple",
                    }}
                    onClick={ajouterCompt}
                  ></i>
                </div>
              </div>
              {displaycomp.length === 0 && (
                <Compétence
                  cle={"compt"+1004}
                  displaycomp={displaycomp}
                  setDisplayComp={setDisplayComp}
                />
              )}
              {compt}
              <DisplayCompetence
                displaycomp={displaycomp}
                setDisplayComp={setDisplayComp}
              />
              {/********************* Hobbies ******************/}
              <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row",alignItems:"center" }}>
                <h3>
                  <i class="fas fa-gamepad" style={{ color: "purple" }}></i>{" "}
                  <strong> Passe-temps </strong>
                </h3>
                <div style={{float: "right"}}>
                  <i
                    class="fas fa-plus"
                    style={{
                      fontSize: "17px",
                      color: "purple",
                    }}
                    onClick={ajouterHobby}
                  ></i>
                </div>
              </div>
              {displayhobby.length === 0 && (
                <Hobbies
                  cle={"hobby"+111}
                  displayhobby={displayhobby}
                  setDisplayHobby={setDisplayHobby}
                />
              )}
              {hobbies}
              <DisplayHobby
                displayhobby={displayhobby}
                setDisplayHobby={setDisplayHobby}
              />
               {/********************* Linkedin ******************/}
  
              <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row",alignItems:"center" }}>
              <h3 >
                <i class="fab fa-linkedin" style={{ color: "purple" }}></i>{" "}
                <strong>Profil Linkedin</strong>
              </h3>
              </div>
              {displaylinkedin.length === 0 && (
                <Linkedin
                  linkeds={linkeds}
                  cle={"linked"+1}
                  displaylinkedin={displaylinkedin}
                  setDisplaylinkedin={setDisplaylinkedin}
                />
              )}
              {linkeds}
              <DisplayLinkedin
                displaylinkedin={displaylinkedin}
                setDisplaylinkedin={setDisplaylinkedin}
                linkeds={linkeds}
                setLinkeds={setLinkeds}
              />
              <br></br>
              <div className={classes.description}></div>
             </GridItem>
             <GridItem xs={12} sm={12} md={3}>
                <Grid
                  container
                  justify="flex-end"
                  alignItems="flex-end"
                  direction="column"
                >
              <GridItem>
                <Card>
                  <h4 style={{ textAlign: "center" }}>
                    <strong>Votre profil est complété à</strong>
                  </h4>
                  <div
                    style={{
                      margin: "5% 20%",
                      color: "purple",
                      fontWeight: "bold",
                     // fontSize: "20%",
                      textAlign: "center",
                    }}
                  >
                    <CircularProgressbar
                      value={bar}
                      text={`${bar}%`}
                      styles={buildStyles({
                        pathColor: "purple",
                        textColor: "purple",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                </Card>
                </GridItem>
                 <GridItem>
                 <Card
                  style={{
                  }}
                >
                  <h4 style={{ textAlign: "center", marginTop: "15px" }}>
                    {" "}
                    <strong>Importer votre CV</strong>
                  </h4>
                  <br></br>
                  <label style={{ marginLeft: "0%" }}>
                    <div
                      style={{
                        margin:" 0 10% 0 10%",
                        backgroundColor: "purple",
                        padding: "15px",
                        color: "white",
                        textAlign:"center"
                      }}
                    >
                      {" "}
                      Choisir un fichier en format PDF
                      <input
                        type="file"
                        onChange={filename}
                        id="cv"
                        style={{ display: "none" }}
                        accept="application/pdf"
                      ></input>
                    </div>
                  </label>
                  <br></br>
                  <span
                    style={{
                      color: "black",
                      textAlign: "center",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "90%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <p
                      id="pfile"
                      style={{
                        width: "40%",
                        marginLeft: "6%",
                        marginTop: "8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {nomfichier}
                    </p>
                    &nbsp;&nbsp;
                    <button
                      style={{
                        backgroundColor: `${coloretat}`,
                        padding: "7px",
                        color: "white",
                        width: "35px",
                        float: "right",
                        marginTop: "-35px",
                      }}
                      id="btnfff"
                      title="téléchager"
                      disabled={`${etat}`}
                    >
                      <i class="fas fa-upload" onClick={onFileUpload}></i>
                    </button>
                  </span>
                  {progress && (
                    <progress id="progbar" value={progress} max="100" />
                  )}
                  <span id="spanfile" hidden={hidebutton}>
                    <a href={getfilename} target="_blank">
                      <button
                        id="btnforfile"
                        style={{ border: "none", backgroundColor: "transparent" }}
                      >
                        <i class="fas fa-file-pdf"></i> {NomFichierFinal}
                      </button>
                    </a>
                    <i
                      class="far fa-trash-alt"
                      title="Supprimer"
                      style={{ float: "right", marginTop: "5px" }}
                      onClick={supprimerCV}
                    ></i>
                  </span>
                  <br/>
                </Card>
                  </GridItem>
                </Grid>
              </GridItem>
              </Grid>
           </div>
           {/*: <h3>Loading ...</h3>}*/}
        </div>
      </div>
      <Footer/>
      </React.Fragment>
      }
      </div>
    );
  /*}else{
    return(
    <h3>Une erreur est survenue !</h3>)
  }*/
}

export default ProfilePage;
