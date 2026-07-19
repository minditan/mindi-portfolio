const PROFILE = {
  name: "Mindi Tan",
  role: "Computer Engineering Undergraduate · Texas A&M University",
  location: "Houston, TX",
  available: false,
  topSkills: [
    "Hardware",
    "Software",
    "Embedded Systems",
    "Blender",
    "Three.js",
    "CSS",
  ],
  currentlyInto: ["EDM", "Baking", "Fitness", "Pinterest", "LEGO", "Movies"],
  aboutParagraphs: [
    "Hi there! My name is Mindi and I am a Computer Engineering undergraduate student at Texas A&M University with a strong interest in hardware, software, and creative technical design. My academic and project experience includes embedded systems, circuit analysis, software development, and interactive web-based applications. I enjoy building projects that connect engineering concepts with practical, user-centered solutions, especially when they involve both technical problem-solving and visual execution.",
    "For my portfolio, I created an interactive 3D environment in Blender and deployed it as a web experience. I modeled the scene from scratch and worked with key Blender workflows such as mesh modeling, UV unwrapping, texture baking, material setup, lighting, scaling, camera positioning, and render optimization. To bring the project online, I integrated the exported 3D scene with Three.js and CSS, then deployed it through Vercel. This project highlights my ability to combine 3D design, front-end development, and technical optimization into a polished interactive portfolio.",
    "Outside of engineering, I enjoy creative and hands-on hobbies that help me stay inspired and balanced. I love listening to EDM music, baking, doing arts and crafts, scrolling through Pinterest for design inspiration, building LEGO sets, watching movies, spending time with friends, and staying active through fitness. These interests reflect my creativity, attention to detail, and love for building things both digitally and physically.",
  ],
  links: {
    github: "https://github.com/minditan",
    linkedin: "https://www.linkedin.com/in/minditan",
    email: "mailto:mindi.w.tan@gmail.com",
    portfolio: "https://people.tamu.edu/~mindiwtan/portfolio.html",
    qualifications: "https://people.tamu.edu/~mindiwtan/qualifications.html",
    resume: "https://people.tamu.edu/~mindiwtan/",
  },
  projects: [
    {
      id: "blender",
      title: "Room Folio",
      status: "Interactive 3D Portfolio",
      images: [
        {
          src: "/roomfolio-wip.jpg",
          alt: "Blender workspace scene in development",
          caption: "Blender modeling & scene development",
        },
        {
          src: "/roomfolio-render.jpg",
          alt: "Final Room Folio rendered environment",
          caption: "Final interactive room environment",
        },
      ],
      summary:
        "An interactive 3D portfolio built with Blender, Three.js, and Vercel—replacing a static site with an explorable virtual room.",
      paragraphs: [
        "Room Folio is an interactive 3D portfolio experience I created using Blender, Three.js, and Vercel. Instead of presenting my work through a traditional static website, I wanted to build a virtual room that reflects my personality, creativity, and technical interests. This project allowed me to combine computer engineering, 3D design, and web development into one interactive experience where users can explore my portfolio in a more visual and engaging way. I had a lot of fun building each part of the room because it gave me the opportunity to show my creative side while also learning how to turn a 3D model into a deployable web project.",
        "In Blender, I modeled the room environment and individual objects from scratch while learning key 3D design workflows such as mesh modeling, object scaling, material creation, UV mapping, texture baking, lighting setup, camera positioning, and render optimization. I focused on making the scene visually clean while still keeping it efficient enough for web use. This involved organizing objects, adjusting geometry, applying realistic materials, setting up lighting, and optimizing assets so the final scene could load smoothly in a browser. Through this process, I gained a stronger understanding of how 3D environments are built, rendered, exported, and prepared for real-time interaction.",
        "After creating the scene in Blender, I brought the project to the web using Three.js, JavaScript, HTML/CSS, and Vercel. I used Three.js to load and display the 3D assets in the browser, manage the scene, camera, lighting, controls, and user interaction. On the coding side, I worked with the structure of a web-based 3D application, including asset loading, scene rendering, responsive layout, performance considerations, and browser compatibility. I then deployed the final project through Vercel, allowing the portfolio to be accessible online as a polished interactive experience. This project strengthened my skills in 3D graphics, front-end development, deployment workflows, and creative technical design.",
      ],
      technicalSkills: [
        "Blender mesh modeling & object scaling",
        "UV mapping & texture baking",
        "Material setup & lighting design",
        "Camera positioning & render optimization",
        "glTF export & asset organization",
        "Three.js scene loading & rendering",
        "JavaScript interaction & camera controls",
        "HTML/CSS monitor UI overlays",
        "Vercel deployment workflow",
      ],
      links: [
        {
          label: "View live portfolio",
          href: "https://mindi-portfolio.vercel.app/",
        },
        {
          label: "View on GitHub",
          href: "https://github.com/minditan/mindi-portfolio",
        },
      ],
    },
    {
      id: "nasa",
      title: "NASA Gateways to Blue Skies — Team SOLARA",
      status: "Design Challenge",
      summary:
        "Multidisciplinary ThinkTank team proposing the Stratospheric Agricultural Blimp System (SABS): a high-altitude platform for atmospheric water harvesting and targeted agricultural distribution.",
      paragraphs: [
        "I participated in the NASA Gateways to Blue Skies Design Challenge as part of Team SOLARA, a multidisciplinary engineering team focused on forward-looking aviation and aerospace solutions. Our concept—the Stratospheric Agricultural Blimp System (SABS)—targets water scarcity in remote agricultural regions by harvesting humidity at altitude using a liquid-desiccant extraction subsystem and delivering water through a vertically mobile feeder architecture.",
        "My contributions centered on water extraction and distribution location analysis, systems-level design schematics, and creative direction for technical communication. I collaborated with teammates across Computer, Aerospace, Electrical, Mechanical, and Industrial Engineering to analyze feasibility constraints, evaluate operational tradeoffs (mass vs. endurance, power budget vs. extraction rate, deployment logistics), and iterate on a deployment timeline spanning R&D, prototyping, environmental testing, and full system integration.",
        "The project reinforced structured engineering for open-ended problems: requirements decomposition, assumption validation, interface definition between subsystems (aerostat, propulsion, extraction, distribution), and presenting complex concepts to both technical reviewers and non-specialist stakeholders—skills directly transferable to firmware architecture, embedded I/O design, and large-scale software system proposals.",
      ],
      roles: [
        "Water extraction & distribution location analysis",
        "Systems design schematic development",
        "Creative director for technical presentation",
      ],
      team: [
        "Mindi Tan — Computer Engineering",
        "Miles Changhwa — Aerospace Engineering (aerostat & propulsion)",
        "Syed Abidi — Electrical Engineering (extraction method & aerodynamics)",
        "Rohan Tolia — Mechanical Engineering (cruiser & feeder design)",
        "Gaby Durkin — Industrial Engineering (model design & distribution)",
      ],
      links: [
        {
          label: "NASA Blue Skies Competition",
          href: "https://blueskies.nianet.org/",
          note: "Official Gateways to Blue Skies challenge site",
        },
        {
          label: "View the full proposal here",
          href: "https://drive.google.com/file/d/10QGoWqYyH3w5hb4ZKhWIp0OU5ywqNfjm/view",
          note: "Full SABS proposal document",
        },
        {
          label: "TAMU ThinkTank",
          href: "https://www.tamuthinktank.org/",
          note: "Undergraduate design-challenge organization",
        },
      ],
    },
    {
      id: "sharetea",
      title: "Sharetea POS System",
      status: "Full-Stack Web Application",
      summary:
        "A full-stack bubble tea POS platform for ordering, checkout, kitchen workflow, inventory, reporting, and manager tools—unifying customer, cashier, kitchen, and manager views in one application.",
      paragraphs: [
        "The Sharetea POS System is a full-stack point-of-sale platform designed for a bubble tea business that needs an organized, customizable, and affordable way to manage ordering, checkout, kitchen workflow, inventory, and reporting in one place. Instead of relying on separate tools for customers, cashiers, kitchen staff, and managers, this system brings multiple user views into a single application. The project focused on creating a smoother ordering experience through drink customization, cart management, order placement, menu visualization, and user-friendly interface improvements.",
        "A major part of the system was its reporting and management functionality. The manager-side tools included sales reports, inventory tracking, restock reports, X-Reports for hourly sales breakdowns, and Z-Reports for end-of-day summaries. These reports helped organize business data into useful insights so managers could review sales patterns, monitor inventory levels, and make better operational decisions. The system also included practical features such as threshold-based restock tracking, database-connected reporting, and structured data retrieval to support real-time business management.",
        "From a technical perspective, the project combined front-end, back-end, and database development into a complete full-stack application. On the front end, the interface was built with React and Vite, including customer-facing drink selection screens, confirmation pages, manager dashboards, and reporting views. On the back end, the system connected application logic to a PostgreSQL database using DAO-style organization, allowing the program to retrieve, update, and display order, menu, inventory, and sales data. The project also involved API integration, environment variable setup, GitHub version control, and deployment through Render.",
        "Overall, the Sharetea POS System strengthened my experience in full-stack software engineering, UI design, database integration, and deployed application development. I built features that connected user interaction with structured business data, especially in areas such as drink selection, order confirmation, reporting, and manager tools. This project gave me hands-on experience building software that resembles a real business application, while also improving my understanding of front-end design, back-end structure, and data-driven reporting.",
      ],
      links: [
        {
          label: "Open Sharetea POS Portal",
          href: "https://project3-team40-frontend.onrender.com/",
        },
        {
          label: "View on GitHub",
          href: "https://github.com/minditan/sharetea-pos",
        },
        {
          label: "Download project source (ZIP)",
          href: "/project3_team40-2.0.0.zip",
        },
        {
          label: "Download project source (TAR.GZ)",
          href: "/project3_team40-2.0.0.tar.gz",
        },
      ],
    },
  ],
  qualifications: {
    experience: [
      {
        title: "Information Technology Assistant · Yugo Apex",
        org: "Yugo · College Station, TX · On-site",
        dates: "March 2026 – Present",
        body:
          "As an Information Technology Assistant at Yugo, I support resident-facing technology systems by diagnosing technical issues, troubleshooting access and connectivity problems, and helping resolve portal authentication concerns. This role has strengthened my ability to identify root causes, document recurring system failures, and communicate technical solutions clearly to both residents and staff. Through high-volume support requests, I have developed a more structured approach to problem-solving, systems debugging, and user-focused technical assistance in a fast-paced residential environment.",
        skills: "Technical Support and Computer Assistance",
      },
      {
        title: "Pledge President & Website Operations Chair · Rho Delta Chi Sorority",
        org: "Rho Delta Chi Sorority · Texas A&M University",
        dates: "August 2025 – Present",
        paragraphs: [
          "As Pledge President for Rho Delta Chi Sorority, I was elected to represent and support a new member class of 12. In this role, I coordinated closely with the New Member President to communicate expectations, organize class responsibilities, and help ensure that each member stayed informed and engaged throughout the new member process. This experience strengthened my leadership, teamwork, and communication skills by requiring me to balance organization, accountability, and collaboration while serving as a bridge between my class and chapter leadership.",
          "As Website Operations Chair, I manage and maintain the chapter's online presence by updating the website each semester, adding new members, refreshing visual elements, and keeping chapter information accurate and organized. This role allows me to combine design, communication, and technical organization while improving the usability and presentation of the chapter's digital content. Through this position, I have developed a stronger eye for branding, layout consistency, and how digital platforms can support recruitment, engagement, and chapter identity.",
        ],
        link: {
          label: "TAMU Rho Delta Chi",
          href: "https://www.tamurhos.org/",
        },
      },
      {
        title: "WIRED AUV",
        org: "Texas A&M University · WIRED Underwater Robotics",
        dates: "January 2024 – May 2025",
        body:
          "As a member of Texas A&M's WIRED Underwater Robotics team, I contributed to the electrical systems of an autonomous underwater vehicle by supporting wiring, power distribution, and sensor integration for competition-ready hardware. This experience helped me gain a much deeper understanding of electrical components, including how different sensors, power systems, and hardware modules connect and function together within a real robotic system. Working alongside mechanical and software-focused teammates also strengthened my ability to approach engineering problems from a multidisciplinary perspective and apply classroom concepts to hands-on underwater robotics development.",
        skills: "Electrical Wiring, Robotics",
        link: {
          label: "WIRED AUV team website",
          href: "https://tamuwiredvexu.wixsite.com/website",
        },
      },
      {
        title: "Student Success Program Coordinator · Hullabaloo U",
        org: "Texas A&M University",
        dates: "August 2024 – May 2025",
        body:
          "As a Hullabaloo U Mentor, I led 30+ first-year engineering students through academic onboarding, curriculum planning, and early career exploration. I served as a consistent mentorship point of contact—helping students navigate university resources, adapt to rigorous engineering coursework, and develop collaboration, problem-solving, and project-management skills in a cohort-based environment.",
        link: {
          label: "Hullabaloo U program",
          href: "https://studentsuccess.tamu.edu/first-year-experience/hullabaloo-u",
        },
      },
    ],
    technicalSkills: {
      software: [
        "C / C++",
        "Python",
        "JavaScript (ES modules)",
        "Git & collaborative workflows",
        "Linux-based development",
        "VS Code / IDE debugging",
      ],
      hardware: [
        "Verilog HDL",
        "Xilinx Vivado",
        "Circuit modeling & simulation",
        "Microcontroller / embedded I/O concepts",
        "Hardware–software interface design",
      ],
      graphics: [
        "Blender (modeling, UV, materials, glTF export)",
        "Three.js / WebGL rendering pipelines",
        "HTML/CSS/JS interactive UI overlays",
      ],
      approach:
        "Rather than listing tools in isolation, my coursework and projects demonstrate how I apply them: structured problem decomposition, incremental testing, version-controlled iteration, and refinement for correctness, clarity, and performance—especially in systems-level programming and full-stack integration.",
    },
    interests: [
      "Systems programming & software architecture",
      "Memory management and operating-systems concepts",
      "Low-level systems ↔ application-layer abstractions",
      "Embedded firmware and hardware-adjacent tooling",
      "Interactive web graphics and simulation environments",
      "Engineering communication & technical visualization",
    ],
  },
};

const DESKTOP_VERSION = "392";

const GITHUB_LINKS = {
  profile: "https://github.com/minditan",
  portfolio: "https://github.com/minditan/mindi-portfolio",
  sharetea: "https://github.com/minditan/sharetea-pos",
};
const ABOUT_PHOTO = `/about-photo.jpg?v=${DESKTOP_VERSION}`;
const RESUME_PDF = `/resume.pdf?v=${DESKTOP_VERSION}`;
const RESUME_PREVIEW = `/resume-preview.png?v=${DESKTOP_VERSION}`;
const ECEN_HERO_IMAGE = `/ecen-hero-chip.png?v=${DESKTOP_VERSION}`;

const ICONS = {
  about: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v14a1 1 0 0 1-1.56.83L12 17.17l-6.44 2.66A1 1 0 0 1 4 19V5zm3-1a1 1 0 0 0-1 1v12.38l5.44-2.24a1 1 0 0 1 .76 0L17 17.38V5a1 1 0 0 0-1-1H7zm3 4h4a1 1 0 1 1 0 2h-4a1 1 0 1 1 0-2zm0 4h6a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2z"/></svg>`,
  projects: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  qualifications: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 3 7v2c0 5 3.8 9.7 9 11 5.2-1.3 9-6 9-11V7l-9-5zm0 2.2 7 3.9v1.9c0 4.1-3.1 8-7 9.2C8.1 19 5 15.1 5 11V8.1l7-3.9zM10.3 14 7.8 11.5l1.4-1.4 1.1 1.1 3.5-3.5 1.4 1.4-4.9 4.9z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.88-.01 3.27 0 .32.22.69.83.57A12 12 0 0 0 12 .5z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.27h4.56V23H.22V8.27zM8.1 8.27h4.37v2.01h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 6.99V23h-4.56v-6.88c0-1.64-.03-3.75-2.28-3.75-2.28 0-2.63 1.78-2.63 3.62V23H8.1V8.27z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2-.5a.5.5 0 0 0-.5.5v.37l9 5.63 9-5.63V4a.5.5 0 0 0-.5-.5H4zm18 3.14-8.55 5.34a1 1 0 0 1-1.02 0L4 6.64V20a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V6.64z"/></svg>`,
  resume: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8l-6-6H8zm1 2h5v5h5v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 9h6v1.5H10V11zm0 3h6V15.5H10V14z"/></svg>`,
};

const FALLBACK_DOCK_ICONS = {
  about: `/icons/about.png?v=${DESKTOP_VERSION}`,
  blender: `/icons/blender.png?v=${DESKTOP_VERSION}`,
  nasa: `/icons/nasa.png?v=${DESKTOP_VERSION}`,
  sharetea: `/icons/sharetea.png?v=${DESKTOP_VERSION}`,
  ecen: `/icons/electrical.png?v=${DESKTOP_VERSION}`,
  aiglasses: `/icons/aiglasses.png?v=${DESKTOP_VERSION}`,
};

const FALLBACK_ECEN_IMAGES = [
  {
    key: "ecen325-sum-amp",
    src: `/ecen-lab/ecen325-sum-amp.png?v=${DESKTOP_VERSION}`,
    alt: "Summing amplifier circuit simulation output",
    caption: "ECEN 325 · summing amplifier analysis",
  },
  {
    key: "ecen325-diff-amp",
    src: `/ecen-lab/ecen325-diff-amp.png?v=${DESKTOP_VERSION}`,
    alt: "Differential amplifier circuit simulation output",
    caption: "ECEN 325 · differential amplifier analysis",
  },
  {
    key: "ecen325-bjt-curve",
    src: `/ecen-lab/ecen325-bjt-curve.png?v=${DESKTOP_VERSION}`,
    alt: "BJT characteristic curve plot from lab measurements",
    caption: "ECEN 325 · BJT curve measurements",
  },
  {
    key: "ecen248-invert-amp-bode",
    src: `/ecen-lab/ecen248-invert-amp-bode.png?v=${DESKTOP_VERSION}`,
    alt: "Inverting amplifier Bode plot from digital systems lab",
    caption: "ECEN 248 · inverting amplifier Bode plot",
  },
  {
    key: "ecen454-mosfet-schematic",
    src: `/ecen-lab/ecen454-mosfet-schematic.png?v=${DESKTOP_VERSION}`,
    alt: "MOSFET digital circuit schematic",
    caption: "ECEN 454 · MOSFET circuit schematic",
  },
  {
    key: "ecen314-bode-hp",
    src: `/ecen-lab/ecen314-bode-hp.png?v=${DESKTOP_VERSION}`,
    alt: "High-pass filter Bode plot from signals lab",
    caption: "ECEN 314 · high-pass Bode plot",
  },
  {
    key: "ecen314-bandpass-time",
    src: `/ecen-lab/ecen314-bandpass-time.png?v=${DESKTOP_VERSION}`,
    alt: "Band-pass filter time-domain response",
    caption: "ECEN 314 · band-pass time-domain response",
  },
  {
    key: "ecen314-oscilloscope",
    src: `/ecen-lab/ecen314-oscilloscope.png?v=${DESKTOP_VERSION}`,
    alt: "Oscilloscope capture of sinusoidal waveforms and measurements",
    caption: "ECEN 314 · oscilloscope lab capture",
  },
];

const monitorAssets = {
  aboutPhoto: ABOUT_PHOTO,
  roomfolioImages: null,
  nasaImages: null,
  ecenImages: null,
  ecenHeroImage: ECEN_HERO_IMAGE,
  aiGlassesImages: null,
  dockIcons: null,
};

const FALLBACK_ROOMFOLIO_IMAGES = [
  {
    src: `/roomfolio-workspace.jpg?v=${DESKTOP_VERSION}`,
    alt: "Blender workspace scene in the 3D viewport",
    caption: "Blender workspace scene",
  },
  {
    src: `/roomfolio-room.jpg?v=${DESKTOP_VERSION}`,
    alt: "Full Blender room layout with desk and pegboard",
    caption: "Full room layout in Blender",
  },
  {
    src: `/roomfolio-pegboard.jpg?v=${DESKTOP_VERSION}`,
    alt: "Maker pegboard workstation with tools and test equipment",
    caption: "Maker pegboard workstation",
  },
  {
    src: `/roomfolio-desk.jpg?v=${DESKTOP_VERSION}`,
    alt: "Dual-monitor desk setup with PC build",
    caption: "Dual-monitor desk setup",
  },
  {
    src: `/roomfolio-shelf.jpg?v=${DESKTOP_VERSION}`,
    alt: "Blender shelf styling with decor and record player",
    caption: "Shelf styling & decor details",
  },
];

window.addEventListener("message", (event) => {
  if (event.data?.type === "monitor-assets" && event.data.assets) {
    if (event.data.assets.aboutPhoto) {
      monitorAssets.aboutPhoto = event.data.assets.aboutPhoto;
    }
    if (event.data.assets.roomfolioImages?.length) {
      monitorAssets.roomfolioImages = event.data.assets.roomfolioImages;
    }
    if (event.data.assets.nasaImages?.length) {
      monitorAssets.nasaImages = event.data.assets.nasaImages;
    }
    if (event.data.assets.ecenImages?.length) {
      monitorAssets.ecenImages = event.data.assets.ecenImages;
    }
    if (event.data.assets.ecenHeroImage) {
      monitorAssets.ecenHeroImage = event.data.assets.ecenHeroImage;
    }
    if (event.data.assets.aiGlassesImages?.length) {
      monitorAssets.aiGlassesImages = event.data.assets.aiGlassesImages;
    }
    if (event.data.assets.dockIcons) {
      monitorAssets.dockIcons = event.data.assets.dockIcons;
      refreshDockIcons();
    }
    refreshOpenPopup();
    return;
  }

  if (event.data?.type === "open-dock-item") {
    const item = DOCK_ITEMS.find((entry) => entry.id === event.data.id);
    if (item) openPopup(event.data.id, item.label);
  }
});

function getDockIconUrl(id) {
  return monitorAssets.dockIcons?.[id] || FALLBACK_DOCK_ICONS[id];
}

function getDockIconHtml(id) {
  const url = getDockIconUrl(id);
  if (!url) return ICONS[id] || "";
  return `<span class="dock-app-icon dock-app-icon--${id}"><img class="dock-icon-img" src="${url}" alt="" /></span>`;
}

function getDockIconMarkup(id) {
  if (
    id === "about" ||
    id === "blender" ||
    id === "nasa" ||
    id === "sharetea" ||
    id === "ecen" ||
    id === "aiglasses"
  ) {
    return getDockIconHtml(id);
  }
  return ICONS[id] || "";
}

function refreshDockIcons() {
  if (!dockEl) return;

  dockEl.querySelectorAll(".dock-btn").forEach((btn) => {
    const { id } = btn.dataset;
    if (
      id !== "about" &&
      id !== "blender" &&
      id !== "nasa" &&
      id !== "sharetea" &&
      id !== "ecen" &&
      id !== "aiglasses"
    ) {
      return;
    }

    const url = getDockIconUrl(id);
    if (!url) return;

    let img = btn.querySelector(".dock-icon-img");
    if (!img) {
      btn.innerHTML = getDockIconHtml(id);
      return;
    }

    if (img.src !== url) img.src = url;
  });
}

function getAboutPhotoUrl() {
  return monitorAssets.aboutPhoto || ABOUT_PHOTO;
}

function getBlenderImages() {
  return monitorAssets.roomfolioImages || FALLBACK_ROOMFOLIO_IMAGES;
}

const FALLBACK_NASA_IMAGES = [
  {
    src: `/nasa-proposal.jpg?v=${DESKTOP_VERSION}`,
    alt: "SABS proposal summary slide for Team SOLARA",
    caption: "Full proposal summary slide",
  },
  {
    src: `/nasa-team.jpg?v=${DESKTOP_VERSION}`,
    alt: "Team SOLARA group photo at Zachry Engineering Education Complex",
    caption: "Team SOLARA at Zachry Complex",
  },
];

function getNasaImages() {
  return monitorAssets.nasaImages || FALLBACK_NASA_IMAGES;
}

function getEcenImages() {
  return monitorAssets.ecenImages || FALLBACK_ECEN_IMAGES;
}

function getEcenHeroImageUrl() {
  return monitorAssets.ecenHeroImage || ECEN_HERO_IMAGE;
}

function getAiGlassesImages() {
  return monitorAssets.aiGlassesImages || FALLBACK_AI_GLASSES_IMAGES;
}

const aboutPhotoPreload = new Image();
aboutPhotoPreload.src = getAboutPhotoUrl();

const ABOUT_SKILL_ICONS = {
  Hardware: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 2v3M12 2v3M15 2v3M9 19v3M12 19v3M15 19v3M2 9h3M2 12h3M2 15h3M19 9h3M19 12h3M19 15h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  Software: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8 4 12l4 4M16 8l4 4-4 4M13 6l-2 12" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  "Embedded Systems": `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 9h6v6H9zM3 9h2M3 12h2M3 15h2M19 9h2M19 12h2M19 15h2M9 3v2M12 3v2M15 3v2M9 19v2M12 19v2M15 19v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  Blender: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="2.2" fill="currentColor"/><path d="M8 9c2.5-1.2 5.5-1.2 8 0l-4 10c-2.5-1.2-5.5-1.2-8 0l4-10z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  "Three.js": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 18H4L12 3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 3v15M4 18l8-7 8 7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  CSS: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v3H4V4zm0 5h16v3H4V9zm0 5h10v3H4v-3z" fill="currentColor"/></svg>`,
  Vercel: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 20 20H4L12 4z" fill="currentColor"/></svg>`,
};

const ABOUT_INTEREST_ICONS = {
  EDM: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 16 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M4 12v4a2 2 0 0 0 2 2h1.5M20 12v4a2 2 0 0 1-2 2h-1.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M7 14h2M15 14h2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  Baking: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 14h10l-1.2 4H8.2L7 14z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 14c0-3 1.8-5 4-5s4 2 4 5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="11" r=".7" fill="currentColor"/><circle cx="14" cy="11" r=".7" fill="currentColor"/></svg>`,
  Fitness: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10v4M21 10v4M6 12h2l1-3h6l1 3h2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  Pinterest: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.5c-1.8 0-3 1.2-3 2.8 0 1.1.6 1.7 1 2-.1.7-.3 1.6-.3 1.8 0 .2.1.4.4.2.2-.1 1.4-1.8 1.8-2.5.5.1.9.1 1.4.1 1.8 0 3-1.2 3-2.9C15.3 8.7 14 7.5 12 7.5z" fill="currentColor"/></svg>`,
  LEGO: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="8" r="1.2" fill="currentColor"/><circle cx="15" cy="8" r="1.2" fill="currentColor"/></svg>`,
  Movies: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="7" width="16" height="11" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 10h16M8 7V5M16 7V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12.5 13.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5z" fill="currentColor"/></svg>`,
};

const LINK_POPUPS = {
  github: {
    label: "GitHub",
    message: "Click the link below to access my GitHub!",
    href: PROFILE.links.github,
    linkText: "github.com/minditan",
  },
  linkedin: {
    label: "LinkedIn",
    message: "Click the link to access my LinkedIn!",
    href: PROFILE.links.linkedin,
    linkText: "linkedin.com/in/minditan",
  },
  email: {
    label: "Email",
    message: "Click the link below to access my Gmail!",
    href: PROFILE.links.email,
    linkText: "mindi.w.tan@gmail.com",
  },
};

const DOCK_ITEMS = [
  { id: "about", label: "About Me", type: "popup" },
  { id: "blender", label: "Room Folio", type: "popup" },
  { id: "nasa", label: "Team SOLARA", type: "popup" },
  { id: "sharetea", label: "Sharetea POS", type: "popup" },
  { id: "aiglasses", label: "AI Glasses", type: "popup" },
  { id: "ecen", label: "Hardware & ECEN", type: "popup" },
  { id: "qualifications", label: "Qualifications", type: "popup" },
  { id: "github", label: "GitHub", type: "popup" },
  { id: "linkedin", label: "LinkedIn", type: "popup" },
  { id: "email", label: "Email", type: "popup" },
];

const BLENDER_PROJECT = {
  title: "Blender Engineering Workspace Scene",
  subtitle: "Interactive 3D Room Portfolio",
  description:
    "Welcome to my RoomFolio! An interactive 3D portfolio project I built using Blender, Three.js, and Vercel to turn a traditional website into a more immersive digital experience. I designed and modeled a custom workspace scene in Blender, focusing on layout, lighting, materials, scaling, texture work, and scene organization to create a polished environment that reflects both my technical and creative side. After building the scene, I brought it to the web with Three.js and deployed it through Vercel, allowing users to explore my portfolio through an interactive browser-based 3D experience.",
  overview:
    "A fully modeled workspace scene built in Blender from scratch, exported for real-time web interaction through Three.js with optimized materials, lighting, and asset organization.",
  creativeGoal:
    "Replace a traditional static portfolio with an explorable virtual room that reflects my personality, creativity, and technical interests in one cohesive experience.",
  technicalHighlights: [
    "Mesh modeling and object scaling from scratch",
    "HTML/CSS monitor desktop UI overlays",
    "Lighting design and render optimization",
    "glTF export and asset organization for web",
    "Three.js scene loading, camera controls, and interaction",
    "Deployed through Vercel as a live interactive portfolio",
    "UV mapping, texture baking, and material setup",
  ],
  tools: ["Blender", "Three.js", "Vercel", "CSS"],
  status: {
    label: "Live Portfolio",
    text: "The interactive 3D room is deployed and actively maintained as my portfolio experience.",
  },
  links: [
    {
      label: "View Project",
      href: "https://mindi-portfolio.vercel.app",
      primary: true,
    },
    {
      label: "View on GitHub",
      href: GITHUB_LINKS.portfolio,
    },
  ],
  images: FALLBACK_ROOMFOLIO_IMAGES,
};

const NASA_PROJECT = {
  title: "NASA Blue Skies – Team SOLARA",
  paragraphs: [
    "The NASA Gateways to Blue Skies Design Challenge is a forward-looking aviation and aerospace competition focused on transformative solutions to real-world problems. Our team, TAMU ThinkTank Team Solara, proposed the Stratospheric Agricultural Blimp System (SABS)—a high-altitude concept designed to alleviate water scarcity in remote and arid agricultural areas. The system uses a stratospheric aerostat to harvest atmospheric humidity through a liquid-desiccant extraction subsystem and deliver water to crops via a vertically mobile feeder architecture, with minimal environmental impact and adaptability across diverse farming environments.",
    "As a computer engineering student on the team, I contributed across multiple technical areas of the proposal rather than focusing on one subsystem alone. I worked on water extraction and distribution location analysis, evaluating how harvested moisture could be routed efficiently across varied terrain and crop layouts. I helped analyze power budgets against extraction throughput, define interface requirements between the liquid-desiccant extraction loop and downstream distribution hardware, and assess how aerostat endurance, payload capacity, and operational altitude affected overall system performance. Collaborating with teammates in aerospace, electrical, mechanical, and industrial engineering, I supported feasibility analysis on mass versus endurance, hydrogen permeability in envelope materials, feeder deployment mechanics, and staging logistics for sustained stratospheric operations.",
    "Our proposed deployment timeline spans four years: first-year evaluation of envelope materials and structural components, second- and third-year construction and testing of subsystem prototypes with progressive integration, third-year controlled lab validation and short-range flight trials, and fourth-year full system integration with deployment targeted by 2029 followed by long-term operational monitoring. The experience strengthened my ability to decompose open-ended engineering problems, validate assumptions across subsystem interfaces, and communicate technical tradeoffs to both specialist reviewers and general audiences—skills that translate directly to embedded systems work, firmware architecture, and large-scale engineering proposals.",
  ],
  links: [
    {
      label: "NASA Blue Skies Competition (project description)",
      href: "https://blueskies.nianet.org/",
    },
    {
      label: "View the full proposal here",
      href: "https://drive.google.com/file/d/10QGoWqYyH3w5hb4ZKhWIp0OU5ywqNfjm/view",
    },
    {
      label: "TAMU ThinkTank",
      href: "https://www.tamuthinktank.org/",
    },
  ],
};

const SHARETEA_PROJECT = {
  title: "Sharetea POS System",
  subtitle:
    "A full-stack POS platform for order flow, inventory control, and business reporting in a bubble tea shop environment.",
  tags: ["React", "Vite", "PostgreSQL", "DAO", "Render", "Full-Stack", "Reporting"],
  meta: [
    { label: "Project", value: "Full-Stack Portfolio Project" },
    { label: "Timeline", value: "Spring 2025" },
    {
      label: "Role",
      value: "Frontend, Backend, and Full-Stack Development",
    },
    {
      label: "Focus",
      value: "Ordering, Inventory, Reports, Database Integration",
    },
  ],
  overview:
    "Sharetea POS System is a full-stack application that connects customer ordering, cashier checkout, kitchen workflow, manager oversight, and reporting in one deployed platform. I implemented features across the frontend UI, backend service layer, and database integration so each user role could interact with the same live order and inventory data.",
  features: [
    {
      title: "Drink Customization",
      text: "Built a configurable drink builder with size, sweetness, ice level, and topping parameters, backed by structured menu data and validation rules in the UI state layer.",
    },
    {
      title: "Cart & Order Placement",
      text: "Implemented cart state management, order confirmation, and checkout transitions with client-side validation before requests were sent to backend endpoints.",
    },
    {
      title: "Multi-View System",
      text: "Designed separate React views for customer, cashier, kitchen, manager, and menu board workflows while sharing common order and inventory state.",
    },
    {
      title: "Inventory Tracking",
      text: "Added inventory monitoring with threshold-based restock alerts and manager-side visibility into stock levels through database-backed queries.",
    },
    {
      title: "Data & Reporting",
      text: "Built sales, restock, X-Report, and Z-Report modules that aggregate transaction and inventory data for daily and hourly operational review.",
    },
    {
      title: "API Integrations",
      text: "Connected frontend views to backend services through REST-style API calls, environment-based configuration, and structured request/response handling.",
    },
    {
      title: "Database Integration",
      text: "Used PostgreSQL with DAO-style data access to persist menu, order, inventory, and sales records and expose them to the application layers.",
    },
    {
      title: "User Experience",
      text: "Refined navigation, component layout, and view consistency across the POS portal to keep multi-role workflows readable and efficient.",
    },
  ],
  architecture: {
    frontend: [
      "React + Vite UI",
      "Component-based views",
      "Manager dashboards",
      "Reporting screens",
      "Customer ordering flows",
    ],
    backend: [
      "Service-layer logic",
      "DAO pattern",
      "API routing",
      "Environment configuration",
    ],
    database: ["PostgreSQL", "Inventory tables", "Sales and order schemas"],
  },
  reports: [
    {
      title: "Sales Report",
      text: "Aggregates transaction totals and sales activity over a selected period using backend queries and computed summary fields.",
    },
    {
      title: "Restock Report",
      text: "Extracts inventory levels from the database and flags items below restock thresholds for manager review.",
    },
    {
      title: "X-Report",
      text: "Generates hourly sales breakdowns by running time-windowed queries and formatting shift-level performance metrics.",
    },
    {
      title: "Z-Report",
      text: "Produces end-of-day reconciliation summaries by combining daily sales totals, inventory changes, and closing calculations.",
    },
  ],
  contributions:
    "I worked across frontend, backend, and full-stack integration throughout the project. On the frontend, I built customer ordering flows, manager dashboards, and reporting views in React. On the backend, I implemented service logic, API communication, and database access patterns. I also connected both layers so order, inventory, and reporting features could run against the same live PostgreSQL data.",
  takeaways:
    "This project strengthened my full-stack development skills, especially in React UI architecture, backend service design, PostgreSQL integration, and building reporting tools that turn raw operational data into usable business insights.",
  links: {
    demo: "https://project3-team40-frontend.onrender.com/",
    github: GITHUB_LINKS.sharetea,
    zip: `/project3_team40-2.0.0.zip?v=${DESKTOP_VERSION}`,
    tar: `/project3_team40-2.0.0.tar.gz?v=${DESKTOP_VERSION}`,
  },
};

const FALLBACK_AI_GLASSES_IMAGES = [
  {
    src: `/ai-glasses/prototype-build.jpg?v=${DESKTOP_VERSION}`,
    alt: "ESP32 breadboard prototype with INMP441 microphone and OLED display",
    caption: "Current breadboard prototype — ESP32, INMP441 mic, and OLED subtitle display",
  },
];

const AI_GLASSES_TOOLS = ["Cursor", "Claude", "AI"];

const AI_GLASSES_COMPONENTS = [
  "HiLetgo ESP32",
  "Breadboard",
  "Circuit wires",
  "INMP441",
  "LiPo Battery",
];

const AI_GLASSES_PROJECT = {
  title: "AI Subtitle Glasses",
  subtitle:
    "An ongoing wearable build — live speech captions on glasses for accessibility and real-time language support.",
  status: "Ongoing Project",
  statusNote:
    "This is active work in progress. Hardware, firmware, and translation layers are still being tested and iterated.",
  overview:
    "I am building smart glasses that capture nearby speech and render live subtitles on a small display mounted to the frame. The long-term goal is a wearable tool that helps people follow conversations in real time — whether they have hearing difficulty, are learning a new language, or need translation across a language barrier.",
  goal:
    "Speak into the glasses, see subtitles appear on the lens display, and eventually switch languages so translated text shows instantly for the wearer.",
  aiApproach:
    "As AI becomes a bigger part of how we build technology, I am using Cursor, Claude, and other AI tools as learning partners — not answer machines. I ask them to break problems into steps, explain tradeoffs, and help me reason through firmware, wiring, and software decisions so I still understand and own the build.",
  workflow: [
    {
      title: "Capture audio",
      text: "The INMP441 I2S microphone feeds speech from the ESP32 into a lightweight capture pipeline.",
    },
    {
      title: "Transcribe speech",
      text: "Audio is sent to a backend service for speech recognition and subtitle generation.",
    },
    {
      title: "Show subtitles",
      text: "Recognized text is rendered on the glasses display as readable live captions.",
    },
    {
      title: "Translate (next)",
      text: "Planned language translation layer so subtitles can appear in the listener's preferred language.",
    },
  ],
  tools: AI_GLASSES_TOOLS,
  components: AI_GLASSES_COMPONENTS,
};

const ECEN_TOOL_ICONS = {
  heading: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2 4.5 6v4.8c0 4.6 3.2 8.9 7.5 10 4.3-1.1 7.5-5.4 7.5-10V6L12 2.2z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2.4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
  Vivado: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6 12 2l4 4-4 4-4-4zm8 4 4 4-4 4-4-4 4-4zM8 14l4 4 4-4-4-4-4 4z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  PetaLinux: `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="13" rx="7" ry="6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="12" r=".8" fill="currentColor"/><circle cx="14.5" cy="12" r=".8" fill="currentColor"/><path d="M10.5 15.2c.8.8 2.2.8 3 0" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M9 8.5c-1.2-.3-2-.9-2-1.5M15 8.5c1.2-.3 2-.9 2-1.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  "Zybo Z7": `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="7" width="14" height="10" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 10h8M8 13h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="16.5" cy="13" r=".7" fill="currentColor"/></svg>`,
  "Multisim / SPICE": `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 14c1.8-2.2 3.2-2.2 5 0s3.2 2.2 5 0" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M6.5 10h3v3h-3z" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>`,
  Oscilloscopes: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 14.5 9 11l2.5 2 2.5-4L16 14.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18.5" cy="14.5" r="1" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="18.5" cy="11.5" r="1" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>`,
  "Embedded Linux": `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 5v2M12 5v2M15 5v2M9 17v2M12 17v2M15 17v2M5 9h2M5 12h2M5 15h2M17 9h2M17 12h2M17 15h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
};

const ECEN_TOOLS = [
  "Vivado",
  "PetaLinux",
  "Zybo Z7",
  "Multisim / SPICE",
  "Oscilloscopes",
  "Embedded Linux",
];

const ECEN_PROJECT = {
  title: "Hardware & Electrical Engineering Foundations",
  intro:
    "As a Computer Engineering major, my technical background combines software development with electrical engineering fundamentals. Through my ECEN coursework, I have gained experience in circuit analysis, digital logic, signals and systems, embedded Linux, microprocessor design, and computer architecture. This section highlights the hardware-focused side of my degree and the technical skills I have developed beyond software engineering.",
  courses: [
    {
      title: "Circuit Design & Analysis",
      courses: ["ECEN 214 — Electrical Circuit Theory", "ECEN 325 — Electronics"],
      description:
        "Built a foundation in voltage, current, impedance, filters, op-amps, BJTs, frequency response, and circuit simulation. Worked with lab equipment and tools such as oscilloscopes, function generators, Multisim/SPICE, and measured circuit behavior through AC sweep, transient response, and Bode plot analysis.",
      skills:
        "Circuit analysis, SPICE simulation, op-amp circuits, filters, BJTs, lab measurements, debugging hardware behavior.",
      imageKeys: ["ecen325-sum-amp", "ecen325-diff-amp", "ecen325-bjt-curve"],
    },
    {
      title: "Digital Logic & Integrated Circuits",
      courses: [
        "ECEN 248 — Introduction to Digital Systems Design",
        "ECEN 454 — Digital Integrated Circuit Design",
      ],
      description:
        "Studied combinational and sequential logic, Boolean algebra, finite state machines, timing behavior, and digital circuit implementation. Developed a stronger understanding of how hardware logic is designed before it becomes part of larger embedded or computing systems.",
      skills:
        "Logic gates, FSMs, timing analysis, Verilog/VHDL concepts, CMOS/digital IC fundamentals, hardware design thinking.",
      imageKeys: ["ecen248-invert-amp-bode", "ecen454-mosfet-schematic"],
    },
    {
      title: "Signals, Systems & Data Analysis",
      courses: [
        "ECEN 303 — Random Signals and Systems",
        "ECEN 314 — Signals and Systems",
      ],
      description:
        "Learned how signals behave in time and frequency domains, including filtering, system response, convolution, Fourier analysis, probability, noise, and random processes. This coursework connects electrical engineering concepts with data, communication systems, and real-world signal behavior.",
      skills:
        "Signal processing, frequency-domain analysis, filtering, probability, noise analysis, MATLAB-style engineering analysis.",
      imageKeys: ["ecen314-bode-hp", "ecen314-bandpass-time", "ecen314-oscilloscope"],
    },
    {
      title: "Embedded Systems & Microprocessors",
      courses: [
        "ECEN 449 — Microprocessor Systems Design",
        "CSCE 462 / ECEN 462 — Microcomputer Systems",
      ],
      description:
        "Worked with embedded hardware and low-level system design using tools such as Vivado, PetaLinux, Zybo Z7, MicroBlaze, and Linux device drivers. Gained hands-on experience booting embedded Linux, configuring hardware/software interfaces, testing drivers, and interacting with custom hardware through user-space programs.",
      skills:
        "Embedded Linux, Vivado, PetaLinux, FPGA workflow, device drivers, MicroBlaze, Zybo Z7, hardware/software integration.",
      imageKeys: [],
    },
    {
      title: "Computer Architecture",
      courses: [
        "CSCE 350 / ECEN 350 — Computer Architecture and Design",
        "CSCE 313 — Introduction to Computer Systems",
      ],
      description:
        "Studied how processors, memory, instruction sets, and operating-system-level concepts work together. This helped connect my software background to the underlying hardware execution model, including performance, memory hierarchy, processes, and low-level system behavior.",
      skills:
        "Computer architecture, memory systems, processor design, C/C++, systems programming, hardware-aware software development.",
      imageKeys: [],
    },
  ],
};

const TOOL_ICONS = {
  Blender: ABOUT_SKILL_ICONS.Blender,
  "Three.js": ABOUT_SKILL_ICONS["Three.js"],
  Vercel: ABOUT_SKILL_ICONS.Vercel,
  CSS: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v3H4V4zm0 5h16v3H4V9zm0 5h10v3H4v-3z" fill="currentColor"/></svg>`,
  JavaScript: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 16l2.5-7h1.2l1.5 4.2L14.2 9H15l2.5 7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

function getPortfolioLiveUrl() {
  try {
    if (window.parent !== window) {
      const { origin, hostname } = window.parent.location;
      if (hostname !== "localhost" && hostname !== "127.0.0.1") {
        return origin;
      }
    }
  } catch {
    // Ignore cross-origin access errors and fall back below.
  }

  return "https://mindi-portfolio.vercel.app";
}

function getBlenderProjectLinks() {
  return [
    {
      label: "View Project",
      href: getPortfolioLiveUrl(),
      primary: true,
    },
    {
      label: "View on GitHub",
      href: GITHUB_LINKS.portfolio,
    },
  ];
}
const dockEl = document.getElementById("dock");
const popupEl = document.getElementById("popup");
const popupCardEl = document.querySelector(".popup-card");
const popupTitleEl = document.getElementById("popup-title");
const popupBodyEl = document.getElementById("popup-body");
const popupCloseEl = document.getElementById("popup-close");

let activePopup = null;

function renderSkillTags(skills) {
  return `<div class="skill-tags">${skills
    .map((skill) => `<span class="skill-tag">${skill}</span>`)
    .join("")}</div>`;
}

function renderLinkPopup(id, { message, href, linkText }) {
  const compactClass = "";

  return `
    <div class="link-popup${compactClass}">
      <div class="link-popup-inner">
        <p class="link-popup-message">${message}</p>
        <a class="link-popup-action" href="${href}" target="_blank" rel="noopener noreferrer">
          ${linkText}
        </a>
      </div>
    </div>
  `;
}

function renderAboutSkillPill(label) {
  return `
    <span class="about-skill-pill">
      ${ABOUT_SKILL_ICONS[label] || ""}
      <span>${label}</span>
    </span>
  `;
}

function renderAboutInterest(label) {
  return `
    <div class="about-interest-item">
      ${ABOUT_INTEREST_ICONS[label] || ""}
      <span>${label}</span>
    </div>
  `;
}

function renderAboutHighlights() {
  return `
    <div class="about-card about-card-highlights">
      <section class="about-highlight-section">
        <h4 class="about-section-title">Top Skills</h4>
        <div class="about-skill-grid">
          ${PROFILE.topSkills.map((skill) => renderAboutSkillPill(skill)).join("")}
        </div>
      </section>
      <section class="about-highlight-section">
        <h4 class="about-section-title">Currently Into</h4>
        <div class="about-interest-row">
          ${PROFILE.currentlyInto.map((item) => renderAboutInterest(item)).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderLinks(links) {
  return `<div class="project-links">${links
    .map((link) => {
      if (link.disabled) {
        return `<span class="project-link-placeholder">${link.label}</span>`;
      }

      return `
        <a href="${link.href}" target="_blank" rel="noopener noreferrer">
          ${link.label}
        </a>
        ${link.note ? `<span class="link-note">${link.note}</span>` : ""}
      `;
    })
    .join("")}</div>`;
}

function renderProjectImages(images) {
  if (!images?.length) return "";

  return `
    <div class="project-images">
      ${images
        .map(
          (image) => `
        <figure class="project-figure">
          <img src="${image.src}" alt="${image.alt}" loading="lazy" />
          ${image.caption ? `<figcaption>${image.caption}</figcaption>` : ""}
        </figure>
      `
        )
        .join("")}
    </div>
  `;
}

function renderProjectGalleryMeta({ tools, status, links }) {
  return `
    <div class="project-gallery-meta">
      <section class="project-footer-block">
        <h5>Tools & Stack</h5>
        <div class="project-tool-row">
          ${tools
            .map(
              (tool) => `
            <span class="project-tool-pill">
              ${TOOL_ICONS[tool] || ""}
              <span>${tool}</span>
            </span>
          `
            )
            .join("")}
        </div>
      </section>
      <section class="project-footer-block">
        <h5>Project Status</h5>
        <div class="project-status-wrap">
          <span class="project-status-badge">${status.label}</span>
        </div>
      </section>
      <section class="project-footer-block">
        <h5>Quick Links</h5>
        <div class="project-link-row">
          ${links
            .map((link) => {
              if (link.disabled) {
                return `
            <span class="project-link-btn is-disabled">${link.label}</span>
          `;
              }

              return `
            <a
              class="project-link-btn${link.primary ? " is-primary" : ""}"
              href="${link.href}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${link.label}
            </a>
          `;
            })
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderBlenderShowcase() {
  const { tools, status, technicalHighlights } = BLENDER_PROJECT;
  const links = getBlenderProjectLinks();
  const images = getBlenderImages();
  const first = images[0];

  return `
    <div class="project-showcase">
      <div class="project-showcase-top">
        <div class="project-gallery-column">
          <div class="project-gallery">
            <div class="project-gallery-main">
              <span class="project-featured-badge">★ Featured</span>
              <img class="project-gallery-hero" src="${first.src}" alt="${first.alt}" loading="eager" />
            </div>
            <div class="project-gallery-controls">
              <button class="project-gallery-nav project-gallery-prev" type="button" aria-label="Previous image">‹</button>
              <div class="project-gallery-thumbs">
                ${images
                  .map(
                    (image, index) => `
                  <button
                    class="project-gallery-thumb${index === 0 ? " is-active" : ""}"
                    type="button"
                    data-src="${image.src}"
                    data-alt="${image.alt}"
                    aria-label="${image.caption || image.alt}"
                  >
                    <img src="${image.src}" alt="" loading="lazy" />
                  </button>
                `
                  )
                  .join("")}
              </div>
              <button class="project-gallery-nav project-gallery-next" type="button" aria-label="Next image">›</button>
            </div>
          </div>
          ${renderProjectGalleryMeta({ tools, status, links })}
        </div>

        <div class="project-details">
          <div class="project-details-head">
            <span class="project-details-icon project-details-icon-img">${getDockIconHtml("blender")}</span>
            <div>
              <h3 class="project-details-title">${BLENDER_PROJECT.title}</h3>
              <p class="project-details-subtitle">${BLENDER_PROJECT.subtitle}</p>
            </div>
          </div>
          <p class="project-details-lead">${BLENDER_PROJECT.description}</p>
          <div class="project-details-grid">
            <section class="project-info-card">
              <h4><span class="project-info-icon">◎</span> Overview</h4>
              <p>${BLENDER_PROJECT.overview}</p>
            </section>
            <section class="project-info-card">
              <h4><span class="project-info-icon">✦</span> Creative Goal</h4>
              <p>${BLENDER_PROJECT.creativeGoal}</p>
            </section>
          </div>
          <section class="project-highlights">
            <h4><span class="project-info-icon">⚙</span> Technical Highlights</h4>
            <ul class="project-highlight-list">
              ${technicalHighlights.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </section>
        </div>
      </div>
    </div>
  `;
}

function renderNasaShowcase() {
  const images = getNasaImages();
  const [proposal, teamPhoto] = images;
  const { title, paragraphs, links } = NASA_PROJECT;

  return `
    <div class="project-showcase nasa-showcase">
      <div class="project-showcase-top">
        <div class="project-gallery-column">
          <div class="nasa-images-stack">
            <img
              class="nasa-stack-photo nasa-stack-photo--proposal"
              src="${proposal.src}"
              alt="${proposal.alt}"
              loading="eager"
            />
            <img
              class="nasa-stack-photo nasa-stack-photo--team"
              src="${teamPhoto.src}"
              alt="${teamPhoto.alt}"
              loading="lazy"
            />
          </div>
        </div>

        <div class="project-details nasa-details">
          <h3 class="project-details-title">${title}</h3>
          <div class="nasa-description">
            ${paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          </div>
          <div class="nasa-link-list">
            ${links
              .map(
                (link) => `
              <a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function getEcenImageKey(image) {
  if (image.key) return image.key;
  const filename = image.src.split("/").pop()?.split("?")[0] || "";
  return filename.replace(/\.(png|jpe?g|webp)$/i, "");
}

function getEcenImageMap() {
  const map = new Map();
  for (const image of getEcenImages()) {
    const key = getEcenImageKey(image);
    if (key) map.set(key, image);
  }
  return map;
}

function renderEcenToolsBar() {
  return `
    <div class="ecen-tools-bar" aria-label="Tools and platforms">
      <div class="ecen-tools-heading">
        <span class="ecen-tools-heading-icon">${ECEN_TOOL_ICONS.heading}</span>
        <span class="ecen-tools-heading-label">TOOLS &amp; PLATFORMS</span>
      </div>
      ${ECEN_TOOLS.map(
        (tool, index) => `
        ${index > 0 ? '<span class="ecen-tools-divider" aria-hidden="true"></span>' : ""}
        <div class="ecen-tools-item">
          <span class="ecen-tools-item-icon">${ECEN_TOOL_ICONS[tool] || ""}</span>
          <span class="ecen-tools-item-label">${tool}</span>
        </div>
      `
      ).join("")}
    </div>
  `;
}

function renderEcenLabFigures(imageKeys) {
  if (!imageKeys?.length) return "";

  const imageMap = getEcenImageMap();
  const figures = imageKeys
    .map((key) => imageMap.get(key))
    .filter(Boolean);

  if (!figures.length) return "";

  return `
    <div class="ecen-lab-block">
      <p class="ecen-lab-intro">Some images of my work from these courses:</p>
      <div class="ecen-lab-grid">
      ${figures
        .map(
          (image) => `
        <figure class="ecen-lab-figure">
          <img src="${image.src}" alt="${image.alt}" loading="lazy" />
          ${image.caption ? `<figcaption>${image.caption}</figcaption>` : ""}
        </figure>
      `
        )
        .join("")}
      </div>
    </div>
  `;
}

function renderEcenCourseSection(section) {
  return `
    <article class="ecen-course-card">
      <h4 class="ecen-course-title">${section.title}</h4>
      <ul class="ecen-course-list">
        ${section.courses.map((course) => `<li>${course}</li>`).join("")}
      </ul>
      <p class="ecen-course-text">${section.description}</p>
      <p class="ecen-course-skills"><strong>Skills shown:</strong> ${section.skills}</p>
      ${renderEcenLabFigures(section.imageKeys)}
    </article>
  `;
}

function renderAiGlassesShowcase() {
  const project = AI_GLASSES_PROJECT;
  const iconUrl = getDockIconUrl("aiglasses");
  const images = getAiGlassesImages();

  return `
    <div class="project-showcase aiglasses-showcase">
      <section class="aiglasses-hero">
        <div class="aiglasses-hero-main">
          <div class="aiglasses-title-row">
            <img class="aiglasses-title-icon" src="${iconUrl}" alt="" />
            <div>
              <h2 class="aiglasses-title">${project.title}</h2>
              <p class="aiglasses-subtitle">${project.subtitle}</p>
            </div>
          </div>
          <div class="aiglasses-tags">
            <span class="aiglasses-tag aiglasses-tag-status">${project.status}</span>
            <span class="aiglasses-tag">ESP32</span>
            <span class="aiglasses-tag">Speech-to-Text</span>
            <span class="aiglasses-tag">Translation</span>
          </div>
          <p class="aiglasses-status-note">${project.statusNote}</p>
        </div>
      </section>

      <section class="aiglasses-section">
        <h3 class="aiglasses-section-title">Overview</h3>
        <p class="aiglasses-section-text">${project.overview}</p>
        <div class="aiglasses-goal-card">
          <h4>Goal</h4>
          <p>${project.goal}</p>
        </div>
      </section>

      <section class="aiglasses-section aiglasses-split">
        <div class="aiglasses-panel">
          <h3 class="aiglasses-section-title">Tools & AI Approach</h3>
          <div class="aiglasses-pill-row">
            ${project.tools.map((tool) => `<span class="aiglasses-pill">${tool}</span>`).join("")}
          </div>
          <p class="aiglasses-panel-note">${project.aiApproach}</p>
        </div>
        <div class="aiglasses-panel">
          <h3 class="aiglasses-section-title">Components</h3>
          <ul class="aiglasses-component-list">
            ${project.components.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      </section>

      <section class="aiglasses-section">
        <h3 class="aiglasses-section-title">How It Works</h3>
        <div class="aiglasses-workflow-grid">
          ${project.workflow
            .map(
              (step) => `
            <article class="aiglasses-workflow-card">
              <h4>${step.title}</h4>
              <p>${step.text}</p>
            </article>
          `
            )
            .join("")}
        </div>
      </section>

      <section class="aiglasses-section">
        <h3 class="aiglasses-section-title">Project Photos</h3>
        <div class="aiglasses-gallery">
          ${images
            .map(
              (image) => `
            <figure class="aiglasses-figure">
              <img src="${image.src}" alt="${image.alt}" loading="lazy" />
              ${image.caption ? `<figcaption>${image.caption}</figcaption>` : ""}
            </figure>
          `
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderEcenShowcase() {
  const iconUrl = getDockIconUrl("ecen");
  const heroImageUrl = getEcenHeroImageUrl();

  return `
    <div class="project-showcase ecen-showcase">
      <section class="ecen-hero">
        <div class="ecen-hero-main">
          <div class="ecen-title-row">
            <img class="ecen-title-icon" src="${iconUrl}" alt="" />
            <div>
              <h2 class="ecen-title">${ECEN_PROJECT.title}</h2>
              <p class="ecen-intro">${ECEN_PROJECT.intro}</p>
            </div>
          </div>
        </div>
        <figure class="ecen-hero-photo">
          <img
            src="${heroImageUrl}"
            alt="Microprocessor and circuit board illustration"
            loading="eager"
          />
        </figure>
      </section>

      ${renderEcenToolsBar()}

      <section class="ecen-section">
        <h3 class="ecen-section-title">Core ECEN Coursework</h3>
        <div class="ecen-course-grid">
          ${ECEN_PROJECT.courses.map((section) => renderEcenCourseSection(section)).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderShareteaShowcase() {
  const project = SHARETEA_PROJECT;
  const iconUrl = getDockIconUrl("sharetea");
  const featureColumns = [
    project.features.slice(0, 3),
    project.features.slice(3, 6),
    project.features.slice(6, 8),
  ];

  return `
    <div class="project-showcase sharetea-showcase">
      <section class="sharetea-hero">
        <div class="sharetea-hero-main">
          <div class="sharetea-title-row">
            <img class="sharetea-title-icon" src="${iconUrl}" alt="" />
            <h2 class="sharetea-title">${project.title}</h2>
          </div>
          <p class="sharetea-subtitle">${project.subtitle}</p>
          <div class="sharetea-tags">
            ${project.tags.map((tag) => `<span class="sharetea-tag">${tag}</span>`).join("")}
          </div>
          <div class="sharetea-actions">
            <a
              class="sharetea-btn sharetea-btn-primary"
              href="${project.links.github}"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
              <span class="sharetea-btn-icon" aria-hidden="true">↗</span>
            </a>
            <a
              class="sharetea-btn sharetea-btn-ghost"
              href="${project.links.demo}"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Demo
              <span class="sharetea-btn-icon" aria-hidden="true">↗</span>
            </a>
          </div>
          <div class="sharetea-demo-access">
            <p class="sharetea-demo-access-title">Demo access</p>
            <ul class="sharetea-demo-access-list">
              <li><strong>Cashier view:</strong> password is <code>1234</code></li>
              <li><strong>Manager view:</strong> sign in with your TAMU email</li>
            </ul>
          </div>
        </div>

        <aside class="sharetea-meta-card">
          ${project.meta
            .map(
              (item) => `
            <div class="sharetea-meta-row">
              <span class="sharetea-meta-label">${item.label}</span>
              <span class="sharetea-meta-value">${item.value}</span>
            </div>
          `
            )
            .join("")}
        </aside>
      </section>

      <section class="sharetea-section">
        <h3 class="sharetea-section-title">Overview</h3>
        <p class="sharetea-section-text">${project.overview}</p>
      </section>

      <section class="sharetea-section sharetea-features-section">
        <h3 class="sharetea-section-title">Key Features</h3>
        <div class="sharetea-feature-grid">
          ${featureColumns
            .map(
              (column) => `
            <div class="sharetea-feature-column">
              ${column
                .map(
                  (feature) => `
                <article class="sharetea-feature-item">
                  <h4>${feature.title}</h4>
                  <p>${feature.text}</p>
                </article>
              `
                )
                .join("")}
            </div>
          `
            )
            .join("")}
        </div>
      </section>

      <section class="sharetea-section">
        <h3 class="sharetea-section-title">Technical Architecture</h3>
        <div class="sharetea-arch-grid">
          <div class="sharetea-arch-column">
            <h4>Frontend</h4>
            <ul>
              ${project.architecture.frontend.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="sharetea-arch-column">
            <h4>Backend</h4>
            <ul>
              ${project.architecture.backend.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="sharetea-arch-column">
            <h4>Database</h4>
            <ul>
              ${project.architecture.database.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </div>
      </section>

      <section class="sharetea-section">
        <h3 class="sharetea-section-title">Reporting Tools</h3>
        <p class="sharetea-section-text sharetea-section-lead">
          Each report was generated through custom data-extraction and aggregation logic that pulled records from PostgreSQL, calculated the required totals and time-window summaries, and formatted the results for manager-facing views.
        </p>
        <div class="sharetea-report-grid">
          ${project.reports
            .map(
              (report) => `
            <article class="sharetea-report-card">
              <h4>${report.title}</h4>
              <p>${report.text}</p>
            </article>
          `
            )
            .join("")}
        </div>
      </section>

      <section class="sharetea-section sharetea-footer-grid">
        <div class="sharetea-footer-card">
          <h3 class="sharetea-section-title">My Contributions</h3>
          <p class="sharetea-section-text">${project.contributions}</p>
        </div>
        <div class="sharetea-footer-card">
          <h3 class="sharetea-section-title">Key Takeaways</h3>
          <p class="sharetea-section-text">${project.takeaways}</p>
        </div>
      </section>
    </div>
  `;
}

function initProjectGallery(root) {
  const gallery = root?.querySelector(".project-gallery");
  if (!gallery) return;

  const hero = gallery.querySelector(".project-gallery-hero");
  const thumbs = [...gallery.querySelectorAll(".project-gallery-thumb")];
  if (!hero || !thumbs.length) return;

  let index = 0;

  const setIndex = (next) => {
    index = (next + thumbs.length) % thumbs.length;
    const thumb = thumbs[index];
    hero.src = thumb.dataset.src;
    hero.alt = thumb.dataset.alt;
    thumbs.forEach((button, i) => {
      button.classList.toggle("is-active", i === index);
    });
  };

  gallery.querySelector(".project-gallery-prev")?.addEventListener("click", () => {
    setIndex(index - 1);
  });
  gallery.querySelector(".project-gallery-next")?.addEventListener("click", () => {
    setIndex(index + 1);
  });
  thumbs.forEach((button, i) => {
    button.addEventListener("click", () => setIndex(i));
  });
}

function renderProject(project) {
  const images = renderProjectImages(project.images);
  const paragraphs = project.paragraphs
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  const skills = project.technicalSkills
    ? `
        <h4>Technical stack & engineering skills</h4>
        ${renderSkillTags(project.technicalSkills)}
      `
    : "";

  const roles = project.roles
    ? `
        <h4>My contributions</h4>
        <ul class="detail-list">${project.roles.map((r) => `<li>${r}</li>`).join("")}</ul>
      `
    : "";

  const team = project.team
    ? `
        <h4>Team composition</h4>
        <ul class="detail-list">${project.team.map((m) => `<li>${m}</li>`).join("")}</ul>
      `
    : "";

  const links = project.links ? renderLinks(project.links) : "";

  return `
    <article class="project-item">
      ${images}
      <div class="project-head">
        <strong>${project.title}</strong>
        ${project.status ? `<span class="project-status">${project.status}</span>` : ""}
      </div>
      <p class="project-summary">${project.summary}</p>
      ${paragraphs}
      ${skills}
      ${roles}
      ${team}
      ${links}
    </article>
  `;
}

function renderResumeShowcase() {
  return `
    <div class="resume-showcase">
      <div class="resume-toolbar">
        <p class="resume-note">${PROFILE.name} · ${PROFILE.role}</p>
        <a
          class="resume-download-btn"
          href="${RESUME_PDF}"
          download="Mindi-Tan-Resume.pdf"
        >
          <span aria-hidden="true">↓</span>
          Download PDF
        </a>
      </div>
      <div class="resume-preview-wrap">
        <img
          class="resume-preview-image"
          src="${RESUME_PREVIEW}"
          alt="${PROFILE.name} resume preview"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  `;
}

function popupContent(id) {
  if (LINK_POPUPS[id]) {
    return renderLinkPopup(id, LINK_POPUPS[id]);
  }

  if (id === "about") {
    return `
      <div class="about-page">
        <div class="about-sidebar">
          <div class="about-photo-wrap">
            <img
              class="about-photo"
              src="${getAboutPhotoUrl()}"
              alt="Photo of ${PROFILE.name}"
              loading="eager"
            />
          </div>
          ${renderAboutHighlights()}
        </div>
        <div class="about-content">
          <div class="about-card about-card-head">
            <h3>${PROFILE.name}<span class="about-name-accent">.✦ ݁˖</span></h3>
            <div class="role">${PROFILE.role}</div>
            <p class="about-location">${PROFILE.location}</p>
            ${PROFILE.available ? '<div class="badge">Available for work</div>' : ""}
          </div>
          <div class="about-card about-card-body">
            ${PROFILE.aboutParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          </div>
        </div>
      </div>
    `;
  }

  if (id === "blender") {
    return renderBlenderShowcase();
  }

  if (id === "nasa") {
    return renderNasaShowcase();
  }

  if (id === "sharetea") {
    return renderShareteaShowcase();
  }

  if (id === "aiglasses") {
    return renderAiGlassesShowcase();
  }

  if (id === "ecen") {
    return renderEcenShowcase();
  }

  if (id === "resume") {
    return renderResumeShowcase();
  }

  if (id === "qualifications") {
    const { experience, technicalSkills, interests } = PROFILE.qualifications;
    return `
      <div class="qualifications-page">
        <section class="qual-section">
          <h4>Leadership & experience</h4>
          ${experience
            .map(
              (entry) => `
            <article class="qual-card">
              <div class="qual-card-head">
                <strong>${entry.title}</strong>
                <span class="qual-dates">${entry.dates}</span>
              </div>
              <div class="qual-org">${entry.org}</div>
              ${
                entry.paragraphs?.length
                  ? entry.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")
                  : entry.bullets?.length
                    ? `<ul class="qual-bullets">${entry.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>`
                    : `<p>${entry.body}</p>`
              }
              ${entry.skills ? `<p class="qual-skills">${entry.skills}</p>` : ""}
              ${
                entry.link
                  ? `<a class="qual-link" href="${entry.link.href}" target="_blank" rel="noopener noreferrer">${entry.link.label}</a>`
                  : ""
              }
              ${
                entry.links
                  ? `<div class="project-links">${entry.links
                      .map(
                        (link) =>
                          `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`
                      )
                      .join("")}</div>`
                  : ""
              }
            </article>
          `
            )
            .join("")}
        </section>

        <section class="qual-section">
          <h4>Technical skills (beyond the resume)</h4>
          <p>${technicalSkills.approach}</p>
          <div class="skill-group">
            <span class="skill-group-label">Software</span>
            ${renderSkillTags(technicalSkills.software)}
          </div>
          <div class="skill-group">
            <span class="skill-group-label">Hardware & digital logic</span>
            ${renderSkillTags(technicalSkills.hardware)}
          </div>
          <div class="skill-group">
            <span class="skill-group-label">Graphics & visualization</span>
            ${renderSkillTags(technicalSkills.graphics)}
          </div>
        </section>

        <section class="qual-section">
          <h4>Technical interests in computer engineering</h4>
          <ul class="detail-list">
            ${interests.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </section>
      </div>
    `;
  }

  return "";
}

function resetPopupScroll() {
  popupBodyEl.scrollTop = 0;
  popupBodyEl.scrollLeft = 0;
}

function openPopup(id, label) {
  activePopup = id;
  popupTitleEl.textContent = label;
  popupBodyEl.innerHTML = popupContent(id);
  if (id === "blender" || id === "nasa" || id === "sharetea") {
    initProjectGallery(popupBodyEl.querySelector(".project-showcase"));
  }
  popupCardEl?.classList.toggle("is-about", id === "about");
  popupCardEl?.classList.toggle(
    "is-project-showcase",
    id === "blender" || id === "nasa" || id === "sharetea" || id === "ecen" || id === "aiglasses"
  );
  popupCardEl?.classList.toggle("is-nasa-showcase", id === "nasa");
  popupCardEl?.classList.toggle("is-sharetea-showcase", id === "sharetea");
  popupCardEl?.classList.toggle("is-ecen-showcase", id === "ecen");
  popupCardEl?.classList.toggle("is-aiglasses-showcase", id === "aiglasses");
  popupCardEl?.classList.toggle("is-resume-showcase", id === "resume");
  popupCardEl?.classList.toggle("is-wide", id === "qualifications" || id === "resume");
  popupCardEl?.classList.toggle("is-link", Boolean(LINK_POPUPS[id]));
  popupEl.hidden = false;
  resetPopupScroll();
  requestAnimationFrame(resetPopupScroll);

  dockEl.querySelectorAll(".dock-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.id === id);
  });
}

function closePopup() {
  activePopup = null;
  popupEl.hidden = true;
  popupBodyEl.innerHTML = "";
  resetPopupScroll();
  popupCardEl?.classList.remove(
    "is-about",
    "is-wide",
    "is-link",
    "is-project-showcase",
    "is-nasa-showcase",
    "is-sharetea-showcase",
    "is-ecen-showcase",
    "is-aiglasses-showcase",
    "is-resume-showcase"
  );
  dockEl.querySelectorAll(".dock-btn").forEach((btn) => {
    btn.classList.remove("is-active");
  });
}

function refreshOpenPopup() {
  if (!activePopup) return;
  const item = DOCK_ITEMS.find((entry) => entry.id === activePopup);
  if (!item) return;
  openPopup(activePopup, item.label);
}

function buildDock() {
  dockEl.innerHTML = DOCK_ITEMS.map(
    (item) => `
      <button
        class="dock-btn"
        type="button"
        data-id="${item.id}"
        data-type="${item.type}"
        aria-label="${item.label}"
        title="${item.label}"
      >
        ${getDockIconMarkup(item.id)}
      </button>
    `
  ).join("");
}

dockEl.addEventListener("click", (event) => {
  const button = event.target.closest(".dock-btn");
  if (!button) return;

  const { id } = button.dataset;

  if (activePopup === id) {
    closePopup();
    return;
  }

  const item = DOCK_ITEMS.find((entry) => entry.id === id);
  openPopup(id, item?.label || "Details");
});

popupCloseEl.addEventListener("click", closePopup);
popupEl.addEventListener("click", (event) => {
  if (event.target === popupEl) closePopup();
});

buildDock();

if (window.parent !== window) {
  window.parent.postMessage({ type: "monitor-ready" }, "*");
}
