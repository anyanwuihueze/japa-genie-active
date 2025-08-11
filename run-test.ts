import { config } from 'dotenv';
config();

import { generateVisaInsights } from './src/ai/flows/insights-canvas';

async function runTest() {
  console.log('--- Starting Visa Insights Test ---');

  const testData = {
    profile: 'I am a software engineer with 5 years of experience in web development. I have a Bachelor\'s degree in Computer Science and I am proficient in JavaScript, TypeScript, and Python.',
    destination: 'Canada',
    budget: 15000,
  };

  try {
    console.log('Calling generateVisaInsights with test data...');
    const result = await generateVisaInsights(testData);
    console.log('--- Test Succeeded ---');
    console.log('Result:');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('--- Test Failed ---');
    console.error('Error:');
    console.error(error);
  } finally {
    console.log('--- Visa Insights Test Finished ---');
  }
}

runTest();
