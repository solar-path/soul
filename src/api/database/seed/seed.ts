import { seedCountryData } from "./country/country.seed";
import { seedIndustryData } from "./industry/industry.seed";
import { seedAdminUser } from "./users/admin.seed";

const main = async () => {
  console.log("start seeding data");

  try {
    await seedAdminUser();
    await seedCountryData();
    await seedIndustryData();
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  }
};

main();
