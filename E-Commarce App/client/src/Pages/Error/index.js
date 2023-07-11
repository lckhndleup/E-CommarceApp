import React from "react";

//yönlendirme yapmak için
import { NavLink } from "react-router-dom";

//chakra ui
import {
  Box,
  Button,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Alert,
} from "@chakra-ui/react";

function Error404() {
  return (
    <div>
      <Box p={5}>
        <Alert status="error">  {/* Alert kullanarak şekil şukul yapak*/}
          <AlertIcon />
          <AlertTitle>Böyle bir sayfa bulunmuyor</AlertTitle>
          <AlertDescription>
            Lütfen girilen bağlantıyı kontrol ediniz
          </AlertDescription>
        </Alert>
        <NavLink to={"/"}> {/* anasayfaya yönlendirecek*/}
          
          <Button mt={5} colorScheme="twitter">
            Anasayfaya dön
          </Button>
        </NavLink>
      </Box>
    </div>
  );
}

export default Error404;
