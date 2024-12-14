interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}
export function Container({children, className}: ContainerProps) {
    return (
        <div className={`max-w-[1920px]  mx-auto ${className}`}>
            {children}
            </div>
    )
}