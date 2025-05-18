import type { GetImageResult } from "astro";
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

export const ProjectsIsland = ({ projects }:
  {
    projects: {
      key: string;
      label: string;
      image: GetImageResult;
      link: string;
      description: string;
    }[]
  }) => {
  return (
    <Tabs
      orientation="vertical"
      defaultValue={projects[0].key}
      className="relative grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_1.618fr] border-x border-input"
    >
      <div className="absolute inset-0 pointer-events-none text-surface-8 hidden md:block"><svg className="absolute -left-[6.5px] -bottom-[6.5px]" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" vector-effect="non-scaling-stroke"><path d="M6 0V12M0 6H12" stroke="currentColor"></path></svg><svg className="absolute -right-[6.5px] -bottom-[6.5px]" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" vector-effect="non-scaling-stroke"><path d="M6 0V12M0 6H12" stroke="currentColor"></path></svg></div>
      
      <TabsList className="flex flex-col w-full bg-transparent p-0">
        {projects.map((project) => (
          <TabsTrigger asChild key={project.key} value={project.key} >
            <Button variant="ghost" size="lg" className="font-inter text-sm lg:text-md justify-start px-8 sm:px-8 lg:px-10 w-full rounded-none cursor-pointer py-2 sm:py-3 border-b border-t-0 border-x-0 border-input">
              {project.label}
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>

      {projects.map((project) => (
        <TabsContent key={project.key} value={project.key} className="md:border-l border-input">
          <img src={project.image.src} width={project.image.options.width} height={project.image.options.height} className="border-b border-input" />
          <div className="py-3 px-4">
            <span className="font-inter text-sm">{project.description}</span>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}