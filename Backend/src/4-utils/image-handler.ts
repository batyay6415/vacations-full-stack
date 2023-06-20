import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";

// __dirname returns current file (image-handler.ts) directory 
const imagesFolder = path.join(__dirname, "..", "1-assets", "images");

// Get image path in disk:
function getImagePath(imageName: string): string {
    return imagesFolder + "/" + imageName;
}

// Save image to disk and return image name:
async function saveImage(image: UploadedFile): Promise<string> {

    // Take original extension: 
    const extension = image.name.substring(image.name.lastIndexOf("."));

    // Create unique name: 
    const uniqueName = uuid() + extension;

    // Get absolute path:
    const absolutePath = getImagePath(uniqueName);

    // Save image: 
    await image.mv(absolutePath); // Move image to that location.

    // Return unique name:
    return uniqueName;
}

// Update image in disk (remove previous and create new):
async function updateImage(image: UploadedFile, existingName: string): Promise<string> {

    // Remove existing image: 
    await deleteImage(existingName);

    // Save new image: 
    const uniqueName = await saveImage(image);

    // Return unique name:
    return uniqueName;
}

// Delete image from disk:
async function deleteImage(imageName: string): Promise<void> {

    try {
        // If no image sent:
        if (!imageName) return;

        // Get absolute path:
        const absolutePath = getImagePath(imageName);

        // Delete image:
        await fsPromises.unlink(absolutePath);
    }
    catch (err: any) {
        console.error(err.message);
    }

}

export default {
    getImagePath,
    saveImage,
    updateImage,
    deleteImage
};


