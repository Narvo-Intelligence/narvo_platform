export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-12">
      {children}
    </div>
  );
}
