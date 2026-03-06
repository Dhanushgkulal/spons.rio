// Mock accounts for testing
// You can add your own accounts here

export interface MockAccount {
  email: string;
  password: string;
  name: string;
  role: 'organizer' | 'sponsor';
  id: string;
}

export const mockAccounts: MockAccount[] = [
  {
    id: 'user_organizer_1',
    email: 'organizer@test.com',
    password: 'password123',
    name: 'John Organizer',
    role: 'organizer',
  },
  {
    id: 'user_sponsor_1',
    email: 'sponsor@test.com',
    password: 'password123',
    name: 'Jane Sponsor',
    role: 'sponsor',
  },
  // Add your own account here:
  // {
  //   id: 'user_custom_1',
  //   email: 'your-email@example.com',
  //   password: 'your-password',
  //   name: 'Your Name',
  //   role: 'organizer', // or 'sponsor'
  // },
];

export const findMockAccount = (email: string, password: string) => {
  return mockAccounts.find(
    (account) => account.email === email && account.password === password
  );
};
