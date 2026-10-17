# AutoValue

AutoValue is a web development project focused on estimating the market value of used cars using Machine Learning.

The project is being developed as part of the Web Development course of the Bachelor's Degree in Data Science for Management at Coimbra Business School | ISCAC.

## Project Overview

AutoValue aims to provide a user-friendly platform where users can estimate the market value of used vehicles based on their characteristics.

The project combines a responsive web interface with a Machine Learning model for vehicle price prediction.

### Planned Features

- **Home:** Landing page introducing AutoValue and its main functionalities.
- **Estimate:** Vehicle price estimation based on brand, model, year, mileage, fuel type, transmission and engine power.
- **Marketplace:** Platform for browsing used vehicles.
- **Market Insights:** Visualizations and insights into the used-car market.
- **Login / User Profile:** User authentication and access to a personal area.
- **Saved Estimates:** Ability for authenticated users to save and review previous vehicle valuations.

## Technologies

### Frontend

- HTML5
- CSS3
- JavaScript

### Machine Learning and Backend (Planned)

- Python
- LightGBM
- FastAPI

### Data

- JSON for dynamic vehicle brand and model selection.

## Current Status

The project is currently under active development.

**Implemented:**

- Responsive Home page.
- Responsive Estimate page.
- Navigation structure.
- Vehicle estimation form.
- Dynamic brand and model selection using JavaScript and JSON.
- Preliminary estimation results interface.

**Planned / In Development:**

- Integration of the Machine Learning model for real vehicle price predictions.
- Backend API.
- Marketplace.
- Market Insights.
- User authentication and personal profiles.
- Saving and managing vehicle estimates.

The current estimation results interface uses a placeholder price. Real predictions will become available after the Machine Learning model is integrated.

## Running the Project Locally

### Requirements

- A modern web browser.
- Visual Studio Code with the Live Server extension, or another local HTTP server.

### Using Live Server

1. Clone or download the GitHub repository.
2. Open the project folder in Visual Studio Code.
3. Install the **Live Server** extension if necessary.
4. Open `index.html`.
5. Right-click and select **Open with Live Server**.
6. Navigate to the Estimate page to test the vehicle form and dynamic brand/model selection.

### Alternative: Python HTTP Server

If Python is installed, open a terminal in the project's root directory and run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

**Important:** The project should be accessed through a local HTTP server rather than opening the HTML files directly using `file://`.

The Estimate page uses JavaScript's `fetch()` API to load vehicle brands and models from `data/models_by_brand.json`. Some browsers restrict these requests when HTML files are opened directly.

The Machine Learning prediction API is not yet implemented and is not required to test the current frontend.

## Wireframes

Desktop and mobile wireframes are available in the `wireframes` directory.

## Author

**Gonçalo Cravinho**

Bachelor's Degree in Data Science for Management  
Coimbra Business School | ISCAC
