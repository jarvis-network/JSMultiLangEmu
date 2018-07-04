interface CallBack {                   //declare an interface with the callback methods, so you can use on more than one class and just refer to the interface
  void methodToCallBack();
}

class CallBackImpl implements CallBack {          //class that implements the method to callback defined in the interface
  public void callback() {
    System.out.println("Clicked");
  }
}

public class DomExample {
	// public static void callback(String args[]){
	// 	System.out.println("Clicked!");
	// }
	public static void main(String args[]){
		Jarvis.dom.clear("#ui");
		Jarvis.dom.create("label", "l1", "#ui");
		Jarvis.dom.set("#l1", "innerHTML", "Pick date/time:");
		Jarvis.dom.create("input", "i1", "#ui");
		Jarvis.dom.attr("#i1", "type", "datetime-local");
		System.out.println(Jarvis.dom.attr("#i1", "type"));
		// button
		Jarvis.dom.create("button", "b1", "#ui");
		Jarvis.dom.set("#b1", "innerHTML", "click me");
		CallBack callBack = new CallBackImpl();
		Jarvis.dom.on("#b1", "click", callBack);
	}
}
