const AuthPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-bg-primary flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                {children}
            </div>
        </div>
    )
}

export default AuthPage