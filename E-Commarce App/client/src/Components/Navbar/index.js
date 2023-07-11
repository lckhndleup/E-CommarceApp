import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../Context/AuthContext"; //kullanıcı giriş yaptıktan sonra signup ve sign in butonuna kaldırcaz.
import { useBasket } from "../../Context/BasketContext"; //sepet işlemleri

function Navbar() {
  const { loggedIn,user } = useAuth(); //kullanıcı giriş yaparsa yada kayıt olursa default u false olan loggedIn i SignUp componentinde login ile true yapıp sonrasında buraya geliyoruz.

  const {items} = useBasket();

  console.log("giriş yapıldı mı? ",loggedIn);
  console.log("kullanıcı ",user);
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <NavLink to="/"><h1>E-Commarce</h1></NavLink>
          </div>

          <ul className={styles.menu}>
            <li>
              <NavLink to="/">Products</NavLink>
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          {
            !loggedIn &&( // eğer kullanıcı giriş yapmamışsa , yani loggedIn false ise butonları gösterelim.
              <React.Fragment>
                <NavLink to="/signin">
                  <Button colorScheme="pink">Sign in</Button>
                </NavLink>

                <NavLink to="/signup">
                  <Button colorScheme="red">Sign Up</Button>
                </NavLink>
              </React.Fragment>
            )
          }
          
          {/* useBasketten gelen item da 1 veya daha fazla ürün varsa o ürüne götürmek istiyoruz Navlink ile */}
          {
            loggedIn && (
              <React.Fragment>
                {
                  items.length > 0 && (
                    <NavLink to='/basket'>
                        <Button colorScheme="pink" variant={"outline"}>Basket ({items.length}) </Button>
                    </NavLink>
                  )
                }


                {/*admin giriş yaptıysa navbarda buton ile gösterelim.kullanıcı loggedin oldugu durumda user varsa ve role ü admin ise bunu gösterecezğiz. role ü saedece admin olanda bu işlemi yapıcaz*/}
                {
                  user?.role === 'admin' && (
                    <NavLink to='/admin'>  {/*admin page e yönlenecek*/}
                      <Button colorScheme="pink" variant='ghost'>Admin</Button> {/*variant ghost : arka planı almayacak şekilde*/}
                    </NavLink>
                  )
                }
                {/* kullanıcı loggedin olduysa profil butonu */}

                  <NavLink to='/profile'>
                  <Button colorScheme="blue">Profile </Button>
                </NavLink>
              </React.Fragment>
            )
          }
          

        </div>
      </nav>
    </div>
  );
}

export default Navbar;
