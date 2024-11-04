import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
import { setCookie  } from 'cookies-next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);

    switch (req.method) {
        case "POST":
            try{
                const body = JSON.parse(req.body)

                if( body.email == ""){
                    throw new Error('email is required')
                }

                if( body.password == ""){
                    throw new Error('password is required')
                }

                if( body.email == "admin@mail.com" && body.password == "123"){
                    setCookie(`${process.env.AUTH_COOKIE_NAME}`, 'value', { req, res, maxAge: 60 * 6 * 24 });
                }else{
                    throw new Error('invalid username and password')
                }
                // const work = await db.collection("work")
                //     .find({_id: new ObjectId(req.query.id) }).toArray(); 

                res.status(200).json({message: 'login berhasil'});
            }catch(err){
                res.status(422).json({ message: err.message});
            }
            break;
        default:
            res.status(404).json({message: "page not found"});
        break;
    }
}