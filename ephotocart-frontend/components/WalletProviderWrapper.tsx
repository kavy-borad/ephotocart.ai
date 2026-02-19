"use client";

import { WalletProvider } from "@/lib/WalletContext";

export function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
    return <WalletProvider>{children}</WalletProvider>;
}
