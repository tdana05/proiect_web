"use client";

import { useProfile } from "@/hooks/useProfile";
import { ProfileCard, ProfileForm } from "@/components/profile";

export default function ProfilePage() {
    const {
        user,
        isEditing,
        setIsEditing,
        formData,
        errors,
        handleFieldChange,
        handleSave,
        handleCancel,
    } = useProfile();

    if (!user) return null;

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Profilul Meu</h1>
                <p className="text-sm text-muted-foreground">
                    Vizualizati si editati informatiile contului dvs.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <ProfileCard user={user} />

                <ProfileForm
                    user={user}
                    isEditing={isEditing}
                    formData={formData}
                    errors={errors}
                    onFieldChange={handleFieldChange}
                    onEdit={() => setIsEditing(true)}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
}