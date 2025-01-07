"use client";
import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from "next/link";
import { getCurrentUser, logout } from '@/app/data/services/auth-service';
import  UserDropdownMenu  from './Headers/UserDropdownMenu';
import { CartIcon } from './cart/CartIcon';
import { useState , useEffect} from 'react';
import { useAuth } from '@/hooks/useAuth';
import SearchBar from './Headers/SearchBar';  
import {
  StyledHeader,
  TopBar,
  MainHeader,
  Wrapper,
  LogoWrapper,
  NavAndIconsWrapper,
  IconsWrapper,
} from './Headers/HeaderStyles';

const DynamicNavbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

export default function Header() {
  const {isLoading, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('useEffect triggered'); // 檢查 useEffect 是否觸發
    fetchUser();
  }, [user]);
  const fetchUser = async () => {
    try {
      console.log('Fetching user...');
      const { isAuthenticated, user } = await getCurrentUser();
      console.log('Fetch result:', { isAuthenticated, user });
      setUser(isAuthenticated ? user : null);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      setIsDropdownOpen(false);
    }
  };
  return (
    <div>
      <StyledHeader>
        <TopBar>
          什麼？！加入會員即贈購物金
        </TopBar>
      </StyledHeader>
      <MainHeader>
        <Wrapper>
          <LogoWrapper>
            <Link href="/">
              <Image 
                src="/avatars/Logo.png" 
                alt="東海模型" 
                width="180" 
                height="70"
                priority
              />
            </Link>
          </LogoWrapper>
          <NavAndIconsWrapper>
            <DynamicNavbar />
            <IconsWrapper>
              <SearchBar />
              <UserDropdownMenu 
                user={user}
                isLoading={isLoading}
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
                onLogout={handleLogout}
              />
              <CartIcon count={0} />
            </IconsWrapper>
          </NavAndIconsWrapper>
        </Wrapper>
      </MainHeader>
    </div>
  );
}