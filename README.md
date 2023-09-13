# Photo Library Project

The Photo Library project is an Angular application that allows users to view and interact with a collection of random photos. Users can mark photos as favorites, view them individually, and access a list of their favorite photos.

## Features

- Load random photos from an external API.
- Display photos in a grid layout.
- Allow users to mark photos as favorites.
- View individual photos with details.
- Infinite scrolling to load more photos.

## Demo

You can access a live demo of the project [here](insert_demo_link).

## Getting Started

### Prerequisites

- Node.js and npm must be installed on your system.

### Installation

1. Clone the repository: `git clone https://github.com/JoanGeo24/photo-library.git`
2. Navigate to the project directory: `cd photo-library`
3. Install dependencies: `npm install`

## Usage

1. Start the development server: `ng serve`
2. Open your browser and go to `http://localhost:4200`

## Project Structure

- `src/app/components`: Contains the main components of the application (e.g., `photo-list`, `single-photo`, `favorite-list`).
- `src/app/services`: Contains Angular services for managing photo data (e.g., `photo-library.service`).
- `src/app/pipes`: Custom pipe in order to show images in 3 rows (e.g., `chunk.pipe`).
- `src/assets`: Contains static assets, such as images used in the application.
- `src/app/app-routing.module.ts`: Defines the application's routing configuration.

## Development

- This project was developed using Angular version 16.2.0.
- Visual Studio Code was used as the preferred IDE.

## Testing

- Unit tests are included for components and services. You can run them using the command `ng test`.

## Acknowledgements

- The project makes use of the [Lorem Picsum API](https://picsum.photos/) to fetch random photos.