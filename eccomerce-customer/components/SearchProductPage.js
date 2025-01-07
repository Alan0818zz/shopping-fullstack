'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import AddToCart from '@/components/cart/AddToCart';
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;
const ProductCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
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


export default function SearchProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const query = searchParams.get('query'); // `name` 對應的是查詢參數的 key
  console.log(query)
  useEffect(() => {
    if (!query) return; // 如果 query 為空，則不執行請求

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:80/products/search?name=${(query)}`);
        console.log(response)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        // console.error(err);
        setError(err.message);
      } finally {
        // console.error("error");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
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
          </Link>
          <AddToCart product={product} />
        </ProductCard>
      ))}
    </ProductGrid>
  );
}