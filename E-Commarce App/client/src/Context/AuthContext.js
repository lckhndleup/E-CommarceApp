import {useState,useEffect,useContext, createContext} from 'react';
import { fetchMe ,fetchLogout} from '../api';


//kullanıcı kayıt olduğunda veya login işlemi gerçeklekştiğinde Componentlerimizi manipüle etmek için Context oluşturuyoruz.

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null); //user null olduğunda login değildir. 

    const [loggedIn,setLoggedIn] = useState(false);  //kulannıcı o an login mi değil mi tutan state


    useEffect(()=> {  //SAYFA YENİLENDİĞİNDE OTURUM AÇIK KALMASI.sayfa her yenilendiğinde , ( did mount oldugunda ) kullanıcının  oturumu kapatılmasını engellemek . bunun için fetchMe yi kullanıcaz.
        (async ()=> {
            try{
                const me = await fetchMe(); // fetchMe : api.js de yazdıgımız kullanıcının user, id ve email bilgilerini aldıgım endpointi verir.
                setLoggedIn(true);  //artık sayfa her yenilendiği zaman oturum kapanmasın loggedIn i true ya çekiyoruz.
                setUser(me);   //user in bilgilerine fetchMe den gelen bilgileri koyuyoruz. 
                console.log("me",me); 
            }catch(error){}
        })();
    },[])

    const login = (data) => { //kullanıcının giriş yapması.
        setLoggedIn(true)
        setUser(data.user);
        localStorage.setItem('access-token',data.accessToken);//giriş yapıldıktan sonra local storage dan access token alıcaz.oturumu açık tutmak için yapıyoruz.
        localStorage.setItem('refresh-token',data.refreshToken);
    }

    const logout = async (callback) => {  //çıkış işlemi için Profile da kullanmak üzere hazırlıyoruz.
        setLoggedIn(false);
        setUser(null);

        await fetchLogout(); //apiden gelen veri.

        localStorage.removeItem('access-token'); //access ve refresh token ı localstorage dan  kaldırıyoruz.
        localStorage.removeItem('refresh-token');

        callback() ; //oturum kapandıgında sayfa yönlendirmesi yapmak için yazdık.bu callback fonksiyonu oturum kapandıktan sonra , database den access ve refresh token lar silindikten sonra çalışacak ve sayfa yönlendirmesi yapıcaz . bunu da Profile sayfasında logout da kullanmak için yaptık.
    }

    const values = {
        loggedIn,
        user,
        login,
        logout,
    }

    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext); 

export {
    AuthProvider,useAuth
}