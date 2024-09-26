import { createContext } from "react";

const SupabaseContext = createContext({
    supabase: {},
    register: async () => {},
    getUsers: async () => {}
})

export default SupabaseContext;