import Link from "next/link"; // 使用 Next.js 的 Link 組件
import Dropdown from "@/components/Dropdown";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// 定義 title 和 slug 的對應關係
const titleToSlugMap = {
  "【鋼彈模型】": "gunpla",
  "【熱門作品】": "hot-items",
  "【閃電霹靂車】": "rc-cars",
  "【遙控模型】": "remote-control",
  "【NEXTEE】": "nextee",
  "【最新上架】": "new-arrivals",
  "【現貨專區】": "premium",
  "【經典機器人】": "classic-robots",
  "【組裝模型】": "model-kits",
  "【查詢訂單】": "orders",
};

const Menus = styled.li`
  position: relative;
  font-size: 14px;
  ${(props) =>
    props.depthLevel > 0 &&
    `
    padding-left: 10px;
  `}
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  color: inherit;
  font-size: inherit;
  border: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
  padding: 0.7rem 1rem;
  justify-content: space-between;
  ${(props) =>
    props.depthLevel > 0 &&
    `
    &::after {
      content: '→';
      margin-left: auto;
    }
  `}
`;

const StyledLink = styled(Link)`
  display: block;
  font-size: inherit;
  color: inherit;
  text-decoration: none;
  padding: 0.7rem 1rem;
`;

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  // 根據 title 獲取對應的 slug
  const slug = titleToSlugMap[items.title];

  return (
    <Menus
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.submenu ? (
        <>
          <Button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
            data-isopen={dropdown}
          >
            {items.title}{" "}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow"></span>}
          </Button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel} />
        </>
      ) : slug ? (
        <StyledLink href={`/category/${slug}`}>{items.title}</StyledLink>
      ) : (
        <span>{items.title}</span> // 如果找不到對應的 slug，顯示靜態文字
      )}
    </Menus>
  );
};

export default MenuItems;