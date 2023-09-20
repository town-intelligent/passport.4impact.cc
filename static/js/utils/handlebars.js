export const renderHandlebars = (containerId, templateId, data) => {
  const html = document.getElementById(templateId).innerHTML;
  const template = Handlebars.compile(html);
  document.getElementById(containerId).innerHTML = template(data);
};
