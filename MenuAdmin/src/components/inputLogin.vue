<template>
    <div class="body">
      <div class="main">
        <h1>
          Faça seu Login
        </h1>
        <div class="values">
            <q-input standout v-model="user" class="input" label="Usuário" hint="Digite seu usuário" :dense="dense" />
            <q-input standout v-model="password" class="input" label="Senha" hint="Digite sua senha" :dense="dense" />
          <button @click="EnterMenu">
            Continuar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default{
    data(){
        return{
            user: "",
            password: ""
        }
    },
    methods: {
        EnterMenu(){
            axios.post("http://localhost:8082/user", {
              user: this.user,
              password: this.password
            })
            .then((res) => {
              localStorage.setItem('token', res.data)
              this.$router.push({name: 'menu'})
            })
            .catch((err) => {
              console.log(err);
            })

        }
    }
  
  }
  </script>
  
  <style scoped>

  .body{
    width: 100%;
    display: flex;
    justify-content: center;
  }


  .main{
    background-color: rgb(255, 255, 255);
    width: 30%;
    padding: 100px 30px;
    border-radius: 10px;
    position: absolute;
  }
  
  h1{
    font-size: 35px;
    text-align: center;
    font-weight: bold;
    color: rgb(0, 0, 0);
  }
  
  .values{
    display: flex;
    flex-direction: column;
  }
  
  .input{
    width: 70%;
    margin: 30px auto;
  }
  
  button{
    width: 70%;
    margin: 30px auto;
    font-size: 20px;
    padding: 20px 0;
    border: none;
    background-color: rgb(0, 0, 0);
    color: white;
    border-radius: 5px;
  }



  @media (max-width: 999px) {

    .main{
        width: 100%;
        top: 10%;
    }

    .input{
        width: 90%;
    }

    button{
        width: 90%;
    }
  }
  </style>