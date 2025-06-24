export default function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:scale-105 transition">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
