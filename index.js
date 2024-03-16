import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import 'dotenv/config';
const app = express();
import ServerlessHttp from 'serverless-http';
import router  from 'express';


const port = process.env.PORT||3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get('/',(req,res)=>{
    res.render('index.ejs');
})
app.post('/submit',async (req,res)=>{
   const{name,email,subject,message} = req.body;


const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.USER,  // Your Gmail email address
        pass: process.env.PASSWORD       // Your Gmail password or app-specific password
    }

    
});
const info = await transporter.sendMail({
    from: email, // sender address
    to: "sanjubora84@gmail.com", // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
 
  });


  console.log("Message sent: %s", info.messageId);
})

 app.listen(port,()=>{
     console.log(`listening on ${port}`);
 })