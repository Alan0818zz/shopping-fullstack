'use client'
import styled from 'styled-components';
import React from 'react';
export const FooterWrapper = styled.footer`
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  border-top: 1px solid #eaeaea;
  padding: 60px 0 40px;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 30px;
    height: 2px;
    background: #007bff;
  }
`;

export const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const LinkItem = styled.li`
  margin-bottom: 12px;
`;

export const Link = styled.a`
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #007bff;
    transform: translateX(5px);
  }
  
  &:before {
    content: '›';
    margin-right: 8px;
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  &:hover:before {
    opacity: 1;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

export const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$bg || '#007bff'};
  color: white;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;



export const AppStoreButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

export const Copyright = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eaeaea;
  text-align: center;
  color: #999;
  font-size: 14px;
  
  p {
    margin: 5px 0;
  }
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <GridContainer>
          <Column>
            <img src="/logo.png" alt="華海模型" style={{ height: '50px', marginBottom: '20px' }} />
            <SocialLinks>
              <SocialIcon $bg="#1877f2" href="https://www.facebook.com/groups/1170016847292338/?hoisted_section_header_type=recently_seen&multi_permalinks=1537625943864758">
                <i className="fab fa-facebook-f" />
              </SocialIcon>
              <SocialIcon $bg="#00b900" href="#">
                <i className="fab fa-line" />
              </SocialIcon>
              <SocialIcon $bg="#e4405f" href="#">
                <i className="fab fa-instagram" />
              </SocialIcon>
            </SocialLinks>
          </Column>

          <Column>
            <Title>關於我們</Title>
            <LinkList>
              <LinkItem><Link href="#">品牌故事</Link></LinkItem>
              <LinkItem><Link href="#">商店簡介</Link></LinkItem>
              <LinkItem><Link href="#">門市資訊</Link></LinkItem>
              <LinkItem><Link href="#">隱私權及網站使用條款</Link></LinkItem>
            </LinkList>
          </Column>

          <Column>
            <Title>客服資訊</Title>
            <LinkList>
              <LinkItem><Link href="#">購物說明</Link></LinkItem>
              <LinkItem><Link href="#">會員權益聲明</Link></LinkItem>
              <LinkItem><Link href="#">聯絡我們</Link></LinkItem>
            </LinkList>
          </Column>

         
        </GridContainer>

        <Copyright>
          <p>© 2024 by 我愛Ameila</p>
        </Copyright>
      </Container>
    </FooterWrapper>
  );
}