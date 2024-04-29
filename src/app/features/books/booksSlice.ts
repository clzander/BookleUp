import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Book {
    title: string;
    subtitle: string;
    isbn: string;
    abstract: string;
    numPages: number;
    author: string;
    publisher: string;
    price: string;
    cover: string;
}

interface BookState {
    books: Book[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
}

const initialState: BookState = {
    books: [],
    status: 'idle',
    error: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await fetch(`http://127.0.0.1:4730/books`);
    return response.json();
})

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default booksSlice.reducer;