import { Event } from "@/lib/types";

export const EVENT_TYPE_LABELS: Record<string, string> = {
    meeting: "Sedinta",
    training: "Training",
    event: "Eveniment",
    workshop: "Workshop",
    fundraiser: "Fundraising",
};

export const EVENT_COLORS: Record<string, string> = {
    meeting: "#0891b2",
    training: "#059669",
    event: "#d97706",
    workshop: "#7c3aed",
    fundraiser: "#dc2626",
};

export const DAYS_RO = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sam", "Dum"];
export const MONTHS_RO = [
    "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
    "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

export interface EventFormData {
    title: string;
    description: string;
    date: string;
    endDate: string;
    location: string;
    type: Event["type"];
}

export function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number) {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Monday=0
}

export function getTodayString() {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}