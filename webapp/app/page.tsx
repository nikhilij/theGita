"use client";

import HeaderPublic from '@/components/HeaderPublic';
import Link from 'next/link';
import { useTranslation } from '@/components/useTranslation';

export default function Home() {
  const title = useTranslation('home.hero.title');
  const subtitle = useTranslation('home.hero.subtitle');
  const description = useTranslation('home.hero.description');
  const startReading = useTranslation('home.hero.startReading');
  const learnMore = useTranslation('home.hero.learnMore');
  const featuresTitle = useTranslation('features.title');
  const featuresSubtitle = useTranslation('features.subtitle');
  const completeTextTitle = useTranslation('features.completeText.title');
  const completeTextDesc = useTranslation('features.completeText.description');
  const smartSearchTitle = useTranslation('features.smartSearch.title');
  const smartSearchDesc = useTranslation('features.smartSearch.description');
  const bookmarksTitle = useTranslation('features.bookmarks.title');
  const bookmarksDesc = useTranslation('features.bookmarks.description');
  const progressTitle = useTranslation('features.progress.title');
  const progressDesc = useTranslation('features.progress.description');
  const audioTitle = useTranslation('features.audio.title');
  const audioDesc = useTranslation('features.audio.description');
  const multilangTitle = useTranslation('features.multilang.title');
  const multilangDesc = useTranslation('features.multilang.description');
  const ctaTitle = useTranslation('cta.title');
  const ctaDesc = useTranslation('cta.description');
  const ctaButton = useTranslation('cta.button');
  return (
    <>
      <HeaderPublic />
      <main className="min-h-screen bg-[#e5e5e5]">
        <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold text-[#14213d] mb-6 leading-tight">{title}</h1>
            <h2 className="text-4xl text-[#fca311] font-extrabold mb-6">{subtitle}</h2>
            <p className="text-lg text-[#14213d] mb-6 max-w-xl leading-relaxed">
              {description}
            </p>

            <div className="flex items-center gap-4">
              <Link href="/read" className="bg-[#fca311] hover:bg-[#e5a00f] text-[#14213d] px-6 py-3 rounded-lg font-semibold shadow-md">
                🕉️ {startReading}
              </Link>
              <a href="#about" className="text-[#14213d] underline">{learnMore}</a>
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
              <h2 className="text-4xl font-bold text-[#14213d] mb-4">{featuresTitle}</h2>
              <p className="text-lg text-[#fca311] max-w-2xl mx-auto">
                {featuresSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">📖</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">{completeTextTitle}</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  {completeTextDesc}
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">{smartSearchTitle}</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  {smartSearchDesc}
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">🔖</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">{bookmarksTitle}</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  {bookmarksDesc}
                </p>
              </div>

              {/* Feature Card 4 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">{progressTitle}</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  {progressDesc}
                </p>
              </div>

              {/* Feature Card 5 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">🎧</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">{audioTitle}</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  {audioDesc}
                </p>
              </div>

              {/* Feature Card 6 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">{multilangTitle}</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  {multilangDesc}
                </p>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-[#14213d] to-[#002447] rounded-2xl p-12 text-white">
                <h3 className="text-3xl font-bold mb-4">{ctaTitle}</h3>
                <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                  {ctaDesc}
                </p>
                <Link href="/read" className="inline-block bg-[#fca311] hover:bg-[#e5a00f] text-[#14213d] px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  🕉️ {ctaButton}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
