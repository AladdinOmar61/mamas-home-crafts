import { createContext } from "react";

const SupabaseContext = createContext({
    user: "",
    loggedIn: false,
    supabase: {},
    login: async () => {},
    register: async () => {},
    getUsers: async () => {}
})

export default SupabaseContext;