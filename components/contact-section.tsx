import { ContactForm } from "@/components/contact-form"
import { getTranslation, type Language } from "@/lib/translations"
import { Mail, Phone, MessageCircle, Clock, MapPin } from "lucide-react"

interface ContactSectionProps {
  lang: Language
}

export function ContactSection({ lang }: ContactSectionProps) {
  const t = getTranslation(lang)

  return (
    <section id="contact" className="container py-20 md:py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t.contactTitle}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">{t.contactSubtitle}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="order-2 lg:order-1">
          <div className="rounded-lg border bg-card p-8">
            <h3 className="text-2xl font-semibold mb-6">{t.contactFormTitle}</h3>
            <ContactForm lang={lang} />
          </div>
        </div>

        {/* Contact Information */}
        <div className="order-1 lg:order-2 space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6">{t.contactInfoTitle}</h3>
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t.contactPhone}</h4>
                  <a href="tel:+77771234567" className="text-muted-foreground hover:text-foreground transition-colors">
                    +7 777 123 4567
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t.contactEmail}</h4>
                  <a
                    href="mailto:info@arzancrm.kz"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    info@arzancrm.kz
                  </a>
                </div>
              </div>

              {/* Messengers */}
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t.contactMessengers}</h4>
                  <p className="text-muted-foreground">WhatsApp / Telegram</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t.contactWorkingHours}</h4>
                  <p className="text-muted-foreground">{t.contactWorkingHoursValue}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t.contactAddress}</h4>
                  <p className="text-muted-foreground">{t.contactAddressValue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
