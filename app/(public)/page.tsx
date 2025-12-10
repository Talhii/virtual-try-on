import {
    Hero,
    CommunityGallery,
    FeatureGrid,
    Pricing,
    Faq,
    TryOnPipeline,
} from '@/components/sections';
import { Footer } from '@/components/layout';

export default function Home() {
    return (
        <>
            <Hero />
            <TryOnPipeline />
            <FeatureGrid />
            <CommunityGallery />
            <Pricing />
            <Faq />
            <Footer />
        </>
    );
}
