import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState([])

    const fetchMyOrder = async () => {

        try {

            const response = await fetch(
                `https://metromeals.onrender.com/api/myOrder`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem('userEmail')
                    })
                }
            );

            const res = await response.json();

            setorderData(res?.orderData?.order_data || []);

        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {

        fetchMyOrder()

    }, [])

    return (

        <div>

            <Navbar />

            <div className='container'>

                <div className='row'>

                    {
                        orderData.length > 0 ? (

                            orderData
                                .slice(0)
                                .reverse()
                                .map((item, index) => (

                                    <div key={index}>

                                        {
                                            item.map((data, i) => (

                                                data.Order_date ? (

                                                    <div
                                                        className='col-12'
                                                        key={i}
                                                    >

                                                        <div className='m-auto mt-5 text-white'>

                                                            <h4>
                                                                Order Date:
                                                            </h4>

                                                            <h5>
                                                                {data.Order_date}
                                                            </h5>

                                                            <hr />

                                                        </div>

                                                    </div>

                                                ) : (

                                                    <div
                                                        className='col-12 col-md-6 col-lg-3 d-inline-flex'
                                                        key={i}
                                                    >

                                                        <div
                                                            className="card mt-3"
                                                            style={{
                                                                width: "18rem",
                                                                maxHeight: "360px"
                                                            }}
                                                        >

                                                            <img
                                                                src={data.img}
                                                                className="card-img-top"
                                                                alt="food"
                                                                style={{
                                                                    height: "120px",
                                                                    objectFit: "cover"
                                                                }}
                                                            />

                                                            <div className="card-body">

                                                                <h5 className="card-title">

                                                                    {data.name}

                                                                </h5>

                                                                <div
                                                                    className='container w-100 p-0'
                                                                    style={{ height: "38px" }}
                                                                >

                                                                    <span className='m-1'>

                                                                        Qty: {data.qty}

                                                                    </span>

                                                                    <span className='m-1'>

                                                                        Size: {data.size}

                                                                    </span>

                                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>

                                                                        ₹{data.price}/-

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                )

                                            ))
                                        }

                                    </div>

                                ))

                        ) : (

                            <div className='text-center text-white mt-5'>

                                <h1>
                                    No Orders Found 😔
                                </h1>

                            </div>

                        )
                    }

                </div>

            </div>

        </div>

    )

}