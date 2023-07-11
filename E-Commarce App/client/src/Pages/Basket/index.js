import { React, useRef, useState } from "react";
import {
  Alert,
  Image,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

//Context
import { useBasket } from "../../Context/BasketContext";
import { Link } from "react-router-dom";
import { postOrder } from "../../api";

function Basket() {
  const { items, removeFromBasket, emptyBasket } = useBasket(); //sepetteki ürünler.

  //sipariş açılır pencere için  ---------------------------------------------------------
  const [address, setAddress] = useState(); //sipariş açılır pencere de adresi tutacak state.
  const { isOpen, onOpen, onClose } = useDisclosure(); //sipariş açılır pencere için .
  const initialRef = useRef();

  const handleSubmit = async () => {  //siparişte save butona basıldıgında girilen bilgileri submit etmek için 
    const itemIds = items.map((item) => item._id); //sepete gelen ürünlerin id lerini alıyoruz.

    const input = {
      address,
      items: JSON.stringify(itemIds),
    };

    await postOrder(input);//api den gelen postOrder ile inputları db ye gönderdik. 
    //artık sepetin boşaltılması ve pencerenin kapatılması  gerekiyor.
    emptyBasket(); //itemin içini boşaltan fonksiyon.
    onClose(); //pencereyi kapatır.(açılır pencere useDisclousere içerisinden hazır kütüphane olarak çektik)
  };

  //-------------------------------------------------------------------------------------

  console.log("items", items);

  const total = items.reduce((acc, obj) => acc + obj.price, 0); // ürünün total fiyatını göstermek için reduce kullandık. acc ve obj olarak 2 parametre alır . acc yi 0 dan başlatır , obj ise items ı temsil eder . items.price ile fiyat bilgisini alır. ve üzerine toplayarak sonucu verir.

  return (
    <Box p={5}>
      {/*sepette ürün yoksa bir alert ile ürün yok yazsın*/}
      {items.length < 1 && (
        <Alert status="warning">You dont have any items in your Cart</Alert>
      )}

      {/*Sepette ürün varsa*/}
      {items.length > 0 && (
        <>
          <ul style={{ listStyleType: "decimal" }}>
            {items.map((item, index) => (
              <li key={index}>
                <Link to={`/product/${item._id}`}>
                  {" "}
                  {/*ürünün özelliklerini Link ile kapsayıp bu özelliklerden birine tıklanınca ürüne ait /product/:id sine göre ürün detail sayfasına giderek detaylı olarak ürünü göstermek istiyoruz*/}
                  <Text fontSize={25}> Ürün ismi : {item.title}</Text>
                  <br></br>
                  <Text fontSize={20}>Ürün Fiyatı : {item.price}</Text>
                  <Image
                    htmlWidth={300}
                    src={item.photos[0]}
                    alt="basket item"
                    loading="lazy" // bu özellik kullanıldığında, tarayıcı görüntüyü gecikmeli olarak yükler. Sayfa yüklendiğinde, görüntüyü hemen yüklemek yerine, kullanıcının görüntüyü görmeye başladığı alana kadar bekler. Bu özellik, sayfanın yükleme performansını artırabilir ve kullanıcı deneyimini iyileştirebilir.
                  />
                </Link>
                <Button
                  mt={2}
                  size={"sm"}
                  colorScheme="pink"
                  onClick={() => {
                    removeFromBasket(item._id);
                  }} // tıklanma işlemi ile ilgili ürünün id si alınarak BasketContext imizde oluşturdugumuz removeFromBasket fonksiyonunu kullanırız. bu fonksiyon ilgili item ın "_id" değerini alır filter işlemine sokup o _id hariç tüm itemleri yeni bir diziye sokarak sonraında item ı setItem yaparak döner. yani ilgili id ye sahip item ı çıkartarak günceller. ve item kaldırılmış olur.
                >
                  Remove From Cart
                </Button>
              </li>
            ))}
          </ul>
          {/* Sepetteki Ürünlerin Toplam fiyatını gösterme . Not: sepette ürün var ise total ibaresi gelmesi için burda yazdık.*/}
          <Box mt={10}>
            <Text fontSize={25}>Total : {total} TL</Text>
          </Box>

          {/*sipariş için buton start*/}
          <Button mt={2} size={"sm"} colorScheme="green" onClick={onOpen}> {/* order butonuna tıkladıgımızda açılır pencere açılacak*/}
            Order
          </Button>
          {/*sipariş için buton end*/}

          {/*sipariş için açılır pencere start*/}
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Adress</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Adress"
                    onChange={(event) => setAddress(event.target.value)}
                    value={address}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                  {" "}
                  {/* butona basıldığında submit olacak */}
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/*sipariş için açılır pencere start*/}
        </>
      )}
    </Box>
  );
}

export default Basket;
