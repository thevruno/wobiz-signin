<template>

    <div class="mb-3 signin__form--input">
        <label class="form-label">{{ label }}</label>
        <input 
        class="form-control"
        :required="required" 
        :type="type"
        :placeholder="placeholder"
        @formValidation="$emit.testForm"
        @input="$emit('update:inputValue', $event.target.value)">

            <div v-if="!isValidated" class="alert alert-danger mt-3" role="alert"><slot name="errorMsg1"/></div>
            <div v-if="!isValidated2" class="alert alert-danger mt-3" role="alert"><slot name="errorMsg2"/></div>

    </div>

</template>

<script>

export default {
    name: 'FormInputs',
    props: {
        type: {
            String,
            default: 'text'
        },
        required: {
            Boolean,
            default: false
        },
        label: {
            String,
            require: true
        },
        placeholder: String,
        inputValue: String
    },
    data(){
        return {
            isValidated: true,
            isValidated2: true
        }
    },
    watch: {
        inputValue(value){
            if(this.type === 'text') {
                this.emailValidation(value)
            }
            if(this.type == 'password') {
                this.passwordValidation(value)                
            }
        },
    },
    methods: {
        emailValidation(data){
            //expresion regular para comprobar si es un email valido
            const reg = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

            reg.test(this.inputValue) ? this.isValidated2 = true : this.isValidated2 = false

            if(data.length === 0){
                this.isValidated = false
                this.isValidated2 = true
            } else 
                this.isValidated = true
        },
        passwordValidation(data){

            this.inputValue.length >= 6 ? this.isValidated2 = true : this.isValidated2 = false

            if(data.length === 0){
                this.isValidated = false
                this.isValidated2 = true
            } else 
                this.isValidated = true
        }
    }
}
</script>

<style lang="scss" scoped>

    .signin__form--input{
        label{
            font-size: 13px;
            color: $wobiz-gray;
            font-weight: 500;
        }

        input{
            font-size: 16px;
            height: 49.75px;
        }
    }
</style>