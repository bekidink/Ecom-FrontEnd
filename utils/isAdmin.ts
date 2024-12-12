const isAdmin = (s:any) => {
  if (s === "ADMIN") {
    return true;
  }

  return false;
};

export default isAdmin;
