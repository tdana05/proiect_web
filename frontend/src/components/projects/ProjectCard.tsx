import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Trash2 } from "lucide-react";
import { getUserById } from "@/lib/data-service";
import { STATUS_CONFIG } from "@/types/projects";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
    project: Project;
    isAdmin: boolean;
    onSelect: (project: Project) => void;
    onDelete: (id: string) => void;
}

export function ProjectCard({ project, isAdmin, onSelect, onDelete }: ProjectCardProps) {
    const lead = getUserById(project.leadId);
    const statusConfig = STATUS_CONFIG[project.status];

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <Badge variant="secondary" className={`text-[10px] ${statusConfig.className}`}>
                        {statusConfig.label}
                    </Badge>
                    {isAdmin && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 text-muted-foreground hover:text-destructive"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(project.id);
                            }}
                        >
                            <Trash2 className="size-3.5" />
                        </Button>
                    )}
                </div>
                <CardTitle
                    className="text-base cursor-pointer hover:text-primary transition-colors"
                    onClick={() => onSelect(project)}
                >
                    {project.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                    {project.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 mt-auto">
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Progres</span>
                        <span className="text-xs font-medium font-mono text-foreground">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar className="size-5">
                            <AvatarFallback className="text-[8px] bg-muted">{lead?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{lead?.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{project.memberIds.length}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Calendar className="size-3" />
                    {new Date(project.startDate).toLocaleDateString("ro-RO", { month: "short", year: "numeric" })}
                    {" - "}
                    {new Date(project.endDate).toLocaleDateString("ro-RO", { month: "short", year: "numeric" })}
                </div>
            </CardContent>
        </Card>
    );
}