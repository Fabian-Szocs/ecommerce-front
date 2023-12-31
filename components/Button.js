import styled from "styled-components"
import css from "styled-jsx/css"

export const ButtonStyle =styled.button`
border: 0;
padding: 5px 15px;
border-radius:5px;
cursor: pointer;
display: inline-flex;
align-items:center;
svg{
  height: 16px;
  margin-right: 5px;
}
${props => props.white && !props.outline && css`
  background-color: #fff;
  color: #000;
`}
${props => props.white && props.outline && css`
background-color: transparent;
color: #fff;
border: 1px solid #fff;
`}
${props => props.primary && css`
  background-color : #5542f6;
  border: 1px solid  #5542f6;
  color: #fff;
`}
${props => props.size === "l" && css`
  font-size: 1.2rem;
  padding: 10px 20px;
  svg{
    height: 20px;
  }
`}
`;

const StyledBtn = styled.button`
border: 0;
padding: 5px 15px;
border-radius:5px;
cursor: pointer;
display: inline-flex;
align-items:center;
svg{
  height: 16px;
  margin-right: 5px;
}
${props => props.white && !props.outline && css`
  background-color: #fff;
  color: #000;
`}
${props => props.white && props.outline && css`
background-color: transparent;
color: #fff;
border: 1px solid #fff;
`}
${props => props.primary && css`
  background-color : #5542f6;
  border: 1px solid  #5542f6;
  color: #fff;
`}
${props => props.primary && css`
  display: block;
  width: 100%;
`}
${props => props.size === "l" && css`
  font-size: 1.2rem;
  padding: 10px 20px;
  svg{
    height: 20px;
  }
`}
`;


export default function Button({children,...rest}){
  return (
  <StyledBtn {...rest}>{children}</StyledBtn>
  )
}