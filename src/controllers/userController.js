import db from "./../db.js";

export default async function getCategories(_req, res) {
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