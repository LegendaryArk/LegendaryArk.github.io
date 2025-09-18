import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { siAirplayvideo, siApple, siGoogleplay } from "simple-icons";

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
  const textRefs = useRef<Map<number, HTMLParagraphElement>>(new Map());

  const toggleExpanded = (projectId: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const checkOverflow = () => {
    const newOverflowing = new Set<number>();
    const newHeights = new Map<
      number,
      { collapsed: number; expanded: number }
    >();

    textRefs.current.forEach((element, projectId) => {
      if (element) {
        // Get expanded height first
        element.style.webkitLineClamp = "unset";
        element.style.display = "-webkit-box";
        const expandedHeight = element.scrollHeight;

        // Get collapsed height
        element.style.webkitLineClamp = "3";
        const collapsedHeight = element.clientHeight;

        // Store heights
        newHeights.set(projectId, {
          collapsed: collapsedHeight,
          expanded: expandedHeight,
        });

        // Check if overflowing (only add to newOverflowing if actually overflowing)
        if (expandedHeight > collapsedHeight) {
          newOverflowing.add(projectId);
        }

        // Reset to current state
        if (expandedProjects.has(projectId)) {
          element.style.webkitLineClamp = "unset";
        }
      }
    });

    setProjectHeights(newHeights);
    setOverflowingProjects(newOverflowing);
  };

  useEffect(() => {
    // Check overflow after component mounts and when window resizes
    const handleResize = () => {
      setTimeout(checkOverflow, 100); // Small delay to ensure layout is complete
    };

    checkOverflow();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setTextRef =
    (projectId: number) => (el: HTMLParagraphElement | null) => {
      if (el) {
        textRefs.current.set(projectId, el);
        // Check overflow after ref is set
        setTimeout(checkOverflow, 100);
      }
    };
  const projects = [
    {
      id: 1,
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
      id: 2,
      title: "ArkLib",
      description:
        "A C++ library made for VEX Robotics teams to streamline robot programming using OOP. Includes modules for motion algorithms, odometry, and control systems.",
      tech: ["C++", "OOP", "PID", "Motion Algorithms", "Git"],
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
      id: 3,
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
      id: 4,
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
                      height: expandedProjects.has(project.id)
                        ? `${
                            projectHeights.get(project.id)?.expanded || "auto"
                          }px`
                        : `${
                            projectHeights.get(project.id)?.collapsed || "auto"
                          }px`,
                    }}
                  >
                    <p
                      ref={setTextRef(project.id)}
                      className="text-muted-foreground text-sm md:text-base leading-relaxed -webkit-box"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: expandedProjects.has(project.id)
                          ? "unset"
                          : 3,
                        overflow: "hidden",
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
