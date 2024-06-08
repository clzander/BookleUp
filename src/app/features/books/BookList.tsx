//import { useDispatch, useSelector } from "react-redux"
//import type { RootState } from "../../store"
import { useEffect } from "react";
//import { fetchBooks } from "./booksSlice";
//import type { UnknownAction, ThunkDispatch } from "@reduxjs/toolkit";
import Book from "../../../components/Book";
import useBooks from "../../../domain/hooks";

export default function BookList() {
    //const dispatch: ThunkDispatch<RootState, undefined, UnknownAction> = useDispatch();
    //const books = useSelector((state: RootState) => state.books.books);
    //const bookStatus = useSelector((state: RootState) => state.books.status);
    //const error = useSelector((state: RootState) => state.books.error);

    const { books, state, error, refresh } = useBooks();

    useEffect(() => {
        const interval = setInterval(() => {
            refresh();
        }, 60000); // 60 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [refresh]);

    //useEffect(() => {
    //    if (bookStatus === 'idle') {
    //        dispatch(fetchBooks());
    //    }
    //}, [bookStatus, dispatch]);

    return (
        <div>
            {state === 'loading' && <p>Loading books….</p>}
            {state === 'error' && <p>Error: {error?.message}</p>}
            {state === 'success' && (
                <div className="grid grid-cols-2 gap-x-8 gap-y-8 m-8">
                    {books.map((book) => (
                        <Book key={book.isbn} book={book} />
                    ))}
                </div>
            )}
        </div>
    )
}