
"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import {
  ArrowDownRight,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Compass,
  Globe2,
  Heart,
  Mail,
  MapPin,
  Menu,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Clock,
  Wallet,
  Luggage,
  Hotel,
  BookOpen,
  ExternalLink,
  Sun,
  X,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

type Destination = {
  id: string;
  name: string;
  country: string;
  category: string;
  image: string;
  description: string;
  budget: string;
  duration: string;
  bestTime: string;
  attractions: string[];
  itinerary: string[];
  tips: string[];
};

const destinations: Destination[] = [
  {
    id: "pakistan",
    name: "Pakistan",
    country: "Pakistan",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1100&q=85",
    description:
      "Discover majestic mountains, peaceful valleys, historic cities and unforgettable hospitality.",
    budget: "$25–70",
    duration: "7–10 days",
    bestTime: "May–October for many northern mountain destinations",
    attractions: [
      "Hunza Valley",
      "Fairy Meadows",
      "Skardu",
      "Lahore Fort",
      "Badshahi Mosque",
    ],
    itinerary: [
      "Day 1: Arrive in Islamabad and explore the city.",
      "Days 2–3: Travel towards the northern valleys.",
      "Days 4–6: Explore local villages, mountain views and lakes.",
      "Days 7–8: Enjoy local food and return with a flexible travel buffer.",
    ],
    tips: [
      "Check road and weather conditions before mountain journeys.",
      "Carry some cash for remote areas.",
      "Respect local customs and ask permission before photographing people.",
    ],
  },
  {
    id: "turkey",
    name: "Istanbul",
    country: "Turkey",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1100&q=85",
    description:
      "Explore grand mosques, lively bazaars, waterfront cafés and the meeting point of two continents.",
    budget: "$45–120",
    duration: "4–6 days",
    bestTime: "April–May and September–October",
    attractions: [
      "Hagia Sophia",
      "Blue Mosque",
      "Grand Bazaar",
      "Bosphorus",
      "Galata Tower",
    ],
    itinerary: [
      "Day 1: Explore Sultanahmet and its historic landmarks.",
      "Day 2: Visit the bazaars and sample Turkish cuisine.",
      "Day 3: Take a Bosphorus ferry ride.",
      "Days 4–5: Discover local neighbourhoods and museums.",
    ],
    tips: [
      "Check current entry rules before booking your trip.",
      "Use public transport where practical.",
      "Confirm attraction opening hours before visiting.",
    ],
  },
  {
    id: "japan",
    name: "Kyoto",
    country: "Japan",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1100&q=85",
    description:
      "Experience traditional temples, serene gardens, seasonal blossoms and beautiful Japanese culture.",
    budget: "$65–160",
    duration: "5–7 days",
    bestTime: "March–May and October–November",
    attractions: [
      "Fushimi Inari Shrine",
      "Arashiyama Bamboo Grove",
      "Kinkaku-ji",
      "Gion",
      "Nishiki Market",
    ],
    itinerary: [
      "Day 1: Walk through Gion and the historic streets.",
      "Day 2: Visit Fushimi Inari Shrine.",
      "Day 3: Explore Arashiyama and its bamboo grove.",
      "Days 4–5: Visit temples, gardens and food markets.",
    ],
    tips: [
      "Reserve accommodation early during popular seasons.",
      "Keep your voice low in temples and residential areas.",
      "Check local transport passes before purchasing.",
    ],
  },
  {
    id: "south-korea",
    name: "Seoul",
    country: "South Korea",
    category: "City",
    image:
      "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1100&q=85",
    description:
      "Enjoy modern architecture, street food, royal palaces and vibrant Korean pop culture.",
    budget: "$55–140",
    duration: "4–6 days",
    bestTime: "April–May and September–October",
    attractions: [
      "Gyeongbokgung Palace",
      "Bukchon Hanok Village",
      "N Seoul Tower",
      "Myeongdong",
      "Hongdae",
    ],
    itinerary: [
      "Day 1: Explore the city centre and local street food.",
      "Day 2: Visit royal palaces and traditional neighbourhoods.",
      "Day 3: Explore shopping streets and cafés.",
      "Days 4–5: Discover museums and different city districts.",
    ],
    tips: [
      "Download a suitable local navigation app before arrival.",
      "Check transport card options.",
      "Research seasonal weather before packing.",
    ],
  },
  {
    id: "switzerland",
    name: "Swiss Alps",
    country: "Switzerland",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1100&q=85",
    description:
      "Find alpine lakes, spectacular mountain railways, green meadows and postcard-worthy villages.",
    budget: "$130–300",
    duration: "5–8 days",
    bestTime: "June–September for many hiking routes",
    attractions: [
      "Interlaken",
      "Lauterbrunnen",
      "Lake Lucerne",
      "Zermatt",
      "Jungfraujoch",
    ],
    itinerary: [
      "Day 1: Arrive and settle into your base city.",
      "Days 2–3: Explore alpine villages and scenic viewpoints.",
      "Day 4: Plan a lake or mountain excursion.",
      "Days 5–6: Enjoy hiking or a scenic train journey.",
    ],
    tips: [
      "Mountain transport and excursions can add significantly to costs.",
      "Check trail conditions and cable-car schedules.",
      "Pack layers even in summer.",
    ],
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    category: "City",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1100&q=85",
    description:
      "Mix iconic skyscrapers, desert experiences, beautiful beaches and lively shopping districts.",
    budget: "$90–250",
    duration: "3–5 days",
    bestTime: "November–March",
    attractions: [
      "Burj Khalifa",
      "Dubai Marina",
      "Al Fahidi",
      "Desert safari",
      "Dubai Creek",
    ],
    itinerary: [
      "Day 1: Explore Downtown Dubai.",
      "Day 2: Visit the marina and nearby beaches.",
      "Day 3: Discover historic districts and local markets.",
      "Day 4: Consider a desert excursion.",
    ],
    tips: [
      "Check the weather before planning outdoor activities.",
      "Review dress expectations and local laws.",
      "Book popular attractions through verified providers.",
    ],
  },
  {
    id: "indonesia",
    name: "Bali",
    country: "Indonesia",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1100&q=85",
    description:
      "Relax beside tropical beaches, explore green rice terraces and discover beautiful island temples.",
    budget: "$35–110",
    duration: "5–8 days",
    bestTime: "April–October for generally drier weather",
    attractions: [
      "Ubud",
      "Tegallalang Rice Terraces",
      "Uluwatu Temple",
      "Nusa Penida",
      "Seminyak",
    ],
    itinerary: [
      "Days 1–2: Explore Ubud and its surrounding landscapes.",
      "Day 3: Visit rice terraces and local craft markets.",
      "Days 4–5: Enjoy coastal scenery and beaches.",
      "Day 6: Consider an island excursion.",
    ],
    tips: [
      "Check local boat and sea conditions before island trips.",
      "Use respectful clothing at religious sites.",
      "Arrange reliable transport for longer journeys.",
    ],
  },
  {
    id: "greece",
    name: "Santorini",
    country: "Greece",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1100&q=85",
    description:
      "Admire whitewashed villages, blue-domed churches, Aegean sunsets and charming coastal paths.",
    budget: "$100–260",
    duration: "4–6 days",
    bestTime: "May–June and September",
    attractions: [
      "Oia",
      "Fira",
      "Red Beach",
      "Akrotiri",
      "Caldera viewpoints",
    ],
    itinerary: [
      "Day 1: Explore Fira and its scenic walking routes.",
      "Day 2: Visit Oia and its famous viewpoints.",
      "Day 3: Discover beaches and archaeological sites.",
      "Day 4: Enjoy local cuisine and a relaxed island day.",
    ],
    tips: [
      "Compare ferry schedules before planning island transfers.",
      "Summer accommodation may cost more.",
      "Carry water and sun protection on walking routes.",
    ],
  },
];

const guides = [
  {
    icon: Compass,
    title: "First-Time Travel",
    category: "Planning",
    description:
      "Learn how to choose a destination, prepare documents and build a realistic itinerary.",
    steps: [
      "Check passport validity and entry requirements.",
      "Set a budget with an emergency reserve.",
      "Book refundable options when useful.",
      "Keep digital and printed copies of important documents.",
    ],
  },
  {
    icon: Wallet,
    title: "Budget Travel",
    category: "Money",
    description:
      "Practical ways to plan spending, compare transport and avoid unexpected costs.",
    steps: [
      "Estimate daily food, transport and activity expenses.",
      "Compare total journey costs, not just ticket prices.",
      "Travel outside peak periods where practical.",
      "Keep a separate emergency fund.",
    ],
  },
  {
    icon: Luggage,
    title: "Packing Checklist",
    category: "Essentials",
    description:
      "Pack smarter with a checklist tailored to the length and style of your trip.",
    steps: [
      "Clothing suited to the forecast and local customs.",
      "Passport, visa documents and travel insurance details.",
      "Chargers, suitable adapters and essential medication.",
      "Comfortable shoes, toiletries and a reusable water bottle.",
    ],
  },
  {
    icon: Plane,
    title: "Flight Planning",
    category: "Transport",
    description:
      "Prepare for departure day and compare flight options without relying on fake prices.",
    steps: [
      "Compare total fares, baggage and stopovers.",
      "Verify dates, names and airport details.",
      "Check your airline's check-in and baggage rules.",
      "Confirm transit visa requirements where applicable.",
    ],
  },
  {
    icon: Hotel,
    title: "Accommodation",
    category: "Stays",
    description:
      "Choose a stay that matches your budget, location and travel needs.",
    steps: [
      "Check the neighbourhood and transport access.",
      "Read recent reviews from multiple sources.",
      "Confirm cancellation and payment terms.",
      "Use verified booking channels and save your confirmation.",
    ],
  },
];

const visaGuides = [
  {
    country: "Turkey",
    note: "Use the official e-Visa portal where applicable.",
    url: "https://www.evisa.gov.tr/",
    label: "Official e-Visa portal",
  },
  {
    country: "Japan",
    note: "Check entry and visa guidance from Japan's Ministry of Foreign Affairs.",
    url: "https://www.mofa.go.jp/j_info/visit/visa/",
    label: "Official visa guidance",
  },
  {
    country: "South Korea",
    note: "Review official Korean visa information and any applicable electronic authorisation rules.",
    url: "https://www.visa.go.kr/",
    label: "Korea Visa Portal",
  },
  {
    country: "Switzerland",
    note: "Check the Swiss authorities' Schengen visa instructions.",
    url: "https://www.sem.admin.ch/sem/en/home.html",
    label: "Swiss migration authority",
  },
  {
    country: "United Arab Emirates",
    note: "Verify current entry and immigration information through official UAE channels.",
    url: "https://icp.gov.ae/",
    label: "UAE ICP",
  },
  {
    country: "Indonesia",
    note: "Check eligibility, visa types and current conditions with Indonesian immigration.",
    url: "https://evisa.imigrasi.go.id/",
    label: "Official e-Visa portal",
  },
  {
    country: "Greece",
    note: "Check the official Greek foreign ministry for visa information.",
    url: "https://www.mfa.gr/en/visas/",
    label: "Greek visa information",
  },
  {
    country: "Pakistan",
    note: "Check official Pakistani visa information for your circumstances.",
    url: "https://visa.nadra.gov.pk/",
    label: "Pakistan online visa",
  },
];

const categories = ["All", "Nature", "Culture", "City", "Beach"];

const heroImage =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Destination | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [activeGuide, setActiveGuide] = useState<(typeof guides)[number] | null>(
    null
  );
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wanderwise-saved-destinations");
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (
          Array.isArray(parsed) &&
          parsed.every((item) => typeof item === "string")
        ) {
          setSaved(parsed);
        }
      }
    } catch {
      // The site still works if browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "wanderwise-saved-destinations",
        JSON.stringify(saved)
      );
    } catch {
      // Saving is optional when browser storage is unavailable.
    }
  }, [saved]);

  const filteredDestinations = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesQuery =
        !normalized ||
        [
          destination.name,
          destination.country,
          destination.category,
          destination.description,
        ].some((value) => value.toLowerCase().includes(normalized));

      const matchesCategory =
        category === "All" || destination.category === category;
      const matchesSaved = !showSavedOnly || saved.includes(destination.id);

      return matchesQuery && matchesCategory && matchesSaved;
    });
  }, [query, category, saved, showSavedOnly]);

  function toggleSaved(id: string) {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function handleNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = newsletterEmail.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterSuccess(false);
      setNewsletterMessage("Please enter a valid email address.");
      return;
    }

    // Demo only: connect an email marketing backend to collect subscriptions.
    setNewsletterSuccess(true);
    setNewsletterMessage(
      "Email format verified! Newsletter delivery is not connected yet."
    );
  }

  function scrollToDestinations() {
    document.getElementById("destinations")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Compass size={23} />
            </span>
            <span>
              <span className="block text-lg font-extrabold tracking-tight text-slate-900">
                Wander<span className="text-blue-600">Wise</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.19em] text-slate-400">
                Your world awaits
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {[
              ["Home", "#home"],
              ["Destinations", "#destinations"],
              ["Travel Guides", "#guides"],
              ["Visa Guides", "#visas"],
              ["About Us", "#about"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() => {
                setShowSavedOnly((value) => !value);
                scrollToDestinations();
              }}
              className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              aria-label="Show saved destinations"
              title="Saved destinations"
            >
              <Bookmark size={20} />
              {saved.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                  {saved.length}
                </span>
              )}
            </button>
            <a
              href="#destinations"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Plan a Trip <ArrowRight className="ml-1 inline" size={16} />
            </a>
          </div>

          <button
            className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileMenu((value) => !value)}
            aria-label={mobileMenu ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {mobileMenu && (
          <nav className="border-t border-slate-100 bg-white px-5 py-4 shadow-xl lg:hidden">
            {[
              ["Home", "#home"],
              ["Destinations", "#destinations"],
              ["Travel Guides", "#guides"],
              ["Visa Guides", "#visas"],
              ["About Us", "#about"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenu(false)}
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
              >
                {label}
              </a>
            ))}
            <button
              onClick={() => {
                setShowSavedOnly((value) => !value);
                setMobileMenu(false);
                scrollToDestinations();
              }}
              className="mt-2 flex w-full items-center gap-2 rounded-xl bg-blue-50 px-3 py-3 text-sm font-bold text-blue-700"
            >
              <Bookmark size={17} /> Saved destinations ({saved.length})
            </button>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative isolate min-h-[630px] overflow-hidden">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url("${heroImage}")` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/15" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/35 via-transparent to-slate-950/10" />

        <div className="mx-auto flex min-h-[630px] max-w-7xl items-center px-5 py-16 sm:px-8 lg:py-20">
          <div className="max-w-3xl animate-[fadeUp_.7s_ease-out_both]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md sm:text-sm">
              <Sparkles size={15} className="text-sky-300" />
              YOUR NEXT ADVENTURE STARTS HERE
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              The World Is Yours to{" "}
              <span className="text-sky-300">Discover.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
              Find inspiring destinations, plan smarter journeys, and discover
              experiences that stay with you long after you return home.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={scrollToDestinations}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-xl shadow-blue-950/20 transition hover:-translate-y-1 hover:bg-blue-500"
              >
                Explore Now <ArrowRight size={18} />
              </button>
              <a
                href="#guides"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Travel Guides <BookOpen size={18} />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/90">
              <span className="flex items-center gap-2">
                <Check size={16} className="text-sky-300" /> Practical travel tips
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} className="text-sky-300" /> Budget estimates
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} className="text-sky-300" /> Independent planning
              </span>
            </div>
          </div>
        </div>

        <a
          href="#destinations"
          className="absolute bottom-7 right-7 hidden items-center gap-2 text-xs font-semibold tracking-wide text-white/80 transition hover:text-white sm:flex"
        >
          SCROLL TO EXPLORE <ArrowDownRight size={17} />
        </a>
      </section>

      {/* Search panel */}
      <section className="relative z-10 mx-auto -mt-7 max-w-6xl px-5 sm:px-8">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_20px_65px_-25px_rgba(15,23,42,0.22)] sm:p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3.5 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50">
              <Search size={21} className="shrink-0 text-blue-600" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") scrollToDestinations();
                }}
                placeholder="Search a country, city or experience..."
                aria-label="Search destinations"
                className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear destination search"
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X size={17} />
                </button>
              )}
            </div>
            <button
              onClick={scrollToDestinations}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Find Destinations <Search size={17} />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold text-slate-500">
              Popular:
            </span>
            {["Pakistan", "Japan", "Dubai", "Beach"].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  setCategory("All");
                  setShowSavedOnly(false);
                  scrollToDestinations();
                }}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="scroll-mt-24 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                <span className="h-px w-7 bg-blue-600" />
                Find your escape
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Popular Destinations
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                From peaceful landscapes to energetic cities, discover a
                destination that matches your travel style.
              </p>
            </div>
            <button
              onClick={() => {
                setShowSavedOnly((value) => !value);
                setQuery("");
                setCategory("All");
              }}
              className={`inline-flex items-center justify-center gap-2 self-start rounded-xl border px-4 py-3 text-sm font-semibold transition md:self-auto ${
                showSavedOnly
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              <Bookmark size={17} />
              {showSavedOnly ? "Show all destinations" : `Saved (${saved.length})`}
            </button>
          </div>

          <div className="mt-9 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  category === item
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between text-sm text-slate-500">
            <p>
              Showing{" "}
              <span className="font-bold text-slate-800">
                {filteredDestinations.length}
              </span>{" "}
              destinations
            </p>
            {(query || category !== "All" || showSavedOnly) && (
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                  setShowSavedOnly(false);
                }}
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDestinations.map((destination, index) => (
              <article
                key={destination.id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_-20px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-950/10"
                style={{ animation: `fadeUp .45s ease-out ${index * 60}ms both` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={`${destination.name}, ${destination.country}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/10" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[11px] font-bold text-slate-800 backdrop-blur-sm">
                    {destination.category}
                  </span>
                  <button
                    onClick={() => toggleSaved(destination.id)}
                    aria-label={
                      saved.includes(destination.id)
                        ? `Remove ${destination.name} from saved destinations`
                        : `Save ${destination.name}`
                    }
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-md transition hover:scale-110 hover:text-rose-500"
                  >
                    <Heart
                      size={18}
                      fill={saved.includes(destination.id) ? "currentColor" : "none"}
                      className={
                        saved.includes(destination.id) ? "text-rose-500" : ""
                      }
                    />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-white/85">
                      <MapPin size={13} /> {destination.country}
                    </p>
                    <h3 className="text-2xl font-extrabold text-white">
                      {destination.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <p className="min-h-[66px] text-sm leading-6 text-slate-500">
                    {destination.description}
                  </p>
                  <div className="my-4 flex items-center justify-between border-y border-slate-100 py-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Est. daily budget
                      </p>
                      <p className="mt-1 text-lg font-extrabold text-slate-900">
                        {destination.budget}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Suggested stay
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {destination.duration}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(destination)}
                    className="flex w-full items-center justify-between rounded-xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white"
                  >
                    Explore Details <ArrowRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
              <Globe2 className="mx-auto text-slate-300" size={42} />
              <h3 className="mt-4 text-lg font-bold text-slate-800">
                No destinations found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try another search term or change your category.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                  setShowSavedOnly(false);
                }}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                Reset search
              </button>
            </div>
          )}

          <p className="mt-6 text-xs leading-5 text-slate-400">
            Budget figures are illustrative estimates in USD per person per
            day, not live prices. Actual costs vary by season, transport,
            accommodation and personal choices.
          </p>
        </div>
      </section>

      {/* Travel guides */}
      <section id="guides" className="scroll-mt-24 bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Travel smarter
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Guides for Every Journey
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              Useful advice for planning confidently, packing thoughtfully and
              getting more from every trip.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <button
                  key={guide.title}
                  onClick={() => setActiveGuide(guide)}
                  className="group rounded-2xl border border-slate-100 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-950/5"
                  style={{ animation: `fadeUp .45s ease-out ${index * 60}ms both` }}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={23} />
                  </span>
                  <span className="mt-6 block text-xs font-bold uppercase tracking-wider text-blue-600">
                    {guide.category}
                  </span>
                  <span className="mt-2 block text-xl font-extrabold text-slate-900">
                    {guide.title}
                  </span>
                  <span className="mt-3 block text-sm leading-7 text-slate-500">
                    {guide.description}
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                    Read guide <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visa information */}
      <section id="visas" className="scroll-mt-24 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
                <ShieldCheck size={15} /> TRAVEL DOCUMENTS
              </span>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Visa Information, Made Easier
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
                Start with official government resources to understand entry
                rules and prepare the right documents before you travel.
              </p>

              <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 shrink-0 text-amber-700" size={21} />
                  <div>
                    <h3 className="font-bold text-amber-950">
                      Important visa notice
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-amber-900/80">
                      Visa requirements vary by nationality, passport type,
                      residence, purpose of travel and transit route. Rules can
                      change. Always verify your individual eligibility with
                      official authorities before booking or travelling.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="mt-8 text-lg font-extrabold text-slate-900">
                Common document checklist
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Valid passport and any required blank pages",
                  "Completed application and compliant photograph, if required",
                  "Travel itinerary and accommodation details, if requested",
                  "Evidence of funds or employment, where applicable",
                  "Travel insurance and supporting documents, if required",
                  "Transit and entry permissions for every relevant country",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                      <Check size={12} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {visaGuides.map((visa) => (
                <article
                  key={visa.country}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Globe2 size={20} />
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      Official resource
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-slate-900">
                    {visa.country}
                  </h3>
                  <p className="mt-2 min-h-[66px] text-sm leading-6 text-slate-500">
                    {visa.note}
                  </p>
                  <a
                    href={visa.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
                  >
                    {visa.label} <ExternalLink size={15} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration banner */}
      <section className="px-5 pb-24 sm:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-blue-700 px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full border-[45px] border-white/5" />
          <div className="absolute -bottom-36 right-1/4 h-80 w-80 rounded-full border-[55px] border-white/5" />
          <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                Make the next memory
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Your next great story begins with a destination.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                Find your inspiration, build your itinerary and make every
                travel decision with more confidence.
              </p>
            </div>
            <button
              onClick={scrollToDestinations}
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-6 py-4 text-sm font-extrabold text-blue-700 transition hover:-translate-y-1 hover:bg-blue-50 lg:self-center"
            >
              Find Your Destination <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85"
              alt="Travel journal, map and travel essentials"
              loading="lazy"
              className="h-[340px] w-full rounded-3xl object-cover shadow-xl sm:h-[440px]"
            />
            <div className="absolute -bottom-5 right-4 max-w-[260px] rounded-2xl border border-slate-100 bg-white p-5 shadow-xl sm:-right-5 sm:p-6">
              <div className="flex items-center gap-2 text-blue-600">
                <Sparkles size={19} />
                <span className="text-sm font-extrabold">Explore with purpose</span>
              </div>
              <p className="mt-2 text-xs leading-6 text-slate-500">
                Practical guidance and inspiration for your next journey.
              </p>
            </div>
          </div>

          <div className="pt-5 lg:pl-8">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              About WanderWise
            </div>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              More than a destination. A better way to explore.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
              WanderWise is a travel inspiration and planning platform built to
              help curious travellers discover destinations, compare
              illustrative budgets, prepare useful checklists and find official
              travel resources in one place.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              Our goal is simple: make trip planning easier to understand,
              more thoughtful and more accessible. Destination information and
              sample costs are starting points for your research, not live
              bookings or guarantees.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <Globe2 className="text-blue-600" size={24} />
                <h3 className="mt-3 font-extrabold text-slate-900">
                  Discover more
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Explore places, experiences and ideas for your next trip.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <ShieldCheck className="text-blue-600" size={24} />
                <h3 className="mt-3 font-extrabold text-slate-900">
                  Plan responsibly
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Start with helpful checklists and official travel resources.
                </p>
              </div>
            </div>

            <p className="mt-7 text-sm font-semibold text-slate-700">
              Owned &amp; Created by{" "}
              <span className="text-blue-700">Ali Nasir Warraich</span>
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Mail size={26} />
          </span>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            A little inspiration for your inbox
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Get travel planning ideas, destination inspiration and useful
            checklists. Newsletter delivery requires an email service
            connection.
          </p>
          <form
            onSubmit={handleNewsletter}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(event) => {
                setNewsletterEmail(event.target.value);
                setNewsletterMessage("");
                setNewsletterSuccess(false);
              }}
              placeholder="Enter your email address"
              aria-label="Email address for newsletter"
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Subscribe <ArrowRight size={17} />
            </button>
          </form>
          {newsletterMessage && (
            <p
              role="status"
              className={`mt-4 text-sm font-medium ${
                newsletterSuccess ? "text-emerald-700" : "text-rose-600"
              }`}
            >
              {newsletterSuccess && <Check size={16} className="mr-1 inline" />}
              {newsletterMessage}
            </p>
          )}
          <p className="mt-4 text-xs text-slate-400">
            Demo form only. No email is sent or stored by a mailing service.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="scroll-mt-24 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="#home" className="inline-flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Compass size={23} />
                </span>
                <span className="text-xl font-extrabold">
                  Wander<span className="text-blue-400">Wise</span>
                </span>
              </a>
              <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
                Discover new places, travel thoughtfully and make every journey
                your own.
              </p>
              <p className="mt-4 text-xs font-medium leading-6 text-slate-500">
                Website owner: Ali Nasir Warraich
              </p>
              <div className="mt-5 flex gap-3">
  {[
    { icon: FaInstagram, label: "Instagram" },
    { icon: FaFacebookF, label: "Facebook" },
    { icon: FaYoutube, label: "YouTube" },
  ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#contact"
                    aria-label={label}
                    title={`${label} link placeholder`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-400 hover:bg-blue-600 hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold">Quick Links</h3>
              <ul className="mt-5 space-y-3">
                {[
                  ["Home", "#home"],
                  ["Destinations", "#destinations"],
                  ["Travel Guides", "#guides"],
                  ["Visa Guides", "#visas"],
                  ["About Us", "#about"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-slate-400 transition hover:text-blue-300"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-extrabold">Explore by Style</h3>
              <ul className="mt-5 space-y-3">
                {["Nature", "Culture", "City", "Beach"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        setCategory(item);
                        setQuery("");
                        setShowSavedOnly(false);
                        scrollToDestinations();
                      }}
                      className="text-sm text-slate-400 transition hover:text-blue-300"
                    >
                      {item} Destinations
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-extrabold">Contact</h3>
              <p className="mt-5 text-sm leading-7 text-slate-400">
                Have a question or a suggestion? Connect your preferred
                contact channel to make it easy for visitors to reach you.
              </p>
              <p className="mt-4 flex items-start gap-2 text-sm text-slate-400">
                <Mail size={17} className="mt-0.5 shrink-0 text-blue-400" />
                <span>Email:dralinasirwarraich@gmail.com </span>
              </p>
              <p className="mt-3 flex items-start gap-2 text-sm text-slate-400">
                <MapPin size={17} className="mt-0.5 shrink-0 text-blue-400" />
                <span>Location:university of sargodha CDC depatment</span>
              </p>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-6 text-slate-500">
              © {new Date().getFullYear()} WanderWise. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              Owned &amp; Created by{" "}
              <span className="font-semibold text-slate-300">
                Ali Nasir Warraich
              </span>
            </p>
            <a
              href="#home"
              className="text-xs font-semibold text-slate-400 transition hover:text-blue-300"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* Destination details modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="destination-modal-title"
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          >
            <div className="relative h-56 sm:h-72">
              <img
                src={selected.image}
                alt={selected.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-slate-950/10" />
              <button
                onClick={() => setSelected(null)}
                aria-label="Close destination details"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg transition hover:bg-blue-50"
              >
                <X size={21} />
              </button>
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7">
                <p className="flex items-center gap-1.5 text-sm font-medium text-white/85">
                  <MapPin size={15} /> {selected.country}
                </p>
                <h2
                  id="destination-modal-title"
                  className="mt-1 text-3xl font-extrabold text-white sm:text-4xl"
                >
                  {selected.name}
                </h2>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              <p className="text-sm leading-7 text-slate-600">
                {selected.description}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-blue-50 p-4">
                  <Wallet size={19} className="text-blue-700" />
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Estimated daily budget
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-slate-900">
                    {selected.budget}
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 p-4">
                  <Clock size={19} className="text-blue-700" />
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Suggested duration
                  </p>
                  <p className="mt-1 text-sm font-extrabold text-slate-900">
                    {selected.duration}
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 p-4">
                  <Sun size={19} className="text-blue-700" />
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Best time to visit
                  </p>
                  <p className="mt-1 text-sm font-bold leading-5 text-slate-900">
                    {selected.bestTime}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 font-extrabold text-slate-900">
                    <Star size={18} className="text-blue-600" /> Top attractions
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {selected.attractions.map((attraction) => (
                      <li
                        key={attraction}
                        className="flex items-center gap-3 text-sm text-slate-600"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        {attraction}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 font-extrabold text-slate-900">
                    <BookOpen size={18} className="text-blue-600" /> Suggested itinerary
                  </h3>
                  <ol className="mt-4 space-y-3">
                    {selected.itinerary.map((day) => (
                      <li
                        key={day}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm leading-6 text-slate-600"
                      >
                        {day}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-slate-200 p-5">
                <h3 className="font-extrabold text-slate-900">
                  Helpful travel tips
                </h3>
                <ul className="mt-4 space-y-3">
                  {selected.tips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
                    >
                      <Check size={16} className="mt-1 shrink-0 text-blue-600" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 text-xs leading-5 text-slate-400">
                Budgets and itineraries are illustrative planning suggestions,
                not live prices or guaranteed conditions. Verify weather,
                opening hours, safety advice and entry rules before travel.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => toggleSaved(selected.id)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <Heart
                    size={17}
                    fill={saved.includes(selected.id) ? "currentColor" : "none"}
                    className={saved.includes(selected.id) ? "text-rose-500" : ""}
                  />
                  {saved.includes(selected.id)
                    ? "Remove from saved"
                    : "Save destination"}
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Continue Exploring <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Travel guide modal */}
      {activeGuide && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveGuide(null);
          }}
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-modal-title"
            className="w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  {activeGuide.category} guide
                </span>
                <h2
                  id="guide-modal-title"
                  className="mt-2 text-2xl font-extrabold text-slate-900"
                >
                  {activeGuide.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveGuide(null)}
                aria-label="Close guide"
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={21} />
              </button>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              {activeGuide.description}
            </p>
            <ol className="mt-6 space-y-4">
              {activeGuide.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-extrabold text-blue-700">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-sm leading-6 text-slate-600">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <button
              onClick={() => setActiveGuide(null)}
              className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Got it
            </button>
          </section>
        </div>
      )}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 88px;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
