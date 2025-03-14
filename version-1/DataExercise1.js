const userProfiles = [
    {
        fullName: "katmarie",
        email: "katmarie@example.com",
        country: "United States",
        bio: "Frontend Engineer passionate about coding and design.",
    },
    {
        fullName: "lilianast",
        email: "liliana@example.com",
        country: "Poland",
        bio: "Aspiring data analyst with a knack for visualization.",
    },

];
const savedCountries = [
    {
        fullName: "katmarie",
        countries: ["Japan", "Canada", "Australia"],
    },
    {
        fullName: "lilianast",
        countries: ["France", "Germany", "Italy"],
    },

];
const countryViews = [
    {
        country: "United States",
        views: 15,
    },
    {
        country: "Japan",
        views: 25,
    },
    {
        country: "Canada",
        views: 10,
    },

];

function addUserProfile(fullName, email, country, bio) {
    userProfiles.push({ fullName, email, country, bio });
}
addUserProfile("New User", "newuser@example.com", "Brazil", "Traveler and foodie.");

function addSavedCountry(fullName, country) {
    const user = savedCountries.find((user) => user.fullName === fullName);
    if (user) {
        if (!user.countries.includes(country)) {
            user.countries.push(country);
        }
    } else {
        savedCountries.push({ fullName, countries: [country] });
    }
}
addSavedCountry("Kat Marie", "Mexico");

//wix cookie
const products = [
    {
      id: 1,
      name: "Chocolate Chip Cookie",
      price: 2.99,
      description: "Classic chewy chocolate chip cookies, made with real butter and premium chocolate.",
      stock: 50,
      category: "Classic",
      imageUrl: "/images/chocolate-chip.jpg"
    },
    {
      id: 2,
      name: "Oatmeal Raisin Cookie",
      price: 2.79,
      description: "Soft and chewy oatmeal cookies with plump raisins and a hint of cinnamon.",
      stock: 40,
      category: "Healthy",
      imageUrl: "/images/oatmeal-raisin.jpg"
    },
    {
      id: 3,
      name: "Peanut Butter Cookie",
      price: 2.99,
      description: "Rich, nutty peanut butter cookies with a soft center and crisp edges.",
      stock: 35,
      category: "Nutty",
      imageUrl: "/images/peanut-butter.jpg"
    },
    {
      id: 4,
      name: "Macadamia White Chocolate Cookie",
      price: 3.49,
      description: "Decadent white chocolate chunks paired with crunchy macadamia nuts.",
      stock: 30,
      category: "Premium",
      imageUrl: "/images/macadamia-white-chocolate.jpg"
    }
  ];
  
  const customers = [
    {
      id: 101,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      address: "123 Cookie St, New York, NY 10001",
      orderHistory: [2001, 2003] // Order IDs
    },
    {
      id: 102,
      name: "John Smith",
      email: "john.smith@example.com",
      address: "456 Sugar Ln, Los Angeles, CA 90012",
      orderHistory: [2002]
    }
  ];

  const orders = [
    {
      orderId: 2001,
      customerId: 101,
      items: [
        { productId: 1, quantity: 3 }, // 3 Chocolate Chip Cookies
        { productId: 3, quantity: 1 }  // 1 Peanut Butter Cookie
      ],
      total: 11.96, // (3 × 2.99) + (1 × 2.99)
      status: "Shipped",
      date: "2025-03-14"
    },
    {
      orderId: 2002,
      customerId: 102,
      items: [
        { productId: 2, quantity: 2 }, // 2 Oatmeal Raisin Cookies
        { productId: 4, quantity: 1 }  // 1 Macadamia White Chocolate Cookie
      ],
      total: 9.77, // (2 × 2.79) + (1 × 3.49)
      status: "Processing",
      date: "2025-03-15"
    },
    {
      orderId: 2003,
      customerId: 101,
      items: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 1 }
      ],
      total: 5.78, // (1 × 2.99) + (1 × 2.79)
      status: "Delivered",
      date: "2025-03-10"
    }
  ];
  //fineart studio
  const userProfile = {
    name: "Jill Anderson",
    role: "UI Designer",
    quote: "I'm looking for a site that will simplify the planning of my business trips.",
    details: {
      age: 26,
      status: "Single",
      location: "Brooklyn",
      archetype: "Frequent Flyer"
    },
    traits: ["Organized", "Protective", "Practical", "Hardworking", "Passionate", "Punctual"],
    bio: "Jill is a Regional Director who travels 4-8 times each month for work. She has a specific region in which she travels, and she often visits the same cities and stays at the same hotel. She is frustrated by the fact that no matter how frequently she takes similar trips, she spends hours of her day booking travel. She expects her travel solutions to be as organized as she is.",
    motivations: {
      price: 30,
      comfort: 60,
      convenience: 90,
      speed: 50,
      loyaltyMiles: 40
    },
    personality: {
      introvert: 20,
      extrovert: 80,
      analytical: 30,
      creative: 70,
      loyal: 10,
      fickle: 90,
      passive: 20,
      active: 80
    },
    goals: [
      "To spend less time booking travel",
      "To narrow her options quickly"
    ],
    frustrations: [
      "Too much time spent booking - she's busy!",
      "Too many websites visited per trip",
      "Not terribly tech-savvy - doesn't like the process"
    ],
    favoriteBrands: ["Adidas", "Nike", "Netflix", "Airbnb", "Zara"]
  };
  