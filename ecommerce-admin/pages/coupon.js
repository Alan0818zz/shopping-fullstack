import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';

function Coupons({swal}) {
    const [editedCoupon, setEditedCoupon] = useState(null);
    const [name, setName] = useState('');
    const [discount, setDiscount] = useState('');
    const [lowLimit, setLowLimit] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [coupons, setCoupons] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCoupons();
        fetchCategories();
    }, [])

    function fetchCoupons() {
        axios.get('/api/coupon').then(result => {
            setCoupons(result.data);
        });
    }

    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }

    async function saveCoupon(ev){
        ev.preventDefault();
        const data = {
            name,
            discount: discount ? Number(discount) : 0,
            lowLimit: lowLimit ? Number(lowLimit) : 0,
            startDate,
            endDate,
            categoryId: categoryId || null,
        };

        try {
            if (editedCoupon) {
                data.couponCodeId = editedCoupon.couponCodeId;
                await axios.put('/api/coupon', data);
                setEditedCoupon(null);
            } else {
                await axios.post('/api/coupon', data);
            }
            setName('');
            setDiscount('');
            setLowLimit('');
            setStartDate('');
            setEndDate('');
            setCategoryId('');
            fetchCoupons();
        } catch (error) {
            console.error('Error saving coupon:', error);
            swal.fire({
                title: 'Error',
                text: 'There was a problem saving the coupon',
                icon: 'error',
            });
        }
    }
    function editCoupon(coupon){
        setEditedCoupon(coupon);
        setName(coupon.name);
        setDiscount(coupon.discount);
        setLowLimit(coupon.lowLimit);
        setStartDate(coupon.startDate?.split('T')[0] || '');
        setEndDate(coupon.endDate?.split('T')[0] || '');
        setCategoryId(coupon.categoryId || '');
    }
    function deleteCoupon(coupon){
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${coupon.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if (result.isConfirmed) {
                const {couponCodeId} = coupon;
                try {
                    await axios.delete('/api/coupon?id='+couponCodeId);
                    fetchCoupons();
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
            <h1>Coupons</h1>
            <label>
                {editedCoupon
                    ? `Edit coupon ${editedCoupon.name}`
                    : 'Create new coupon'}
            </label>
            <form onSubmit={saveCoupon}>
                <div className="flex gap-1">
                    <input
                        type="text"
                        placeholder={'Coupon name'}
                        onChange={ev => setName(ev.target.value)}
                        value={name}/>
                    <input
                        type="number"
                        placeholder={'Discount'}
                        step="0.01"
                        onChange={ev => setDiscount(ev.target.value)}
                        value={discount}/>
                    <input
                        type="number"
                        placeholder={'Low limit'}
                        onChange={ev => setLowLimit(ev.target.value)}
                        value={lowLimit}/>
                </div>
                <div className="flex gap-1 mt-2">
                    <input
                        type="date"
                        onChange={ev => setStartDate(ev.target.value)}
                        value={startDate}/>
                    <input
                        type="date"
                        onChange={ev => setEndDate(ev.target.value)}
                        value={endDate}/>
                    <select
                        value={categoryId}
                        onChange={ev => setCategoryId(ev.target.value)}>
                        <option value="">No category</option>
                        {categories.length > 0 && categories.map(category => (
                            <option value={category.categoryId} key={category.categoryId}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-1 mt-2">
                    {editedCoupon && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditedCoupon(null);
                                setName('');
                                setDiscount('');
                                setLowLimit('');
                                setStartDate('');
                                setEndDate('');
                                setCategoryId('');
                            }}
                            className="btn-default">Cancel</button>
                    )}
                    <button type="submit"
                            className="btn-primary py-1">
                        Save
                    </button>
                </div>
            </form>
            {!editedCoupon && (
                <table className="basic mt-4">
                    <thead>
                    <tr>
                        <td>Coupon name</td>
                        <td>Discount</td>
                        <td>Low limit</td>
                        <td>Start date</td>
                        <td>End date</td>
                        <td>Category</td>
                        <td>Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    {coupons.length > 0 && coupons.map(coupon => (
                        <tr key={coupon.couponCodeId}>
                            <td>{coupon.name}</td>
                            <td>{coupon.discount}</td>
                            <td>{coupon.lowLimit}</td>
                            <td>{new Date(coupon.startDate).toLocaleDateString()}</td>
                            <td>{new Date(coupon.endDate).toLocaleDateString()}</td>
                            <td>
                                {categories.find(c => c.categoryId === coupon.categoryId)?.categoryName || 'No category'}
                            </td>
                            <td>
                                <button
                                    onClick={() => editCoupon(coupon)}
                                    className="btn-default mr-1"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteCoupon(coupon)}
                                    className="btn-red">Delete</button>
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
    <Coupons swal={swal} />
));