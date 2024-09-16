# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
Aquí tienes un ejemplo de archivo `README.md` para el proyecto que mencionaste:

---

# Weather Monitoring and Prediction SPA

This project is a Single Page Application (SPA) that displays weather records collected from temperature and humidity sensors. The data is stored in a Supabase database, and the application uses a machine learning model to predict current weather conditions based on the historical data. The project integrates hardware (sensors programmed with Arduino) and software to provide users with accurate weather predictions in a user-friendly interface.

## Features

- **Real-time Weather Data**: Displays current weather information (temperature and humidity) collected from sensors.
- **Weather Prediction**: Uses a machine learning model to predict the current weather based on historical data.
- **User-friendly Interface**: Clean, responsive design with intuitive data presentation.
- **Supabase Integration**: Stores and retrieves weather data from a Supabase database.
- **Arduino-based Sensors**: Hardware setup to collect real-time temperature and humidity data.

## Technologies Used

- **Frontend**: 
  - React (for SPA structure and user interface)
  - CSS for styling and responsive design
- **Backend**:
  - Supabase (PostgreSQL database for data storage)
  - Vite
- **Machine Learning**:
  - JS (for training and integrating the machine learning model)
  - Libraries: TensowFlow(for data analysis and model development)
- **Hardware**:
  - Arduino (C++ code to program sensors for temperature and humidity)
  - DHT11/DHT22 sensors for data collection

## Installation

1. **Clone the repository**:
    git clone <repository-url>
    ```

2. **Navigate to the project directory**:
    cd <project-directory>
    ```

3. **Install backend dependencies**:
    cd backend
    npm install
    ```

4. **Install frontend dependencies**:
    cd frontend
    npm install
    ```

5. **Start the backend server**:
    npm run start:server
    ```

6. **Start the frontend server**:
    npm run start
    ```

## Arduino Setup

1. **Connect Sensors**: Attach the temperature and humidity sensor (DHT11/DHT22) to the Arduino board.
2. **Upload Code**: Use the provided Arduino sketch to collect sensor data and send it to the database.
3. **Connect to Database**: Ensure that your Arduino code sends data to the Supabase database.


## Machine Learning Model

- The machine learning model is trained on historical weather data stored in the Supabase database.
- It uses features such as temperature, humidity, and time to predict current weather conditions.
- Model training is done using Python with scikit-learn, and the model is served via the backend API.

## Usage

1. **View Weather Data**: Open the application and see the real-time weather data fetched from the sensors.
2. **Get Predictions**: The machine learning model will predict the current weather conditions based on historical data, which is displayed alongside the real-time data.

## Future Enhancements

- Improve the accuracy of the machine learning model by using additional features (e.g., wind speed, atmospheric pressure).
- Add support for multiple locations by integrating additional sensors.
- Implement a notification system to alert users of drastic weather changes.
