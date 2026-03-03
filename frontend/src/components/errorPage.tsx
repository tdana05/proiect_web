import React from "react";

interface ErrorPageProps {
    code: string;
    title: string;
    description: string;
    icon: React.ElementType;
    iconClassName?: string;
}

export function ErrorPage({
                              code,
                              title,
                              description,
                              icon: Icon,
                              iconClassName,
                          }: ErrorPageProps) {
    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <Icon className={iconClassName} size={48} />
            <h1>{code}</h1>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}