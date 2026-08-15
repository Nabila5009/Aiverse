import ToolCard from "./ToolCard";
import tools from "../data/tools";

function ToolsSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-white">

      {/* Background Glow 1 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-[180px] opacity-30"></div>

      {/* Background Glow 2 */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-[180px] opacity-30"></div>

      {/* Background Glow 3 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-100 rounded-full blur-[220px] opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Our AI Tools
        </h2>

        <p className="text-gray-600 text-center mt-4">
          Explore our collection of powerful AI tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
            />
          ))}
        </div>

      </div>

    </section>
  );
}

export default ToolsSection;