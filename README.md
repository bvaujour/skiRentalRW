# Ski Rental

A simple web application for ski equipment rental.

## Requirements

Make sure the following tools are installed on your machine:

* Docker
* Docker Compose
* Make

## Installation & Launch

Clone the repository and run:

```bash
make
```

This command will:

* Build the backend container
* Start the PostgreSQL database
* Start the backend API
* Start the frontend server

## Access the Application

Open your browser and navigate to:

```text
http://localhost:8080
```

## Project Structure

```text
skiRental/
├── backend/
├── frontend/
├── db/
├── docker-compose.yml
├── Makefile
└── README.md
```

## Stop the Application

```bash
make clean
```

## Remove Containers and Database Data

```bash
make fclean
```
