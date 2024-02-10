const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const email = 'use r@example.com';
if (emailRegex.test(email)) {
  console.log('Valid email address');
} else {
  console.log('Invalid email address');
}