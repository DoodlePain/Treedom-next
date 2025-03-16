import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { input, field } = req.body;
  console.log("🚀 ~ handler ~ req.body:", req.body);

  // Simulate server validation
  let isValid = false;
  let message = '';

  switch (field) {
    case 'username':
      isValid = input.length >= 3; // Example validation: username must be at least 3 characters
      message = isValid ? '' : 'Username must be at least 3 characters';
      break;
    case 'email':
      isValid = /\S+@\S+\.\S+/.test(input); // Simple email validation
      message = isValid ? '' : 'Invalid email address';
      break;
    case 'password':
      isValid = input.length >= 6; // Example validation: password must be at least 6 characters
      message = isValid ? '' : 'Password must be at least 6 characters';
      break;
    default:
      message = 'Invalid field';
  }

  if (isValid) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message });
  }
}
