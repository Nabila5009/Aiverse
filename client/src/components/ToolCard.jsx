function ToolCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
      <div className="text-5xl">
        {icon}
      </div>

      <h3 className="text-xl font-bold mt-4">
        {title}
      </h3>

      <p className="text-gray-600 mt-2">
        {description}
      </p>

      

    </div>
  );
}

export default ToolCard;