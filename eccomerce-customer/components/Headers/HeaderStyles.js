import styled from 'styled-components';
import Link from 'next/link';

export const StyledHeader = styled.header`
  background-color: #ff1f56;
`;

export const TopBar = styled.div`
  color: #fff;
  padding: 5px 0;
  text-align: center;
  font-size: 14px;
`;

export const MainHeader = styled.div`
  background-color: #ffffff;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
`;

export const LogoWrapper = styled.div`
  flex: 0 0 auto;
`;

export const NavAndIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-right: 50px;
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 5px 10px;
`;

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  padding: 5px;
  font-size: 14px;
`;

export const IconLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export const UserDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownContent = styled.div`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1000;
  border-radius: 4px;
  margin-top: 8px;
`;

export const DropdownItem = styled(Link)`
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 14px;

  &:hover {
    background-color: #f1f1f1;
  }
`;