import { DireflowComponent } from 'direflow-component'
import App from './App'

export default DireflowComponent.create({
  component: App,
  configuration: {
    tagname: 'vertvolt-component',
  },
  plugins: [
    {
      name: 'styled-components',
    },
  ],
})
