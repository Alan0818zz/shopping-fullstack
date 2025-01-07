import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';


function Members({swal}) {
    const [members, setMembers] = useState([]);
    const [editedMember, setEditedMember] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhone] = useState('');

    useEffect(() => {
        fetchMembers();
    }, [])

    function fetchMembers() {
        axios.get('/api/members').then(result => {
            setMembers(result.data);
        });
    }

    async function saveMember(ev){
        ev.preventDefault();
        const data = {
            name,
            email,
            phoneNumber,
        };

        try {
            if (editedMember) {
                data.memberId = editedMember.memberId;
                console.log(data);
                await axios.put('/api/members', data);
                setEditedMember(null);
            } else {
                await axios.post('/api/members', data);
            }
            setName('');
            setEmail('');
            setPhone('');
            fetchMembers();
        } catch (error) {
            console.error('Error saving member:', error);
            swal.fire({
                title: '錯誤',
                text: '儲存會員資料時發生問題',
                icon: 'error',
            });
        }
    }

    function editMember(member){
        setEditedMember(member);
        setName(member.name);
        setEmail(member.email);
        setPhone(member.phoneNumber);
    }

    function deleteCoupon(member){
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${member.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if (result.isConfirmed) {
                const {memberId} = member;
                try {
                    await axios.delete('/api/member?id='+memberId);
                    fetchMembers();
                } catch (error) {
                    swal.fire({
                        title: 'Error',
                        text: 'There was a problem deleting the coupon',
                        icon: 'error',
                    });
                }
            }
        });
    }

    return (
        <Layout>
            <h1>Member Info</h1>
            <label>
                {editedMember
                    ? `編輯會員 ${editedMember.name}`
                    : '新增會員'}
            </label>
            <form onSubmit={saveMember}>
                <div className="flex gap-1">
                    <input
                        type="text"
                        placeholder={'Name'}
                        onChange={ev => setName(ev.target.value)}
                        value={name}/>
                    <input
                        type="email"
                        placeholder={'Email'}
                        onChange={ev => setEmail(ev.target.value)}
                        value={email}/>
                    <input
                        type="tel"
                        placeholder={'phoneNumber'}
                        onChange={ev => setPhone(ev.target.value)}
                        value={phoneNumber}/>
                </div>
                <div className="flex gap-1 mt-2">
                    {editedMember && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditedMember(null);
                                setName('');
                                setEmail('');
                                setPhone('');
                            }}
                            className="btn-default">取消</button>
                    )}
                    <button type="submit"
                            className="btn-primary py-1">
                        儲存
                    </button>
                </div>
            </form>
            {!editedMember && (
                <table className="basic mt-4">
                    <thead>
                    <tr>
                        <td>Member Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Register Date</td>
                        <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                    {members.length > 0 && members.map(member => (
                        <tr key={member.id}>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>{member.phoneNumber}</td>
                            <td>{member.registerDat}</td>
                            <td>
                                <button
                                    onClick={() => editMember(member)}
                                    className="btn-default mr-1"
                                >
                                    編輯
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </Layout>
    );
}
export default withSwal(({swal}, ref) => (
    <Members swal={swal} />
));