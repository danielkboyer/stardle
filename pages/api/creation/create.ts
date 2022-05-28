// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getNames } from '../../../lib/creator';
import { getDate } from '../../../lib/stars'
const fs = require('fs');
var AWS = require('aws-sdk')
AWS.config.update(
    {
      accessKeyId: process.env.AWS_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY_PASS,
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
      const message:any="Only POST requests are allowed";
      res.status(405).send(message);
      return

    }
    if(req.body.password !== "Scorcher12!"){
      const message:any="Incorrect password ya dumb fuck";
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

    let names = (await getNames()).split("\n");
    let nameString = "";
    console.log(names);
    console.log(req.body.name.toString().trim());
    for(let x = 0;x<names.length;x++){
      let newLine = '\n';
      if(x === names.length-1){
        newLine = '';
      }
      if(names[x].substring(6).trim() === req.body.name.toString().trim()){
          names[x] = '1'+names[x].substring(1);
      }
      nameString +=names[x]+newLine;
      
    }



  // Setting up S3 upload parameters
  const nameParams = {
    Bucket: "stardlebucket",
    Key: `names.txt`, // File name you want to save as in S3
    Body: nameString
  };
    await s3.upload(nameParams, function(err: any, data: { Location: any; }) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  })



      res.status(200).send(message);
      return;
    }
    else if(req.body.command === "SKIP"){
      const message:any="SKIPPED";

      
      let names = (await getNames()).split("\n");
      console.log(`Names: ${names}`);
      console.log(`request name: ${req.body.name.toString()}`);
      let nameString = "";
      for(let x = 0;x<names.length;x++){
        let newLine = '\n';
        if(x === names.length-1){
          newLine = '';
        }
        if(names[x].substring(6).trim() === req.body.name.toString().trim()){
          
          console.log(req.body.index.toString());
          names[x] = `0 1 ${(parseInt(req.body.index.toString())+1).toString()} `+names[x].substring(6);

        }

        nameString +=names[x]+newLine;
        
      }

    // Setting up S3 upload parameters
    const nameParams = {
      Bucket: "stardlebucket",
      Key: `names.txt`, // File name you want to save as in S3
      Body: nameString
    };
      await s3.upload(nameParams, function(err: any, data: { Location: any; }) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    })

      res.status(200).send(message);
      return;
    }

    else if (req.body.command === 'DELETE'){
      const message:any = "Success in deleting";
      let names = (await getNames()).split("\n");
      console.log(`Names: ${names}`);
      console.log(`request name: ${req.body.name.toString()}`);
      let nameString = "";
      for(let x = 0;x<names.length;x++){
        let newLine = '\n';
        if(x === names.length-1){
          newLine = '';
        }
        if(names[x].substring(6).trim() === req.body.name.toString().trim()){
          
          console.log(req.body.index.toString());
          names[x] = `1 1 ${(parseInt(req.body.index.toString())+1).toString()} `+names[x].substring(6);

        }

        nameString +=names[x]+newLine;
        
      }

    // Setting up S3 upload parameters
    const nameParams = {
      Bucket: "stardlebucket",
      Key: `names.txt`, // File name you want to save as in S3
      Body: nameString
    };
      await s3.upload(nameParams, function(err: any, data: { Location: any; }) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    })

      res.status(200).send(message);
      return;
    }
    const message:any="Invalid command";
      res.status(401).send(message);
      return;
    

}
