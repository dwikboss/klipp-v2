import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

interface UserProfile {
    id: string;
    username: string;
    avatar_url?: string;
    updated_at?: Date;
    [key: string]: any;
}

interface UserContextType {
    profile: UserProfile | null;
    loading: boolean;
    fetchUserProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const {
                data: { user },
                error: authError,
            } = await supabase.auth.getUser();

            if (authError || !user) {
                console.log("Error fetching user:", authError);
                return;
            }

            const { data: profileData, error: profileError } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (profileError) {
                console.log("Error fetching profile:", profileError);
            } else {
                setProfile(profileData);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <UserContext.Provider value={{ profile, loading, fetchUserProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
