// Editable content for the Projects showcase and YouTube preview.
// To add a project, push an object to PROJECTS.
// To feature a video, add its YouTube video ID (the part after watch?v=) to FEATURED_VIDEOS.

window.PROJECTS = [
  {
    title: "Portfolio (this site)",
    description: "Personal portfolio with a riddle lock screen, blog, and project showcase. Static frontend + optional Flask backend.",
    tags: ["HTML", "CSS", "JavaScript", "Flask"],
    live: "https://mohitgitgeek.github.io/portfolio-personal/",
    code: "https://github.com/mohitgitgeek/portfolio-personal"
  },
  {
    title: "Add your next project",
    description: "Edit content.js and add a new entry to the PROJECTS array — set title, description, tags, and the live + code URLs.",
    tags: ["template"],
    live: "",
    code: "https://github.com/mohitgitgeek"
  }
];

window.YOUTUBE = {
  channelName: "Mohit The Tech Geek",
  channelUrl: "https://www.youtube.com/@MohitTheTechGeek",
  handle: "@MohitTheTechGeek",
  // Add YouTube video IDs to embed featured videos, e.g. ["dQw4w9WgXcQ", "..."].
  // Leave empty to show only the channel card.
  featuredVideos: []
};
