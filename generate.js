/**
 * Load configuration, render JSON
 * @author Matt Johnson - Cedrus, LLC
 */
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const sanitize = require('sanitize-filename');

// TODO: Create CLI for this project
/**
 * Load configuration, generate Postman collections
 * @param {string} configFile The location to find the config.json
 */
function generate(configFile) {
    fs.readFile(configFile, (err, data) => {
        // Get configuration, ensure collections are defined
        if (err) {
            throw err;
        }
        const config = JSON.parse(data.toString());
        if (!config.collections) {
            throw Error('No collections defined.  Please define some collections to begin generation.');
        }
        // Get the template and generate postman collections based on configuration
        generateCollections(config);
    });
}

/**
 * Based on configuration, generate collection files
 * @param {object} config Configuration JSON
 * @param {string} templateFile Location of the EJS Postman template
 */
function generateCollections(config, templateFile) {
    fs.readFile(templateFile || path.join(__dirname, 'postman/cognito.postman_collection.json'), (err, data) => {
        if (err) {
            throw err;
        }
        const template = data.toString();
        const postmanCollections = config.collections.map(renderCollection(template));

        // Save files to collections folder
        postmanCollections.forEach(saveCollection);
    });
}

/**
 * Given collection configuration, render a collection including its file name and contents
 * @param {object} collection Collection configuration object
 */
function renderCollection(template) {
    return collection => ({
        fileName: sanitize(`${collection.collectionName.replace(/(\s)+/g, '_')}.json`),
        contents: ejs.render(template, Object.assign({
            // Generate an ID
            id: uuid.v4()
        }, collection))
    });
}

/**
 * Save a collection that has name and contents to the specified workspace
 * @param {object} collection Collection that includes name and contents
 * @param {string} workspace (Optional) Folder to save collection file; defaults to ./collections/
 */
function saveCollection(collection, workspace) {
    fs.writeFile(workspace || path.join(__dirname, 'collections', collection.fileName), collection.contents, (err) => {
        if (err) {
            throw err;
        }
        console.info(`Saved to ${__dirname}/collections/${collection.fileName}.`);
    });
}

generate(path.join(__dirname, 'config/config.json'));