'use client'

import { useCart } from '@/context/cart-context'
import Image from 'next/image'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0">
      {/* 商品圖片容器 */}
      <div className="relative w-[80px] h-[80px] flex-shrink-0 overflow-hidden rounded">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="object-cover"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* 商品資訊 */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-sm font-medium truncate">{item.name}</h3>
            <p className="text-xs text-gray-500 mt-1">NT${item.price}</p>
          </div>
          <button 
            onClick={() => removeItem(item.id)}
            className="text-gray-400 p-1"
          >
            ×
          </button>
        </div>
        
        {/* 數量控制 */}
        <div className="mt-2 flex items-center border rounded w-fit">
          <button 
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="px-2 py-1 text-gray-500"
          >
            －
          </button>
          <span className="px-2 py-1 border-x min-w-[40px] text-center">
            {item.quantity}
          </span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 text-gray-500"
          >
            ＋
          </button>
        </div>
      </div>
    </div>
  )
}