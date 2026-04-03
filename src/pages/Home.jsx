import HeroBanner from '../components/HeroBanner'
import FeaturedArticle from '../components/FeaturedArticle'
import NewsColumn from '../components/NewsColumn'
import TournamentsSection from '../components/TournamentsSection'
import EventsSection from '../components/events/EventsSection'
import SecondBanner from '../components/SecondBanner'

export default function Home() {
  return (
    <>
      <HeroBanner />

      <main className="main-content">
        <div className="content-wrapper">
          <div className="featured-row">
            <FeaturedArticle />
            <NewsColumn />
          </div>

          <EventsSection />

          <TournamentsSection home />
        </div>
      </main>

      <SecondBanner />
    </>
  )
}
