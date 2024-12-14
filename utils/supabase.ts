import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as aesjs from "aes-js";
import "react-native-get-random-values";

const supabaseUrl = "https://qodbilrzszjmfeyrbdzj.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvZGJpbHJ6c3pqbWZleXJiZHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMjU5NjMsImV4cCI6MjA0OTcwMTk2M30.doTbku2aLaGvQHOtzvb-VnnpRFQqC4NreXmjRmS-FsI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
