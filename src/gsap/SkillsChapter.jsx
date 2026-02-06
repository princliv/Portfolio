import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Terminal, Database, Users, Languages, PenTool } from 'lucide-react';
import './SkillsChapter.css';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
    {
        id: 1,
        category: "Engineering",
        icon: <Terminal size={32} />,
        items: ["C", "Python", "Java"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
        gradient: "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)",
        accent: "#38bdf8"
    },
    {
        id: 2,
        category: "Frontend & Web",
        icon: <Code2 size={32} />,
        items: ["HTML", "CSS", "Tailwind CSS", "React.js", "Node.js"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        gradient: "linear-gradient(135deg, rgba(51, 65, 85, 0.9) 0%, rgba(30, 41, 59, 0.95) 100%)",
        accent: "#818cf8"
    },
    {
        id: 3,
        category: "Design",
        icon: <Palette size={32} />,
        items: ["UI/UX Design", "Prototyping", "Wireframing"],
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        gradient: "linear-gradient(135deg, rgba(71, 85, 105, 0.9) 0%, rgba(51, 65, 85, 0.95) 100%)",
        accent: "#c084fc"
    },
    {
        id: 4,
        category: "Tools & Platforms",
        icon: <PenTool size={32} />,
        items: ["Figma", "Adobe XD", "Canva", "Git", "GitHub", "Firebase"],
        image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop",
        gradient: "linear-gradient(135deg, rgba(30, 30, 46, 0.9) 0%, rgba(17, 17, 27, 0.95) 100%)",
        accent: "#f472b6"
    },
    {
        id: 5,
        category: "Databases",
        icon: <Database size={32} />,
        items: ["MySQL", "SQLite", "Prisma ORM"],
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop",
        gradient: "linear-gradient(135deg, rgba(24, 24, 27, 0.9) 0%, rgba(9, 9, 11, 0.95) 100%)",
        accent: "#34d399"
    },
    {
        id: 6,
        category: "Soft Skills",
        icon: <Users size={32} />,
        items: ["Communication", "Team Collaboration", "Adaptability", "Problem Solving"],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
        gradient: "linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(17, 24, 39, 0.95) 100%)",
        accent: "#fbbf24"
    },
    {
        id: 7,
        category: "Languages",
        icon: <Languages size={32} />,
        items: ["English", "Hindi"],
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1000&auto=format&fit=crop",
        gradient: "linear-gradient(135deg, rgba(23, 23, 23, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)",
        accent: "#e879f9"
    }
];

const SkillsChapter = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "+=4000", // Long scroll distance for 7 items
                pin: true,
                scrub: true,
                onUpdate: (self) => {
                    // Map scroll progress (0-1) to card index (0-6)
                    const index = Math.round(self.progress * (skillsData.length - 1));
                    setActiveIndex(index);
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="skills-section" ref={containerRef}>
            <div className="skills-container container">

                {/* LEFT: 3D Card Stack (Portrait) */}
                <div className="skills-visuals">
                    <div className="cards-stack">
                        {skillsData.map((skill, index) => {
                            const offset = index - activeIndex;
                            const isActive = index === activeIndex;
                            const isVisible = Math.abs(offset) <= 2; // Only animate nearby cards

                            return (
                                <motion.div
                                    key={skill.id}
                                    className={`skill-card ${isActive ? 'active' : ''}`}
                                    initial={false}
                                    animate={{
                                        // 3D "Coverflow" / Cube Face Effect
                                        x: offset === 0 ? "0%" : offset * 60 + "%",
                                        rotateY: offset === 0 ? 0 : offset > 0 ? -45 : 45, // Angle towards center
                                        z: offset === 0 ? 0 : -300,
                                        scale: offset === 0 ? 1 : 0.85,
                                        opacity: Math.abs(offset) > 1.5 ? 0 : 1,
                                        zIndex: 100 - Math.abs(offset)
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 150,
                                        damping: 20,
                                        mass: 1.2
                                    }}
                                    style={{
                                        // We use the gradient as an overlay now
                                        border: `1px solid ${isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'}`
                                    }}
                                >
                                    {/* Background Image */}
                                    <div className="card-bg-wrapper">
                                        <img src={skill.image} alt={skill.category} className="card-bg-image" />
                                        <div className="card-bg-overlay" style={{ background: skill.gradient }} />
                                    </div>

                                    <div className="card-inner-content">
                                        <div className="card-icon" style={{ color: skill.accent }}>
                                            {skill.icon}
                                        </div>
                                        <h3 className="card-category">{skill.category}</h3>
                                    </div>

                                    <div className="card-lines">
                                        <div className="line l1" />
                                        <div className="line l2" />
                                        <div className="line l3" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT: Dynamic Content */}
                <div className="skills-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            className="skill-details"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span
                                className="detail-category"
                                style={{ color: skillsData[activeIndex].accent }}
                            >
                                0{skillsData[activeIndex].id} — {skillsData[activeIndex].category}
                            </span>

                            <h2 className="detail-title">
                                Capabilities & <br />
                                <span style={{ color: '#fff' }}>Expertise</span>
                            </h2>

                            <div className="detail-list">
                                {skillsData[activeIndex].items.map((item, idx) => (
                                    <motion.div
                                        key={item}
                                        className="detail-item"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer / Transition */}
            <div className="skills-footer">
                <div className="footer-line" />
                <p className="footer-text">Want to see these skills applied in real projects?</p>
            </div>
        </section>
    );
};

export default SkillsChapter;
