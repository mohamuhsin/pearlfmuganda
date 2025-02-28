import ContactInfo from "./ContactInfo";

export default function MobileMenu() {
    return (
        <div className="absolute top-20 left-0 w-full bg-[#030269] text-white flex flex-col items-start md:items-center py-4 shadow-md md:hidden transition-all duration-300 ease-in-out transform px-6 z-50">
            <ContactInfo />
        </div>
    );
}
