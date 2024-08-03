# BookleUp
"BookleUp" is my little online bookstore that has to be implemented in a frontend development course at university.

## Description
As I said, the project is a small webshop for buying books. It will be developed using React and TypeScript in the frontend, as well as some other libraries like ReactRouter for CSR and at least one library for styling, but I haven't decided yet what I will use. The shop will definitely need some state management, so Redux and Contexts are at our service.

We won't be developing the backend, instead we'll be using the [bookmonkey api](https://github.com/workshops-de/bookmonkey-api), which has typical CRUD operations for both books and users. Since the focus of this course is on the frontend, this makes things a bit easier.

## Installation and Running
1. Clone the repo as usual
2. `cd` into the directory and run `npm install`
3. You can start the frontend with `npm run dev` (use `npm run dev -- --open` if your browser should automatically open the app in a new tab)
4. For a fully working setup, you need to install the bookmonkey-api. This is easiestly done with `npm install -g bookmonkey-api`
5. Start the bookmonkey with the command `bookmonkey`
6. If you now open `localhost:5137` in your browser, you should see the app.

PS:_If you had any problems with the bookmonkey-api, please visit the offical GitHub-Repository [here](https://github.com/workshops-de/bookmonkey-api)_

