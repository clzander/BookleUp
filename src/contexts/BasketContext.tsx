import { ReactNode, createContext, useState } from "react"
import { Basket, BasketItem, Book } from "../utils/interfaces"

interface BasketContextType {
    updateBasket: () => void
    addToBasket: (book: Book) => void
    //updateProductInBasket: (isbn: string, quantity: number) => void
    //removeFromBasket: (isbn: string) => void
    basket: Basket
}

export const BasketContext = createContext<BasketContextType>({
    updateBasket: () => { },
    addToBasket: () => { },
    //updateProductInBasket: () => {},
    //removeFromBasket: () => { },
    basket: { totalCost: 0, items: [] }
});

interface BasketContextProviderProps {
    children: ReactNode
}

export default function BasketContextProvider({ children }: BasketContextProviderProps) {
    const [basket, setBasket] = useState<Basket>({ totalCost: 0, items: [] });

    async function updateBasket() {
    }

    async function addToBasket(book: Book) {
        const addedBookPrice: number = parseFloat(book.price.replace('$', ''));

        const sameProduct = basket.items.find((item) => item.item.isbn === book.isbn);

        let newBasket: Basket;

        if (sameProduct === undefined) {
            const newBasketItem: BasketItem = {
                item: book,
                quantity: 1,
                itemPrice: addedBookPrice,
            }

            newBasket = {
                totalCost: parseFloat((basket.totalCost + addedBookPrice).toFixed(2)),
                items: [...basket.items, newBasketItem]
            }
        } else {
            sameProduct.quantity += 1;
            sameProduct.itemPrice += addedBookPrice;

            newBasket = {
                totalCost: parseFloat((basket.totalCost + addedBookPrice).toFixed(2)),
                items: [...basket.items]
            }
        }
        
        setBasket(newBasket);
    }

    //async function updateProductInBasket(isbn: string, quantity: number) {
    //}

    //async function removeFromBasket(isbn: string) {
    //}

    return (
        <BasketContext.Provider value={{
            updateBasket,
            addToBasket,
            //updateProductInBasket,
            //removeFromBasket,
            basket
        }}>
            {children}
        </BasketContext.Provider>
    );
}