import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { useEffect } from "react";
import { fetchBooks } from "./booksSlice";
import { UnknownAction, ThunkDispatch } from "@reduxjs/toolkit";
import Book from "../../../components/Book";

export default function BookList() {
    const dispatch: ThunkDispatch<RootState, undefined, UnknownAction> = useDispatch();
    const books = useSelector((state: RootState) => state.books.books);
    const bookStatus = useSelector((state: RootState) => state.books.status);
    //const error = useSelector((state: RootState) => state.books.error);

    useEffect(() => {
        if (bookStatus === 'idle') {
            dispatch(fetchBooks());
        }
    }, [bookStatus, dispatch]);

    return (
        <div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 m-8">
                {bookStatus === 'loading' && <span className="loading loading-spinner loading-lg"></span>}
                {books.map((book) => (
                    <Book key={book.isbn} book={book} />
                ))}
            </div>
        </div>
    )
}