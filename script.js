document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);

      if (!target) return;

      e.preventDefault();

      history.pushState(null, "", `#${targetId}`);
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    {
      threshold: 0.4,
      rootMargin: "-20% 0px -55% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));
});