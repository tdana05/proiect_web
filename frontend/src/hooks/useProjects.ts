import { useState, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import {
    getProjects,
    createProject,
    deleteProject,
    getUsers,
} from "@/lib/data-service";
import type { Project } from "@/lib/types";
import type { ProjectFormData } from "@/types/projects";
import { validateProjectForm } from "@/types/projects";
import { toast } from "sonner";

export function useProjects() {
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";
    const allUsers = useMemo(() => getUsers(), []);
    const [projects, setProjects] = useState<Project[]>(() => getProjects());
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<ProjectFormData>({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "planning",
        leadId: "",
    });

    const filteredProjects = useMemo(() => {
        let result = [...projects];
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
            );
        }
        if (filterStatus !== "all") {
            result = result.filter((p) => p.status === filterStatus);
        }
        return result;
    }, [projects, searchQuery, filterStatus]);

    const handleCreate = () => {
        const errors = validateProjectForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return false;

        const newProject = createProject({
            name: formData.name,
            description: formData.description,
            startDate: formData.startDate,
            endDate: formData.endDate,
            status: formData.status,
            leadId: formData.leadId,
            memberIds: [formData.leadId],
            progress: 0,
        });

        setProjects((prev) => [newProject, ...prev]);
        setShowCreateDialog(false);
        setFormData({ name: "", description: "", startDate: "", endDate: "", status: "planning", leadId: "" });
        setFormErrors({});
        toast.success("Proiectul a fost creat cu succes!");
        return true;
    };

    const handleDelete = () => {
        if (!deleteId) return;
        deleteProject(deleteId);
        setProjects((prev) => prev.filter((p) => p.id !== deleteId));
        setDeleteId(null);
        toast.success("Proiectul a fost sters.");
    };

    const handleFieldChange = (field: keyof ProjectFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return {
        user,
        isAdmin,
        allUsers,
        projects: filteredProjects,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        showCreateDialog,
        setShowCreateDialog,
        deleteId,
        setDeleteId,
        selectedProject,
        setSelectedProject,
        formData,
        formErrors,
        handleFieldChange,
        handleCreate,
        handleDelete,
    };
}