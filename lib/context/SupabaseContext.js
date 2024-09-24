import { createContext } from "react";

const SupabaseContext = createContext({
    supabase: {},
    getUsers: async () => {}
})

export default SupabaseContext;