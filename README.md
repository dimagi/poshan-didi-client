# Poshan Didi client

This is a VueJS-powered front end for displaying messages between a client, nurse and automated Poshan Didi bot. It is very simple: it allows the user to select a client from an autocomplete field and pull up their messages from a server.

It is buit using the Buefy project, which offers a number of Bulma.io-skinned components in VueJS. We use the basic VueJS CLI template with a couple of custom components for fetching and displaying the messages.

## Project setup

First step is to install all of the node packages:

```
yarn install
```

Next, we need to configure the server address. This is currently hardcoded into the MEssageList component in the `autoComputed` and `mounted` methods.

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
