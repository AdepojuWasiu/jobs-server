const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPERBASE_URL;
const supabaseKey = process.env.SUPERBASE_KEY ;

const supabase = createClient(supabaseUrl, supabaseKey);

// Test Supabase Connection
(async () => {
  const { data, error } = await supabase.from('jobs').select('*').limit(1);
  
  if (error) {
    console.error('Supabase connection failed: ', error.message);
  } else {
    console.log('✅ Supabase connected successfully!');
  }

})();

module.exports = supabase;
