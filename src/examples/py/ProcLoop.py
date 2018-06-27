import proc

def print_msg ( index ):
	print 'index is:', index

proc.loop(10, 1, print_msg)
