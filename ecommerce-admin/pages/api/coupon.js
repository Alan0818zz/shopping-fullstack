// pages/api/coupons.js
import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import {format, parseISO} from 'date-fns';
export default async function handle(req, res) {
    const {method} = req;
    const YOUR_API_BASE_URL = 'http://localhost:80';

    await isAdminRequest(req,res);

    try {
        if (method === 'GET') {
            const response = await fetch(`${YOUR_API_BASE_URL}/api/coupons`);
            if (!response.ok) throw new Error('Failed to fetch coupons');
            const data = await response.json();
            // console.log(data);
            res.json(data);
        }

        if (method === 'POST') {
            const {name, discount, lowLimit, startDate, endDate} = req.body;
            try {
                console.log('Sending data:', {name, discount, lowLimit, startDate, endDate});
                const formattedStartDate = format(parseISO(startDate), "yyyy-MM-dd'T'HH:mm:ss");
                const formattedEndDate = format(parseISO(endDate), "yyyy-MM-dd'T'HH:mm:ss");
                const response = await fetch(`${YOUR_API_BASE_URL}/api/coupons`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        discount: Number(discount) || 0,
                        lowLimit: Number(lowLimit) || 0,
                        startDate: formattedStartDate,
                        endDate: formattedEndDate
                    }),
                });

                const text = await response.text();
                console.log('Response text:', text);

                let data;
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    console.error('Failed to parse response:', text);
                    throw new Error('Invalid JSON response from server');
                }

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to create coupon');
                }

                res.status(response.status).json(data.data || data);

            } catch (error) {
                console.error('Error details:', error);
                res.status(500).json({
                    error: error.message,
                    details: typeof error === 'object' ? error.toString() : error
                });
            }
        }

        if (method === 'PUT') {
            try {
                const {couponCodeId, name, discount, lowLimit, startDate, endDate} = req.body;
                console.log('Updating coupon:', couponCodeId);
                const formattedStartDate = `${startDate}T00:00:00`;  // 添加時間部分
                const formattedEndDate = `${endDate}T23:59:59`;
                const response = await fetch(`${YOUR_API_BASE_URL}/api/coupons/${couponCodeId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        discount: discount || 0,
                        lowLimit: lowLimit || 0,
                        startDate: formattedStartDate,
                        endDate: formattedEndDate
                    }),
                });

                if (!response.ok){
                    const errorText = await response.text();
                    console.error('Server response:', errorText);
                    throw new Error(`Failed to update coupon: ${errorText}`);
                }
                const data = await response.json();
                res.json(data);
            }catch (error){
                console.error('Error updating coupon:', error);  // 添加錯誤日誌
                res.status(500).json({ error: error.message });
            }

        }

        if (method === 'DELETE') {
            const {id} = req.query;
            const response = await fetch(`${YOUR_API_BASE_URL}/api/coupons/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete coupon');
            res.json({ message: 'Coupon deleted successfully' });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
    }
}