export async function loadTemplate(path) {
    const res = await fetch(path);
    if (!res.ok) {
      throw new Error(`Failed to load template from ${path}`);
    }
    const template = await res.text();
    return template;
}
  
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    //if there is a callback...call it and pass data
    if (callback) {
      callback(data);
    }
}
  
export async function loadHeaderFooter() {
    try {
      const pathParts = window.location.pathname.split('/');
      const basePath = pathParts.includes('country-list') ? '../public/' : './public/';
      
      const headerTemplate = await loadTemplate(basePath + "header.html");
      const headerElement = document.querySelector("#main-header");
      const footerTemplate = await loadTemplate(basePath + "footer.html");
      const footerElement = document.querySelector("#main-footer");
  
      renderWithTemplate(headerTemplate, headerElement);
      renderWithTemplate(footerTemplate, footerElement);
    } catch (error) {
      console.error('Error loading header or footer:', error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter();
  });

  