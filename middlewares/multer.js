const multer = require("multer");


// storage config
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null,filename)
    }
});

// filter 
const filefilter = (req,file,callback)=>{
    callback(null,true)
}

const upload = multer({
    storage:storage,
    fileFilter:filefilter
});

module.exports = upload;