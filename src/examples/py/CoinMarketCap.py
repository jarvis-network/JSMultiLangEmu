import dom
import api

url = 'https://api.coinmarketcap.com/v2/ticker/'

def api_cb(res):
	currency = dom.get('#s2', 'value')
	dom.set('#current-price', 'innerHTML', \
		res['data']['quotes'][currency]['price'])

def callback():
	id = dom.get('#s1', 'value')
	currency = dom.get('#s2', 'value')
	api.get(url + id + '/?convert=' + currency, api_cb)
  # print "clicked"

def add_option (el, value, text):
	dom.create('option', 'o' + value, el)
	dom.set('#o' + value, 'innerHTML', text)
	dom.attr('#o' + value, 'value', value)

def prep_ui():
	dom.clear('#ui')
	# crypto
	dom.create('label', 'l1', '#ui')
	dom.set('#l1', 'innerHTML', 'Crypto:')
	dom.create('select', 's1', '#ui')
	add_option('#s1', '1', 'Bitcoin')
	add_option('#s1', '1027', 'Ethereum')
	# currency
	dom.create('label', 'l2', '#ui')
	dom.set('#l2', 'innerHTML', 'Currency:')
	dom.create('select', 's2', '#ui')
	add_option('#s2', 'USD', 'USD')
	add_option('#s2', 'EUR', 'EUR')
	# button
	dom.create('button', 'b1', '#ui')
	dom.set('#b1', 'innerHTML', 'Get price')
	dom.on('#b1', 'click', callback)
	# current price
	dom.create('div', 'current-price', '#ui')

prep_ui()
