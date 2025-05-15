const express = require('express');
const path = require('path');
const ImagePig = require('imagepig');

const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));

const API_KEY = 'YOUR IMAGEPIG API HERE';

async function generateImage(promptText) {
    try {
        const imagepig = ImagePig(API_KEY);
        
        const result = await imagepig.default(promptText)
        await result.save('./public/result.jpeg');
    } catch (error) {
        console.error('❌ Failed to generate image:', error.message);
    }
}

app.get("/",async (req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});

app.post("/",async(req,res)=>{
    const prompt = req.body.prompt;
    await generateImage(prompt);
    res.sendFile(path.join(__dirname,'public','result.html'));
});

app.listen(3000,()=>console.log("Server is running on port 3000"));
