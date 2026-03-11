export const festiveConfig = {
  // NOTE: The active festival is now managed via the Sanity Dashboard.
  // This 'activeFestival' value now only serves as a fallback/default.
  activeFestival: "standard",

  festivals: {
    standard: {
      id: "standard",
      name: "Signature",
      title: "The Signature Selection",
      subtitle:
        "Everyday elegance handcrafted just for you. Discover our signature pieces that add beauty to your home and life, all year round.",
      heroImage: "/assets/festivals/standard_banner.webp",
      accentStyle: {
        textHighlight: "text-stone-300",
        bg: "bg-stone-900/40",
        buttonGradient: "from-stone-700 to-stone-900",
        buttonHover: "hover:from-stone-600 hover:to-stone-800",
        border: "border-stone-800",
      },
      accentIcon: "✨",
      collectionLink: "/resin-products",
      buttonText: "Browse Full Collection",
    },
    ramzan: {
      id: "ramzan",
      name: "Ramzan",
      title: "Ramzan Kareem Gifting with Grace",
      subtitle:
        "Thoughtful and elegant handcrafted gifts to celebrate the spirit of Ramzan. Perfect for sharing joy and blessings.",
      heroImage: "/assets/festivals/ramzan_banner.webp",
      accentStyle: {
        textHighlight: "text-green-300",
        bg: "bg-green-950/40",
        buttonGradient: "from-green-700 to-green-900",
        buttonHover: "hover:from-green-600 hover:to-green-800",
        border: "border-green-800",
      },
      accentIcon: "☪️",
      collectionLink: "/resin-products",
      buttonText: "Shop Ramzan Collection",
    },
    eid: {
      id: "eid",
      name: "Eid",
      title: "Celebrate Eid with Elegance",
      subtitle:
        "Discover our exclusive curated collection of premium handcrafted gifts, designed to make your Eid celebrations truly memorable.",
      heroImage: "/assets/festivals/eid_banner.webp",
      accentStyle: {
        textHighlight: "text-emerald-300",
        bg: "bg-emerald-950/40",
        buttonGradient: "from-emerald-700 to-emerald-900",
        buttonHover: "hover:from-emerald-600 hover:to-emerald-800",
        border: "border-emerald-800",
      },
      accentIcon: "🌙",
      collectionLink: "/resin-products",
      buttonText: "Explore Eid Collection",
    },
    valentine: {
      id: "valentine",
      name: "Valentine",
      title: "Valentine Gift Crafted with Love",
      subtitle:
        "Express your love with our bespoke handcrafted collection. Timeless gifts for the moments that matter most.",
      heroImage: "/assets/festivals/valentine_banner.webp",
      accentStyle: {
        textHighlight: "text-rose-300",
        bg: "bg-rose-950/40",
        buttonGradient: "from-rose-600 to-rose-800",
        buttonHover: "hover:from-rose-500 hover:to-rose-700",
        border: "border-rose-800",
      },
      accentIcon: "❤️",
      collectionLink: "/resin-products",
      buttonText: "Shop Love Collection",
    },
    rakhi: {
      id: "rakhi",
      name: "Rakhi",
      title: "The Royal Rakhi Edit",
      subtitle:
        "Exquisite handcrafted gifts to cherish the beautiful bond between brothers and sisters. Luxury gifting for Raksha Bandhan.",
      heroImage: "/assets/festivals/rakhi_banner.webp",
      accentStyle: {
        textHighlight: "text-orange-300",
        bg: "bg-orange-950/40",
        buttonGradient: "from-orange-600 to-orange-810",
        buttonHover: "hover:from-orange-500 hover:to-orange-700",
        border: "border-orange-800",
      },
      accentIcon: "✨",
      collectionLink: "/resin-products",
      buttonText: "Explore Rakhi Gifting",
    },

    diwali: {
      id: "diwali",
      name: "Diwali",
      title: "Illuminate Your Diwali",
      subtitle:
        "Premium luxurious gifting options to light up the festive season. Handcrafted elegance for the perfect festive glow.",
      heroImage: "/assets/festivals/diwali_banner.webp",
      accentStyle: {
        textHighlight: "text-amber-300",
        bg: "bg-amber-950/40",
        buttonGradient: "from-amber-600 to-amber-800",
        buttonHover: "hover:from-amber-500 hover:to-amber-700",
        border: "border-amber-800",
      },
      accentIcon: "🪔",
      collectionLink: "/resin-products",
      buttonText: "Shop Diwali Gifting",
    },
  },
};
