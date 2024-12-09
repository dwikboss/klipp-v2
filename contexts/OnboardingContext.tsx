import React, { createContext, useContext, useState } from "react";

interface OnboardingData {
    username?: string;
    avatarFile?: { uri: string; name: string; type: string };
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
    const [data, setDataState] = useState<OnboardingData>({});

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