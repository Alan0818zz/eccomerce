'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import AddToCart from '@/components/cart/AddToCart';
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 改為固定4列
  gap: 24px;
  padding: 20px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
const ProductCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;


const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; // 使圖片區域保持1:1比例
  overflow: hidden;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; // 確保圖片填滿且不變形
  }
`;

const ProductInfo = styled.div`
  padding: 12px;
`;

const ProductName = styled.h1`
  font-size: 16px; // 縮小字體
  margin: 0;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  height: 2.8em;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #e4584f;
  margin: 8px 0;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 16px;
`;


const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    opacity: 0.7;
  }
`;

export default function AllProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const YOUR_API_BASE_URL = 'http://localhost:80';
  useEffect(() => {
   
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${YOUR_API_BASE_URL}/products`);
        if (!response.ok) {
          console.error('API Error: no id', response.status);
        }
        const data = await response.json();

        // res.json(data);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  
  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <Link href={`/product/${product.id}`}>
            <ImageWrapper>
                <img
                    src={product.image}
                    alt={product.productName}
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                />  
            </ImageWrapper>
            <ProductInfo>
              <ProductName>{product.productName}</ProductName>
              <Price>NT${product.price}</Price>
            </ProductInfo>
            <ActionBar>
              
              {/* <IconButton>🛒</IconButton> */}
            </ActionBar>
          </Link>
          <IconButton>❤️</IconButton>
          <AddToCart product={product} />
        </ProductCard>
        
      ))}

    </ProductGrid>
  );
}