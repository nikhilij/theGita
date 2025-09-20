import HeaderPublic from '../components/HeaderPublic';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <HeaderPublic />
      <main className="min-h-screen bg-[#e5e5e5]">
        <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold text-[#14213d] mb-6 leading-tight">Discover the Divine Wisdom</h1>
            <h2 className="text-4xl text-[#fca311] font-extrabold mb-6">Bhagavad Gita</h2>
            <p className="text-lg text-[#14213d] mb-6 max-w-xl">
              Read, listen, and explore the Bhagavad Gita chapter by chapter. Our interactive UI supports
              multi-language translations, high-quality text-to-voice recitations, bookmarks, and progress tracking.
            </p>

            <div className="flex items-center gap-4">
              <Link href="/read" className="bg-[#fca311] hover:bg-[#e5a00f] text-[#14213d] px-6 py-3 rounded-lg font-semibold shadow-md">
                🕉️ Start Reading
              </Link>
              <a href="#about" className="text-[#14213d] underline">Learn more</a>
            </div>
          </div>

            <div className="lg:w-1/2">
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-[#ffffff] to-[#e5e5e5] flex items-center justify-center border border-[#fca311]">
              <img
              src="/aj.png"
              alt="Arjuna and Krishna"
              className="object-contain w-full h-full"
              />
            </div>
            </div>
        </section>

        <section id="about" className="w-full py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#14213d] mb-4">Discover the Divine Wisdom</h2>
              <p className="text-lg text-[#fca311] max-w-2xl mx-auto">
                Experience the Bhagavad Gita like never before with our comprehensive reading platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">📖</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">Complete Text</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  Access all 18 chapters and 700 verses of the Bhagavad Gita with beautiful formatting and clear typography for an immersive reading experience.
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">Smart Search</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  Find specific verses, chapters, or concepts instantly with our powerful search functionality that works across both English and Sanskrit text.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">🔖</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">Bookmarks</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  Save your favorite verses and create personalized collections. Never lose track of the passages that resonate with your soul.
                </p>
              </div>

              {/* Feature Card 4 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">Progress Tracking</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  Monitor your reading journey with detailed progress indicators. See how much of each chapter you&apos;ve completed and stay motivated.
                </p>
              </div>

              {/* Feature Card 5 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">🎧</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">Audio Recitations</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  Listen to divine recitations while you read. Experience the sacred verses through traditional chanting and modern audio quality.
                </p>
              </div>

              {/* Feature Card 6 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">Multi-Language</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  Explore the Gita in multiple languages including Sanskrit, English, and other regional translations for deeper understanding.
                </p>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-[#14213d] to-[#002447] rounded-2xl p-12 text-white">
                <h3 className="text-3xl font-bold mb-4">Begin Your Spiritual Journey</h3>
                <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                  Join thousands of seekers who have found wisdom, peace, and enlightenment through the teachings of the Bhagavad Gita.
                </p>
                <Link href="/read" className="inline-block bg-[#fca311] hover:bg-[#e5a00f] text-[#14213d] px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  🕉️ Start Your Journey
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
