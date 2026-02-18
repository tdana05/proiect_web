import { useState, useMemo, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import {
    getTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
    getUsers,
} from "@/lib/data-service";
import type { Task, TaskStatus } from "@/lib/types";
import type { TaskFormData } from "@/types/tasks";
import { VALID_TRANSITIONS, validateTaskForm } from "@/types/tasks";
import { toast } from "sonner";

export function useTasks() {
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";
    const volunteers = useMemo(() => getUsers().filter((u) => u.role === "volunteer"), []);
    const [tasks, setTasks] = useState<Task[]>(() => getTasks());
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [filterPriority, setFilterPriority] = useState<string>("all");
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<TaskFormData>({
        title: "",
        description: "",
        assigneeId: "",
        dueDate: "",
        priority: "medium",
        category: "",
    });

    const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

    const filteredTasks = useMemo(() => {
        let result = [...tasks];
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (t) =>
                    t.title.toLowerCase().includes(q) ||
                    t.description.toLowerCase().includes(q) ||
                    t.category.toLowerCase().includes(q)
            );
        }
        if (filterStatus !== "all") {
            result = result.filter((t) => t.status === filterStatus);
        }
        if (filterPriority !== "all") {
            result = result.filter((t) => t.priority === filterPriority);
        }
        return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [tasks, searchQuery, filterStatus, filterPriority]);

    const statsByStatus = useMemo(() => {
        return Object.fromEntries(
            Object.keys(STATUS_CONFIG).map((status) => [
                status,
                tasks.filter((t) => t.status === status).length
            ])
        );
    }, [tasks]);

    const handleCreate = () => {
        const errors = validateTaskForm(formData, todayStr);
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return false;
        if (!user) return false;

        const newTask = createTask({
            title: formData.title,
            description: formData.description,
            assigneeId: formData.assigneeId,
            ownerId: user.id,
            dueDate: formData.dueDate,
            priority: formData.priority,
            category: formData.category,
            status: "PLANNED",
            createdAt: new Date().toISOString(),
        });

        setTasks((prev) => [newTask, ...prev]);
        setShowCreateDialog(false);
        setFormData({ title: "", description: "", assigneeId: "", dueDate: "", priority: "medium", category: "" });
        setFormErrors({});
        toast.success("Task-ul a fost creat cu succes! Status initial: PLANNED");
        return true;
    };

    const handleStatusChange = useCallback(
        (taskId: string, newStatus: TaskStatus) => {
            if (!user) return;
            const result = updateTaskStatus(taskId, newStatus, user.id);
            if (result.success) {
                setTasks(getTasks());
                if (selectedTask?.id === taskId) {
                    setSelectedTask((prev) => (prev ? { ...prev, status: newStatus } : null));
                }
                toast.success(`Status-ul a fost actualizat la ${STATUS_CONFIG[newStatus].label}.`);
            } else {
                toast.error(result.error || "Eroare la actualizarea statusului.");
            }
        },
        [user, selectedTask?.id]
    );

    const handleDelete = () => {
        if (!deleteId) return;
        deleteTask(deleteId);
        setTasks((prev) => prev.filter((t) => t.id !== deleteId));
        setDeleteId(null);
        setSelectedTask(null);
        toast.success("Task-ul a fost sters.");
    };

    const handleFieldChange = (field: keyof TaskFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const getAvailableTransitions = useCallback(
        (task: Task): TaskStatus[] => {
            const transitions = VALID_TRANSITIONS[task.status];
            if (!user) return [];
            // DONE can only be set by owner
            return transitions.filter((s) => {
                if (s === "DONE" && task.ownerId !== user.id) return false;
                return true;
            });
        },
        [user]
    );

    return {
        user,
        isAdmin,
        volunteers,
        tasks: filteredTasks,
        statsByStatus,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        filterPriority,
        setFilterPriority,
        showCreateDialog,
        setShowCreateDialog,
        deleteId,
        setDeleteId,
        selectedTask,
        setSelectedTask,
        formData,
        formErrors,
        todayStr,
        handleFieldChange,
        handleCreate,
        handleStatusChange,
        handleDelete,
        getAvailableTransitions,
    };
}