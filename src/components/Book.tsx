import { useState } from "react";
import type { Book as BookType } from "../utils/interfaces";
import { useNavigate } from "react-router";
import { useStore } from "../domain/store";

interface BookProps {
	book: BookType;
	refresh: () => void;
	deleteBook: (id: string) => void;
}

export default function Book({ book, refresh, deleteBook }: BookProps) {
	const isAdmin = useStore(state => state.isAdmin);
	const addToBasket = useStore(state => state.addToBasket);
	const [likes, setLikes] = useState<number>(0);
	const navigate = useNavigate();

	return (
		<div className="card card-side bg-accent shadow-xl">
			{book.cover && (
				<figure className="w-64 overflow-visible">
					<img
						className="flex justify-center items-center w-64"
						src={book.cover}
						alt={book.title}
					/>
				</figure>
			)}
			{!book.cover && <p className="w-64 m-auto text-center">No Image</p>}
			<div className="card-body">
				<div className="flex justify-between text-right">
					<button
						type="button"
						className="card-title hover:underline"
						onClick={() => navigate(book.id)}
					>
						{book.title}
					</button>
					{isAdmin && (
						<div className="flex gap-2">
							<button
								type="button"
								className="btn btn-square"
								onClick={() => navigate(`${book.id}/edit`)}
							>
								<img alt="Edit" src="edit.svg" className="w-6" />
							</button>
							<button
								type="button"
								className="btn btn-square"
								onClick={() => navigate(`${book.id}/delete`)}
							>
								<img alt="Delete" src="delete.svg" className="w-6" />
							</button>
							<dialog id={`delete_modal_${book.id}`} className="modal">
								<div className="modal-box">
									<h3 className="font-bold text-lg text-left">
										Do you really want to delete this book?
									</h3>
									<div className="modal-action">
										<form method="dialog" className="flex gap-2">
											{/* if there is a button in form, it will close the modal */}
											<button className="btn" type="submit">
												Cancel
											</button>
											<button
												className="btn btn-error"
												type="submit"
												onClick={() => {
													deleteBook(book.id);
													refresh();
												}}
											>
												Delete
											</button>
										</form>
									</div>
								</div>
							</dialog>
						</div>
					)}
				</div>

				<p>{book.subtitle}</p>
				<p>Author: {book.author}</p>
				<p>Publisher: {book.publisher}</p>
				<div className="card-actions">
					<p className="text-xl font-extrabold mt-2">{book.price}</p>
					<button
						type="button"
						disabled={isAdmin}
						className="btn w-32"
						onClick={() => setLikes(likes + 1)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="black"
							viewBox="0 0 24 24"
							stroke=""
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
							<title>Heart Icon</title>
						</svg>
						{likes} {likes === 1 ? "Like" : "Likes"}
					</button>
					<button
						type="button"
						disabled={isAdmin}
						className="btn btn-primarsy"
						onClick={() => addToBasket(book)}
					>
						Buy
					</button>
				</div>
			</div>
		</div>
	);
}
