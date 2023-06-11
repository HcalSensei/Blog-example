const multer = require('multer')
const { Utils } =require('./')

class FileUpLoader{
    constructor(allowedTypes, maxCount, destination){
        const storage = multer.diskStorage({
            destination: (req, file, cb)=>{
                // Specify the destination directory where the uploaded files will be stored
                cb(null, destination);
            },
            filename:(req, file, cb)=>{
                // Specify the filename of each uploaded file
                cb(null, file.originalname);    
            }
        })

        const fileFilter= (req, file, cb)=>{
            // Check if the uploaded file type is allowed
            if(allowedTypes.includes(file.minetype)){
                cd(null, true);
            }
            else{
                cd(new Error('Invalide file type.'))
            }
        }

        this.upload = multer({storage: storage, fileFilter: fileFilter}).array('files', maxCount)
    }

    handleUpload(req, res, next){
        this.upload(req, res, (error)=>{
            if(error){
                return Utils.apiResponse(res,  Promise.resolve({
                    status: 400,
                    message: error.message,
                    data: error,
                    error: true
                }))
            }

            next();
        })
    }
}
module.exports = FileUpLoader