"use client";

import HeaderPublic from '../components/HeaderPublic';
import Link from 'next/link';
import { useLanguage } from '../components/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      <HeaderPublic />
      <main className="min-h-screen bg-[#e5e5e5]">
        <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold text-[#14213d] mb-6 leading-tight">{t('home.hero.title')}</h1>
            <h2 className="text-4xl text-[#fca311] font-extrabold mb-6">{t('home.hero.subtitle')}</h2>
            <p className="text-lg text-[#14213d] mb-6 max-w-xl">
              {t('home.hero.description')}
            </p>

            <div className="flex items-center gap-4">
              <Link href="/read" className="bg-[#fca311] hover:bg-[#e5a00f] text-[#14213d] px-6 py-3 rounded-lg font-semibold shadow-md">
                🕉️ {t('home.hero.startReading')}
              </Link>
              <a href="#about" className="text-[#14213d] underline">{t('home.hero.learnMore')}</a>
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
              <h2 className="text-4xl font-bold text-[#14213d] mb-4">{t('features.title')}</h2>
              <p className="text-lg text-[#fca311] max-w-2xl mx-auto">
                {t('features.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">📖</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">{t('features.completeText.title')}</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  {t('features.completeText.description')}
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">{t('features.smartSearch.title')}</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  {t('features.smartSearch.description')}
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">🔖</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">{t('features.bookmarks.title')}</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  {t('features.bookmarks.description')}
                </p>
              </div>

              {/* Feature Card 4 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">{t('features.progress.title')}</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  {t('features.progress.description')}
                </p>
              </div>

              {/* Feature Card 5 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">🎧</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">{t('features.audio.title')}</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  {t('features.audio.description')}
                </p>
              </div>

              {/* Feature Card 6 */}
              <div className="bg-[#ffffff] rounded-2xl shadow-xl p-8 border border-[#fca311]/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fca311] to-[#e5a00f] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-[#14213d] mb-4 text-center">{t('features.multilang.title')}</h3>
                <p className="text-[#14213d] text-center leading-relaxed">
                  {t('features.multilang.description')}
                </p>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-[#14213d] to-[#002447] rounded-2xl p-12 text-white">
                <h3 className="text-3xl font-bold mb-4">{t('cta.title')}</h3>
                <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                  {t('cta.description')}
                </p>
                <Link href="/read" className="inline-block bg-[#fca311] hover:bg-[#e5a00f] text-[#14213d] px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  🕉️ {t('cta.button')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
