import Property from "./Property"

export interface PropertyList {
  page: number,
  pageSize: number,
  data: Property[]
}