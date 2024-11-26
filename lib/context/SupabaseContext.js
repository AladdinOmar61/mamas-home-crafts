import { createContext } from "react";

const SupabaseContext = createContext({
    user: null,
    loggedIn: false,
    supabase: {},
    checkUserLogin: {},
    cart: [],
    setCart: () => [],
    guestLogin: async () => {},
    login: async () => {},
    logout: async () => {},
    register: async () => {},
    getUsers: async () => {},
    getAllProducts: async () => {},
    getProductItem: async () => {},
    getImages: async () => {},
})

export default SupabaseContext;