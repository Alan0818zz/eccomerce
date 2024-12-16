export default function CategoryPage({ params }) {
  const { slug } = params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {/* 这里可以根据slug显示对应的分类标题 */}
        {slug} 分類页面
      </h1>
      
      {/* 这里可以根据不同的slug来显示不同的内容 */}
      <div className="grid grid-cols-4 gap-4">
        {/* 分类内容将在这里显示 */}
      </div>
    </div>
  )
} 