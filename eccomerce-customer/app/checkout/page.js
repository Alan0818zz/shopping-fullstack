'use client';
import { useState } from 'react';
import { useCart } from '@/context/cart-context'
export default function Orders() {
    const { items, total } = useCart()
    console.log(items)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        paymentMethod: 'credit_card',
        note: '',
    });
    const [orderPlaced, setOrderPlaced] = useState(false); // Track if order is placed successfully

    // Update form data
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Submit the order
    const submitOrder = async () => {
        const orderLines = items.map((item) => ({
            product: { id: item.id }, // 使用商品 ID
            quantity: item.quantity, // 購買數量
            note: formData.note || '', // 備註，從 formData 獲取
        }));
        const newOrder = {
            "order": {
                "member": { "id": 1 }, // 使用者 ID
                "address": formData.address,
                "shippingFee": 50, // 動態計算
                "totalCost": total, // 動態計算
                "paymentMethod": formData.paymentMethod === 'credit_card' ? 1 : 2, // 付款方式

            },
            orderLines: orderLines,
        };
        console.log(newOrder);
        try {
            const res = await fetch('http://localhost:80/orders/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOrder),
            });
            const savedOrder = await res.json()
            console.log('Order created:', savedOrder);
            if (!res.ok) {
                const errorText = await res.text(); // 後端返回錯誤訊息
                throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
            }
            setOrderPlaced(true);
            alert('訂單已成功建立！');
          
        } catch (error) {
            console.log('Error creating order:', error.message);
            alert('訂單成功建立');
        }
    };
    

    return (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
            <h3>建立訂單</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={(e) => e.preventDefault()}>
                <label>
                    姓名：
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="請輸入姓名"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </label>
                <label>
                    電話：
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="請輸入電話"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </label>
                <label>
                    地址：
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="請輸入地址"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </label>
                <label>
                    備註：
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        placeholder="可選填：例如配送要求"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>

                <h4>付款方式</h4>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="credit_card"
                            checked={formData.paymentMethod === 'credit_card'}
                            onChange={handleInputChange}
                        />
                        信用卡
                    </label>
                    <label style={{ marginLeft: '15px' }}>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cash_on_delivery"
                            checked={formData.paymentMethod === 'cash_on_delivery'}
                            onChange={handleInputChange}
                        />
                        貨到付款
                    </label>
                </div>

                <button
                    type="button"
                    onClick={submitOrder}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    提交訂單
                </button>
            </form>

            {orderPlaced && <p style={{ color: 'green', marginTop: '20px' }}>訂單已成功建立！</p>}
        </div>
    );
}