// declare an interface with the callback methods, so you can use on more than one class and just refer to the interface
interface CallBack {
  void methodToCallBack();
}

//class that implements the method to callback defined in the interface
class CallBackImpl implements CallBack {
  public void callback(Number index) {
    System.out.println("Index is " + index);
  }
}

public class ProcLoop {
	public static void main(String args[]){
		CallBack callBack = new CallBackImpl();
		Jarvis.proc.loop(10, 1, callBack);
	}
}
