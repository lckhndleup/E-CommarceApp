import * as yup from 'yup';


const validations = yup.object().shape({
    email: yup.string().email("geçerli bir mail giriniz").required("zorunlu alan"),
    password : yup.string().min(5,'Parolanız en az 5 karakter olmalıdır').required('zorunlu alan'),
    passwordConfirm : yup.string().oneOf([yup.ref('password')],'Parolalar uyuşmuyor !').required("zorunlu alan"),
});

export default validations;