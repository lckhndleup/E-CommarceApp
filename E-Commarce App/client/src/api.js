import axios from "axios";

//--------------------------------------------------------------------------------------------------------------------
//tek tek autharization için access token vermek yerine bu yöntemi yazıyoruz. Kullanıcı oturumu açık tutmak için yazdık. sayfa her yenilendiği zaman oturumu açık tutmada kullanıyoruz.   
axios.interceptors.request.use(function (config) {
    const {origin} = new URL(config.url);
    const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT];
    const token = localStorage.getItem('access-token');

    if (allowedOrigins.includes(origin)){
        config.headers.authorization = token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//----------------------------------------------------------------------------------------------------------------------- 

//veriyi axios ile çekip Products a fonksiyon olarak atıcaz.
export const fetchProductList = async ({ pageParam = 0 }) => {  //infinite query yapmak için buraya parametre olarak pageParam=0 verdik.
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`); // sayfaya bir buton koyarak 12 şer olarak tıklanıldığında veri getirecek eğer veri yok ise de bunu belirtecek. ?page=${pageParam} ifadesini url e ekleyip InfıniteQuery de kullancak.

    return data ;
}


//ProductDetail'a useParams kullanarak product_id bilgisini alıyoruz ve gelen product_id ye göre burada  veriyi url adresine göre çekmek istiyoruz.
export const fetchProduct = async (product_id) => {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`);

    return data;
}



//Sıgn Up işlemi 
export const fetchRegister = async (input)=>{
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,input);

    return data;
}


//sayfa yenilendiğinde oturumun açık kalması için .kullanıcının user, id ve email bilgilerini almak için . 
export const fetchMe = async () => {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`);
    return data;
}

//endpoint api

//oturum kapatma işlemi . bunu Contextimizde kullanıp , Profile sayfasındaki butona tıklanılma durumunda çıkış yapmak için kullancaz.

export const fetchLogout = async () => {
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,{
        refresh_token:localStorage.getItem('refresh-token')}
        
    );

    return data;
}


//Sign In işlemi

export const fetchLogin = async (input) => {
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`,input);
    return data;
}



//sipariş için adres gönderme

export const postOrder = async (input) => {
	const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_ENDPOINT}/order`,
		input
	);
	return data;
};





export const fetchOrders = async () => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_BASE_ENDPOINT}/order`
	);
	return data;
};




