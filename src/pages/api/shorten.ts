import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

var TOKEN = process.env.TOKEN;

export default async function handler(req: NextApiRequest, res:NextApiResponse ){
     const URL =  req.body.url;
     const response = await axios.post('https://api-ssl.bitly.com/v4/shorten',{long_url: URL},{headers:{
        Authorization:`Bearer ${TOKEN}`,
        'Content-Type':'application/json'
     }})

     const data = response.data;
     res.send(data.link);
    

}