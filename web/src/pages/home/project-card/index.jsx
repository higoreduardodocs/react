/* eslint-disable react/prop-types */
import './project-card.style.scss'

function ProjectCard({ card }) {
  return (
    <div className="projectCard">
      <img src={card.image} alt="" />
      <div className="info">
        <img src={card.profile} alt="" />
        <div className="texts">
          <h2>{card.category}</h2>
          <span>{card.username}</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
