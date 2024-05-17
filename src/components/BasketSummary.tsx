import { useState } from "react";

interface BasketSummaryProps {
    itemsTotal: number;
}

const BasketSummary = ({ itemsTotal }: BasketSummaryProps) => {
    const shipping = 4.99;
    const discount = 0;
    const [total, setTotal] = useState<number>(itemsTotal + 4.99);
    
    return (
        <div className="p-4 rounded-md flex flex-col h-full">
            <h2 className="font-bold text-lg mb-4">Basket</h2>
            <div className="mb-2">
                <span>Items: </span>
                <span className="float-right">{itemsTotal.toFixed(2)} $</span>
            </div>
            <div className="mb-2">
                <span>Shipping: </span>
                <span className="float-right">{shipping.toFixed(2)} $</span>
            </div>
            <div className="mb-2">
                <input type="text" placeholder="Discount Code" className="w-full p-1 rounded-md" />
            </div>
            <div className="mb-2">
                <span>Discount: </span>
                <span className="float-right">-{discount.toFixed(2)} $</span>
            </div>
            <hr className="my-2" />
            <div className="font-bold text-lg">
                <span>Total: </span>
                <span className="float-right">{total.toFixed(2)} $</span>
            </div>
            <button className="w-full mt-4 py-2 rounded-md btn">Checkout</button>
        </div>
    );
};

export default BasketSummary;
