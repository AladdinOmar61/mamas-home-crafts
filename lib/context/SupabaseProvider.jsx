import { createClient } from "@supabase/supabase-js";
import SupabaseContext from "./SupabaseContext";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const SupabaseProvider = (props) => {

  const [loggedIn, setLoggedIn] = useState(false);

  const register = async (email, password) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    try {
      const {error, data: userData } = await supabase
        .from("users")
        .insert({ email, uuid: data.user.id });
        if (error) {
          console.error(error);
        } else {
          console.log("User created successfully", userData);
        }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    const {error} = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error;
    setLoggedIn(true);
  }

  const checkUserLogin = async () => {
    const result = await supabase.auth.getSession();
    // console.log(result);
    setLoggedIn(result.data.session !== null); 
  }

  useEffect(() => {
    checkUserLogin()
  }, []);

  const getUsers = async () => {
    try {
      const users = await supabase.from("users").select("*");
      console.log(users);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SupabaseContext.Provider value={{ loggedIn, getUsers, register, login }}>
      {props.children}
    </SupabaseContext.Provider>
  );
};

SupabaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SupabaseProvider, supabase };
