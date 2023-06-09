# Next.js TV Remote Control

This is a Next.js project that allows you to control your TV using a web-based remote control. This project is primarily built for Philips TVs, but the principles could be applied to other brands with similar APIs.

## Features

- Power control: Check the TV's power status and turn it off
- Source control: Switch between different input sources
- Volume control: Increase, decrease or mute the TV's volume
- Navigation control: Navigate through the TV's interface
- Home and Back control: Access home screen or go back
- Ambilight control: Control the TV's Ambilight feature

### UI
![img.png](img.png)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- A Philips TV compatible with the JointSPACE API

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/OrjanSkarnes/phillips-nextjs-remot.git
    ```
2. Navigate to the project directory
    ```bash
    cd nextjs-tv-remote
    ```
3. Install the dependencies
    ```bash
    npm install
    ```
4. Run the development server
    ```bash
    npm run dev
    ```

### Configuration

The application is configured using environment variables. You can either set these variables in a `.env` file in the project root, or set them as system environment variables.

Set the following variables to configure the application:
````
TV_IP="YOUR_TV_IP_ADDRESS"
````

## Usage

Open [http://localhost:3000](http://localhost:3000) with your web browser to see the result. It is optimized for mobile devices, so you can add it to your home screen and use it as a native app.

## Run on startup

If you want to run this application on system startup, you can use the Windows Task Scheduler. Create a new task and point it to the `run-on-startup.cmd` file in the project root.

## API Reference

This project uses the Philips JointSPACE API for controlling the TV. You can find more information about the API [here](http://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API.html).

## Contributing

Contributions are always welcome! Please read the [contribution guidelines](CONTRIBUTING.md) first.

## Acknowledgements

- This project is inspired by the [Philips TV API](http://jointspace.sourceforge.net/projectdata/documentation/jasonApi/1/doc/API.html) and the [pylips project](https://github.com/eslavnov/pylips). The pylips project provided a great reference for implementing the Philips TV API in a practical application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
