//EXEMPLO
// import db from "../db.js";
// import bcrypt from "bcrypt";
// import {v4 as uuid} from "uuid";

// export async function signIn(req, res) {
//     const user = req.body;
//     try {
//         const userData = await db.collection("users").findOne({email: user.email});

//         if (userData && bcrypt.compareSync(user.password, userData.password)) {
//             const token = uuid();
//             await db.collection("sessions").insertOne({token, userId: userData._id});
//             return res.send(token);
//         }
//         res.status(401).send("Unauthorized! Email or password is incorrect.");
//     } catch(e) {
//         res.sendStatus(500);
//     }
// }

//OUTROS CONTROLLERS, EXEMPLO: userControllers.