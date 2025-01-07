import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    const YOUR_API_BASE_URL = 'http://localhost:80';

    await isAdminRequest(req,res);

    try {
        // 獲取所有訂單資料
        if (method === 'GET') {
            const response = await fetch(`${YOUR_API_BASE_URL}/orders`);
            console.log(response);
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            console.log('Orders data:', data);
            res.json(data);
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            error: error.message,
            details: typeof error === 'object' ? error.toString() : error
        });
    }
}