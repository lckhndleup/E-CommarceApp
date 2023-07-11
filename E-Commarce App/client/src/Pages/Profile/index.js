import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; //sayfa yönlendirmesi için

//Profile sayfası ve Logout butonuna basıldıgında oturumu kapatma işemleri için api.js de fetchLogout oluşturup . Authcontext de "logout" ile burada kuallanmak üzere hazırladık.burada çıkış için kullanıcaz.sonrasında çıkış yapıp sayfa yönlendirmesi yapıcaz.

function Profile() {
  const { user, logout } = useAuth(); //Context den gelen veriler.
  const navigate = useNavigate(); // history nesnesini almak için useHistory hook'unu kullanıyoruz

  const handleLogout = async () => {
    //butona click oldugunda çalışacak fonk.
    logout(() => {
      navigate("/"); //oturum kapandıgında sayfa yönlendirmei yapıyoruz. bunun için AuthContext de bir callback oluşturduk.oturum kapandıgında anasayfaya yönleniyor.
    });
  };

  console.log("Profile User:", user);

  return (
    <div>
      <Heading as="h2" color={'red.300'} >Profile</Heading>

      <Heading as="h3" size="md">E-mail: {user.email}</Heading>
      
      <p>Role: {user.role}</p>
      <p>ID: {user._id}</p>
      <Button onClick={handleLogout} colorScheme="pink" variant="solid">
        Logout
      </Button>
    </div>
  );
}

export default Profile;
