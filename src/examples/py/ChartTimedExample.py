from datetime import datetime
import chart
import proc
import dom
import random

def shift(seq, n):
  n = n % len(seq)
  return seq[n:] + seq[:n]

def genData(max = 2000):
	value = round(random.uniform(0 if max - 200 < 0 else max - 200, max + 200), 2)
	d = datetime.now()
	fdate = str(d.year) + '/' + str(d.month) + '/' + str(d.day) \
		+ ' ' + str(d.hour) + ':' \
		+ ('0' if d.minute < 10 else '') + str(d.minute) \
		+ ':' + ('0' if d.second < 10 else '') + str(d.second)
	print fdate, value
	res = {
		'name': str(d),
		'value': [fdate, value]
	}
	return res

#data = map(prepData, [820, 932, 901, 934, 1290, 1330, 1320])
data = []

option = {
	'xAxis': {
    'type': 'time',
    'splitLine': {
        'show': False
    }
	},
	'yAxis':{
		'type': 'value'
	},
	'series': [{
		'data': data,
		'type': 'line'
	}]
}

def prep_ui():
	dom.clear('#ui')
	# price value
	dom.create('label', 'l1', '#ui')
	dom.set('#l1', 'innerHTML', 'Buy price:')
	dom.create('input', 'i1', '#ui')
	dom.attr('#i1', 'type', 'number')
	dom.attr('#i1', 'style', 'width: 100px')
	dom.set('#i1', 'value', 1200)
	# start sim
	dom.create('button', 'b1', '#ui')
	dom.set('#b1', 'innerHTML', 'Start')
	# line break
	dom.create('br', 'br1', '#ui')


def init_chart():
	dom.create('canvas', 'my-chart', '#ui')
	dom.attr('#my-chart', 'width', 500)
	dom.attr('#my-chart', 'height', 300)
	return chart.draw('#my-chart', option)

prep_ui()
update = init_chart()

ready_to_buy = False

def loop_fun( index ):
	global ready_to_buy
	if ready_to_buy == True:
		return False
	# get buy value
	buy_value = int(dom.get('#i1', 'value'))
	# generate data item
	if len(data) == 0:
		item = genData(300)
	else:
		item = genData((data[len(data) - 1]['value'][1] * 12 + index * 600 + random.uniform(-index * 150, index * 150)) / 15)
	if item['value'][1] >= buy_value:
		ready_to_buy = True
		item['label'] = {
	    'normal': {
				'show': True,
				'cursor': 'pointer',
	      'formatter': 'Buy now',
	      'borderRadius': 4,
	      'backgroundColor': '#333',
	      'align': 'center',
	      'color': '#eee',
	      'padding': 10
	    },
      'emphasis': {
        'padding': 12
      }
	  }
	data.append(item)
	update({
		'series': [{
			'data': data,
			'type': 'line'
		}]
	})

def start_sim ():
	proc.loop(30, 1, loop_fun)

def item_bought():
	print 'item bought'

dom.on('#b1', 'click', start_sim)
