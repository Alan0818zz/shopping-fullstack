'use client'

import { useCart } from '@/context/cart-context'
import Image from 'next/image'
import styled from 'styled-components'

const ImageContainer = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 6px;
`

const ItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`

const ItemName = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ItemPrice = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin: 0.25rem 0;
`

const DeleteButton = styled.button`
  color: #999;
  padding: 0.25rem;
  line-height: 1;
  &:hover {
    color: #666;
  }
`

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 4px;
  width: fit-content;
  margin-top: 0.5rem;
`

const QuantityButton = styled.button`
  padding: 0.25rem 0.5rem;
  color: #666;
  &:hover {
    background-color: #f5f5f5;
  }
`

const QuantityDisplay = styled.span`
  padding: 0.25rem 0.5rem;
  min-width: 40px;
  text-align: center;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
`

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <ItemContainer>
      <ImageContainer>
        <Image
          src={item.image}
          alt={item.productName}
          width={300}
          height={300}
          className="object-cover"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </ImageContainer>

      <ItemInfo>
        <ItemHeader>
          <div>
            <ItemName>{item.productName}</ItemName>
            <ItemPrice>NT${item.price}</ItemPrice>
          </div>
          <DeleteButton onClick={() => removeItem(item.id)}>
            ×
          </DeleteButton>
        </ItemHeader>
        
        <QuantityControl>
          <QuantityButton 
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
          >
            －
          </QuantityButton>
          <QuantityDisplay>
            {item.quantity}
          </QuantityDisplay>
          <QuantityButton 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            ＋
          </QuantityButton>
        </QuantityControl>
      </ItemInfo>
    </ItemContainer>
  )
}