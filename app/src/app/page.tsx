import styles from "./page.module.css";

const navigation = [
  { label: "Resources", href: "#resources" },
  { label: "Our Approach", href: "#approach" },
  { label: "Crisis Support", href: "#crisis" },
  { label: "Tools", href: "#tools" },
  { label: "Community", href: "#community" },
];

const supportHighlights = [
  {
    title: "Personalized guidance",
    description: "Choose resources that meet you where you are—at home, in class, or supporting a friend.",
  },
  {
    title: "Evidence-informed",
    description: "Grounded in trauma-informed practices and crafted alongside licensed educators and advocates.",
  },
  {
    title: "Stories that heal",
    description: "Read lived experiences of resilience and hope so you remember you are never alone.",
  },
];

const checkInPrompts = [
  "Name one feeling you are holding right now without judging it.",
  "Notice three things you can sense—what you can see, hear, or feel against your skin.",
  "Text, call, or message someone who reminds you that your story matters tonight.",
];

const resourceCards = [
  {
    id: "anxiety",
    title: "Anxiety Awareness Hub",
    description:
      "Understand anxiety responses, practice grounding exercises, and find words to ask for help when emotions feel loud.",
    highlights: [
      "Step-by-step grounding audio walkthroughs",
      "Warning signs checklist for you and your support network",
      "Printable breathing cards for classrooms and community groups",
    ],
    cta: "Explore anxiety strategies",
  },
  {
    id: "depression",
    title: "Depression & Hope Stories",
    description:
      "Read encouragement from peers, explore crisis planning templates, and gather language for tough conversations.",
    highlights: [
      "Anonymous stories of resilience and healing",
      "Conversation starters for checking in on friends",
      "Self-advocacy tips for therapy, school, and work",
    ],
    cta: "Find stories of hope",
  },
  {
    id: "youth",
    title: "Youth Mental Health Toolkit",
    description:
      "Equip classrooms and youth groups with lesson plans, daily check-ins, and culturally responsive support lines.",
    highlights: [
      "Ready-to-use circle prompts and activities",
      "Educator guides for creating safer learning spaces",
      "Global crisis lines and chat resources for young people",
    ],
    cta: "Equip your community",
  },
];

const approachPillars = [
  {
    title: "Guided self-care plans",
    description: "Micro-practices and weekly challenges help you build habits of rest, connection, and reflection.",
  },
  {
    title: "Community storytelling",
    description: "Anonymous submissions celebrate bravery and create space for shared healing across identities.",
  },
  {
    title: "Support for schools",
    description: "Toolkits for educators blend social-emotional learning with trauma-informed approaches.",
  },
  {
    title: "Connections to help",
    description: "Direct links to crisis lines, text chats, and culturally specific services provide immediate care.",
  },
];

const spotlightContent = [
  {
    id: "anxiety",
    title: "When anxiety shows up",
    points: [
      "Practice grounding techniques that keep you anchored when your thoughts race.",
      "Use our body map to identify where stress sits so you can release it gently.",
      "Share the language of coping cards with friends or classrooms to build collective care.",
    ],
    cta: "Download grounding practices",
    href: "#tools",
  },
  {
    id: "depression",
    title: "Holding hope through depression",
    points: [
      "Create a safety plan that highlights people, places, and memories that remind you of your worth.",
      "Read stories of peers who found healing through therapy, medication, art, and community.",
      "Use weekly check-in prompts to notice the moments where light is returning.",
    ],
    cta: "Read hope-filled stories",
    href: "#community",
  },
  {
    id: "youth",
    title: "Championing youth mental health",
    points: [
      "Start homeroom or youth group with intentional check-ins that normalize emotions.",
      "Access culturally responsive support lines that speak your students' languages.",
      "Build partnerships with families and caregivers using our shareable guides.",
    ],
    cta: "Share the youth toolkit",
    href: "#youth",
  },
];

const hotlines = [
  {
    region: "United States",
    details: "988 Suicide & Crisis Lifeline · Crisis Text Line: Text HOME to 741741",
  },
  {
    region: "Canada",
    details: "988 Suicide Crisis Helpline · Kids Help Phone: Text CONNECT to 686868",
  },
  {
    region: "United Kingdom & Ireland",
    details: "Samaritans: Call 116 123 · Shout: Text SHOUT to 85258",
  },
  {
    region: "Australia",
    details: "Lifeline: Call 13 11 14 · Kids Helpline: Call 1800 55 1800",
  },
  {
    region: "India",
    details: "iCall: 9152987821 · Fortis Exam Helpline: 083768 04102",
  },
  {
    region: "Global",
    details: "Find international helplines at the International Association for Suicide Prevention (IASP)",
  },
];

const wellnessTools = [
  {
    title: "Weekly grounding planner",
    description:
      "Plan your week with space for mood tracking, coping intentions, joyful movement, and gratitude moments.",
  },
  {
    title: "Conversation guide",
    description:
      "Scripts that help you tell a friend, mentor, or counselor what you are feeling and how they can support you.",
  },
  {
    title: "Classroom climate check-ins",
    description:
      "Printable emotion wheels, affirmation cards, and circle prompts for educators and youth leaders.",
  },
  {
    title: "Digital wellness library",
    description:
      "Curated articles, podcasts, breathing exercises, and playlists that uplift different cultures and identities.",
  },
];

const communityActions = [
  "Attend a monthly virtual gathering to learn coping skills with therapists and peer facilitators.",
  "Share your story anonymously to remind someone else that healing is possible in their own timing.",
  "Partner with us to bring workshops into schools, youth groups, and community centers in your region.",
];

export default function Home() {
  return (
    <div id="top" className={styles.page}>
      <header className={styles.hero}>
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.navBar}>
            <a href="#top" className={styles.brand} aria-label="YouStillMatter home">
              YouStillMatter
            </a>
            <nav aria-label="Primary navigation">
              <ul className={styles.navList}>
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.heroBody}>
            <div className={styles.heroContent}>
              <p className={styles.heroTag}>Because your voice and future matter</p>
              <h1>
                Community-crafted mental health support for every chapter of your story
              </h1>
              <p>
                YouStillMatter is a compassionate hub full of practical tools, grounding exercises, and true stories of
                resilience. Explore guidance for navigating anxiety, move through depression with hope, and share youth-focused
                resources that help entire classrooms feel seen.
              </p>
              <div className={styles.ctaGroup}>
                <a className={styles.primaryButton} href="#resources">
                  Explore supportive guides
                </a>
                <a className={styles.secondaryButton} href="#crisis">
                  Find crisis help now
                </a>
              </div>
              <dl className={styles.heroHighlights}>
                {supportHighlights.map((highlight) => (
                  <div key={highlight.title} className={styles.highlightItem}>
                    <dt>{highlight.title}</dt>
                    <dd>{highlight.description}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className={styles.heroCard} aria-label="Quick grounding exercise">
              <h2>Take a mindful minute</h2>
              <p>Use this gentle check-in to notice what you need before taking your next step today.</p>
              <ol className={styles.checkList}>
                {checkInPrompts.map((prompt, index) => (
                  <li key={prompt}>
                    <span className={styles.stepNumber}>{index + 1}</span>
                    <span>{prompt}</span>
                  </li>
                ))}
              </ol>
              <p className={styles.heroCardFooter}>
                If any step feels difficult, please reach out to a trusted person or text line—asking for help is a sign of
                courage.
              </p>
            </aside>
          </div>
        </div>
      </header>

      <main>
        <section id="resources" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Choose a supportive space crafted for you</h2>
              <p>
                Whether you are navigating anxiety, seeking hope through depression, or caring for young people, every pathway
                includes actionable tools and trusted crisis connections.
              </p>
            </div>
            <div className={styles.cardGrid}>
              {resourceCards.map((resource) => (
                <article key={resource.id} className={styles.card}>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <ul className={styles.cardHighlights}>
                    {resource.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a className={styles.cardLink} href={`#${resource.id}`}>
                    {resource.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className={`${styles.section} ${styles.approachSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.badge}>How we support you</p>
              <h2>Our approach blends empathy, education, and action</h2>
              <p>
                YouStillMatter was born from community conversations. Every resource is reviewed with clinicians, youth leaders,
                and people with lived experience to ensure cultural humility, accessibility, and care.
              </p>
            </div>
            <div className={styles.approachGrid}>
              {approachPillars.map((pillar) => (
                <article key={pillar.title} className={styles.approachCard}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.splitSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Spotlights from the YouStillMatter library</h2>
              <p>
                Dive deeper into the practices, stories, and lesson plans people return to again and again when life feels heavy
                or uncertain.
              </p>
            </div>
            <div className={styles.splitGrid}>
              {spotlightContent.map((spotlight) => (
                <article key={spotlight.title} className={styles.splitCard} id={spotlight.id}>
                  <h3>{spotlight.title}</h3>
                  <ul className={styles.splitList}>
                    {spotlight.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <a className={styles.cardLink} href={spotlight.href}>
                    {spotlight.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="crisis" className={`${styles.section} ${styles.crisisSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Immediate support is always within reach</h2>
              <p>
                If you or someone you know is in immediate danger, call local emergency services now. The resources below offer
                free, confidential help from trained counselors 24/7.
              </p>
            </div>
            <ul className={styles.hotlineList}>
              {hotlines.map((line) => (
                <li key={line.region} className={styles.hotline}>
                  <span>{line.region}</span>
                  <p>{line.details}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="tools" className={`${styles.section} ${styles.toolsSection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Printable tools & digital downloads</h2>
              <p>
                Use these resources on your own, with a therapist, or in community spaces to build consistent care and supportive
                routines.
              </p>
            </div>
            <div className={styles.toolsGrid}>
              {wellnessTools.map((tool) => (
                <article key={tool.title} className={styles.toolCard}>
                  <strong>{tool.title}</strong>
                  <p>{tool.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="community" className={`${styles.section} ${styles.communitySection}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>A community reminding you that you still matter</h2>
              <p>
                Healing is not linear. Our community creates gentle spaces to rest, learn, celebrate joy, and ask for help without
                judgment.
              </p>
            </div>
            <div className={styles.communityLayout}>
              <figure className={styles.quoteBlock}>
                <span className={styles.quoteMark} aria-hidden="true">
                  “
                </span>
                <blockquote className={styles.quoteText}>
                  This space reminded me that my small steps count. Even on the days when my voice shakes, I know someone will
                  listen and celebrate the fact that I'm still here.
                </blockquote>
                <figcaption className={styles.quoteAuthor}>Community member, age 19</figcaption>
              </figure>
              <ul className={styles.communityList}>
                {communityActions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <p>
            © {new Date().getFullYear()} YouStillMatter. Built with compassion to remind you, your loved ones, and your students
            that seeking help is an act of courage.
          </p>
          <ul className={styles.footerLinks}>
            {navigation.map((item) => (
              <li key={`footer-${item.href}`}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href="mailto:hello@youstillmatter.org">Contact</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
