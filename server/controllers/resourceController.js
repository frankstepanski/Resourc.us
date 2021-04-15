const { request } = require('express');
const { Resource } = require('../models/resourceModel');
const fetch = require('node-fetch');
const cheerio = require('cheerio')
const fs = require('fs');
const url = require('url');

const resourceController = {};

// resourceController.createResource = (req, res, next) => {
//     const requestBody = req.body;
//     //  console.log("request body", requestBody)
//     Resource.create({
//         link: requestBody.link,
//         teamId: requestBody.teamId,
//         category: requestBody.category
//     })
//         .then(data => {
//             res.locals.response = data;
//             //  console.log('resourceController.createResource:', 'resource created')
//             next();
//         })
//         .catch(err => {
//             next({
//                 log: `Create Resource - ERROR: ${err}`,
//                 message: {
//                     err: 'Error occured in resourceController.createResource',
//                     message: err
//                 }
//             })
//         });
// }

resourceController.scrapeResources = async (req, res, next) => {
    const requestBody = req.body;
    const previewUrl = requestBody.link;
    const id = requestBody.id;

    const resp = await fetch(previewUrl);
    const html = await resp.text();
    const $ = cheerio.load(html);
    console.log($('h1').text()) //How to deploy a Reactjs and Express App to Heroku

    const getMetaTag = (name) =>  {
        return(
          $(`meta[name=${name}]`).attr('content') ||  
          $(`meta[name="og:${name}"]`).attr('content') ||  
          $(`meta[name="twitter:${name}"]`).attr('content') ||
          $(`meta[property=${name}]`).attr('content') ||  
          $(`meta[property="og:${name}"]`).attr('content') ||  
          $(`meta[property="twitter:${name}"]`).attr('content')
        )
      }
    
      const metaTagData = {
        id:id,
        url: previewUrl,
        domain: url.parse(previewUrl).hostname,
        title: getMetaTag('title') || $(`h1`).text(),
        img: getMetaTag('image') || './images/no-image.png',
        description: getMetaTag('description') || $(`p`).text() || 'No description available',
      }
    
      let { description } = metaTagData;

      if(description.length > 200){
        metaTagData.description = description.substring(0,200) + '...';
      }
    //  console.log("request body", requestBody)
    Resource.create({
        link: metaTagData.url,
        teamId: requestBody.teamId,
        category: requestBody.category,
        title: metaTagData.title,
        img: metaTagData.img,
        description: metaTagData.description,
        domain: metaTagData.domain
    })
        .then(data => {
            res.locals.response = data;
            //  console.log('resourceController.createResource:', 'resource created')
            next();
        })
        .catch(err => {
            next({
                log: `Create Resource - ERROR: ${err}`,
                message: {
                    err: 'Error occured in resourceController.createResource',
                    message: err
                }
            })
        });
}

resourceController.listResources = (req, res, next) => {
    const requestBody = req.body;
    
    Resource.find(requestBody)   
        .then(data => {
            res.locals.response = data;
            //  console.log('resourceController.listResources:', 'resources listed')
            next();
        })
        .catch(err => {
            next({
                log: `List Resources - ERROR: ${err}`,
                message: {
                    err: 'Error occured in resourceController.listResources',
                    message: err
                }
            })
        });
}

resourceController.listThreeResources = (req, res, next) => {
    const requestBody = req.body;

    Resource.find({
        teamId: requestBody.teamId,
    }, null, { limit: 3 })
        .then(data => {
            res.locals.response = data;
            console.log('resourceController.listThreeResources:', '3 resources listed')
            next();
        })
        .catch(err => {
            next({
                log: `List 3 Resources - ERROR: ${err}`,
                message: {
                    err: 'Error occured in resourceController.listThreeResources',
                    message: err
                }
            })
        });
}

resourceController.listAllResources = (req, res, next) => {
    Resource.find({})
        .then(data => {
            res.locals.response = data;
            //  console.log('resourceController.listAllResources:', 'all resources listed')
            next();
        })
        .catch(err => {
            next({
                log: `List All Resources - ERROR: ${err}`,
                message: {
                    err: 'Error occured in resourceController.listAllResources',
                    message: err
                }
            })
        });
}

resourceController.upvoteResource = (req, res, next) => {
    const requestBody = req.body;
    const numVotes = requestBody.upvote ? 1 : -1;

    Resource.findOneAndUpdate({
        // link: requestBody.link,
        // teamId: requestBody._id,
        _id: requestBody._id,
    }, {
        votes: requestBody.votes + numVotes,
    },
        {
            returnNewDocument: true
        })
        .then(data => {
            res.locals.response = data;
            console.log('resourceController.upvoteResource:', 'resource upvoted')
            next();
        })
        .catch(err => {
            next({
                log: `Upvote Resource - ERROR: ${err}`,
                message: {
                    err: 'Error occured in resourceController.upvoteResource',
                    message: err
                }
            })
        });
}

resourceController.deleteResource = (req, res, next) => {
    const requestBody = req.body;
    Resource.findOneAndDelete({
        _id: requestBody._id
    })
    .then(data => {
        res.locals.response = data;
        console.log('resourceController.deleteResource: ', 'resource deleted')
        next();
    })
    .catch(err => {
        next({
            log: `Delete Resource - ERROR: ${err}`,
            message: {
                err: 'Error occured in resourceController.deleteResource ',
                message: err
            }
        })
    });
}

module.exports = resourceController;