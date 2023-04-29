---
outline: deep
---

<script setup>
import Badge from '../components/Badge.vue'
import BlockQuote from '../components/BlockQuote.vue'
</script>

# useAuth - Auth Stores

Learn how to create and customize auth stores.

[[toc]]

In Feathers-Pinia 3.0, the new `useAuth` composition utility which allows you to create a highly-flexible
[setup store](https://pinia.vuejs.org/core-concepts/#setup-stores). This both makes the API more flexible while also
keeping it easy to use for simple authentication requirements.

## useAuth

Let's start off with an example of the most basic auth setup with `useAuth`. This example creates a `setup` store called
`useAuthStore`. It uses `useAuth` inside to retrieve and use the composables. It doesn't automatically handle the `user`,
so we'll get to that next.

<!--@include: ../partials/notification-access-token.md-->

```ts
// src/stores/auth.ts
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAuth } from 'feathers-pinia'

export const useAuthStore = defineStore('auth', () => {
  const { api } = useFeathers()
  const userStore = useUserStore()

  const utils = useAuth({ api, userStore })

  utils.reAuthenticate()

  return { ...utils }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
```

## useAuth with `userStore`

Now let's see what it takes to add `user` support. The `userStore` option takes advantage of the service store interface
to automate the process.

This example, like others on this page, uses auto-imports as shown in the [Vite](/setup/vite) and
[Nuxt](/setup/nuxt3) guides.

```ts{6,11}
// src/store/store.auth.ts
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAuth } from 'feathers-pinia'

export const useAuthStore = defineStore('auth', () => {
  const { api } = useFeathers()
  const utils = useAuth({ api, servicePath: 'users' })

  utils.reAuthenticate()

  return { ...utils }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
```

When you provide the `servicePath` option, the `user` object returned from calling `authenticate` will be added to the
`userStore`. The `auth` util will store the `userId` internally and expose a `user` getter that pulls the reactive `user`
from the `userStore`.

## User Signup

The auth store doesn't provide any features related to user signup. Use signup varies in each app; however, the below
example shows how you would implement a signup form for the app generated by the FeathersJS CLI. You basically just create
the user, then automatically log them in upon successful create. You can see a full example of signup in the
[Feathers-Pinia example applications](/setup/example-apps), but here's a brief, happy-path example:

```vue
<script setup lang="ts">
const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()
const state = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})
// Check that passwords match, create the user, login, and redirect
const submit = async () => {
  if (state.password === state.confirmPassword) {
    const { email, password } = state
    await userStore.create({ email, password })
    await authStore.authenticate({ strategy: 'local', email, password })
    redirect()
  }
}
const redirect = () => {
  const redirectTo = authStore.loginRedirect || '/app'
  authStore.loginRedirect = null
  router.push(redirectTo)
}
</script>

<template>
  <form>
    <input type="text" v-model="state.email" placeholder="Enter E-mail" />
    <input type="password" v-model="state.password" placeholder="Enter Password" />
    <input type="password" v-model="state.confirmPassword" placeholder="Enter Password" />
    <button type="submit" @click.prevent="submit">Signup</button>
  </form>
</template>
```

## Authenticating

Once you have the `authStore` setup, as shown in the previous examples, you can use it in your login forms. Here's a
stripped-down login form example.

```vue
<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()
const state = reactive({
  email: '',
  password: '',
})
// login then redirect
const submit = async () => {
  authStore.clearError()
  await authStore.authenticate({ strategy: 'local', ...state })
  redirect()
}
const redirect = () => {
  const redirectTo = authStore.loginRedirect || '/app'
  authStore.loginRedirect = null
  router.push(redirectTo)
}
</script>

<template>
  <form>
    <input type="text" v-model="state.email" placeholder="Enter E-mail" />
    <input type="password" v-model="state.password" placeholder="Enter Password" />
    <button type="submit" @click.prevent="submit">Login</button>
  </form>
</template>
```

Notice that the previous two examples share a `redirect` function. Unless the two forms are handled in the same
component, that's a good candidate to move into a shared location like a composable or even directly in the `auth` store.

## Handling Errors

### with `authenticate`

The `authenticate` and `logout` methods both behave like normal promises. You can `catch` errors the way you would do
with any typical `Promise`. Generally, though, you don't need to catch the errors unless you're going to do something
custom.  When an error occurs, the [error ref](#error) will update with the error, allow you to show it in your forms:

```vue
<template>
  <form>
    <input type="text" v-model="state.email" placeholder="Enter E-mail" />
    <input type="password" v-model="state.password" placeholder="Enter Password" />
    <!-- conditionally show the error -->
    <div v-if="authStore.error">
      {{ authStore.error?.message }}
    </div>
    <button type="submit" @click.prevent="submit">Login</button>
  </form>
</template>
```

You can assume that the above example uses the same `script` as the previous example. Also, notice that the previous
example calls `authStore.clearError()` on submit before sending the API request.

### with `reAuthenticate`

The [reAuthenticate](#reauthenticate) function swallows errors. The promise will always resolve, and when an error
occurs, the result will be `undefined`. This means you can call it anywhere without it messing up any logic flow, as
shown in the [first example on this page](#useauth), which calls `authStore.reAuthenticate()` directly in the store
without needing to guard against errors.

Swallowing errors also allows for simple logic in Route Guards, for example:

```ts
// src/router.ts
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [/* routes here */],
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  // always resolves. no need to catch
  await authStore.getPromise()

  // check auth and apply login redirect
  if (!authStore.user) {
    authStore.loginRedirect = to
    return { path: '/login' }
  }
  return true
})
```

## Obtaining the Auth Payload

In previous versions, the authenticate method stored the `accessToken` and `payload` information inside the store. In
version 3.0, that information has been removed from the store since it is stored in the Feathers Client. You can
retrieve the `accessToken` as shown in the example, below. The example assumes you've used the [Nuxt](/setup/nuxt3)
or [Vite](/setup/vite) setup instructions.

```ts
const { api } = useFeathers()
const accessToken = api.authentication.getAccessToken()
```

To obtain the payload, you can do one of the following:

- Use the [onSuccess](#onsuccess) and [onInitSuccess](#oninitsuccess) callback options and store the entire auth
response in a ref:

    ```ts
    // src/store/store.auth.ts
    import { defineStore, acceptHMRUpdate } from 'pinia'
    import { useAuth } from 'feathers-pinia'

    export const useAuthStore = defineStore('auth', () => {
      const { api } = useFeathers()

      const authResponse = ref<null | Record<string, any>>(null)
      const auth = useAuth({
        api,
        onSuccess: async(result: any) => {
          authResponse.value = result
        },
        onInitSuccess: async(result: any) => {
          authResponse.value = result
        }
      })

      return {
        authResponse,
        ...auth,
      }
    })

    if (import.meta.hot) {
      import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
    }
    ```

- Get the response from the [getPromise utility](#getpromise):

    ```ts
    const authStore = useAuthStore()
    const authData = await authStore.getPromise()
    ```

- Get the response directly from the result stored in the Feathers Client:

    ```ts
    const { api } = useFeathers()
    const authData = await api.get('authentication')
    ```

## API

### Options

The `useAuth` utility accepts an options object of this shape:

```ts
interface UseAuthOptions {
  api: any
  userStore?: any
  entityKey?: string
  skipTokenCheck?: boolean
  // callback options
  onSuccess?: SuccessHandler
  onError?: ErrorHandler
  onInitSuccess?: SuccessHandler
  onInitError?: ErrorHandler
  onLogoutSuccess?: SuccessHandler
  onLogoutError?: ErrorHandler
}
```

Here are details about the main options. Callback options are detailed in the next section.

- **`api`** is the Feathers client we want to authenticate. This is the only **_required_** option.
- **`userStore {Store}`** the store from which we'll source the user/entity data. It can technically be any service
store and doesn't require to be a "user" store. It will receive the `user` object from the `authenticate` response and
will become whatever Model type is assigned to the store.
- **`entityKey {String}`** the key name in the `authenticate` response which will be used as the `user`.
- **`skipTokenCheck {Boolean}`** when `true`, during `reAuthenticate`, the `accessToken` is pulled from the `api` client. If one is
found, it is decoded to check its `exp` attribute to see if it is expired. If it's expired, the call to
`api.reAuthenticate` will be prevented, saving a round trip to the server. Defaults to `true`.

### Callback Options

The callback options control the flow of the success and error chains of each method's promise.  There are two types:

- `SuccessHandler` types allow customizing the response before resolving the internal auth `promise`. They receive the
`result` from the API server and can optionally return an object to modify the promise's final returned value.
- `ErrorHandler` types allow handling errors received from the API server.

```ts
// The default auth result unless you customize `context.result` on the API server.
interface AuthResult {
  accessToken: string
  authentication: {
    accessToken: string
    payload: {
      aud: string // your api domain
      exp: number // expires timestamp in seconds
      iat: number // issued at timestamp in seconds
      jti: string
      sub: string // typically the userId
    }
    strategy: string
  }
  user: Record<string, any>
}

type SuccessHandler = (result: AuthResult) => Promise<AuthResult | void>
type ErrorHandler = (error: Error) => Promise<void>
```

#### onSuccess

`{SuccessHandler}`

The `onSuccess` function is for handling `authenticate` success responses. The returned value will be returned by the
[getPromise utility](#getpromise), which can be useful for route guards.

```ts
onSuccess: async (result: AuthResult) => {
  // transform the result, populate some data, initialize the app
  const newResult = await doSomeInitStuff(result)
  return newResults
},
```

#### onError

`{ErrorHandler}`

Handles `authenticate` errors.

```ts
onError: async (error: any) => {
  // handle the error according to business logic / requirements
}
```

#### onInitSuccess

`onInitSuccess {SuccessHandler}`

Handles `reAuthenticate` success.

```ts
onInitSuccess: async (result: AuthResult) => {
  // transform the result, populate some data, initialize the app
  const newResult = await doSomeInitStuff(result)
  return newResults
}
```

#### onInitError

`onInitError {ErrorHandler}`

Handles `reAuthenticate` errors.

```ts
onInitError: async (error: any) => {
  // handle the error according to business logic / requirements
}
```

#### onLogoutSuccess

`onLogoutSuccess {SuccessHandler}`

Handles `logout` success.

```ts
onLogoutSuccess: async (result: any) => {
  // clear data, etc.
  // return is optional
}
```

#### onLogoutError

`onLogoutError {ErrorHandler}`

Handles `logout` errors.

```ts
onLogoutError: async (error: any) => {
  // handle the error according to business logic / requirements
}
```

### Callback Options Example

Here's an example showing how you might use the various callback options. It adds a 500ms `sleep` timeout to the
response because our imaginary app has a sweet loading indicator with frogs playing leap frog. We don't want our users
to miss it.

```ts
// src/store/store.auth.ts
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const { userStore } = useUserStore()
  const { api } = useFeathers()

  const setup = async ({ user }) => {
    await sleep(500)
    // Make additional requests, populate data, 
    // return additional data, if desired.
    return { user, foo: 'bar' }
  }
  const handleError = async (error: any) => {
    await sleep(500)
    // handle the error as you see fit.
  }

  const utils = useAuth({
    api,
    userStore,
    onSuccess: async (result) => {
      console.log('onSuccess')
      return await setup(result)
    },
    onError: async (error) => {
      console.log('onError', error)
      await handleError(error)
    },
    onInitSuccess: async (result) => {
      console.log('onInitSuccess')
    },
    onInitError: async (error) => {
      console.log('onInitError', error)
      await handleError(error)
    },
    onLogoutSuccess: async (result) => {
      console.log('onLogoutSuccess')
      userStore.clearAll()
    },
    onLogoutError: async (error) => {
      console.log(error)
    },
  })

  utils.reAuthenticate()

  return { ...utils }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
```

### Returned Utils

The `useAuth` function returns the following utilities to assist with creating the perfect login scenario.

```ts
interface UseAuthReturn {
  reAuthenticate: () => Promise<AuthResult>
  authenticate: <AuthenticateData>(data: AuthenticateData) => Promise<AuthResult>
  logout: () => Promise<LogoutResult>
  getPromise: () => Promise<AuthResult>
  isTokenExpired: (jwt: string) => boolean
  user: ComputedRef<null | User>
  error: Ref<null | Error>
  isPending: ComputedRef<boolean>
  isLogoutPending: ComputedRef<boolean>
  isInitDone: Ref<boolean>
  isAuthenticated: Ref<boolean>
  loginRedirect: Ref<null | VueRouterRouteObject | string>
  clearError
}

type AuthResult = any
type LogoutResult = any

interface AuthenticateData {
  strategy: 'jwt' | 'local'
  accessToken?: string
  email?: string
  password?: string
}
```

Let's review each returned value and its purpose.

#### `reAuthenticate`

The `reAuthenticate` method is called during app initialization. It checks if there's a valid `accessToken` in the
Feathers Client and uses it to authenticate again.

```ts
authStore.reAuthenticate()
```

#### `authenticate`

The `authenticate` method is a wrapper around `api.authenticate`.

```ts
authStore.authenticate({ strategy: 'local', email, password })
```

If you use a custom strategy, you can customize the `AuthenticateData` type using a TypeScript generic. Here's the
built-in interface:

```ts
interface AuthenticateData {
  strategy: 'jwt' | 'local'
  accessToken?: string
  email?: string
  password?: string
}
```

If yours is different you can specify a type or interface and provide it to `useAuth`, like this:

```ts{5-9,14}
// src/store/store.auth.ts
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAuth } from 'feathers-pinia'

interface AuthenticateData {
  strategy: 'jwt' | 'custom'
  accessToken?: string
  custom: string
}

export const useAuthStore = defineStore('auth', () => {
  const { api } = useFeathers()

  const utils = useAuth<AuthenticateData>({ api })

  utils.reAuthenticate()

  return { ...utils }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
```

#### `logout`

The `logout` method is a wrapper for `api.logout()`. It removes any stored token and resets the authentication state
that is held internally by the Feathers Client. Here's how you might implement a `logout` button:

```vue{6}
// src/components/LogoutButton.vue
<script setup lang="ts">
const router = useRouter()

const logout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>

<template>
  <button type="button" @click="logout">Logout</button>
</template>
```

To make things a bit cleaner, though, you could customize the store with a custom logout method that you can call from
anywhere. In this example, we spread the values from `auth` into the return value, then we specify the `logout` method
after the `...auth` to overwrite the default logout function.

```ts{16-20}
// src/store/store.auth.ts
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAuth } from 'feathers-pinia'

export const useAuthStore = defineStore('auth', () => {
  const { api } = useFeathers()
  const router = useRouter()

  const utils = useAuth({ api })

  utils.reAuthenticate()

  return {
    ...utils,
    logout: async () => {
      await utils.logout()
      router.push('/')
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
```

The the custom logout method in the store, we can now more cleanly use it in multiple places.

```vue{8}
// src/store/MainNav.vue
<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
  <div>
    <button type="button" @click="() => authStore.logout()">Logout</button>
  </div>
</template>
```

#### `getPromise()`

The `getPromise` utility gives you access to the `reAuthenticate` and `authenticate` promise from other parts of the
app. See the example in the section about [Handling Errors with reAuthenticate](#with-reauthenticate) section.

The underlying promise will always belong to whichever of `reAuthenticate` or `authenticate` was last called, so during
app startup it will be for `reAuthenticate`, then during login/signup it change once the `authenticate` method is used.
Then once the app is refreshed, it will be back to the promise for `reAuthenticate`.

You have to call either auth method prior to calling `getPromise`, or you'll get an error.

```ts
const authStore = useAuthStore()
const authResult = await authStore.getPromise()
```

#### `isTokenExpired`

The `isTokenExpired` utility function receives an `accessToken` string and returns `true` if it's expired or faulty. It
return `false` if the token is either successfully decoded and verified to not have expired, yet. You don't generally
need to call it manually, but it's available to do so if you find a use case.

```ts
const { api } = useFeathers()
const authStore = useAuthStore()
const accessToken = await api.authentication.getAccessToken()
const isExpired = authStore.isTokenExpired(accessToken)
```

#### `user`

The `user` value is a `ComputedRef`. It is only meaningful if you provided the `userStore` option to `useAuth`. After
successful auth, the data at `result.user` will be added to the `userStore` and the id will be stored in the `authStore`,
which is then used to pull the `user` from the `userStore`.

```ts
const authStore = useAuthStore()
const email = computed(() => authStore.user?.email)
```

#### `error`

The `error` ref will be populated whenever an error occurs during `authentication`, `reAuthentication` or `logout`. You
can, for example, use it to show error message in login forms.

```ts
const authStore = useAuthStore()
console.log(authStore.error) // --> null by default
console.log(authStore.error) // --> a @feathersjs/errors error type after an error
```

#### `clearError`

Use the `clearError` utility to set the [error](#error) back to `null`:

```ts
const authStore = useAuthStore()
authStore.clearError()
```

#### `isPending`

The `isPending` util will return `true` if an auth request has been made, but hasn't received a response, yet. If
multiple requests have been made, for some reason, the value will remain true until all requests have come back.

```ts
const authStore = useAuthStore()
authStore.isPending // --> false

const promise = authStore.reAuthenticate()
authStore.isPending // --> true

await promise
authStore.isPending // --> false
```

#### `isLogoutPending`

The `isLogoutPending` util will return `true` if a logout request has been made, but hasn't received a response, yet. If
multiple requests have been made, for some reason, the value will remain true until all requests have come back.

```ts
const authStore = useAuthStore()
authStore.isLogoutPending // --> false

const promise = authStore.logout()
authStore.isLogoutPending // --> true

await promise
authStore.isLogoutPending // --> false
```

#### `isInitDone`

The `isInitDone` ref holds a `boolean` value that indicates if the initial `reAuthenticate` request and all of its
logic (including custom logic from the callback options) has completed, whether it was successful or failed. This is the
best way to show a loading screen for your app:

```vue{7}
// src/App.vue
<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
  <Loading v-if="!authStore.isInitDone"> Loading </Loading>
  <RouterView v-else />
</template>
```

#### `isAuthenticated`

The `isAuthenticated` ref will be `true` if a user has successfully logged in during the current browser session.

```ts
const authStore = useAuthStore()
await authStore.reAuthenticate() // --> successful
authStore.isAuthenticated // --> true
```

#### `loginRedirect`

The `loginRedirect` ref allows you to store a route for a logged out user who is trying to access a page only visible to
logged-in users.

Here's a route guard that will store the attempted route in the `loginRedirect`:

```ts{17}
// src/router.ts
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [/* routes here */],
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  // always resolves. no need to catch
  await authStore.getPromise()

  // check auth and apply login redirect
  if (!authStore.user) {
    authStore.loginRedirect = to
    return { path: '/login' }
  }
  return true
})
```

And now during signup you can use it to direct the user to the page they wanted:

```ts{2,13-14}
// Check that passwords match, create the user, login, and redirect
const defaultRedirect = '/app'

const submit = async () => {
  if (state.password === state.confirmPassword) {
    const { email, password } = state
    await userStore.create({ email, password })
    await authStore.authenticate({ strategy: 'local', email, password })
    redirect()
  }
}
const redirect = () => {
  const redirectTo = authStore.loginRedirect || defaultRedirect
  authStore.loginRedirect = null
  router.push(redirectTo)
}
```