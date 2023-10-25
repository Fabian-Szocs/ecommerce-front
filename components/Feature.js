import Center from "./Center";
import styled from "styled-components";
import Button, { ButtonStyle } from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/Cart";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding:  50px 0;
`

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`

const Title = styled.h1`
  margin:0;
  font-weight: normal;
  font-size: 3rem;
`

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4px;
  img{
    max-width: 100%
  }
`

const Column = styled.div`
  display:flex;
  align-items: center;
`

const ButtonWrpapper = styled.div`
  display:flex;
  gap: 10px;
  margin-top: 25px;
`

export default function Featured({product}){
  const {addProduct} = useContext(CartContext);
  function addFeatureToCart(){
    addProduct(product._id);
  }
  return(
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
          <div>
            <Title>{product.title}</Title>
              <Desc>{product.description} </Desc>
              <ButtonWrpapper>

                <Button href={'/products/' + product._id} outline white >Read More</Button>
                <Button primary onClick={addFeatureToCart}>
                  <CartIcon/>
                  Add to Cart
                </Button>
              </ButtonWrpapper>
          </div>
          </Column>
          <Column>
            <img src="https://fabianszocs.s3.amazonaws.com/1697904162808.jpg" alt="" />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  )
}