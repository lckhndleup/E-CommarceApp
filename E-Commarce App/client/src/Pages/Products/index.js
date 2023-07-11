import React from "react";
import Card from "../../Components/Card";
import { Grid, Box, Flex,Button } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api";

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => { 
      //daha fazla sayfa varmı yok mu kaydırma yaptıkça bulacak.

      const morepagesExist = lastGroup?.length === 12; // son alınan grup verilerinin uzunluğunu kontrol eder ve eğer sayfada  12  adet veri var ise daha fazla sayfa olduğu anlamına gelir , eğer sayfada 12 den az az veri var ise artık devamı olmayacağı anlaşılır.Eğer veri var ise bunu devam ettirmek için alttaki kodda => allGroups.length + 1 değerini döndürür. 12 verisi ile backend de tanımlanan "limit" isimli bir değişken var onunla bunun aynı olması gerekiyor. limit = 12 verilmiş backendde ona göre buraya 12 yazıyoruz. 

      if (!morepagesExist) {
        //daha fazla grup varmı yok mu kontrol eder.yoksa programı durdurur.
        return;
      }

      return allGroups.length + 1; //bir tane daha grup var demektir.
    },
  }); //products cacheleniyor. 'products' bir key değil istediğimiz bir isim olur.
  // fetch('http://localhost:4000/product').then(res =>res.json()) fetch ile veriyi alabilriz . ama axios ile api.js de alıp burda kullanacaz.

  if (status === "loading") return "Loading..."; //useInfınıteQuery kullanırken status kullanırız.

  if (status === "error") return "An error has occurred: " + error.message;

  console.log("data", data); //data ile veriyi yazdırdığımızda içerisinde pageParams ve Pages bilgileri bulunuyor.

  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {/* her satırda 3 sütun olcak şekilde grid yapısı kullanıyoruz*/}
     
        {/* dataları scroll yaptıkça group olarak almak için map leme yapıcaz. 2 kere maplicez ilk olarak data içine gircez. içinde pageParams ve Pages var . pages i maplicez. sonrasında ppages içinde 12 veri var o veriyi maplicez.ve dönen verileri ekranda göstercez.*/}
        {data.pages.map((group, index) => (
          <React.Fragment key={index}>
            {group.map((item, index) => (
              <Box w="100%" key={index}>
                <Card item={item}></Card>
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    {/*S sonraki pages i yüklemesi için buton koyuyoruz. */}
      <Flex mt={10} justifyContent={"center"}> 
        <Button colorScheme={hasNextPage && !isFetchingNextPage ? "yellow" : "red"}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          isLoading={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>

    {/*E */}
    </div>
  );
}

export default Products;
