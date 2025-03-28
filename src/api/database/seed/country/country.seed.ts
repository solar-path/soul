import { db } from "../../database";
import countryData from "./country.data.json";
import { countryTable } from "../../schema/business.schema";

export const seedCountryData = async () => {
  const countryList = await db.select().from(countryTable);

  if (countryList.length > 0) {
    return;
  } else {
    for (const country of countryData) {
      await db
        .insert(countryTable)
        .values({
          id: crypto.randomUUID(),
          title: country.name,
          ISO3: country.iso3,
          currency: country.currency,
          currencyCode: country.currency_symbol,
        })
        .returning();
      console.log(`✅ Created record: ${country.name} `);
    }
  }
};
