import dynamic from 'next/dynamic';
import CategoryNav from '@/components/category-nav'

const DynamicHeader = dynamic(() => import("@/components/Header"), { ssr: false });
const DynamicCarousel = dynamic(() => import("@/components/Carousel"), { ssr: false });
export default function HomePage(){
    return(
        <div>
            
            <DynamicCarousel />
            <CategoryNav />
        </div>
    );
}