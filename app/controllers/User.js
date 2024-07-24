const Yup = require("yup");

 function createValidationSchema(){
    return Yup.object().shape({
        nome: Yup.string().max(30).min(3).required('Por favor, digite o seu nome!'),
        email: Yup.string().email('Por favor, digite um e-mail válido!').required('Por favor digite seu e-mail'),
        senha: Yup.string()
            .min(8, 'A senha deve ter pelo menos 8 caracteres')
            .matches(/(?=.*\d.*\d)/, 'A senha deve conter pelo menos 2 números')
            .matches(/(?=.*[A-Z])/, 'A senha deve conter pelo menos uma letra maiúscula')
            .required('Senha obrigatória')
    });
}

module.exports = {createValidationSchema};