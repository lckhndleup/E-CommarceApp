import React from 'react';
import { useQuery } from 'react-query';  //state yönetimi için .
import { useParams } from 'react-router-dom'; //id  bilgisini almak için kullancaz
import {  fetchProduct } from '../../api';  //veri çekerken bu fonskiyona gider ve product_id yi bu fonksiyona gönderir.
import {Box,Text,Button} from "@chakra-ui/react";  
import moment from 'moment';  //date kütüphanesi
import ImageGallery from 'react-image-gallery';  //ürün detaylarında ürünün kaydırmalı carousel şeklinde kullanmak için image gallery kütüphanesi.
import { useBasket } from '../../Context/BasketContext';//sepete ürün atma


function ProductDetail() {
    //------------------------------------------------------------------------
    const {addToBasket,items} = useBasket(); //septe ürün atma için.
    //------------------------------------------------------------------------

    const {product_id} = useParams();  // product_id bilgisini almak için useParams()

    const {isLoading,isError,data} = useQuery(['product', product_id],() => fetchProduct(product_id));  //veri çekme işlemi.

    

    if (isLoading) return <div>Loading...</div>   //veri yükleme esnasında loading yazdırma.

    if(isError) return "Bir hata oluştu:" + isError.message;  //veride hata oluşursa . 

    console.log(data);  //datayı yazdırma


    const images = data.photos.map((url,key) => ({  // bunu neden yaptık hazır veri gelirken buna ne gerek vardı: image gallery kütüphanesi 
        //bizden bir obje şeklinde images dönmemizi ve bunu item={images} şeklinde vermemizi istiyor. bizde mapledik gelen photos verisini.

        original : url

    }));



    const findBasketItem = items.find((item) => item._id === product_id)//sepete ürünü eklendiğinde o üründen varmı yokmu kontrol etsin istiyoruz.bunu altta ekleme yaptıgımız yerde kullancaz.



    return (
        <div>
            
            <Button colorScheme={findBasketItem ? 'pink' : 'green'} onClick={() => addToBasket(data,findBasketItem)}> {/* butonun rengini ürün sepette olma durumuna göre değiştircez*/}
                {/* üründen eklendiyse remove gelecek yoksa add to cart olarak yazsın buton üstünde*/}

                {
                    findBasketItem ? 'Remove from Cart' : 'Add To Cart'
                }

            </Button> {/* sepete ürün ekleme , data backend den çektiğimiz veri*/}
            

            <Text as='h2' fontSize='2xl'>{data.title}</Text>


            <Text>{moment(data.createdAt).format('DD/MM/YY')}</Text>

            <p>
                {data.description}
            </p>


            <Box margin='10'>
                <ImageGallery items={images}>

                </ImageGallery>
            </Box>




        </div>
    )
}

export default ProductDetail
