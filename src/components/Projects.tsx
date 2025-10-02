import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { siAirplayvideo, siApple, siGoogleplay, siYoutube } from "simple-icons";

const Projects = () => {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(
    new Set()
  );
  const [overflowingProjects, setOverflowingProjects] = useState<Set<number>>(
    new Set()
  );
  const [projectHeights, setProjectHeights] = useState<
    Map<number, { collapsed: number; expanded: number }>
  >(new Map());
  const [collapsingProjects, setCollapsingProjects] = useState<Set<number>>(new Set());
  const textRefs = useRef<Map<number, HTMLParagraphElement>>(new Map());

  const toggleExpanded = (projectId: number) => {
    const isExpanded = expandedProjects.has(projectId);
    if (isExpanded) {
      // Start collapse animation: keep content expanded until transition end
      setCollapsingProjects((prev) => new Set(prev).add(projectId));
    } else {
      // Expand immediately
      const newExpanded = new Set(expandedProjects);
      newExpanded.add(projectId);
      setExpandedProjects(newExpanded);
    }
  };

  const checkOverflow = () => {
    const newOverflowing = new Set<number>();
    const newHeights = new Map<
      number,
      { collapsed: number; expanded: number }
    >();

    textRefs.current.forEach((element, projectId) => {
      if (element) {
        // Measure collapsed height (clamped to 3 lines)
        element.style.display = "-webkit-box";
        (element.style as any).WebkitBoxOrient = "vertical";
        (element.style as any).WebkitLineClamp = "3";
        element.style.overflow = "hidden";
        void element.offsetHeight; // Force reflow
        const collapsedHeight = element.clientHeight;

        // Measure expanded height (no clamp)
        element.style.display = "block";
        (element.style as any).WebkitLineClamp = "";
        element.style.overflow = "visible";
        void element.offsetHeight; // Force reflow
        const expandedHeight = element.scrollHeight;

        // Store heights
        newHeights.set(projectId, {
          collapsed: collapsedHeight,
          expanded: expandedHeight,
        });

        // Check if overflowing
        if (expandedHeight > collapsedHeight + 1) {
          // +1 for rounding errors
          newOverflowing.add(projectId);
        }

        // Reset to current state
        if (expandedProjects.has(projectId)) {
          element.style.display = "block";
          (element.style as any).WebkitLineClamp = "";
          element.style.overflow = "visible";
        } else {
          element.style.display = "-webkit-box";
          (element.style as any).WebkitBoxOrient = "vertical";
          (element.style as any).WebkitLineClamp = "3";
          element.style.overflow = "hidden";
        }
      }
    });

    setProjectHeights(newHeights);
    setOverflowingProjects(newOverflowing);
  };

  useEffect(() => {
    // Check overflow after component mounts and when window resizes
    let resizeRaf = 0;
    const handleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        checkOverflow();
      });
    };

    requestAnimationFrame(() => {
      checkOverflow();
    });
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setTextRef =
    (projectId: number) => (el: HTMLParagraphElement | null) => {
      if (el) {
        textRefs.current.set(projectId, el);
        // Check overflow after ref is set on next frame
        requestAnimationFrame(() => {
          checkOverflow();
        });
      }
    };

  const projects = [
    {
      id: 1,
      title: "Autonomous Robot Control System",
      description:
        "A control system for an autonomous robot using ROS2 and C++. Fused LiDAR data and odometry for precise navigation and obstacle avoidance. Then implemented path planning using A* Search Algorithm to navigate complex environments and followed the path using a Pure Pursuit and PID controller.",
      tech: ["ROS2", "C++", "Git", "Odometry", "LiDAR", "PID Control"],
      image: "/ARCS Image.jpg",
      liveUrl: ["https://youtu.be/CKogSlk9C5I"],
      liveIcon: [siYoutube],
      liveText: ["Demo Video"],
      githubUrl: "https://github.com/LegendaryArk/wato_asd_training",
    },
    {
      id: 2,
      title: "Elapse",
      description:
        "A tournament companion app for VEX Robotics teams. Features adaptive match schedules, innovative scouting system, and real-time match notifications.",
      tech: ["Flutter", "Dart", "Firebase", "Android Studio", "Figma", "Git"],
      image: "https://winstonzhao.ca/Scene_6.6c0ecf82.webp",
      liveUrl: [
        "https://apps.apple.com/ca/app/elapse/id6596757269",
        "https://play.google.com/store/apps/details?id=com.elapseapp.elapse_app&hl=en_CA",
      ],
      liveIcon: [siApple, siGoogleplay],
      liveText: ["App Store", "Google Play"],
      githubUrl: "https://github.com/elapse-app/elapse",
    },
    {
      id: 3,
      title: "ArkLib",
      description:
        "A C++ library made for VEX Robotics teams to streamline robot programming using OOP. Includes modules for motion algorithms, odometry, and control systems.",
      tech: ["C++", "OOP", "PID Control", "Motion Algorithms", "Git"],
      image:
        "https://res.cloudinary.com/djqjwhwmv/image/upload/v1757125844/bot_wevwkj.png",
      liveUrl: [
        "https://drive.google.com/file/d/1mfyGScDE8__J_DV0KpJ_83Ot8QmMe9vo/view?usp=drivesdk",
      ],
      liveIcon: [siAirplayvideo],
      liveText: ["Demo Video"],
      githubUrl: "https://github.com/16868C/VRC2425-HighStakes",
    },
    {
      id: 4,
      title: "Mentorful",
      description:
        "A mobile app designed to assist in rehabilitation and reducing recidivism through personalized reminders and scoring systems. Developed in a team of four using Flutter and FastAPI at Hack404.",
      tech: ["Flutter", "FastAPI", "Dart", "Python", "Google Calendar API"],
      image:
        "https://res.cloudinary.com/djqjwhwmv/image/upload/v1757134758/Screenshot_2025-09-06_005854_blvmmn.png",
      liveUrl: [],
      liveIcon: [],
      liveText: [],
      githubUrl: "https://github.com/LegendaryArk/Mentorful",
    },
    {
      id: 5,
      title: "Boggle",
      description:
        "A digital version of the classic Boggle word game with an AI opponent. Led a team of four in designing and implementing the game using Java and JavaFX.",
      tech: ["Java", "Git", "Figma", "Graph Theory", "Data Structures"],
      image:
        "https://res.cloudinary.com/djqjwhwmv/image/upload/v1757136317/Screenshot_2025-09-06_012452_ankp57.png",
      liveUrl: [],
      liveIcon: [],
      liveText: [],
      githubUrl: "https://github.com/LegendaryArk/Boggle",
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden bg-gradient-card border-border hover:shadow-card transition-all duration-500 hover:-translate-y-2"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <div className="mb-4">
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      height: collapsingProjects.has(project.id)
                        ? `${projectHeights.get(project.id)?.collapsed || "auto"}px`
                        : expandedProjects.has(project.id)
                        ? `${projectHeights.get(project.id)?.expanded || "auto"}px`
                        : `${projectHeights.get(project.id)?.collapsed || "auto"}px`,
                    }}
                    onTransitionEnd={(e) => {
                      if (e.propertyName === "height") {
                        if (collapsingProjects.has(project.id)) {
                          // Now clamp and mark as collapsed
                          setExpandedProjects((prev) => {
                            const next = new Set(prev);
                            next.delete(project.id);
                            return next;
                          });
                          setCollapsingProjects((prev) => {
                            const next = new Set(prev);
                            next.delete(project.id);
                            return next;
                          });
                        }
                      }
                    }}
                  >
                    <p
                      ref={setTextRef(project.id)}
                      className="text-muted-foreground text-sm md:text-base leading-relaxed -webkit-box"
                      style={{
                        display:
                          expandedProjects.has(project.id) || collapsingProjects.has(project.id)
                            ? "block"
                            : "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp:
                          expandedProjects.has(project.id) || collapsingProjects.has(project.id)
                            ? ""
                            : 3,
                        overflow:
                          expandedProjects.has(project.id) || collapsingProjects.has(project.id)
                            ? "visible"
                            : "hidden",
                      }}
                    >
                      {project.description}
                    </p>
                  </div>
                  {(overflowingProjects.has(project.id) ||
                    expandedProjects.has(project.id)) && (
                    <button
                      onClick={() => toggleExpanded(project.id)}
                      className="text-primary hover:text-primary/80 text-sm mt-2 flex items-center gap-1 transition-colors"
                    >
                      {expandedProjects.has(project.id) ? (
                        <>
                          Show less{" "}
                          <ChevronUp className="w-4 h-4 transition-transform duration-200" />
                        </>
                      ) : (
                        <>
                          Show more{" "}
                          <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.liveUrl.length == 0
                    ? null
                    : project.liveUrl.map((url, index) => {
                        const LiveIcon = project.liveIcon[index];
                        return (
                          <Button key={url} variant="default" size="sm" asChild>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              {LiveIcon && (
                                <svg
                                  className="w-4 h-4 mr-2"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                >
                                  <title>{LiveIcon.title}</title>
                                  <path d={LiveIcon.path} />
                                </svg>
                              )}
                              {project.liveText[index]}
                            </a>
                          </Button>
                        );
                      })}
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
