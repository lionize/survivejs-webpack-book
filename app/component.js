import purecss from 'purecss'

export default (text = 'Hello world') => {
  const element = document.createElement('div')

  element.innerHTML = text
  element.className = purecss['pure-button']

  return element
}
