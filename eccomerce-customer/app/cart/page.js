'use client'
import styled from 'styled-components'
import { Button } from "@nextui-org/react"
import { useCart } from '@/context/cart-context'
import CartItem from '@/components/cart/CartItem'
import { useRouter } from 'next/navigation'
const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const CartTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
`

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;  // 左側佔據 2/3，右側佔據 1/3
  gap: 2rem;
`

const CartItems = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const CartSummary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
`

const LoginPrompt = styled.div`
  background: #fff9e6;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CouponSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`

const PointsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`

const TotalSection = styled.div`
  padding-top: 1rem;
  
  .total-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    
    &.final {
      font-size: 1.2rem;
      font-weight: 600;
      color: #ff4d4f;
      margin-top: 1rem;
    }
  }
`

const CheckoutButton = styled(Button)`
  width: 100%;
  background-color: #ff4d4f;
  color: white;
  font-size: 1.1rem;
  padding: 1.5rem;
  margin-top: 1rem;
  
  &:hover {
    background-color: #ff3333;
  }
`

export default function CartPage() {
  const { items, total } = useCart()
  const router = useRouter();
  const handleCheckout = () => {
    router.push('/checkout');
  };
  return (
    <PageContainer>
      <CartTitle>購物車</CartTitle>
      
      <CartLayout>
        {/* 左側商品列表 */}
        <CartItems>
          
          
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </CartItems>

        {/* 右側結帳資訊 */}
        <CartSummary>
          <CouponSection>
            <span>優惠券與優惠碼</span>
            <Button light>選擇或輸入 ＞</Button>
          </CouponSection>

          <PointsSection>
            <span>點數折抵</span>
            
          </PointsSection>

          <TotalSection>
            <div className="total-row">
              <div>
                <div>商品金額</div>
                <div>NT${total.toLocaleString()}</div>
              </div>
            </div>
            <div className="total-row final">
              <span>小計</span>
              <span>NT${total.toLocaleString()}</span>
            </div>
          
          </TotalSection>

          <CheckoutButton size="lg" onClick={handleCheckout}>
            登入並結帳
          </CheckoutButton>
        </CartSummary>
      </CartLayout>
    </PageContainer>
  )
}