import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./reset.css";
import { ChakraProvider } from '@chakra-ui/react' //chakra ui provider ve tema .
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";



//Contexts
import  {AuthProvider} from './Context/AuthContext';
import { BasketProvider } from './Context/BasketContext';


const queryClient = new QueryClient({ //react query için hazır çekiyoruz.
  defaultOptions:{
    queries:{
      refetchOnMount:false, //başka bir ekrana gidip geri geldiğimizde ,tekrar cachelediği veri olsa da veriyi tekrar çekmesinin önüne geçer.
      refetchOnWindowFocus:false, //burasıda aynı mantıkla başka bir window a gittikten sonra tekrar veri çekilmesinin önüne geçer.
    }
  }
}); //react query kullanarak db ye bağlanıp state yönetme işlemleri için .

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider>
          <BasketProvider>
            <App />
          </BasketProvider>
        </AuthProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} /> {/* developer tool u sol altta gösterir*/}
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
