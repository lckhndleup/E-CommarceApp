import React from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validations from "./Validations";
import { fetchLogin } from "../../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Context
import { useAuth } from '../../../Context/AuthContext';

function Signin() {
  
  const {login} = useAuth();

  const navigate =  useNavigate(); //sayfa yönlendirmesi için oluşturduk.
  const [successMessage, setSuccessMessage] = useState(""); //alert message için .

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validations,

    onSubmit: async (values, bag) => {
      //values : formdaki datalar , bag : formdaki yapacağımız işlemler.

      try {  //eğer problem yoksa 
        const loginResponse = await fetchLogin({ //fetchLogin api den geldi.
          email: values.email,
          password: values.password,
        });
        
        console.log(loginResponse); 
        //login context i kullanalım.kullanıcı giriş yaparsa yada kayıt olursa default u false olan loggedIn i true yapalım ve yine context den gelen user ile data.user bilgisini verelim .Sonrasında Navbar a login ile true yaptığımız loggedIn i gönderelim.
        login(loginResponse); //login (contexten gelen) içine bir data alır ve user içine data.user , setLoggeeIn i true yapar.localstorage da access ve refresh tokenları set ler.
        
        navigate("/"); //kullanıcı kayıt olduktan sonra anasayfaya yönlensin istedik.
        console.log(login);

        setSuccessMessage("başarıyla kaydedildi...");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message }); // bir hata gerçekleşiyorsa custom bir hata atayalım.
      }
    },
  });
  return (
    <div>
      <Flex align={"center"} width={"full"} justifyContent={"center"}>
        <Box pt={10}>
          <Box textAlign={"center"}>
            <Heading>Sign In</Heading>
          </Box>

          <Box my={5}>
            {successMessage && (
              <Alert status="success">
                <AlertIcon />
                {successMessage}
              </Alert>
            )}
          </Box>

          {/* hata oluştuğunda ekrana gösterme */}
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign={"left"}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-Mail</FormLabel>
                <Input
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                >
                  {/*alanda hata varsa çerçeveyi kırmızı yapar*/}
                </Input>
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                ></Input>
              </FormControl>
             
              <Button mt={4} width={"full"} type="submit">
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signin;
