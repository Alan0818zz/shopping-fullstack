import styled from "styled-components";
import MenuItems from "./MenuItems";

const DropdownMenu = styled.ul`
  position: absolute;
  box-shadow: 0 10px 15px -3px rgba(46, 41, 51, 0.08),
    0 4px 6px -2px rgba(71, 63, 79, 0.16);
  font-size: 0.875rem;
  z-index: 9999;
  min-width: 10rem;
  padding: 0.5rem 0;
  list-style: none;
  background-color: #fff;
  border-radius: 0.5rem;
  display: ${props => props.$dropdown ? 'block' : 'none'};

  ${props => props.$depthLevel > 1 ? `
    position: absolute;
    left: 100%;
    top: -7px;
  ` : `
    left: auto;
    right: 0;
    top: 100%;
  `}
`;

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <DropdownMenu 
      className={`dropdown ${dropdownClass}`} 
      $dropdown={dropdown} 
      $depthLevel={depthLevel}
    >
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </DropdownMenu>
  );
};

export default Dropdown;