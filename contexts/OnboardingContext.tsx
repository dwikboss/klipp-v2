import React, { createContext, useContext, useState } from "react";

interface OnboardingData {
    bio?: string;
    username?: string;
    cardFrontFile?: { uri: string; name: string; type: string };
    avatarFile?: { uri: string; name: string; type: string };
    favoriteIdol?: string;
    favoriteKpopGroups?: string[];
    selectedGroups?: string[];
}

interface OnboardingContextType {
    data: OnboardingData;
    setData: (newData: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
    undefined
);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [data, setDataState] = useState<OnboardingData>({
        bio: undefined,
        username: undefined,
        avatarFile: undefined,
        cardFrontFile: undefined,
        favoriteIdol: undefined,
        favoriteKpopGroups: undefined,
        selectedGroups: undefined,
    });

    const setData = (newData: Partial<OnboardingData>) => {
        setDataState((prevData) => ({ ...prevData, ...newData }));
    };

    return (
        <OnboardingContext.Provider value={{ data, setData }}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error(
            "useOnboarding must be used within an OnboardingProvider"
        );
    }
    return context;
};