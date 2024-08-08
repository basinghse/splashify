![Splashify Preview](./images/splashify-preview.png)

# Splashify

Splashify is a React + TypeScript + Vite application that allows users to search and browse high-resolution images using the Unsplash api. It provides a user-friendly interface and useful features such as image filtering and sorting.

Users can enter a search query and the app will fetch and display matching photos. The app also supports infinite scrolling, where more photos are loaded as the user scrolls down the page.

## Table of Contents

- [Splashify](#splashify)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Installation](#installation)
    - [Production](#production)
    - [Local](#local)
  - [Usage](#usage)
  - [Todo](#todo)
  - [Challenges](#challenges)

## Features

- Search and browse high-resolution images from Unsplash
- Users will be shown Trending images by default and can select New images from the drop-down menu in the header
- View image author, number of likes and download image upon hover
- Image modal with full size image and detailed information about the image and author
- Masonry grid layout for better visual organization
- Infinite scrolling for seamless browsing experience
- Clear your search with `x` button to default to Trending images

## Technologies

| Technology        | Description                                      |
| ----------------- | ------------------------------------------------ |
| React             | JavaScript library for building user interfaces  |
| TypeScript        | Primary language for programming                 |
| axios             | Making API requests                              |
| Tailwind CSS      | CSS framework for custom design                  |
| react-masonry-css | Responsive masonry layout for grid view in React |
| usehooks-ts       | Collection of TypeScript utility hooks           |
| Vite              | Build tool                                       |
| VS Code           | Code editor and terminal                         |
| Github            | Code repository and documentation                |
| Vercel            | Live web deployment                              |

## Installation

### Live App

Please visit the following link to view the live version of this application online:

- [Splashify](https://splashify.vercel.app/)

Please note: API requests are limited to 50 per hour from Unsplash. Once the request limit has been hit, new images will not be generated and previously fetched images will be recycled in searches.

### Local

**Pre-requisites:**

- Node.js - [download](https://nodejs.org/en/download)
- Git - [download](https://git-scm.com/downloads)
- npm - instructions below
- Unsplash API developer key - instructions below

To run the application locally, follow these steps:

1.  Open your terminal. If you're using VS Code (recommended), you can open the integrated terminal with `Ctrl + '`
2.  Confirm that you have Git installed by typing `git --version` in your terminal. If you receive an error or no output, Git is likely not installed, please download from the link above
3.  Clone the Splashify repository using Git: `git clone https://github.com/basinghse/splashify.git (can enter optional-new-name)`
4.  Navigate to the project directory: `cd (splashify or optional-new-name)`
5.  Install dependencies: `npm install`
6.  Create a `.env` file in the root project directory and add your Unsplash Key via `VITE_APP_UNSPLASH_ACCESS_KEY=(your_access_key)`. You can obtain your Access Key by creating a developer account on the Unsplash website and creating a new application. Follow [this guide](https://unsplash.com/documentation#creating-a-developer-account)
7.  Run the application: `npm run dev`

    This will start a local development server at your local host e.g. `http://localhost:5173/` Follow the link provided (i.e. `ctrl/command + click`)
    In a rare situation where there is an error in the code - there may be dependencies missing in the installation. In this case, you may need to reinstall the dependencies, or refer to the error message.

That's it! You should now be able to use the Splashify app locally.

## Usage

- Navigate to the Splashify website
- View images in 3 different methods:
  - Select Trending or New (images) from the drop-down menu in the header (default Trending)
  - Select a popular search phrase (based on Unsplash) from the list of buttons e.g. Nature and Architecture
  - Enter a search term in the search bar and wait a moment for the results to populate
- The relevant images will be fetched from unsplash and displayed in a grid view
- Hover over an image to view the author, number of likes and to optionally download the image
- Click on any image to view it in full size and access additional information i.e. username, description, upload date, alt description

## Todo

- [x] Display popular search phrases from the Unsplash API to give users search ideas.

## Challenges

- [x] **Challenge:** Fetching a mix of portrait and landscape images from Unsplash API.
- **Solution:** Made two separate API calls for portrait and landscape images, then merged the results and randomized the order using the `shuffleArray` function.

- [x] **Challenge:** Implementing infinite scrolling.
- **Solution:** Used the `IntersectionObserver` API to detect when the user reaches the bottom of the page and fetch more images.

- [x] **Challenge:** Preventing body scroll when the image modal is open.
- **Solution:** Added and removed the `overflow-hidden` class to the body element when the modal is opened and closed, respectively.

- [x] **Challenge:** Displaying trending words from the Unsplash API.
- **Solution:** Fetched the trending topics using the Unsplash API and displayed them as clickable buttons that update the search query.

## Limitations

Splashify was deemed to be a similar or competing site to [Unsplash](unsplash.com) and as such will no longer be upgraded to a production application. This means that: it's behaviour was deemed to beWhen selecting the 'popular searches' buttons - sometimes thit won't load the selected search
- API requests will be limited to 50 per hour
- Upon reaching the API requests limit:
  - The site may fluctuate between images that have already been published, as it cannot fetch any new images
  - Selecting a trending topic may not result in any change in imagery or may produce the result from the previous topic selected (1 step behind your selections)
