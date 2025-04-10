// Test script for slugify utility
import { createBasicSlug, generateUniqueSlug } from "./src/api/utils/slugify";

// Test the basic slug creation
const testBasicSlug = () => {
  const input = "stratu, inc.";
  const result = createBasicSlug(input);
  console.log(`Input: "${input}"`);
  console.log(`Basic slug: "${result}"`);
};

// Test the unique slug generation
const testUniqueSlug = async () => {
  const input = "stratu, inc.";
  const result = await generateUniqueSlug(input);
  console.log(`Unique slug: "${result}"`);

  // Test with an existing ID (simulating an update)
  const updateResult = await generateUniqueSlug(input, "existing-id");
  console.log(`Update slug: "${updateResult}"`);
};

// Run the tests
const runTests = async () => {
  testBasicSlug();
  await testUniqueSlug();
};

runTests().catch(console.error);
