import "./App.css";

function App() {
  return (
    <>
      <header
        id="top"
        role="banner"
        className="sticky top-0 z-50 w-full backdrop-blur bg-gray-900/90 text-white"
      >
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <nav>
            <ul className="flex items-right gap-8 text-sm">
              <li>
                <a href="#about" className="hover:text-gray-400">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-gray-400">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-gray-400">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* inicio */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/fondo.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* checar si esta madre si jala como un overlay, checamos ahorita  */}
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
            Hi! I’m <span className="text-blue-400">Tony Medina</span>
          </h1>
          <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-gray-200 drop-shadow-md">
            Computer Systems Engineer | Web Developer
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Passionate about building{" "}
            <span className="text-blue-400 font-medium">modern</span>, and
            <span className="text-blue-400 font-medium"> minimal </span> web
            applications
          </p>
        </div>
      </section>

      {/* sobre mi */}
      <section
        id="about"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-20 px-12 bg-gray-900 text-white"
      >
        {/* yo */}
        <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
          {" "}
          {/* esta linea es la que cambia el borde de la imagen a amarillo, estan con madre los comentarios del copilot jeje */}
          <img
            src="/profesionaltony.jpg"
            alt="Tony"
            className="w-full h-full object-cover"
          />
        </div>

        {/* desc */}
        <div className="max-w-2xl">
          <h2 className="text-5xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            I’m{" "}
            <span className="text-yellow-400 font-semibold">Tony Medina</span>,
            a Computer Systems Engineer and web developer passionate about
            crafting
            <span className="text-yellow-400 font-semibold"> clean</span>, and
            <span className="text-yellow-400 font-semibold"> modern </span>
            digital experiences.
            <br />
            <br />
            My goal is to transform ideas into interactive applications that not
            only work, but also deliver value and creativity.
            <br />
          </p>
        </div>
      </section>

      <section id="skills" className="bg-black text-white py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Tech</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {/* tecno de front */}
          <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-blue-400 border-b border-blue-500 pb-2 mb-6">
              FRONTEND
            </h2>
            <div className="grid grid-cols-2 gap-6 justify-items-center">
              <div>
                <img
                  src="/tech/html.png"
                  alt="HTML"
                  className="w-16 h-16 mx-auto"
                />
                <p className="mt-2 font-semibold">HTML</p>
              </div>
              <div>
                <img
                  src="/tech/css.png"
                  alt="CSS"
                  className="w-16 h-16 mx-auto"
                />
                <p className="mt-2 font-semibold">CSS</p>
              </div>
              <div>
                <img
                  src="/tech/js.webp"
                  alt="JavaScript"
                  className="w-16 h-16 mx-auto"
                />
                <p className="mt-2 font-semibold">JavaScript</p>
              </div>
              <div>
                <img
                  src="/tech/tw.png"
                  alt="Tailwind"
                  className="w-16 h-16 mx-auto"
                />
                <p className="mt-2 font-semibold">Tailwind</p>
              </div>
              <div>
                <img
                  src="/tech/react.png"
                  alt="React"
                  className="w-16 h-16 mx-auto"
                />
                <p className="mt-2 font-semibold">React</p>
              </div>
              <div>
                <img
                  src="/tech/figma.png"
                  alt="Figma"
                  className="w-16 h-16 mx-auto"
                />
                <p className="mt-2 font-semibold">Figma</p>
              </div>
            </div>
          </div>

          {/* de back */}
          <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-blue-400 border-b border-blue-500 pb-2 mb-6">
              BACKEND
            </h2>
            <div className="grid grid-cols-2 gap-6 justify-items-center">
              <div>
                <img
                  src="/tech/node.png"
                  alt="Node.js"
                  className="w-16 h-16 mx-auto"
                />
                <p className="mt-2 font-semibold">Node.js</p>
              </div>
              <div>
                <img
                  src="/tech/java.png"
                  alt="Java"
                  className="w-16 h-16 mx-auto"
                />
                <p className="mt-2 font-semibold">Java</p>
              </div>
            </div>
          </div>

          {/* herramientitas aparte */}
          <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-blue-400 border-b border-blue-500 pb-2 mb-6">
              TOOLS
            </h2>
            <div className="grid grid-cols-2 gap-6 justify-items-center">
              <div>
                <img
                  src="/tech/github.png"
                  alt="GitHub"
                  className="w-16 h-16 mx-auto"
                />
                <p className="mt-2 font-semibold">GitHub</p>
              </div>
              <div>
                <img
                  src="/tech/ji.svg"
                  alt="Jira"
                  className="w-16 h-16 mx-auto"
                />
                <p className="mt-2 font-semibold">Jira</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="min-h-screen bg-[#0f172a] text-white px-8 py-16"
      >
        <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* ProjeXus */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div className="h-48 bg-gray-700 flex items-center justify-center">
              <img
                src="/projexus2.png"
                alt="Projexus"
                className="w-full h-full object-cover"
              />{" "}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">ProjeXus</h3>
              <p className="text-gray-400 mb-3">
                A platform to manage academic and collaborative projects. Built
                with <span className="text-blue-400 font-medium">Next.js</span>{" "}
                for ICTI Michoacán.
              </p>
              <span className="text-sm text-gray-500">
                Next.js • Tailwind • TypeScript
              </span>
            </div>
          </div>

          {/* Aquamarine Resort */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div className="h-48 bg-gray-700 flex items-center justify-center">
              <img
                src="/aquama.png"
                alt="Aquamarine"
                className="w-full h-full object-cover"
              />{" "}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Aquamarine Resort</h3>
              <p className="text-gray-400 mb-3">
                A school project for a luxury hotel with a booking system and
                <span className="text-blue-400 font-medium">
                  {" "}
                  payment integration
                </span>
                .
              </p>
              <span className="text-sm text-gray-500">
                HTML • CSS • JavaScript
              </span>
            </div>
          </div>

          {/* Velto */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div className="h-48 bg-gray-700 flex items-center justify-center">
              <img
                src="/velto.png"
                alt="Velto Store"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Velto Store</h3>
              <p className="text-gray-400 mb-3">
                An e-commerce web app for sneakers with a shopping cart and
                <span className="text-blue-400 font-medium">
                  {" "}
                  payment integration
                </span>
                .
              </p>
              <span className="text-sm text-gray-500">
                School project • eCommerce
              </span>
            </div>
          </div>

          {/* Biblio */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <div className="h-48 bg-gray-700 flex items-center justify-center">
              <img
                src="/biblio.jpg"
                alt="Biblioteca Digital"
                className="w-full h-full object-cover"
              />{" "}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                Digital Library CBTis 147
              </h3>
              <p className="text-gray-400 mb-3">
                A system to manage book and equipment for CBTis 147 library.
              </p>
              <span className="text-sm text-gray-500">
                HTML • CSS • Bootstrap • PHP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contactito */}
      <section
        id="contact"
        className="min-h-screen bg-[#0f172a] text-white px-8 py-20 flex flex-col items-center justify-center text-center"
      >
        <h2 className="text-5xl font-bold mb-4">Let’s work together</h2>
        <p className="text-gray-400 text-lg mb-12 max-w-xl">
          Feel free to reach out for collaborations, freelance projects or just
          a chat. I’m always open to new opportunities and connections!
        </p>

        <div className="space-y-6 text-lg">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/tonymed._"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 hover:text-pink-400 transition"
          >
            <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
            @tonymed._
          </a>
          <a
            href="https://www.linkedin.com/in/jose-antonio-medina-ayala-bb60b12b0/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 hover:text-blue-400 transition"
          >
            <img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
            My LinkedIn Profile
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/TonyMed12"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 hover:text-gray-400 transition"
          >
            <img src="/tech/github.png" alt="GitHub" className="w-6 h-6" />
            github.com/TonyMed12
          </a>

          <a
            href="mailto:tonymed2022@gmail.com"
            className="flex items-center justify-center gap-3 hover:text-green-400 transition"
          >
            <img src="/gmail.png" alt="Email" className="w-6 h-6" />
            tonymed2022@gmail.com
          </a>
        </div>
      </section>
    </>
  );
}

export default App;
