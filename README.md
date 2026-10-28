# AutoValue

AutoValue is a web development project focused on estimating the market value of used cars using Machine Learning, while providing a platform for exploring vehicle listings and market insights.

The project is being developed as part of the **Web Development** course of the **Bachelor's Degree in Data Science for Management** at **Coimbra Business School | ISCAC**.

## Project Overview

AutoValue aims to provide an intuitive and responsive web platform where users can estimate the market value of used vehicles based on their characteristics.

The project combines a web interface, a Machine Learning model trained on used-car data, and a planned backend API for managing vehicle estimates, user accounts, and marketplace listings.

## Features

### Home

A responsive landing page introducing AutoValue and providing navigation to its main functionalities.

### Estimate

A vehicle price estimation interface based on seven characteristics:

- Brand
- Model
- Year
- Mileage
- Fuel type
- Transmission
- Engine power

The form includes dynamic brand and model selection using JavaScript and JSON data derived from the vehicle dataset used for model training.

The interface is implemented and currently displays a placeholder estimation result. Integration with the trained Machine Learning model is in development.

### Marketplace

A responsive marketplace interface for exploring used-car listings.

Current functionality includes:

- Dynamic vehicle listing cards.
- Vehicle filtering by brand and maximum price.
- Individual vehicle detail pages.
- Vehicle image galleries.
- Vehicle specifications and pricing information.

Marketplace listings currently use illustrative data stored in JSON files.

Future development will introduce persistent listings and authenticated user management through the backend.

### Market Insights

A dedicated page for exploring used-car market information through interactive data visualizations.

The current implementation uses Chart.js and illustrative data. Integration with real market data is planned.

### Authentication and User Profile

The frontend interfaces for user registration, login, and personal profiles have been developed.

The Profile page includes sections for:

- Account information.
- Profile editing.
- User vehicle listings.
- Saved vehicle estimates.

Authentication, account updates, and user-specific data persistence will become functional after backend integration.

### Saved Estimates

Authenticated users will be able to save and review previous vehicle price estimates.

This functionality is planned for implementation using FastAPI and SQLite.

## Technology Stack

### Frontend

- **HTML5** — Page structure and content.
- **CSS3** — Styling and responsive layouts.
- **JavaScript** — Dynamic interfaces, form validation, filtering, and API communication.
- **Chart.js** — Interactive data visualizations.

### Backend

- **Python** — Backend development and Machine Learning integration.
- **FastAPI** — REST API for predictions, authentication, user profiles, and marketplace management.
- **Pydantic** — Request validation and data schemas.
- **Uvicorn** — ASGI server for running the FastAPI application.

The backend is currently being configured and developed.

### Machine Learning

- **LightGBM** — Regression model for used-car price estimation.
- **Scikit-learn** — Model development and evaluation.
- **Pandas and NumPy** — Data preparation and processing.
- **Joblib** — Serialization and loading of the trained model.

The Machine Learning model has already been trained and saved as a `.joblib` artifact.

The artifact contains:

- The trained LightGBM model.
- The categorical values used during training.
- The expected input features and their order.

The model is designed to predict vehicle prices based on the seven characteristics available in the Estimate form.

### Database (Planned)

- **SQLite** — Relational database for persistent application data.
- **SQLAlchemy** — Python ORM for database interaction.
- **DB Browser for SQLite** — Database inspection and SQL queries during development.

The planned database will support users, marketplace listings, and saved vehicle estimates.

### Data

- **JSON** — Dynamic brand/model selection and illustrative marketplace data.
- **SQLite (planned)** — Persistent application data.

## Project Structure

The project is organized into frontend and backend components.

```text
AutoValue/
├── index.html
├── estimate.html
├── marketplace.html
├── car-details.html
├── market-insights.html
├── login.html
├── register.html
├── profile.html
│
├── css/
├── javascript/
├── images/
├── data/
├── wireframes/
│
└── backend/
    ├── app/
    │   ├── __init__.py
    │   ├── main.py
    │   ├── schemas.py
    │   └── services/
    │       ├── __init__.py
    │       └── prediction.py
    │
    ├── models/
    │   └── autovalue_model.joblib
    │
    └── requirements.txt
```

Some backend modules are planned or under development.

## Current Development Status

### Implemented

- Responsive Home page.
- Estimate page and vehicle information form.
- Dynamic brand and model selection.
- Preliminary estimation results interface.
- Marketplace interface with vehicle listings and filters.
- Individual vehicle detail pages and image galleries.
- Market Insights page with interactive visualizations.
- Login and registration interfaces with client-side validation.
- User Profile interface.
- Shared navigation and responsive layouts.
- Training and serialization of the LightGBM price prediction model.
- Initial Python backend environment configuration.
- Successful loading of the saved Machine Learning artifact.

### In Development / Planned

- FastAPI prediction endpoint.
- Integration of real Machine Learning predictions into the Estimate page.
- SQLite database and SQLAlchemy models.
- User registration, login, and logout functionality.
- Secure authentication and session management.
- Persistent user profile information.
- Marketplace listing creation, editing, and deletion.
- Saving and retrieving vehicle estimates.
- Integration of real data into Market Insights.
- Backend validation, error handling, and testing.

**Note:** The current Estimate interface displays a placeholder price. Real predictions will be available after the trained LightGBM model is connected to the FastAPI backend.

## Running the Project Locally

### Requirements

- A modern web browser.
- Python 3.12 or a compatible Python version.
- Visual Studio Code (recommended).
- Live Server extension or another local HTTP server.

### Running the Frontend

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension if necessary.
4. Open `index.html`.
5. Select **Open with Live Server**.

Alternatively, start a local HTTP server from the project root:

```bash
python3 -m http.server 5500
```

Then open:

`http://localhost:5500`

The frontend should be accessed through a local HTTP server rather than opening HTML files directly using `file://`.

This is necessary because some pages use JavaScript's `fetch()` API to load JSON files.

### Backend Setup

From the project root:

```bash
cd backend
```

Create and activate a Python virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the required dependencies:

```bash
python -m pip install -r requirements.txt
```

Once the FastAPI application is configured, start the development server:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

`http://127.0.0.1:8000`

FastAPI's interactive API documentation will be available at:

`http://127.0.0.1:8000/docs`

**Note:** The backend is under development. API endpoints and frontend integration are not yet fully implemented.

## Planned Application Architecture

The application will follow a client-server architecture:

```text
HTML / CSS / JavaScript
          |
          | HTTP / JSON
          |
       FastAPI
          |
     +----+----+
     |         |
   SQLite   LightGBM
     |         |
 User data   Vehicle
 Listings    price
 Estimates   predictions
```

FastAPI will serve as the main backend for both application functionality and Machine Learning inference.

SQLite will provide persistent storage, while the trained LightGBM model will generate vehicle price estimates.

## Wireframes

Desktop and mobile wireframes are available in the `wireframes` directory.

## Author

**Gonçalo Cravinho**

Bachelor's Degree in Data Science for Management  
Coimbra Business School | ISCAC
