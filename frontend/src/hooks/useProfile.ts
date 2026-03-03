import { useState, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { updateUser } from "@/lib/data-service";
import { updateSession } from "@/lib/auth-service";
import type { ProfileFormData } from "@/types/profile";
import { validateProfileForm } from "@/types/profile";
import { toast } from "sonner";

export function useProfile() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<ProfileFormData>({
        name: user?.name || "",
        phone: user?.phone || "",
        bio: user?.bio || "",
        department: user?.department || "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSave = useCallback(() => {
        const validationErrors = validateProfileForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return false;
        if (!user) return false;

        const updated = updateUser(user.id, formData);
        if (updated) {
            updateSession(updated);
            toast.success("Profilul a fost actualizat cu succes!");
            setIsEditing(false);
            return true;
        } else {
            toast.error("A aparut o eroare la actualizarea profilului.");
            return false;
        }
    }, [formData, user]);

    const handleCancel = useCallback(() => {
        setFormData({
            name: user?.name || "",
            phone: user?.phone || "",
            bio: user?.bio || "",
            department: user?.department || "",
        });
        setErrors({});
        setIsEditing(false);
    }, [user]);

    const handleFieldChange = useCallback((field: keyof ProfileFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    return {
        user,
        isEditing,
        setIsEditing,
        formData,
        errors,
        handleFieldChange,
        handleSave,
        handleCancel,
    };
}