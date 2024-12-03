import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as aesjs from "aes-js";
import "react-native-get-random-values";

const supabaseUrl = "https://rhcwiqezvdnwlvdyxoap.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoY3dpcWV6dmRud2x2ZHl4b2FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNzQ3NjksImV4cCI6MjA0ODc1MDc2OX0.Y57n4Pkd8lJDcRGL_b45ROi9ikvs_HDkJPxMPLFdeBI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
