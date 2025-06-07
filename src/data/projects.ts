export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  techStack: string[];
  category: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Garment - Modern Fashion Store",
    description: "Contemporary fashion e-commerce platform with sleek design and seamless shopping experience",
    image: "/assets/images/1.png",
    liveUrl: "https://garment-one.vercel.app/",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    category: "E-Commerce"
  },
  {
    id: 2,
    title: "Sofia Dembitska - Photography Portfolio",
    description: "Elegant photography portfolio showcasing artistic vision and professional work",
    image: "/assets/images/2.png",
    liveUrl: "https://photography-portfolio-drab.vercel.app/",
    techStack: ["React", "Framer Motion", "CSS Grid", "Lightbox"],
    category: "Portfolio"
  },
  {
    id: 3,
    title: "Tutor Pro - Expert Tutoring Services",
    description: "Professional tutoring platform connecting students with expert educators",
    image: "/assets/images/3.png",
    liveUrl: "https://tutor-portfolio-diff.vercel.app/",
    techStack: ["React", "Node.js", "MongoDB", "Payment Gateway"],
    category: "Education"
  },
  {
    id: 4,
    title: "Purrea - Premium Natural & Organic Skincare",
    description: "Luxury skincare brand website featuring natural and organic beauty products",
    image: "/assets/images/4.png",
    liveUrl: "https://pureea.vercel.app/",
    techStack: ["Vue.js", "Nuxt", "Shopify", "SCSS"],
    category: "Beauty & Wellness"
  },
  {
    id: 5,
    title: "Clickify - Professional Photography Services",
    description: "Modern photography services website with booking system and portfolio showcase",
    image: "/assets/images/5.png",
    liveUrl: "https://clickify1-demo.vercel.app/",
    techStack: ["React", "TypeScript", "Calendar API", "Image Optimization"],
    category: "Photography"
  },
  {
    id: 6,
    title: "Aryan Mehta - Photography Portfolio",
    description: "Creative photography portfolio highlighting artistic photography and visual storytelling",
    image: "/assets/images/6.png",
    liveUrl: "https://photography-portfolio2.vercel.app/",
    techStack: ["Next.js", "Framer Motion", "Masonry Layout", "WebP"],
    category: "Portfolio"
  }
]; 