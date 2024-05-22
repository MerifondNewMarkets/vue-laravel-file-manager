import { Tooltip } from 'bootstrap'

export const tooltip = {

  mounted(el, binding) {
    if (binding.value) {
      const tooltip = new Tooltip(el, { title: binding.value, placement: binding.arg ?? 'top' })
    }
  }

}