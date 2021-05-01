# Shortly - URL Shortening Tool

![Shortly](https://github.com/daniel-g-p/url-shortening-tool/blob/main/cover_image.PNG)

Shortly is a simple web application that can be used to shorten and save URLs. It is based on a challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G) and makes use of the free [Shrtcode API](https://shrtco.de/docs). The live site can be accessed [here](https://url-shortening-tool-daniel-g-p.vercel.app/).

## Table of Contents

1. [Motivation](#motivation)
2. [Technologies](#technologies)
3. [Features](#features)
4. [Project Status](#project-status)
5. [References](#references)

## Motivation

In order to work on my ability to integrate web APIs into my projects, I took on this challenge from Frontend Mentor. The challenged also happened to require the use of "localStorage", which was a new concept that I wanted to explore.

## Technologies

### HTML, CSS, JAVASCRIPT

This project was built responsively with HTML, CSS, and JS in their purest form. The design attempts to replicate the template provided by the challenge as closely as possible. Aside from the integration of the API itself, one of the more challenging aspects of the project was adding animations to element that were created dynamically through the DOM.

### Shrtcode API

The main tool on the website is powered by the free Shrtcode API, which is used to shorten URLs and save them as more compact links.

### Vercel

In order to deploy the project, I used the free hosting platform Vercel.

## Features

### Link Shortening and Saving

Clicking any of the "Get Started" buttons on the page will take you to the main section, which contains a form that you can use to submit any URL that you want to shorten. The URL you enter is validated on the front end and assuming that it is valid, it will be processed, shortened, and added to your link list. The latter allows you to copy the short link directly to your clipboard.

### List Clearing

All the links you shorten are saved with "localStorage", but you can clear all links whenever you like using the "Clear all links" button.

## Project Status

Although the tool might seem fully fucntional, I would like to add a functionality to it that will allow users to remove individual links from their list, as this currently isn't possible. Aside from that, I may turn this one-page project into a multipage site that includes a "Features" and a "Pricing" page as suggested by the links in the header.

## References

* LocalStorage Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
* Shrtcode API Documentation: https://shrtco.de/docs/
* Frontend Mentor Challenge: https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G
