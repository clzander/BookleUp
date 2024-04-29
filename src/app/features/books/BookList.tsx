import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { useEffect } from "react";
import { fetchBooks } from "./booksSlice";
import { UnknownAction, ThunkDispatch } from "@reduxjs/toolkit";

export default function BookList() {
    const dispatch: ThunkDispatch<RootState, undefined, UnknownAction> = useDispatch();
    const books = useSelector((state: RootState) => state.books.books);
    const bookStatus = useSelector((state: RootState) => state.books.status);
    const error = useSelector((state: RootState) => state.books.error);

    useEffect(() => {
        if (bookStatus === 'idle') {
            dispatch(fetchBooks());
        }
    }, [bookStatus, dispatch]);

    return (
        <div>
            {bookStatus === 'loading' && <span className="loading loading-spinner loading-lg"></span>}
            {books.map(book => (
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure className="hidden sm:block"><img className="hidden sm:block" src={book.cover} alt="Cover" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{book.title}</h2>
                        <p>{book.subtitle}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}