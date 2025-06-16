import Button from '../components/button';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
      <p className="text-lg text-gray-400">
        This is a simple React application.
      </p>
      <Button variant="success" isLoading className="mt-6">
        Get Started
      </Button>
    </div>
  );
};

export default Home;
