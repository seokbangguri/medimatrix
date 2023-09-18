import { ReactNode } from "react";

export interface CardProps {
    name: string;
    source: string;
    children: ReactNode;
    explain: string[];
    route: string;
}