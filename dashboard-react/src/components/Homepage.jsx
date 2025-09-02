import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import TradingSections from './TradingSections'
import TradingLandingPage from './TradingLandingPage'
import PremiumAccessSection from './PremiumAccessSection'
import GetStartedSection from './GetStartedSection'
import PricingPage from './PricingPage'
import TradingHeroCarousel from './TradingHeroCarousel'
import FAQAccordion from './FAQAccordion'
import CTASection from './CTASection'
import TradingHero from './TradingHero'
import Footer from './Footer'


function Homepage() {
  return (
    <div className='relative min-h-screen bg-[#000018] text-white overflow-hidden '>
      <Navbar/>
      <Hero />
      <TradingSections />
      <TradingLandingPage />
      <PremiumAccessSection />
      <GetStartedSection />
      <PricingPage />
      <TradingHeroCarousel />
      <FAQAccordion />
      <CTASection />
      <TradingHero />
      <Footer />

    </div>
  )
}

export default Homepage