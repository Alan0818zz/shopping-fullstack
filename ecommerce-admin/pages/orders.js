import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders,setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    });
  }, []);

  return (
      <Layout>
        <h1>Orders</h1>
        <table className="basic">
          <thead>
          <tr>
            <th>Order Date</th>
            <th>Delivery Date</th>
            <th>Address</th>
            <th>Status</th>
            <th>Products</th>
          </tr>
          </thead>
          <tbody>
          {orders.length > 0 && orders.map(order => (
              <tr key={order.orderId}>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.deliveryDate ? new Date(order.deliveryDate).toLocaleString() : 'Not set'}</td>
                <td>{order.address}</td>
                <td>{order.orderStatus}</td>
                <td>
                  {order.orderLines.map((line, index) => (
                      <div key={index}>
                        {line.productName} x {line.quantity}
                        {line.note && <span> ({line.note})</span>}
                      </div>
                  ))}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </Layout>
  );
}