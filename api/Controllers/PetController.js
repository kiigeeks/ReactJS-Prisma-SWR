import { sendData, sendResponse } from "../Helpers/Response.js"
import { PrismaClient } from "@prisma/client"
import { createSlug } from "../Helpers/Sluggable.js"
import path from 'path'
import fs from 'fs'

const prisma = new PrismaClient()

export const getPets = async (req, res) => {
    try {
        const pets = await prisma.pets.findMany({
            include: {
                category: true,
            }
        })
        sendData(200, pets, "Successfully get all pets", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

export const getPetBySlug = async (req, res) => {
    try {
        const pet = await prisma.pets.findUnique({
            where: {
                slug: req.params.slug,
            }
        })
        
        sendData(200, pet, "Successfully get pet", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

export const addPet = (req, res) => {
    try {
        const {title, desc, categoryId} = req.body
        const slug = createSlug(title);
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const url = `${fileName}`;

        //validation type file
        const allowedType = ['.png', '.jpg', '.jpeg'];
        if(!allowedType.includes(ext.toLocaleLowerCase())) return sendResponse(422, "File must be image with extension png, jpg, jpeg", res)
        
        //validation size file max 5mb
        if(fileSize > 5000000) return sendResponse(422, "Image must be less than 5 mb", res)
        
        file.mv(`./public/images/${fileName}`, async (err) => {
            //validation process upload file to server
            if(err) return sendResponse(502, err.message, res)
            
            await prisma.pets.create({
                data: {
                    title: title,
                    slug: slug,
                    desc: desc,
                    photos: url,
                    categoryId: Number(categoryId),
                }
            })
        })

        sendResponse(201, "Successfully added pet", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

export const updatePet = async (req, res) => {
    try {
        const pet = await prisma.pets.findUnique({
            where: {
                slug: req.params.slug,
            }
        })

        if(!pet) return sendResponse(404, "Pet Not Found", res)
        let fileName = "";

        if(req.files === null) {
            fileName = pet.flyer;
        }else{
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;

            //validation type file
            const allowedType = ['.png', '.jpg', '.jpeg'];
            if(!allowedType.includes(ext.toLocaleLowerCase())) return sendResponse(422, "File must be image with extension png, jpg, jpeg", res)
            
            //validation size file max 5mb
            if(fileSize > 5000000) return sendResponse(422, "File maximum 5mb", res)
            
            const filePath = `./public/images/${pet.photos}`;
            fs.unlinkSync(filePath, async(err) => {
                if(err) return sendResponse(500, err.message, res);
            });
            file.mv(`./public/images/${fileName}`, (err) => {
                if(err) return sendResponse(502, err.message, res)
            });
        }

        const {title, desc } = req.body;
        const photos = fileName;

        //chek slug & update slug
        let slugNew = "";
        let i = 0;
        while(i < 1 ){
            slugNew = createSlug(title);
            const response = await prisma.pets.findUnique({
                where: {
                    slug: slugNew
                }
            });
            if (!response){
                i++;
            }
        }

        await prisma.pets.update({
            where: {
                slug: req.params.slug
            },
            data: {
                title: title,
                slug: slugNew,
                desc: desc,
                photos: photos
            }
        });

        sendResponse(201, "Successfully updated pet", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

export const deletePet = async (req, res) => {
    try {
        const pet = await prisma.pets.findUnique({
            where: {
                slug: req.params.slug,
            }
        })

        if(!pet) return sendResponse(404, "Pet Not Found", res)

        const filePath = `./public/images/${pet.photos}`;
        fs.unlinkSync(filePath, async(err) => {
            if(err) return sendResponse(500, err.message, res);
        });

        await prisma.pets.delete({
            where:{
                slug: req.params.slug,
            }
        })

        sendResponse(200, "Successfully deleted pets", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}