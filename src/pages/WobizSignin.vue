<template>
    <div class="container-fluid vh-100">
        <div class="row h-100">
            <!-- left side -->
            <div class="col-12 col-md-6 col-lg-4 p-0">
                <div class="signin">
                    <a href="#"><img src="@/assets/logo.svg" alt="Wobiz" class="signin__logo"></a>

                    <form @submit.prevent="login()" class="signin__form">
                        <h2 class="mt-5 mb-4 font-weigh">Ingresa a tu cuenta</h2>

                        <div v-if="formValidation" class="alert alert-danger mt-3" role="alert">Tu email o contraseña son incorrectos. Revísalos y vuelve a intentar.</div>

                        <FormInput ref="username" type="text"  placeholder="Ej: usuario@mail.com" label="Email" v-model:inputValue="username">
                            <template #errorMsg1>Necesitamos tu email.</template>
                            <template #errorMsg2>El email ingresado no es correcto.</template>
                        </FormInput>

                        <FormInput ref="password" type="password"  placeholder="Escribe tu contraseña" label="Contraseña" v-model:inputValue="password" >
                            <template #errorMsg1>Necesitamos tu contraseña.</template>
                            <template #errorMsg2>La contraseña no tiene un formato válido.</template>
                        </FormInput>

                        <div class="d-flex flex-column signin__form--footer mt-2">
                            <a href="#">¿Olvidaste tu contraseña?</a>
                            <button type="submit" class="btn btn-primary mt-3">Ingresar a mi cuenta</button>
                        </div>
                    </form>

                </div>
            </div>
            <!-- end left side -->

            <!-- right side -->
            <div class="col-lg-8 col-md-6 d-none d-md-flex justify-content-end bg-signin">
                <div class="mt-5 me-5 d-none d-lg-block createbox">
                <span class="text-white me-2">¿No tienes una cuenta en Wobiz?</span> <a href="#" class="btn btn-outline-light">Crea tu cuenta</a>
                </div>
            </div>
            <!-- end right side -->
        </div>
    </div>
</template>

<script>
import axios from "axios";
import FormInput from '@/components/FormInputs'

export default {
  name: 'WobizSignin',
  components: { FormInput },
  data() {
    return {
      titlePage: 'Ingresa a tu cuenta - Wobiz',
      username: '',
      password: '',
      formValidation: false
    }
  },
  mounted() {
    document.title = this.titlePage
  },
  methods: {
    login(){
      const auth = { 
        username: this.username, 
        password: this.password 
      };
      const url = 'admin.localwobiz.com/login/';
      axios.post(url, auth)
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
          this.formValidation = true
        })
      
    }
  },
}
</script>

<style lang='scss' scoped>

  .signin{
    padding: 30px 50px;
    .signin__logo{
      width: 180px;
    }
  }

  .signin__form{
    h2{
      color: $wobiz-blue;
      font-size: 26px;
      font-weight: bold;
    }
    .signin__form--footer{
      a{
        color: $wobiz-textgray;
        font-size: 14px;
        text-decoration: underline;
        &:hover{
          color: $wobiz-textbase;
        }
      }
      button{
        font-size: 13px;
        height: 45px;
        font-weight: 700;
        background-color: $wobiz-lblue;
        border-color: $wobiz-lblue;
        &:hover{
          background-color: #106e88;
          border-color: #106e88;
        }
      }
    }
    
  }
  
  .createbox{
    span{
      font-size: 13px;
    }
    .btn--wobiz__transparent{
      border: 1px solid #e0e0e0;
      color: white;
      font-size: 13px;
      font-weight: bold;
      height: 35px;
      &:hover{
        color: $wobiz-gray;
      }
    }
  }

  .bg-signin{
    background-image: url("@/assets/index.png");
    background-position: center top;
    background-size: cover;
  }
</style>
