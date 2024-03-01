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
app.post('/submit',(req,res)=>{
   const{name,email,subject,message} = req.body;
 console.log(email);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,  // Your Gmail email address
        pass: process.env.PASSWORD       // Your Gmail password or app-specific password
    }
    
});
const mailOptions = {
    from: email, // Sender's email address
    name:name,   
    to: process.env.USER,     // Recipient's email address
    subject: subject,
    text: message,
};


transporter.sendMail(mailOptions, (error, info) => {
    
    if (error) {
        console.error('Error sending email:', error);
    } else {
       
        res.render('index.ejs',{message:"✅Email send Successfully"})
    }
});
})

 app.listen(port,()=>{
     console.log(`listening on ${port}`);
 })