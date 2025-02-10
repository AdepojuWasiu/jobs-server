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
    console.log('To test the server you can use POSTMAN');
    console.log(`To register user send post request url: https://jobs-red-ten.vercel.app/api/auth/register  body: {
                     "name": "Your name",
                    "email": "youremail@gmail.com",
                      "password": "your passwoed"
                    }`
                  
                  );

     console.log(`To login user send post request url: https://jobs-red-ten.vercel.app/api/auth/login body: {
                     "email": "youremail@gmail.com",
                       "password": "your passwoed"
                     }
                       
                     `);

    console.log(`To register jobs send post request url: https://jobs-red-ten.vercel.app/api/jobs body: {

            "title": "job title",
            "company": "Company name",
            "location": "Location of job",
            "requirements": "requiremwnts for the job"
        }
            
        `);
     console.log(`To fetch all jobs send get request url: https://jobs-red-ten.vercel.app/api/jobs body:none
          
      `);
     
  }

})();

module.exports = supabase;
