# Clean Shop

A simple demo e-shop app.

## Bootstrapping and Development

The app is built with the latest Expo SDK. Make sure you have installed it as per official documentation.
The app does not require a special dev-client and can work with Expo Go.

It is Typescript based.

**To set your dev environment:**

1. Have `yarn classic` installed on your system
1. Clone this repository
1. `yarn install`

**Running local development:**

`yarn start`

## Stages and Gitflow

The project has 3 stages:

- production (branch: main)
- uat
- development

Building and deployment of the stages is done via Github actions (_TO DO_)

We also use a simple Gitflow:

1. Feature branches get merged to development
2. Release candidates get merged from development to UAT
3. Production changes get merged from UAT to main.

## Code architecture

The project uses a layered approach to state management. This is a code structure that allows the decoupling of the data and UI of the app across various app modules. The purpose is for the app to scale and refactor easily.

The layer stack can be viewed from top to bottom as follows:

- DTO Layer
- Data / Business Model Layer
- Presentation Layer
- UI (React Framework layer)

Each layer should communicate only its direct neighbours (unless there's a need for an exception)

**DTO Layer**
The DTO layer is responsible for the app to communicate with the external world. Database, local, storage API. It isolates the app from the external world.

**Data / Business Model Layer**
This layer holds the core state and logic of the app. Lists of data and data interaction on the core logic of the app happen here.

**Presentation Layer**
This layer prepares and manages data from the UI and communicates with the Data/Business layer. It isolates the app from the UI framework used. We try to move as much of the UI logic to the presentation layer, for easier testing. Ideally, we should be able to replace the UI framework with another framework and this layer and above should be able to remain untouched.

### Data Models between layers

As well as we have clear boundaries between the layers, we have clear boundaries between the data types and the models. Data from DTO to Business Layer should be converted by DTO to Business Data types.

The same applies to the Presentation layer. The presentation layer should convert to and from data types from the Business layer to its own view types.

Many times this conversion can be just a one to one mapping, but it needs to be there to isolate and protect the layers from future changes in the data structures.

## Folder Layout

_src_ folder:

```
app/
    // holds expo router routes
config/
    // holds any configuration and setup logic
domain/
    // holds the business-data layer
dto/
    // hold the DTO layer
presentation/
    // holds the presentation layer and the presenters
services/
    // holds services that can be used by all three layers
    // typically these fall under the DTO and Presentation layer:
    // E.g. Crash Analytics, Error popups, etc.
react/  // holds the UI
├─ components/  // Components used by multiple screens
│  ├─ atoms/    // Basic building blocks of the UI (buttons, icons, etc.)
│  ├─ <component>/  // Components can have their own folder if they comprise of multiple files
├─ screens/ // the screen/pages of the app
│  ├─ <screen>/ // screens can have their own folders if they are multi-file
testHelpers/    // test-helper tools and data
```

Note: each screen or component holds under its folder and subfolders any components that are used only by it. If a component needs to be used by several components or screens then it should be stored in `src/react/components` folder

## Packages and Stack

- Expo SDK and EAS services
- React-Native Paper component library
- Styled Components (React Native) for styling
- Sentry for remote error reporting (_TO DO_)
- Mobx with classes for state management
- InversifyJS for IOC and DI
- Axios as HTTP Client

## Testing

Test files are kept close to their source files and not a root `__tests__` folder. `__tests__` folder may be used to group tests together in subfolders.

We use unit tests, for classes, functions, UI components, and screens.

**Integration Tests**
We use tests that can test the logic of all the 3 layers (presentation, business, dto) altogether. Tests assume the role of UI, and we mock any external libraries (like Axios). This allows testing our whole state management logic as a whole, which is faster and simpler than involving UI tests.

## E2E Tests (WIP)

### Run E2E tests - locally on iOS - development mode

1. Build an iOS dev client: `yarn build:dev-client` (build once and you can reuse)
2. Install dev-client to an `IPhone 15` simulator (unpack tar.gz and drag .app folder on simulator)
3. Copy the `cleanshop.app` folder under `builds/ios/debug/cleanshop.app`
4. run `yarn test:e2e`
