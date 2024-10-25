import { createContext } from "react";

const SupabaseContext = createContext({
    user: null,
    loggedIn: false,
    supabase: {},
    checkUserLogin: {},
    guestLogin: async () => {},
    login: async () => {},
    logout: async () => {},
    register: async () => {},
    getUsers: async () => {},
    getAllProducts: async () => {},
    getProductItem: async () => {},
})

export default SupabaseContext;