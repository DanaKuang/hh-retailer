import Vue from 'vue'

function capitalizeLetter(string) {
	var idx = string.indexOf('-')
  	return string.slice(0, idx) + string.charAt(idx + 1).toUpperCase() + string.slice(idx + 2)
}

const requireComponent = require.context(
  	'.', false, /\.vue$/
   	//找到components文件夹下以.vue命名的文件
)

requireComponent.keys().forEach(fileName => {
  	const componentConfig = requireComponent(fileName)
	const componentName = capitalizeLetter(
    	fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  	)
  	Vue.component(componentName, componentConfig.default || componentConfig)
})