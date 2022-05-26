<template>

    <div class="mb-3 signin__form--input">
        <label class="form-label">{{ label }}</label>
        <input :required="required" :type="type" class="form-control" :placeholder="placeholder" :value="inputValue" @input="$emit('update:inputValue', $event.target.value)">
        <div v-if="isValidated" class="alert alert-danger mt-3" role="alert"><slot name="errorMsg1"/></div>
        <div v-if="isValidated2" class="alert alert-danger mt-3" role="alert"><slot name="errorMsg2"/></div>
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
        placeholder: {
            String
        },
        label: {
            String,
            require: true
        },
        inputValue: {
            String
        },
    },
    data(){
        return {
            isValidated: false,
            isValidated2: false
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

        }
    },
    methods: {
        emailValidation(value){
            //expresion regular para comprobar si es un email valido
            const reg = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

            reg.test(this.inputValue) ? this.isValidated2 = false : this.isValidated2 = true

            if(value.length === 0){
                this.isValidated = true
                this.isValidated2 = false
            } else 
                this.isValidated = false
        },
        passwordValidation(value){
            this.inputValue.length >= 6 ? this.isValidated2 = false : this.isValidated2 = true

            if(value.length === 0){
                this.isValidated = true
                this.isValidated2 = false
            } else 
                this.isValidated = false
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