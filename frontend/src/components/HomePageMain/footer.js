const Footer = () => {
  const footer_apps = [
    "Software:",
    "Javascript",
    "React",
    "Redux",
    "ExpressJS",
  ];

  return (
    <div className="SplashPage-Footer">
      <div className="SplashPage-Top">
        {footer_apps.map((app) => {
          return (
            <div className="SplashPage-Footer-Text" key={app}>
              {app}
            </div>
          );
        })}
        <a
          href="https://github.com/jeffliu007"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/jeffreyliu17/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a
          href="https://jeffliu007.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-solid fa-eye"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
