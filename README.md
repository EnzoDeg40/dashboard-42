# Marty42 Dashboard
Welcome to the Marty42 Dashboard repository! This project is a user-friendly interface built for managing Marty, a Discord bot designed to notify users when their friends at 42 school complete a project. The dashboard simplifies the management of friends, messages, and notification settings.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction
The Marty Dashboard is built with Svelte and leverages the Skeleton UI library for a modern, clean user interface. It enables users to seamlessly invite Marty to their Discord servers, connect their Discord and Intra 42 accounts, and customize notifications to celebrate their friends' achievements.

## Features
Friend Management: Add, edit, and remove friends easily.   
Customizable Messages: Personalize notifications with custom messages and emojis.   
Multi-Server Support: Manage notifications across multiple Discord servers.   
Secure and User-Friendly: Simple and secure authentication with Discord and Intra 42.   

## Tech Stack
Framework: Svelte   
UI Library: Skeleton   
Backend: typescript   

## Getting Started
### Prerequisites
Node.js (version 14 or higher)   
npm or yarn   
Discord account   
Intra 42 account   
Mongodb account

### Installation
Clone the repository:

``` bash
git clone https://github.com/cdurdetrouver/dashboard-42.git
cd dashboard-42
```
#### Install the dependencies:

``` bash
npm install
```
or

``` bash
yarn install
```

#### Get API key:
here a template of .env file you need to provide:
``` txt
mdbmdp=(mongodb mdp)
mdbuser=(mongodb user)
authmdp=(mdp for own api)
bottoken=(discord bot token)
API_ENDPOINT=https://discord.com/api/v10
INTRA_ENDPOINT=https://api.intra.42.fr/v2
CLIENT_ID=(channel log id)
CLIENT_SECRET=(bot discord secret)
INTRA_ID=(intra id of the app)
INTRA_SECRET=(intra secret)
PUBLIC_BASE_URL=https://marty42.xyz
PUBLIC_DEV_URL=http://localhost:5173
```

#### Running the Project
Start the development server:

``` bash
npm run dev
```
or
``` bash
yarn dev
```
Open your browser and navigate to http://localhost:5173 to view the dashboard.

## Usage
Invite the Bot: Use the provided invitation link to add Marty42 to your Discord server.   
Connect to Discord: Log in to your Discord account via the dashboard to allow Marty42 to post notifications.   
Connect to Intra 42: Log in to your Intra 42 account to enable tracking of your friends' achievements.   
Configure Notifications: Customize the notification settings and messages to your liking through the dashboard.   

## Contributing
We welcome contributions! Please follow these steps to contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).   
Make your changes and commit them (git commit -m 'Add some feature').   
Push to the branch (git push origin feature/your-feature-name).    
Open a pull request.   
Please ensure your code follows the project's coding standards and includes appropriate tests.   

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any questions or suggestions, please feel free to contact us at gbazart@student.42paris.fr.
