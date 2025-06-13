import { WorkExperience } from '@/components/molecules/Timeline/workExperience';
import AboutPage from '@/components/organism/about/aboutPage';

export default function AboutPageRoute() {
    return (
        <div className="min-h-screen bg-gray-950">
            <div>
                <AboutPage />
            </div>
            <div>
                <WorkExperience />
            </div>
        </div>
    )
}