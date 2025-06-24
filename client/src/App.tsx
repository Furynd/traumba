import Card from './components/Card';

export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-sky-100 p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Traumba 🌱</h1>
      <Card title="Dream Card" description="Define your vision or future goal." />
    </main>
  );
}
