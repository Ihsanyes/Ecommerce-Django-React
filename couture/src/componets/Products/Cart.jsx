import React, { useEffect, useState } from 'react'
import './Cart.css'
import { API_URL } from '../../Api_urls'
import axiosInstance from '../auth/Axios_instance'
import GoBack from '../Navbar/goBack'
import { useNavigate, Link } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";


function Cart() {
    const [cartItems, setCartItems] = useState([])
    console.log(cartItems.length)//--------------------- for checking the length of cart items
    console.log((cartItems))

    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    const getCart = async () => {
        try {
            const response = await axiosInstance.get(`O/get_cart/`)
            setCartItems(response.data.cart_items)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getCart() }, [])

    const totalPrice = cartItems.reduce((acc, item) => {
        const discountedPrice = item.price - (item.price * item.discount_off / 100);
        return acc + discountedPrice * item.quantity;
    }, 0);
    // discount_price = cartItems.discount_off
    // console.log(discount_price)

    return (
        <>
            <div className='cart-container'>
                <div className="cards">
                    <div className='goback' style={{
                        border: ' rgb(0, 0, 0) solid 2px',
                        fontSize: '30px',
                        height: '35px',
                        width: '50px',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        borderRadius: '15px',
                        margin: '0px 10px 10px 20px',
                        paddingTop: '5px'
                    }} ><p onClick={goBack}><MdOutlineKeyboardBackspace /></p></div>
                    {cartItems.map((x) => (
                        
                            <Link key={x.id} to={`/product_detail/${x.product_id}`}>

                                <div className="cart-main">
                                    <div className="cart-card">
                                        <img src={`${API_URL}${x.image}`} alt="nnnam" className="cart-product-img" />
                                        <div className="cart-product-info">
                                            <p className="cart-product-brand"><span className='brand'>Brand</span> {x.brand}</p>
                                            <p className="cart-product-name">{x.product_name}</p>
                                            <p className="cart-product-price"><span className='mrp'>MRP:</span> <span className='offer-price'>₹{x.price - (x.price * x.discount_off / 100).toFixed(0)}</span>  <span className='first-price'>₹{x.price}</span> <span className='off'>{x.discount_off}% off</span></p>
                                            <p className="cart-product-size"><span className='cart-size'>Size: </span>{x.size}</p>
                                        </div>
                                        <div className="cart-price-container">
                                            <div className="cart-price">
                                                <p>Quntity: {x.quantity}</p>
                                                <hr />
                                                <p>Price: ₹{(x.price - (x.price * x.discount_off / 100).toFixed(0)) * x.quantity}</p>
                                            </div>
                                            <p className='delete-btn' onClick={(() => {
                                                const deleteCart = async () => {
                                                    try {
                                                        const response = await axiosInstance.delete(`O/delete_cart/${x.id}/`)
                                                        console.log(response.data)
                                                        getCart()
                                                    } catch (error) {
                                                        console.log(error)
                                                    }
                                                }
                                                deleteCart()
                                            })}>Delete</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        

                    ))}

                </div>
                <div className="total-main">
                    <div className="total-price">
                        <p>total: ₹{totalPrice.toFixed(0)}</p>
                    </div>
                    <div className="proceed-btn">
                        <p onClick={(() => { navigate('/address',{state:{itemCount:cartItems.length,totalPrice}}) })}>Proceed to Buy</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart