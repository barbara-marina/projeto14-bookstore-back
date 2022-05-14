import db from "./../db.js";

export async function getCategories(_req, res) {
    const books = await db.collection("Books").find().toArray();
    let categories = [];
    books.forEach(book => {
        book.genero.forEach(genre => {
            if (!(categories.includes(genre))) {
                categories.push(genre);
            }
        });
        
    });
    res.send(categories);
}

export async function getBooksData(_req, res) {
    const books = await db.collection("Books").find().toArray();
    res.send(books);
}