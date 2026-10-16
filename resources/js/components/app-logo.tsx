export default function AppLogo() {
    return (
        <>
            <img
                src="/mist-logo.png"
                alt="Makilala Institute of Science and Technology"
                className="h-10 w-14 shrink-0 rounded-md border border-slate-700 bg-slate-950 object-contain p-0.5"
            />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="truncate leading-tight font-semibold">
                    MIST Enrollment
                </span>
                <span className="truncate text-xs leading-tight text-muted-foreground">
                    Student management
                </span>
            </div>
        </>
    );
}
