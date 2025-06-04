import Button from "../../components/Button";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      <p>This is the main entry point of our application.</p>
      <p>Feel free to explore the features and functionalities we offer.</p>
      <Button variants="secondary" isLoading={false}>
        Click Me
      </Button>
    </div>
  );
}
