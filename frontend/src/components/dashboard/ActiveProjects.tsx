import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FolderKanban, ArrowRight } from "lucide-react";
import { getUserById } from "@/lib/data-service";
import type { Project } from "@/lib/types";

interface ActiveProjectsProps {
    projects: Project[];
}

export function ActiveProjects({ projects }: ActiveProjectsProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <FolderKanban className="size-4" />
                        Proiecte Active
                    </CardTitle>
                </div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/projects">
                        Toate <ArrowRight className="ml-1 size-3" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {projects.map((project) => (
                        <ProjectItem key={project.id} project={project} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function ProjectItem({ project }: { project: Project }) {
    const lead = getUserById(project.leadId);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{project.name}</p>
                <span className="text-xs text-muted-foreground font-mono">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-1.5" />
            <div className="flex items-center gap-2">
                <Avatar className="size-4">
                    <AvatarFallback className="text-[8px] bg-muted">
                        {lead?.name?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
          {lead?.name} - {project.memberIds.length} membri
        </span>
            </div>
        </div>
    );
}