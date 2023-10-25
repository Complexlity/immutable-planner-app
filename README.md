# Immutable Passport Integration

In this guide, I will cover step by step the process of adding immutable passport authentication to an applilcation and creating transactions with it.

Before proceeding, Note that this could be done in plain html/javascript as well as all javascript frameworks including [svelte](https://svelte.dev/), [react](https://react.dev/), [vue](https://vuejs.org/), etc. For this guide, we would make use of [Nextjs](https://nextjs.org).
However, all the core concepts convered here are applicable to all of them.

## Pre-requisites

The follow this guide, ensure you have the following installed

- [npm/nodejs](https://nodejs.org/en)
- A Code Editor

## Getting Started

Run the following commands on your terminal to get started

```bash
git clone https://github.com/Complexlity/immutable-planner-app-starter immutable-planner-app
cd immutable-planner-app
npm install
npm run dev
```

Open http://localhost:3001 in your browser

![Immutable Planner App Starter](image.png)

You can also find a [Live Example](https://immutable-planner-app-starter.vercel.app/)

## Register You Application On Immutable Hub
In your code editor, go to [.env.example](.env.example)

```.env
NEXT_PUBLIC_LOGOUT_URL=<Your Immutable Hub Logout URL>
NEXT_PUBLIC_CALLBACK_URL=<Your Immutable Hub Redirect URL>
NEXT_PUBLIC_CLIENT_ID=<Your Immutable Hub Client Id>
```

We need these three values to connect

- Logout URL
- Callback URL
- Client Id

Follow the steps below to get the required values

- Go to [hub.immutable.com](https://hub.immutable.com) and create an account. If you're unsure how to do that, Complete this [Quest 3 Guide](https://app.stackup.dev/quest_page/quest-3---create-an-immutable-passport)
- Add A passport Client
![Alt text](image-1.png)
- Fill the form provided with the following steps

![Alt text](image-2.png)

1. **Application** Type: Web application (remains unchanged). This represents where the application is intented to be run
2. **Client Name**: give your application any name. This is just an identifier.
3. **Logout URLs**: This is very *important*. It represents the url the user is redirected to after they logout of the application (In some applications,the default landing page). E.g https://your-site-name.com/
4. **Callback URLs**: Also very *important*. When you try to login, it opens a popup direct to this url. This is where the logging in takes place. E.g https://your-site-name.com/login

Click **Create** once you have filled these values.

![Alt text](image-3.png)

Copy the three values and replace them in the `.env.example` file

## Initialise the Passport object
Inorder to have access to immutable authentication, you have to import the necessary function and substitute the values `Logout Url`,  `Callback Uri` and `Client Id`

```javascript
//import the needed functions
import { config, passport, provider } from '@imtbl/sdk';

// Initialize the passport config
const passportConfig = {
  baseConfig: new config.ImmutableConfiguration({
    environment: config.Environment.SANDBOX
  }),
  // This is the client id obtained from the immutable hub
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,

  // This is the callback url obtained from the immutable hub
  redirectUri: process.env.CALLBACK_URL,

  // This is the logour url obtained from the immutable hub
  logoutRedirectUri: process.env.NEXT_PUBLIC_LOGOUT_URL,
  audience: 'platform_api',
  scope: 'openid offline_access email transact'
};

// Create a new passport instance
const passportInstance = typeof window !== 'undefined' ? new passport.Passport(passportConfig) : undefined

```

`typeof window === undefined`. This is a very important step for bundlers and in our nextjs use case. This is intended to be run only on the browser so the window object would be undefined on the server

In the root folder of your project, create a folder `store` and create a file `passportStore.js` and copy the file contents below into it

<details>
<summary>store/passportStore.js</summary>
<code>
<pre>
import { createContext, useContext, useState, useEffect } from 'react';
import { config, passport, provider } from '@imtbl/sdk';

const passportConfig = {
  baseConfig: new config.ImmutableConfiguration({
    environment: config.Environment.SANDBOX
  }),
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  redirectUri: process.env.CALLBACK_URL,
  logoutRedirectUri: process.env.NEXT_PUBLIC_LOGOUT_URL,
  audience: 'platform_api',
  scope: 'openid offline_access email transact'
};

const passportInstance = typeof window !== 'undefined' ? new passport.Passport(passportConfig) : undefined

export const MyContext = createContext();

export function MyProvider({ children }) {
  const [passportState, setPassportState] = useState(passportInstance);
  const [providerState, setProviderState] = useState(null)

  return (
    <MyContext.Provider value={{ providerState, setProviderState,  passportState, setPassportState, }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
</pre>
</code>
</details>

Also replace the file contents in `pages/_app.js` with the code below

<details>
  <summary>pages/_app.js</summary>
<code>
<pre>
import '@/styles/globals.css'
import "@/styles/App.css";
import "@/styles/styles.css"
import { MyProvider } from '@/store/passportStore'

export default function App({ Component, pageProps }) {
  return(
   `<MyProvider>`
    <Component {...pageProps} />
   `</MyProvider>`
  )
}
</pre>
</code>
</details>


We have created a react context store and put the passport object. This is done so the same passport object is reusable in multiple components (as we would need it). In a different framework, you could as well do something similar though the syntaxes may differ

### Log A User With Passport


