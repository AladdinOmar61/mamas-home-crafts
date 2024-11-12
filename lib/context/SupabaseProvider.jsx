import { createClient } from "@supabase/supabase-js";
import SupabaseContext from "./SupabaseContext";
import PropTypes from "prop-types";
import { useState } from "react";

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
  const [user, setUser] = useState(null);

  const register = async (email, password) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    try {
      const { error, data: userData } = await supabase
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
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error("Error signing out:", signOutError);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setLoggedIn(true);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    // setLoggedIn(result.data.session !== null);
    if (error) {
      console.log(error);
    }
    setLoggedIn(false);
    setUser(null);
  };

  const checkUserLogin = async () => {
    const result = await supabase.auth.getSession();
    setLoggedIn(result.data.session !== null);
    setUser(result.data.session.user);
  };

  const getUsers = async () => {
    try {
      const users = await supabase.from("users").select("*");
      console.log(users);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllProducts = async () => {
    try {
      const allProducts = await supabase.from("products").select("*");
      return allProducts;
    } catch (error) {
      console.log(error);
    }
  };

  const getProductItem = async (id) => {
    try {
      const prodItem = await supabase.from("products").select().eq("id", id);
      return prodItem;
    } catch (error) {
      console.log(error);
    }
  };

  const getImages = async () => {
    const { data, error } = await supabase.storage.getBucket("products");
    console.log(data);
    if (error) {
      console.log(error);
    }
  };

  return (
    <SupabaseContext.Provider
      value={{
        user,
        loggedIn,
        getUsers,
        register,
        login,
        logout,
        checkUserLogin,
        getAllProducts,
        getProductItem,
        getImages
      }}
    >
      {props.children}
    </SupabaseContext.Provider>
  );
};

SupabaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SupabaseProvider, supabase };
