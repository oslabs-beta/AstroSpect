# AstroSpect

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<div align="center">
<!-- astroSpeed is a performance monitor for your AstroJS & Next.js codebase. -->
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/oslabs-beta/AstroSpect">
    <img src="https://i.ibb.co/Z8x7YGP/IMG-1412-3.png" alt="Logo" width="400" height="400">
  </a>

  <h2 align="center">
    A Dev Tool Extension For Astro Island Architecture
    <br />
    <a href="https://astro-spect-mhv1d8zly-astrospect.vercel.app/"><strong>Explore AstroSpect »</strong></a>
    <br />
    <br />
    <a href="http://www.astrospeed.io/watchdemo">View Demo</a>
    ·
    <a href="https://github.com/oslabs-beta/astrospeed/issues">Report Bug</a>
    ·
    <a href="https://github.com/oslabs-beta/astrospeed/issues">Request Feature</a>
  </h2>
</div>
<br></br>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]
[![Issues][issues-shield]][issues-url]
![LinkedIn][linkedin-shield]
![Website][website-shield]

<!-- [linkedin-url] -->

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#summary">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#prerequisites">Installation</a></li>
      </ul>
    </li>
    <li><a href="#about">About</a></li>
        <ul>
        <li><a href="#google-lighthouse">Google Lighthouse</a></li>
        <li><a href="#git-post-commit-hook-details">Git post-hook Details</a></li>
      </ul>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing & Contacts</a></li>
    <li><a href="#contributing">Acknowledgments & License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
<br />

## Summary

astroSpeed is a data collection and reporting suite that uses the Google Lighthouse SDK to automatically collect application metrics such as Performance and SEO in the background during the development process, after each commit.

  <a href="https://i.ibb.co/JRFktyR/Screen-Shot-2022-10-13-at-11-53-58-AM.png">
    <img src="https://i.ibb.co/JRFktyR/Screen-Shot-2022-10-13-at-11-53-58-AM.png" alt="sample" width="" height="100">
  </a>

### Built With

- [![Astro][astro-shield]][astro-url]
- [![React][react.js]][react-url]
- [![Google LightHouse][glh-shield]][glh-url]
- [![TypeScript][typescript-shield]][typescript-url]
- [![Tailwind][tailwind-shield]][tailwind-url]

<!-- GETTING STARTED -->

## Getting Started

astroSpeed is available in Node Package Manager and Github. The following steps detail installation from NPM.

### Prerequisites

- Node.js - 14.18.0 or higher.
- Astro - 1.2.0 or higher.
- Git

### Installation & Usage

·
watch the <a href="https://github.com/oslabs-beta/astrospeed/watchdemo">install demo here</a> -or- follow instructions below...

1. Start or open an Astro project.
2. Install astroSpeed into the project as a dev dependency.
   ```sh
   npm install astrospeed --save-dev
   ```
3. Optional - create astrospeed.config.json in your project's root directory if you want to manually configure astroSpeed. Add 1 or more of the below configurables to the config file, below values indicate the default.
   ```json
   {
     "endpoints": ["/"],
     "port": 3000,
     "buildCommand": "npm run build",
     "outputDir": "dist",
     "useVite": 1
   }
   ```
4. Commit new changes to your project's git repository. The post-commit Git hook will automatically start the astroSpeed report generation.
   ```sh
   git commit -a -m "your commit message here"
   ```
5. The path to the newly generated astroSpeed report is written to stdout in your terminal (by default under the "astrospeed" folder in your project's root directory).
   ```sh
   git commit -a -m "your commit message here"
   [main 5958617] your commit message here
   1 files changed, 3 insertions(+), 2 deletions(-)
   Astrospeed report in progress...
   Astrospeed report available at <project-directory>/astrospeed/index.html
   ```
6. You've launched! Open the report in a web browser to review the latest Google Lighthouse findings and compare them to previous commits.

7. Each commit will regenerate the astroSpeed report, appending the latest Google Lighthouse scores to the report.

## About

### Google Lighthouse

Google Lighthouse is an open-source tool developed by Google for understanding the performance, quality, and correctness of your web apps ([see Google Lighthouse on Github](https://github.com/GoogleChrome/lighthouse)). astroSpeed uses Google Lighthouse metrics for Performance, Search Engine Optimization, Best Practices, and Accessibility diagnostics.

### Git post-commit hook details

astroSpeed is configured to create a report after every commit using a git hook. astroSpeed's installation script attempts to add a post-commit hook. The installation script will notify you via the terminal if the attempt was successful or not. If successful, the the following line will be added to the file ./.git/hooks/post-commit.

```sh
npx astrospeed-snap
```

npx astrospeed-snap can also be used to generate a new report manually whenever you want. If you would would like to remove the post-commit hook, please don't uninstall astroSpeed. Simply remove the hook by using

```sh
npx astrospeed-hookuninstall
```

If you change your mind later and wish to reinstate the post-commit hook, you can add it back using

```sh
npx astrospeed-hookinstall
```

If you unfortunately decided to stop using astroSpeed, please uninstall the hook BEFORE uninstalling astroSpeed. Failure to do so will result in error messages after every commit about not being able to find astroSpeed. Your commits should still be successful, however. This unfortunate behavior is due to Node Package Manager removing the ability to create post uninstall scripts.

## Roadmap

- [ ] Upload report to astroSpeed.io and receive a shareable link.
- [ ] Add Deep-dive performance metrics.
- [ ] Create user authentication on astroSpeed.io.

See the [open issues](https://github.com/oslabs-beta/astrospeed/issues) for a full list of proposed features (and known issues).

## Contributing

Contributions are welcome! For feature requests, please create a new issue with the "enhancement" tag.

To contribute:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`). Be sure to Lint your code!
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request to [https://github.com/oslabs-beta/astrospeed/](https://github.com/oslabs-beta/astrospeed/).

Join astroSpeed contributors on [LinkedIn](https://linkedin.com/in/astrospeed).

## Acknowledgments & License

- [OpenSource Labs](https://opensourcelabs.io/)
- [Astro Community](https://discord.com/invite/grF4GTXXYm)
- [You, our users <3](http://www.astrospeed.io)

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/oslabs-beta/AstroSpect?color=navy&label=Contributors
[contributors-url]: https://github.com/oslabs-beta/AstroSpect/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/oslabs-beta/AstroSpect?color=gold&label=Forks
[forks-url]: https://github.com/oslabs-beta/AstroSpect/forks
[stars-shield]: https://img.shields.io/github/stars/oslabs-beta/AstroSpect?color=%234B0082&label=Stars
[stars-url]: https://github.com/oslabs-beta/AstroSpect/stargazers
[issues-shield]: https://img.shields.io/github/issues/oslabs-beta/AstroSpect?color=%23483D8B&label=Issues
[issues-url]: https://github.com/oslabs-beta/AstroSpect/issues
[license-shield]: https://img.shields.io/github/license/oslabs-beta/AstroSpect?color=%09%23FF8C00&label=License
[license-url]: https://github.com/oslabs-beta/AstroSpect/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-red

<!-- [linkedin-url]: -->

[website-shield]: https://img.shields.io/badge/-Website-%23191970
[product-screenshot]: https://i.ibb.co/pz6nzrz/Screen-Shot-2022-10-12-at-3-20-46-PM.png
[astro-url]: https://astro.build/
[astro-shield]: https://i.ibb.co/F8HcbtD/Screen-Shot-2022-10-12-at-12-34-42-PM.png
[react.js]: https://i.ibb.co/MBLkXB6/Screen-Shot-2022-10-12-at-12-21-22-PM.png
[react-url]: https://reactjs.org/
[glh-shield]: https://i.ibb.co/LRZ9mgh/Screen-Shot-2022-10-12-at-12-23-35-PM.png
[glh-url]: https://developers.google.com/web
[typescript-shield]: https://i.ibb.co/7tT9vy1/Screen-Shot-2022-10-12-at-12-25-59-PM.png
[typescript-url]: https://www.typescriptlang.org
[tailwind-url]: https://tailwindcss.com
[tailwind-shield]: https://i.ibb.co/H7M7D3b/Screen-Shot-2022-10-12-at-12-32-22-PM.png
