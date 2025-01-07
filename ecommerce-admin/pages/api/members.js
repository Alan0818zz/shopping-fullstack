import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    const YOUR_API_BASE_URL = 'http://localhost:80';

    await isAdminRequest(req,res);

    try {
        // 獲取所有會員資料
        if (method === 'GET') {
            const response = await fetch(`${YOUR_API_BASE_URL}/members`);

            if (!response.ok) throw new Error('Failed to fetch members');
            const data = await response.json();
            console.log(data);
            res.json(data);
        }

        // 新增會員
        if (method === 'POST') {
            const {name, email, phone} = req.body;
            try {
                console.log('Sending data:', {name, email, phone});
                const response = await fetch(`${YOUR_API_BASE_URL}/members`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone
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
                    throw new Error(data.error || 'Failed to create member');
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

        // 更新會員資料
        if (method === 'PUT') {
            try {
                const {memberId, name, email, phoneNumber} = req.body;
                console.log('Updating member:', phoneNumber);
                const response = await fetch(`${YOUR_API_BASE_URL}/members/${memberId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phoneNumber
                    }),
                });

                if (!response.ok){
                    const errorText = await response.text();
                    console.error('Server response:', errorText);
                    throw new Error(`Failed to update member: ${errorText}`);
                }
                const data = await response.json();
                res.json(data);
            }catch (error){
                console.error('Error updating member:', error);
                res.status(500).json({ error: error.message });
            }
        }

        // 刪除會員功能
        if (method === 'DELETE') {
            const {id} = req.query;
            const response = await fetch(`${YOUR_API_BASE_URL}/api/members/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete member');
            res.json({ message: 'Member deleted successfully' });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
    }
}