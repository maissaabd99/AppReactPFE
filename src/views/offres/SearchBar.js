/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Search, StarBorderOutlined } from '@material-ui/icons';
import { InputAdornment, Tab } from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import { Rating } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

const useStyles =makeStyles((theme) => ({
  root:{
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
   backgroundColor:"white",
   borderRadius:30,
   '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
    },
      '&:hover fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: 'none',
      },  
  }}
 
}));
const labels = {
  1: 'Useless',
  2: 'Useless+',
  3: 'Poor',
  4: 'Poor+',
  5: 'Excellent',
 
};
export default function SearchBar(props) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const aux= props.offres
  const aux2= props.currentOffres

    const classes = useStyles();
    const[result ,setResult] = useState([])
    const[searched,setSearched] = useState([])
    const[tab,setTab] = useState([]);

    function updateSearched(value){
    //  console.log("aux 2 from search",aux2)
       props.getAllOffres();
       console.log(value)
       setSearched(value);
       tab.splice(0,tab.length)
       props.setHidden("none")
       if(value.length===0){
         props.setHidden("none")
        // props.getAllOffres();
        // props.setCurrentOffres(aux2)
       }
    }

    function search(){
     // props.setCurrentOffres(props.offres)
      if(searched.length!==0){
     //   props.getAllOffres();
        console.log("aux from search :",aux)
        console.log("searched from search :",searched)
      
       // setTab(tab)
        console.log("tab",tab)
        aux.map((item,index)=>{
           searched.map((s,i)=>{
            if((item.titre.toUpperCase().includes(s.toUpperCase()) )
            || (item.lieu_travail.toUpperCase().includes(s.toUpperCase()))
            || (item.description.toUpperCase().includes(s.toUpperCase()))){
              console.log(item.id)
              console.log(exist(item.id))
            if(exist(item.id)===false){
              if((new Date(item.date_expiration)-new Date())/(1000*3600*24) > 0){
                tab.push(item)
                setTab(tab);
              }  
            }else{
              setTab(tab);
            }
            console.log("tab result ",tab) 
          }
           });
        });     
          props.setOffres(tab)
          console.log("aux after search : ",aux)
          props.setHidden("block")
          props.setNombre(tab.length);
      }
    
    }
 const exist =  function  offreexist(id)
      {
        for (var i = 0; i < tab.length; i++) {
          if(tab[i].id===id){
            return true
          }
        }    
        return false
      }
      const { item, applyValue } = props;
  useEffect(() => {
    const close = document.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];
    // Add a Click Event Listener to the button
    close.addEventListener("click", () => {
     // props.getAllOffres();
    });
  }, [])
     /* const options = top100Films.map((option) => {
        const firstLetter = option[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });*/
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row"}} >
    <Autocomplete  value={searched} onChange={(event,newValue) => {updateSearched(newValue);}} id="auto"
      multiple
      limitTags={2}
       /* inputValue={textfield}
        onInputChange={(event, newInputValue) => {
          setText(newInputValue);
        }}*/
      id="checkboxes-tags-demo"
      options={top100Films}
     // options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      //groupBy={(option) => option.firstLetter}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8,color:"purple"}}
            checked={selected}
          />
          {option}
        </React.Fragment>
      )}
      freeSolo
      renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
      style={{ width:800,borderRadius:"30px"}}
      renderInput={(params) => (
        <TextField {...params}
         classes={{root:classes.root}} 
         placeholder="Intitulé du poste ou mots clés"
         id="input" variant="outlined"  fullWidth   
         /> 
      )}
    />
    {"  "} <Button title="Rechercher" 
            round justIcon color="default" className={classes.icons} 
            style={{padding:"25px",marginLeft:"10px"}} onClick={search}>
            <Search/>
          </Button>
          <br></br>
           {/*<div className={classes.root}>
         <Rating color="primary"
        name="hover-feedback"
        emptyIcon={<StarBorderOutlined fontSize="inherit" />}
        value={value}
        precision={1} defaultValue={2} size="large"
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      </div>
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}*/}
    </div>

  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films =[
  'Informatique' ,
  'Développement',
   'Développeur',
   'Scrum master',
   'responsable RH',
  "Consultant",
   'Front-end',
   'Back-end',
  'Full Stack',
];
