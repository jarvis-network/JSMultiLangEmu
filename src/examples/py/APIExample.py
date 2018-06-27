import api
import dom

url = '//quotesondesign.com/wp-json/posts' \
	+ '?filter[orderby]=rand&filter[posts_per_page]=1'

def api_cb(res):
	dom.set('#q', 'innerHTML', res[0]['content'] \
	+ ' - ' + res[0]['title'])

def btn_click():
	api.get(url, api_cb)

def init():
	dom.clear('#ui')
	dom.create('button', 'b1', '#ui')
	dom.create('div', 'q', '#ui')
	dom.set('#b1', 'innerHTML', 'get quote')
	dom.on('#b1', 'click', btn_click)

init()
