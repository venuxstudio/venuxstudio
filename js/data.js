/**
 * ============================================================================
 * VENUX STUDIO — DATA CONFIGURATION (MULTI-PAGE STANDALONE)
 * ============================================================================
 * Easily edit video backgrounds, brand logos, home orbit works,
 * portfolio gallery sections (60 images), vibe code projects, and contacts.
 */

window.VENUX_CONFIG = {
  // BRAND ASSETS
  logoUrl: "https://res.cloudinary.com/nnzbikiu/image/upload/v1787161221/animated-logo_ygqb6z.svg",
  centerIconUrl: "https://res.cloudinary.com/nnzbikiu/image/upload/v1787160819/animated-logo_lznzre.gif",
  
  // BACKGROUND VIDEO & SPEED (with 20% dark overlay) & FALLBACK IMAGE
  bgVideoUrl: "https://res.cloudinary.com/nnzbikiu/video/upload/v1787066009/bg2_l8jbki.mp4",
  bgVideoPlaybackSpeed: 0.5, // Change this value to adjust video speed (e.g., 0.5 = 50%, 0.6 = 60%, 1.0 = normal)
  bgImageUrl: "https://res.cloudinary.com/nnzbikiu/image/upload/v1785316410/BG1_i8uujd.jpg",
  
  // DESIGNER PHOTO
  designerPhotoUrl: "assets/images/profile.jpg?q=80&w=1200&auto=format&fit=crop",
  
  // LINKS & CONTACT
  pdfPortfolioUrl: "https://drive.google.com/file/d/1tHbEPQrKnWGHu5z4K-dpq1kk4KrGbbqX/view?usp=sharing",
  whatsappUrl: "https://wa.me/918983799176",
  telegramUrl: "https://t.me/venuxstudio",
  email: "venuxstudiox@gmail.com",
  contactFormRecipient: "venuxstudiox@gmail.com", // Project briefs submitted from the website will be delivered to this Gmail
  phone: "+91 89837 99176 / +91 70207 85779",
  location: "Harisadanam, Chennithala, Kerala, India"
};

// ============================================================================
// 1. HOME PAGE — 15 ORBITING SHOWCASE WORKS
// ============================================================================
window.VENUX_PORTFOLIO = [
  {
    id: "cake-delights",
    title: "",
    category: "Logo & Brand System",
    imageUrl: "assets/images/img2.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "Cake Delights Bakery",
    year: "2024",
    description: "Custom organic script logo typography, soft pastel palette, heart motif accents, and artisanal packaging concept for a luxury boutique bakery.",
    tags: ["Logo Design", "Typography", "Brand Identity", "Packaging"],
    deliverables: ["Primary & Secondary Logo System", "Color Palette & Typography", "Packaging Guidelines", "Social Media Templates"],
    toolsUsed: ["CorelDRAW", "Adobe Illustrator", "Photoshop"]
  },
  {
    id: "my-skincare",
    title: "",
    category: "Apparel & Packaging",
    imageUrl: "assets/images/img7.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "Michelle Yvonne Beauty",
    year: "2024",
    description: "Luxury metallic gold foil & deep cobalt blue cosmetic jar packaging design, custom serif logotype with star sparkles and 3D product render.",
    tags: ["3D Packaging", "Cosmetics Branding", "Gold Foil Design", "Visual Identity"],
    deliverables: ["3D Container Render", "Foil Stamp Separation Vector", "Label Wraps", "Brand Guidelines"],
    toolsUsed: ["Photoshop", "Illustrator", "3D Asset Studio"]
  },
  {
    id: "rose-dolly-mafia",
    title: "",
    category: "Web UI & NFT",
    imageUrl: "assets/images/img1.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "Rose Dolly NFT Syndicate",
    year: "2023",
    description: "High-contrast neo-noir Cyberpunk & Spade emblem brand identity. Neon red typography overlays for Web3 collection drop.",
    tags: ["NFT Branding", "Web3 Visuals", "Vector Art", "Logo System"],
    deliverables: ["Ace of Spades Emblem", "Typography Overlay System", "Merch Vector Files", "Discord / X Banners"],
    toolsUsed: ["CorelDRAW", "Photoshop", "Figma"]
  },
  {
    id: "wilson-law-group",
    title: "",
    category: "Logo & Brand System",
    imageUrl: "assets/images/img6.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "Wilson Law Group Attorneys",
    year: "2024",
    description: "Modern corporate legal monogram combining classical Greek column architecture with interlocking W letters on royal blue gradient canvas.",
    tags: ["Corporate Monogram", "Legal Branding", "Vector Crest", "Stationery"],
    deliverables: ["Monogram Emblem", "Corporate Identity Manual", "Business Card Templates", "Letterheads"],
    toolsUsed: ["Illustrator", "CorelDRAW"]
  },
  {
    id: "belle-genic",
    title: "",
    category: "Apparel & Packaging",
    imageUrl: "assets/images/img10.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "Belle Genic Drinks",
    year: "2023",
    description: "Metallic copper liquid can packaging with vertical custom calligraphic script wrap, metallic sheen highlights, and rich burgundy product stage.",
    tags: ["Packaging Design", "Calligraphy", "Beverage Can", "3D Visuals"],
    deliverables: ["3D Can Render", "Print Die-Line Vector", "Color Separation", "Social Promo Assets"],
    toolsUsed: ["CorelDRAW", "Photoshop", "After Effects"]
  },
  {
    id: "forte-hair",
    title: "",
    category: "Logo & Brand System",
    imageUrl: "assets/images/img11.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "Forte Cosmetics Paris",
    year: "2024",
    description: "Gold serif editorial logo with high-contrast tilde ligatures over moody portrait photography. High-end salon & haircare visual identity.",
    tags: ["Editorial Typography", "Gold Foil Logo", "Beauty Branding"],
    deliverables: ["Custom Serif Typography", "Brand Color Palette", "Salon Window Decals", "Product Boxes"],
    toolsUsed: ["Illustrator", "Photoshop"]
  },
  {
    id: "nineone",
    title: "",
    category: "Apparel & Packaging",
    imageUrl: "assets/images/img4.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "Nineone Organics",
    year: "2023",
    description: "Organic deep emerald green bottle & jar collection set against river stone aesthetic stage. Elegant custom lowercase serif logotype.",
    tags: ["Organic Cosmetics", "Emerald & Gold", "Package Mockups", "Label Art"],
    deliverables: ["Pump Bottle Vector Art", "Jar Lid Stamp", "Product Box Artwork", "E-commerce Assets"],
    toolsUsed: ["CorelDRAW", "Photoshop"]
  },
  {
    id: "lena-grindstad",
    title: "",
    category: "Logo & Brand System",
    imageUrl: "assets/images/img8.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "Lena Grindstad Haute Couture",
    year: "2023",
    description: "Glitter gold art-deco LG monogram emblem set over textured dark forest green canvas. Custom luxury fashion & jewelry seal.",
    tags: ["Art Deco Monogram", "Gold Texture", "Fashion Logo", "Luxury Identity"],
    deliverables: ["Vector Monogram", "Embossed Stamp Files", "Jewelry Tag Design", "Brand Book"],
    toolsUsed: ["Illustrator", "CorelDRAW", "Photoshop"]
  },
  {
    id: "katana-marketing",
    title: "",
    category: "3D & Print Media",
    imageUrl: "assets/images/img3.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "Katana Marketing Tokyo/LA",
    year: "2024",
    description: "Sliced katana blade typography and bold angular lettering for high-impact growth marketing agency. Ultra-clean monochrome palette.",
    tags: ["Agency Logo", "Angular Typography", "Monochrome", "Apparel Graphics"],
    deliverables: ["Vector Logotype", "Agency Merch Graphics", "Pitch Deck Templates", "Signage Art"],
    toolsUsed: ["Illustrator", "Figma"]
  },
  {
    id: "el-suegro",
    title: "",
    category: "Apparel & Packaging",
    imageUrl: "assets/images/img9.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "El Suegro Distillery",
    year: "2022",
    description: "Ornate vintage filigree label with gold foil crowns and intricate agave leaf flourishes. Full bottle presentation & embossed gift box.",
    tags: ["Vintage Label Art", "Filigree Vector", "Liquor Packaging", "Gold Foil"],
    deliverables: ["Custom Filigree Vector", "Bottle Label Print Die-cut", "Gift Box Emboss File", "POS Display"],
    toolsUsed: ["CorelDRAW", "Photoshop", "Illustrator"]
  },
  {
    id: "ginger-restaurant",
    title: "",
    category: "Logo & Brand System",
    imageUrl: "assets/images/img5.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "Ginger Fine Dining",
    year: "2023",
    description: "Terracotta & deep pine green typography with oval arch monogram symbol. Warm, organic high-end culinary visual language.",
    tags: ["Restaurant Branding", "Culinary Logo", "Terracotta Palette", "Menu Design"],
    deliverables: ["Oval Monogram Vector", "Menu Design Vector", "Coaster & Apron Apparel Graphics", "Signage"],
    toolsUsed: ["Illustrator", "CorelDRAW"]
  },
  {
    id: "board-games-mt",
    title: "",
    category: "3D & Print Media",
    imageUrl: "assets/images/img13.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "Board Games MT Malta",
    year: "2023",
    description: "Playful stacked block lettering forming game towers on bright canary yellow background. Dynamic graphic system for tabletop gaming hub.",
    tags: ["Custom Typography", "Gaming Brand", "Canary Yellow", "Merch Vector"],
    deliverables: ["Stacked Block Logotype", "Storefront Graphics", "T-Shirt & Hoodie Vector Art", "Membership Cards"],
    toolsUsed: ["CorelDRAW", "Illustrator"]
  },
  {
    id: "infinity-vibe-build",
    title: "",
    category: "AI & Vibe Build",
    imageUrl: "assets/images/img12.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "Venux AI Lab & Infinity",
    year: "2026",
    description: "Custom AI-assisted prompt-to-vector branding system and generative aesthetic UI built using Vibe Coding & Midjourney pipeline.",
    tags: ["Generative AI Design", "Vibe Coding", "Futuristic UI", "AI Workflows"],
    deliverables: ["Prompt Engineering Pipelines", "Generative Logo Systems", "Web App Prototype", "CPD AI Case Study"],
    toolsUsed: ["Vibe Coding", "AI Workflows", "Figma"]
  },
  {
    id: "identities",
    title: "",
    category: "AI & Tech",
    imageUrl: "assets/images/img14.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "identities usa",
    year: "2026",
    description: "AI facial detection program that helps companies take attendance, track work ethics, record workplace norms.",
    tags: ["AI face detection", "Face Identify", "facial recognition", "AI tracking"],
    deliverables: ["Logo", "Brand guide", "Prototypes", "Lookbook Art"],
    toolsUsed: ["CorelDRAW", "Photoshop", "Illustrator"]
  },
  {
    id: "Northen Lights-Designs",
    title: "",
    category: "Logo & Brand System",
    imageUrl: "assets/images/img15.jpg?q=80&w=1200&auto=format&fit=crop",
    client: "Northen Lights-Designs",
    year: "2024",
    description: "Homes that are designed for Polar regions, specifically artic zones.",
    tags: ["Developer", "Realtor", "Home builder", "Polar regions"],
    deliverables: ["Dial Monogram Vector", "Brand Book", "Web Design"],
    toolsUsed: ["Illustrator", "CorelDRAW", "Figma"]
  },
  {
    id: "orbit-17",
    title: "Noir Botanica — Essential Oils",
    category: "Apparel & Packaging",
    imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1200&auto=format&fit=crop",
    client: "Noir Botanica Paris",
    year: "2023",
    description: "Matte black glass dropper bottle with embossed gold foil typography.",
    tags: ["Packaging Design", "Cosmetics", "Gold Foil"],
    deliverables: ["Dropper Bottle Vector", "Box Packaging Die-Cut", "3D Render"]
  },
  {
    id: "orbit-18",
    title: "Chrono Syndicate — Web3 Membership Pass",
    category: "Web UI & NFT",
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
    client: "Chrono DAO",
    year: "2024",
    description: "Holographic chrome membership cards with procedural particle shaders.",
    tags: ["Web3 Pass", "3D Hologram", "Interactive Web"],
    deliverables: ["3D Card Animation", "Metadata Schema", "Mint Page UI"]
  },
  {
    id: "orbit-19",
    title: "Atelier Vesper — Luxury Editorial Magazine",
    category: "Print Media",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
    client: "Vesper Publishing Zurich",
    year: "2024",
    description: "High-contrast Swiss typography grid layout, duplex metallic spot ink.",
    tags: ["Editorial", "Magazine Design", "Swiss Grid"],
    deliverables: ["Editorial Layout System", "Cover Art Vector", "Print Specification"]
  },
  {
    id: "orbit-20",
    title: "Hyperion Pulse — Ambient Audio Synthesizer",
    category: "Digital Art",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop",
    client: "Hyperion Sound Lab",
    year: "2025",
    description: "Generative audio-reactive waveform branding and interactive stage visualizers.",
    tags: ["Generative Art", "Audio Visualizer", "Vibe Code"],
    deliverables: ["Audio Reactive Canvas", "Stage Visuals", "UI Design"]
  },
  {
    id: "orbit-21",
    title: "Solace Coffee — Single Origin Packaging",
    category: "Apparel & Packaging",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop",
    client: "Solace Roasters Kyoto",
    year: "2023",
    description: "Wabi-sabi minimalist coffee pouch with textured Japanese washi paper label.",
    tags: ["Coffee Branding", "Packaging", "Minimalism"],
    deliverables: ["Pouch Print Die-Cut", "Custom Calligraphy", "Brand Book"]
  },
  {
    id: "orbit-22",
    title: "Vortex Kinetics — EV Supercar Badge",
    category: "Logo & Brand System",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    client: "Vortex Automotive Munich",
    year: "2024",
    description: "Aerodynamic sculpted chrome emblem with speed lines and razor-sharp wordmark.",
    tags: ["Automotive Logo", "Chrome Badge", "Industrial"],
    deliverables: ["3D Emblem CAD Vector", "Badge Stamping Spec", "Identity Guide"]
  },
  {
    id: "orbit-23",
    title: "Komorebi — Silk Scarf Collection",
    category: "Apparel & Packaging",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
    client: "Komorebi Silk Kyoto",
    year: "2024",
    description: "Intricate botanical screen prints and gold leaf foil gift box wrapping.",
    tags: ["Apparel Pattern", "Silk Print", "Luxury Packaging"],
    deliverables: ["Repeat Pattern Vector", "Gift Box Art", "Lookbook"]
  },
  {
    id: "orbit-24",
    title: "Prism Protocol — DeFi Dashboard UI",
    category: "Web UI & NFT",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    client: "Prism Financial",
    year: "2024",
    description: "Glassmorphic crypto trading terminal with glowing neon telemetry gauges.",
    tags: ["UI/UX Design", "DeFi Terminal", "Dark Mode UI"],
    deliverables: ["Complete UI Design System", "Figma Components", "Interactive Prototype"]
  },
  {
    id: "orbit-25",
    title: "Cinephile Vault — Film Festival Identity",
    category: "Print Media",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
    client: "International Independent Cinema",
    year: "2023",
    description: "Bold experimental movie festival poster series with risograph halftone effects.",
    tags: ["Poster Art", "Risograph", "Film Festival"],
    deliverables: ["B1 Poster Series", "Event Booklet", "Street Banners"]
  },
  {
    id: "orbit-26",
    title: "Aura Neural — AI Prompt Architect",
    category: "Digital Art",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop",
    client: "Aura Intelligence",
    year: "2026",
    description: "Hyper-dimensional fluid iridescent artwork and generative typography.",
    tags: ["AI Art", "Generative Graphics", "3D Shaders"],
    deliverables: ["Generative Art Library", "4K Canvas Loops", "Album Art"]
  },
  {
    id: "orbit-27",
    title: "Helios Botanical — Organic Gin Bottle",
    category: "Apparel & Packaging",
    imageUrl: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=1200&auto=format&fit=crop",
    client: "Helios Distillers London",
    year: "2023",
    description: "Sunburst gold foil crest and bespoke botanical illustrations on dark amber glass.",
    tags: ["Spirits Packaging", "Botanical Art", "Gold Foil"],
    deliverables: ["Bottle Label Art", "Crest Vector", "Wood Box Laser Engrave Spec"]
  },
  {
    id: "orbit-28",
    title: "Monolith Records — Vinyl Packaging & Logo",
    category: "Logo & Brand System",
    imageUrl: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1200&auto=format&fit=crop",
    client: "Monolith Electronic Music",
    year: "2024",
    description: "Minimalist brutalist square logomark with embossed heavy gatefold vinyl sleeve.",
    tags: ["Record Label", "Brutalism", "Vinyl Sleeve"],
    deliverables: ["Record Label Logo", "Gatefold Sleeve Design", "Record Center Labels"]
  },
  {
    id: "orbit-29",
    title: "Valkyrie Heavy — Tactical Streetwear",
    category: "Apparel & Packaging",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
    client: "Valkyrie Division",
    year: "2024",
    description: "Cyber-industrial technical wear garments, rubberized patch badges, reflective screen ink.",
    tags: ["Techwear", "Garment Graphics", "Rubber Patch"],
    deliverables: ["Tech Pack Specifications", "Vector Badge Art", "Hangtags"]
  },
  {
    id: "orbit-30",
    title: "Zenith Studio — Architectural Monograph",
    category: "Print Media",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
    client: "Zenith Architects Milan",
    year: "2024",
    description: "Hardcover linen-wrapped architecture monograph with blind debossed typography.",
    tags: ["Architecture Book", "Linen Hardcover", "Deboss"],
    deliverables: ["Hardcover Book Layout", "Slipcase Vector Art", "Custom Grid"]
  }
];

// ============================================================================
// 2. PORTFOLIO PAGE SECTIONS — 60 CURATED GALLERY ITEMS
// (Organized into 5 distinct categories, pure image showcases)
// ============================================================================
window.VENUX_PORTFOLIO_SECTIONS = {
  
  // --------------------------------------------------------------------------
  // SECTION 1: LOGO & BRAND SYSTEM (16 Containers)
  // --------------------------------------------------------------------------
  "logo-brand": {
    title: "Logo & Brand System",
    subtitle: "16 Iconic Brand Marks, Vectors & Visual Identities",
    count: 16,
    items: [
      { id: "lb-1", title: "Sea Basket Logo", imageUrl: "assets/images/portfolio/L1.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-2", title: "Medina Timber", imageUrl: "assets/images/portfolio/L2.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-3", title: "Paradise Chicken", imageUrl: "assets/images/portfolio/L3.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-4", title: "Feeling Private", imageUrl: "assets/images/portfolio/L4.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-5", title: "Gear Squid Equipments", imageUrl: "assets/images/portfolio/L5.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-6", title: "Nounours Food", imageUrl: "assets/images/portfolio/L6.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-7", title: "Grozap-Grocery app", imageUrl: "assets/images/portfolio/L7.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-8", title: "Starr Codd legacy", imageUrl: "assets/images/portfolio/L8.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-9", title: "AR Aerospace", imageUrl: "assets/images/portfolio/L9.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-10", title: "Espressly Coffee", imageUrl: "assets/images/portfolio/L10.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-11", title: "Meat Monkeys", imageUrl: "assets/images/portfolio/L11.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-12", title: "Riiva Silver", imageUrl: "assets/images/portfolio/L12.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-13", title: "Attraxion logo", imageUrl: "assets/images/portfolio/L13.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-14", title: "Content Castle", imageUrl: "assets/images/portfolio/L14.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-15", title: "Soar Energy", imageUrl: "assets/images/portfolio/L15.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "lb-16", title: "Shadow Automotive", imageUrl: "assets/images/portfolio/L16.webp?q=80&w=1000&auto=format&fit=crop" }
    ]
  },

  // --------------------------------------------------------------------------
  // SECTION 2: APPAREL & PACKAGING (12 Containers)
  // --------------------------------------------------------------------------
  "apparel-packaging": {
    title: "Apparel & Packaging",
    subtitle: "12 Luxury Box Sets, Streetwear Specs & Cosmetics",
    count: 12,
    items: [
      { id: "ap-1", title: "CYS apparels", imageUrl: "assets/images/portfolio/a1.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "ap-2", title: "Vibe Drikns", imageUrl: "assets/images/portfolio/a2.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "ap-3", title: "Eternal Aliens", imageUrl: "assets/images/portfolio/a3.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "ap-4", title: "Eternal Aliens", imageUrl: "assets/images/portfolio/a4.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "ap-5", title: "Wedding events", imageUrl: "assets/images/portfolio/a5.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "ap-6", title: "The Meat Masters", imageUrl: "assets/images/portfolio/a6.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "ap-7", title: "FLOW SUPPLEMENTS", imageUrl: "assets/images/portfolio/a7.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "ap-8", title: "AGAVE DRINKS", imageUrl: "assets/images/portfolio/a8.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "ap-9", title: "Nanu Nanu", imageUrl: "assets/images/portfolio/a9.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "ap-10", title: "CYS v2", imageUrl: "assets/images/portfolio/a10.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "ap-11", title: "Petides Pet Care", imageUrl: "assets/images/portfolio/a11.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "ap-12", title: "Stone Crab Foods", imageUrl: "assets/images/portfolio/a12.webp?q=80&w=1000&auto=format&fit=crop" }
    ]
  },

  // --------------------------------------------------------------------------
  // SECTION 3: WEB UI & NFT (8 Containers)
  // --------------------------------------------------------------------------
  "web-ui-nft": {
    title: "Web UI & NFT",
    subtitle: "8 Digital Ecosystems, Web3 Synergies & Dark Interfaces",
    count: 8,
    items: [
      { id: "wn-1", title: "NFT EVILGODDESS", imageUrl: "assets/images/portfolio/w1.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "wn-2", title: "NFT EVILGODDESS 2", imageUrl: "assets/images/portfolio/w2.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "wn-3", title: "Little Doge UI", imageUrl: "assets/images/portfolio/w3.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "wn-4", title: "MEGA UI", imageUrl: "assets/images/portfolio/w4.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "wn-5", title: "FOXY FENNECS GANG Web Interface", imageUrl: "assets/images/portfolio/w5.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "wn-6", title: "Panchabhut WEB UI", imageUrl: "assets/images/portfolio/w6.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "wn-7", title: "SOULVERSE NFT", imageUrl: "assets/images/portfolio/w7.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "wn-8", title: "GALAXY VILLAINS NFT", imageUrl: "assets/images/portfolio/w8.webp?q=80&w=1000&auto=format&fit=crop" }
    ]
  },

  // --------------------------------------------------------------------------
  // SECTION 4: PRINT MEDIA (12 Containers)
  // --------------------------------------------------------------------------
  "print-media": {
    title: "Print Media",
    subtitle: "12 Editorial Spreads, Silk Screens, Posters & Lookbooks",
    count: 12,
    items: [
      { id: "pm-1", title: "Japan Tourism Poster", imageUrl: "assets/images/portfolio/p1.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "pm-2", title: "Pushup challenge Poster", imageUrl: "assets/images/portfolio/p2.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "pm-3", title: "Zoom Loans Car Wrap", imageUrl: "assets/images/portfolio/p3.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "pm-4", title: "Thank you Business Cards", imageUrl: "assets/images/portfolio/p4.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "pm-5", title: "UBA LABELS", imageUrl: "assets/images/portfolio/p5.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "pm-6", title: "HEREIK Books", imageUrl: "assets/images/portfolio/p6.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "pm-7", title: "MBM Gadget Prints", imageUrl: "assets/images/portfolio/p7.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "pm-8", title: "Charging America VC", imageUrl: "assets/images/portfolio/p8.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "pm-9", title: "TEPACHE Label Prints", imageUrl: "assets/images/portfolio/p9.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "pm-10", title: "ART JUNCTION Poster Print", imageUrl: "assets/images/portfolio/p10.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "pm-11", title: "Celin Bridal Couture VC", imageUrl: "assets/images/portfolio/p11.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "pm-12", title: "Calendar Print", imageUrl: "assets/images/portfolio/p12.webp?q=80&w=1000&auto=format&fit=crop" }
    ]
  },

  // --------------------------------------------------------------------------
  // SECTION 5: DIGITAL ART (12 Containers)
  // --------------------------------------------------------------------------
  "digital-art": {
    title: "Digital Art",
    subtitle: "12 Generative AI Compositions, 3D Renders & Shaders",
    count: 12,
    items: [
      { id: "da-1", title: "Astral Shimmer Generative AI", imageUrl: "assets/images/portfolio/d1.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "da-2", title: "Fluorescent Cyber Dimension", imageUrl: "assets/images/portfolio/d2.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "da-3", title: "Tactile Chrome Fluid Synth", imageUrl: "assets/images/portfolio/d3.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "da-4", title: "Ethereal Dreamscape AI", imageUrl: "assets/images/portfolio/d4.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "da-5", title: "Dark Matter Volumetric Light", imageUrl: "assets/images/portfolio/d5.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "da-6", title: "Geometric Prism Refraction", imageUrl: "assets/images/portfolio/d6.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "da-7", title: "Organic Gold Molten Wave", imageUrl: "assets/images/portfolio/d7.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "da-8", title: "Neo-Noir Cyberpunk Portrait", imageUrl: "assets/images/portfolio/d8.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "da-9", title: "Abstract Topographic Wireframe", imageUrl: "assets/images/portfolio/d9.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "da-10", title: "Deep Space Quantum Portal", imageUrl: "assets/images/portfolio/d10.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "da-11", title: "Holographic Iridescent Cloth", imageUrl: "assets/images/portfolio/d11.webp?q=80&w=1000&auto=format&fit=crop" },
      { id: "da-12", title: "Parametric Architecture Render", imageUrl: "assets/images/portfolio/d12.webp?q=80&w=1000&auto=format&fit=crop" }
    ]
  }
};

// ============================================================================
// 3. VIBE CODING PROJECTS
// ============================================================================
window.VENUX_VIBE_PROJECTS = [
  {
    id: "briefr",
    name: "briefr",
    tagline: "AI design brief summarizer & creative scope extraction pipeline.",
    category: "VIBE CODE",
    tech: ["TypeScript", "Gemini AI", "Vite"],
    link: "https://github.com/gokuleashwar/briefr"
  },
  {
    id: "shadowprofile",
    name: "shadowprofile",
    tagline: "Anonymous digital identity & generative Web3 avatar synth.",
    category: "IDENTITY ENGINE",
    tech: ["React", "Canvas", "WebGL"],
    link: "https://github.com/gokuleashwar/shadowprofile"
  },
  {
    id: "Imagemusic",
    name: "Imagemusic",
    tagline: "Generative image-to-ambient audio vibe visualizer.",
    category: "AUDIO VISUAL",
    tech: ["Web Audio API", "Vision AI"],
    link: "https://github.com/gokuleashwar/imagemusic"
  },
  {
    id: "promptcraft",
    name: "promptcraft",
    tagline: "Prompt engineering studio & brand asset generation suite.",
    category: "GENERATIVE AI",
    tech: ["Next.js", "Diffusion", "Tailwind"],
    link: "https://github.com/gokuleashwar/promptcraft"
  },
  {
    id: "vectorshift",
    name: "vectorshift",
    tagline: "Automated vector color separator for screen printing & apparel.",
    category: "PRINT AUTOMATION",
    tech: ["SVG Engine", "Node.js"],
    link: "https://github.com/gokuleashwar/vectorshift"
  },
  {
    id: "chromaverse",
    name: "chromaverse",
    tagline: "Algorithmic color harmony & tactile noise shader playground.",
    category: "SHADERS & UI",
    tech: ["GLSL", "Three.js"],
    link: "https://github.com/gokuleashwar/chromaverse"
  }
];
