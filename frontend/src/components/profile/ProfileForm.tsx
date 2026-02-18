import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Save } from "lucide-react";
import type { User as UserType } from "@/lib/types";
import type { ProfileFormData } from "@/types/profile";

interface ProfileFormProps {
    user: UserType;
    isEditing: boolean;
    formData: ProfileFormData;
    errors: Record<string, string>;
    onFieldChange: (field: keyof ProfileFormData, value: string) => void;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
}

export function ProfileForm({
                                user,
                                isEditing,
                                formData,
                                errors,
                                onFieldChange,
                                onEdit,
                                onSave,
                                onCancel,
                            }: ProfileFormProps) {
    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <User className="size-4" />
                        Informatii Personale
                    </CardTitle>
                    <CardDescription>Actualizati informatiile profilului dvs.</CardDescription>
                </div>
                {!isEditing && (
                    <Button variant="outline" size="sm" onClick={onEdit}>
                        Editeaza
                    </Button>
                )}
            </CardHeader>

            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Nume Complet</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => onFieldChange("name", e.target.value)}
                                disabled={!isEditing}
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={user.email} disabled />
                            <p className="text-xs text-muted-foreground">Emailul nu poate fi modificat.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="phone">Telefon</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => onFieldChange("phone", e.target.value)}
                                placeholder="+373 XX XXX XXX"
                                disabled={!isEditing}
                            />
                            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="department">Departament</Label>
                            <Input
                                id="department"
                                value={formData.department}
                                onChange={(e) => onFieldChange("department", e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="bio">Despre Mine</Label>
                        <Textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => onFieldChange("bio", e.target.value)}
                            rows={4}
                            disabled={!isEditing}
                            placeholder="Cateva cuvinte despre tine..."
                        />
                    </div>

                    {isEditing && (
                        <div className="flex items-center justify-end gap-3">
                            <Button variant="outline" onClick={onCancel}>
                                Anuleaza
                            </Button>
                            <Button onClick={onSave}>
                                <Save className="mr-2 size-4" />
                                Salveaza
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}