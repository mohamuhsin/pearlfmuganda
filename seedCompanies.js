// seedCompanies.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Company from "./models/Company.js";
import Category from "./models/Category.js";

dotenv.config();

const companiesByCategory = {
    "Travel Agency Excellence Award": [
        "Weli Travel",
        "Maqam Travel",
        "Tawakal Travel Ltd",
        "Al-Misbaahu Travel Agency",
        "Al Hashimiyah Hijja and Ummrah",
        "AlKashf Hijja Service",
        "Answaar Hijja and Umrah",
        "Jamaat Hijja and Umrah",
        "Firdaus Hajj and Umrah",
        "Swaffa wa Maruwa",
        "Maruwa Travel",
        "Siiru Travel Agency",
        "Zam Zam Hijja and Umrah",
        "Saqeefah Hijja and Umrah",
        "Al Shawal Hijja and Umrah",
        "Mecca - Madina",
        "Kamalu Hijja Services",
        "Mysk Hijja and Umrah",
        "Suk Hijja and Umrah",
        "Muzidalifah Log Hijja and Ummrah",
        "Mazaata Hijja and Umrah Tours",
        "Aljanatul Gaaya",
        "Qubah Hijja and Umrah",
        "Al Hibah Tours",
        "Anwaary Travel Agency",
    ],
    "Agri Based Products Excellence Award": [
        "Supreme Flour",
        "Maganjo",
        "Kaswa",
        "Hamza millers",
        "Pembe",
        "Alfil Millers",
        "Mwanyi Terimba",
        "YPA",
        "Yamusa",
        "Concfeed International",
        "Bidco",
    ],
    "Herbal Researcher Excellence Award": [
        "Dr Yasin Ziwa",
        "Dr Mpiima Arafat",
        "Dr Katumba Hussein",
        "Ba Lukwago",
        "Late Hajjat Nakasujja",
        "Dr Ssali",
        "Dr Ssenjobe",
        "Dr Kayiima",
        "Dr Sulaiman Movid",
        "Dr Mulwana",
        "Dr Wahab & Prof Kizito",
        "Prof Julius Nyanzi",
        "Dr Muslim Migadde",
    ],
    "Telecom Excellence Award": [
        "MTN Uganda",
        "Airtel Uganda",
        "Uganda Telecom",
        "Salaam Telecom",
        "Roke Telecom",
        "Lyca Mobile",
    ],
    "Beverage Excellence Award": [
        "Pepsi Cola",
        "Coca Cola",
        "Riham Cola",
        "Mega Blast",
    ],
    "Paints Excellence Award": [
        "Global Paints",
        "Sadolin Paints",
        "Peacock Paints",
        "Plascon",
        "Vigor Paints",
    ],
    "Halal Restaurants Excellence Award": [
        "Faiz Cafe",
        "Rahim Foods",
        "KZ Restaurant",
        "Uhuru Restaurant",
        "Tipsy",
        "Dynasty",
        "Cafe Javas",
        "Middle East Restaurant",
        "Kebab House Restaurant",
        "Haji and Hajji Restaurant",
        "Mambo Restaurant",
        "2K Restaurant",
        "Shaka Zulu Restaurant",
    ],
    "Energy & Gas Supplier Excellence Award": [
        "Vivo Energy (Shell)",
        "Stabex International",
        "City Oil",
        "Mogas",
        "Total Energies",
        "Texol",
    ],
    "Real Estate & Property Mgt Excellence Award": [
        "Sema Property",
        "Matovu Property Consultants",
        "Jomayi",
        "Sedika Real Estates",
        "Njovu Property",
        "3ways",
        "Century Property",
        "Bulwadda Estate",
        "Bakaluba Property",
        "Zulfah Holdings",
        "Moods Property",
        "Hoods Property",
        "Ba Kayima",
        "Infotrust Property Consultants",
        "Mahmood Properties",
        "Budda events & Property mgt",
    ],
    "Recruitment Excellence Award": [
        "Ham Property",
        "KHM International Consultants",
        "Fresh Minds",
        "Al Quarashee Co.",
        "Hebro",
        "RS recruitment agency",
        "Al Baraq Labour Co.",
    ],
    "Agencies & FMCG Distributors Excellence Award": [
        "Havaz Agency",
        "Satchi and Satchi",
        "Troi",
        "Balaam Marketing Agency",
        "Saladin",
        "EARS",
        "Scanad",
        "Chapa",
        "Dembe Distributor",
        "African Queen",
        "Curiosity",
        "TBWA",
        "MAAD",
    ],
    "Muslim Fashion Excellence Award": [
        "Wahid Garments",
        "Hajji Musah Traders",
        "Hijab City",
        "Hamdan Kanzus",
        "Mwikenya Fashionz",
        "Janat Musah",
        "Mehmet Fashionz",
        "N&J Closet",
        "Hijab Face",
        "Tamim Muslim Garments",
        "Mustallah Collections",
        "Hajjat Mastullah Garments",
        "Jilbab House",
    ],

    "Islamic Primary School Excellence Award": [
        "Sweet Valley Primary Sch",
        "Kira Junior Sch",
        "Kazo Islamic Center",
        "Madina Islamic Junior Sch",
        "Al Ihasan Education center",
        "Gyegenda Education center",
        "Zam Zam Islamic Primary",
        "Twawil Islamic Primary",
        "Albayan Quran Memo Center",
        "Ibun Salam Quran & Hadith Memo",
        "Kin Junior School",
        "Rich Dad Islamic Pri Sch",
        "Salfah Islamic Primary Sch",
        "Isra Junior Sch",
        "Taqwa Islamic Pri Luweero",
        "Hamza Islamic Primary Sch",
        "Ibun Abbas Educ Center",
        "Madrasat Nur Islamic Nyamitanga",
        "Ndejje Quality Islamic",
        "Lufuka Islamic Pri",
        "Hudah Springs Pri",
        "Fahad Springs Pri",
        "Masha Junior School",
        "Bilal Islamic Primary Bwaise",
        "Kabowa Hidayat Islamic",
        "Asiyah Kids Nursery and Primary",
        "Maisarah Islamic Primary Sch",
        "Ubayyi Islamic Pri Bombo",
        "Super Star Primary Sch",
        "Salfah Islamic Pri",
        "Zaid Quran Memo Center",
        "Katalemwa Islamic",
        "Madinatul Munawarah Islamic Pri",
        "Adam and Hawa Islamic Pri",
        "Moath Islamic Primary Sch",
        "Zuhura Islamic Center",
        "Muhisinat Islamic Primary",
        "Gangu Muslim Primary Sch",
        "Buziga Islamic Pri",
        "Raayat Islamic Pri",
        "Tawhiid Islamic Pri",
        "Mbogo Junior Sch",
        "Tamayuz Islamic Pri",
        "Zainab Campus Pri",
        "Red Hamisha Needy Pri",
        "Tasneem Junior Sch",
        "Zai Nursery & Pri Sch",
        "Milestone Junior Sch",
        "Golden Balls Nursery & Pri",
        "Learnyard Pri Sch Kyanja",
        "Al-haqqu Junior School",
        "Lufuka Quality Islamic Pri Sch",
        "AK Islamic Maganjo",
    ],
    "Islamic Secondary School Excellence Award": [
        "Bilal Islamic Sec Sch Bwaise",
        "Bilal Islamic Institute Kakiri",
        "Bugembe Islamic Jinja",
        "Namugoona Salaaf",
        "Emirates College Nkoowe",
        "Madina Islamic Sec Sch Nsangi",
        "Nkooba Islamic",
        "Kasawo Islamic Sec Sch",
        "Ibn Khamis Islamic Sec",
        "Ubbayi Islamic Bwebajja",
        "Katwe Noor Islamic",
        "Buziga Islamic Institute",
        "Kisaasi Muslim Sec Sch",
        "Kisaasi College Sch",
        "Hamdan Islamic Sec Sch",
        "Sayidina Abubakar Sec Sch",
        "Greenlight Islamic Sec Sch",
        "Naggalama Islamic Sec Sch",
        "Khulafah Islamic Sec Sch",
        "Iqra High Sch",
        "AbdulRahman Bun Auf Namagooma",
        "Abu Aisha Islamic Sec Sch",
        "Faiha High Sch",
        "Almadinatuh Munawarah Islamic",
        "Kampala Islamic Sec Sch",
        "Kawempe Muslim Sec School",
        "Mbogo Mixed Sec School",
        "Nibras Islamic Sec Sch",
    ],
};

async function seedCompanies() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        for (const [categoryName, companies] of Object.entries(
            companiesByCategory
        )) {
            const category = await Category.findOne({ name: categoryName });

            if (!category) {
                console.warn(`⚠️ Category not found: ${categoryName}. Skipping...`);
                continue;
            }

            for (const name of companies) {
                await Company.findOneAndUpdate(
                    { name },
                    { name, category: category._id },
                    { upsert: true, new: true }
                );
            }

            console.log(`✅ Seeded companies for: ${categoryName}`);
        }

        console.log("🎉 All companies seeded!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding error:", error);
        process.exit(1);
    }
}

seedCompanies();
