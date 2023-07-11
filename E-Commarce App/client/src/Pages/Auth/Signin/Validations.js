import * as yup from 'yup';


const validations = yup.object().shape({
    email: yup.string().email("geçerli bir mail giriniz").required("zorunlu alan"),
    password : yup.string().required('zorunlu alan'),

});

export default validations;