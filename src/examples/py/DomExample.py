import dom
def callback():
  print "clicked"

dom.clear('#ui')
dom.create('label', 'l1', '#ui')
dom.set('#l1', 'innerHTML', 'Pick date/time:')
dom.create('input', 'i1', '#ui')
dom.attr('#i1', 'type', 'datetime-local')
print dom.attr('#i1', 'type')
# button
dom.create('button', 'b1', '#ui')
dom.set('#b1', 'innerHTML', 'click me')
dom.on('#b1', 'click', callback)
