import { useContext } from "react"
import { BasketContext } from "../contexts/BasketContext"

export default function BasketPage() {
    const basketContext = useContext(BasketContext);

    return (
        <div className="overflow-x-auto">
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
    )
}