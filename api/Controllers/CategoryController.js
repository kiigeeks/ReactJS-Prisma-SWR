import { sendData, sendResponse } from "../Helpers/Response.js"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getCategories = async (req, res) => {
    try {
        const categories = await prisma.categories.findMany();
        sendData(200, categories, "Successfully get all categories", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await prisma.categories.findUnique({
            where: {
                //convert string id to int
                id: Number(req.params.id),
            }
        })
        sendData(200, category, "Successfully get category", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

export const addCategory = async (req, res) => {
    try {
        const { name } = req.body
        await prisma.categories.create({
            data: {
                name: name
            }
        })
        sendResponse(201, "Successfully added category", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

export const updateCategory = async (req, res) => {
    try {
        await prisma.categories.update({
            where: {
                //convert string id to int
                id: Number(req.params.id),
            },
            data: {
                name: req.body.name,
            },
        })
        
        sendResponse(200, "Successfully updated category", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}

export const deleteCategory = async (req, res) => {
    try {
        await prisma.categories.delete({
            where: {
                //convert string id to int
                id: Number(req.params.id),
            }
        })

        sendResponse(200, "Successfully deleted category", res)
    } catch (error) {
        sendResponse(500, error.message, res)
    }
}