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
import validationSchema from "./Validations";
import { fetchRegister } from "../../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Context
import { useAuth } from '../../../Context/AuthContext';

function Signup() {
  
  const {login} = useAuth();

  const navigate =  useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },

    validationSchema,

    onSubmit: async (values, bag) => {
      //values : formdaki datalar , bag : formdaki yapacağımız işlemler.

      try {  //eğer problem yoksa 
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        });
        
        console.log(registerResponse);
        //login context i kullanalım.kullanıcı giriş yaparsa yada kayıt olursa default u false olan loggedIn i true yapalım ve yine context den gelen user ile data.user bilgisini verelim .Sonrasında Navbar a login ile true yaptığımız loggedIn i gönderelim.
        login(registerResponse);
        
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
            <Heading>Sign Up</Heading>
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
              <FormControl>
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                ></Input>
              </FormControl>
              <Button mt={4} width={"full"} type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;
