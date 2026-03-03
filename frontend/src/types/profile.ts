export interface ProfileFormData {
    name: string;
    phone: string;
    bio: string;
    department: string;
}

export function validateProfileForm(formData: ProfileFormData): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
        errors.name = "Numele este obligatoriu.";
    } else if (formData.name.trim().length < 2) {
        errors.name = "Numele trebuie sa aiba minim 2 caractere.";
    }

    if (formData.phone && !/^\+?[\d\s-]{7,15}$/.test(formData.phone)) {
        errors.phone = "Format de telefon invalid.";
    }

    return errors;
}

export function getInitials(name: string): string {
    return name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "?";
}