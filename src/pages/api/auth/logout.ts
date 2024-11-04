
import { deleteCookie } from 'cookies-next';


export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    switch (req.method) {
        case "POST":
            try{
                deleteCookie('auth-session')

                res.status(200).json({message: 'asdfasf'});
            }catch(err){
                res.status(422).json({ message: err.message});
            }
            break;
        default:
            res.status(404).json({message: "page not found"});
        break;
    }
}