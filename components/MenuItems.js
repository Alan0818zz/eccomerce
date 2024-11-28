// MenuItems.js
import Dropdown from "@/components/Dropdown"; // 根據你的檔案路徑調整
import { useState,useEffect , useRef} from "react";
import styled from "styled-components";

const Menus = styled.li`
  position: relative;
  font-size: 14px;
  ${props => props.depthLevel > 0 && `
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
  ${props => props.depthLevel > 0 && `
    &::after {
      content: '→';
      margin-left: auto;
    }
  `}
`;

const Alink = styled.a`
  display: block;
  font-size: inherit;
  color: inherit;
  text-decoration: none;
  padding: 0.7rem 1rem;
`;

const MenuItems = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();
    useEffect(() => {
        const handler = (event) => {
            // 檢查點擊的目標是否在 dropdown 之外
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };

        // 添加 mousedown 和 touchstart 事件
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);

        return () => {
            //清掉
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    },[dropdown]);
    const onMouseEnter = () =>{
        setDropdown(true);
    };
    const onMouseLeave = () =>{
        setDropdown(false);
    };
    return (
        <Menus className="menu-items" ref={ref}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            depthLevel={depthLevel}>
            {items.submenu ? (
                <>
                    <Button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => setDropdown((prev) => !prev)}
                        isOpen={dropdown}
                        depthLevel={depthLevel}
                    >
                        {items.title}{" "}
                        {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow"></span>}
                    </Button>
                    <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel} />
                </>
            ) : (
                <Alink href="/toysCollection">
                    {items.title}</Alink>
            )}
        </Menus>
    );
};

export default MenuItems;
