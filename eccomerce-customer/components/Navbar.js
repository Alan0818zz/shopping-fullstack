"use client";
import {menuItemsData} from "@/app/menuItemsData";
import styled from "styled-components";
import MenuItems from "@/components/MenuItems";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledNav = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 20px;
`;

const Navbar = () => {
    const depthLevel = 0;
    return (
        <NavbarContainer>
            <StyledNav>
                {menuItemsData.map((menu, index) => (
                    <MenuItems items={menu} key={index} depthLevel={depthLevel} />
                ))}
            </StyledNav>
        </NavbarContainer>
    );
};

export default Navbar;