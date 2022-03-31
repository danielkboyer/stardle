// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  names: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  var coffeeRes = await fetch('https://developers.buymeacoffee.com/api/v1/supporters?all',{
          
    method:'GET',
    cache:'no-cache',
    headers: new Headers({
      'Accept':'application/json',
      'Content-Type':'application/json',
      "Authorization": "Bearer "+process.env.BUY_ME_A_COFFEE_READ,
      "User-Agent":"Stardle"
    })
  }).then(data => data.json()).catch(reason =>{
    console.log("Could not load Supporters: "+reason);
    return JSON.parse('{"current_page":1,"data":[{"support_id":1926541,"support_note":null,"support_coffees":1,"transaction_id":"pi_3KijqzJEtINljGAa0oi0QfBN","support_visibility":1,"support_created_on":"2022-03-29 18:33:19","support_updated_on":"2022-03-29 18:33:19","transfer_id":null,"supporter_name":"Matthew Berry","support_coffee_price":"5.0000","support_email":null,"is_refunded":null,"support_currency":"USD","referer":"https:\/\/www.stardle.app\/","country":"US","order_payload":null,"support_hidden":0,"payer_email":"matthewberry160@yahoo.com","payment_platform":"stripe","payer_name":"Matthew"}],"first_page_url":"https:\/\/developers.buymeacoffee.com\/api\/v1\/supporters?page=1","from":1,"last_page":1,"last_page_url":"https:\/\/developers.buymeacoffee.com\/api\/v1\/supporters?page=1","next_page_url":null,"path":"https:\/\/developers.buymeacoffee.com\/api\/v1\/supporters","per_page":5,"prev_page_url":null,"to":1,"total":1}');
  });

  //var res = JSON.parse('{"current_page":1,"data":[{"support_id":1926541,"support_note":null,"support_coffees":1,"transaction_id":"pi_3KijqzJEtINljGAa0oi0QfBN","support_visibility":1,"support_created_on":"2022-03-29 18:33:19","support_updated_on":"2022-03-29 18:33:19","transfer_id":null,"supporter_name":"Matthew","support_coffee_price":"5.0000","support_email":null,"is_refunded":null,"support_currency":"USD","referer":"https:\/\/www.stardle.app\/","country":"US","order_payload":null,"support_hidden":0,"payer_email":"matthewberry160@yahoo.com","payment_platform":"stripe","payer_name":"Matthew"}],"first_page_url":"https:\/\/developers.buymeacoffee.com\/api\/v1\/supporters?page=1","from":1,"last_page":1,"last_page_url":"https:\/\/developers.buymeacoffee.com\/api\/v1\/supporters?page=1","next_page_url":null,"path":"https:\/\/developers.buymeacoffee.com\/api\/v1\/supporters","per_page":5,"prev_page_url":null,"to":1,"total":1}');

  var names = "";
  coffeeRes.data.forEach((element: { supporter_name: string; support_coffee_price: string }) => {
  
      
    
    const price = parseFloat(element.support_coffee_price);
    names+="|"+element.supporter_name+": $"+Math.round(price)+"|";
    names +=" ";

    res.status(200).json({ names: names })
});
  
}
