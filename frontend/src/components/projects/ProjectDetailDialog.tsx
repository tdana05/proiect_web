import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { getUserById } from "@/lib/data-service";
import { STATUS_CONFIG } from "@/types/projects";
import type { Project } from "@/lib/types";

interface ProjectDetailDialogProps {
    project: Project | null;
    onOpenChange: (open: boolean) => void;
}

export function ProjectDetailDialog({ project, onOpenChange }: ProjectDetailDialogProps) {
    if (!project) return null;

    const lead = getUserById(project.leadId);
    const members = project.memberIds.map((id) => getUserById(id)).filter(Boolean);
    const statusConfig = STATUS_CONFIG[project.status];

    return (
        <Dialog open={!!project} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{project.name}</DialogTitle>
                    <DialogDescription>Detalii proiect</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <Badge variant="secondary" className={`w-fit ${statusConfig.className}`}>
                        {statusConfig.label}
                    </Badge>

                    <p className="text-sm text-foreground/80 leading-relaxed">{project.description}</p>

                    <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-4">
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase">Lider</p>
                            <p className="text-sm font-medium text-foreground">{lead?.name}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase">Progres</p>
                            <p className="text-sm font-medium text-foreground">{project.progress}%</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase">Inceput</p>
                            <p className="text-sm text-foreground">
                                {new Date(project.startDate).toLocaleDateString("ro-RO")}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase">Sfarsit</p>
                            <p className="text-sm text-foreground">
                                {new Date(project.endDate).toLocaleDateString("ro-RO")}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">Membri Echipa</p>
                        <div className="flex flex-wrap gap-2">
                            {members.map((m) => m && (
                                <div key={m.id} className="flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1">
                                    <Avatar className="size-5">
                                        <AvatarFallback className="text-[8px] bg-primary/10 text-primary">
                                            {m.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs">{m.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Progress value={project.progress} className="h-2" />
                </div>
            </DialogContent>
        </Dialog>
    );
}