import axios from 'axios';

//function verfi ()
const authAxios =  axios.create({
  baseURL: 'https://localhost:44392/api/',
    headers:{
      Authorization : `Bearer ${ localStorage.getItem ('access_token')}`
    }
  });
  
export default  authAxios;