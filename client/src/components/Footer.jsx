function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-bold">
              AI SaaS
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              Build articles, generate images, write code,
              analyze data and boost your productivity using AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3 text-gray-400">

              <li className="cursor-pointer hover:text-white transition">
                Home
              </li>

              <li className="cursor-pointer hover:text-white transition">
                AI Tools
              </li>

              <li className="cursor-pointer hover:text-white transition">
                How It Works
              </li>

              <li className="cursor-pointer hover:text-white transition">
                Pricing
              </li>

              <li className="cursor-pointer hover:text-white transition">
                FAQ
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold">
              Contact
            </h3>

            <p className="mt-4 text-gray-400">
              khannabilaa.5009@gmail.com
            </p>

            <p className="mt-2 text-gray-400">
              Available 24/7
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">

          <p>
            © 2026 AI SaaS Platform. All Rights Reserved.
          </p>

          <p className="mt-2">
            Designed & Developed by{" "}
            <span className="font-semibold text-blue-400">
              Nabila Khan
            </span>
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;