"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProjectsMain() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async (tech = "Recent") => {
    try {
      const response = await fetch("/projects.json");
      if (response.ok) {
        const data = await response.json();

        if (tech === "Recent") {
          const sortedProjects = data.sort((a, b) => b.id - a.id).slice(0, 3);
          setProjects(sortedProjects);
        } else {
          const filteredProjects = data.filter((project) =>
            project.techStack.includes(tech)
          );
          setProjects(filteredProjects);
        }
      } else {
        console.error("Failed to load projects.");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="px-0 md:px-5 lg:px-8 mt-2 md:mt-6 lg:mt-10 animate-fadeInUp">
      {/* Projects Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 animate-fadeInLeft">
        {projects.map((project) => (
          <div key={project.id} className="p-1 rounded-md cursor-pointer">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <Image
                className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                src={project.image}
                alt={project.title}
                width={800}
                height={450}
                loading="lazy"
              />
            </div>

            <div className="p-3">
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-sm mt-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
