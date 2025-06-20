# CSV Editor Web Application
Task:
A single-page React application that allows users to load, view, edit, search, and simulate saving a dataset from a CSV file. This project is built using **Vite**,**React**, **Material UI** and **TypeScript**  with data processed entirely in-memory—no backend required.

---------------------------------------------------------------------

## Final Tech Stack:
- Bundler:    	  Vite	
- Framework:  	  React	
- UI Framework:   Material UI (MUI)
- Language:       TypeScript
- CSV Parsing:    PapaParse       

---------------------------------------------------------------------

## Features
- Loading and editing of CSV files
- Display data in a responsive, editable Material UI table
- Filter/search rows by keyword
- Inline editing of cell data
- Save data and export .csv
- Row counter
- Column sorting (ascending and descending orders)
- Row highlighting based on column values

## Setup Instructions
### 1. Clone the Repository
Git clone "https://github.com/mushfiqur0002/csv-editor-app.git"

### 2. Install Dependencies
-Make sure you have Node.js (v16 or later) and npm installed.
-Open Visual Studio Code inside the folder "csv-editor-app"
-Open Terminal and type: npm install

### 3. Run the App Locally
On the VS Code terminal, type: npm run dev
A Link will appear on the console, "http://localhost:...."
Open browser and visit: "http://localhost:...."


## Web App Demo
Click the button " UPLOAD CSV", select your .csv file. The app will load the file 
and display an interactive table. (Wait until it is loaded)
![alt text](image.png)

You can now interact with the table's content directly and make changes, **Search by Keyword**, **highlight** specific Column and Value, **sort** columns ascending or descending order.
Below the table, there is a **rows displayed counter** and lastly, you can **Save Edited Data as CSV**. The page is **fully responsive**, adapts to all the screen size.
