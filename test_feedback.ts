import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testFeedback() {
  console.log("Testing Supabase Feedback Insertion...");
  const { error } = await supabase
    .from('feedback')
    .insert([
      {
        name: 'Antigravity Test Agent',
        email: 'test@antigravity.ai',
        category: 'bug',
        message: 'This is an automated test from Antigravity to verify the Supabase -> GitHub webhook integration is working successfully.'
      }
    ]);

  if (error) {
    console.error("❌ Error inserting into Supabase:", error);
  } else {
    console.log("✅ Successfully inserted into Supabase.");
    console.log("Please check your GitHub Issues to see if the webhook fired successfully!");
  }
}

testFeedback();
