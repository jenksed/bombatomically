#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');  // Declare exec here


program
  .command('init <name>')
  .description('Initialize a new Atomic Design based React project')
  .option('--state <type>', 'Choose state management tool: redux or context')
  .action((name, options) => {
    initAtomicReactApp(name, options);
  });
    
    /**
     * Create the project directory.
     * @param {string} name - The name of the project/directory.
     * @returns {boolean} - Returns true if the directory was created successfully, false otherwise.
     */
    function createProjectDirectory(name) {
        try {
            const projectPath = path.resolve(process.cwd(), name);

            // Check if the directory already exists
            if (fs.existsSync(projectPath)) {
                console.error(`Error: The directory "${name}" already exists in the current working directory.`);
                return false; // Return false to indicate that the project directory was not created
            }

            // Create the project directory
            fs.mkdirSync(projectPath);
            process.chdir(projectPath); // Change the current working directory to the new project directory

            console.log(`Project directory "${name}" created successfully.`);
            return true; // Return true to indicate successful creation of the project directory
        } catch (error) {
            console.error('Error creating project directory:', error);
            return false; // Return false to indicate that an error occurred
        }
    }

    function createNvmrcFile() {
        try {
            fs.writeFileSync('.nvmrc', '16.16\n');
            console.log('.nvmrc file created successfully.');
        } catch (error) {
            console.error('Error creating .nvmrc file:', error);
        }
    }

    function updatePackageJson() {
        try {
            const packageJsonPath = path.resolve(process.cwd(), 'package.json');
            const packageJson = require(packageJsonPath);
    
            packageJson.scripts = {
                ...packageJson.scripts,
                "start": "webpack serve --open --hot",
                "build": "webpack --config webpack.config.js",
                "lint": "eslint src/**/*.js",
                "prettier": "prettier --write src/**/*.js"
            };
    
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            console.log('package.json file updated successfully.');
        } catch (error) {
            console.error('Error updating package.json file:', error);
        }
    }
    
    /**
     * Initialize a new Node.js project by creating a package.json file.
     * @param {Function} callback - The callback to be invoked after the project is initialized.
     */
    // Remove the exec declaration from here
    function initializeNodeProject(callback) {
        exec('npm init -y', (error, stdout, stderr) => {
            if (error) {
                console.error('Error initializing Node.js project:', stderr);
                return;
            }
    
            console.log('Node.js project initialized successfully.');
            callback();  // Invoking the callback to proceed to the next step
        });
    }
    
    /**
     * Install the required dependencies for the project.
     * @param {Function} callback - The callback to be invoked after the dependencies are installed.
     */
    // Remove the exec declaration from here as well
    function installDependencies(callback) {
        const dependencies = 'react react-dom @babel/core @babel/preset-env @babel/preset-react babel-loader webpack webpack-cli webpack-dev-server';
        exec(`npm install ${dependencies}`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error installing dependencies:', stderr);
                return;
            }
    
            console.log('Dependencies installed successfully.');
            callback();  // Invoking the callback to proceed to the next step
        });
    }
    

    /**
     * Configure Babel and Webpack for the project.
     * @param {Function} callback - The callback to be invoked after Babel and Webpack are configured.
     */
    function configureBabelAndWebpack(callback) {
        // Babel Configuration
        const babelConfig = {
            presets: ['@babel/preset-env', '@babel/preset-react']
        };
        fs.writeFileSync('.babelrc', JSON.stringify(babelConfig, null, 2));
    
        // Updated Webpack Configuration with mode, devServer, and publicPath
        const webpackConfig = `
        const path = require('path');

        module.exports = {
            mode: 'development', // Set the mode to development or production
            entry: './src/index.js',
            output: {
                filename: 'bundle.js',
                path: path.resolve(__dirname, 'dist'),
                publicPath: '/'  // Added publicPath to ensure the dev server serves the index file for any 404 responses
            },
            module: {
                rules: [
                    {
                        test: /\\.jsx?$/,
                        exclude: /node_modules/,
                        use: 'babel-loader'
                    }
                ]
            },
            devServer: {
                contentBase: path.join(__dirname, 'dist'),  // Serve content from the 'dist' directory
                compress: true,  // Enable gzip compression
                port: 9000,  // Set the port to 9000
                historyApiFallback: true  // Redirect all server requests to index.html, useful for single-page applications
            }
            // ... add any other configurations as needed
        };
        `;

        fs.writeFileSync('webpack.config.js', webpackConfig);
    
        console.log('Babel and Webpack configured successfully.');
        callback();  // Invoking the callback to proceed to the next step
    }
    

    /**
     * Create the Atomic Design structure directories in the project.
     */
    function createAtomicDesignStructure() {
        try {
            const directories = ['atoms', 'molecules', 'organisms', 'templates', 'pages'];
            const componentsPath = path.resolve(process.cwd(), 'src/components');
            
            // Creating the src/components directory if it doesn't exist
            if (!fs.existsSync(componentsPath)) {
                fs.mkdirSync(componentsPath, { recursive: true });
            }
    
            // Creating the atomic design structure directories
            directories.forEach(dir => {
                const dirPath = path.join(componentsPath, dir);
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath);
                }
            });
    
            console.log('Atomic Design structure created successfully.');
        } catch (error) {
            console.error('Error creating Atomic Design structure:', error);
        }
    }

    /**
     * Create the base files (index.js and App.js) for the project.
     */
    function createBaseFiles() {
        try {
            const srcPath = path.resolve(process.cwd(), 'src');

            // Create src directory if it doesn't exist
            if (!fs.existsSync(srcPath)) {
                fs.mkdirSync(srcPath, { recursive: true });
            }

            // Create index.js
            const indexPath = path.join(srcPath, 'index.js');
            const indexContent = `
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    ReactDOM.render(<App />, document.getElementById('root'));
    `;
            fs.writeFileSync(indexPath, indexContent);

            // Create App.js
            const appPath = path.join(srcPath, 'App.js');
            const appContent = `
    import React from 'react';

    function App() {
        return (
            <div className="App">
                <h1>Hello, world!</h1>
            </div>
        );
    }

    export default App;
    `;
            fs.writeFileSync(appPath, appContent);

            console.log('Base files created successfully.');
        } catch (error) {
            console.error('Error creating base files:', error);
        }
    }

    /**
     * Display a random lyric from the JSON file in a box, spread across 2-3 lines.
     */
    async function displayRandomLyric() {
        const filePath = path.join(__dirname, 'hot_fire_like_dylan.json');

        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const lyrics = data.lyrics;
            let randomLyric = lyrics[Math.floor(Math.random() * lyrics.length)];  // Changed const to let

            // Split the lyric into 2-3 lines
            const maxLength = 50;  // Adjust as needed
            let formattedLyric = '';
            while (randomLyric.length > 0) {
                formattedLyric += randomLyric.substring(0, maxLength) + '\n';
                randomLyric = randomLyric.substring(maxLength);
            }

            // Use boxen to create a box around the lyric
            const boxen = await import('boxen');
            const boxedLyric = boxen.default(formattedLyric.trim(), { padding: 1, margin: 1, borderStyle: 'double' });
            console.log(boxedLyric);
        } else {
            console.error('Lyrics file not found.');
        }
    }


    /**
     * The main function to initialize the Atomic React App project.
     * It orchestrates the creation of the project directory, initialization of the Node.js project,
     * installation of dependencies, configuration of Babel and Webpack, creation of the base files (index.js and App.js),
     * and creation of the Atomic Design structure.
     * @param {string} name - The name of the project.
     * @param {Object} options - The options passed from the command line.
     */
    // Call the displayRandomLyric function at the appropriate time in your code
    // For example, you can call it at the beginning of the initAtomicReactApp function
    function initAtomicReactApp(name, options) {
        displayRandomLyric();  // Display a random lyric
        if (!createProjectDirectory(name)) {
            console.error('Failed to create project directory.');
            return;
        }
    
        initializeNodeProject((error) => {
            if (error) {
                console.error('Failed to initialize Node project.');
                return;
            }
    
            installDependencies((error) => {
                if (error) {
                    console.error('Failed to install dependencies.');
                    return;
                }
    
                configureBabelAndWebpack((error) => {
                    if (error) {
                        console.error('Failed to configure Babel and Webpack.');
                        return;
                    }
    
                    createNvmrcFile();  // Creating .nvmrc file
                    updatePackageJson();  // Updating package.json file
                    createBaseFiles();  // Creating base files (index.js and App.js)
                    createAtomicDesignStructure();
    
                    console.log('Project initialized successfully with options:', options);
                });
            });
        });
    }
    
    
// Parse the command-line arguments
program.parse(process.argv);

// If no command is entered, display the help information
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
    
