import React, { useEffect, useState } from 'react';
import './Addres.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../auth/Axios_instance';
import { API_URL } from '../../Api_urls';

function Addres() {
    const [postAoutAddress, setPostAoutAddress] = useState();
    const [address, setAddress] = useState({
        full_name: "",
        pin_code: "",
        country: "",
        phone_number: "",
        house_address: "",
        street_address: "",
        landmark: "",
        city: "",
        state: ""
    });
    const location = useLocation()
    const itemCount = location.state?.itemCount || 0; // Get item count from state or default to 0
    const totalPrice = location.state?.totalPrice || 0; // Get total price from state or default to 0
    console.log(address)
    console.log(postAoutAddress);
    // Fetch PIN code details
    const getPincodeDetails = async (pincode) => {
        try {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = response.data[0];

            if (data.Status === 'Success' && data.PostOffice.length > 0) {
                const postOffice = data.PostOffice[0];
                setAddress((prev) => ({
                    ...prev,
                    city: postOffice.District,
                    state: postOffice.State,
                    country: postOffice.Country || "India", // Default to India if Country is not provided
                }));
                setPostAoutAddress(data.PostOffice);
            } else {
                console.log("Invalid PIN Code");
            }
        } catch (error) {
            alert("Network error")
            // console.error("Error fetching PIN code data:", error);
        }
    };


    const addDeliveryAddress = async () => {
        // try {
        //     const response = await axiosInstance.post('http://127.0.0.1:8000/delivery_address/', address);
        //     console.log("Address saved successfully:", response.data);
        //     // Optionally, you can reset the address state or redirect the user
        // } catch (error) {
        //     console.error("Error saving address:", error);
        //     alert("Failed to save address. Please try again.");
        // }
        try {
            const response = await axiosInstance.post(`delivery_address/`, address)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Detect when PIN code is 6 digits
    useEffect(() => {
        if (address.pin_code.length === 6) {
            getPincodeDetails(address.pin_code);
        }
    }, [address.pin_code]);





    return (
        <>
            <div className="order_container">
                <div className="address_container">
                    <div className="address_form">
                        <h2 className="address_title">Add Address</h2>
                        <form action="" onSubmit={(e) => {
                            if (!address.full_name || !address.pin_code || !address.phone_number || !address.house_address || !address.street_address) {
                                alert("Please fill all the required fields");
                            } else {
                                e.preventDefault(); addDeliveryAddress()
                            }
                        }}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={address.full_name}
                                onChange={(e) => setAddress({ ...address, full_name: e.target.value })} />

                            <input
                                type="number"
                                placeholder="Pin Code"
                                value={address.pin_code}
                                onChange={(e) => setAddress({ ...address, pin_code: e.target.value })} />

                            <div className="input_numer_contry">
                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={address.country}
                                    readOnly />

                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={address.phone_number}
                                    onChange={(e) => setAddress({ ...address, phone_number: e.target.value })} />
                            </div>

                            <input
                                type="text"
                                placeholder="Flat, House no, Building, Company, Apartment"
                                value={address.house_address}
                                onChange={(e) => setAddress({ ...address, house_address: e.target.value })} />

                            <input
                                type="text"
                                placeholder="Area, Street, Sector, Village"
                                value={address.street_address}
                                onChange={(e) => setAddress({ ...address, street_address: e.target.value })} />

                            <input
                                type="text"
                                placeholder="Landmark"
                                value={address.landmark}
                                onChange={(e) => setAddress({ ...address, landmark: e.target.value })} />

                            <div className="input_city_state">
                                <input
                                    type="text"
                                    placeholder="Town/City"
                                    value={address.city}
                                    readOnly />

                                <input
                                    type="text"
                                    placeholder="State"
                                    value={address.state}
                                    readOnly />
                            </div>

                            <button type="submit" className="address_btn">Save Address</button>
                        </form>
                    </div>
                </div>
                <hr className='address_hr' />
                <div className="pay_container">
                    <div className="items_price">
                        <div className="order_items">
                            <p>Items</p>
                            <p>{itemCount}</p>
                        </div>
                        <hr />
                        <div className="order_price">
                            <p>Total Price</p>
                            <p>{totalPrice.toFixed(0)}</p>
                        </div>
                    </div>
                    <div className="upi_order_btns">
                        <div type='checkbox' className="upi_btn">
                            <input type="checkbox" />UPI
                        </div>
                        <div type='checkbox' className="upi_btn">
                            <input type="checkbox" />Cash on Delivery
                        </div>
                        <button className="order_btn">Place Order</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Addres;
