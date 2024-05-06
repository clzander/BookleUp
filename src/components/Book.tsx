import { useContext } from "react";
import { Book as BookType } from "../utils/interfaces";
import { BasketContext } from "../contexts/BasketContext";

interface BookProps {
    book: BookType
}

export default function Book({ book }: BookProps) {
    const basketContext = useContext(BasketContext);

    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure className="hidden sm:block"><img className="hidden sm:block" src={book.cover} alt="Cover" /></figure>
            <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <p>{book.subtitle}</p>
                <p>Author: {book.author}</p>
                <p>Publisher: {book.publisher}</p>
                <p>{book.price}</p>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-primarsy"
                        onClick={() => basketContext.addToBasket(book)}
                    >
                        Buy
                    </button>
                </div>
            </div>
        </div>
    )
}