export function Testimonial() {
  return (
    <section className="testimonial" aria-label="Customer testimonial">
      <div className="testimonial__inner">
        <figure>
          <svg className="testimonial__mark" viewBox="0 0 40 32" aria-hidden="true">
            <path d="M0 32V20C0 9 5 2 15 0V7C10 8 7 12 7 17H13V32H0ZM27 32V20C27 9 32 2 42 0V7C37 8 34 12 34 17H40V32H27Z" fill="currentColor" />
          </svg>
          <blockquote className="testimonial__quote">
            Narvo Platform cut our audio production cost by about 80%. Our Pidgin subscribers finally hear the headlines in
            their own voice — and we never had to hire a single TTS engineer.
          </blockquote>
          <figcaption className="testimonial__author">
            <div className="testimonial__avatar" aria-hidden="true">
              NA
            </div>
            <div>
              <div className="testimonial__name">Ngozi Adeyemi</div>
              <div className="testimonial__role">Head of Digital · Independent Publisher Network</div>
            </div>
            <div className="testimonial__stat">
              <span className="testimonial__stat-num">312k</span>
              <span className="testimonial__stat-label">weekly listens</span>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
