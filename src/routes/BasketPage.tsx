import BasketSummary from "../components/BasketSummary";
import { useStore } from "../domain/store";

export default function BasketPage() {
	const basket = useStore((state) => state.basket);
	const calculateTotalCost = useStore((state) => state.calculateTotalCost);
	const removeFromBasket = useStore((state) => state.removeFromBasket);

	return (
		<div className="flex p-8 flex-grow">
			<div className="w-2/3">
				<div className="overflow-x-auto grow mr-16">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th>Title</th>
								<th>Quantity</th>
								<th>Price</th>
								<th>Remove</th>
							</tr>
						</thead>
						<tbody>
							{basket.map((item) => (
								<tr key={item.book.isbn}>
									<td>{item.book.title}</td>
									<td>{item.quantity}</td>
									<td>{item.book.price}</td>
									<td>
										<button
											type="button"
											className="btn"
											onClick={() => removeFromBasket(item.book.isbn)}
										>
											<img
												src="trash.svg"
												alt="Trash Bin"
												className="w-6 h-6"
											/>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="w-1/3">
				<BasketSummary/>
			</div>
		</div>
	);
}
