// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDate } from '../../../lib/stars'
const fs = require('fs');
var AWS = require('aws-sdk')
AWS.config.update(
    {
      accessKeyId: "AKIASQVOOYCJV6J3QIYM",
      secretAccessKey: "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",
    }
  );
const s3 = new AWS.S3();

type Data = {
  names: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method !== "POST"){
      const message:any="Only POST requests are allowed"
      res.status(405).send(message)
      return

    }
    if(req.body.password !== "Scorcher12!"){
      const message:any="Incorrect password ya dumb fuck"
      res.status(401).send(message);
      return;
    }
    if(req.body.command === "PUSH"){
      const message:any="PUSHED";
      const tommorow = getDate(-1,true) as string;

      //copy star name over
      const sourcePath = `${req.body.name}/${req.body.index}/star.jpg`;
      const destinationPath = `images/${tommorow}/star.jpg`
      await s3.copyObject({
          Bucket: "stardlebucket",
          CopySource: encodeURI(`/${"stardlebucket"}/${sourcePath}`),
          Key: destinationPath,
      }).promise();

      for(let x = 1;x<7;x++){
        const sourcePath = `${req.body.name}/${req.body.index}/${x}.jpg`;
        const destinationPath = `images/${tommorow}/${x}.jpg`
        await s3.copyObject({
            Bucket: "stardlebucket",
            CopySource: encodeURI(`/${"stardlebucket"}/${sourcePath}`),
            Key: destinationPath,
        }).promise();
      }


      // Setting up S3 upload parameters
    const params = {
        Bucket: "stardlebucket",
        Key: `images/${tommorow}/name.txt`, // File name you want to save as in S3
        Body: req.body.name
    };

    // Uploading files to the bucket
    await s3.upload(params, function(err: any, data: { Location: any; }) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });



      res.status(200).send(message);
    }
    else if(req.body.command === "SKIP"){
      const message:any="SKIPPED";
      res.status(200).send(message);
    }
    const message:any="Invalid command";
      res.status(401).send(message);
      return;
    

}
