# Personel-blog

  ## Table of Content
  - [Overview](#Overview)
  - [Installation](#Installation)
  - [Contributing](#Contributing)
  - [License](#License)
  - [Project_Details](#ProjectDetails)

## Overview
- This project include TypeScript language and asynchronous working examples. The purpose is to practise and create a back-end example.
- The front-end designs for this project have not been well developed.

## Installation
1. Make sure you have Node.js installed. (To download Node.js: [Node.js Official Site](https://nodejs.org))
2. Git (VCS) operations
    ```
    git clone https://github.com/faikmermer/Personel-blog.git

4. Install the dependencies - Devdependencies and ts.config:
   ```bash
   npm init -y
   npm install typescript ts-node @types-node --save--dev
   npm install body-parser cookies-parser
   npx tsc --init
   ```
5. Compilier and Run
   * Debugger
   ```
   npx tsc
   node --inspect-brk dist/app.ts
   go to -> edge browser (edge://inspect) and click on remote targer. Dont forget to add breakpoint app func.
   ```
   * Run without Debug
   ```
   npx ts-node app.ts
  
   ```


## Contributing
Contributions are welcome! To contribute to the project, follow these steps:

1.  Fork the Project
3.  Create your Feature Branch (`git checkout -b feature-name`)
4.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5.  Push to the Branch (`git push origin feature-name`)
6.  Open a Pull Request

## License
Distributed under the Unlicense License.

## Project Details
[Click for Personle Blog ](https://roadmap.sh/projects/personal-blog)
