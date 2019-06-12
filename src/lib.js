import { BarGraph } from './components'

//Base on bootstrap-vue code
const registerComponent = (Vue, name, def) => {
    if (Vue && name && def) {
      Vue.component(name, def)
    }
  }

const installFactory = ({ components } = {}) => {
    const install = (Vue = {}) => {
      if (install.installed) {
        return
      }
      install.installed = true
      for (let component in components) {
        registerComponent(Vue, component, components[component])
      }
    }
  
    install.installed = false
  
    return install
  }

// VueSVGCharts plugin
const VueSVGCharts = {
    install: installFactory([BarGraph]),
}

export {
  // VueSVGCharts plugin
  VueSVGCharts,
  BarGraph,
}

export default VueSVGCharts