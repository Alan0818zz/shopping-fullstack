'use client';
import styled from 'styled-components';
import Image from 'next/image';
import AddToCart from '@/components/cart/AddToCart';
import { useCart } from '@/context/cart-context'
const toys = [
    {
        id: 1,
        name: '限定發光版 Ignition model 1/18 頭文字D 藤原文太 速霸陸 INITIAL D SUBARU Impreza WRX type R STi Version V (GC8) Blue With LED light IG3539',
        price: 13800,
        imageUrl: '/toyzs/Ignition model.jpg'
    },
    {
        id: 2,
        name: '[再版] Daibadi Production 機器新人類 Polynian Motoroid Pink',
        price: 2460,
        imageUrl: '/avatars/Logo1.png'
    },
    {
      id: 3,
      name: '[再版] Daibadi Production 機器新人類 Polynian Motoroid Pink',
      price: 2460,
      imageUrl: '/toyzs/car.jpg'
  },
  {
    id: 4,
    name: '[TW數量限定] SEGA 景品 葬送的芙莉蓮 PM坐姿公仔 透明捲髮芙莉蓮 2505',
    price: 2460,
    imageUrl: '/toyzs/girl.jpg'
},
{
  id: 5,
  name: '[再版] Daibadi Production 機器新人類 Polynian Motoroid Pink',
  price: 2460,
  imageUrl: '/toyzs/R35.jpg'
},
    // 可以继续添加更多商品...
];

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
   position: relative; // 添加這行
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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const StyledProductCard = styled.div`
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
  height: 200px;
`;

const ProductInfo = styled.div`
  padding: 12px;
`;

const ProductName = styled.h3`
  font-size: 14px;
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
  font-size: 16px;
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


const ProductCardItem = ({ toy }) => {
  return (
    <StyledProductCard key={toy.id}>
      <ImageWrapper>
        <Image
          src={toy.imageUrl}
          alt={toy.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </ImageWrapper>
      <ProductInfo>
        <ProductName>{toy.name}</ProductName>
        <Price>NT${toy.price}</Price>
      </ProductInfo>
      <ActionBar>
        <IconButton>❤️</IconButton>
        <AddToCart product={{
          id: toy.id,
          name: toy.name,
          price: toy.price, // 直接使用數字，不需要轉換
          image: toy.imageUrl
        }} />
      </ActionBar>
    </StyledProductCard>
  );
};
export default function ToysCollectionPage() {
  const { toggleCart } = useCart()  // 添加這行
  return (
    <>
     <Container>
       {/* 添加購物車按鈕 */}
       <button 
        onClick={toggleCart}
        className="fixed right-4 top-4 z-50 p-2 bg-blue-500 text-white rounded-full"
      >
        🛒
      </button>
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
      </TopBar>
      <ProductGrid>
        {toys.map((toy) => (
          <ProductCardItem key={toy.id} toy={toy} />
        ))}
      </ProductGrid>
    </Container>

    </>
  );
}

