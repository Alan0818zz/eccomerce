"use client";
import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from "next/link";

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
  margin-left: 20px;
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

export default function Header() {
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
                                <Image src="/icons/search.png" alt="搜索" width="20" height="20"/>
                            </SearchWrapper>
                            <IconLink href="/account">
                                <Image src="/icons/user.png" alt="用戶" width="24" height="24"/>
                            </IconLink>
                            <IconLink href="/cart">
                                <Image src="/icons/cart.png" alt="購物車" width="24" height="24"/>
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
            <DynamicCarousel />
        </div>
    );
}