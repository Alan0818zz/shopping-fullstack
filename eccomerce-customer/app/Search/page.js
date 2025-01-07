'use client';
import styled from 'styled-components';
import SearchProductPage from '@/components/SearchProductPage';

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

export default function SearchPage() {
  return (
    <Container>
      <TopBar>
        <span>搜尋商品</span>
      </TopBar>
      <SearchProductPage />
    </Container>
  );
}