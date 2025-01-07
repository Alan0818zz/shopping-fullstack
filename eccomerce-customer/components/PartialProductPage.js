'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import AddToCart from '@/components/cart/AddToCart';


const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Default: 4 columns */
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); /* 3 columns for medium screens */
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for smaller screens */
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr; /* 1 column for very small screens */
  }
`;

const ProductCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; // 使圖片區域保持1:1比例
  overflow: hidden;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; // 確保圖片填滿且不變形
  }
`;

const ProductInfo = styled.div`
  padding: 12px;
`;

const ProductName = styled.h1`
  font-size: 16px; // 縮小字體
  margin: 0;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  height: 2.8em;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #e4584f;
  margin: 8px 0;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 12px 12px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    opacity: 0.7;
  }
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
   position: relative; // 添加這行
`;
export default function PartialProductPage({ slug }) {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const slugToIdMap = {
    "gunpla": 3,
    "hot-items": 4,
    "rc-cars": 5,
    "remote-control": 6,
    "nextee": 7,
    "new-arrivals": 8,
    "premium": 9,
    "classic-robots": 10,
    "model-kits":11,
    
  };

  const categoryId = slugToIdMap[slug]; // 將 slug 映射到 id
  console.log(categoryId);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!categoryId) {
          throw new Error(`未找到對應的分類 ID: ${slug}`);
        }
        
        const response = await fetch(`http://localhost:80/categories/slug/${categoryId}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        setProducts(data.products || []);
        setCategoryName(data.categoryName || '');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    console.log(categoryId, slug)
    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);


  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  
  return (
    <>
    <h1 className="text-2xl font-bold mb-6">
        {/* 这里可以根据slug显示对应的分类标题 */}
        {categoryName} 分類頁面
      </h1>
    <Container>
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <Link href={`/product/${product.id}`}>
            <ImageWrapper>
                <img
                    src={product.image}
                    alt={product.productName}
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                />  
            </ImageWrapper>
            <ProductInfo>
              <ProductName>{product.productName}</ProductName>
              <Price>NT${product.price}</Price>
            </ProductInfo>
            <ActionBar>
              
              {/* <IconButton>🛒</IconButton> */}
            </ActionBar>
          </Link>
          <IconButton>❤️</IconButton>
          <AddToCart product={product} />
        </ProductCard>
        
      ))}

    </ProductGrid>
    </Container>
    </>
  );
}