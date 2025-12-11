import {
    Hero,
    CommunityGallery,
    Pricing,
    TryOnPipeline,
} from '@/components/sections';
import { Footer } from '@/components/layout';

export default function Home() {
    return (
        <>
            <Hero />
            <TryOnPipeline />
            <CommunityGallery />
            <Pricing />
            <Footer />
        </>
    );
}
