# ZyrixCraft - Digital Agency Portfolio

A sleek, single-scroll project showcase website built with TypeScript, Tailwind CSS, and React (Vite). Features a dynamic, animated split-screen layout inspired by high-end design studios.

## 🚀 Live Demo

Visit the live site: [ZyrixCraft Portfolio](https://your-domain.com)

## ✨ Features

- **Split Screen Design**: Dynamic left/right layout with dark branding side and project display
- **Scroll-Based Animations**: Smooth project transitions using Framer Motion
- **Floating Project Cards**: Interactive cards positioned at the screen intersection
- **Glass Morphism UI**: Modern glass effects and backdrop blur
- **Responsive Design**: Optimized for all device sizes
- **Contact Modal**: Beautiful contact form with multiple contact options
- **Performance Optimized**: Built with Vite for fast loading

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Fonts**: Outfit (display) + Inter (body)

## 📁 Project Structure

```
src/
├── components/
│   ├── SplitLayout.tsx         # Main split-screen layout
│   ├── ProjectCard.tsx         # Floating center project card
│   ├── ProjectsScroller.tsx    # Scroll management & card sync
│   ├── Navbar.tsx              # Navigation with hamburger menu
│   └── LetsTalkModal.tsx       # Contact modal component
├── data/
│   └── projects.ts             # Project data and types
├── App.tsx                     # Main app component
├── index.css                   # Global styles & Tailwind
└── main.tsx                    # App entry point
```

## 🎨 Design Features

### Split Screen Layout
- **Left Half**: Dark (#000000) with ZyrixCraft branding, tagline, and CTA
- **Right Half**: Dynamic project screenshots that change on scroll
- **Center**: Floating project cards with glass morphism effects

### Animations
- Scroll-triggered project transitions
- Smooth card sliding animations
- Hover effects and micro-interactions
- Loading animations with staggered delays

### Interactive Elements
- Hamburger navigation menu
- Contact modal with form validation
- Project cards with external links
- Scroll progress indicator

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/zyrixcraft-showcase.git
   cd zyrixcraft-showcase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📝 Customization

### Adding New Projects

Edit `src/data/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 7,
    title: "Your Project Name",
    description: "Project description",
    image: "https://your-image-url.com",
    liveUrl: "https://your-live-site.com",
    techStack: ["React", "TypeScript", "Tailwind"],
    category: "Web Development"
  },
  // ... other projects
];
```

### Updating Branding

1. **Company Name**: Update in `src/components/Navbar.tsx` and `src/components/SplitLayout.tsx`
2. **Colors**: Modify `tailwind.config.js` color palette
3. **Fonts**: Change font imports in `src/index.css`
4. **Contact Info**: Update `src/components/LetsTalkModal.tsx`

### Styling Customization

The project uses Tailwind CSS with custom utilities:

```css
/* Custom classes in src/index.css */
.glass-morph     /* Glass morphism effect */
.text-gradient   /* Gradient text */
.hover-glow      /* Hover glow effect */
```

## 🎯 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: ~330KB (gzipped: ~105KB)
- **First Paint**: <1s
- **Interactive**: <2s

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from Awwwards and high-end agency websites
- Framer Motion for smooth animations
- Tailwind CSS for rapid styling
- Unsplash for placeholder images

## 📞 Contact

**ZyrixCraft Digital Agency**
- Website: [zyrixcraft.com](https://zyrixcraft.com)
- Email: hello@zyrixcraft.com
- Phone: +1 (555) 123-4567

---

Built with ❤️ by ZyrixCraft
