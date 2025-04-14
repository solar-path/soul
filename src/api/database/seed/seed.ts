import { seedCountryData } from "./country/country.seed";
import { seedIndustryData } from "./industry/industry.seed";
import { seedAdminUser } from "./users/admin.seed";
import { seedPosts } from "./posts/posts.seed";

const main = async () => {
  console.log("start seeding data");

  try {
    const admin = await seedAdminUser();
    await seedPosts(admin);
    await seedCountryData();
    await seedIndustryData();
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  }
};

main();
