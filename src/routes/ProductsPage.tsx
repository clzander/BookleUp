import BookList from "../app/features/books/BookList";

export default function ProductsPage() {
    return (
        <div className="overflow-auto flex-grow">
            <BookList />
        </div>
    )
}