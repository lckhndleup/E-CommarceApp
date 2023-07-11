import React from 'react';
import {Box,Image,Button} from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';
import moment from 'moment';

//Context
import {useBasket} from '../../Context/BasketContext';


function Card({item}) {


    const {addToBasket,items} = useBasket() ; //anasayfa da sepete ekleme işlemleri için


    //ürünün sepette olup olmadığını kontrol edelim
    const findBasketItem = items.find((basket_item) => basket_item._id === item._id); //item ile sayfadaki tüm ürünleri tutuyoruz ilk etapta 12 tane varsa 12 tane item ögesi vardır. Sonrasında bu 12 öge yada kaç tane ürün varsa sayfada tüm hepsinin hepsi item olarak tutuluyor. bizim burda amacımız bu bütün itemlar dan hepsinin arasından bizim seçtiğimiz ürünün id sini kıyaslayıp aynı olanı yakalayınca o ürünü döner. ve o ürünü almış oluruz. bu "findBasketItem" ı da aşagıda butona tıklanıldığı durumda kullanıcaz. kullanımı da şöyle: eğer butona basma esnasında "findBasketItem" varsa yani ürün eklenmiş demektir "remove from cart" yazacak buton üstünde. eğer "findBasketItem" yoksa bu da ürün eklenmemiş demektir. "add to cart " yazdırcaz.

    return (
        <Box borderRadius='lg' overflow='hidden' p={3}>  {/* chakra ui box kullanıyoruz*/}
            <NavLink to={`/product/${item._id}`}>
                {/* <Image src='https://picsum.photos/400/200.jpg'/>  lorem picsum websitesinden sürekli değişen fotolar*/} 

                <Image  src={item.photos[0]} loading='lazy'/>
                <Box p={6}>
                    <Box display={'flex'} alignItems={'baseline'}>
                        {moment(item.createdAt).format('DD/MM/YY')}
                    </Box>
                    <Box mt={1} fontWeight={'semibold'} as='h4' lineHeight='3'>
                        {item.title}
                    </Box>
                    <Box mt={2} >
                        {item.price}
                    </Box>
                </Box>
            </NavLink>
            <Button colorScheme={findBasketItem ? 'pink' : 'green'} variant={'solid'} onClick={() => addToBasket(item,findBasketItem)}> {/* butonun rengini ürün sepette olma durumuna göre değiştircez*/}
                {
                    findBasketItem ? 'Remove From Cart' : 'Add To Cart'
                }
            </Button>
        </Box>
    )
}

export default Card
