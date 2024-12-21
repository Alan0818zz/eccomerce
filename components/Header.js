"use client";

import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';
const DynamicNavbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const DynamicCarousel = dynamic(() => import("@/components/Carousel"), { ssr: false });

const StyledHeader = styled.header`
  background-color: #ff1f56;
`;

const TopBar = styled.div`
  color: #fff;
  padding: 5px 0;
  text-align: center;
  font-size: 14px;
`;

const MainHeader = styled.div`
  background-color: #ffffff;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
`;

const LogoWrapper = styled.div`
  flex: 0 0 auto;
`;

const NavAndIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  // margin-left: 20px;
  margin-right: 50px; 
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 5px 10px;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  padding: 5px;
  font-size: 14px;
`;

const IconLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const UserDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
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

const DropdownItem = styled(Link)`
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 14px;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // 點擊外部關閉下拉選單
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                            <Image src="/avatars/Logo.png" alt="東海模型" width="180" height="70"/>
                        </Link>
                    </LogoWrapper>
                    <NavAndIconsWrapper>
                        <DynamicNavbar />
                        <IconsWrapper>
                            <SearchWrapper>
                                <SearchInput type="text" placeholder="搜尋商品" />
                            </SearchWrapper>
                            
                            <UserDropdown ref={dropdownRef}>
                                <IconLink 
                                    as="div" 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Image src="/items/member.png" alt="用戶" width="24" height="24"/>
                                </IconLink>
                                <DropdownContent $isOpen={isDropdownOpen}>
                                    <DropdownItem href="/orders">訂單查詢</DropdownItem>
                                    <DropdownItem href="/member">會員專區</DropdownItem>
                                    <DropdownItem href="/favorites">我的收藏</DropdownItem>
                                    <DropdownItem href="/coupons">我的優惠券</DropdownItem>
                                    <DropdownItem href="/signin">會員登入/註冊</DropdownItem>
                                </DropdownContent>
                            </UserDropdown>

                            <IconLink href="/cart">
                                <Image src="/items/cart.png" alt="購物車" width="24" height="24"/>
                                <span style={{backgroundColor: '#ff1f56', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '12px', marginLeft: '2px'}}>0</span>
                            </IconLink>
                            
                            <LanguageSelector>
                                <span>TWD</span>
                                <span>▼</span>
                            </LanguageSelector>
                        </IconsWrapper>
                    </NavAndIconsWrapper>
                </Wrapper>
            </MainHeader>
        </div>
    );
}