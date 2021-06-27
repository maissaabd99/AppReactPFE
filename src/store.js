import { createStore } from "redux"
import rootReducer from './reducers'
export default (initialState )=>{
    return createStore (rootReducer,initialState)
}
/**
 * 
 *  //get user languages
  const [display, setDisplay] = useState([]);
  function getAllLanguages() {
    authAxios
      .get("Candidats/getLanguages/" + localStorage.getItem("iduser"), {
        method: "GET",
      })
      .then(
        (res) => {
          setDisplay(display.concat(res.data.languages));
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //get user experiences
  const [displayexp, setDisplayExp] = useState([]);
  function getAllExperiences() {
    authAxios
      .get("Candidats/getExperiences/" + localStorage.getItem("iduser"), {
        method: "GET",
      })
      .then(
        (res) => {
          setDisplayExp(displayexp.concat(res.data.exps));
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //get user competences
  const [displaycomp, setDisplayComp] = useState([]);
  function getAllCompetences() {
    authAxios
      .get("Competence/getAllCompetences/" + localStorage.getItem("iduser"), {
        method: "GET",
      })
      .then(
        (res) => {
          setDisplayComp(displaycomp.concat(res.data.comps));
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //get user Hobbies
  const [displayhobby, setDisplayHobby] = useState([]);
  function getAllHobbies() {
    authAxios
      .get("Hobby/getAllHobbies/" + localStorage.getItem("iduser"), {
        method: "GET",
      })
      .then(
        (res) => {
          //console.log(res.data.hobbies)
          setDisplayHobby(displayhobby.concat(res.data.hobbies));
        },
        (error) => {
          console.log(error);
        }
      );
  }
  //get user etudes
  const [displayetude, setDisplayEtude] = useState([]);
  function getAllFormations() {
    authAxios
      .get("Formations/getAllFormations/" + localStorage.getItem("iduser"), {
        method: "GET",
      })
      .then(
        (res) => {
          setDisplayEtude(displayetude.concat(res.data.formations));
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //get user linkedin profile
  const [displaylinkedin, setDisplaylinkedin] = useState([]);
  function getLinkedin() {
    authAxios
      .get("Linkedin/getLinkedin/" + localStorage.getItem("iduser"), {
        method: "GET",
      })
      .then(
        (res) => {
          console.log(res.data.linkedin);
          if(res.data.linkedin!=null){
            setDisplaylinkedin(displaylinkedin.concat(res.data.linkedin));
          }
          // progression()
        },
        (error) => {
          console.log(error);
        }
      );
  }
 */