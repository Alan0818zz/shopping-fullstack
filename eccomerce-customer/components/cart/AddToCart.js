'use client'

import { useCart } from '@/context/cart-context'

export default function AddToCart({ product }) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product)
    alert(`已將${product.productName} 加入購物車`);
    console.log('Added to cart:', product) 
  }

  return (
    <button 
      onClick={handleAddToCart}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      加入購物車
    </button>
  )
}