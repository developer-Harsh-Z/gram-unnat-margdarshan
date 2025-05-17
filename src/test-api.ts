import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Test Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Test OpenAI configuration
const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

console.log('Testing API configurations...');

// Test Supabase
if (supabaseUrl && supabaseKey) {
  console.log('Supabase configuration found!');
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Test Supabase connection
  supabase.from('your_table').select('*').limit(1)
    .then(({ data, error }) => {
      if (error) {
        console.error('Supabase connection error:', error.message);
      } else {
        console.log('Supabase connection successful!');
      }
    });
} else {
  console.error('Supabase configuration missing!');
}

// Test OpenAI
if (openaiKey) {
  console.log('OpenAI configuration found!');
  const openai = new OpenAI({
    apiKey: openaiKey,
    dangerouslyAllowBrowser: true
  });
  
  // Test OpenAI connection
  openai.models.list()
    .then(() => {
      console.log('OpenAI connection successful!');
    })
    .catch((error) => {
      console.error('OpenAI connection error:', error.message);
    });
} else {
  console.error('OpenAI configuration missing!');
} 