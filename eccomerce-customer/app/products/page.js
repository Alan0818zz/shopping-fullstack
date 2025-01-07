'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link'
import AllProductPage from '@/components/AllProductPage';
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ItemCount = styled.span`
  color: #333;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ViewButton = styled.button`
  padding: 5px;
  background: white;
  border: 1px solid #ddd;
  cursor: pointer;
`;

const SortSelect = styled.select`
  padding: 5px;
  border: 1px solid #ddd;
`;


const LogoWrapper = styled.div`
  flex: 0 0 auto;
`;

export default function ShowProductPage() {

  return (
    <Container>
      <TopBar>
        <ItemCount>共 {toys.length} 項商品</ItemCount>
        <Controls>
          <ViewButton>
            <span>☰</span>
          </ViewButton>
          <ViewButton>
            <span>▤</span>
          </ViewButton>
          <SortSelect defaultValue="最新上架">
            <option>最新上架</option>
            <option>價格由高到低</option>
            <option>價格由低到高</option>
            
          </SortSelect>
        </Controls>
          <AllProductPage/>;  
      </TopBar> </Container>
      
  );

  // <AllProductPage/>;
}



