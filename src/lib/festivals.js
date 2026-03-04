export const festiveConfig = {
  // NOTE: Change this activeFestival to 'holi' or 'diwali' to automatically update the website section.
  activeFestival: "eid",

  festivals: {
    eid: {
      id: "eid",
      name: "Eid",
      title: "Celebrate Eid with Elegance",
      subtitle:
        "Discover our exclusive curated collection of premium handcrafted gifts, designed to make your Eid celebrations truly memorable.",
      heroImage: "/assets/festivals/eid-banner.png",
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
    holi: {
      id: "holi",
      name: "Holi",
      title: "Vibrant Gifts for a Colorful Holi",
      subtitle:
        "Add a touch of joy and bespoke color to your celebrations with our vibrant handcrafted masterpieces.",
      heroImage: "/assets/festivals/holi-banner.png",
      accentStyle: {
        textHighlight: "text-fuchsia-300",
        bg: "bg-fuchsia-950/40",
        buttonGradient: "from-fuchsia-600 to-fuchsia-800",
        buttonHover: "hover:from-fuchsia-500 hover:to-fuchsia-700",
        border: "border-fuchsia-800",
      },
      accentIcon: "✨",
      collectionLink: "/resin-products",
      buttonText: "Discover Vibrant Pieces",
    },
    diwali: {
      id: "diwali",
      name: "Diwali",
      title: "Illuminate Your Diwali",
      subtitle:
        "Premium luxurious gifting options to light up the festive season. Handcrafted elegance for the perfect festive glow.",
      heroImage: "/assets/festivals/diwali-banner.png",
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
