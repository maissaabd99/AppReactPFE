import axios from 'axios';
import { now } from 'moment';
import { useState } from 'react';


var authAxios =  axios.create({
  baseURL: 'https://localhost:44392/api/',
    headers:{
      Authorization : `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  


var test = -1;
if(localStorage.getItem('access_token')!=null){
  let isRefreshing = false;
 let failedQueue = [];
       const processQueue = (error, token = null) => {
            failedQueue.forEach(prom => {
                if (error) {
                    prom.reject(error);
                } else {
                    prom.resolve(token);
                }
            });
            failedQueue = [];
        };
  authAxios.interceptors.response.use(
    response => {
      return response;
    },
    err => {
      const originalRequest = err.config;
      if (err.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              authAxios =  axios.create({
                baseURL: 'https://localhost:44392/api/',
                  headers:{
                    Authorization : `Bearer ${token}`
                  }
                });
              authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return authAxios(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(function (resolve, reject) {
          axios
            .post('https://localhost:44392/api/Authentication/refresh', {
              access_token: localStorage.getItem("access_token"),
              refresh_token: localStorage.getItem("refresh_token")
            })
            .then(({ data }) => {
              authAxios =  axios.create({
                baseURL: 'https://localhost:44392/api/',
                  headers:{
                    Authorization : `Bearer ${data.token}`
                  }
                });
              authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
           //   console.log(authAxios.defaults.headers.common['Authorization']);
              originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
              localStorage.setItem("access_token",data.token)
              localStorage.setItem("refresh_token",data.refreshToken)
              processQueue(null, data.token);
              resolve(authAxios(originalRequest));
            })
            .catch(err => {
              processQueue(err, null);
              reject(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      }
      authAxios =  axios.create({
        baseURL: 'https://localhost:44392/api/',
          headers:{
            Authorization : `Bearer ${localStorage.getItem('access_token')}`
          }
        });
      return Promise.reject(err);
    }
  );
  }
  export default authAxios;









 
  /*
  authAxios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                const originalReq = err.config;
                if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
                  {
                    originalReq._retry = true;

                    let res = fetch('https://localhost:44392/api/Authentication/refresh', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
                        },
                      /*  redirect: 'follow',
                        referrer: 'no-referrer',*/
                       /* body: JSON.stringify({
                            access_token: localStorage.getItem("access_token"),
                            refresh_token: localStorage.getItem("refresh_token")
                        }),
                    }).then(res => res.json()).then(res => {
                          localStorage.setItem("access_token",res.token)
                          localStorage.setItem("refresh_token",res.refreshToken)
                          //access_token = res.token;
                          console.log(res)
                          test=1;
                         // alert("msg from response :",res.access_token)
                          originalReq.headers['Authorization'] = `Bearer ${res.token}`;
                          authAxios.defaults.headers.common['Authorization'] = `Bearer ${res.token}`;

                          //originalReq.headers['Device'] = "device";
                        return authAxios(originalReq);
                    });
                   // window.location.href="/logout"
                    resolve(res);
                  }
                 return Promise.reject(err);
            });
        });*/

 /*  authAxios.interceptors.response.use((response) => {
   console.log("your token is still valid !!!!!!!!!!!")
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    console.log("you token has been exired !!!!!!!!!")
    var access_token = null;
    //alert("you token has been exired !!!!!!!!!")
    await authAxios.post("Authentication/refresh",{
          "access_token":localStorage.getItem('access_token'),
          "refresh_token" :localStorage.getItem('refresh_token')
        })
        .then((res) => {
          localStorage.setItem("access_token",res.data.token)
          localStorage.setItem("refresh_token",res.data.refreshToken)
          access_token = res.data.token;
          console.log(res.data)
          test=1;
            //alert("msg from response :",res.data.access_token)
      },
      (error) => {
        alert(error)
        console.log("msg from error :",error);
      });              
      console.log(localStorage.getItem('access_token'))
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      authAxios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      return authAxios(originalRequest);
  }
  return Promise.reject(error);
});
return test;
}
window.onstorage = event => {
  alert("localstorage has updated");
};
console.log(finaltoken)*/



/*
 if(localStorage.getItem('access_token')!=null){
   // console.log("check if token has expired : ",JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])))
   // console.log(JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])).exp < new Date()/1000 === true)
   /* if(JSON.parse(atob(localStorage.getItem('access_token').split('.')[1])).exp < new Date()/1000 === true){
      window.location.href="/logout"
    }
  }*/

/*finaltoken= localStorage.getItem ('access_token');
  var token = JSON.parse(atob(localStorage.getItem('access_token').split('.')[1]));
  if(token.exp <= new Date()/1000 === true){
   // Event.preventDefault();
    axios.post("https://localhost:44392/api/Authentication/refresh",{
          "access_token":localStorage.getItem('access_token'),
          "refresh_token" :localStorage.getItem('refresh_token')
        })
        .then((res) => {
          alert("msg from response :",res.data.msg)
          localStorage.setItem("access_token",res.data.token)
          localStorage.setItem("refresh_token",res.data.refreshToken)
          finaltoken = res.data.token;
          console.log(res.data)
          authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
        //  window.location.reload(true);
      },
      (error) => {
        alert(error)
        console.log("msg from error :",error);
      });              
  }*/