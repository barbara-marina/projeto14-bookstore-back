import db from "./../db.js";

export async function getCategories(_req, res) {
    try {
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
    } catch (e) {
        return res.sendStatus(500);
    }
}

export async function getBooksData(_req, res) {
    try{
        const books = await db.collection("Books").find().toArray();
        res.send(books);
    } catch (e) {
        return res.sendStatus(500);
    }
}

export async function getCategory(req, res) {
    const categoryName = req.params.categoryName;
    try{
        const books = await db.collection("Books").find().toArray();
        const bookOfCategory = books?.filter(book => book.genero.includes(categoryName));
        res.send(bookOfCategory);
    } catch (e) {
        return res.sendStatus(500);
    }
}