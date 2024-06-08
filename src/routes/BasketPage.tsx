import { useContext } from "react"
import { BasketContext } from "../contexts/BasketContext"
import { useNavigate } from "react-router";
import BasketSummary from "../components/BasketSummary";

export default function BasketPage() {
    const basketContext = useContext(BasketContext);
    const navigate = useNavigate();

    return (
        <div className="flex p-8 flex-grow">
            <div className="w-2/3">
                <div className="overflow-x-auto grow mr-16">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {basketContext.basket.items.map((item) => (
                                <tr key={item.item.isbn}>
                                    <td>{item.item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.itemPrice.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-1/3">
                <BasketSummary itemsTotal={basketContext.basket.totalCost} />
            </div>
        </div>
    );
};