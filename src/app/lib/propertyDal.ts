// import z from "zod";
import { d1Run } from "./db";
// import Property, { CreatePropertyRequest, UpdatePropertyRequest } from "../types/Property";
import { CreatePropertyRequest, UpdatePropertyRequest } from "../types/Property";
import { v4 as uuidv4 } from 'uuid';
// import { propertyUpdateSchema } from "./validators";

// export default interface Property {
//     id: string,
//     slug: string,
//     name: string,
//     builder: string,
//     price: number,
//     location: string,
//     description: string,
//     images: string,
//     owner_id: string,
//     created_at: number
// }

// export interface PropertyUpdateRequest {
//     id: string,
//     slug: string,
//     name: string,
//     builder: string,
//     price: number,
//     location: string,
//     description: string,
//     images: string
// }



// export async function createProperty(body: unknown, id: string) {
export async function createProperty(property: CreatePropertyRequest, userId: string) {
    if (!userId) {
        throw new Error("invalid user Id");
    }
    if (!property) {
        throw new Error("Invalid property data");
    }

    const insertProductQuery = `INSERT INTO properties (id, name, builder, price, location, description, images, owner_id, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // const property = updateSchema.parse(property);
    const propId = uuidv4();
    await d1Run(
        insertProductQuery,
        [
            propId,
            property.name,
            property.builder || "",
            property.price,
            property.location || "",
            property.description || '',
            property.images || '',
            userId,
            new Date().getTime(),
            new Date().getTime()
        ]);
}

export async function updateProperty(property: UpdatePropertyRequest, propId: string) {
    // const parsed = propertyUpdateSchema.parse(property);
    if (!propId) {
        throw new Error("invalid property Id");
    }
    if (!property) {
        throw new Error("Invalid property data");
    }
    await d1Run(
        `UPDATE properties 
         SET name = ?, builder = ?, price = ?, location = ?, description = ?, images = ?, updated_at = ?
         WHERE id = ?`,
        [
            property.name,
            property.builder || "",
            property.price,
            property.location || "",
            property.description || '',
            property.images || '',
            new Date().getTime(),
            propId
        ]);
}