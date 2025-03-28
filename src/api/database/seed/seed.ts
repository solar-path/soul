import { seedCountryData } from "./country/country.seed";
import { seedIndustryData } from "./industry/industry.seed";

const main = async () => {
  console.log("start seeding data");

  try {
    await seedCountryData();
    await seedIndustryData();
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  }
};

main();
