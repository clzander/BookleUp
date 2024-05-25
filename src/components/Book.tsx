import { useContext, useState } from "react";
import { Book as BookType } from "../utils/interfaces";
import { BasketContext } from "../contexts/BasketContext";

interface BookProps {
    book: BookType
}

export default function Book({ book }: BookProps) {
    const basketContext = useContext(BasketContext);
    const [likes, setLikes] = useState<number>(0);

    return (
        <div className="card card-side bg-accent shadow-xl">
            <figure className="w-64 overflow-visible"><img className="flex justify-center items-center w-64" src={book.cover} alt="No Image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <p>{book.subtitle}</p>
                <p>Author: {book.author}</p>
                <p>Publisher: {book.publisher}</p>
                <div className="card-actions">
                    <p className="text-xl font-extrabold mt-2">{book.price}</p>
                    <button
                        className="btn w-32"
                        onClick={() => setLikes(likes + 1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="black" viewBox="0 0 24 24" stroke=""><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        {likes} {likes === 1 ? "Like" : "Likes"}
                    </button>
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