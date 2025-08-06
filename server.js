import express from 'express'
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path'
// step1
const app = express();
// step4
import { v2 as cloudinary } from 'cloudinary';
import { url } from 'inspector';
// step5
cloudinary.config({ 
        cloud_name: 'dhkf9vsts', 
        api_key: '567524489656853', 
        api_secret: 'LGLUCPAzz7_BDGBdJ3mWmDXUPG4' 
    });
// step2
mongoose.connect("mongodb+srv://sameer423j:sCJUzrX60YGIRUXT@cluster0.xiks97b.mongodb.net/",{
    dbName:"ImgUplode"
}).then(()=>console.log("MongoDB is conected")).catch((err)=>console.log(err))

//step3
//rendering ejs file
app.get('/',(req , res )=>{
    res.render('index.ejs' , {url:null})
})

// step7
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
});

const upload = multer({ storage: storage })

// step8 
const imgSchema = new mongoose.Schema({
    filename:String,
    public_id:String,
    imgUrl:String
})
// step9
const File = mongoose.model("cloudinry" , imgSchema)
// step6
app.post('/upload', upload.single('file'), async (req, res, )=> {

    const file = req.file.path

    const cloudniryres = await cloudinary.uploader.upload(file , {
        foldername:"NodejsCourse"
    })

    const db = await File.create({
        filename:file.originalname,
        public_id:cloudniryres.public_id,
        imgUrl:cloudniryres.secure_url,
    });
    res.render("index.ejs" , {url:cloudniryres.secure_url})
})

const port = 2000;
app.listen(port,()=>console.log(`server is runing on port ${port}`))
