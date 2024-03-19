# Project Title

This project contains E2E tests for the login and profile page using Selenium WebDriver and Mocha as the test framework

## Getting Started

Follow these instructions to get project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have Node.js installed on your system. This project requires Node.js version 12.x or higher and npm (Node Package Manager) version 6.x or higher.

You can check your current version of Node.js and npm by running the following commands in your terminal:

```bash
node --version

npm --version
```

## Installing

### Clone the project repository
```bash
git clone https://github.com/yourusername/yourprojectname.git

cd yourprojectname
```

### Switch to the project's working branch

```bash
git checkout <your-branch-name>
```

### Install the project dependencies:
Using npm, install the project's dependencies, including the development dependencies necessary for testing.

```bash
npm install
```

This command installs all dependencies listed in your package.json file, including:


+ Testing libraries: Mocha, Chai, and their respective type definitions for TypeScript support.
+ Selenium WebDriver: For browser automation and interaction in tests.
+ TypeScript: The project's programming language, along with ts-node for executing TypeScript files directly.
+ WebDriver Manager: A helper tool to easily manage drivers for browsers.

## Running the Tests
This project uses Mocha as the test framework. To run your automated tests, execute the following command

```bash
npm test
```

This command is typically set up to transpile TypeScript test files and run tests with Mocha. Ensure your package.json's scripts section includes a test script configured for your testing setup.

