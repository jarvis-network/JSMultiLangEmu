import chart
import dom

option = {
	'xAxis': {
		'type': 'category',
		'data': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	'yAxis':{
		'type': 'value'
	},
	'series': [{
		'data': [820, 932, 901, 934, 1290, 1330, 1320],
		'type': 'line'
	}]
}

def init():
	dom.clear('#ui')
	dom.create('canvas', 'my-chart', '#ui')
	dom.attr('#my-chart', 'width', 500)
	dom.attr('#my-chart', 'height', 300)
	chart.draw('#my-chart', option)

init()
