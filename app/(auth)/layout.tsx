export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-accent mb-2">SponsorBridge</h1>
          <p className="text-muted-foreground">Connect events with brands</p>
        </div>
        {children}
      </div>
    </div>
  );
}
