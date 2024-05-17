import { useContext } from "react"
import { BasketContext } from "../contexts/BasketContext"
import { useNavigate } from "react-router";

export default function BasketPage() {
    const basketContext = useContext(BasketContext);
    const navigate = useNavigate();

    return (
        <div className="flex">
            <div className="overflow-x-auto grow">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {basketContext.basket.items.map((item, index) => (
                            <tr>
                                <th>{index}</th>
                                <td>{item.item.title}</td>
                                <td>{item.quantity}</td>
                                <td>{item.itemPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="h-100 bg-blue-400 w-32">
                <p>Basket</p>
                <p>Items: </p>
                <p>Shipping: </p>
                <form>
                    <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
                </form>
                <p>Discount: -0.00$</p>
                <p>Total: </p>
                <button onClick={() => navigate("/order")}>Checkout</button>
            </div>
        </div>
    )
}