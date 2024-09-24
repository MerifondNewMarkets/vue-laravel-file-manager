import { Tooltip } from 'bootstrap'

export const tooltip = {

  mounted(el, binding) {
    if ((!binding || typeof binding === undefined || binding === null)  || !binding.value) {
      return
    }
    new Tooltip(el, { title: binding.value, placement: binding.arg ?? 'top', container: '#fm' })
  }

}