"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BusinessTypeCard } from "@/components/business-type-card"
import { BenefitCard } from "@/components/benefit-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getTranslation, type Language } from "@/lib/translations"
import { Brain, Eye, Bell, DollarSign, MapPin, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [lang, setLang] = useState<Language>("ru")
  const t = getTranslation(lang)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-xl">{t.logo}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/login">Войти</Link>
            </Button>
            <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-muted-foreground">
              {lang === "ru" ? "Новинка: AI-ассистент для вашего бизнеса" : "Жаңалық: Бизнесіңізге AI-ассистент"}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">{t.heroTitle}</h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">{t.heroSubtitle}</p>
        </div>
      </section>

      {/* Business Type Selection */}
      <section className="container pb-20 md:pb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.selectBusinessType}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <BusinessTypeCard
            icon="💼"
            title={t.crmClassic}
            subtitle={t.crmClassicSubtitle}
            description={t.crmClassicDesc}
            features={t.crmClassicFeatures}
            suitableFor={t.crmClassicFor}
            ctaText={t.tryFree}
            href="/auth/signup?type=classic"
          />

          <BusinessTypeCard
            icon="💇"
            title={t.crmServices}
            subtitle={t.crmServicesSubtitle}
            description={t.crmServicesDesc}
            features={t.crmServicesFeatures}
            suitableFor={t.crmServicesFor}
            ctaText={t.tryFree}
            href="/auth/signup?type=services"
          />

          <BusinessTypeCard
            icon="🛒"
            title={t.crmKaspi}
            subtitle={t.crmKaspiSubtitle}
            description={t.crmKaspiDesc}
            features={t.crmKaspiFeatures}
            suitableFor={t.crmKaspiFor}
            ctaText={t.tryFree}
            href="/auth/signup?type=kaspi"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.featuresTitle}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {lang === "ru"
              ? "Все инструменты для эффективного управления вашим бизнесом в одной системе"
              : "Бизнесіңізді тиімді басқаруға арналған барлық құралдар бір жүйеде"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{t.feature1}</h3>
            <p className="text-sm text-muted-foreground">{t.feature1Desc}</p>
          </div>

          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{t.feature2}</h3>
            <p className="text-sm text-muted-foreground">{t.feature2Desc}</p>
          </div>

          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{t.feature3}</h3>
            <p className="text-sm text-muted-foreground">{t.feature3Desc}</p>
          </div>

          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{t.feature4}</h3>
            <p className="text-sm text-muted-foreground">{t.feature4Desc}</p>
          </div>

          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{t.feature5}</h3>
            <p className="text-sm text-muted-foreground">{t.feature5Desc}</p>
          </div>

          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">👔</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{t.feature6}</h3>
            <p className="text-sm text-muted-foreground">{t.feature6Desc}</p>
          </div>

          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{t.feature7}</h3>
            <p className="text-sm text-muted-foreground">{t.feature7Desc}</p>
          </div>

          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">🔔</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{t.feature8}</h3>
            <p className="text-sm text-muted-foreground">{t.feature8Desc}</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-secondary/30 py-20 md:py-32">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.benefitsTitle}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <BenefitCard icon={Brain} title={t.benefit1Title} description={t.benefit1Desc} />
            <BenefitCard icon={Eye} title={t.benefit2Title} description={t.benefit2Desc} />
            <BenefitCard icon={Bell} title={t.benefit3Title} description={t.benefit3Desc} />
            <BenefitCard icon={DollarSign} title={t.benefit4Title} description={t.benefit4Desc} />
            <BenefitCard icon={MapPin} title={t.benefit5Title} description={t.benefit5Desc} />
            <BenefitCard icon={Zap} title={t.benefit6Title} description={t.benefit6Desc} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container py-20 md:py-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.testimonialsTitle}</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <TestimonialCard quote={t.testimonial1} text={t.testimonial1Text} author={t.testimonial1Author} />
          <TestimonialCard quote={t.testimonial2} text={t.testimonial2Text} author={t.testimonial2Author} />
          <TestimonialCard quote={t.testimonial3} text={t.testimonial3Text} author={t.testimonial3Author} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground py-20 md:py-32">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-balance">{t.ctaTitle}</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground/90 text-balance">
            {t.ctaSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" variant="secondary" className="min-w-[200px]" asChild>
              <Link href="/auth/signup?type=classic">💼 {t.crmClassic}</Link>
            </Button>
            <Button size="lg" variant="secondary" className="min-w-[200px]" asChild>
              <Link href="/auth/signup?type=services">💇 {t.crmServices}</Link>
            </Button>
            <Button size="lg" variant="secondary" className="min-w-[200px]" asChild>
              <Link href="/auth/signup?type=kaspi">🛒 {t.crmKaspi}</Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/80 mb-2">{t.ctaContact}</p>
            <p className="text-xl font-semibold">+7 777 123 4567</p>
            <p className="text-sm text-primary-foreground/70 mt-2">WhatsApp / Telegram / Email</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 ArzanCRM. {t.allRightsReserved}.</p>
        </div>
      </footer>
    </div>
  )
}
