"use client";

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
    body{
        padding:0;
        margin:0;
        font-family: 'Roboto', sans-serif;
    }
`;

export default function GlobalStyles() {
    return <GlobalStyle />;
}