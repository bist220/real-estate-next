/**
 * Dictionary for global App properties
 */
export type String = string

/**
 * A dictionary for message and properties translation
 */
export interface Dictionary {
  app: String
  /**
   * Dictionary for Homepage
   */
  homePage: {
    title: string
    // [k: string]: unknown
  }
  /**
   * Dictionary for authentication
   */
  auth: {
    loginTitle: string
    signupTitle: string
    name: string
    email: string
    password: string
    description: string
    loginDescription: string
    signupTDescription: string
    // [k: string]: unknown
  }
  /**
   * Dictionary for buttons and links
   */
  button: {
    createProperty: string
    login: string
    logout: string
    signup: string
    create: string
    save: string
    edit: string
    delete: string
    back: string
    cancel: string
    close: string
    // [k: string]: unknown
  }
  /**
   * Dictionary for Property schema or entity
   */
  property: {
    createPropertyPageTitle: string
    updatePropertyPageTitle: string
    name: string
    builder: string
    price: string
    location: string
    description: string
    images: string
    created_at: string
    updated_at: string
    // [k: string]: unknown
  }
//   [k: string]: unknown
}
