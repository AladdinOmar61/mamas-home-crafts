import { createClient } from "@supabase/supabase-js";
import SupabaseContext from "./SupabaseContext";
import PropTypes from 'prop-types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const SupabaseProvider = (props) => {
  const getUsers = async () => {
    try {
      const users = await supabase
      .from('users')
      .select('*');
      console.log(users)
      // return users;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SupabaseContext.Provider value={{ getUsers }}>
      {props.children}
    </SupabaseContext.Provider>
  );
};

SupabaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SupabaseProvider, supabase };
