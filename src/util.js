export function getViewportType() {
  const viewportWidth = window.innerWidth;

  if (viewportWidth < 600) {
    return "XS"; // Extra Small
  } else if (viewportWidth >= 600 && viewportWidth < 768) {
    return "S"; // Small
  } else if (viewportWidth >= 768 && viewportWidth < 992) {
    return "M"; // Medium
  } else if (viewportWidth >= 992 && viewportWidth < 1200) {
    return "L"; // Large
  } else {
    return "XL"; // Extra Large
  }
}
