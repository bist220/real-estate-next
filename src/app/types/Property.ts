export default interface Property {
    id: string,
    // slug: string,
    name: string,
    builder: string,
    price: number,
    location: string,
    description: string,
    images: string,
    owner_id: string,
    created_at: number,
    updated_at: number
}

export interface UpdatePropertyRequest {
    id?: string | undefined,
    // slug: string,
    name: string,
    builder?: string | undefined,
    price: number,
    location?: string | undefined,
    description?: string | undefined,
    images?: string | undefined,
    updated_at?: number | undefined
}

export interface CreatePropertyRequest {
    // id: string,
    // slug: string,
    name: string,
    builder?: string | undefined,
    price: number,
    location?: string | undefined,
    description?: string | undefined,
    images?: string | undefined
}

export interface PropertyResponse {
  property: Property
}