export const createPageUrl = (page) => {
  return page === 'Home' ? '/' : `/${page}`;
};
