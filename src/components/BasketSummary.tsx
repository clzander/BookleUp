import { useNavigate } from "react-router";
import { useStore } from "../domain/store";

const BasketSummary = () => {
	const shipping = 4.99;
	const discount = 0;
	const calculateTotalCost = useStore((state) => state.calculateTotalCost);
	const navigate = useNavigate();
	const clearBasket = useStore((state) => state.clearBasket);

	return (
		<div className="p-4 rounded-md flex flex-col h-full">
			<h2 className="font-bold text-lg mb-4">Basket</h2>
			<div className="mb-2">
				<span>Items: </span>
				<span className="float-right">{calculateTotalCost().toFixed(2)} $</span>
			</div>
			<div className="mb-2">
				<span>Shipping: </span>
				<span className="float-right">{shipping.toFixed(2)} $</span>
			</div>
			<div className="mb-2">
				<input
					type="text"
					placeholder="Discount Code"
					className="w-full p-1 rounded-md"
				/>
			</div>
			<div className="flex-grow">
				<span>Discount: </span>
				<span className="float-right">-{discount.toFixed(2)} $</span>
			</div>
			<hr className="my-2" />
			<div className="font-bold text-lg">
				<span>Total: </span>
				<span className="float-right">
					{(calculateTotalCost() + 4.99).toFixed(2)} $
				</span>
			</div>
			<button
				disabled={calculateTotalCost() === 0}
				type="button"
				className="w-full mt-4 py-2 rounded-md btn"
				onClick={() => {
					clearBasket();
					navigate("/order");
				}}
			>
				Checkout
			</button>
		</div>
	);
};

export default BasketSummary;
