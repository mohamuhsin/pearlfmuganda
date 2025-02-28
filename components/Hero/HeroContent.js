import HeroText from "./HeroText";
import NavigationCards from "./NavigationCards";

export default function HeroContent() {
    return (
        <div className="flex flex-col items-start gap-8 text-white">
            <HeroText />
            <NavigationCards />
        </div>
    );
}
