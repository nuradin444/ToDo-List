# ImpartaTest

## Overview
The Task List project is a web application designed to help users manage their tasks efficiently. With intuitive features and a user-friendly interface, it simplifies the process of organizing and tracking tasks, ensuring that users stay productive and focused on their goals.

## Getting Started

### Prerequisites
- Node.js and npm ([Download](https://nodejs.org/))
- .NET SDK ([Download](https://dotnet.microsoft.com/download))
- SQL Server ([Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads))
- Git ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**

    Open your terminal and clone the repository:
    ```bash
    git clone https://github.com/your-username/ImpartaTest.git
    ```

2. **Navigate to the project directory**

    ```bash
    cd ImpartaTest
    ```

3. **Configure your database connection**

    Make sure to update your `appsettings.json` file with your database connection string:
    ```json
    {
      "Logging": {
        "LogLevel": {
          "Default": "Information",
          "Microsoft.AspNetCore": "Warning"
        }
      },
      "AllowedHosts": "*",
      "ConnectionStrings": {
        "TaskDbConnectionString": "server=YOUR_SERVER_NAME;database=TaskList;Trusted_Connection=true;TrustServerCertificate=True"
      }
    }
    ```

4. **Restore and update the database**

    Navigate to the server project directory and run the following commands to apply migrations and update the database:
    ```bash
    cd ImpartaTest.Server
    dotnet ef database update
    ```

5. **Install client dependencies**

    Navigate to the client project directory and install the dependencies:
    ```bash
    cd ../impartatest.client
    npm install
    ```

### Running the Application

1. **Start the backend server**

    Navigate to the server project directory and run:
    ```bash
    cd ImpartaTest.Server
    dotnet run
    ```

    The backend server will start and listen on `https://localhost:7258`.

2. **Start the frontend client**

    Navigate to the client project directory and run:
    ```bash
    cd ../impartatest.client
    npm start
    ```

## Using the API

The API endpoints can be accessed at `https://localhost:7258/api/TaskList`. Here are some example requests:

- **Get all tasks:** `POST /api/TaskList/GetAllTaskList`
- **Add a task:** `POST /api/TaskList/AddTask`
- **Update a task:** `PUT /api/TaskList/UpdateTask/{id}`
- **Delete a task:** `DELETE /api/TaskList/{id}`