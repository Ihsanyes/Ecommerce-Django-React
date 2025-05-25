import React from 'react';
import './Addres.css';
// import pincode from 'india-pincode-search';
import axios from 'axios';
function Addres() {

    const getPincodeDetails = async (pincode) => {
        try {
            const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = response.data[0];

            if (data.Status === 'Success') {
                console.log(data.PostOffice); // Array of post offices
            } else {
                console.log("Invalid PIN Code");
            }
        } catch (error) {
            console.error("Error fetching PIN code data:", error);
        }
    };

    // Example usage
    getPincodeDetails("682001");
    return (
        <>
            <div className="order_container">
                <div className="address_container">
                    <div className="address_form">
                        <h2 className="address_title">Add Address</h2>
                        <form action="">
                            <input type="text" placeholder="Full Name" />
                            <input type="text" placeholder="Pin Code" />
                            <div className="input_numer_contry">
                                <input type="text" placeholder="Country" />
                                <input type="text" placeholder="Phone Number" />
                            </div>
                            <input type="text" placeholder="Flat, House no, Building, Company, Apartment" />
                            <input type="text" placeholder="Area, Street, Sector, Village" />
                            <input type="text" placeholder="Landmark" />
                            <div className="input_city_state">
                                <input type="text" placeholder="Town/City" />
                                <input type="text" placeholder="State" />
                            </div>
                            <button type="submit" className="address_btn" >Save Address</button>
                        </form>
                    </div>
                </div>
                <hr className='address_hr' />
                <div className="pay_container">
                    <div className="items_price">
                        {/* <td> */}
                        {/* <tr>ff</tr> */}
                        {/* <table >
                            <th style={{'border':"solid 1px"}}>
                                <tr style={{'border':"solid 1px"}}>ff</tr>
                                <td style={{'border':"solid 1px"}}>ff</td>
                            </th>
                            <th style={{'border':"solid 1px"}}>
                                <tr>ff</tr>
                                <td>ff</td>
                            </th>
                        </table> */}
                        {/* </td> */}
                        <div className="order_items">
                            <p >Items</p>
                            <p >5</p>
                        </div>
                        <hr />
                        <div className="order_price">
                            <p >Total Price</p>
                            <p >500000</p>
                        </div>
                    </div>
                    <div className="upi_order_btns">
                        <div type='checkbox' className="upi_btn">
                            <input type="checkbox" name="" id="" />UPI
                        </div>
                        <div type='checkbox' className="upi_btn">
                            <input type="checkbox" name="" id="" />Cash on Delivery
                        </div>
                        <button className="order_btn">Place Order</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Addres;
