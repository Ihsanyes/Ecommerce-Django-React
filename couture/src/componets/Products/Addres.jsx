import React, { useEffect, useState } from 'react';
import './Addres.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../auth/Axios_instance';
import { MdDeleteSweep } from "react-icons/md";

function Addres() {
    const [postAoutAddress, setPostAoutAddress] = useState([]);
    const [recentAddress, setRecentAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

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

    const location = useLocation();
    const itemCount = location.state?.itemCount || 0;
    const totalPrice = location.state?.totalPrice || 0;

    // Fetch address list
    const displayAddress = async () => {
        try {
            const response = await axiosInstance.get(`get_address/`);
            setRecentAddress(response.data.slice(-1)); // Get last 3 addresses
        } catch (error) {
            console.log(error);
        }
    };

    // Get city/state info from pin code
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
                    country: postOffice.Country || "India",
                }));
                setPostAoutAddress(data.PostOffice);
            } else {
                console.log("Invalid PIN Code");
            }
        } catch (error) {
            alert("Network error");
        }
    };

    // Submit new address
    const addDeliveryAddress = async () => {
        try {
            const response = await axiosInstance.post(`delivery_address/`, address);
            console.log("Saved:", response.data);
            displayAddress(); // Refresh recent addresses
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.detail || "Failed to save address.");
        }
    };

    // Checkbox address selector
    const handleSelect = (item, index) => {
        setSelectedIndex(index);
        setSelectedAddress(item);
        setAddress({
            full_name: item.full_name,
            pin_code: item.pin_code,
            country: item.country,
            phone_number: item.phone_number,
            house_address: item.house_address,
            street_address: item.street_address,
            landmark: item.landmark,
            city: item.city,
            state: item.state
        });
    };

    // Load recent addresses only once
    useEffect(() => {
        displayAddress();
    }, []);

    // Trigger pin code fetch
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
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const { full_name, pin_code, phone_number, house_address, street_address } = address;
                                if (!full_name || !pin_code || !phone_number || !house_address || !street_address) {
                                    alert("Please fill all required fields.");
                                    return;
                                }
                                addDeliveryAddress();
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={address.full_name}
                                onChange={(e) => setAddress({ ...address, full_name: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                value={address.pin_code}
                                onChange={(e) => setAddress({ ...address, pin_code: e.target.value })}
                                pattern="\d{6}"
                                required
                            />
                            <div className="input_numer_contry">
                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={address.country}
                                    readOnly
                                />
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={address.phone_number}
                                    onChange={(e) => setAddress({ ...address, phone_number: e.target.value })}
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Flat, House no, Building, Company, Apartment"
                                value={address.house_address}
                                onChange={(e) => setAddress({ ...address, house_address: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Area, Street, Sector, Village"
                                value={address.street_address}
                                onChange={(e) => setAddress({ ...address, street_address: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Landmark"
                                value={address.landmark}
                                onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                            />
                            <div className="input_city_state">
                                <input
                                    type="text"
                                    placeholder="Town/City"
                                    value={address.city}
                                    readOnly
                                />
                                <input
                                    type="text"
                                    placeholder="State"
                                    value={address.state}
                                    readOnly
                                />
                            </div>

                            <button type="submit" className="address_btn">Save Address</button>

                            <h3 style={{ textAlign: 'center' }}>Recent Addresses</h3>
                            {recentAddress.map((x, index) => (
                                <button
                                    type="button"
                                    key={index}
                                    onClick={() => handleSelect(x, index)}
                                    className={`option_address ${selectedIndex === index ? 'selected' : ''}`}
                                >
                                    {x.full_name} 
                                    <span style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <input
                                            type="checkbox"
                                            hidden
                                            checked={selectedIndex === index}
                                            readOnly
                                            style={{
                                                marginBlock: '0px',
                                                accentColor: 'green',
                                                borderRadius: '40px',
                                                width: '14px',
                                                height: '14px'
                                            }}
                                        />
                                    </span>
                                    <span style={{width:'20px',height:'20px'}}>< MdDeleteSweep onClick={async()=>{
                                        await axiosInstance.get(`delete_delivery_address/${x.id}`)
                                        displayAddress();
                                    }} style={{width:'20px',height:'20px'}} ></MdDeleteSweep></span>
                                </button>
                            ))}
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
                        <div className="upi_btn">
                            <input type="checkbox" /> UPI
                        </div>
                        <div className="upi_btn">
                            <input type="checkbox" /> Cash on Delivery
                        </div>
                        <button className="order_btn">Place Order</button>
                    </div>
                </div>
            </div>

            {/* {selectedAddress && (
                <div className="selected_address_details">
                    <h3>Selected Address</h3>
                    <p>{selectedAddress.full_name}</p>
                    <p>{selectedAddress.house_address}, {selectedAddress.street_address}</p>
                    <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pin_code}</p>
                    <p>{selectedAddress.phone_number}</p>
                </div>
            )} */}
        </>
    );
}

export default Addres;
