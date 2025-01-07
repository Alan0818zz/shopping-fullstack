import { useRef } from 'react';
import Image from 'next/image';
import { useClickOutside } from '@/hooks/useClickOutside';
import { 
  UserDropdown, 
  IconLink, 
  DropdownContent, 
  DropdownItem 
} from './HeaderStyles';

export default function UserDropdownMenu({ user, isOpen, setIsOpen, onLogout }) {
  const dropdownRef = useRef(null);
  console.log(user);
  useClickOutside(dropdownRef, () => setIsOpen(false));
  return (
    <UserDropdown ref={dropdownRef}>
      <IconLink 
        as="div" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        <Image src="/items/member.png" alt="用戶" width="24" height="24"/>
      </IconLink>
      <DropdownContent $isOpen={isOpen}>
        {user ? (
          <>
            <DropdownItem as="div">歡迎, {user || '會員'}</DropdownItem>
            <DropdownItem href="/orders">訂單查詢</DropdownItem>
            <DropdownItem href="/member">會員專區</DropdownItem>
            <DropdownItem href="/favorites">我的收藏</DropdownItem>
            <DropdownItem href="/coupons">我的優惠券</DropdownItem>
            <DropdownItem as="div" onClick={onLogout}>登出</DropdownItem>
          </>
        ) : (
          <DropdownItem href="/signin">會員登入/註冊</DropdownItem>
        )}
      </DropdownContent>
    </UserDropdown>
  );
}