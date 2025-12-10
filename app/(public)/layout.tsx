import { Navbar } from '@/components/layout';
import ScrollProgress from '@/components/ui/ScrollProgress';

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ScrollProgress />
            <Navbar />
            <main className="min-h-screen bg-white">
                {children}
            </main>
        </>
    );
}
