import { useState,createContext,useContext,useEffect } from "react";


const BasketContext = createContext();


//LOCAL STORAGE START
const defaultBasket =JSON.parse(localStorage.getItem('basket')) || [] ; //sayda yenilendikten sonra ürünleri sayfada tutmak için.localstorage da basket isminde bir arrray varsa onu kullansın. yoksa boş olrak bir array tanımlansın.localstorage a stringfy olarak gideceği için bizim JSON:parse etmemiz lazım . 

//LOCAL STORAGE END

const BasketProvider = ({children}) => {
    const [items, setItems] = useState(defaultBasket); //ürünü ifade etmek için. items a defaultBasket array ini verdik.localstorage da basket array i oluşturulmuşsa yani ürün varsa sayfa yenilendiğinde o ürünleri basket arrayinde tutar yoksa da  boş array zaten.


    //LOCALSTORAGE START
    //

    useEffect(() => {
        localStorage.setItem('basket',JSON.stringify(items)); 
    },[items]) ;//items her değiştiğinde localstorage güncellenecek.items ı strinfgy ederek ls a yazacak.
        
    //LOCALSTORAGE END


    const addToBasket = (data,findBasketItem) => {  //sepete ürün eklemek :
        //burası sepette yoksa sepete ekleyelim
        if(!findBasketItem){
            return setItems((items) => [data, ...items])
        } 
        //-------------------------------
        //eğer sepette  aynı üründen  varsa çıkartır.
        const filtered = items.filter((item) => item._id !== findBasketItem._id);//bu işlem ne yapıyor ? items içerisinde filter ile dolaşıyoruz.her bir eleman item oluyor dolaşımda . her bir item ın  _id değeri ile , kaldırmak istediğimiz _id  değeri uyuşursa o hariç diğer tüm itemleri aldırır. ve diğer tüm _id leri diziye ekler. yani tüm itemlerden çıkartmak istediğimiz id hariç hepsini almış olur. ve yeni bir dizi döner.
        //-------------------------------

        setItems(filtered);
    };

    //-------------------------------------------------------------------------

    //sepet detay sayfasında ürün kaldırmak için:

    const removeFromBasket = (item_id) => {
        const filtered = items.filter((item) => item._id !== item_id); //bu işlem ne yapıyor ? items içerisinde filter ile dolaşıyoruz.her bir eleman item oluyor dolaşımda . her bir item ın  _id değeri ile , kaldırmak istediğimiz _id  değeri uyuşursa o hariç diğer tüm itemleri aldırır. ve diğer tüm _id leri diziye ekler. yani tüm itemlerden çıkartmak istediğimiz id hariç hepsini almış olur. ve yeni bir dizi döner.
        setItems(filtered); //burada dönen yeni diziyi set leyerek items i güncelleriz.

        //tekrar bu fonksiyonu özetliyoruz --> "item_id" bir parametre olarak bu fonksiyona gelir. bu parametre olarak verilen item_id ye sahip item hariç tüm itemleri setleyerek yeni bir item listesine atar . yani o ürün çıkartılmış olur.
    }
    



    //sipariş işlemi tamamlandıktan sonra sepeti boşaltmamız gerekiyor .bunu Basket a gönderelim.
    const emptyBasket = () => setItems([]);



    const values = {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
        emptyBasket,
    };

    return <BasketContext.Provider value={values}>
        {children}
    </BasketContext.Provider>
}

const useBasket = () => useContext(BasketContext);
export {
    BasketProvider,
    useBasket,
    
}