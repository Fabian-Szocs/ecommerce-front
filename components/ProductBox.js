import styled from "styled-components";
import Button, { ButtonStyle } from "./Button";
import CartIcon from "./icons/Cart";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height:120px;
  text-align:center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`

const Title =styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin:0;
  text-decoration:none;
  color: inherit;
`;

const ProductWrapper = styled.div`

`
const ProductInfoBox = styled.div`
  margin-top: 5px;
`

const PriceRow = styled.div`
  display: flex;
  align-items:center;
  justify-content: space-between;
  margin-top: 2px;
`
const Price =styled.div`
  font-size: 1.2rem;
  font-weigth: bold;
`

export default function ProductBox({_id,title, desccription, price, images}){
  const{addProduct} = useContext(CartContext);
  const url = '/product/'+_id;
  return(
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price> ${price}</Price>
          <Button  onClick={()=> addProduct(_id)} primary ><CartIcon/></Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}