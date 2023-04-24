import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";


// To get path of file of images 
const imagesFolder = path.join(__dirname , "..", "1-assets", "images");

//Get path for each image
function getImagePath(imageName: string): string {
    return imagesFolder + "/" + imageName;

}

//Save image to disk and return image name : by uuid - i go to disk so it is async
async function saveImage(image: UploadedFile): Promise<string>{

    //Take original - I want to save original - name
    const extension = image.name.substring(image.name.lastIndexOf("."));

    //Create unique uuid - name:- so i get new name with extension
    const uniqueName = uuid() + extension;

    //Get absolute path:
    const absolutePath = getImagePath(uniqueName);

    //Save Image:
    await image.mv(absolutePath);//Move image to that location 

    //Return new name and save that to path
    return uniqueName ;

}

//Update image in disk (remove previous and create new)
async function updateImage(image: UploadedFile, existingImage: string ): Promise<string>{

    //I delete the last image from disk by name of uuid
    await deleteImage(existingImage);

    //Create new uuid name of image after i get file of image 
    const uniqueName = saveImage(image);

    //Return new name of image
    return uniqueName;
}


//Delete image from disk - when I get new image from user - give me the name of last image ang i delete this
//it can be crash - so i use try-catch 

async function deleteImage(imageName: string): Promise<void>{

    try{
        //If not ImageName send:
        if(!imageName) return;

        //Get absolute path:- I get full name of Image 
        const absolutePath = getImagePath(imageName);

        //Delete Image from disk- fspromises use by file:
        await fsPromises.unlink(absolutePath);
    }
    catch(err:any){
        console.log(err.message);
        
    }
    
}

export default{
    getImagePath,
    saveImage,
    deleteImage,
    updateImage
}; 