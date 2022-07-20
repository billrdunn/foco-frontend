const initialItems = [
    {
      latin: "Agaricus arvensis",
      common: ["Horse Mushroom"],
      description: {
        cap: "White, sometimes discoloured grey/brown...",
        gills: "When young the gills are almost white...",
        stem: "Stout with a large double ring.",
        flesh: "White, firm, and brusing slightly yellow.",
        spores: "Dark purple/brown.",
      },
      habitat: "Pasture, meadows, lawns, road verges, parks. Often growing in rings.",
      image:
        "https://commons.wikimedia.org/wiki/Agaricus_arvensis#/media/File:2008-08-Agaricus-Stuttgart.JPG",
      flavour: "Excellent. Smells of aniseed. Should be cooked before consumption.",
      frequency: "Common.",
    },
    {
      latin: "Agaricus augustus",
      common: ["The Prince"],
      description: {
        cap: "Spherical when young becoming convex...",
        gills: "Gills starting off white to pink, maturing to dark brown...",
        stem: "White to pale cream and smoooth above the skirt...",
        flesh: "White, sometimes with a yellow tinge where cut or bruised.",
        spores: "Dark purple/brown.",
      },
      habitat: "Mixed woodland, particularly under conifers. Lawns and roadsides.",
      image:
        "https://commons.wikimedia.org/wiki/Category:Agaricus_augustus#/media/File:Agaricus_augustus_2011_G1.jpg",
      flavour: "Excellent. Smells of bitter almonds. Should be cooked before consumption.",
      frequency: "Uncommon.",
    },
  ];
  
  const initialUser = {
    name: "Test User",
    username: "testUser",
    password: "test-user-password",
  };

  module.exports = {
    initialItems,
    initialUser
  };
  