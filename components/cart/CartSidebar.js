'use client'

import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  useDisclosure
} from "@nextui-org/react"
//import { BsCart3 } from "react-icons/bs"
import { useCart } from '@/context/cart-context'
import CartItem from './CartItem'

export default function CartSidebar() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { items, total, toggleCart } = useCart()

  return (
    <>
      {/* 購物車按鈕 */}
      <Button
        onPress={onOpen}
        className="relative"
        variant="light"
        isIconOnly
      >
        
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </Button>

      {/* 購物車側邊欄 */}
      <div className="fixed inset-y-0 right-0 z-50">
        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          hideCloseButton
          className="!m-0 !p-0 !h-screen !w-[400px] !max-w-full"
          classNames={{
            wrapper: "!justify-end !items-start !m-0",
            base: "!m-0 !w-full",
            body: "p-4",
          }}
          style={{
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            margin: 0,
            height: '100vh',
          }}
        >
          <ModalContent className="h-screen rounded-none">
            {(onClose) => (
              <>
                <ModalHeader className="border-b">
                  <div className="flex justify-between w-full items-center">
                    <div>
                      <h3 className="text-lg font-medium">您的購物車</h3>
                      <p className="text-sm text-gray-500">
                        您已添加 {items.length} 項商品
                      </p>
                    </div>
                    <button 
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                </ModalHeader>
                
                <ModalBody className="flex-1 overflow-y-auto">
                  {/* 購物車商品列表 */}
                  <div className="space-y-4">
                    {items.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </ModalBody>
                
                <ModalFooter className="border-t">
                  <div className="w-full">
                    <div className="flex justify-between mb-4">
                      <span>合計</span>
                      <span>NT${total.toLocaleString()}</span>
                    </div>
                    <Button 
                      className="w-full bg-[#8B4513] text-white"
                      size="lg"
                      onPress={onClose}
                    >
                      去結帳
                    </Button>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}