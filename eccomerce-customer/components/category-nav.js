'use client'
import styled from 'styled-components'
import Image from 'next/image'

const categories = [
  { id: 'gunpla', name: '鋼彈模型', slug: 'gunpla', icon: '/items/image.png' },
  { id: 'hotitems', name: '熱門作品', slug: 'hot-items', icon: '/items/image1.png' },
  { id: 'rc', name: '閃電霹靂車', slug: 'rc-cars', icon: '/items/image2.png' },
  { id: 'control', name: '遙控模型', slug: 'remote-control', icon: '/items/image3.png' },
  { id: 'nextee', name: 'NEXTEE', slug: 'nextee', icon: '/items/image4.png' },
  { id: 'new', name: '最新上架', slug: 'new-arrivals', icon: '/items/image5.png' },
  { id: 'premium', name: '現貨專區', slug: 'premium', icon: '/items/image6.png' },
  { id: 'classic', name: '經典機器人', slug: 'classic-robots', icon: '/items/image7.png' },
  { id: 'model', name: '組裝模型', slug: 'model-kits', icon: '/items/image8.png' },
  { id: 'sale', name: '查詢訂單', slug: 'orders', icon: '/items/image9.png' }
];

const PageWrapper = styled.div`
  padding: 20px;
  background: white;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const NavGrid = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const CategoryItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333;
  width: 100px;
  padding: 10px 5px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    
    span {
      color: #4a90e2;
    }
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    transition: transform 0.3s ease;
  }

  ${CategoryItem}:hover & img {
    transform: scale(1.1);
  }
`;

const CategoryName = styled.span`
  font-size: 13px;
  text-align: center;
  color: #555;
  font-weight: 500;
  transition: color 0.3s ease;
`;

export default function CategoryNav() {
  return (
    <PageWrapper>
      <NavContainer>
        <NavGrid>
          {categories.map((category) => (
            <CategoryItem key={category.id} href={`/category/${category.slug}`}>
              <IconWrapper>
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={40}
                  height={40}
                  style={{ objectFit: 'contain' }}
                />
              </IconWrapper>
              <CategoryName>{category.name}</CategoryName>
            </CategoryItem>
          ))}
        </NavGrid>
      </NavContainer>
    </PageWrapper>
  );
}