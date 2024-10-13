import { createContext } from "react";

const SupabaseContext = createContext({
    user: null,
    loggedIn: false,
    supabase: {},
    checkUserLogin: {},
    login: async () => {},
    logout: async () => {},
    register: async () => {},
    getUsers: async () => {}
})

export default SupabaseContext;