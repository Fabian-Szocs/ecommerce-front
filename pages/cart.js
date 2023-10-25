/* eslint-disable react/jsx-key */
import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import Button from "@/components/Button";
import StyledInput from '@/components/Input';
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";


const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr .8fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box =styled.div`
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
`;

const ProductInfoCel = styled.td`
padding: 10px 0;

`;

const ProductImmageBox = styled.div`
width: 70px;
height: 100px;
padding: 2px;
border: 1px solid rgba(0, 0, 0, 0.1);
display:flex;
align-items: center;
justify-content: center;
border-radius: 10px;
img{
  max-width: 60px;
  max-height: 60px;
}
`
const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;
const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

export default function CartPage(){
  const {cartProducts, addProduct,removeProduct} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [streetAddress,setStreetAddress] = useState('');
  const [country,setCountry] = useState('');
  
  useEffect(() => {
    if(cartProducts.length > 0 ){
      axios.post('api/cart', {ids:cartProducts})
      .then(response => {
        setProducts(response.data);
      })
    }else {
      setProducts([]);
    }
  }, [cartProducts]);


  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment(){
     const response = await axios.post('/api/checkout', {
      name,email,city,postalCode,streetAddress,country, cartProducts,
    });
    if(response.data.url){
      window.location = response.data.url
    }
  }

  let total = 0;
  for(const productId of cartProducts){
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  // if (window.location.href.includes('success')) {
  //   return (
  //     <>
  //       <Header />
  //       <Center>
  //         <ColumnsWrapper>
  //           <Box>
  //             <h1>Thanks for your order!</h1>
  //             <p>We will email you when your order will be sent.</p>
  //           </Box>
  //         </ColumnsWrapper>
  //       </Center>
  //     </>
  //   );
  // }

  return(
    <>
      <Header/>
      <Center>
        <ColumnsWrapper>
          <Box>
          <h2>Cart</h2>
            {!cartProducts?.length &&(
              <div>Your cart is empty</div>
            )}  
            {products?.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantitiy</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product =>(
                    <tr>
                      <ProductInfoCel>
                        <ProductImmageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImmageBox>
                         {product.title}
                      </ProductInfoCel>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>-</Button> 
                         <QuantityLabel>{cartProducts.filter(id => id ===  product._id).length}</QuantityLabel>
                        <Button onClick={()=> moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>${cartProducts.filter(id => id ===  product._id).length * product.price}</td>
                    </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>${total}</td>
                </tr>
              </tbody>
            </Table> 
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              <form method="post" action="/api/checkout">
                <StyledInput type="text" placeholder="Name" value={name}  name="name" onChange={ev => setName(ev.target.value)}/>
                <StyledInput type="text" placeholder="Email"value={email}  name="email"onChange={ev => setEmail(ev.target.value)} />
                <CityHolder>
                  <StyledInput type="text" placeholder="City" value={city} name="city" onChange={ev => setCity(ev.target.value)}/>
                  <StyledInput type="text" placeholder="Postal Code" value={postalCode} name="postalCode" onChange={ev => setPostalCode(ev.target.value)}/>
                </CityHolder>
                <StyledInput type="text" placeholder="Street Adress" value={streetAddress} name="streetAdress" onChange={ev => setStreetAddress(ev.target.value)}/>
                <StyledInput type="text" placeholder="Country" value={country} name="country" onChange={ev => setCountry(ev.target.value)}/>
                <Button  block primary onClick={goToPayment}>Continue to payment</Button>
              </form>
             </Box>  
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}