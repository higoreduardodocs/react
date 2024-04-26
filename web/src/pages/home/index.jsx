import { cards, projects } from '../../utils/data'
import Slide from '../../components/slide'
import Featured from './featured'
import TrustedBy from './trusted-by'
import Featureds from './featureds'
import Explore from './explore'
import ProjectCard from './project-card'
import CategoryCard from './category-card'

function Home() {
  return (
    <section className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards?.length > 0 &&
          cards.map((item) => <CategoryCard key={item.id} card={item} />)}
      </Slide>
      <Featureds />
      <Explore />
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects?.length > 0 &&
          projects.map((item) => <ProjectCard key={item.id} card={item} />)}
      </Slide>
    </section>
  )
}

export default Home
