import styled from "styled-components";

const StyleDiv = styled.div`
    
    max-width: 200px; //
    margin: 0 auto;
    padding: 5px 0 ;
`;

export  default function Center({children}) {
    return (
      <StyleDiv>{children}</StyleDiv>
    );





}