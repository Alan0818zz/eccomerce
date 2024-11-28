import dynamic from 'next/dynamic';

const DynamicHeader = dynamic(() => import("@/components/Header"), { ssr: false });

export default function HomePage(){
    return(
        <div>
            <DynamicHeader />
            {/* 其他页面内容 */}
        </div>
    );
}