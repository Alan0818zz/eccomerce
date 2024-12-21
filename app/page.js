import dynamic from 'next/dynamic';
import CategoryNav from '@/components/category-nav'
import DynamicCarousel from '@/components/Carousel'
export default function HomePage(){
    return(
        <div>
            
            <DynamicCarousel />
            <CategoryNav />
        </div>
    );
}