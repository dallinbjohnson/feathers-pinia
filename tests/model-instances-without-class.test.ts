import { createPinia } from 'pinia'
import { setup } from '../src/index'
import { api } from './feathers'

const pinia = createPinia()

const { defineStore, BaseModel } = setup({ pinia, clients: { api } })

const servicePath = 'messages'
const useMessagesService = defineStore({ servicePath })

const messagesService = useMessagesService()

const resetStore = () => (api.service('messages').store = {})

describe('Model Instance Methods', () => {
  beforeAll(() => resetStore())
  afterAll(() => resetStore())

  test('methods are in place even when no class is provided', async () => {
    const message = await messagesService.create({ text: 'Quick, what is the number to 911?' })
    const props = ['save', 'create', 'patch', 'update', 'remove', 'clone', 'commit', 'reset']

    props.forEach((prop) => {
      expect(message).toHaveProperty(prop)
    })
  })
})
