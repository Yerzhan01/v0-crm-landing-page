"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LanguageSwitcher } from "@/components/language-switcher"
import { FeatureItem } from "@/components/feature-item"
import { PricingCard } from "@/components/pricing-card"
import { FaqItem } from "@/components/faq-item"
import { BenefitCard } from "@/components/benefit-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { Accordion } from "@/components/ui/accordion"
import { getTranslation, type Language } from "@/lib/translations"
import { RegistrationForm } from "@/components/registration-form"
import {
  TrendingUp,
  Users,
  MessageSquare,
  Bot,
  Calendar,
  UserCog,
  BarChart3,
  Bell,
  Brain,
  Eye,
  DollarSign,
  MapPin,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function ClassicCRMPage() {
  const [lang, setLang] = useState<Language>("ru")
  const t = getTranslation(lang)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-xl">{t.logo}</span>
          </Link>
          <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">{t.classicHeroTitle}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            {t.classicHeroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-warning text-warning-foreground hover:bg-warning/90">
              {t.startFreeTrial}
            </Button>
            <Button size="lg" variant="outline">
              {t.watchDemo} →
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 py-20 md:py-32">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.featuresTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <FeatureItem icon={TrendingUp} title={t.feature1} description={t.feature1Desc} />
            <FeatureItem icon={Users} title={t.feature2} description={t.feature2Desc} />
            <FeatureItem icon={MessageSquare} title={t.feature3} description={t.feature3Desc} />
            <FeatureItem icon={Bot} title={t.feature4} description={t.feature4Desc} />
            <FeatureItem icon={Calendar} title={t.feature5} description={t.feature5Desc} />
            <FeatureItem icon={UserCog} title={t.feature6} description={t.feature6Desc} />
            <FeatureItem icon={BarChart3} title={t.feature7} description={t.feature7Desc} />
            <FeatureItem icon={Bell} title={t.feature8} description={t.feature8Desc} />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-20 md:py-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.howItWorksTitle}</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-bold text-lg">{t.step1Title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.step1Desc}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-bold text-lg">{t.step2Title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.step2Desc}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-bold text-lg">{t.step3Title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.step3Desc}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-secondary/30 py-20 md:py-32">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{t.pricingTitle}</h2>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success mb-4">
              {t.freeTrialBadge}
            </div>
            <p className="text-muted-foreground">{t.thenChoosePlan}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
            <PricingCard
              title={t.basicPlan}
              price={t.basicPrice}
              features={[t.basicFeature1, t.basicFeature2, t.basicFeature3]}
            />
            <PricingCard
              title={t.standardPlan}
              price={t.standardPrice}
              features={[t.standardFeature1, t.standardFeature2, t.standardFeature3, t.standardFeature4]}
            />
            <PricingCard
              title={t.businessPlan}
              price={t.businessPrice}
              features={[
                t.businessFeature1,
                t.businessFeature2,
                t.businessFeature3,
                t.businessFeature4,
                t.businessFeature5,
              ]}
            />
          </div>

          <div className="max-w-2xl mx-auto text-center space-y-2 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">{t.addonsNote}</p>
            <p>• {t.addon1}</p>
            <p>• {t.addon2}</p>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="container py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{t.targetAudienceTitle}</h2>
        <p className="text-lg text-center text-muted-foreground max-w-4xl mx-auto leading-relaxed">{t.classicTarget}</p>
      </section>

      {/* Registration Form Section */}
      <section className="bg-primary text-primary-foreground py-20 md:py-32">
        <div className="container max-w-md mx-auto">
          <RegistrationForm
            businessType="classic"
            translations={{
              title: t.registrationFormTitle,
              description: t.registrationFormDescription,
              fullName: t.fullNameLabel,
              email: t.emailField,
              phone: t.phoneField,
              plan: t.planLabel,
              starter: t.starterPlan,
              professional: t.professionalPlan,
              enterprise: t.enterprisePlan,
              submit: t.submitButton,
              submitting: t.submittingButton,
              success: t.successMessage,
              error: t.errorMessage,
            }}
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-20 md:py-32">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.benefitsTitle}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <BenefitCard icon={Brain} title={t.benefit1Title} description={t.benefit1Desc} />
          <BenefitCard icon={Eye} title={t.benefit2Title} description={t.benefit2Desc} />
          <BenefitCard icon={Bell} title={t.benefit3Title} description={t.benefit3Desc} />
          <BenefitCard icon={DollarSign} title={t.benefit4Title} description={t.benefit4Desc} />
          <BenefitCard icon={MapPin} title={t.benefit5Title} description={t.benefit5Desc} />
          <BenefitCard icon={Zap} title={t.benefit6Title} description={t.benefit6Desc} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary/30 py-20 md:py-32">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.testimonialsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard quote={t.testimonial1} text={t.testimonial1Text} author={t.testimonial1Author} />
            <TestimonialCard quote={t.testimonial2} text={t.testimonial2Text} author={t.testimonial2Author} />
            <TestimonialCard quote={t.testimonial3} text={t.testimonial3Text} author={t.testimonial3Author} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-20 md:py-32">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.faqTitle}</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <FaqItem question={t.faq1Q} answer={t.faq1A} value="faq-1" />
            <FaqItem question={t.faq2Q} answer={t.faq2A} value="faq-2" />
            <FaqItem question={t.faq3Q} answer={t.faq3A} value="faq-3" />
            <FaqItem question={t.faq4Q} answer={t.faq4A} value="faq-4" />
            <FaqItem question={t.faq5Q} answer={t.faq5A} value="faq-5" />
            <FaqItem question={t.faq7Q} answer={t.faq7A} value="faq-7" />
            <FaqItem question={t.faq8Q} answer={t.faq8A} value="faq-8" />
            <FaqItem question={t.faq9Q} answer={t.faq9A} value="faq-9" />
          </Accordion>
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
              <Link href="/classic">💼 {t.crmClassic}</Link>
            </Button>
            <Button size="lg" variant="secondary" className="min-w-[200px]" asChild>
              <Link href="/services">💇 {t.crmServices}</Link>
            </Button>
            <Button size="lg" variant="secondary" className="min-w-[200px]" asChild>
              <Link href="/kaspi">🛒 {t.crmKaspi}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 CRM. {t.allRightsReserved}.</p>
        </div>
      </footer>
    </div>
  )
}
